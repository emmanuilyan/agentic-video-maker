import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {buildRoute} from './route-utils.mjs';
const [audio,captionFile,scriptFile]=process.argv.slice(2);
if(!audio || !captionFile || !scriptFile) throw new Error('Usage: node scripts/attach-narration.mjs AUDIO MEASURED-WORDS.json SCRIPT.txt');
const captions=JSON.parse(fs.readFileSync(captionFile,'utf8'));
if(!Array.isArray(captions)||!captions.length) throw new Error('Expected measured word-level Caption[] JSON');
const script=fs.readFileSync(scriptFile,'utf8');
const duration=Number(execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','default=nw=1:nk=1',audio],{encoding:'utf8'}).trim());
if(!Number.isFinite(duration)||duration<=0) throw new Error('Cannot measure narration duration');
let end=0;
for(const word of captions){
  if(typeof word.text!=='string'||!Number.isFinite(word.startMs)||!Number.isFinite(word.endMs)||word.startMs<end||word.endMs<=word.startMs||word.endMs>duration*1000+100) throw new Error('Invalid measured caption timing');
  end=word.endMs;
}
const configFile='src/data/video.json';
const video=JSON.parse(fs.readFileSync(configFile,'utf8'));
// Preserve revisions; attach once, then make scoped edits using the skill workflow.
if(video.narration) throw new Error('Narration already attached. For replacement, preserve prior timing and edit the affected ranges.');
const frames=Math.ceil(duration*video.fps)+Math.round(video.fps*0.4);
if(frames<video.fps*2) throw new Error('Clip too short for this starter; set up a deliberate short route manually');
const suffix=path.extname(audio).toLowerCase();
fs.mkdirSync('public/audio',{recursive:true});
fs.copyFileSync(audio,`public/audio/narration${suffix}`);
fs.writeFileSync('script.txt',script);
fs.writeFileSync('src/data/captions.json',JSON.stringify(captions,null,2)+'\n');
video.durationInFrames=frames;
const contacts=buildRoute(video);
fs.writeFileSync('src/data/landings.json',JSON.stringify(contacts,null,2)+'\n');
Object.assign(video,{mode:'production',timingStatus:'needs-review',narration:`audio/narration${suffix}`,durationInFrames:frames,title:'',eyebrow:'',footer:'',themeChanges:[{frame:0,theme:'garden'}]});
fs.writeFileSync(configFile,JSON.stringify(video,null,2)+'\n');
const specFile='project-spec.json';
const spec=fs.existsSync(specFile)?JSON.parse(fs.readFileSync(specFile,'utf8')):{};
Object.assign(spec,{kind:'narrated-video',narrationStatus:'attached',captionStatus:'measured-needs-review',timingSource:path.basename(captionFile),routeStatus:'constant-cadence-mechanical-scaffold',script:path.basename(scriptFile)});
spec.beatPlan=spec.beatPlan??[];
fs.writeFileSync(specFile,JSON.stringify(spec,null,2)+'\n');
console.log(`Attached ${duration.toFixed(2)}s audio and ${captions.length} words. Mechanical route: ${contacts.length-1} jumps at ${video.jumpCadenceFrames} frames each. Keep that cadence; map spoken events in beats.json and review timingStatus.`);
