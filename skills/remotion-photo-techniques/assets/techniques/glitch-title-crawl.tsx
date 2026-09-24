import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const noise = (seed: number) => {
  const value = Math.sin(seed * 127.1 + 311.7) * 43758.5453;
  return value - Math.floor(value);
};

export type GlitchTitleCrawlProps = {
  title?: string;
  topText?: string;
  bottomText?: string;
  titleColor?: string;
  glitchColor?: string;
  tickerColor?: string;
  framePalette?: string[];
  fontSize?: number;
  tickerFontSize?: number;
  tickerSpeed?: number;
};

const Ticker: React.FC<{
  frame: number;
  text: string;
  bottom: boolean;
  color: string;
  fontSize: number;
  speed: number;
  scale: number;
}> = ({ frame, text, bottom, color, fontSize, speed, scale }) => {
  const phase = Math.floor(frame / 3);

  return (
    <div
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        [bottom ? "bottom" : "top"]: (bottom ? 32 : 28) * scale,
        height: 48 * scale,
        overflow: "hidden",
        whiteSpace: "nowrap",
        fontFamily: "Arial, sans-serif",
        fontSize: fontSize * scale,
        letterSpacing: 2.2 * scale,
        fontWeight: 700,
        opacity: 0.72 + Math.sin(frame / 8) * 0.08,
        mixBlendMode: "screen",
        textShadow: `0 0 ${5 * scale}px ${color}`,
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          transform: `translateX(-${(frame * speed * scale) % (235 * scale)}px)`,
        }}
      >
        {Array.from({ length: 7 }, (_, index) => (
          <span key={index} style={{ color, paddingRight: 16 * scale }}>
            {text} ·
          </span>
        ))}
      </div>
      {Array.from({ length: 27 }, (_, index) => {
        const seed = index * 31 + phase * 17 + (bottom ? 300 : 0);
        const width = (9 + noise(seed + 4) * 54) * scale;

        return (
          <span
            key={`tear${index}`}
            style={{
              position: "absolute",
              left: `${noise(seed) * 100}%`,
              top: `${noise(seed + 1) * 85}%`,
              width,
              height: (2 + noise(seed + 3) * 5) * scale,
              background: color,
              opacity: noise(seed + 5) > 0.56 ? 0.65 : 0.18,
              mixBlendMode: "screen",
              pointerEvents: "none",
            }}
          />
        );
      })}
    </div>
  );
};

const PixelFrame: React.FC<{ frame: number; palette: string[]; scale: number }> = ({
  frame,
  palette,
  scale,
}) => {
  const phase = Math.floor(frame / 2);
  const colors = palette.length > 0 ? palette : ["#f02bbb", "#e9f335"];
  const horizontal = Array.from({ length: 104 }, (_, index) => {
    const n = noise(index * 11 + phase * 17);
    const x = (index / 104) * 1280 * scale;
    const width = (7 + noise(index * 7 + phase * 9) * 43) * scale;
    const height = (3 + noise(index * 3 + phase * 23) * 12) * scale;
    const color = colors[Math.floor(noise(index * 19 + phase * 5) * colors.length)];

    if (n <= 0.18) return null;
    return (
      <React.Fragment key={`h${index}`}>
        <div
          style={{
            position: "absolute",
            left: x + (noise(index * 6 + phase) * 14 - 7) * scale,
            top: noise(index + phase) * 13 * scale,
            width,
            height,
            background: color,
            opacity: 0.66 + noise(index * 23 + phase) * 0.34,
            boxShadow: `0 0 ${8 * scale}px ${color}`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: x + (noise(index * 4 + phase) * 18 - 9) * scale,
            bottom: noise(index * 2 + phase) * 13 * scale,
            width: width * (0.45 + noise(index * 8 + phase)),
            height: Math.max(3 * scale, height - scale),
            background: colors[(Math.floor(noise(index * 13 + phase * 7) * colors.length) + 1) % colors.length],
            opacity: 0.62 + noise(index * 29 + phase) * 0.38,
          }}
        />
      </React.Fragment>
    );
  });
  const vertical = Array.from({ length: 58 }, (_, index) => {
    const n = noise(index * 13 + phase * 29);
    if (n < 0.24) return null;

    const y = (18 + (index / 58) * 680) * scale;
    const size = (4 + noise(index * 31 + phase * 3) * 13) * scale;
    const color = colors[Math.floor(noise(index * 5 + phase * 13) * colors.length)];

    return (
      <React.Fragment key={`v${index}`}>
        <div
          style={{
            position: "absolute",
            left: (2 + noise(index + phase) * 10) * scale,
            top: y,
            width: size,
            height: (5 + noise(index * 3 + phase) * 23) * scale,
            background: color,
            opacity: 0.88,
          }}
        />
        <div
          style={{
            position: "absolute",
            right: (2 + noise(index * 2 + phase) * 10) * scale,
            top: y + 3 * scale,
            width: Math.max(3 * scale, size - scale),
            height: (5 + noise(index * 7 + phase) * 20) * scale,
            background: colors[(Math.floor(noise(index * 11 + phase) * colors.length) + 2) % colors.length],
            opacity: 0.84,
          }}
        />
      </React.Fragment>
    );
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          inset: 5 * scale,
          border: `${9 * scale}px solid rgba(224,35,184,.24)`,
          boxShadow: `inset 0 0 ${12 * scale}px rgba(236,42,191,.45), 0 0 ${13 * scale}px rgba(236,42,191,.4)`,
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 14 * scale,
          border: `${scale}px solid rgba(246,227,54,.28)`,
          boxShadow: `0 0 ${5 * scale}px rgba(242,38,187,.5)`,
        }}
      />
      {horizontal}
      {vertical}
    </AbsoluteFill>
  );
};

