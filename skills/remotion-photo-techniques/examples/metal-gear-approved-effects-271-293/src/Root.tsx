import React from "react";
import {AbsoluteFill,Composition,useCurrentFrame} from "remotion";
import {Comparison} from "./Comparison";
import {Bezos,Prime,Boss,Front} from "./Effects";
const items=[
{id:'MG-HEADLINE-SUBLINE-EXIT',n:90,src:'bezos-source.mp4',label:'270.950–272.450',effect:Bezos},
{id:'MG-BRIEF-LOGO-OVERLAY',n:54,src:'prime-source.mp4',label:'279.750–280.650',effect:Prime},
{id:'MG-ITALIC-WORD-APPEND',n:57,src:'boss-source.mp4',label:'285.500–286.450',effect:Boss},
{id:'MG-LAYERED-DIAGONAL-EXIT',n:69,src:'front-source.mp4',label:'292.300–293.450',effect:Front},
 ];
export const Root:React.FC=()=> <>{items.map(p=>{const Standalone:React.FC=()=>{const frame=useCurrentFrame();return <AbsoluteFill><p.effect frame={frame} duration={p.n}/></AbsoluteFill>};return <React.Fragment key={p.id}><Composition id={p.id} component={Standalone} width={1280} height={720} fps={60} durationInFrames={p.n}/><Composition id={`${p.id}-REVIEW`} component={()=> <Comparison source={p.src} label={p.label} duration={p.n} effect={p.effect}/>} width={2560} height={720} fps={60} durationInFrames={p.n}/></React.Fragment>})}</>;
