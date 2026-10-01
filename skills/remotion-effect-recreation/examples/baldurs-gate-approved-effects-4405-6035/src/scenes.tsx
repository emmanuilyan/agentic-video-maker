import {useLayoutEffect,useRef} from 'react';
import {Video} from '@remotion/media';
import {AbsoluteFill, Img, Easing, interpolate, staticFile, useCurrentFrame, delayRender, continueRender, cancelRender} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const lerp = (frame: number, points: number[], values: number[]) => interpolate(frame, points, values, clamp);

const Tag: React.FC<{children: React.ReactNode}> = ({children}) => <div style={{position:'absolute',zIndex:40,left:20,top:15,color:'#fff',background:'#000b',padding:'7px 12px',font:'bold 18px Arial'}}>{children}</div>;
export const Comparison: React.FC<{source:string; time:string; title:string; children:React.ReactNode}> = ({source,time,title,children}) => <AbsoluteFill style={{background:'#08090e'}}>
  <div style={{position:'absolute',left:0,top:0,width:1280,height:720,overflow:'hidden'}}><Video src={staticFile(source)} muted style={{width:1280,height:720}}/><Tag>{`ОРИГИНАЛ · ${time}`}</Tag></div>
  <div style={{position:'absolute',left:1280,top:0,width:1280,height:720,overflow:'hidden'}}>{children}<Tag>{`REMOTION · ${title}`}</Tag></div>
  <div style={{position:'absolute',left:1277,top:0,width:6,height:720,background:'#ece7ee',zIndex:50}}/>
</AbsoluteFill>;
const BackgroundVideo: React.FC<{src:string}> = ({src}) => <Video src={staticFile(src)} muted style={{position:'absolute',width:1280,height:720,left:0,top:0}}/>;

const PokeballPattern: React.FC<{left:number}> = ({left}) => <div style={{position:'absolute',left,top:0,width:80,height:720,backgroundColor:'#fafafa'}}>{Array.from({length:4},(_,i)=><svg key={i} viewBox="0 0 80 200" width="80" height="200" style={{display:'block'}}><circle cx="40" cy="100" r="83" fill="none" stroke="#d6d7d9" strokeWidth="8"/><path d="M-40 100h170" stroke="#d6d7d9" strokeWidth="8"/><circle cx="40" cy="100" r="26" fill="#fff" stroke="#d6d7d9" strokeWidth="7"/></svg>)}</div>;
export const PokemonScene: React.FC<{backgroundSrc?:string;lines?:[string,string]}> = ({backgroundSrc="bg-pokemon.mp4",lines=["MAXOR used","HELP I AM TRAPPED AS A CAT"]}) => {
 const f=useCurrentFrame();const pane=f>=6?1:0;const rail=lerp(f,[13,20],[0,1]);
 const slide=lerp(f,[6,7,8,9,10,11,12,13,14,15,17,20,24],[55,52,56,43,35,21,12,12,8,6,4,2,-1]);const jitter=lerp(f,[6,7,8,9,10,11,12,14,20],[3,-3,-34,-21,-5,9,8,1,0]);const paneScale=lerp(f,[6,7,8,9,10,12,20,24],[.883,.89,.94,.966,.996,1.015,1.015,1]);const text=f>=8?1:0;const smear=lerp(f,[6,8,14,21],[6,4,2,0]);const skew=lerp(f,[6,8,12,20],[-8,2,-5,0]);
 return <AbsoluteFill style={{background:'#1d1b1c',overflow:'hidden'}}>
 <BackgroundVideo src={backgroundSrc}/>
 {f<6&&<div style={{position:'absolute',top:556,width:1280,textAlign:'center',color:'white',font:'36px "Times New Roman"',textShadow:'1px 2px #000'}}>[casts a completely normal spell]</div>}
 <div style={{opacity:rail}}><PokeballPattern left={0}/><PokeballPattern left={1200}/></div>
 <div style={{position:'absolute',inset:0,opacity:pane,filter:`blur(${smear}px)`,transform:`translate(${jitter}px,${slide}px) skewX(${skew}deg) scale(${paneScale})`,transformOrigin:'50% 86%'}}>
 <div style={{position:'absolute',left:350,top:565,width:575,height:103,border:'4px solid #df392b',borderLeftWidth:15,borderRightWidth:15,borderRadius:14,background:'#5ba8ae',boxShadow:'5px 6px 0 #4d0c21',boxSizing:'border-box'}}/>
 <div style={{position:'absolute',left:386,top:574,opacity:text,color:'#fff',font:'37px VT323, monospace',letterSpacing:0,lineHeight:1.05,textShadow:'2px 2px #446a70',whiteSpace:'nowrap'}}>{lines[0]}<br/>{lines[1]}</div>
 </div></AbsoluteFill>;
};

