import type { CSSProperties } from "react";
import { interpolate, useCurrentFrame } from "remotion";

// Right-edge measurements from the 24 fps reference, normalized to 19 frames.
const measuredFrames = [-1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 19];
const measuredProgress = [
  0, 0.045, 0.06, 0.12, 0.22, 0.38, 0.52, 0.63, 0.71, 0.77, 0.82, 0.86, 0.91,
  0.95, 0.98, 1,
];

export type YellowTextHighlightProps = {
  lines: string[];
  width: number;
  lineHeight: number;
  fontSize: number;
  highlightColor?: string;
  textColor?: string;
  startFrame?: number;
  staggerFrames?: number;
  revealFrames?: number;
  frame?: number;
  style?: CSSProperties;
  textStyle?: CSSProperties;
};

/** Full-width marker bands reveal behind text; all motion depends only on frame. */
export function YellowTextHighlight({
  lines,
  width,
  lineHeight,
  fontSize,
  highlightColor = "#E9D642",
  textColor = "#222426",
  startFrame = 0,
  staggerFrames = 6,
  revealFrames = 19,
  frame,
  style,
  textStyle,
}: YellowTextHighlightProps) {
  const currentFrame = useCurrentFrame();
  const now = frame ?? currentFrame;

  return (
    <div style={{ width, ...style }}>
      {lines.map((line, index) => {
        const measuredFrame =
          ((now - startFrame - index * staggerFrames) * 19) /
          Math.max(1, revealFrames);
        const progress = interpolate(
          measuredFrame,
          measuredFrames,
          measuredProgress,
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        );

        return (
          <div
            key={`${index}-${line}`}
            style={{
              position: "relative",
              width,
              height: lineHeight,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              whiteSpace: "nowrap",
            }}
          >
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                width: `${progress * 100}%`,
                height: lineHeight - 1,
                backgroundColor: highlightColor,
              }}
            />
            <span
              style={{
                position: "relative",
                color: textColor,
                fontFamily: "Arial, Helvetica, sans-serif",
                fontSize,
                fontWeight: 400,
                lineHeight: `${lineHeight}px`,
                ...textStyle,
              }}
            >
              {line}
            </span>
          </div>
        );
      })}
    </div>
  );
}
