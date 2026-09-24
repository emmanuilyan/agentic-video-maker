import React from "react";
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from "remotion";

const clamp={extrapolateLeft:"clamp" as const,extrapolateRight:"clamp" as const};
const ramp=(frame:number,from:number,to:number)=>interpolate(frame,[from,to],[0,1],clamp);

export type TextureTitleStage={frame:number;text:string};
export type TextureZoomTitleProps={
  /** A still or video composition shown before the title zoom transition. */
  outgoing:React.ReactNode;
  /** A still or video composition revealed by the zoom transition. */
  incoming:React.ReactNode;
  /** A moving image texture, usually passed as staticFile(...). */
  texture:string;
  /** Ordered title changes; each new phrase dissolves in over the prior phrase. */
  stages?:TextureTitleStage[];
  accent?:string;
  titleColor?:string;
  fontSize?:number;
  titleTop?:number;
  transitionStart?:number;
  transitionDuration?:number;
};

/** Staged texture-filled title that exits through a zoomed crossfade to the next scene. */
export const TextureZoomTitle:React.FC<TextureZoomTitleProps>=({
  outgoing,incoming,texture,
  stages=[{frame:0,text:"CRASH"},{frame:22,text:"CRASH MY"},{frame:37,text:"CRASH MY CAR"}],
  accent="#f5314d",titleColor="#f4f8ff",fontSize=118,titleTop=260,
  transitionStart=45,transitionDuration=18,
})=>{
  const frame=useCurrentFrame();
  const {width,height}=useVideoConfig();
  const transition=ramp(frame,transitionStart,transitionStart+transitionDuration);
  const zoom=ramp(frame,transitionStart-16,transitionStart+transitionDuration);
  const scale=Math.min(width/1280,height/720);
  const first=stages[0]?.frame??0;
  const staged=(stages.length?stages:[{frame:0,text:"CRASH"}]).map((stage,index)=>{
    const next=stages[index+1]?.frame??Infinity;
    const fadeIn=ramp(frame,stage.frame,stage.frame+4);
    const fadeOut=Number.isFinite(next)?1-ramp(frame,next-3,next+2):1-transition;
    return {stage,opacity:fadeIn*fadeOut};
  });

  return <AbsoluteFill style={{overflow:"hidden",background:"#101418"}}>
    <AbsoluteFill style={{opacity:1-transition,transform:`scale(${1+zoom*.85})`,transformOrigin:"52% 54%"}}>{outgoing}</AbsoluteFill>
    <AbsoluteFill style={{opacity:transition,transform:`scale(${.92+transition*.42+zoom*.28})`,transformOrigin:"50% 50%"}}>{incoming}</AbsoluteFill>
    <div style={{position:"absolute",inset:0,opacity:1-transition,background:"radial-gradient(ellipse at center,transparent 32%,rgba(0,0,0,.38) 100%)",pointerEvents:"none"}}/>
    {staged.map(({stage,opacity},stageIndex)=><div key={`${stage.frame}-${stageIndex}`} style={{position:"absolute",left:0,right:0,top:titleTop*scale,display:"flex",justifyContent:"center",opacity:opacity*(1-transition),transform:`scale(${.82+.18*ramp(frame,first,first+12)+(frame>stage.frame+4&&frame<transitionStart?Math.sin(frame*.8)*.012:0)}) rotate(-1deg)`,transformOrigin:"center center",fontFamily:"Impact,'Arial Black',sans-serif",fontSize:fontSize*scale,fontWeight:900,letterSpacing:2.5*scale,lineHeight:1.02,textAlign:"center",whiteSpace:"nowrap",filter:`drop-shadow(0 4px 3px #08131b) drop-shadow(0 0 8px ${accent}66)`}}>
      {Array.from(stage.text,(glyph,index)=>{
        const textureX=(frame*3.8+index*11)%170;
        const glitch=frame%19<3&&(index+Math.floor(frame/2))%4===0;
        return <span key={`${glyph}-${index}`} style={{display:"inline-block",position:"relative",overflow:"hidden",whiteSpace:glyph===" "?"pre":"normal",backgroundImage:`linear-gradient(115deg,${titleColor},${accent},#fff,${accent}),url(${texture})`,backgroundSize:"220% 150%,180% 180%",backgroundPosition:`${textureX}% 50%,${(frame*2+index*7)%100}% ${(frame*3+index*5)%100}%`,backgroundBlendMode:"screen,screen",backgroundClip:"text",WebkitBackgroundClip:"text",color:"transparent",WebkitTextFillColor:"transparent",textShadow:"none"}}>
          {glyph===" "?" ":glyph}
          {glitch&&glyph!==" "?<span aria-hidden="true" style={{position:"absolute",inset:0,clipPath:`inset(${28+(index%3)*9}% 0 ${48-(index%3)*7}% 0)`,transform:`translateX(${(index%2?1:-1)*4*scale}px)`,color:accent,WebkitTextFillColor:accent,mixBlendMode:"screen"}}>{glyph}</span>:null}
        </span>;
      })}
    </div>)}
    <div style={{position:"absolute",inset:0,pointerEvents:"none",opacity:(1-transition)*(.12+Math.abs(Math.sin(frame*.43))*.08),background:`linear-gradient(${168+frame%7}deg,transparent 43%,${accent} 47%,transparent 51%)`,mixBlendMode:"screen"}}/>
  </AbsoluteFill>;
};
