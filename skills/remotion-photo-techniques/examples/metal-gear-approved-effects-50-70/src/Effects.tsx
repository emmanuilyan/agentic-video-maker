import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Img, OffthreadVideo, staticFile, interpolate, delayRender, continueRender} from 'remotion';
import {EffectProps, clamp} from './Comparison';
const asset=(s:string)=>staticFile('assets/'+s);
const lerp=(f:number,keys:number[],v:number[])=>interpolate(f,keys,v,clamp);
const Font:React.FC=()=>{
 const [h]=useState(()=>delayRender('Impact font'));
 useEffect(()=>{const font=new FontFace('ReviewImpact',`url(${asset('Impact.ttf')})`);font.load().then(x=>{document.fonts.add(x);continueRender(h);}).catch(()=>continueRender(h));},[h]);
 return null;
};
const Plate:React.FC<{name:string;style?:React.CSSProperties}>=({name,style})=><Img src={asset(name)} style={{position:'absolute',inset:0,width:1280,height:720,...style}}/>;
const Before:React.FC<{src:string;frame:number;at:number}>=({src,frame,at})=>frame<at?<OffthreadVideo src={staticFile(src)} muted style={{width:1280,height:720}}/>:null;
const Matrix:React.FC<{m:number[];children:React.ReactNode}>=({m,children})=><AbsoluteFill style={{transformOrigin:'0 0',transform:`matrix(${m.join(',')})`}}>{children}</AbsoluteFill>;
const matrixAt=(f:number,keys:number[],rows:number[][])=>rows[0].map((_,i)=>lerp(f,keys,rows.map(row=>row[i])));

export const GuitarRock:React.FC<EffectProps & {text?:string}>=({frame,text='ROCK SOUNDTRACK'})=>{
 const t=frame+225;
 const endScale=lerp(t,[280,289],[1,1.38]);const endOpacity=lerp(t,[282,285,287,288,289],[1,.72,.5,.25,0]);
 const gx=lerp(t,[229,232,236,239,242,245,249,255,261,267,273,279,280],[-850,-760,-350,-103,-12,0,5,9,12,18,33,49,51]);
 const gy=lerp(t,[229,236,239,242,245,249,255,261,267,273,279,280],[420,170,53,8,0,-4,-7,-8,-13,-8,-2,0]);
 const enter=lerp(t,[229,239],[0,1]);
 const titleY=lerp(t,[229,236,240,245,260,275],[170,86,6,0,-17,-5]);
 return <AbsoluteFill style={{background:'black'}}><Font/>
  <Plate name="guitar-next.jpg"/>
  {t<289&&<Plate name="guitar-bg.jpg" style={{opacity:lerp(t,[281,282,285,287,288,289],[1,.85,.5,.22,.1,0]),filter:t>=229?'blur(5px)':'none'}}/>}
  {t>=234&&t<289&&<Plate name="guitar-explosion.jpg" style={{opacity:lerp(t,[234,240,281,282,285,287,288,289],[0,1,1,.8,.7,.5,.25,0]),transform:`scale(${lerp(t,[234,282],[1.01,1.055])}) translate(${lerp(t,[234,278,289],[0,-22,-142])}px,${lerp(t,[234,282],[0,-9])}px)`,transformOrigin:'640px 360px',filter:`brightness(${1+.035*Math.sin(t*.8)})`,maskImage:t>=282?'radial-gradient(ellipse 380px 390px at 50% 50%, black 38%, transparent 100%)':'none'}}/>}
  {t>=229&&t<289&&<AbsoluteFill style={{opacity:enter*endOpacity,transform:`scale(${endScale})`,transformOrigin:'640px 360px'}}>
   <AbsoluteFill style={{background:'radial-gradient(ellipse at center,transparent 32%,rgba(30,65,172,.7) 92%)'}}/>
   <Plate name="guitar.png" style={{transform:`translate(${gx}px,${gy}px)`}}/>
   <svg width="1280" height="720" style={{position:'absolute',top:titleY,overflow:'visible'}}>
    <defs><linearGradient id="rock-rgb" gradientUnits="userSpaceOnUse" x1={230+19*Math.sin(t*.31)} x2={1055+19*Math.sin(t*.31)} y1={600+11*Math.cos(t*.4)} y2="575"><stop stopColor="#1649e9"/><stop offset=".18" stopColor="#34de38"/><stop offset=".39" stopColor="#042bdf"/><stop offset=".55" stopColor="#8eff1e"/><stop offset=".77" stopColor="#1442f5"/><stop offset="1" stopColor="#55e93f"/></linearGradient><filter id="rock-wave"><feTurbulence type="fractalNoise" baseFrequency="0.011 0.047" numOctaves="2" seed={Math.floor(t/3)} result="warp"/><feDisplacementMap in="SourceGraphic" in2="warp" scale="3" xChannelSelector="R" yChannelSelector="G"/></filter><filter id="rock-thin"><feMorphology in="SourceGraphic" operator="erode" radius="3.5"/></filter></defs>
    <g transform="rotate(-2 640 588)" filter="url(#rock-wave)">{[{dx:7,dy:2,c:'#f000bd',a:.68},{dx:-6,dy:-2,c:'#5bff1c',a:.65},{dx:0,dy:0,c:'url(#rock-rgb)',a:.76}].map((p,i)=><g key={i} opacity={p.a}>{[{word:'ROCK',x:260,width:226},{word:'SOUNDTRACK',x:520,width:522}].map(w=><text key={w.word} x={w.x+p.dx+2*Math.sin(t*.7+i)} y={638+p.dy} fill={p.c} stroke={i===2?'#123899':p.c} strokeWidth="1" paintOrder="stroke" fontFamily="ReviewImpact" fontSize="118" textLength={w.width} lengthAdjust="spacingAndGlyphs" filter="url(#rock-thin)">{text==='ROCK SOUNDTRACK'?w.word:(w.word==='ROCK'?text.split(' ')[0]:text.split(' ').slice(1).join(' '))}</text>)}</g>)}</g>
   </svg>
  </AbsoluteFill>}
  <Before src="guitar-source.mp4" frame={frame} at={4}/>
 </AbsoluteFill>;
};

