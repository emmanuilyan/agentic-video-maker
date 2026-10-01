import React from 'react';
import {AbsoluteFill,Img,Sequence,staticFile,useCurrentFrame} from 'remotion';
import {CCLens,Echo,Glow,MotionTile,PixelPolly,mod,smooth} from './Effects';

const face='Arial Black, Arial, sans-serif';
export const Contours=()=> <svg width="100%" height="100%" viewBox="0 0 360 640" style={{position:'absolute'}}>{Array.from({length:12},(_,i)=><path key={i} d={`M${-180+i*24} 660 C${-130+i*24} 455 ${110+i*18} 540 ${130+i*17} 340 S${220+i*16} 310 ${210+i*20} 100 S${300+i*12} 100 ${400+i*12} 0`} fill="none" stroke="#341018" strokeWidth="1" opacity=".32"/>)}</svg>;
function movingDuplicate(frame:number){
  const perimeter=1748;const p=mod(frame*1.2+56,perimeter);
  let x=0,y=0,rotation=0;
  if(p<296){x=32+p;y=28;rotation=180;}else if(p<874){x=328;y=28+p-296;rotation=-90;}else if(p<1170){x=328-(p-874);y=606;}else{x=32;y=606-(p-1170);rotation=90;}
  return <svg width="100%" height="100%" viewBox="0 0 360 640">
    <g transform={`translate(${x} ${y}) rotate(${rotation})`} fill="white" fontFamily={face} fontWeight="900"><text x="0" y="0" fontSize="14" textAnchor="middle">DUPLICATE</text><rect x="75" y="-4" width="3" height="3"/></g>
  </svg>;
}
export const EchoDemo=()=>{const f=useCurrentFrame();const scale=1.27-0.27*smooth((f-11)/5);return <AbsoluteFill style={{background:'#0b090a'}}><Contours/><Echo renderAt={movingDuplicate} copies={10} delayFrames={146}/><svg width="100%" height="100%" viewBox="0 0 360 640"><text x="180" y="338" textAnchor="middle" fontFamily={face} fontSize="48" fontWeight="900" fill="white" textLength="145" lengthAdjust="spacingAndGlyphs" transform={`translate(180 320) scale(${scale}) translate(-180 -320)`}>ECHO</text></svg></AbsoluteFill>;};

export const Rotary=({frame=0}:{frame?:number})=><svg width="100%" height="100%" viewBox="0 0 360 640">
 <defs><path id="rotary-circle" d="M 180 190 A130 130 0 1 1 179.999 190"/></defs>
 <g transform={`rotate(${frame*0.75+3} 180 320)`}><text xmlSpace="preserve" fontFamily={face} fontWeight="900" fontSize="38" fill="none" stroke="#55ff36" strokeWidth="1.45" textLength="816" lengthAdjust="spacingAndGlyphs"><textPath href="#rotary-circle">ROTARY    ROTARY    ROTARY     </textPath></text>{[0,1,2].map(i=>{const a=(102+i*120)*Math.PI/180;return <circle key={i} cx={180+139*Math.sin(a)} cy={320-139*Math.cos(a)} r="6" fill="none" stroke="#55ff36" strokeWidth="1.45"/>;})}</g>
</svg>;
export const GlowDemo=()=>{const f=useCurrentFrame();return <AbsoluteFill style={{background:'#080a08'}}><Glow><Rotary frame={f}/></Glow></AbsoluteFill>;};