export const CountdownScene: React.FC<{backgroundSrc?:string;text?:string}> = ({backgroundSrc="bg-countdown-inpaint.mp4",text="4 turns before the BUILDING EXPLODES"}) => {
  const f=useCurrentFrame();
  const scale=interpolate(f,[5,8],[.17,.94],{...clamp,easing:Easing.out(Easing.cubic)});
  const opacity=lerp(f,[5,8,78,95],[0,1,1,.82]);
  return <AbsoluteFill style={{background:'#13191b',overflow:'hidden'}}>
    <div style={{position:'absolute',inset:0,transform:`scale(${lerp(f,[0,56,93],[1,1.02,1.09])})`,filter:`blur(${lerp(f,[57,80,95],[0,0,6])}px)`}}><BackgroundVideo src={backgroundSrc}/></div>
    <div style={{position:'absolute',inset:0,background:'radial-gradient(circle at 52% 45%,#ffc154,transparent 42%)',mixBlendMode:'screen',opacity:lerp(f,[55,69,80,95],[0,0,.8,.35])}}/>
    <div style={{position:'absolute',left:0,top:540,width:1280,textAlign:'center',whiteSpace:'nowrap',opacity,transform:`scale(${scale*1.05},${scale})`,filter:`blur(${lerp(f,[55,67,95],[0,4,7])}px)`,font:'53px Impact, "Arial Narrow", sans-serif',color:'#f4f86a',WebkitTextStroke:'7px #a00061',paintOrder:'stroke fill',textShadow:'3px 4px #2d071b, 0 0 5px #13050d'}}>{text}</div>
  </AbsoluteFill>;
};

export const PokemonComparison:React.FC = () => <Comparison source="ref-pokemon.mp4" time="44.05–45.57" title="Pokémon Battle Callout"><PokemonScene/></Comparison>;
export const CountdownComparison:React.FC = () => <Comparison source="ref-countdown.mp4" time="45.55–47.15" title="Explosion Countdown"><CountdownScene/></Comparison>;

