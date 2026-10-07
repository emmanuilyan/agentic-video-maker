import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile} from 'remotion';
import type {EffectProps} from './Comparison';

const hold = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const img = (name: string) => staticFile(`assets/${name}`);

const FullImage: React.FC<{name: string; style?: React.CSSProperties}> = ({name, style}) =>
  <Img src={img(name)} style={{width: 1280, height: 720, objectFit: 'cover', ...style}} />;

/** An oversized blue bird is composited over a floating game UI message. */
export const TwitterBehindUI: React.FC<EffectProps> = ({frame}) => {
  const birdOpacity = interpolate(frame, [0, 6, 17, 24, 56], [0, 0, .55, .63, .63], hold);
  const birdScale = interpolate(frame, [6, 24, 56], [.7, .99, 1.03], hold);
  const zoom = interpolate(frame, [0, 56, 63], [1, 1.03, 1.2], hold);
  const pan = interpolate(frame, [0, 56, 63], [0, -15, -35], hold);
  const nextOpacity = interpolate(frame, [57, 63, 64], [0, .65, 1], hold);
  return <AbsoluteFill style={{background: '#9aa9ac', overflow: 'hidden'}}>
    {frame < 64 && <div style={{position: 'absolute', inset: 0, transform: `translateX(${pan}px) scale(${zoom})`, transformOrigin: '50% 45%'}}>
      <FullImage name={frame === 0 ? 'twitter-clean.png' : 'twitter-ui.png'} />
      {frame > 5 && <Img src={img('twitter.svg')} style={{position: 'absolute', left: 420, top: 160, width: 445, height: 445, opacity: birdOpacity, transform: `scale(${birdScale})`, filter: 'drop-shadow(0 0 2px #7ee9ff)', mixBlendMode: 'screen'}} />}
    </div>}
    {frame >= 57 && <FullImage name="twitter-next.png" style={{position: 'absolute', inset: 0, opacity: nextOpacity}} />}
  </AbsoluteFill>;
};

const Arrow: React.FC<{left: number; top: number}> = ({left, top}) =>
  <svg width="210" height="125" viewBox="0 0 210 125" style={{position: 'absolute', left, top, overflow: 'visible'}}>
    <path d="M0 0 L78 23 L60 39 L207 83 L194 120 L48 75 L53 99 Z" fill="#f20e29" stroke="#d0041b" strokeWidth="2" />
  </svg>;

/** A rapid camera push into a software setting, with a typed red callout and arrow. */
export const ResolutionPunch: React.FC<EffectProps> = ({frame}) => {
  const zoom = interpolate(frame, [0, 27, 32, 45, 65], [1, 1, 1.14, 1.66, 2.08], hold);
  const vertical = interpolate(frame, [27, 41, 53, 65], [0, 40, 78, 103], hold);
  const anchorX = 115;
  const anchorY = 148;
  const text = frame < 27 ? '' : frame < 41 ? 'high' : 'high resolutions';
  const titleX = interpolate(frame, [27, 28, 29, 30, 31, 32], [-150, -40, 68, 151, 216, 240], hold);
  const arrowX = interpolate(frame, [46, 53, 60, 63, 66], [1260, 950, 560, 455, 425], hold);
  const arrowY = interpolate(frame, [46, 53, 60, 63, 66], [590, 425, 265, 238, 230], hold);
  return <AbsoluteFill style={{background: '#02090d', overflow: 'hidden'}}>
    {frame < 87 && <div style={{position: 'absolute', width: 1280, height: 720, transformOrigin: `${anchorX}px ${anchorY}px`, transform: `translateY(${vertical}px) scale(${zoom})`}}>
      <FullImage name="resolution-clean.png" />
    </div>}
    {frame >= 46 && frame < 87 && <div style={{position: 'absolute', left: arrowX, top: arrowY, transform: 'scale(1.3)', transformOrigin: 'top left'}}><Arrow left={0} top={0} /></div>}
    {text && frame < 87 && <div style={{position: 'absolute', left: titleX, top: 450, color: '#f21732', fontFamily: 'Arial, sans-serif', fontSize: 110, fontWeight: 400, whiteSpace: 'nowrap', textShadow: '0 0 1px #ff425c', mixBlendMode: 'difference'}}>{text}</div>}
    {frame >= 87 && <FullImage name="resolution-next.png" />}
  </AbsoluteFill>;
};