export const LensArtwork=()=> <svg width="100%" height="100%" viewBox="0 0 360 640">
 <defs>
  <radialGradient id="shade"><stop stopColor="#2b2c27"/><stop offset="1" stopColor="#090b08"/></radialGradient>
  <pattern id="outlines" width="230" height="55" patternUnits="userSpaceOnUse" patternTransform="rotate(-29)"><text x="-3" y="43" fontFamily={face} fontWeight="900" fontSize="45" fill="none" stroke="#c1db44" strokeWidth="1.3" textLength="222" lengthAdjust="spacingAndGlyphs">EFFECTS</text></pattern>
  <pattern id="solid" width="190" height="75" patternUnits="userSpaceOnUse" patternTransform="rotate(-29)"><text x="0" y="62" fontFamily={face} fontWeight="900" fontSize="65" fill="#b8e644" textLength="184" lengthAdjust="spacingAndGlyphs">TOP 5</text></pattern>
  <radialGradient id="vignette"><stop offset=".25" stopColor="black" stopOpacity="0"/><stop offset="1" stopColor="black" stopOpacity=".4"/></radialGradient>
 </defs>
 <rect width="360" height="640" fill="url(#shade)"/>
 <g transform="translate(-40 -55) skewX(-8)"><rect width="460" height="455" fill="url(#outlines)"/></g>
 <g transform="translate(-10 386) skewX(24)"><rect width="420" height="280" fill="url(#solid)"/></g>
 <rect width="360" height="640" fill="url(#vignette)"/>
 <g fill="white" fontFamily={face} fontWeight="900" textAnchor="middle">
  <text x="180" y="313" fontSize="51" textLength="189" lengthAdjust="spacingAndGlyphs">TOP 5</text>
  <text x="180" y="365" fontSize="51" textLength="267" lengthAdjust="spacingAndGlyphs">EFFECTS</text>
 </g>
</svg>;
export const LensDemo=()=>{
 const f=useCurrentFrame();
 // Source 17–19.5: brief sphere at about 18.23, followed by rapid expansion.
 const start=35; const duration=6;
 if(f<start)return <AbsoluteFill><Img src={staticFile('lens-artwork.png')} style={{width:'100%',height:'100%'}}/></AbsoluteFill>;
 const t=smooth((f-start-3)/duration),radius=0.48+2.4*t,amount=1-smooth((f-start-5)/4);
 return <CCLens src={staticFile('lens-artwork.png')} radius={radius} amount={amount}/>;
};
export const BreakArtwork=()=> <svg width="100%" height="100%" viewBox="0 0 360 640"><g fill="black" fontFamily={face} fontWeight="900" textAnchor="middle">{[166,346,526].map(y=><text key={y} x="180" y={y} fontSize="68" textLength="258" lengthAdjust="spacingAndGlyphs">BREAK</text>)}</g></svg>;
const regions=[{x:49,y:111,width:55,height:59,start:16,direction:-1},{x:49,y:291,width:55,height:59,start:3,direction:1},{x:49,y:471,width:55,height:59,start:9,direction:1},{x:307,y:111,width:6,height:59,start:16,direction:-1},{x:307,y:291,width:6,height:59,start:3,direction:1},{x:307,y:471,width:6,height:59,start:9,direction:1}];
export const PollyDemo=()=> <AbsoluteFill style={{background:'white'}}><PixelPolly src={staticFile('break-artwork.png')} width={360} height={640} regions={regions}/></AbsoluteFill>;
export const Stories=()=> <svg width="360" height="50" viewBox="0 0 360 50"><text x="5" y="41" fontFamily={face} fontWeight="900" fontSize="53" fill="none" stroke="#e9e9e0" strokeWidth="1.15" textLength="350" lengthAdjust="spacingAndGlyphs">STORIES</text></svg>;
export const TileDemo=()=> <AbsoluteFill style={{background:'#050605'}}><MotionTile tileWidth={360} tileHeight={50} speedY={-1.7}><Stories/></MotionTile></AbsoluteFill>;
const demos=[{name:'ECHO',Comp:EchoDemo,frames:60},{name:'GLOW',Comp:GlowDemo,frames:60},{name:'CC LENS',Comp:LensDemo,frames:75},{name:'CC PIXEL POLLY',Comp:PollyDemo,frames:90},{name:'MOTION TILE',Comp:TileDemo,frames:60}];
export const FiveEffects=()=>{let from=0;return <AbsoluteFill>{demos.map(({name,Comp,frames})=>{const start=from;from+=frames;return <Sequence key={name} from={start} durationInFrames={frames}><Comp/><div style={{position:'absolute',bottom:16,left:12,padding:'7px 10px',background:'#000c',color:'white',fontFamily:'Arial',fontSize:15,fontWeight:700,border:'1px solid #555',borderRadius:4}}>{name}</div></Sequence>;})}</AbsoluteFill>;};
