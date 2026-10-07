import React from 'react';
import {AbsoluteFill, Easing, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {NewspaperFocusPush} from '../../../assets/techniques/vox-newspaper-focus-push';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const ramp = (f: number, a: number, b: number, x = 0, y = 1) => interpolate(f, [a, b], [x, y], {...clamp, easing: ease});

type NewspaperProps = {
  variant: 'trump' | 'musk';
  frame: number;
  delay?: number;
};

const Newspaper: React.FC<NewspaperProps> = ({variant, frame, delay = 0}) => {
  const f = frame - delay;
  const isTrump = variant === 'trump';
  const date = isTrump ? 'July 20, 2024' : 'Oct. 27, 2022';
  const photo = isTrump ? 'trump-cutout-complete.png' : 'musk-cutout-complete.png';
  const titleLines = isTrump ? ["'I took a Bullet for Democracy,' Trump", 'says at a First Rally Since Shooting'] : ['Elon Musk Completes $44 Billion', 'Deal to Own Twitter'];
  const titleReveal = [isTrump ? ramp(f, 3, 22, 0, 100) : interpolate(f, [6, 31], [0, 100], clamp), ramp(f, isTrump ? 18 : 22, isTrump ? 43 : 49, 0, 100)];
  const photoRise = ramp(f, 17, 44, 58, 0);
  const photoOpacity = ramp(f, 17, 32);
  const titleHighlight = ramp(f, isTrump ? 37 : 91, isTrump ? 54 : 108, 0, isTrump ? 204 : 128);
  const bodyHighlight = ramp(f, isTrump ? 52 : 98, isTrump ? 78 : 118, 0, isTrump ? 224 : 180);
  const arrow = ramp(f, 87, 114, 96, 0);
  return (
    <div style={{position: 'absolute', width: 310, height: 176, overflow: 'hidden', border: '1.5px solid #278eff', boxSizing: 'border-box', background: '#e4e2d8'}}>
      <NewspaperFocusPush frame={frame} variant={isTrump ? 'upper' : 'lower'}>
      <AbsoluteFill style={{backgroundImage: `url(${staticFile('paper-texture.png')})`, backgroundSize: '440px 440px', backgroundPosition: isTrump ? '25% 35%' : '75% 65%', filter: 'grayscale(.78) brightness(.94)', opacity: .9}}/>
      <div style={{position: 'absolute', top: 13, left: isTrump ? 28 : 45, padding: '1px 3px', background: '#96343b', color: '#eee7dc', font: 'bold 4.5px Georgia, serif', opacity: ramp(f, 0, 7)}}>{date}</div>
      <div style={{position: 'absolute', left: isTrump ? 27 : 45, top: 27, width: isTrump ? 269 : 246, height: 31, overflow: 'hidden'}}>
        <div style={{position: 'absolute', left: isTrump ? 0 : 65, top: 1, width: titleHighlight, height: 11, background: '#e9e51cbb', filter: 'blur(.5px)'}}/>
        <div style={{position: 'absolute', width: 270, fontFamily: 'Georgia, Times New Roman, serif', fontWeight: 900, fontSize: isTrump ? 11.3 : 12.3, lineHeight: 1.05, color: '#151310'}}>{titleLines.map((line, i) => <div key={i} style={{whiteSpace: 'nowrap', clipPath: `inset(0 ${100 - titleReveal[i]}% 0 0)`}}>{line}</div>)}</div>
      </div>
      <div style={{position: 'absolute', left: isTrump ? 28 : 45, top: isTrump ? 64 : 66, width: bodyHighlight, height: 5.7, background: '#e9e51cab', filter: 'blur(.6px)'}}/>
      <div style={{position: 'absolute', left: isTrump ? 28 : 45, top: isTrump ? 63 : 67, width: 263, color: '#302b26', fontFamily: 'Georgia, serif', fontSize: 5.5, lineHeight: 1.08, opacity: ramp(f, 50, 78)}}>{isTrump ? <><div>Republican presidential nominee Donald Trump made his first public appearance</div><div>at the party's convention in Milwaukee, Wisconsin, on Monday since a recent</div><div>assassination attempt.</div></> : <><div>The world's richest man closed his blockbuster purchase of the social media</div><div>service, thrusting Twitter into a new era.</div></>}</div>
      <div style={{position: 'absolute', top: isTrump ? 91 : 92, left: isTrump ? 28 : 45, color: '#161616', fontFamily: 'Georgia, serif', fontStyle: 'italic', fontWeight: 700, fontSize: 6.5, opacity: ramp(f, 52, 76)}}>The New York Times ────────</div>
      <div style={{position: 'absolute', left: isTrump ? 125 : 114, bottom: -1, width: isTrump ? 130 : 124, height: isTrump ? 95 : 93, opacity: photoOpacity, transform: `translateY(${photoRise}px)`, mixBlendMode: 'multiply'}}>
        <img src={staticFile(photo)} style={{position: 'absolute', width: '100%', height: '100%', objectFit: 'contain'}}/>
      </div>
      <svg style={{position: 'absolute', right: isTrump ? 34 : 45, top: isTrump ? 102 : 101, opacity: ramp(f, 85, 95)}} width="37" height="31" viewBox="0 0 37 31"><path d="M33 3 Q26 21 7 23 M11 17 L7 23 L13 26" fill="none" stroke="#ac2e36" strokeWidth="1.6" strokeDasharray="96" strokeDashoffset={arrow}/></svg>
      <AbsoluteFill style={{pointerEvents: 'none', opacity: .055, mixBlendMode: 'multiply', backgroundImage: 'radial-gradient(#111 0.5px, transparent 1px)', backgroundSize: '7px 6px'}}/>
      </NewspaperFocusPush>
    </div>
  );
};

export const NewspaperComparison: React.FC = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{background: 'linear-gradient(180deg, #3d3d3d 0%, #292929 50%, #101010 100%)', overflow: 'hidden'}}>
    <AbsoluteFill style={{opacity: .55, backgroundImage: 'repeating-linear-gradient(104deg, #ffffff17 0px, transparent 1px, transparent 4px)', backgroundSize: '100% 100%'}}/>
    <div style={{position: 'absolute', top: 74, width: '100%', textAlign: 'center', font: 'bold 22px Arial, sans-serif', color: '#f7f7f7', textShadow: '0 0 2px #fff'}} >MY EDIT</div>
    <div style={{position: 'absolute', left: 25, top: 106}}><Newspaper variant="trump" frame={frame}/></div>
    <div style={{position: 'absolute', top: 286, width: '100%', textAlign: 'center', font: 'bold 22px Arial, sans-serif', color: '#f7f7f7', textShadow: '0 0 2px #fff'}}>ORIGINAL</div>
    <div style={{position: 'absolute', left: 25, top: 318}}><Newspaper variant="musk" frame={frame} delay={6}/></div>
    <div style={{position: 'absolute', top: 591, width: '100%', textAlign: 'center', fontFamily: 'Georgia, serif', fontSize: 20, fontWeight: 700, fontStyle: 'italic', color: '#e0dfdb', letterSpacing: -1}}>STANZMEDIA</div>
  </AbsoluteFill>;
};
