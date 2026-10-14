import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, interpolate, Sequence, staticFile, useCurrentFrame} from 'remotion';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ramp = (frame: number, start: number, end: number) => interpolate(frame, [start, end], [0, 1], clamp);
const plate = (startSeconds: number, trimAfter?: number, style: React.CSSProperties = {}) => (
  <OffthreadVideo
    src={staticFile('source-59-90.mp4')}
    trimBefore={Math.round(startSeconds * 60)}
    trimAfter={trimAfter === undefined ? undefined : Math.round(startSeconds * 60) + trimAfter}
    muted
    volume={0}
    style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...style}}
  />
);
const img = (file: string, style: React.CSSProperties = {}) => (
  <Img src={staticFile(`assets/${file}`)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...style}} />
);
const titleBase: React.CSSProperties = {
  position: 'absolute',
  whiteSpace: 'nowrap',
  fontFamily: 'Impact, Haettenschweiler, "Arial Narrow", sans-serif',
  fontWeight: 900,
  lineHeight: 0.9,
};

// 01 — wide red frame, low-set cyan title and a very short full-frame RGB hit.
export const DogDoing: React.FC = () => {
  const f = useCurrentFrame();
  const title = f < 7 ? 0 : Math.min(1, 1 - .36 * Math.pow(Math.max(0, 12 - f) / 5, 1.4));
  const subtitle = ramp(f, 7, 12);
  const kick = ramp(f, 62, 68);
  const exit = ramp(f, 55, 60);
  const middlePlate = ramp(f, 20, 26);
  const latePlate = ramp(f, 44, 50);
  const patchMask = 'linear-gradient(to bottom, transparent 0%, transparent 60%, black 67%)';
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: '#101116', transform: `scale(${1 + kick * 0.045}) translateX(${kick * 6}px) skewX(${kick * -1.2}deg)`, filter: `saturate(${1 + kick * 0.15}) contrast(${1 + kick * 0.05})`}}>
      {plate(.65)}
      {f >= 7 && f < 60 && <>
        {img('dog-clean-f12.png', {maskImage: patchMask, WebkitMaskImage: patchMask, opacity: 1-middlePlate})}
        {img('dog-clean-f30.png', {maskImage: patchMask, WebkitMaskImage: patchMask, opacity: middlePlate*(1-latePlate)})}
        {img('dog-clean-f55.png', {maskImage: patchMask, WebkitMaskImage: patchMask, opacity: latePlate})}
      </>}
      {f >= 7 && f < 55 && <>
        <div style={{position:'absolute',left:0,right:0,bottom:12,height:12,background:'#ed171e'}}/>
        <div style={{position:'absolute',left:0,top:432,bottom:12,width:12,background:'#ed171e'}}/>
        <div style={{position:'absolute',right:0,top:432,bottom:12,width:12,background:'#ed171e'}}/>
      </>}
      <div style={{position: 'absolute', inset: 0}}>
        <div style={{...titleBase, left: 60, bottom: 95, fontSize: 150, letterSpacing: -1, color: 'transparent', background: 'linear-gradient(#aefeff 5%, #02ddf5 48%, #3538ba 85%)', backgroundClip: 'text', WebkitBackgroundClip: 'text', WebkitTextStroke: '1px #06151c', filter: 'drop-shadow(4px 5px 0 #10182a)', opacity: f >= 7 ? 1-exit : 0, transform: `translateX(${-(1-title)*850+exit*200}px) scaleX(0.67)`, transformOrigin: 'left bottom'}}>WHAT THE DOG DOING</div>
        <div style={{...titleBase, left: 70, bottom: 32, fontSize: 80, letterSpacing: 0, color: '#21be20', WebkitTextStroke: '1px #10200b', textShadow: '2px 3px 0 #17210a', opacity: f >= 9 ? 1-exit : 0, transform: `translateX(${-(1-subtitle)*520-exit*250}px) scaleX(.7)`, transformOrigin: 'left bottom'}}>what is he doing</div>
      </div>
      <AbsoluteFill style={{opacity: kick * 0.08, mixBlendMode: 'screen', background: 'linear-gradient(104deg, #ff113b 0 26%, transparent 33% 42%, #00ddff 48% 65%, transparent 73% 82%, #ff153f 88%)'}} />
    </AbsoluteFill>
  );
};

