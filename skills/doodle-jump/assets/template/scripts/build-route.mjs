import fs from 'node:fs';
import {buildRoute,nearestContact} from './route-utils.mjs';

const videoFile='src/data/video.json';
const beatsFile='src/data/beats.json';
const landingsFile='src/data/landings.json';
const video=JSON.parse(fs.readFileSync(videoFile,'utf8'));
const beats=JSON.parse(fs.readFileSync(beatsFile,'utf8'));
const landings=buildRoute(video);
let remapped=0;
for(const beat of beats){
  if(!beat.landingId) continue;
  const next=nearestContact(landings,beat.startFrame);
  if(next.id!==beat.landingId) remapped++;
  beat.landingId=next.id;
}
const themeChanges=video.themeChanges.map((change,index)=>({...change,frame:index?nearestContact(landings,change.frame,{includeStart:true}).frame:0}));
for(let index=1;index<themeChanges.length;index++){
  if(themeChanges[index].frame<=themeChanges[index-1].frame){
    throw new Error(`Theme cues ${index-1} and ${index} collapse onto one contact; separate them before rebuilding the route`);
  }
}
video.themeChanges=themeChanges;
fs.writeFileSync(videoFile,JSON.stringify(video,null,2)+'\n');
fs.writeFileSync(beatsFile,JSON.stringify(beats,null,2)+'\n');
fs.writeFileSync(landingsFile,JSON.stringify(landings,null,2)+'\n');
console.log(`Built ${landings.length-1} jumps at ${video.jumpCadenceFrames} frames each; remapped ${remapped} beat contacts and snapped ${Math.max(0,themeChanges.length-1)} theme cues.`);