/** A block-to-glyph reveal. The background is a replaceable clean video. */
export const PixelImpactCaption:React.FC<{text?:string;glyphAsset?:string;endFrame?:number}> = ({text='[enters n64 mode]',glyphAsset,endFrame=75}) => {
 const f=useCurrentFrame();const ref=useRef<HTMLCanvasElement>(null);
 useLayoutEffect(()=>{
  const handle=delayRender('Pixel font for caption');
  const draw=async()=>{await document.fonts.load('700 72px "Pixelify Sans"');
  const canvas=ref.current;if(!canvas)return;const ctx=canvas.getContext('2d');if(!ctx)return;
  ctx.clearRect(0,0,740,120);if(f<4)return;
  const plate=document.createElement('canvas');plate.width=740;plate.height=120;const c=plate.getContext('2d')!;
  c.font=f<14?'italic bold 72px Impact':'bold 72px "Pixelify Sans"';c.textAlign='center';c.textBaseline='middle';
  c.translate(370,0);c.scale(690/c.measureText(text).width,1);c.translate(-370,0);c.lineWidth=11;c.strokeStyle='#64302e';c.strokeText(text,374,61,690);
  c.lineWidth=7;c.strokeStyle='#d88d83';c.strokeText(text,370,55,690);
  const gradient=c.createLinearGradient(0,20,0,90);gradient.addColorStop(0,'#fff1d1');gradient.addColorStop(.45,'#ecd5a2');gradient.addColorStop(1,'#be8a30');c.fillStyle=gradient;c.fillText(text,370,55,690);
  if(glyphAsset&&f>=14){
   const image=new Image();await new Promise<void>((resolve,reject)=>{image.onload=()=>resolve();image.onerror=reject;image.src=staticFile(glyphAsset)});
   c.resetTransform();c.clearRect(0,0,740,120);c.drawImage(image,0,0,740,120);
  }
  if(f<14){
   // Average only ink, keeping opaque gold/pink cells rather than alpha-smearing the depth layer.
   const pixels=c.getImageData(0,0,740,120).data;
   const wordGaps=Array.from(text).flatMap((char,i)=>char===' '?[25+690*(c.measureText(text.slice(0,i)).width+c.measureText(' ').width/2)/c.measureText(text).width]:[]);
   const cols=Math.round(lerp(f,[4,8,13],[48,48,64]));const rows=f<6?1:f<8?2:3;
   const span=lerp(f,[4,8,13],[500,650,700]);const cellW=span/cols;
   const outH=lerp(f,[4,8,13],[42,84,96]);const y0=lerp(f,[4,8,13],[48,16,12]);
   for(let row=0;row<rows;row++)for(let col=0;col<cols;col++){
    let red=0,green=0,blue=0,count=0,total=0;
    const x0=Math.floor(col*740/cols),x1=Math.ceil((col+1)*740/cols);
    if(wordGaps.some(g=>Math.abs((x0+x1)/2-g)<10))continue;
    const sy0=Math.floor(row*120/rows),sy1=Math.ceil((row+1)*120/rows);
    for(let y=sy0;y<sy1;y++)for(let x=x0;x<x1;x++){
     const k=(y*740+x)*4;total++;if(pixels[k+3]>100){red+=pixels[k];green+=pixels[k+1];blue+=pixels[k+2];count++;}
    }
    const coverage=count/total;
    if(coverage<(rows>1&&row===0?.3:rows>1&&row===rows-1?.24:.09))continue;
    if(rows>1&&row===0)ctx.fillStyle='#e49a8c';
    else if(rows===1||row===rows-1)ctx.fillStyle=coverage>.65?'#e7cd8b':coverage>.3?'#be913d':'#905b29';
    else ctx.fillStyle=`rgb(${Math.round(red/count)},${Math.round(green/count)},${Math.round(blue/count)})`;
    ctx.fillRect((740-span)/2+col*cellW,y0+row*outH/rows,cellW*.8,outH/rows);
   }
  }else{
   const tiny=document.createElement('canvas');tiny.width=Math.round(lerp(f,[14,20],[80,144]));tiny.height=Math.round(lerp(f,[14,20],[6,24]));
   tiny.getContext('2d')!.drawImage(plate,0,0,tiny.width,tiny.height);
   ctx.imageSmoothingEnabled=false;ctx.drawImage(tiny,0,0,740,120);
  }
  };draw().then(()=>continueRender(handle)).catch(cancelRender);
 },[f,text,glyphAsset]);
 return <canvas ref={ref} width={740} height={120} style={{position:'absolute',left:270,top:520,width:740,height:120,opacity:f>=endFrame?0:1}}/>;
};
export const N64Scene:React.FC=()=> <AbsoluteFill><BackgroundVideo src="bg-n64.mp4"/><PixelImpactCaption glyphAsset="n64-glyphs.svg"/></AbsoluteFill>;

