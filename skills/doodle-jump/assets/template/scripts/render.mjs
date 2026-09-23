import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const mode=process.argv[2]??'proxy';
if(!['qa','proxy','final'].includes(mode)) throw new Error('Expected qa, proxy or final');
const video=JSON.parse(fs.readFileSync('src/data/video.json','utf8'));
const landings=JSON.parse(fs.readFileSync('src/data/landings.json','utf8'));
const beats=JSON.parse(fs.readFileSync('src/data/beats.json','utf8'));
const spec=fs.existsSync('project-spec.json')?JSON.parse(fs.readFileSync('project-spec.json','utf8')):{};
const revision=Number(spec.revision)||1;
const qaDir=`out/qa/v${revision}`;
fs.mkdirSync(qaDir,{recursive:true}); fs.mkdirSync('out/logs',{recursive:true});
function run(args,label){
  const file=path.resolve(`out/logs/${label}.log`);
  const fd=fs.openSync(file,'w');
  const result=spawnSync(path.resolve('node_modules/.bin/remotion'),args,{stdio:['ignore',fd,fd]});
  fs.closeSync(fd);
  if(result.status!==0){
    console.error(fs.readFileSync(file,'utf8').split('\n').slice(-24).join('\n'));
    throw new Error(`Render failed; log: ${file}`);
  }
  console.log(`${label}: OK`);
}
const base=['src/index.tsx','DoodleJump'];
if(mode==='qa'){
  const representativePoints=[landings[1],landings[Math.floor(landings.length/2)],landings.at(-1)].filter(Boolean);
  const representative=representativePoints.flatMap(point=>[point.frame-1,point.frame,point.frame+1]);
  const frames=[...new Set([0,video.durationInFrames-1,...representative,...video.themeChanges.flatMap(change=>[change.frame-1,change.frame,change.frame+10]),...beats.flatMap(beat=>[beat.startFrame,beat.endFrame-1])])]
    .filter(frame=>frame>=0&&frame<video.durationInFrames).sort((a,b)=>a-b);
  for(const frame of frames) run(['still',...base,`${qaDir}/frame-${String(frame).padStart(4,'0')}.png`,`--frame=${frame}`,'--scale=0.333333'],`v${revision}-frame-${frame}`);
  const concat=frames.map(frame=>`file '${path.resolve(`${qaDir}/frame-${String(frame).padStart(4,'0')}.png`).replaceAll("'","'\\''")}'`).join('\n');
  fs.writeFileSync(`${qaDir}/frames.txt`,concat);
  const contactSheet=`${qaDir}/contact-sheet.png`;
  const tiled=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y','-f','concat','-safe','0','-i',`${qaDir}/frames.txt`,'-vf',`tile=5x${Math.ceil(frames.length/5)}`,'-frames:v','1',contactSheet],{encoding:'utf8'});
  if(tiled.status!==0) throw new Error(tiled.stderr);
  console.log(path.resolve(contactSheet));
}else{
  if(mode==='final' && video.mode!=='demo' && video.timingStatus!=='reviewed') throw new Error('Review measured narration/caption/beat timing and set timingStatus=reviewed before final export');
  const fallback=`out/${mode==='final'?'doodle-jump':'proxy'}.mp4`;
  const output=spec.outputs?.[mode==='final'?'final':'proxy']??fallback;
  fs.mkdirSync(path.dirname(output),{recursive:true});
  run(['render',...base,output,'--codec=h264','--audio-codec=aac','--pixel-format=yuv420p',mode==='proxy'?'--scale=0.5':'--scale=1',mode==='proxy'?'--crf=26':'--crf=18','--concurrency=2'],`v${revision}-${mode}`);
  console.log(path.resolve(output));
}
