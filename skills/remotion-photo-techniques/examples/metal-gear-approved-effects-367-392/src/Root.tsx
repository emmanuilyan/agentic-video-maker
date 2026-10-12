import React from "react";
import {AbsoluteFill,Composition,useCurrentFrame} from "remotion";
import {Comparison} from "./Comparison";
import {Electro,Football,Codec,Foot} from "./Effects";
const items=[
{id:'MG-STAGED-TITLE-SIDE-OBJECTS',n:105,src:'electrolytes-source.mp4',label:'367.650–369.400',effect:Electro},
{id:'MG-CIRCLE-SPORTS-COLLAGE',n:138,src:'football-source.mp4',label:'370.750–373.050',effect:Football},
{id:'MG-RGB-INVERSION-CIRCLE',n:165,src:'codec-source.mp4',label:'380.250–383.000',effect:Codec},
{id:'MG-FOUR-LINE-DIAGONAL-CAPTION',n:111,src:'foot-source.mp4',label:'390.250–392.100',effect:Foot},
 ];
export const Root:React.FC=()=> <>{items.map(p=>{const Standalone:React.FC=()=>{const frame=useCurrentFrame();return <AbsoluteFill><p.effect frame={frame} duration={p.n}/></AbsoluteFill>};return <React.Fragment key={p.id}><Composition id={p.id} component={Standalone} width={1280} height={720} fps={60} durationInFrames={p.n}/><Composition id={`${p.id}-REVIEW`} component={()=> <Comparison source={p.src} label={p.label} duration={p.n} effect={p.effect}/>} width={2560} height={720} fps={60} durationInFrames={p.n}/></React.Fragment>})}</>;
