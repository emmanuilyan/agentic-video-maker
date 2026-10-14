import React from "react";
import {AbsoluteFill,Composition,useCurrentFrame} from "remotion";
import {Comparison} from "./Comparison";
import {Jesus,Bitcoin,Favorite,Zero} from "./Effects";
const items=[
{id:'MG-PAIRED-EDGE-CUTOUTS',n:102,src:'jesus-source.mp4',label:'446.500–448.200',effect:Jesus},
{id:'MG-STACKED-COIN-TITLE',n:90,src:'bitcoin-source.mp4',label:'454.850–456.350',effect:Bitcoin},
{id:'MG-PHOTO-CASCADE-IRIS',n:132,src:'favorite-source.mp4',label:'470.050–472.250',effect:Favorite},
{id:'MG-WORD-EXPANSION-CAPTION',n:99,src:'zero-source.mp4',label:'478.000–479.650',effect:Zero},
 ];
export const Root:React.FC=()=> <>{items.map(p=>{const Standalone:React.FC=()=>{const frame=useCurrentFrame();return <AbsoluteFill><p.effect frame={frame} duration={p.n}/></AbsoluteFill>};return <React.Fragment key={p.id}><Composition id={p.id} component={Standalone} width={1280} height={720} fps={60} durationInFrames={p.n}/><Composition id={`${p.id}-REVIEW`} component={()=> <Comparison source={p.src} label={p.label} duration={p.n} effect={p.effect}/>} width={2560} height={720} fps={60} durationInFrames={p.n}/></React.Fragment>})}</>;
