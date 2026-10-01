import React from "react";
import {AbsoluteFill, OffthreadVideo, staticFile, useCurrentFrame} from "remotion";

export const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};
export type EffectProps = {frame: number; duration: number};
export type ComparisonProps = {source: string; label: string; duration: number; effect: React.FC<EffectProps>};

export const Comparison: React.FC<ComparisonProps> = ({source, label, duration, effect: Effect}) => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{background: "black", overflow: "hidden"}}>
    <div style={{position: "absolute", left: 0, top: 0, width: 1280, height: 720, overflow: "hidden"}}>
      <OffthreadVideo src={staticFile(source)} muted style={{width: 1280, height: 720, objectFit: "cover"}}/>
    </div>
    <div style={{position: "absolute", left: 1280, top: 0, width: 1280, height: 720, overflow: "hidden"}}>
      <Effect frame={frame} duration={duration}/>
    </div>
    <div style={{position: "absolute", top: 0, left: 1278, width: 4, height: 720, background: "#fff"}}/>
    {[{left:18,text:`ORIGINAL · ${label}`},{left:1298,text:"REMOTION"}].map(({left,text})=><div key={text} style={{position:"absolute",left,top:12,padding:"6px 10px",fontFamily:"Arial",fontSize:16,color:"white",background:"#000a"}}>{text}</div>)}
  </AbsoluteFill>;
};
