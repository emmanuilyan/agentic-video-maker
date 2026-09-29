import {Video} from '@remotion/media';
import {AbsoluteFill, interpolate, staticFile, useCurrentFrame} from 'remotion';

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const lerp = (frame: number, points: number[], values: number[]) =>
  interpolate(frame, points, values, clamp);

export type DiceGlitchQuoteProps = {
  /** Place a locally available 1280×720 game clip in public/. */
  backgroundSrc?: string;
  quoteLines?: readonly [string, string];
  fillColor?: string;
  shadowColor?: string;
  backgroundScale?: number;
  backgroundOffsetX?: number;
  smearStrength?: number;
  glitchFrames?: readonly [number, number, number, number];
  smearFrames?: readonly [number, number, number, number, number];
  textFrames?: readonly [number, number];
};

const GameVideo: React.FC<{src: string}> = ({src}) => (
  <Video
    src={staticFile(src)}
    muted
    style={{position: 'absolute', width: 1280, height: 720, left: 0, top: 0}}
  />
);

/** Deterministic rectangular fragments: seeking to a frame recreates the same glitch. */
export const GlitchBars: React.FC<{frame: number}> = ({frame}) => (
  <div style={{position: 'absolute', left: 397, top: 354, width: 491, height: 122}}>
    {Array.from({length: 72}, (_, i) => {
      const row = Math.floor(i / 36);
      const col = i % 36;
      const seed = (i * 67 + frame * 29) % 101;
      const x = col * 14 + (seed % 4) - 2;
      const y = row * 65 + (seed % 7);
      const h = seed % 4 === 0 ? 14 : 22;
      const w = 8 + (seed % 11);
      return (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: x,
            top: y,
            width: w,
            height: h,
            background: seed % 7 === 0 ? '#7b195c' : '#edf3c8',
            boxShadow: '4px 6px #4a1249',
            opacity: seed % 9 === 0 ? 0 : 1,
          }}
        />
      );
    })}
    {Array.from({length: 12}, (_, i) => {
      const row = Math.floor(i / 6);
      const col = i % 6;
      const seed = (i * 37 + frame * 19) % 67;
      return (
        <div
          key={`fine-${i}`}
          style={{
            position: 'absolute',
            left: 24 + col * 76 + (seed % 17),
            top: row * 65 + (seed % 9),
            width: 4 + (seed % 4),
            height: 13 + (seed % 9),
            background: seed % 5 === 0 ? '#8b416e' : '#e9ecc1',
            boxShadow: '2px 4px #4a1249',
          }}
        />
      );
    })}
  </div>
);

/** The 60-frame title and dice fall approved in the side-by-side review. */
export const DiceGlitchQuote: React.FC<DiceGlitchQuoteProps> = ({
  backgroundSrc = 'bg-dice-youtube-74HP05sIxJY-fall.mp4',
  quoteLines = ['*Rolling to get away', 'with flagrant crimes*'],
  fillColor = '#dfe8b6',
  shadowColor = '#6d2a5e',
  backgroundScale = 1.2,
  backgroundOffsetX = 100,
  smearStrength = 1,
  glitchFrames = [2, 5, 17, 22],
  smearFrames = [3, 4, 6, 8, 9],
  textFrames = [15, 22],
}) => {
  const frame = useCurrentFrame();
  const noiseOpacity = lerp(frame, [...glitchFrames], [0, 1, 1, 0]);
  const textOpacity = lerp(frame, [...textFrames], [0, 1]);
  const smear = lerp(frame, [...smearFrames], [0, 0.75, 1, 0.6, 0]) * smearStrength;
  const brightness = lerp(frame, [0, 6, 24], [0.68, 0.72, 0.76]);

  return (
    <AbsoluteFill style={{background: '#080606', overflow: 'hidden'}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `scale(${backgroundScale}) translateX(${backgroundOffsetX}px)`,
          filter: `blur(${smear * 8}px) brightness(${brightness})`,
        }}
      >
        <GameVideo src={backgroundSrc} />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: smear * 0.14,
          mixBlendMode: 'screen',
          transform: `scale(${backgroundScale}) translateX(${backgroundOffsetX - smear * 8}px)`,
          filter: 'brightness(.6) sepia(1) saturate(5) hue-rotate(285deg)',
        }}
      >
        <GameVideo src={backgroundSrc} />
      </div>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: smear * 0.14,
          mixBlendMode: 'screen',
          transform: `scale(${backgroundScale}) translateX(${backgroundOffsetX + smear * 8}px)`,
          filter: 'brightness(.6) sepia(1) saturate(5) hue-rotate(155deg)',
        }}
      >
        <GameVideo src={backgroundSrc} />
      </div>
      <div
        style={{
          position: 'absolute',
          left: 345,
          top: 348,
          width: 600,
          height: 110,
          opacity: textOpacity,
          transform: `translateX(${lerp(frame, [...textFrames], [12, 0])}px) skewX(-5deg) scaleY(1.08)`,
          font: '700 46px "Pixelify Sans", sans-serif',
          color: fillColor,
          lineHeight: 1.1,
          textAlign: 'center',
          WebkitTextStroke: `1.3px ${fillColor}`,
          textShadow: `3px 4px ${shadowColor}, 5px 6px #210c20`,
        }}
      >
        {quoteLines[0]}
        <br />
        {quoteLines[1]}
      </div>
      <div style={{opacity: noiseOpacity}}>
        <GlitchBars frame={frame} />
      </div>
    </AbsoluteFill>
  );
};
