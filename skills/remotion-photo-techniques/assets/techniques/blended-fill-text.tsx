import {useId} from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import type {BlendMode} from './blend-modes';

export type BlendedFillTextProps = {
  text: string;
  fillColor?: string;
  fillOpacity?: number;
  blendMode?: BlendMode;
  edgeColor?: string;
  edgeOpacity?: number;
  edgeWidth?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  baselineY?: number;
  revealStartFrame?: number;
  revealEndFrame?: number;
  scaleFrom?: number;
};

/** A semi-transparent, color-blended title over any footage or image. */
export const BlendedFillText: React.FC<BlendedFillTextProps> = ({
  text,
  fillColor = '#c9cad8',
  fillOpacity = 0.68,
  blendMode = 'screen',
  edgeColor = '#f1eee8',
  edgeOpacity = 0.3,
  edgeWidth = 1.4,
  fontFamily = 'Georgia, Times New Roman, serif',
  fontSize = 260,
  fontWeight = 400,
  letterSpacing = 12,
  baselineY,
  revealStartFrame = 9,
  revealEndFrame = 32,
  scaleFrom = 0.96,
}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const clipId = useId().replace(/:/g, '');
  const progress = interpolate(frame, [revealStartFrame, revealEndFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = scaleFrom + (1 - scaleFrom) * progress;
  const y = baselineY ?? height * 0.85;
  const common = {
    x: width / 2,
    y,
    textAnchor: 'middle' as const,
    fontFamily,
    fontSize,
    fontWeight,
    letterSpacing,
  };

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none'}}
      aria-label={text}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={0} y={0} width={width * progress} height={height} />
        </clipPath>
      </defs>
      <g
        clipPath={`url(#${clipId})`}
        transform={`translate(${width / 2} ${y}) scale(${scale}) translate(${-width / 2} ${-y})`}
      >
        <text {...common} fill={fillColor} fillOpacity={fillOpacity} style={{mixBlendMode: blendMode}}>
          {text}
        </text>
        <text
          {...common}
          fill="none"
          stroke={edgeColor}
          strokeOpacity={edgeOpacity}
          strokeWidth={edgeWidth}
          strokeLinejoin="round"
        >
          {text}
        </text>
      </g>
    </svg>
  );
};
