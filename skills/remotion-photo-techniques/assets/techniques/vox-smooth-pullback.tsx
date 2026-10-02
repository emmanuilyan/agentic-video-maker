import React from 'react';
import {AbsoluteFill, Easing, Img, interpolate, useCurrentFrame} from 'remotion';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

export type VoxSmoothPullbackProps = {
  imageSrc: string;
  titlePrefix?: string;
  highlight?: string;
  captionBefore?: string;
  captionAfter?: string;
  accent?: string;
};

/** One continuous image pulls back before its caption and callout appear. */
export const VoxSmoothPullback: React.FC<VoxSmoothPullbackProps> = ({
  imageSrc,
  titlePrefix = 'this is',
  highlight = 'bad',
  captionBefore = 'AND IT FEELS',
  captionAfter = 'KIND OF FLAT',
  accent = '#eb3817',
}) => {
  const f = useCurrentFrame();
  const pullback = interpolate(f, [2, 18], [0, 1], {
    ...clamp,
    easing: Easing.bezier(.42, 0, .58, 1),
  });
  const zoom = interpolate(pullback, [0, 1], [1.35, .95], clamp);
  const treatment = f >= 67 ? 0 : pullback;
  const isFlat = f >= 19 && f < 67;
  const titleOpacity = interpolate(f, [19, 23], [0, 1], clamp);

  return <AbsoluteFill style={{overflow: 'hidden'}}>
    <AbsoluteFill style={{
      transform: `scale(${f >= 67 ? 1.35 : zoom})`,
      filter: `blur(${treatment * .8}px) brightness(${1 - treatment * .23})`,
    }}>
      <Img src={imageSrc} style={{
        position: 'absolute', width: 360, height: 640, objectFit: 'cover', left: 0, top: 0,
        transform: 'translateY(-38px) scale(1.12)',
        filter: 'saturate(.57) contrast(.85)',
      }}/>
    </AbsoluteFill>
    {isFlat && <div style={{opacity: titleOpacity}}>
      <div style={{position: 'absolute', top: 176, left: 37, color: 'white', font: '46px Georgia,serif', textShadow: '0 2px 8px #344'}}>
        {titlePrefix} <span style={{background: accent, padding: '2px 6px'}}>{highlight}</span>
      </div>
      <svg width="360" height="640" viewBox="0 0 360 640" style={{position: 'absolute', inset: 0}}>
        <path d="M314 247 Q329 280 292 319 L303 300 M292 319 L312 312" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
      </svg>
    </div>}
    <div style={{
      position: 'absolute', bottom: 80, left: '50%', translate: '-50% 0',
      background: '#1b282d', color: 'white', padding: '3px 7px',
      font: 'bold 14px Arial,sans-serif', whiteSpace: 'nowrap', textTransform: 'uppercase',
    }}>{isFlat ? captionAfter : captionBefore}</div>
  </AbsoluteFill>;
};