export const ArticleCollage:React.FC<EffectProps>=({frame})=>{
 const t=frame+358;
 const s=lerp(t,[361,364,367,420,449],[1.25,1.1,.937,1,1.026]);
 const alpha=lerp(t,[361,367],[0,1]);
 const photoAlpha=lerp(t,[392,404],[0,1]);
 return <AbsoluteFill style={{background:'black'}}>
  <Plate name={t>=449?'article-next.jpg':'article-bg.jpg'}/>
  {t>=361&&t<449&&<AbsoluteFill style={{transform:`scale(${s})`,transformOrigin:'640px 360px'}}>
   <Img src={asset('composer-photo-clean.png')} style={{position:'absolute',left:318,top:118,width:645,height:484,opacity:photoAlpha}}/>
   <Img src={asset('composer-caption.png')} style={{position:'absolute',left:425,top:474,width:430,height:110,opacity:photoAlpha}}/>
   <Plate name="toontown-logo.png" style={{opacity:alpha,maskImage:`url(${asset('toontown-mask.png')})`,maskSize:'1280px 720px',maskRepeat:'no-repeat'}}/>
   <Plate name="disney-script.png" style={{opacity:alpha,transform:'scale(1.06723586)',transformOrigin:'640px 360px'}}/>
   {[{n:0,x:858,y:86,w:377,h:93,a:391,b:397,start:392,travel:470,solid:true},{n:1,x:806,y:212,w:450,h:72,a:394,b:400,start:395,travel:450,solid:false},{n:2,x:940,y:307,w:286,h:94,a:395,b:402,start:396,travel:400,solid:true}].map(p=>t>=p.start&&<Img key={p.n} src={asset(`article-${p.n}.png`)} style={{position:'absolute',left:p.x+lerp(t,[p.a,p.b],[p.travel,0]),top:p.y,width:p.w,height:p.h,opacity:p.solid?1:lerp(t,[p.a,p.b],[0,1])}}/>)}
  </AbsoluteFill>}
  {frame<3&&<Img src={staticFile(`article-prev-${frame}.png`)} style={{position:'absolute',inset:0,width:1280,height:720}}/>}
 </AbsoluteFill>;
};

