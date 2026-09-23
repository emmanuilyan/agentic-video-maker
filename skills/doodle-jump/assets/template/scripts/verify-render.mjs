import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const spec=fs.existsSync('project-spec.json')?JSON.parse(fs.readFileSync('project-spec.json','utf8')):{};
const file=process.argv[2]??spec.outputs?.final??'out/doodle-jump.mp4';
const video=JSON.parse(fs.readFileSync('src/data/video.json','utf8'));
const landings=JSON.parse(fs.readFileSync('src/data/landings.json','utf8'));
const beats=JSON.parse(fs.readFileSync('src/data/beats.json','utf8'));
const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-count_frames','-show_streams','-show_format','-of','json',file],{encoding:'utf8'}));
const visual=probe.streams.find(s=>s.codec_type==='video');
const audio=probe.streams.find(s=>s.codec_type==='audio');
assert(visual && visual.width===1080 && visual.height===1920,'Expected final 1080x1920 video');
assert.equal(visual.codec_name,'h264');
assert.equal(Number(visual.nb_read_frames),video.durationInFrames);
const [num,den]=visual.r_frame_rate.split('/').map(Number);
assert.equal(num/den,video.fps);
assert.equal(visual.sample_aspect_ratio,'1:1');
if(video.sfx || video.narration) assert(audio && audio.codec_name==='aac','Audio stream missing');
let peaks=[];
if(audio){
  const pcm=execFileSync('ffmpeg',['-v','error','-i',file,'-vn','-ac','1','-ar','48000','-f','f32le','pipe:1'],{maxBuffer:128*1024*1024});
  let max=0;
  for(let i=0;i<pcm.length;i+=4) max=Math.max(max,Math.abs(pcm.readFloatLE(i)));
  assert(max<0.999,'Mixed audio reaches full scale; review clipping');
  const narrativeIds=new Set(beats.flatMap(beat=>beat.landingId?[beat.landingId]:[]));
  const cueLandings=landings.slice(1).filter(point=>beats.length===0||narrativeIds.has(point.id));
  peaks=cueLandings.map(p=>{
    const start=Math.floor(p.frame/video.fps*48000),end=start+7200;
    let peak=0;
    for(let i=start;i<end && i*4<pcm.length;i++) peak=Math.max(peak,Math.abs(pcm.readFloatLE(i*4)));
    if(video.mode==='demo' && video.sfx) assert(peak>0.01,`Landing ${p.id} missing from mixed audio`);
    return {id:p.id,peakDb:Math.round(20*Math.log10(Math.max(peak,1e-9))*10)/10};
  });
}
const qaDir=`out/qa/v${Number(spec.revision)||1}`;
fs.mkdirSync(qaDir,{recursive:true});
fs.writeFileSync(`${qaDir}/render-verification.json`,JSON.stringify({file,resolution:[visual.width,visual.height],fps:video.fps,frames:Number(visual.nb_read_frames),duration:Number(probe.format.duration),contactAudioPeaks:peaks,narrationReview:video.mode==='demo'?'not applicable; no narration supplied':'requires listening and measured alignment review'},null,2)+'\n');
console.log(`PASS: ${visual.width}x${visual.height}, ${video.fps}fps, ${visual.nb_read_frames} frames; ${peaks.length} contact-audio windows measured; no full-scale samples`);
