import type {CSSProperties} from 'react';
import {AbsoluteFill, Img, useCurrentFrame} from 'remotion';

export type FlipbookPhoto = {
  src: string;
  /** How long this image is held. Omit to use defaultHoldFrames. */
  holdFrames?: number;
  /** Optional source for each held frame, for a live-photo or film-grain feel. */
  frameSources?: readonly string[];
  objectPosition?: CSSProperties['objectPosition'];
};

export type PhotoFlipbookProps = {
  photos: readonly FlipbookPhoto[];
  durationInFrames: number;
  defaultHoldFrames?: number;
  frame?: number;
  fit?: 'cover' | 'contain';
  background?: string;
};

/** Instant photo changes on exact frame boundaries; no crossfade or page geometry. */
export function PhotoFlipbook({
  photos,
  durationInFrames,
  defaultHoldFrames = 2,
  frame,
  fit = 'cover',
  background = '#101010',
}: PhotoFlipbookProps) {
  const currentFrame = useCurrentFrame();
  if (photos.length === 0) throw new Error('PhotoFlipbook requires at least one photo');
  if (!Number.isInteger(durationInFrames) || durationInFrames < 1) {
    throw new Error('durationInFrames must be a positive integer');
  }
  if (!Number.isInteger(defaultHoldFrames) || defaultHoldFrames < 1) {
    throw new Error('defaultHoldFrames must be a positive integer');
  }

  let elapsed = 0;
  const localFrame = Math.max(0, Math.min(durationInFrames - 1, frame ?? currentFrame));
  let active = photos[photos.length - 1];
  let activeFrame = 0;
  for (const photo of photos) {
    const hold = photo.holdFrames ?? defaultHoldFrames;
    if (!Number.isInteger(hold) || hold < 1) {
      throw new Error('Every photo hold must be a positive integer');
    }
    if (localFrame < elapsed + hold) {
      active = photo;
      activeFrame = localFrame - elapsed;
      break;
    }
    elapsed += hold;
  }
  if (active.frameSources && active.frameSources.length === 0) {
    throw new Error('frameSources must contain at least one image');
  }
  const src = active.frameSources?.[Math.min(activeFrame, active.frameSources.length - 1)] ?? active.src;

  return (
    <AbsoluteFill style={{overflow: 'hidden', background}}>
      <Img
        src={src}
        style={{width: '100%', height: '100%', objectFit: fit, objectPosition: active.objectPosition ?? 'center'}}
      />
    </AbsoluteFill>
  );
}
