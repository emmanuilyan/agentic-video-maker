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

export const CyanCardMontage:React.FC = () => {
  const f=useCurrentFrame(), start=ramp(f,0,4), firstScale=interpolate(f,[0,14,38,63],[.72,1.02,1.24,1.31],cl), secondIn=ramp(f,0,5), push=interpolate(f,[0,16,40,63],[0,36,175,245],cl), zoom=ramp(f,10,25), zoomEnd=ramp(f,24,36), title=ramp(f,8,15), japanese=ramp(f,13,26), meme=ramp(f,9,27), videoIn=ramp(f,14,24), out=1-ramp(f,60,63);
  const card=(left:number,top:number,w:number,h:number,scale:number,rot:number,opacity:number):React.CSSProperties=>({position:"absolute",left,top,width:w,height:h,overflow:"hidden",transform:`scale(${scale}) rotate(${rot}deg)`,transformOrigin:"center",opacity});
  const japaneseTransform=`translate(${interpolate(f,[0,14,30,51],[420,230,0,-12],cl)}px,${interpolate(f,[0,26,42,63],[-150,-60,0,4],cl)}px) scale(${interpolate(f,[0,14,30,51],[.45,.72,1,1.04],cl)})`;
  const memeX=interpolate(f,[0,21,39,63],[1320,1320,865,820],cl), memeY=interpolate(f,[0,21,39,63],[365,365,342,325],cl);
  return <AbsoluteFill style={{overflow:"hidden"}}><AbsoluteFill style={{opacity:1-videoIn,transform:`scale(${1+zoom*1.2+zoomEnd*.9})`,transformOrigin:"52% 50%",filter:`saturate(${1.05+zoom*.5})`}}>{image("plate-montage-bg.png")}</AbsoluteFill><AbsoluteFill style={{opacity:videoIn,transform:`scale(${1+zoom*.9+zoomEnd*1.2})`,transformOrigin:"52% 50%"}}><OffthreadVideo src={staticFile("montage-zoom-bg.mp4")} muted style={{width:"100%",height:"100%",objectFit:"cover"}}/></AbsoluteFill><div style={{position:"absolute",inset:0,background:"radial-gradient(circle at 54% 48%,transparent,rgba(0,0,0,.46))"}}/>
    <div style={card(38+push,110,420,294,firstScale,-2,start)}>{image("plate-montage-card-a.png")}</div>
    <div style={card(850-push*.52,330,420,294,secondIn,2,secondIn)}>{image("plate-montage-card-b.png")}</div>
    <div style={{position:"absolute",left:840,top:34,fontFamily:"Arial,sans-serif",fontWeight:900,fontSize:54,letterSpacing:-2,color:"#48f7ef",textShadow:"0 0 7px #30e8ff,0 0 22px #22deed",opacity:title*out}}>Hide Your Tacos</div>

    <div style={{position:"absolute",left:memeX,top:memeY,width:460,height:400,transform:`translate(${meme*.12*push}px,${Math.sin(f/7)*10}px) scale(${.72+.28*meme})`,opacity:meme*out,overflow:"hidden"}}>{image("plate-montage-meme.png")}</div>
    <div style={{position:"absolute",left:0,right:0,top:278,textAlign:"center",fontFamily:"'Noto Sans JP','Hiragino Kaku Gothic ProN',sans-serif",fontSize:124,fontWeight:900,letterSpacing:4,opacity:japanese*out,transform:japaneseTransform,color:"#efffff",background:"linear-gradient(90deg,#59f3ec,#e9ffff,#66efe9)",backgroundClip:"text",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent",textShadow:"-7px 5px 0 rgba(255,37,132,.8),7px -3px 0 rgba(0,223,220,.84),0 0 25px #2bfff3",mixBlendMode:"screen"}}>タコスを隠せ</div>
  </AbsoluteFill>;
};

export const DarkSouls:React.FC = () => {
  const f=useCurrentFrame(), width=interpolate(f,[0,20,42,58,74,84],[0,0,240,520,900,1120],cl), over=ramp(f,38,46), exit=1-ramp(f,88,96), next=ramp(f,89,97), pulse=.66+.18*Math.sin(f*1.8)+.08*Math.sin(f*3.9);
  return <AbsoluteFill><AbsoluteFill style={{opacity:1-next}}>{image("plate-souls-clean.png")}</AbsoluteFill><AbsoluteFill style={{opacity:next}}><OffthreadVideo src={staticFile("souls-overlay.mp4")} muted style={{width:"100%",height:"100%",objectFit:"cover"}}/></AbsoluteFill>
    <div style={{position:"absolute",left:40,top:285,width:`${width}px`,height:145,overflow:"hidden",filter:"drop-shadow(0 0 4px #36ed42) drop-shadow(0 0 13px #14d52b)",opacity:exit}}><div style={{fontFamily:"Georgia,serif",fontWeight:700,fontSize:82,letterSpacing:2,whiteSpace:"nowrap",background:"linear-gradient(180deg,#f2fff1,#adffad 47%,#42db52)",backgroundClip:"text",WebkitBackgroundClip:"text",color:"transparent"}}>THE DARK SOULS OF</div></div>
    <div style={{position:"absolute",left:320,top:175,width:900,height:500,overflow:"hidden",clipPath:`polygon(14% 0,100% 0,100% 92%,88% 100%,0 87%,4% 21%)`,opacity:over*exit*pulse,filter:`hue-rotate(${Math.round(f*23)%46-23}deg) saturate(1.2)`}}><OffthreadVideo src={staticFile("souls-overlay.mp4")} muted style={{width:"100%",height:"100%",objectFit:"cover",opacity:.72}}/></div>
    <AbsoluteFill style={{background:`rgba(77,210,90,${over*exit*.11})`,mixBlendMode:"screen"}}/>
  </AbsoluteFill>;
};

export type WordmarkBuildProps = {
  frame: number;
  firstWord?: string;
  centerInitial?: string;
  centerFinal?: string;
  rightInitial?: string;
  rightFinal?: string;
  lowerInitial?: string;
  lowerFinal?: string;
  centerChangeFrame?: number;
  rightEnterFrame?: number;
  rightChangeFrame?: number;
  lowerEnterFrame?: number;
  lowerChangeFrame?: number;
};

/** Four-color logo assembly with brief intermediate misspellings and hard updates. */
export const WordmarkBuild:React.FC<WordmarkBuildProps> = ({
  frame,
  firstWord = "METAL",
  centerInitial = "GERE",
  centerFinal = "GEAR",
  rightInitial = "RAISING",
  rightFinal = "RISING",
  lowerInitial = "REPEN.",
  lowerFinal = "REVENGEANCE",
  centerChangeFrame = 24,
  rightEnterFrame = 25,
  rightChangeFrame = 38,
  lowerEnterFrame = 52,
  lowerChangeFrame = 72,
}) => {
  const base:React.CSSProperties = {position:"absolute",display:"flex",alignItems:"center",fontFamily:"Impact, 'Arial Black', sans-serif",fontWeight:900,textTransform:"uppercase",lineHeight:.86,whiteSpace:"nowrap"};
  return <AbsoluteFill>
    <div style={{...base,left:50,top:130,fontSize:150,color:"#ffd500",WebkitTextStroke:"3px #20151a",textShadow:"5px 7px 0 #29140b,0 0 12px rgba(255,188,0,.42)"}}>{firstWord}</div>
    {frame>=12&&<div style={{...base,left:400,top:128,width:480,justifyContent:"center",fontSize:150,color:"#00d9ec",fontStyle:"italic",letterSpacing:-5,WebkitTextStroke:"3px #111a22",textShadow:"5px 7px 0 #071821,0 0 14px rgba(0,220,255,.55)"}}>{frame<centerChangeFrame?centerInitial:centerFinal}</div>}
    {frame>=rightEnterFrame&&<div style={{...base,left:952,top:130,fontSize:122,color:"#ed1f84",fontStyle:"italic",letterSpacing:-5,WebkitTextStroke:"3px #24121d",textShadow:"5px 7px 0 #210c20,0 0 14px rgba(255,30,145,.5)"}}>{frame<rightChangeFrame?rightInitial:rightFinal}</div>}
    {frame>=lowerEnterFrame&&<div style={{...base,top:360,left:0,width:1280,justifyContent:"center",fontSize:162,color:"#ff202a",letterSpacing:1,WebkitTextStroke:"4px #210c11",textShadow:"6px 8px 0 #21070b,0 0 16px rgba(255,27,36,.48)"}}>{frame<lowerChangeFrame?lowerInitial:lowerFinal}</div>}
  </AbsoluteFill>;
};

export const MetalGearWordmarkBuild:React.FC = () => {
  const frame=useCurrentFrame();
  return <AbsoluteFill>{image("plate-metal-gear-build.png")}<WordmarkBuild frame={frame}/></AbsoluteFill>;
};