/** Large single-color title, letter-confined magenta glitch slices, and a crawling ticker. */
export const GlitchTitleCrawl: React.FC<GlitchTitleCrawlProps> = ({
  title = "Max0r",
  topText = "WARNING PLS SECURE",
  bottomText = "SPOILERS · THIS VIDEO CONTAINS",
  titleColor = "#fff12e",
  glitchColor,
  tickerColor = "#ed20c1",
  framePalette = ["#f02bbb", "#e9f335", "#ff374d", "#d42bbd"],
  fontSize = 260,
  tickerFontSize = 40,
  tickerSpeed = 2.8,
}) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const scale = Math.min(width / 1280, height / 720);
  const baseOpacity = interpolate(frame, [32, 42], [0, 0.94], clamp);
  const phase = Math.floor(frame / 2);
  const early = frame < 58;
  const baseJitter = early
    ? (noise(phase + 3) - 0.5) * 20 * scale
    : (noise(phase + 3) - 0.5) * 4 * scale;
  const flash = frame % 17 < 2;
  const titleScale = interpolate(frame, [0, 42, 52], [0.94, 1.035, 1], {
    ...clamp,
    easing: Easing.out(Easing.cubic),
  });
  const glowOpacity = interpolate(frame, [48, 64], [0, 0.08], clamp);
  const appliedGlitchColor = glitchColor ?? tickerColor;

  const glyphs = Array.from(title, (letter, letterIndex) => {
    const slices = Array.from({ length: 34 }, (_, index) => {
      const top = (index / 34) * 100;
      const sliceHeight = 2.2 + noise(letterIndex * 137 + index * 23) * 7.2;

      return Array.from({ length: 3 }, (_, part) => {
        const seed = letterIndex * 1009 + index * 101 + part * 29;
        const segmentWidth = 16 + noise(seed * 3) * 57;
        const left = noise(seed * 5) * (100 - segmentWidth);
        const right = 100 - left - segmentWidth;
        const start = noise(seed * 7 + 5) * 12 - 3;
        const opacityIn = interpolate(frame, [start, start + 3], [0, 1], clamp);
        const flicker = noise(seed * 11 + phase * 9) > 0.16 ? 1 : 0.08;
        const displacement = (noise(seed * 13 + phase * 7) - 0.5) * (early ? 48 : 18) * scale;
        const opacity = 0.48 + noise(seed * 19 + phase) * 0.48;

        return (
          <span
            key={`${letterIndex}-${index}-${part}`}
            aria-hidden
            style={{
              position: "absolute",
              display: "block",
              inset: 0,
              color: appliedGlitchColor,
              WebkitTextStroke: "0px transparent",
              clipPath: `inset(${top}% ${right}% ${100 - top - sliceHeight}% ${left}%)`,
              transform: `translateX(${displacement}px)`,
              opacity: Math.min(0.86, opacity * opacityIn * flicker),
              mixBlendMode: "overlay",
              textShadow: `0 0 ${4 * scale}px ${appliedGlitchColor}`,
              pointerEvents: "none",
            }}
          >
            {letter}
          </span>
        );
      });
    }).flat();

    return (
      <span
        key={`${letter}-${letterIndex}`}
        style={{
          position: "relative",
          display: "inline-block",
          overflow: "hidden",
          verticalAlign: "top",
        }}
      >
        <span
          style={{
            display: "block",
            opacity: baseOpacity * 0.92,
            color: titleColor,
            textShadow: `5px 4px 0 ${titleColor}3d`,
          }}
        >
          {letter}
        </span>
        {slices}
        <span
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            opacity: glowOpacity,
            color: titleColor,
            WebkitTextStroke: "0px transparent",
            mixBlendMode: "screen",
            textShadow: `0 0 ${8 * scale}px ${titleColor}`,
            pointerEvents: "none",
          }}
        >
          {letter}
        </span>
      </span>
    );
  });

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <Ticker
        frame={frame}
        text={topText}
        bottom={false}
        color={tickerColor}
        fontSize={tickerFontSize}
        speed={tickerSpeed}
        scale={scale}
      />
      <Ticker
        frame={frame}
        text={bottomText}
        bottom
        color={tickerColor}
        fontSize={tickerFontSize}
        speed={tickerSpeed}
        scale={scale}
      />
      <PixelFrame frame={frame} palette={framePalette} scale={scale} />
      <AbsoluteFill style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div
          style={{
            position: "relative",
            display: "flex",
            whiteSpace: "nowrap",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: 'Impact, "Arial Black", sans-serif',
            fontSize: fontSize * scale,
            fontWeight: 900,
            letterSpacing: -5 * scale,
            lineHeight: 0.95,
            color: titleColor,
            WebkitTextStroke: `${2 * scale}px ${titleColor}`,
            transform: `translateX(${baseJitter}px) scale(1.30, ${titleScale})`,
            filter: flash ? "brightness(1.18)" : "none",
          }}
        >
          {glyphs}
        </div>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "repeating-linear-gradient(0deg, transparent 0px 7px, rgba(246,34,111,.045) 7px 8px)",
          mixBlendMode: "screen",
        }}
      />
      <AbsoluteFill
        style={{ background: "radial-gradient(ellipse, transparent 38%, rgba(4,6,8,.55) 100%)" }}
      />
    </AbsoluteFill>
  );
};