/** Screen-fixed border, independently scaling two caption layers. */
export const ComicCaption:React.FC<{text:string;start:number;bottom?:boolean}> = ({text,start,bottom=false}) => {
 const f=useCurrentFrame(); const s=interpolate(f,[start,start+7],[.08,1],{...clamp,easing:Easing.out(Easing.cubic)});
 return <div style={{position:'absolute',left:0,top:bottom?580:16,width:1280,textAlign:'center',opacity:f<start?0:1,transform:`scale(${s*1.6},${s}) skewX(-10deg)`,font:'76px Anton',letterSpacing:1,color:'#a3d4ed',background:'linear-gradient(#ade4cd 15%,#5a94d8 49%,#15239c 56%,#1734d3 90%)',backgroundClip:'text',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',WebkitTextStroke:'2px #3484c5',paintOrder:'stroke fill',filter:'drop-shadow(2px 3px 0 #234f94) drop-shadow(2px 3px 0 #142b76) drop-shadow(2px 4px 0 #0d1658) drop-shadow(0 0 7px #e4dc65)' }}>{text}</div>;
};
export const ComicScene:React.FC=()=> {const f=useCurrentFrame();const zoom=lerp(f,[24,35,50,83],[1,2.0,4.3,6.7]);if(f<2)return <AbsoluteFill><BackgroundVideo src="bg-comic.mp4"/></AbsoluteFill>;return <AbsoluteFill style={{overflow:'hidden'}}><Img src={staticFile(f<24?'comic-wide.png':'comic-medium.png')} style={{position:'absolute',width:1280,height:720,transform:f<24?'none':`scale(${zoom})`,transformOrigin:'51% 50%'}}/><Img src={staticFile('comic-frame.png')} style={{position:'absolute',width:1280,height:720}}/><ComicCaption text="IGNORE WOMEN" start={46}/><ComicCaption text="BOTTOM TEXT" start={61} bottom/></AbsoluteFill>;};

/** Character UI footage, name pop, meme insert and a three-word Gothic build. */
export const NameplateCycle:React.FC=()=>{
 const f=useCurrentFrame();const dark=f>=104;const entry=dark?(f<122?104:f<147?122:147):30;
 const text=dark?(f<122?'THE':f<147?'THE DARK':'THE DARK URGE'):'ASTARION';
 const s=interpolate(f,[entry,entry+(dark?10:7)],[dark?.7:.25,1],{...clamp,easing:Easing.out(Easing.cubic)});
 return <AbsoluteFill><BackgroundVideo src="bg-names.mp4"/>
 {!dark&&f>=75&&<Img src={staticFile('astarion-meme.png')} style={{position:'absolute',left:190,top:80,width:290,height:400,transform:`scale(${lerp(f,[75,81],[.7,1])})`,transformOrigin:'center bottom'}}/>}
 {dark&&f<193&&<Img src={staticFile(f<122?'the.svg':f<147?'the-dark.svg':'the-dark-urge.svg')} style={{position:'absolute',left:0,top:440,width:1280,height:240,transform:`scale(${s})`,transformOrigin:'50% 60%',filter:'drop-shadow(3px 5px 0 #503093) drop-shadow(0 0 8px #bf26ae) drop-shadow(0 0 10px #8457b9)'}}/>}
 {f>=30&&!dark&&<div style={{position:'absolute',left:0,top:dark?500:520,width:1280,textAlign:'center',whiteSpace:'nowrap',transform:`scale(${dark?s*.92:s},${s})`,font:dark?'139px BlackletterNarrow':'144px "Times New Roman"',color:dark?'#d51985':'#f8ede0',letterSpacing:dark?-2:0,textShadow:dark?'3px 5px #503093, 0 0 16px #d422be, 0 0 28px #9257cd':'2px 4px #86344e, 4px 6px #310f25',WebkitTextStroke:dark?'1px #9d168e':'0px'}}>{text}</div>}
 </AbsoluteFill>;
};
export const N64Comparison:React.FC=()=> <Comparison source="ref-n64.mp4" time="47.75–49.15" title="Pixel Impact Caption"><N64Scene/></Comparison>;
export const ComicComparison:React.FC=()=> <Comparison source="ref-comic.mp4" time="51.45–52.85" title="Comic Frame + Two Captions"><ComicScene/></Comparison>;
export const NamesComparison:React.FC=()=> <Comparison source="ref-names.mp4" time="57.10–60.35" title="Character Nameplate Cycle"><NameplateCycle/></Comparison>;
