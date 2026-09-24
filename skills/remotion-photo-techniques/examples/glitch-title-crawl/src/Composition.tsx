import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { GlitchTitleCrawl } from "./GlitchTitleCrawl";

const SyntheticBackdrop: React.FC = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background:
          "radial-gradient(ellipse at 55% 31%, #93917d 0%, #67685e 36%, #303638 78%, #20292d 100%)",
      }}
    >
      <svg
        viewBox="0 0 1280 720"
        width="100%"
        height="100%"
        style={{ position: "absolute", filter: "blur(15px)", opacity: 0.56 }}
      >
        <defs>
          <radialGradient id="fog">
            <stop stopColor="#c7b987" stopOpacity=".58" />
            <stop offset="1" stopColor="#aca06a" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="armor" x2="0" y2="1">
            <stop stopColor="#77786e" />
            <stop offset="1" stopColor="#22282c" />
          </linearGradient>
        </defs>
        <ellipse cx="366" cy="219" rx="380" ry="250" fill="url(#fog)" />
        <path
          d="M0 498 142 366l154 91 148-185 179 203 154-149 178 153 137-133 188 123v251H0Z"
          fill="#2b3838"
          opacity=".75"
        />
        <g
          transform={`translate(${640 + Math.sin(frame / 24) * 4} 96)`}
          opacity=".83"
          fill="url(#armor)"
          stroke="#969381"
          strokeOpacity=".18"
          strokeWidth="7"
        >
          <path d="M-116 197q-21-111 44-147 91-37 149 27l25 143-40 31-147-6Z" />
          <path d="M-152 260q95-62 201-30l83 70 73 245-382-4 67-212Z" />
          <path
            d="M-132 307-238 460l35 24 145-120M112 296l111 159-29 20-136-129"
            fill="none"
            stroke="#77776d"
            strokeWidth="33"
          />
          <path
            d="M-75 196h92M-34 242h90"
            fill="none"
            stroke="#b8b5a8"
            strokeOpacity=".22"
            strokeWidth="12"
          />
        </g>
      </svg>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(0deg, rgba(7,10,12,.35), rgba(12,12,10,.08) 48%, rgba(4,7,9,.15))",
          filter: "blur(2px)",
        }}
      />
    </AbsoluteFill>
  );
};

export const Demo: React.FC = () => (
  <AbsoluteFill>
    <SyntheticBackdrop />
    <AbsoluteFill style={{ background: "rgba(9,12,13,.10)" }} />
    <GlitchTitleCrawl
      title="Max0r"
      topText="WARNING PLS SECURE"
      bottomText="SPOILERS · THIS VIDEO CONTAINS"
      tickerColor="#ed20c1"
      titleColor="#fff12e"
      fontSize={260}
      tickerFontSize={40}
      tickerSpeed={2.8}
    />
  </AbsoluteFill>
);
