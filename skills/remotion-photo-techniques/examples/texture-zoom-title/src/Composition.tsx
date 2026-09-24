import React from "react";
import {AbsoluteFill, staticFile, useCurrentFrame} from "remotion";
import {TextureZoomTitle} from "../../../assets/techniques/texture-zoom-title";

const Scene:React.FC<{next?:boolean}>=({next=false})=>{
  const frame=useCurrentFrame();
  const drift=Math.sin(frame/8)*24;
  return <AbsoluteFill style={{overflow:"hidden",background:next?"radial-gradient(ellipse at 50% 35%,#44d5d3 0%,#204d63 40%,#101923 100%)":"radial-gradient(ellipse at 72% 28%,#ff7b64 0%,#4b2d59 45%,#101923 100%)"}}>
    <svg viewBox="0 0 1280 720" width="100%" height="100%" style={{position:"absolute",transform:`translateX(${drift}px) scale(${next?1.08:1})`}}>
      <defs><linearGradient id={next?"car-next":"car-before"} x2="0" y2="1"><stop stopColor={next?"#c6fbf4":"#ffcf9a"}/><stop offset="1" stopColor={next?"#1d5c70":"#4f263b"}/></linearGradient></defs>
      <path d="M0 500 190 386l120 44 190-210 180 217 172-130 190 152 120-68 118 57v272H0Z" fill={next?"#143b4c":"#261e31"} opacity=".78"/>
      <g transform={`translate(${next?660:540+drift} ${next?150:210})`}>
        <path d="M-285 86q20-93 111-101h326q86 6 122 101l87 31v88h-684V117Z" fill={`url(#${next?"car-next":"car-before"})`} stroke="#eef8f6" strokeWidth="8"/>
        <path d="M-156 8h267l78 78h-417Z" fill="#102735" opacity=".82"/>
        <circle cx="-156" cy="212" r="49" fill="#101820" stroke="#95d6db" strokeWidth="13"/><circle cx="238" cy="212" r="49" fill="#101820" stroke="#95d6db" strokeWidth="13"/>
      </g>
      <path d={`M${-100+((frame*18)%1500)} 0v720`} stroke={next?"#58fff0":"#ff5f9e"} strokeOpacity=".22" strokeWidth="20"/>
    </svg>
    <div style={{position:"absolute",inset:0,background:"linear-gradient(0deg,rgba(4,8,12,.35),transparent 60%)"}}/>
  </AbsoluteFill>;
};

export const TextureZoomTitleDemo:React.FC=()=>{
  const stages=[{frame:0,text:"CRASH"},{frame:22,text:"CRASH MY"},{frame:37,text:"CRASH MY CAR"}];
  return <AbsoluteFill><TextureZoomTitle outgoing={<Scene/>} incoming={<Scene next/>} texture={staticFile("moving-texture.svg")} stages={stages} transitionStart={43} transitionDuration={18} titleTop={267} fontSize={118}/></AbsoluteFill>;
};
