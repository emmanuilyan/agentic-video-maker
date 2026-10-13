import React from "react";
import {AbsoluteFill,Composition,useCurrentFrame} from "remotion";
import {Comparison} from "./Comparison";
import {Wolf,Error,Meals,Gatorade} from "./Effects";
const items=[
{id:'MG-DECORATIVE-TITLE-PASS',n:171,src:'wolf-source.mp4',label:'415.300–418.150',effect:Wolf},
{id:'MG-CONTOUR-OVERLOAD-TITLE',n:69,src:'error-source.mp4',label:'420.400–421.550',effect:Error},
{id:'MG-STAGED-EMBLEM-ENTRY',n:105,src:'meals-source.mp4',label:'442.600–444.350',effect:Meals},
{id:'MG-EXTRUDED-STAGED-CAPTION',n:141,src:'gatorade-source.mp4',label:'444.300–446.650',effect:Gatorade},
 ];
export const Root:React.FC=()=> <>{items.map(p=>{const Standalone:React.FC=()=>{const frame=useCurrentFrame();return <AbsoluteFill><p.effect frame={frame} duration={p.n}/></AbsoluteFill>};return <React.Fragment key={p.id}><Composition id={p.id} component={Standalone} width={1280} height={720} fps={60} durationInFrames={p.n}/><Composition id={`${p.id}-REVIEW`} component={()=> <Comparison source={p.src} label={p.label} duration={p.n} effect={p.effect}/>} width={2560} height={720} fps={60} durationInFrames={p.n}/></React.Fragment>})}</>;