// 02 — large portrait/title state, then the abrupt cut to gameplay.
export const GodFreed: React.FC = () => {
  const f = useCurrentFrame();
  const enter = ramp(f, 1, 5);
  const word = ramp(f, 2, 10);
  const sub = ramp(f, 7, 13);
  const push = ramp(f, 35, 41);
  const gameReveal = ramp(f, 39, 42);
  const cut = f >= 42 ? 1 : 0;
  return <AbsoluteFill style={{overflow:'hidden',background:'#18130b'}}>
    {img('god-previous.png')}
    <div style={{position:'absolute',inset:0,opacity:enter*(1-cut),transform:`scale(${1+push*.3})`,transformOrigin:'65% 48%',filter:`blur(${push*9}px)`}}>{img('god-clean-ai.png')}</div>
    <div style={{...titleBase,left:70-(1-word)*750+push*120,top:365-push*90,fontFamily:'Georgia, serif',fontSize:285,fontWeight:900,transform:`scaleX(.35) scaleY(${1+push*.15})`,transformOrigin:'left center',color:'transparent',background:'linear-gradient(#ffef11 10%,#ffc811 42%,#ee2410 95%)',backgroundClip:'text',WebkitBackgroundClip:'text',WebkitTextStroke:'2px #1d1003',filter:'drop-shadow(7px 6px 0 #130000)',opacity:word*(1-ramp(f,36,42))}}>GOD FREED</div>
    <div style={{position:'absolute',left:90-push*130,top:610,fontFamily:'Arial, sans-serif',fontSize:70,color:'#f53a0c',textShadow:'2px 2px #702bc6',opacity:sub*(1-ramp(f,36,42))}}>not in this video yet</div>
    <div style={{position:'absolute',inset:12,border:'12px solid #ffa245',opacity:enter*(1-ramp(f,36,40))}}/>
    {f>=39 && f<42 && img('god-next.png',{opacity:gameReveal,filter:'blur(2px)'})}
    <div style={{position:'absolute',inset:0,opacity:cut}}>{plate(3.15)}</div>
  </AbsoluteFill>;
};

export const PartOneCard: React.FC = () => {
  const f = useCurrentFrame();
  const card = f >= 53;
  const credit = f >= 197;
  const cardDrift = Math.pow(ramp(f,53,196),.85);
  const phrase = 'AN INCORRECT SUMMARY OF';
  const headPrefix = f === 0 ? '@' : f < 8 ? 'AN ' : f < 15 ? 'AN INCORRECT ' : f < 22 ? 'AN INCORRECT SUMMARY ' : phrase;
  const headSuffix = f === 0 ? '|' : f < 8 ? '!M$()/I9<' : f < 15 ? '$%L&()!!' : f < 22 ? '07' : '';
  const suffixShadow = f < 15 ? '#3024a8' : '#39b767';
  return <AbsoluteFill style={{overflow:'hidden',background:'#000'}}>
    {!card && <>
      {plate(6.75,53)}
      {img('part-clean-green.png',{WebkitMaskImage:'linear-gradient(to bottom,black 0%,black 28%,transparent 53%)',maskImage:'linear-gradient(to bottom,black 0%,black 28%,transparent 53%)'})}
    </>}
    {!credit && <>
      <div style={{position:'absolute',left:'50%',width:'max-content',top:31,textAlign:'center',whiteSpace:'nowrap',fontFamily:'Impact, sans-serif',fontSize:150,lineHeight:.95,color:'#fff',transform:'translateX(-50%) scaleX(.71)'}}>{headPrefix}<span style={{color:'#fff',textShadow:`5px 5px 0 ${suffixShadow}`}}>{headSuffix}</span></div>
      <div style={{position:'absolute',left:0,right:0,top:164,textAlign:'center',fontFamily:'Arial, sans-serif',fontSize:100,lineHeight:1,color:'#fff'}}>{f >= 29 ? 'Elden Ring' : f >= 22 ? 'Elden' : ''}</div>
      <div style={{position:'absolute',left:950,top:160,fontFamily:'Arial, sans-serif',fontWeight:700,fontSize:52,color:'#fff'}}>{f >= 43 ? '(help me)' : f >= 36 ? '(help' : ''}</div>
      {card && <>
        <div style={{position:'absolute',left:603+26*cardDrift,width:'max-content',top:268,textAlign:'center',whiteSpace:'nowrap',fontFamily:'Arial Black, Arial, sans-serif',fontSize:330,fontWeight:1000,lineHeight:.82,letterSpacing:-6,color:'#fff',transform:'translateX(-50%) scaleX(.85) scaleY(.987)',transformOrigin:'center top'}}>PART 1</div>
        <div style={{position:'absolute',left:0,right:0,top:529,textAlign:'center',fontFamily:'Arial, sans-serif',fontSize:100,fontWeight:800,color:'#fff',transform:`translateX(${4-29*cardDrift}px) scaleX(.987) scaleY(.97)`,transformOrigin:'center top'}}>The Moon and Stars</div>
      </>}
    </>}
    {credit && <div style={{position:'absolute',left:122,bottom:88,fontFamily:'Arial, sans-serif',fontSize:66,fontWeight:800,color:'#fff',transform:'scaleX(1.15)',transformOrigin:'left center'}}>Made by MaxOr</div>}
  </AbsoluteFill>;
};

