import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {poseAt, buildCamera} from '../src/engine';
import {video, landings, words, camera, beats, storyAssets} from '../src/timeline';
import skins from '../src/data/skins.json';

assert.equal(video.width,1080); assert.equal(video.height,1920);
assert(Number.isInteger(video.fps) && video.fps > 0);
assert(Number.isInteger(video.durationInFrames) && video.durationInFrames > 0);
assert(video.motionStep >= 1 && Number.isInteger(video.motionStep));
assert(Number.isInteger(video.jumpCadenceFrames) && video.jumpCadenceFrames > video.holdFrames + 8);
assert(video.holdFrames > 0 && video.cameraSmoothing > 0 && video.cameraSmoothing <= 1);
assert.equal(landings[0].frame,0);
assert(landings.at(-1)!.frame < video.durationInFrames - 5,'Final landing needs a visible settle');
assert.equal(new Set(landings.map(p=>p.id)).size,landings.length);
landings.forEach((p,i)=>{
  const pose=poseAt(p.frame,landings,video);
  assert.equal(pose.x,p.x); assert.equal(pose.y,p.y);
  assert(p.x-p.width/2 >= 90 && p.x+p.width/2 <= 930,'Platform outside safe horizontal lane');
  if(i){
    const prev=landings[i-1];
    assert.equal(p.frame-prev.frame,video.jumpCadenceFrames,'Every mechanical jump must use the configured cadence');
    assert(p.y>prev.y && p.y-prev.y < 4*video.arcHeight,'Jump must arrive while descending');
    assert(poseAt(p.frame-1,landings,video).y>p.y,'Feet must approach platform from above');
  }
});
assert.deepEqual(buildCamera(landings,video),camera,'Rendering must be deterministic');
const heroHeight=Math.max(...Object.values(skins).map(skin=>skin.hero.anchorY*video.heroWidth/skin.hero.width));
for(let frame=0;frame<video.durationInFrames;frame++){
  const pose=poseAt(frame,landings,video);
  assert(Number.isFinite(pose.y));
  assert(!frame || camera[frame]>=camera[frame-1],'Camera must never scroll downward');
  const bottom=video.floorScreenY-pose.y+camera[frame];
  assert(bottom<=video.worldBottom-25 && bottom-heroHeight>=Math.max(100,video.worldTop),`Hero outside action zone at ${frame}`);
}
let previousEnd=0;
words.forEach(word=>{
  assert(word.startMs>=previousEnd && word.endMs>word.startMs,'Invalid or overlapping word timing');
  assert(word.endMs<=video.durationInFrames/video.fps*1000+1);
  previousEnd=word.endMs;
});
video.themeChanges.forEach((change,i)=>{
  assert(change.theme in skins,'Unknown skin');
  assert(change.frame>=0 && change.frame<video.durationInFrames);
  assert(!i || change.frame>video.themeChanges[i-1].frame);
  assert(landings.some(point=>point.frame===change.frame),'Theme changes must happen on a contact frame');
});
assert.equal(video.themeChanges[0].frame,0);
const assetPaths=new Set<string>();
for(const skin of Object.values(skins)){
  [skin.hero.src,skin.platform.src,skin.paperTile,...skin.decor].forEach(p=>assetPaths.add(p));
  assert(skin.hero.anchorY<=skin.hero.height && skin.hero.anchorX<=skin.hero.width);
}
if(video.sfx) assetPaths.add(video.sfx);
if(video.narration) assetPaths.add(video.narration);
const typedStoryAssets=storyAssets as Record<string,{src:string;objectPosition?:string;credit?:string}>;
Object.entries(typedStoryAssets).forEach(([id,asset])=>{
  assert(asset && typeof asset.src==='string' && asset.src.length>0,`Story asset ${id} needs src`);
  assetPaths.add(asset.src);
});
assetPaths.forEach(file=>assert(fs.existsSync(path.join('public',file)),`Missing asset: ${file}`));
const landingIds=new Set(landings.map(point=>point.id));
assert.equal(new Set(beats.map(beat=>beat.id)).size,beats.length,'Story beat IDs must be unique');
beats.forEach((beat,index)=>{
  assert(Number.isInteger(beat.startFrame) && Number.isInteger(beat.endFrame));
  assert(beat.startFrame>=0 && beat.endFrame>beat.startFrame && beat.endFrame<=video.durationInFrames,`Invalid range for story beat ${beat.id}`);
  if(index) assert(beat.startFrame>=beats[index-1].startFrame,'Story beats must be ordered by startFrame');
  if(beat.asset) assert(typedStoryAssets[beat.asset],`Unknown story asset ${beat.asset} in ${beat.id}`);
  if(beat.landingId) assert(landingIds.has(beat.landingId),`Unknown landing ${beat.landingId} in ${beat.id}`);
  if(beat.worldX!==undefined) assert(Number.isFinite(beat.worldX));
  if(beat.worldY!==undefined) assert(Number.isFinite(beat.worldY));
  if(video.requireUniqueAdjacentStoryAssets && index && beat.asset && beat.asset===beats[index-1].asset){
    assert.fail(`Adjacent story beats repeat ${beat.asset}; select a different photo or disable requireUniqueAdjacentStoryAssets`);
  }
});
Object.entries(typedStoryAssets).forEach(([id,asset])=>{
  if(!/\.(png|jpe?g|webp|avif)$/i.test(asset.src)) return;
  const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-of','json',path.join('public',asset.src)],{encoding:'utf8'}));
  const visual=probe.streams?.find((stream:{codec_type?:string})=>stream.codec_type==='video');
  assert(visual && visual.width>0 && visual.height>0,`Story asset ${id} is not a decodable raster image`);
});
if(video.mode !== 'demo'){
  assert(video.narration,'Production requires supplied narration');
  assert(words.length,'Production requires measured captions');
  const duration=Number(execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',path.join('public',video.narration!)],{encoding:'utf8'}).trim());
  assert(video.durationInFrames>=Math.ceil(duration*video.fps),'Narration would be truncated');
}
console.log(`PASS: ${video.durationInFrames} frames, ${landings.length-1} jumps at ${video.jumpCadenceFrames}-frame cadence, deterministic camera, exact contacts, ${beats.length} story beats, ${assetPaths.size} assets, captions: ${video.mode==='demo'?'DEMO':words.length+' measured tokens'}`);
