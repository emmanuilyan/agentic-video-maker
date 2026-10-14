import type {CSSProperties, ReactNode} from 'react';
import {Easing, interpolate, random, useCurrentFrame, useVideoConfig} from 'remotion';

export const SHORTFORM_TRANSITION_IDS = [
  'SWIPE_PUSH',
  'SPIN_BLUR',
  'ZOOM_PUNCH',
  'FLASH_BEAT',
  'GLITCH_SLICE',
  'COVER_SWIPE',
] as const;

export type ShortformTransitionId = (typeof SHORTFORM_TRANSITION_IDS)[number];

export type ShortformTransitionProps = {
  transition: ShortformTransitionId;
  from: ReactNode;
  to: ReactNode;
  durationInFrames: number;
  frame?: number;
  direction?: 'left' | 'right';
  coverColor?: string;
  seed?: string;
};

const fill: CSSProperties = {
  position: 'absolute',
  inset: 0,
  width: '100%',
  height: '100%',
};

const clamp = (v: number) => Math.max(0, Math.min(1, v));

const range = (v: number, a: number, b: number) => clamp((v - a) / (b - a));

const ease = (v: number) =>
  interpolate(clamp(v), [0, 1], [0, 1], {
    easing: Easing.bezier(0.76, 0, 0.24, 1),
  });

export function ShortformTransition({
  transition,
  from,
  to,
  durationInFrames,
  frame,
  direction = 'left',
  coverColor = '#f4ff58',
  seed = 'shortform-transition',
}: ShortformTransitionProps) {
  const currentFrame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  if (!Number.isInteger(durationInFrames) || durationInFrames < 2) {
    throw new Error('durationInFrames must be an integer of at least 2.');
  }
  const localFrame = frame ?? currentFrame;
  const raw = clamp(localFrame / (durationInFrames - 1));
  const p = ease(raw);
  const sign = direction === 'left' ? -1 : 1;
  const pulse = Math.sin(Math.PI * p);
  let fromStyle: CSSProperties = {};
  let toStyle: CSSProperties = {};
  let overlay: ReactNode = null;

  switch (transition) {
    case 'SWIPE_PUSH': {
      const blur = 15 * pulse;
      fromStyle = {
        transform: `translateX(${sign * p * width}px) scale(${1 + 0.04 * pulse})`,
        filter: `blur(${blur}px)`,
      };
      toStyle = {
        transform: `translateX(${sign * (p - 1) * width}px) scale(${1 + 0.04 * pulse})`,
        filter: `blur(${blur}px)`,
      };
      break;
    }
    case 'SPIN_BLUR': {
      const blur = 18 * pulse;
      fromStyle = {
        transform: `rotate(${sign * 90 * p}deg) scale(${1 + 0.65 * p})`,
        opacity: 1 - ease(range(raw, 0.35, 0.65)),
        filter: `blur(${blur}px)`,
      };
      toStyle = {
        transform: `rotate(${sign * 90 * (p - 1)}deg) scale(${1.65 - 0.65 * p})`,
        opacity: ease(range(raw, 0.35, 0.65)),
        filter: `blur(${blur}px)`,
      };
      break;
    }
    case 'ZOOM_PUNCH': {
      const blend = ease(range(raw, 0.35, 0.65));
      fromStyle = {
        transform: `scale(${1 + 1.15 * p})`,
        opacity: 1 - blend,
        filter: `blur(${14 * pulse}px)`,
      };
      toStyle = {
        transform: `scale(${1.35 - 0.35 * p})`,
        opacity: blend,
        filter: `blur(${14 * pulse}px)`,
      };
      break;
    }
    case 'FLASH_BEAT': {
      fromStyle = {opacity: raw < 0.5 ? 1 : 0};
      toStyle = {opacity: raw < 0.5 ? 0 : 1};
      const flash = clamp(1 - Math.abs(raw - 0.5) / 0.2);
      overlay = <div style={{...fill, background: '#fff', opacity: flash}} />;
      break;
    }
    case 'GLITCH_SLICE': {
      fromStyle = {opacity: raw < 0.5 ? 1 : 0};
      toStyle = {opacity: raw < 0.5 ? 0 : 1};
      const strength = clamp(1 - Math.abs(raw - 0.5) / 0.42);
      if (strength > 0) {
        const source = raw < 0.5 ? from : to;
        overlay = Array.from({length: 9}, (_, i) => {
          const top = (i * 100) / 9;
          const bottom = 100 - ((i + 1) * 100) / 9;
          const jitter = random(`${seed}-${i}-${Math.floor(localFrame / 2)}`);
          const shift = (jitter * 2 - 1) * width * 0.2 * strength;
          return (
            <div
              key={i}
              style={{
                ...fill,
                clipPath: `inset(${top}% 0 ${bottom}% 0)`,
                transform: `translateX(${shift}px) scale(1.04)`,
                filter: i % 3 === 0 ? 'drop-shadow(8px 0 #00efff) drop-shadow(-8px 0 #ff375b)' : undefined,
              }}
            >
              {source}
            </div>
          );
        });
      }
      break;
    }
    case 'COVER_SWIPE': {
      fromStyle = {opacity: raw < 0.5 ? 1 : 0};
      toStyle = {opacity: raw < 0.5 ? 0 : 1};
      // Extra width covers the skewed corners on both frames around the cut.
      const coverWidth = width + height * 0.75;
      const offscreen = height * 0.2;
      const x = sign === -1
        ? interpolate(p, [0, 1], [width + offscreen, -coverWidth - offscreen])
        : interpolate(p, [0, 1], [-coverWidth - offscreen, width + offscreen]);
      overlay = (
        <div
          style={{
            ...fill,
            width: coverWidth,
            transform: `translateX(${x}px) skewX(-12deg)`,
            background: coverColor,
            boxShadow: `0 0 ${width * 0.07}px ${coverColor}`,
          }}
        />
      );
      break;
    }
    default:
      throw new Error(`Unknown short-form transition: ${transition}`);
  }

  return (
    <div style={{...fill, overflow: 'hidden', background: '#101010'}}>
      <div style={{...fill, ...fromStyle}}>{from}</div>
      <div style={{...fill, ...toStyle}}>{to}</div>
      {overlay}
    </div>
  );
}
