import {useId} from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';

export type OutlineOnlyTextProps = {
  text: string;
  strokeColor?: string;
  strokeWidth?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  revealStartFrame?: number;
  revealEndFrame?: number;
  baselineY?: number;
};

/** Place over any Remotion scene. SVG fill="none" leaves every letter transparent. */
export const OutlineOnlyText: React.FC<OutlineOnlyTextProps> = ({
  text,
  strokeColor = '#f7f1e8',
  strokeWidth = 5,
  fontFamily = 'Arial Black, Arial, sans-serif',
  fontSize = 220,
  fontWeight = 900,
  revealStartFrame = 6,
  revealEndFrame = 34,
  baselineY,
}) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  const clipId = useId().replace(/:/g, '');
  const reveal = interpolate(frame, [revealStartFrame, revealEndFrame], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [revealStartFrame, revealEndFrame], [0.96, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = baselineY ?? height * 0.57;

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{position: 'absolute', inset: 0, overflow: 'visible'}}
      aria-label={text}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={0} y={0} width={width * reveal} height={height} />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <text
          x={width / 2}
          y={y}
          textAnchor="middle"
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          fontFamily={fontFamily}
          fontWeight={fontWeight}
          fontSize={fontSize}
          transform={`translate(${width / 2} ${y}) scale(${scale}) translate(${-width / 2} ${-y})`}
        >
          {text}
        </text>
      </g>
    </svg>
  );
};
