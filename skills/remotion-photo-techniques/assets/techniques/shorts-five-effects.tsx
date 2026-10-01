import React, {useMemo} from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {useLoader} from '@react-three/fiber';
import {TextureLoader, SRGBColorSpace} from 'three';

export const smooth = (p:number) => {const t=Math.min(1,Math.max(0,p));return t*t*(3-2*t);};
export const mod = (n:number,m:number) => ((n%m)+m)%m;
export const rand = (n:number) => {const r=Math.sin(n*127.1+311.7)*43758.5453;return r-Math.floor(r);};

/** Echo samples actual earlier states of a moving layer. */
export function Echo({renderAt,copies=10,delayFrames=11,decay=1,frame}: {
  renderAt:(frame:number)=>React.ReactNode;copies?:number;delayFrames?:number;decay?:number;frame?:number;
}) {
  const current=useCurrentFrame();const f=frame??current;
  return <AbsoluteFill>{Array.from({length:copies},(_,i)=>{
    const age=copies-1-i;
    return <AbsoluteFill key={age} style={{opacity:Math.pow(decay,age),mixBlendMode:'screen'}}>{renderAt(f-age*delayFrames)}</AbsoluteFill>;
  })}</AbsoluteFill>;
}

/** Tight edge bloom and two progressively wider halos around existing alpha. */
export function Glow({children,radii=[1.5,8,26],strength=1}: {children:React.ReactNode;radii?:number[];strength?:number}) {
  return <AbsoluteFill>{radii.slice().reverse().map((radius,i)=><AbsoluteFill key={i} style={{filter:`blur(${radius}px)`,opacity:strength*[0.16,0.45,0.8][i],mixBlendMode:'screen'}}>{children}</AbsoluteFill>)}<AbsoluteFill>{children}</AbsoluteFill></AbsoluteFill>;
}

/** Repeats a cell with modulo coordinates; content crosses edges without a reset. */
export function MotionTile({children,tileWidth,tileHeight,speedX=0,speedY=-1.5,mirror=false,frame}: {
  children:React.ReactNode;tileWidth:number;tileHeight:number;speedX?:number;speedY?:number;mirror?:boolean;frame?:number;
}) {
  const current=useCurrentFrame();const {width,height}=useVideoConfig();const f=frame??current;
  const x=mod(f*speedX,tileWidth),y=mod(f*speedY,tileHeight);
  return <AbsoluteFill style={{overflow:'hidden'}}>{Array.from({length:Math.ceil(height/tileHeight)+2},(_,row)=>Array.from({length:Math.ceil(width/tileWidth)+2},(_,col)=><div key={`${row}-${col}`} style={{position:'absolute',left:(col-1)*tileWidth+x,top:(row-1)*tileHeight+y,width:tileWidth,height:tileHeight,transform:mirror?`scale(${col%2?-1:1},${row%2?-1:1})`:undefined}}>{children}</div>))}</AbsoluteFill>;
}

