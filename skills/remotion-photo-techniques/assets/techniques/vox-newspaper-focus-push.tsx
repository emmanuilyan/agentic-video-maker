import React from 'react';
import {Easing, interpolate} from 'remotion';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};

export type NewspaperFocusPushProps = {
  frame: number;
  variant?: 'upper' | 'lower';
  children: React.ReactNode;
};

/** A small retreat and defocus, followed by a lasting push-in as focus returns. */
export const NewspaperFocusPush: React.FC<NewspaperFocusPushProps> = ({frame, variant = 'upper', children}) => {
  const upper = variant === 'upper';
  const cameraFrames = upper ? [65, 70, 82, 89] : [63, 68, 82, 90];
  const finalScale = upper ? 1.12 : 1.15;
  const zoom = interpolate(frame, cameraFrames, [1, .965, finalScale, finalScale], {...clamp, easing: Easing.inOut(Easing.cubic)});
  const blur = interpolate(frame, upper ? [67, 71, 77, 83] : [64, 68, 77, 84], [0, 2.9, 3.2, 0], clamp);
  const cameraX = interpolate(frame, cameraFrames, [0, 1.5, -1, 0], clamp);
  const cameraY = interpolate(frame, cameraFrames, [0, -1, .5, 0], clamp);

  return <div style={{position: 'absolute', inset: 1, filter: `blur(${blur}px)`, transform: `translate(${cameraX}px, ${cameraY}px) scale(${zoom})`, transformOrigin: '50% 50%'}}>{children}</div>;
};
