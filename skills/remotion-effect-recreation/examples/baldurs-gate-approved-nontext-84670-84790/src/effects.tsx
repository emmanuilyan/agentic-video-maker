import React from 'react';
import {AbsoluteFill,Img,staticFile,useCurrentFrame,interpolate} from 'remotion';
const ip=(f:number,a:number,b:number,x:number,y:number)=>interpolate(f,[a,b],[x,y],{extrapolateLeft:'clamp',extrapolateRight:'clamp'});
const Full=({name,style={}}:{name:string;style?:React.CSSProperties})=><Img src={staticFile(name+'.png')} style={{position:'absolute',inset:0,width:1280,height:720,...style}}/>;
// Deliberately block-shaped glyphs: the reference uses a stepped game title.
const glyphs:Record<string,string[]>={
 I:['11111','00100','00100','00100','00100','00100','11111'],
 M:['10001','11011','10101','10101','10001','10001','10001'],
 P:['11110','10001','10001','11110','10000','10000','10000'],
 O:['01110','10001','10001','10001','10001','10001','01110'],
 S:['01111','10000','10000','01110','00001','00001','11110'],
 T:['11111','00100','00100','00100','00100','00100','00100'],
 R:['11110','10001','10001','11110','10100','10010','10001'],
};
const Impostor=()=>{
 const cells:React.ReactNode[]=[];
 'IMPOSTOR'.split('').forEach((ch,i)=>glyphs[ch].forEach((row,y)=>row.split('').forEach((v,x)=>{if(v==='1')cells.push(<rect key={`${i}-${x}-${y}`} x={i*6+x} y={y} width={1.04} height={1.04}/>)})));
 return <svg width="1280" height="720" style={{position:'absolute',inset:0}}><defs><filter id="outline" x="-10%" y="-40%" width="120%" height="180%"><feMorphology in="SourceAlpha" operator="dilate" radius=".22" result="edge"/><feFlood floodColor="#140000"/><feComposite in2="edge" operator="in"/><feMerge><feMergeNode/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs><g transform="translate(202,514) scale(18.6,19)" fill="#c60013" filter="url(#outline)">{cells}</g></svg>;
};
export const BloodRed=()=>{
 const f=useCurrentFrame(),hit=ip(f,5,13,1,0),rich=ip(f,12,30,0,1);
 return <AbsoluteFill style={{background:'black',overflow:'hidden'}}>{f<4?<Full name="red-before"/>:<AbsoluteFill style={{transform:`translate(${Math.sin(f*2.7)*hit*15}px,${Math.cos(f*3)*hit*8}px) scale(${1+hit*.06})`,filter:`blur(${hit*4}px)`}}>
  <Full name="red-base" style={{filter:'grayscale(1)'}}/>
  <Full name="red-detail"/>
  <AbsoluteFill style={{opacity:rich}}><Full name="red-rich-base" style={{filter:'grayscale(1)'}}/><Full name="red-rich-detail" style={{filter:'saturate(1.15) contrast(1.04)'}}/></AbsoluteFill>
  {f>=24&&<AbsoluteFill style={{opacity:ip(f,24,48,0,1),filter:`blur(${ip(f,24,48,7,0)}px)`}}><Impostor/></AbsoluteFill>}
 </AbsoluteFill>}</AbsoluteFill>;
};
