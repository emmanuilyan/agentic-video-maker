import React from 'react';
import {AbsoluteFill,Composition,useCurrentFrame} from 'remotion';
import {Comparison} from './Comparison';
import {Kinetic,Controllers,Heads,Hit} from './Effects';
const items=[
{id:'MG-MULTICOLOR-WORD-ENTRY',n:114,src:'kinetic-source.mp4',label:'500.6–502.5',effect:Kinetic},
{id:'MG-CONTROLLER-ECHO-PAIR',n:66,src:'controllers-source.mp4',label:'503.3–504.4',effect:Controllers},
{id:'MG-PURPLE-HEAD-SWAP',n:60,src:'heads-source.mp4',label:'516.85–517.85',effect:Heads},
{id:'MG-DIAGONAL-IMPACT-PHRASE',n:114,src:'hit-source.mp4',label:'528.15–530.05',effect:Hit},
];
export const Root:React.FC=()=> <>{items.map(p=>{const Standalone:React.FC=()=>{const frame=useCurrentFrame();return <AbsoluteFill><p.effect frame={frame} duration={p.n}/></AbsoluteFill>};return <React.Fragment key={p.id}><Composition id={p.id} component={Standalone} width={1280} height={720} fps={60} durationInFrames={p.n}/><Composition id={`${p.id}-REVIEW`} component={()=> <Comparison source={p.src} label={p.label} duration={p.n} effect={p.effect}/>} width={2560} height={720} fps={60} durationInFrames={p.n}/></React.Fragment>})}</>;
