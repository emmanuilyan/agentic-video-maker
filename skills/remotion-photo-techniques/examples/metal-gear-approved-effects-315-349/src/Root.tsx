import React from "react";
import {AbsoluteFill,Composition,useCurrentFrame} from "remotion";
import {Comparison} from "./Comparison";
import {Boris,Reaction,Doktor,President} from "./Effects";
const items=[
{id:'MG-SIDE-TITLE-SUBLINE',n:75,src:'boris-source.mp4',label:'315.500–316.750',effect:Boris},
{id:'MG-PORTRAIT-WHITE-PULSES',n:144,src:'reaction-source.mp4',label:'325.600–328.000',effect:Reaction},
{id:'MG-TITLE-TO-EDGE-COLLAGE',n:189,src:'doktor-source.mp4',label:'333.150–336.300',effect:Doktor},
{id:'MG-STAGED-CAPTION-PORTRAITS',n:108,src:'president-source.mp4',label:'347.200–349.000',effect:President},
 ];
export const Root:React.FC=()=> <>{items.map(p=>{const Standalone:React.FC=()=>{const frame=useCurrentFrame();return <AbsoluteFill><p.effect frame={frame} duration={p.n}/></AbsoluteFill>};return <React.Fragment key={p.id}><Composition id={p.id} component={Standalone} width={1280} height={720} fps={60} durationInFrames={p.n}/><Composition id={`${p.id}-REVIEW`} component={()=> <Comparison source={p.src} label={p.label} duration={p.n} effect={p.effect}/>} width={2560} height={720} fps={60} durationInFrames={p.n}/></React.Fragment>})}</>;
