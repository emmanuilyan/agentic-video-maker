import React from "react";
import {AbsoluteFill, Img, OffthreadVideo, staticFile, useCurrentFrame, interpolate} from "remotion";

const cl = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};
const ramp = (f:number, a:number, b:number) => interpolate(f,[a,b],[0,1],cl);
const image = (file:string, style:React.CSSProperties={}) => <Img src={staticFile(file)} style={{width:"100%",height:"100%",objectFit:"cover",...style}}/>;

export const EldenRing:React.FC = () => {
  const f=useCurrentFrame(), first=ramp(f,3,13)*(1-ramp(f,19,30)), firstReveal=interpolate(f,[0,4,13],[0,42,100],cl), second=ramp(f,22,32)*(1-ramp(f,41,48));
  const firstStyle:React.CSSProperties={fontFamily:"Georgia,serif",fontWeight:700,fontSize:154,color:"#f6f2e7",letterSpacing:3,textShadow:"-2px 2px 0 rgba(186,171,68,.75), 2px 1px 0 rgba(95,173,193,.44), 0 4px 9px #0008",opacity:first,transform:`scale(${.94+.06*first})`};
  const small=():React.CSSProperties=>({fontFamily:"Georgia,serif",fontWeight:700,fontSize:91,color:"#f6f2e7",letterSpacing:1,textShadow:"-2px 2px 0 rgba(186,171,68,.72), 2px 1px 0 rgba(95,173,193,.4), 0 4px 9px #0008",alignSelf:"center"});
  return <AbsoluteFill>{image("plate-elden.png")}<AbsoluteFill style={{alignItems:"center",justifyContent:"center",opacity:first}}><div style={{...firstStyle,clipPath:`inset(0 ${100-firstReveal}% 0 0)`,transform:`translateY(${(1-first)*8}px) scale(${.94+.06*first})`}}>ELDEN</div></AbsoluteFill><AbsoluteFill style={{alignItems:"center",justifyContent:"center",opacity:second}}><div style={{display:"flex",alignItems:"center",gap:9,transform:`scale(${.96+.04*second})`}}><span style={{...small(),fontSize:152}}>E</span><span style={{...small(),fontSize:88,letterSpacing:1}}>LDEN</span><span style={{...small(),fontSize:152,marginLeft:25}}>R</span><span style={{...small(),fontSize:88,letterSpacing:1}}>ING</span></div></AbsoluteFill></AbsoluteFill>;
};

export const DoubleCaption:React.FC = () => {
  const f=useCurrentFrame(), cut=ramp(f,12,17), zoom=ramp(f,23,40), fadeOut=1-ramp(f,39,42);
  return <AbsoluteFill><AbsoluteFill style={{opacity:1-cut}}>{image("plate-caption-a.png")}</AbsoluteFill><AbsoluteFill style={{opacity:cut*fadeOut,transform:`scale(${1+.14*zoom})`,transformOrigin:"center center"}}>{image("plate-caption-b.png")}</AbsoluteFill></AbsoluteFill>;
};

export const BoomerBand:React.FC = () => {
  const f=useCurrentFrame(), showBand=ramp(f,19,25), exit=1-ramp(f,42,49), inx=ramp(f,0,4);
  const phase=f<10?0:f<20?1:f<31?2:f<42?3:4;
  const face=phase===0?"Arial, sans-serif":phase===1?"Georgia, serif":phase===2?"Arial Narrow, sans-serif":"Impact, Arial Black, sans-serif";
  const style:React.CSSProperties={fontFamily:face,fontSize:phase===3?124:128,fontWeight:phase===0?700:phase===1?600:900,letterSpacing:phase===3?-3:0,color:"white",WebkitTextStroke:phase===1?"1px #fff":"0px transparent",textShadow:"-10px 9px 0 #ed132b,-7px 6px 0 #d20d24,-2px 2px 0 #8e1020,0 0 14px rgba(237,19,43,.75),0 3px 5px rgba(0,0,0,.35)",whiteSpace:"nowrap"};
  return <AbsoluteFill>{image("plate-boomer-clean.png")}<AbsoluteFill style={{background:"linear-gradient(90deg,rgba(61,42,32,.68),rgba(61,42,32,.3),transparent)",filter:"blur(14px)",left:0,top:35,width:600,height:174}}/><div style={{position:"absolute",left:75,top:40,display:"flex",alignItems:"baseline",gap:18,opacity:inx*exit,transform:`translate(${(1-inx)*-30}px,${(1-inx)*5}px) scale(${.91+.09*inx})`}}><span style={style}>boomer</span><span style={{...style,opacity:showBand,transform:`translateX(${(1-showBand)*-35}px)`}}>{showBand>0?"band":""}</span></div></AbsoluteFill>;
};

export const DarkSouls:React.FC = () => {
  const f=useCurrentFrame(), width=interpolate(f,[0,20,42,58,74,84],[0,0,240,520,900,1120],cl), over=ramp(f,38,46), exit=1-ramp(f,88,96), next=ramp(f,89,97), pulse=.66+.18*Math.sin(f*1.8)+.08*Math.sin(f*3.9);
  return <AbsoluteFill><AbsoluteFill style={{opacity:1-next}}>{image("plate-souls-clean.png")}</AbsoluteFill><AbsoluteFill style={{opacity:next}}><OffthreadVideo src={staticFile("souls-overlay.mp4")} muted style={{width:"100%",height:"100%",objectFit:"cover"}}/></AbsoluteFill>
    <div style={{position:"absolute",left:40,top:285,width:`${width}px`,height:145,overflow:"hidden",filter:"drop-shadow(0 0 4px #36ed42) drop-shadow(0 0 13px #14d52b)",opacity:exit}}><div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:82,letterSpacing:2,whiteSpace:"nowrap",background:"linear-gradient(180deg,#f2fff1,#adffad 47%,#42db52)",backgroundClip:"text",WebkitBackgroundClip:"text",color:"transparent"}}>THE DARK SOULS OF</div></div>
    <div style={{position:"absolute",left:320,top:175,width:900,height:500,overflow:"hidden",clipPath:`polygon(14% 0,100% 0,100% 92%,88% 100%,0 87%,4% 21%)`,opacity:over*exit*pulse,filter:`hue-rotate(${Math.round(f*23)%46-23}deg) saturate(1.2)`}}><OffthreadVideo src={staticFile("souls-overlay.mp4")} muted style={{width:"100%",height:"100%",objectFit:"cover",opacity:.72}}/></div>
    <AbsoluteFill style={{background:`rgba(77,210,90,${over*exit*.11})`,mixBlendMode:"screen"}}/>
  </AbsoluteFill>;
};
