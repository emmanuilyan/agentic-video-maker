import React from 'react';
import {AbsoluteFill,Img,OffthreadVideo,staticFile,interpolate} from 'remotion';
import {EffectProps,clamp} from './Comparison';
const mix=(f:number,a:number,b:number,x=0,y=1)=>interpolate(f,[a,b],[x,y],clamp);
const Plate:React.FC<{name:string;style?:React.CSSProperties}>=({name,style})=><Img src={staticFile(name.includes(".")?name:`assets/${name}.png`)} style={{position:'absolute',width:1280,height:720,...style}}/>;
const Clean:React.FC<{id:string;frame:number;style?:React.CSSProperties}>=({id,frame,style})=><Img src={staticFile(`clean/${id}/${String(frame).padStart(3,"0")}.jpg`)} style={{position:"absolute",width:1280,height:720,...style}}/>;
const Original:React.FC<{source:string}>=({source})=><OffthreadVideo muted src={staticFile(source)} style={{width:1280,height:720}}/>;
/** Full-size collage clipped by a closing iris. The image never scales with the iris. */
export type CircleCollageProps=EffectProps & {sourceVideo?:string;foreground?:React.ReactNode;foregroundDirectory?:string;blueCard?:string;whiteCard?:string;blueForeground?:string;whiteForeground?:string;beforeImage?:string;afterImage?:string;center?:[number,number];revealFrames?:[number,number];switchFrames?:[number,number];irisFrames?:number[];irisRadii?:number[];bluePanFrames?:[number,number];bluePanX?:[number,number];whitePanFrames?:[number,number];whitePanX?:[number,number];whitePanY?:[number,number]};
export const CircleCollage:React.FC<CircleCollageProps>=({frame:f,foreground,foregroundDirectory="assets/map-foreground-sequence",sourceVideo="01-map-circle-source.mp4",blueCard="assets/map-blue-full.png",whiteCard="assets/map-white-full.png",blueForeground="map-blue-foreground",whiteForeground="map-foreground-complete",beforeImage="map-before",afterImage="map-after",center=[640,360],revealFrames=[11,22],switchFrames=[36,42],irisFrames=[64,65,66,67,68,69,70,71,72,73,74,75],irisRadii=[750,640,570,500,430,360,290,220,150,80,0,0],bluePanFrames=[12,36],bluePanX=[157.2,0],whitePanFrames=[36,64],whitePanX=[-39.27,144],whitePanY=[31.91,-117]})=>{
 if(f<12||f>=74)return <Original source={sourceVideo}/>;
 const swap=mix(f,...switchFrames);
 const blueX=mix(f,...bluePanFrames,...bluePanX);
 const whiteX=mix(f,...whitePanFrames,...whitePanX);
 const whiteY=mix(f,...whitePanFrames,...whitePanY);
 const foregroundZoom=f<22?mix(f,12,22,1.12,1):f>64?mix(f,64,69,1,1.035):1;
 const foregroundY=f<22?mix(f,12,22,-40,0):0;
 return <AbsoluteFill><Plate name={f<65?beforeImage:afterImage}/>
  <div style={{position:'absolute',inset:0,opacity:Math.sqrt(mix(f,...revealFrames)),clipPath:`circle(${interpolate(f,irisFrames,irisRadii,clamp)}px at ${center[0]}px ${center[1]}px)`}}>
   <Img src={staticFile(blueCard)} style={{position:'absolute',left:-192+blueX,top:-192,width:1664,height:1104}}/>
   <Img src={staticFile(whiteCard)} style={{position:'absolute',left:-192+whiteX,top:-192+whiteY,width:1664,height:1104,opacity:swap}}/>
   <div style={{position:'absolute',inset:0,transform:`scale(${foregroundZoom})`,transformOrigin:'50% 40%',top:foregroundY}}>
    <>{foreground??<Img src={staticFile(`${foregroundDirectory}/${String(Math.min(63,Math.max(22,f))).padStart(3,"0")}.png`)} style={{position:"absolute",width:1280,height:720}}/>}</>
   </div>
  </div>
 </AbsoluteFill>;
};
