import React from 'react';
import {AbsoluteFill, Img, OffthreadVideo, interpolate, staticFile, useCurrentFrame} from 'remotion';

const bound = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ramp = (f: number, a: number, b: number) => interpolate(f, [a, b], [0, 1], bound);
const img = (name: string, style: React.CSSProperties = {}) => <Img src={staticFile(`assets/${name}`)} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...style}} />;
const originalVideo = (sourceSecond: number, style: React.CSSProperties = {}) => <OffthreadVideo src={staticFile('source-59-90.mp4')} trimBefore={Math.round(sourceSecond * 60)} muted volume={0} style={{position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', ...style}} />;

const ComicSlide: React.FC<{f: number; forceFull?: boolean}> = ({f, forceFull = false}) => {
  const ui = forceFull ? 1 : ramp(f, 32, 37);
  const presenter = forceFull ? 1 : ramp(f, 42, 47);
  const zoom = forceFull ? 1 : ramp(f, 18, 31);
  return <AbsoluteFill style={{background: '#dcdcdc', overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: ui * 238, top: ui * 90, right: 0, bottom: 0, overflow: 'hidden'}}>
      {img('comic-clean.png', {transform: `scale(${1.02 + zoom * .08})`, transformOrigin: '50% 46%'})}
    </div>
    <div style={{position: 'absolute', top: 0, left: 0, right: 0, height: 30, background: '#b54428', opacity: ui, color: 'white', font: '12px Arial', paddingLeft: 10}}>File　 Home　 Insert　 Draw　 Design　 Transitions　 Animations　 Slide Show　 Record　 Review　 View　 Help</div>
    <div style={{position: 'absolute', top: 30, left: 0, right: 0, height: 60, background: '#f3f3f1', borderBottom: '2px solid #bfc0bd', opacity: ui, display: 'flex', gap: 15, alignItems: 'center', padding: '0 16px', color: '#777', font: '13px Arial'}}><span style={{fontSize: 25}}>▤</span> Paste　　 New Slide　　 Layout　　 Reset　　 Section　　　 Font　　 Paragraph　　 Arrange　　 Shape Fill　　 Editing</div>
    <div style={{position: 'absolute', top: 90, left: 0, bottom: 0, width: 238, background: '#dedede', borderRight: '2px solid #b8b8b8', opacity: ui}}>
      <div style={{position: 'absolute', top: 7, left: 8, width: 208, height: 118, border: '1px solid #999', overflow: 'hidden'}}>{img('comic-clean.png')}</div>
      <div style={{position: 'absolute', top: 135, left: 8, width: 208, height: 110, background: '#f5f8ee', color: '#9bc256', font: '20px Arial', padding: '10px 14px'}}>How to kill people<br/>you dislike <span style={{position:'absolute',right:0,top:0,width:30,height:'100%',background:'linear-gradient(140deg,#b1d879,#4bb141)'}}/></div>
    </div>
    <Img src={staticFile('assets/presenter-cutout.png')} style={{position:'absolute',left:-26+(1-presenter)*-220,bottom:-38,width:610,height:565,objectFit:'contain',objectPosition:'bottom left',opacity:presenter}}/>
  </AbsoluteFill>;
};

// Source 1:20.00–1:21.55. Comic page, presentation UI and presenter are separate layers.
export const ComicPresentation: React.FC = () => {
  const f=useCurrentFrame();
  const enter=ramp(f,4,12);
  const exitX=interpolate(f,[89,90,91,92],[0,76,228,380],bound);
  return <AbsoluteFill style={{overflow:'hidden',background:'#101820'}}>
    {img('blue-statue.png')}
    <div style={{position:'absolute',inset:0,opacity:enter,transform:`scale(${1+(1-enter)*.07})`}}><ComicSlide f={f}/></div>
    {f<13 && <AbsoluteFill style={{background:'linear-gradient(105deg,#f8ddaa80,transparent 56%)',opacity:(1-enter)*.48,mixBlendMode:'screen'}}/>}
    {f>=89 && <div style={{position:'absolute',inset:0,background:'linear-gradient(110deg,#021915,#10362b)',clipPath:`polygon(0 0, ${exitX}px 0, ${exitX-440}px 100%, 0 100%)`}}/>}
  </AbsoluteFill>;
};

// Source 1:21.45–1:23.45. A slanted green edge sweeps a new dark video over the comic.
export const DiagonalHandWipe: React.FC = () => {
  const f=useCurrentFrame();
  const reveal=ramp(f,0,15);
  const edgeX=1500*reveal-450;
  const visible=reveal>=.94;
  return <AbsoluteFill style={{overflow:'hidden',background:'#061711'}}>
    {!visible && <ComicSlide f={93} forceFull/>}
    <div style={{position:'absolute',inset:0,clipPath:visible?'none':`polygon(0 0, ${Math.max(0,edgeX+440)}px 0, ${Math.max(0,edgeX-90)}px 100%, 0 100%)`}}>
      {originalVideo(22.45)}
    </div>
    {f<15 && <div style={{position:'absolute',top:-120,left:edgeX,width:260,height:1000,transform:'skewX(-32deg)',background:'linear-gradient(90deg,#001d14,#0b2c25 64%,transparent)',opacity:.84}}/>}
    {f>50 && <AbsoluteFill style={{backgroundImage:'repeating-linear-gradient(0deg,#b5a84d29 0 1px,transparent 1px 18px),repeating-linear-gradient(90deg,#e5c86d1f 0 1px,transparent 1px 18px)',mixBlendMode:'screen',opacity:.32*ramp(f,53,73)}}/>}
  </AbsoluteFill>;
};

// Source 1:23.35–1:24.38. Monochrome fog replaces green footage, then a narrow center strip widens.
export const VerticalChapelSlit: React.FC = () => {
  const f=useCurrentFrame();
  const gray=ramp(f,0,7);
  const slit=ramp(f,13,62);
  const width=f<13 ? 4 : 14+486*slit;
  return <AbsoluteFill style={{overflow:'hidden',background:'#bec0ae'}}>
    {img('hand-grid.png',{opacity:1-gray})}
    {img('grey-clean.png',{opacity:gray,filter:`saturate(${1-.8*ramp(f,8,23)}) brightness(${1+.48*ramp(f,8,23)})`})}
    <AbsoluteFill style={{background:'#f4f1dd',opacity:.55*ramp(f,14,28),mixBlendMode:'screen'}}/>
    <div style={{position:'absolute',inset:0,clipPath:`inset(0 calc(50% - ${width/2}px) 0 calc(50% - ${width/2}px))`}}>{img('chapel.png')}</div>
  </AbsoluteFill>;
};

// Source 1:24.35–1:25.03. Bronze skull with a separate fire edge and a three-line impact caption.
export const SkeletonFireCallout: React.FC = () => {
  const f=useCurrentFrame();
  const skull=ramp(f,3,12);
  const text=ramp(f,15,19);
  const exit=ramp(f,44,53);
  return <AbsoluteFill style={{overflow:'hidden',background:'#dadbcd'}}>
    {img('chapel.png',{transform:'scaleX(1.6)'})}
    <div style={{position:'absolute',left:230,right:230,bottom:-15,height:105,background:'radial-gradient(ellipse at 50% 100%,#ff7015c9,transparent 72%)',filter:'blur(9px)'}}/>
    <Img src={staticFile('assets/skull-flames.png')} style={{position:'absolute',left:165+(1-skull)*750,top:225,width:770,height:500,objectFit:'contain',filter:'drop-shadow(5px 8px 7px #1119)',transform:`scale(${.83+.17*skull})`,opacity:skull}}/>
    <div style={{position:'absolute',left:300,top:438,color:'#fff',font:'900 66px/.91 Arial, sans-serif',letterSpacing:-2,whiteSpace:'pre-line',textShadow:'2px 3px 2px #171b23',opacity:text,transform:`translateX(${(1-text)*-95}px)`}}>THE{'\n'}SKELETON{'\n'}APPEARS</div>
    {f>=44 && <><div style={{position:'absolute',left:0,top:245,whiteSpace:'nowrap',font:'120px Arial, sans-serif',letterSpacing:-6,opacity:exit,transform:`translateX(${(1-exit)*-190}px) scaleX(1.45)`,transformOrigin:'left center'}}><span style={{color:'#50311b',textShadow:'3px 1px 0 #d1ab6a'}}>wake</span><span style={{color:'#d7fff2',textShadow:'0 0 12px #9ffbfa'}}> the</span></div><svg width="1280" height="720" style={{position:'absolute',inset:0}}><defs><filter id="luma-reveal" colorInterpolationFilters="sRGB"><feColorMatrix type="matrix" values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  .2126 .7152 .0722 0 0"/><feComponentTransfer><feFuncA type="linear" slope="18" intercept={-18*interpolate(f,[44,64],[.94,-.06],bound)}/></feComponentTransfer></filter><mask id="cyber-reveal" maskUnits="userSpaceOnUse" x="0" y="0" width="1280" height="720" style={{maskType:'alpha'}}><image href={staticFile('assets/cyberpunk-full-clean.png')} width="1280" height="720" filter="url(#luma-reveal)"/></mask></defs><image href={staticFile('assets/cyberpunk-full-clean.png')} width="1280" height="720" mask="url(#cyber-reveal)"/></svg></>}
    {f>=58 && <div style={{position:"absolute",left:0,top:245,whiteSpace:"nowrap",font:"120px Arial, sans-serif",letterSpacing:-6,opacity:ramp(f,58,64),transform:"scaleX(1.45)",transformOrigin:"left center"}}><span style={{color:"#50311b",textShadow:"3px 1px 0 #d1ab6a"}}>wake</span><span style={{color:"#d7fff2",textShadow:"0 0 12px #9ffbfa"}}> the</span></div>}
  </AbsoluteFill>;
};

const CyberHud: React.FC = () => <><div style={{position:'absolute',top:13,left:23,color:'#ff6d9f',font:'bold 19px Arial',textShadow:'0 0 4px #ff307f'}}>MICROTECH HYDRA VER. 2.1 :: 22.003<br/><span style={{fontSize:17}}>SYSTEM SETUP NAV</span></div><div style={{position:'absolute',top:13,right:34,color:'#ff6d9f',font:'bold 19px Arial'}}>BIO 30.2</div></>;

// Source 1:25.00–1:26.60. Two phrases switch typography while the actor jumps from medium to close shot.
export const CyberpunkNeonTitle: React.FC = () => {
  const f=useCurrentFrame();
  const intro=ramp(f,0,6);
  const close=f>=24;
  const glitch=ramp(f,77,83);
  const grade=ramp(f,54,70);
  return <AbsoluteFill style={{overflow:'hidden',background:'#496b94'}}>
    {f<7 && img('skeleton.png',{opacity:1-intro})}
    <div style={{position:'absolute',inset:0,opacity:intro,transform:`scale(${close?1.01+glitch*.04:1+.06*ramp(f,7,23)})`,filter:`contrast(${1+grade*.55}) saturate(${1-grade*.65}) brightness(${1-grade*.02})`}}>{img(close?'cyberpunk-close-clean.png':'cyberpunk-full-clean.png')}</div>
    {f>=50 && f<88 && <Img src={staticFile('assets/spectral-samurai.png')} style={{position:'absolute',left:770,top:-35,width:360,height:720,objectFit:'contain',opacity:.68*ramp(f,50,58),mixBlendMode:'multiply',filter:'grayscale(1) contrast(1.45) brightness(.8)'}}/>}
    {!close && <CyberHud/>}
    {f>=7 && f<27 && <div style={{position:'absolute',left:62,top:246,whiteSpace:'nowrap',font:'120px/1 Arial, sans-serif',letterSpacing:-6,transform:`translateX(${(1-ramp(f,7,14))*-160}px) scaleX(1.45)`,transformOrigin:'left center',opacity:1-ramp(f,21,27)}}><span style={{color:'#4b2f1c',textShadow:'3px 1px 0 #d1ab6a'}}>wake</span><span style={{color:'#cefff0',textShadow:'0 0 12px #9ffbfa'}}> the</span></div>}
    {f>=24 && f<28 && <>
      <div style={{position:'absolute',left:100,top:340,whiteSpace:'nowrap',font:'italic 900 112px/.85 Marker Felt, Impact, sans-serif',letterSpacing:24,color:'#8a3acc',opacity:.8*(1-ramp(f,30,38)),transformOrigin:'left center',transform:`skewX(-20deg) translateX(${Math.sin(f*1.7)*10}px) scaleX(1.36)`}}>FUCK</div>
      <div style={{position:'absolute',left:110,top:336,whiteSpace:'nowrap',font:'italic 900 108px/.85 Marker Felt, Impact, sans-serif',letterSpacing:24,color:'#effa18',opacity:1-ramp(f,30,38),clipPath:`inset(0 ${Math.max(0,62-ramp(f,24,40)*62)}% 0 0)`,transformOrigin:'left center',transform:`skewX(-20deg) translateX(${Math.sin(f*2.4)*5}px) scaleX(1.36)`,filter:'drop-shadow(4px 2px 1px #7c15b1)'}}>FUCK</div>
      <div style={{position:'absolute',left:835,top:340,color:'#8533bd',font:'italic 900 110px Marker Felt, Impact',letterSpacing:16,transformOrigin:'left center',transform:'skewX(-20deg) scaleX(1.2)',opacity:ramp(f,29,38)*(1-ramp(f,30,38))}}>UP</div>
    </>}
    {f>=26 && f<53 && <><Img src={staticFile('assets/fuck-up-title-cutout.png')} style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.93*ramp(f,26,28),transform:`translateX(${Math.sin(f*.83)*8}px)`}}/>{f<33 && <div style={{position:'absolute',inset:0,background:'#eafa24',maskImage:`url(${staticFile('assets/fuck-up-title-cutout.png')})`,maskSize:'100% 100%',clipPath:f<32?'inset(0 0 0 61%)':'polygon(61% 47%,100% 47%,100% 51%,61% 51%,61% 56%,100% 56%,100% 58%,61% 58%)',opacity:.95,transform:`translateX(${Math.sin(f*.83)*8}px)`}}/>}</>}
    {f>=50 && f<88 && <><div style={{position:'absolute',left:-18,top:340,color:'#863bb9',opacity:.16*ramp(f,50,54),font:'italic 900 111px Marker Felt, Impact',letterSpacing:15,transformOrigin:'left center',transform:`skewX(-18deg) scaleX(1.6) translateX(${(1-ramp(f,50,55))*-80}px)`}}>SAMURAI</div><div style={{position:'absolute',left:-18,top:336,color:'#f5fa22',opacity:.22*ramp(f,50,54),font:'italic 900 111px Marker Felt, Impact',letterSpacing:15,clipPath:'inset(0 38% 0 17%)',transformOrigin:'left center',transform:`skewX(-18deg) scaleX(1.6) translateX(${(1-ramp(f,50,55))*-80}px)`,filter:'drop-shadow(3px 2px 1px #761ca7)'}}>SAMURAI</div></>}
    {f>=50 && f<88 && <Img src={staticFile('assets/samurai-title-cutout-v2.png')} style={{position:'absolute',inset:0,width:'100%',height:'100%',opacity:.92*ramp(f,50,55),transform:`translateX(${Math.sin(f*.57)*6}px)`}}/>}
    {f>=78 && f<86 && [0,1,2].map(i=><div key={i} style={{position:'absolute',left:0,right:0,top:90+i*230+Math.sin(f*3+i)*18,height:5+i*8,background:i===1?'#000b':'#22184f9a',opacity:glitch}}/>)}
    {f>=86 && <div style={{position:'absolute',inset:0,clipPath:`inset(${interpolate(f,[86,90,94],[236,236,136],bound)}px 0 ${720-interpolate(f,[86,90,94],[490,490,520],bound)}px 0)`}}>{img('bridge-clean.png')}</div>}
  </AbsoluteFill>;
};

// Source 1:27.35–1:28.20. White developer heading, portrait card and blue callout come in separately.
export const FromSoftwareQuote: React.FC = () => {
  const f=useCurrentFrame();
  const heading=ramp(f,1,7);
  const portrait=ramp(f,8,11);
  const boxOpacity=ramp(f,14,17);
  const boxX=interpolate(f,[14,15,16,17,18,21,25],[-20,34,88,140,188,290,324],bound);
  return <AbsoluteFill style={{overflow:'hidden',background:'#151b18'}}>
    {img('game-clean.png',{transform:`scale(${1+.03*ramp(f,0,51)})`,filter:'brightness(.84)'})}
    <div style={{position:'absolute',left:502,top:136,color:'#fff',font:'900 91px/.9 Impact, Arial Black, sans-serif',letterSpacing:-1,whiteSpace:'nowrap',textShadow:'3px 3px 0 #101214',opacity:heading,transform:`translateX(${(1-heading)*240}px) scaleX(1.13)`,transformOrigin:'left center'}}>FROM SOFTWARE</div>
    <div style={{position:'absolute',left:33+(1-portrait)*-330,top:250,width:370,height:450,overflow:'hidden',background:'#001612',opacity:portrait}}><Img src={staticFile('assets/developer-clean.png')} style={{position:'absolute',width:1280,height:720,left:-33,top:-250,maxWidth:'none'}}/></div>
    <svg width="590" height="184" viewBox="0 0 590 184" style={{position:'absolute',left:boxX,top:444,opacity:boxOpacity,overflow:'visible'}}><polygon points="1,1 564,1 589,25 589,141 104,141 48,180 48,141 1,141" fill="rgba(16,26,54,.28)" stroke="#6483a7" strokeWidth="2"/></svg>
    <div style={{position:'absolute',left:boxX+16,top:482,color:'#477fce',font:'bold 54px Arial, sans-serif',letterSpacing:-1,whiteSpace:'nowrap',opacity:boxOpacity}}>i will kill your children</div>
  </AbsoluteFill>;
};