export const MadeByMaxor: React.FC = () => {
  const f = useCurrentFrame();
  const logo = ramp(f,47,78);
  const credit = 1-ramp(f,65,73);
  const push = f >= 157 ? 0 : f < 115 ? .5*ramp(f,110,115) : .5+.5*ramp(f,115,130);
  const pressIn = ramp(f,133,142);
  const pressSettle = ramp(f,150,156);
  const entry = ramp(f,182,190);
  return <AbsoluteFill style={{overflow:'hidden',background:'#000'}}>
    <div style={{position:'absolute',inset:0,opacity:logo,transform:`translateY(${-110-push*105}px) scale(${.74+.26*logo+push*1.05})`,transformOrigin:'50% 72%',filter:`blur(${f>=110&&f<130?2+push*(1-push)*14:0.7}px)`}}>{img('logo.png',{objectFit:'contain'})}</div>
    <div style={{position:'absolute',left:122,bottom:88,fontFamily:'Arial, sans-serif',fontSize:66,fontWeight:800,color:'#fff',opacity:credit,transform:'scaleX(1.15)',transformOrigin:'left center'}}>Made by MaxOr</div>
    <div style={{position:'absolute',left:270,right:270,bottom:165,height:40,background:'radial-gradient(ellipse,#d99c32,transparent 72%)',filter:'blur(8px)',opacity:push*.65}}/>
    <div style={{position:'absolute',left:0,right:0,bottom:180,textAlign:'center',fontFamily:'Georgia, serif',fontSize:13,color:'#b6a77a',opacity:logo,transform:`scale(${1+push*.7})`,textShadow:`0 0 ${push*16}px #ffd179`}}>PRESS ANY BUTTON</div>
    {f >= 133 && f < 157 && <div style={{position:'absolute',left:0,right:0,top:268+20*(1-pressIn)+pressSettle*20,textAlign:'center',whiteSpace:'nowrap',fontFamily:'Georgia, serif',fontSize:76,color:'#dad7d2',opacity:.15+.85*pressIn,filter:`blur(${12-pressIn*8-pressSettle*3.5}px)`,textShadow:'-8px 1px 6px #aab4bd, 9px -2px 8px #8e806d',transform:`translateX(${Math.sin(f*5)*8}px) scale(${.78+.22*pressIn})`}}>PRESS ANY BUTTON</div>}
    <div style={{position:'absolute',right:25-(1-entry)*480,bottom:18,width:430,height:245,opacity:f>=182?1:0}}>{img('anime.png')}</div>
  </AbsoluteFill>;
};