const personKeys=[515,518,521,524,527,530,536,539,542,545,548,553,590,593];
const personMatrices=[[1,0,0,1,0,0],[1,0,0,1,0,0],[.999,.007,-.007,.999,19,-5],[.998,.03,-.03,.998,26.6,-34.4],[.996,.054,-.054,.996,43.1,-50.7],[.996,.069,-.069,.996,52.3,-61.8],[.996,.069,-.069,.996,52.3,-61.8],[1.001,.07,-.07,1.001,49,-13.4],[.968,.291,-.291,.968,147,20.3],[.924,.404,-.404,.924,218.3,.2],[.897,.433,-.433,.897,252,4],[.895,.438,-.438,.895,255,3],[.897,.425,-.425,.897,252,21],[.873,.455,-.455,.873,278,3]];
export const FallingPhoto:React.FC<EffectProps & {firstWord?:string;secondWord?:string}>=({frame,firstWord='ABOVE',secondWord='40'})=>{
 const t=frame+512;const scale=lerp(t,[593,602],[1,1.3]);const opacity=lerp(t,[593,595,597,599,601,602],[1,.85,.7,.55,.35,0]);
 const man=matrixAt(t,personKeys,personMatrices);
 const laptop=matrixAt(t,[515,520,530,535,539,543,547,593],[[1,0,0,1,0,0],[1,0,0,1,0,0],[.996,.07,-.07,.996,52,-52],[.996,.07,-.07,.996,52,-52],[.984,.18,-.18,.984,95,-70],[.94,.342,-.342,.94,178,-29],[.9,.436,-.436,.9,242,6],[.9,.436,-.436,.9,242,6]]);
 laptop[5]+=lerp(t,[537,540,544,548],[0,24,20,0]);
 const bladeIn=lerp(t,[515,520],[-900,0]);const bladeProgress=lerp(t,[537,539,542,546,548],[0,.35,.76,.95,1]);const bp=(a:number,b:number)=>a+(b-a)*bladeProgress;
 return <AbsoluteFill style={{background:'black'}}><Font/><Plate name="falling-next.jpg"/>
  {t>=515&&t<602&&<AbsoluteFill style={{transform:`scale(${scale})`,opacity,transformOrigin:'640px 360px'}}>
   <Plate name="room-clean.jpg"/>
   <Matrix m={man}><Plate name="person.png"/></Matrix>
   <Matrix m={laptop}><Plate name="laptop.png"/></Matrix>
   <svg width="1280" height="720" style={{position:'absolute',transform:`translate(${bladeIn}px,0px)`}}><path d={`M ${bp(568,621)} ${bp(308,533)} L ${bp(813,793)} ${bp(329,610)} L ${bp(852,816)} ${bp(345,636)} L ${bp(566,608)} ${bp(327,548)} Z`} fill="#a6a6a8" stroke="#64676a" strokeWidth="3"/><path d={`M ${bp(571,613)} ${bp(324,545)} L ${bp(813,812)} ${bp(342,636)} L ${bp(852,816)} ${bp(345,636)}`} fill="none" stroke="#edf0f1" strokeWidth="3"/><path d={`M ${bp(565,620)} ${bp(308,535)} L ${bp(656,669)} ${bp(315,556)} L ${bp(653,666)} ${bp(333,576)} L ${bp(564,604)} ${bp(327,550)} Z`} fill="#35383e"/></svg>
   {t>=551&&<svg width="1280" height="720" style={{position:'absolute',inset:0}}><text x="640" y="407" textAnchor="middle" fill="white" stroke="#262626" strokeWidth="2" paintOrder="stroke" fontFamily="Arial" fontWeight="900" fontSize="150">{firstWord}{t>=565?' '+secondWord:''}</text></svg>}
   <Plate name="blood.png" style={{opacity:lerp(t,[518,521],[0,1])}}/>
  </AbsoluteFill>}
  <Before src="falling-source.mp4" frame={frame} at={3}/>
 </AbsoluteFill>;
};

export const SoftMeme:React.FC<EffectProps & {text?:string}>=({frame,text='MEMES.'})=>{
 const t=frame+1318;const reveal=lerp(t,[1321,1328],[0,1]);
 const scale=lerp(t,[1321,1328,1361,1368],[.7,1,1,1.26]);
 const opacity=lerp(t,[1361,1368],[1,0]);const pictureOpacity=lerp(t,[1360,1361,1362,1363,1364,1366,1367,1368],[1,.9,.7,.55,.42,.2,.08,0]);const bob=4*Math.sin((t-1328)*.15);
  const top=lerp(t,[1327,1333],[-125,9]);const bottom=lerp(t,[1327,1333],[740,584]);
  return <AbsoluteFill style={{background:'black'}}><Font/><Plate name="meme-next.jpg"/><Plate name="meme-bg.jpg" style={{opacity:lerp(t,[1360,1362,1366],[1,.4,0])}}/>
  {t>=1321&&t<1368&&<AbsoluteFill style={{opacity:pictureOpacity*reveal,transform:`scale(${scale}) translateY(${bob}px)`,transformOrigin:'640px 360px'}}><Img src={asset('meme-picture.png')} style={{position:'absolute',left:240,top:110,width:800,height:610}}/></AbsoluteFill>}
  {t>=1328&&t<1368&&<AbsoluteFill style={{opacity:opacity*reveal,transform:`scale(${scale}) translateY(${bob}px)`,transformOrigin:'640px 360px'}}>{[top,bottom].map((y,i)=><div key={i} style={{position:'absolute',left:0,top:y,width:1280,textAlign:'center',fontFamily:'ReviewImpact',fontSize:119,lineHeight:'119px',color:'white',WebkitTextStroke:'5px black',paintOrder:'stroke',transform:'scaleX(1.08)'}}>{text}</div>)}</AbsoluteFill>}
  <Before src="meme-source.mp4" frame={frame} at={3}/>
 </AbsoluteFill>;
};