export type PollyRegion = {x:number;y:number;width:number;height:number;start:number;direction?:number};
/** A masked portion of one SVG/image is partitioned into real triangular pieces. */
export function PixelPolly({src,width,height,regions,cell=7,seed=7,frame}: {
  src:string;width:number;height:number;regions:PollyRegion[];cell?:number;seed?:number;frame?:number;
}) {
  const current=useCurrentFrame();const {fps}=useVideoConfig();const f=frame??current;
  const pieces=useMemo(()=>regions.flatMap((region,regionIndex)=>{
    const result:Array<{id:number;points:string;cx:number;cy:number;region:PollyRegion}>=[];
    const cols=Math.ceil(region.width/cell),rows=Math.ceil(region.height/cell);
    for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){
      const x=region.x+col*cell,y=region.y+row*cell,w=Math.min(cell,region.x+region.width-x),h=Math.min(cell,region.y+region.height-y);
      const triangles=[[[x,y],[x+w,y],[x+w,y+h]],[[x,y],[x+w,y+h],[x,y+h]]];
      triangles.forEach((t,k)=>result.push({id:regionIndex*100000+row*cols*2+col*2+k,points:t.map(p=>p.join(',')).join(' '),cx:t.reduce((a,p)=>a+p[0],0)/3,cy:t.reduce((a,p)=>a+p[1],0)/3,region}));
    }
    return result;
  }),[regions,cell]);
  return <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`}>
    <defs>
      <mask id="polly-rest"><rect width={width} height={height} fill="white"/>{regions.filter(r=>f>=r.start).map((r,i)=><rect key={i} x={r.x} y={r.y} width={r.width} height={r.height} fill="black"/>)}</mask>
      {pieces.map(p=><clipPath key={p.id} id={`shard-${p.id}`}><polygon points={p.points}/></clipPath>)}
    </defs>
    <image href={src} width={width} height={height} mask="url(#polly-rest)"/>
    {pieces.map(p=>{
      if(f<p.region.start)return null;
      const time=Math.max(0,(f-p.region.start-rand(p.id+seed*31+27)*18)/fps);
      const n=p.id+seed*31;
      const vx=-20+(rand(n)-0.5)*85,vy=(rand(n+7)-0.5)*70;
      const x=vx*time,y=vy*time+(p.region.direction??1)*32*time*time;
      const rotation=(rand(n+11)-0.5)*420*time;
      // Perspective-like thinning is deterministic and leaves the initial mesh intact.
      const sx=Math.cos(time*(2+rand(n+19)*7)),opacity=1-smooth((time-2.8)/0.7);
      return <g key={p.id} opacity={opacity} transform={`translate(${x} ${y}) translate(${p.cx} ${p.cy}) rotate(${rotation}) scale(${sx} 1) translate(${-p.cx} ${-p.cy})`}><image href={src} width={width} height={height} clipPath={`url(#shard-${p.id})`}/></g>;
    })}
  </svg>;
}

const vertex=`varying vec2 vUv; void main(){vUv=uv;gl_Position=vec4(position,1.0);}`;
const fragment=`
uniform sampler2D uImage; uniform float uAspect; uniform float uRadius; uniform float uAmount; varying vec2 vUv;
void main(){
 vec2 d=vUv-vec2(0.5); vec2 metric=vec2(d.x*uAspect,d.y); float r=length(metric); float q=r/uRadius;
 if(q>1.0){gl_FragColor=vec4(0.,0.,0.,1.);return;}
 // The spherical fold brings image coordinates back toward the center at the rim.
 // Unlike a normal magnifying glass, it produces repeated title fragments at the circumference.
 float fold=sqrt(max(0.,1.-q*q));
 vec2 anchor=vec2(0.5,0.466);
 vec2 uv=anchor+(vUv-anchor)*mix(1.,fold,uAmount);
 vec4 c=texture2D(uImage,clamp(uv,0.,1.));
 c.rgb*=1.-0.08*uAmount*q*q;
 gl_FragColor=vec4(c.rgb,1.);
 #include <colorspace_fragment>
}`;
const LensPlane=({src,radius,amount,aspect}:{src:string;radius:number;amount:number;aspect:number})=>{
  const texture=useLoader(TextureLoader,src);texture.colorSpace=SRGBColorSpace;
  const uniforms=useMemo(()=>({uImage:{value:texture},uRadius:{value:radius},uAmount:{value:amount},uAspect:{value:aspect}}),[texture,radius,amount,aspect]);
  return <mesh><planeGeometry args={[2,2]}/><shaderMaterial uniforms={uniforms} vertexShader={vertex} fragmentShader={fragment} depthTest={false}/></mesh>;
};
export function CCLens({src,radius,amount=1}: {src:string;radius:number;amount?:number}) {
  const {width,height}=useVideoConfig();
  return <ThreeCanvas width={width} height={height} dpr={1} flat gl={{antialias:true}}><LensPlane src={src} radius={radius} amount={amount} aspect={width/height}/></ThreeCanvas>;
}
