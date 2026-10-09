import React from 'react';
import {AbsoluteFill,Img,OffthreadVideo,staticFile,interpolate} from 'remotion';
import {EffectProps} from './Comparison';
const at=(f:number,x:number[],y:number[])=>interpolate(f,x,y,{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const art=(name:string,style:React.CSSProperties={})=><Img src={staticFile(`assets/${name}.png`)} style={{position:'absolute',width:1280,height:720,...style}}/>;
const bg=(name:string)=><OffthreadVideo muted src={staticFile(`assets/${name}-background.mp4`)} style={{width:1280,height:720}}/>;
export const Bezos:React.FC<EffectProps>=({frame:f})=><AbsoluteFill>{bg('bezos')}{art('bezos-title',{opacity:at(f,[8,16,71,72],[0,1,1,0]),transform:`translateX(${at(f,[9,13,16,64,65,66,67,68,69,70,71,72],[-600,-180,0,0,156,310,466,620,775,930,1084,1240])}px)`})}{art('bezos-subline',{opacity:at(f,[8,16,68,69],[0,1,1,0]),transform:`translateX(${at(f,[9,13,16,60,61,62,63,64,65,66,67,68],[-600,-180,0,0,34,122,262,436,630,836,1042,1248])}px)`})}</AbsoluteFill>;
export const Prime:React.FC<EffectProps>=({frame:f})=><AbsoluteFill>{bg('prime')}{art('prime-logo',{opacity:at(f,[7,12,22,32],[0,1,1,0])})}</AbsoluteFill>;
export const Boss:React.FC<EffectProps>=({frame:f})=><AbsoluteFill>{bg('boss')}{art(f<22?'boss-short':'boss-full',{opacity:at(f,[6,10,43,50],[0,1,1,0]),transformOrigin:'430px 600px',transform:`translate(${at(f,[6,10],[-460,0])}px,${at(f,[43,50],[0,65])}px) scale(${at(f,[43,50],[1,1.14])})`})}</AbsoluteFill>;
export const Front:React.FC<EffectProps>=({frame:f})=>{
 if(f<15||f>=63)return <OffthreadVideo muted src={staticFile('front-source.mp4')} style={{width:1280,height:720}}/>;
 const edge=at(f,[55,56,57,58,59,60,61,62,63],[-82,123,330,535,740,945,1152,1358,1564]);
 const opacity=at(f,[15,22],[0,1]);const scale=at(f,[22,55],[1,0.98]);
 return <AbsoluteFill><Img src={staticFile('assets/front-next.jpg')} style={{width:1280,height:720}}/><AbsoluteFill style={{clipPath:f<55?undefined:`polygon(${edge}px 0,1280px 0,1280px 720px,${edge-605}px 720px)`}}>{bg('front')}<AbsoluteFill style={{opacity,transform:`scale(${scale})`,transformOrigin:'650px 400px'}}>{art('front-train')}</AbsoluteFill>{art(`figure-frames/${Math.max(22,Math.min(55,f)).toString().padStart(3,'0')}`,{opacity})}{art(`front-caption-${f<23?0:f<39?1:f<45?2:3}`,{mixBlendMode:'difference',filter:'drop-shadow(6px 5px 0 #00ffff)',opacity:at(f,[15,21],[0,1]),transform:`translateX(${at(f,[15,21],[-210,0])}px)`})}</AbsoluteFill></AbsoluteFill>;
};