export const KeyboardCollage: React.FC = () => {
  const f = useCurrentFrame();
  const a = ramp(f,63,71);
  const b = ramp(f,73,81);
  const c = ramp(f,60,68);
  const caption = ramp(f,136,147);
  const push = ramp(f,150,178);
  const flash = f>=104 && f<114;
  const flashStrength = flash ? 1-ramp(f,108,114) : 0;
  return <AbsoluteFill style={{overflow:'hidden',background:'#21170d'}}>
    <svg width="0" height="0" style={{position:'absolute'}}><filter id="keyboardPosterize" colorInterpolationFilters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="table" tableValues="0 0.8 1 1 1"/><feFuncG type="table" tableValues="0 0 0.95 1 1"/><feFuncB type="table" tableValues="0 0 0 0 0"/></feComponentTransfer></filter></svg>
    {f < 62 && plate(14.5,62)}
    {f >=62 && f < 114 && img('desk-bg.png')}
    {flash && <Sequence from={104} durationInFrames={10} layout="none"><div style={{position:'absolute',inset:0,transform:'scale(1.15)',transformOrigin:'50% 60%',filter:'brightness(1.8) contrast(2.5) url(#keyboardPosterize) blur(2px)',opacity:flashStrength}}><OffthreadVideo src={staticFile('assets/desk-slow-clean.mp4')} muted style={{position:'absolute',inset:0,width:'100%',height:'100%'}}/></div></Sequence>}
    {f>=114 && f<179 && <Sequence from={114} durationInFrames={65} layout="none"><div style={{position:'absolute',inset:0,transform:`scale(${1+push*.17})`,transformOrigin:'54% 45%'}}><OffthreadVideo src={staticFile('assets/desk-slow-clean.mp4')} muted style={{position:'absolute',inset:0,width:'100%',height:'100%'}}/></div></Sequence>}
    {f>=62 && f<104 && <>
      <div style={{position:'absolute',left:0,top:0,width:590,height:390,clipPath:'polygon(17% 5%, 89% 32%, 85% 88%, 4% 52%)',transform:`translate(${(1-a)*-620}px, ${(1-a)*-220}px)`}}>{img('keyboard-a.png')}</div>
      <div style={{position:'absolute',right:0,top:0,width:520,height:390,clipPath:'polygon(8% 22%, 73% 32%, 95% 73%, 26% 90%, 5% 26%)',transform:`translate(${(1-b)*560}px, ${(1-b)*-220}px)`}}>{img('keyboard-b.png')}</div>
      <div style={{position:'absolute',left:0,bottom:0,width:640,height:330,transform:`translate(${(1-c)*-180}px, ${(1-c)*350}px)`}}>{img('keyboard-c.png')}</div>
    </>}
    {flash && <AbsoluteFill style={{background:'linear-gradient(115deg,#c40000,#ff1c00 55%,#ffe100)',mixBlendMode:'color',opacity:.14*flashStrength}}/>}
    {f>=138 && f<179 && <>
      <div style={{position:'absolute',left:50-(1-caption)*950,top:100,width:1050,whiteSpace:'pre-line',fontFamily:'Arial, sans-serif',fontWeight:800,fontSize:56,lineHeight:1,color:'#dcd02a',textShadow:'0 3px 0 #00af93, 2px 4px 0 #111'}}>I need to unplug my keyboard{'\n'}literally every time I boot up{'\n'}this video game</div>
      <div style={{position:'absolute',inset:0,border:`${10+push*14}px solid #f29a40`,opacity:ramp(f,146,150)}}/>
    </>}
    {f>=179 && img('settings-cut.png')}
  </AbsoluteFill>;
};

export const CharacterSmear: React.FC = () => {
  const f = useCurrentFrame();
  const zoom = ramp(f,104,109);
  const blur = f>=104 ? 1-ramp(f,104,109) : 0;
  const left = ramp(f,105,112);
  const right = ramp(f,110,118);
  return <AbsoluteFill style={{overflow:'hidden',background:'#141411'}}>
    {f<104 && plate(17.25,104)}
    {f>=104 && <div style={{position:'absolute',inset:0,transform:`scale(${1.2-zoom*.1})`,transformOrigin:'50% 45%',filter:`blur(${blur*5}px)`}}>{img('character-clean-final.png')}</div>}
    {f>=104 && f<109 && [-3,-2,-1,1,2,3].map((offset)=><div key={offset} style={{position:'absolute',inset:0,transform:`translateX(${offset*25*blur}px) scale(${1.2-zoom*.1})`,transformOrigin:'50% 45%',filter:'blur(3px)',opacity:blur*.13}}>{img('character-clean-final.png')}</div>)}
    {f>=104 && <>
      <div style={{...titleBase,left:35,top:1,fontFamily:'Arial Black, Arial, sans-serif',fontSize:165,letterSpacing:-5,color:'#222428',textShadow:'2px 2px 0 #505359, 4px 4px 0 #34363b, 7px 7px 0 #1d1f23, 9px 9px 0 #0d0e10',transform:'scale(1.03,1.18)',transformOrigin:'left top'}}>character</div>
      <div style={{...titleBase,left:35,top:1,fontFamily:'Arial Black, Arial, sans-serif',fontSize:165,letterSpacing:-5,color:'transparent',background:'linear-gradient(180deg,#575b62 0%,#979ba1 15%,#666a71 34%,#a6a9ae 51%,#565a61 69%,#b4b7bb 82%,#64686f 100%)',backgroundClip:'text',WebkitBackgroundClip:'text',WebkitTextStroke:'1px #d2d5d8',transform:'scale(1.03,1.18)',transformOrigin:'left top'}}>character</div>
    </>}
    {f>=105 && <div style={{position:'absolute',left:-(1-left)*420,bottom:0,width:409,height:326}}>{img('character-meme-left.png')}</div>}
    {f>=110 && <div style={{position:'absolute',right:0,bottom:-(1-right)*340,width:453,height:327}}>{img('character-meme-right.png')}</div>}
  </AbsoluteFill>;
};
