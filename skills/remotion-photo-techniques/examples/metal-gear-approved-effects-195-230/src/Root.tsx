import React from 'react';
import {AbsoluteFill,Composition,useCurrentFrame} from 'remotion';
import {Comparison} from './Comparison';
import {VergilTitle,PovRGB,RedHUD,PresidentCaption} from './Effects';
const items=[{id:'MG-BLUE-TITLE-EXIT',n:144,src:'vergil-source.mp4',label:'03:15.300–03:17.700',effect:VergilTitle},{id:'MG-POV-COLOR-EDGES',n:66,src:'pov-source.mp4',label:'03:36.400–03:37.500',effect:PovRGB},{id:'MG-RED-SCANNING-HUD',n:96,src:'hud-source.mp4',label:'03:39.200–03:40.800',effect:RedHUD},{id:'MG-CUT-EXTENDED-CAPTION',n:120,src:'president-source.mp4',label:'03:48.000–03:50.000',effect:PresidentCaption}];
export const Root:React.FC=()=> <>{items.map(p=>{const Standalone:React.FC=()=>{const frame=useCurrentFrame();return <AbsoluteFill><p.effect frame={frame} duration={p.n}/></AbsoluteFill>};return <React.Fragment key={p.id}><Composition id={p.id} component={Standalone} width={1280} height={720} fps={60} durationInFrames={p.n}/><Composition id={`${p.id}-REVIEW`} component={()=> <Comparison source={p.src} label={p.label} duration={p.n} effect={p.effect}/>} width={2560} height={720} fps={60} durationInFrames={p.n}/></React.Fragment>})}</>;