/** Two fixed meme halves reveal a moving strip of another scene, then dissolve. */
export const WatameSplit: React.FC<EffectProps> = ({frame}) => {
  const gameSquash = interpolate(frame, [4, 5, 7, 10], [1, .75, .42, .105], hold);
  const gameOpacity = interpolate(frame, [9, 12], [1, 0], hold);
  const cardZoom = interpolate(frame, [74, 75, 76, 78, 80, 81], [1, 1.045, 1.10, 1.25, 1.40, 1.45], hold);
  const cardOpacity = interpolate(frame, [74, 75, 76, 78, 81, 82], [1, .88, .74, .47, .12, 0], hold);
  const cityPan = interpolate(frame, [82, 113], [0, -12], hold);
  return <AbsoluteFill style={{background: '#c8ad86', overflow: 'hidden'}}>
    {frame >= 75 && <FullImage name="watame-next.png" style={{position: 'absolute', inset: 0, transform: `translateX(${cityPan}px) scale(1.015)`}} />}
    {frame < 82 && <div style={{position: 'absolute', inset: 0, opacity: cardOpacity, transform: `scale(${cardZoom})`, transformOrigin: 'center'}}>
      <FullImage name="watame-card-f12.png" />
      {frame < 12 && <FullImage name="watame-game.png" style={{position: 'absolute', inset: 0, opacity: gameOpacity, transform: `scaleY(${gameSquash})`, transformOrigin: 'center'}} />}
    </div>}
  </AbsoluteFill>;
};

/** Separate portraits and title layers enter, accumulate, then slide out independently. */
export const PresidentPileup: React.FC<EffectProps> = ({frame}) => {
  const exiting = frame >= 109;
  const rightX = exiting ? interpolate(frame, [109, 110, 111, 112, 113, 114, 115, 116], [548, 600, 690, 812, 980, 1145, 1250, 1280], hold) : interpolate(frame, [37, 38, 41, 44], [1210, 1090, 710, 548], hold);
  const leftX = exiting ? interpolate(frame, [109, 110, 111, 112, 113, 114, 115, 116], [0, -25, -95, -183, -310, -425, -520, -545], hold) : interpolate(frame, [68, 69, 71, 74], [-515, -380, -135, 0], hold);
  const smallX = exiting ? interpolate(frame, [109, 110, 111, 112, 113, 114, 116], [0, -18, -60, -110, -195, -280, -310], hold) : interpolate(frame, [44, 46, 48, 49], [-295, -120, -20, 0], hold);
  const glitching = frame >= 37 && frame < 109;
  const phase = Math.floor(frame / 3);
  const scene = <>
    <FullImage name="president-close-clean.png" />
    {frame >= 37 && <Img src={img('president-right-clean.png')} style={{position: 'absolute', left: rightX, top: 0, width: 732, height: 720, opacity: .78, filter: 'saturate(1.15) sepia(.08) brightness(1.03)'}} />}
  </>;
  const title = frame < 38 ? 'president-title-1.png' : frame < 65 ? 'president-title-2.png' : 'president-title-3.png';
  const titleY = frame < 17 ? interpolate(frame, [12, 17], [120, 0], hold) : exiting ? interpolate(frame, [109, 116], [0, 170], hold) : 0;
  const nextPan = interpolate(frame, [109, 125], [0, -12], hold);
  return <AbsoluteFill style={{background: '#111', overflow: 'hidden'}}>
    {frame < 11 && <FullImage name="president-clean.png" />}
    {frame >= 11 && frame < 109 && <AbsoluteFill>{scene}
      {glitching && Array.from({length: 3}, (_, i) => {
        const y = [(phase * 29) % 220, 220 + (phase * 17) % 190, 440 + (phase * 11) % 180][i];
        const h = 18 + ((i * 11 + phase * 7) % 27);
        const dx = Math.sin(phase * 1.7 + i * 3.1) * 10;
        return <AbsoluteFill key={i} style={{clipPath: `inset(${y}px 0 ${720-y-h}px 0)`, transform: `translateX(${dx}px)`, filter: `contrast(${1.08 + .08 * Math.sin(phase+i)})`}}><FullImage name="president-game-pixel.png" />{frame >= 37 && <Img src={img('president-right-pixel.png')} style={{position: 'absolute', left: rightX, top: 0, width: 732, height: 720, opacity: .78, filter: 'saturate(1.15) sepia(.08) brightness(1.03)'}} />}</AbsoluteFill>;
      })}
    </AbsoluteFill>}
    {frame >= 109 && <FullImage name="president-next.png" style={{transform: `translateX(${nextPan}px) scale(1.015)`}} />}
    {exiting && frame < 116 && <Img src={img('president-right-clean.png')} style={{position: 'absolute', left: rightX, top: 0, width: 732, height: 720, opacity: .48}} />}
    {frame >= 68 && frame < 116 && <Img src={img('president-obama-left-full.png')} style={{position: 'absolute', left: leftX, top: 0, width: 545, height: 720}} />}
    {frame >= 44 && frame < 116 && <Img src={img(frame < 73 ? 'president-small-standing.png' : 'president-small-laugh.png')} style={{position: 'absolute', left: smallX, top: 315, width: frame < 73 ? 310 : 285, height: 405}} />}
    {frame >= 12 && frame < 116 && <Img src={img(title)} style={{position: 'absolute', left: 0, top: 570 + titleY, width: 1280, height: 150, clipPath: frame >= 65 ? 'inset(0 0 0 20px)' : undefined}} />}
  </AbsoluteFill>;
};
