import React from "react";
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
import meta from "../public/glyph-meta.json";
import motion from "../public/boss-motion.json";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const Bg: React.FC<{ name: string }> = ({ name }) => (
  <OffthreadVideo
    src={staticFile(`bg-${name}.mp4`)}
    style={{ width: 1280, height: 720 }}
    muted
  />
);
export const Glyph: React.FC<{
  asset: keyof typeof meta;
  color: string;
  x?: number;
  y?: number;
  scale?: number;
  edge?: string;
  edgeWidth?: number;
}> = ({ asset, color, x, y, scale = 1, edge = "#151015", edgeWidth = 0 }) => {
  const m = meta[asset];
  const k = edgeWidth;
  return (
    <div
      style={{
        position: "absolute",
        left: x ?? m.x,
        top: y ?? m.y,
        width: m.w,
        height: m.h,
        transform: `scale(${scale})`,
        transformOrigin: "center",
        filter: k
          ? `drop-shadow(${k}px 0 0 ${edge}) drop-shadow(${-k}px 0 0 ${edge}) drop-shadow(0 ${k}px 0 ${edge}) drop-shadow(0 ${-k}px 0 ${edge})`
          : undefined,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          background: color,
          maskImage: `url(${staticFile(asset + ".svg")})`,
          maskSize: "100% 100%",
        }}
      />
    </div>
  );
};
export const BossTitles: React.FC = () => {
  const f = useCurrentFrame();
  const pose = (key: "boss-top" | "boss-bottom") => {
    let a = motion[key];
    if (key === "boss-top")
      a = a.map((row) =>
        row[0] === 4
          ? [4, -275, -74, 1.3]
          : row[0] === 5
            ? [5, -249, -65, 1.28]
            : row,
      );
    const fs = a.map((v) => v[0]);
    return [1, 2, 3].map((k) =>
      interpolate(
        f,
        fs,
        a.map((v) => v[k]),
        clamp,
      ),
    );
  };
  return (
    <AbsoluteFill>
      <Bg name="Boss" />
      {f >= 4 &&
        f < 40 &&
        (["boss-top", "boss-bottom"] as const).map((key) => {
          const [x, y, scale] = pose(key);
          const m = meta[key];
          return (
            <Glyph
              key={key}
              asset={key}
              color="#ef345a"
              x={x + ((scale - 1) * m.w) / 2}
              y={y + ((scale - 1) * m.h) / 2}
              scale={scale}
            />
          );
        })}
    </AbsoluteFill>
  );
};
export const FramedMemeSwap: React.FC<{
  start?: number;
  swap?: number;
  end?: number;
}> = ({ start = 22, swap = 37, end = 53 }) => {
  const f = useCurrentFrame();
  const second = f >= swap;
  const scale = second
    ? interpolate(f, [swap, swap + 7, 52], [0.82, 1.05, 1.04], clamp)
    : interpolate(f, [start, start + 9, 36], [0.67, 1, 1.04], clamp);
  const width = second ? 351 : 391;
  const height = second ? 359 : 364;
  return (
    <AbsoluteFill>
      <Bg name="Cards" />
      {f >= start && f < end && (
        <Img
          src={staticFile(second ? "card-cursed.png" : "card-minion.png")}
          style={{
            position: "absolute",
            left: 989 - width / 2,
            top: 360 - height / 2,
            width,
            height,
            transform: `scale(${scale})`,
            filter: "drop-shadow(0 8px 8px #0008)",
          }}
        />
      )}
    </AbsoluteFill>
  );
};
export const SpeechStages: React.FC<{ switchFrame?: number; end?: number }> = ({
  switchFrame = 43,
  end = 72,
}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg name="Speech" />
      {f >= 1 && f < end && (
        <>
          {f < switchFrame && (
            <Glyph
              asset="speech-label"
              color="#ffffff"
              edge="#050707"
              edgeWidth={1.5}
            />
          )}
          <Glyph
            asset={f < switchFrame ? "speech-first" : "speech-second"}
            color="#f8ff53"
            edge="#96005e"
            edgeWidth={2.5}
          />
        </>
      )}
    </AbsoluteFill>
  );
};
export const RgbLayers: React.FC<{
  children: React.ReactNode;
  amount: number;
  blur?: number;
}> = ({ children, amount, blur = 0 }) => (
  <div
    style={{
      position: "absolute",
      width: 1280,
      height: 720,
      filter: `blur(${blur}px)`,
      isolation: "isolate",
    }}
  >
    <svg width="0" height="0" style={{ position: "absolute" }}>
      <defs>
        <filter id="redChannel">
          <feColorMatrix
            type="matrix"
            values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
          />
        </filter>
        <filter id="cyanChannel">
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
        </filter>
        <filter id="demoGrade">
          <feColorMatrix
            type="matrix"
            values="1.35 0 0 0 0 0 1.12 0 0 0 0 0 1 0 0 0 0 0 1 0"
          />
        </filter>
      </defs>
    </svg>
    {amount > 0 ? (
      <>
        <div
          style={{
            position: "absolute",
            inset: 0,
            filter: "url(#redChannel)",
            transform: `translateX(${amount}px)`,
          }}
        >
          {children}
        </div>
        <div
          style={{
            position: "absolute",
            inset: 0,
            filter: "url(#cyanChannel)",
            mixBlendMode: "screen",
            transform: `translateX(${-amount}px)`,
          }}
        >
          {children}
        </div>
      </>
    ) : (
      children
    )}
  </div>
);
export const RgbMemePoster: React.FC = () => {
  const f = useCurrentFrame();
  const active = f >= 5 && f < 31;
  const z = interpolate(f, [5, 7, 12], [1.36, 1.13, 1], clamp);
  const shift = interpolate(f, [5, 7, 8, 9, 10, 12], [24, 14, 4, 2, 0, 0], clamp);
  const dx =
    f >= 5 && f < 12
      ? Math.sin(f * 2.7) * interpolate(f, [5, 12], [36, 0], clamp)
      : 0;
  const dy =
    f >= 5 && f < 12
      ? Math.cos(f * 2.3) * interpolate(f, [5, 12], [15, 0], clamp)
      : 0;
  const Scene = (
    <div
      style={{
        width: 1280,
        height: 720,
        transform: active
          ? `translate(${dx}px,${dy}px) scale(${z})`
          : undefined,
        transformOrigin: "990px 360px",
      }}
    >
      <div style={{ filter: active ? "url(#demoGrade)" : undefined }}>
        <Bg name="Poster" />
      </div>
      {active && (
        <>
          <Img
            src={staticFile("poster-portrait.png")}
            style={{
              position: "absolute",
              left: 826,
              top: 212,
              width: 340,
              height: 312,
            }}
          />
          <Glyph asset="poster-top" color="#acff26" />
          <Glyph asset="poster-bottom" color="#acff26" />
        </>
      )}
    </div>
  );
  return (
    <AbsoluteFill>
      <RgbLayers
        amount={active ? shift : 0}
        blur={active ? interpolate(f, [5, 7, 9, 11, 12], [7, 4, 3.8, 1.2, 0], clamp) : 0}
      >
        {Scene}
      </RgbLayers>
    </AbsoluteFill>
  );
};
export const BehindCaption: React.FC<{ text?: string }> = ({
  text = "He’s right behind me, isn’t he?",
}) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg name="Behind" />
      {f >= 2 && f < 31 && (
        <svg
          width="1280"
          height="720"
          style={{ position: "absolute", inset: 0, overflow: "visible" }}
        >
          <text
            x="640"
            y="604"
            textAnchor="middle"
            fontFamily="Impact"
            fontSize="65"
            textLength="770"
            lengthAdjust="spacingAndGlyphs"
            fill="#822f32"
            stroke="#260711"
            strokeWidth="6"
            paintOrder="stroke"
            style={{ filter: "drop-shadow(0 4px 0 #16030b)" }}
          >
            {text}
          </text>
        </svg>
      )}
    </AbsoluteFill>
  );
};
