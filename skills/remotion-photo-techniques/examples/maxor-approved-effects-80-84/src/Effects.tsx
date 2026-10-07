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

