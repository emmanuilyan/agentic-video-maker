import fs from 'node:fs';
import path from 'node:path';
import {execFileSync,spawnSync} from 'node:child_process';

const spec=fs.existsSync('project-spec.json')?JSON.parse(fs.readFileSync('project-spec.json','utf8')):{};
const proxy=spec.outputs?.proxy??'out/proxy.mp4';
if(!fs.existsSync(proxy)) throw new Error(`Proxy not found: ${proxy}. Run npm run proxy first.`);
const duration=Number(execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',proxy],{encoding:'utf8'}).trim());
if(!Number.isFinite(duration)||duration<=0) throw new Error('Could not measure proxy duration');
const reviewDir=path.join('out','qa','review',path.basename(proxy,path.extname(proxy)));
fs.mkdirSync(reviewDir,{recursive:true});

function ffmpeg(args,label){
  const result=spawnSync('ffmpeg',['-hide_banner','-loglevel','error','-y',...args],{encoding:'utf8'});
  if(result.status!==0) throw new Error(`${label} failed: ${result.stderr}`);
}

let sheet=0;
for(let start=0;start<duration;start+=32){
  const output=path.join(reviewDir,`timeline-${String(++sheet).padStart(2,'0')}.jpg`);
  ffmpeg(['-ss',String(start),'-t',String(Math.min(32,duration-start)),'-i',proxy,'-vf','fps=1/2,scale=270:480:force_original_aspect_ratio=decrease,pad=270:480:(ow-iw)/2:(oh-ih)/2:black,tile=4x4:padding=4:margin=4','-frames:v','1',output],`timeline sheet ${sheet}`);
}
for(const [label,ratio] of [['opening',0.15],['middle',0.5],['ending',0.8]]){
  const start=Math.max(0,Math.min(duration-1,duration*ratio-0.5));
  const output=path.join(reviewDir,`motion-${label}.jpg`);
  ffmpeg(['-ss',String(start),'-t','1','-i',proxy,'-vf','fps=10,scale=216:384:force_original_aspect_ratio=decrease,pad=216:384:(ow-iw)/2:(oh-ih)/2:black,tile=5x2:padding=4:margin=4','-frames:v','1',output],`motion strip ${label}`);
}
console.log(`Review evidence: ${path.resolve(reviewDir)}`);
console.log(`Timeline sheets: ${sheet}; motion strips: 3; proxy duration: ${duration.toFixed(2)}s`);
