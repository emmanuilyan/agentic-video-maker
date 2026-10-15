import { BlendedFillText } from "./blended-fill-text";
import React from "react";
import {
  AbsoluteFill,
  Img,
  OffthreadVideo,
  staticFile,
  useCurrentFrame,
  interpolate,
} from "remotion";
const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const Bg: React.FC<{ name: string }> = ({ name }) => (
  <OffthreadVideo
    muted
    src={staticFile(`bg-${name}.mp4`)}
    style={{ width: 1280, height: 720 }}
  />
);
const Glyph: React.FC<{
  asset: string;
  x: number;
  y: number;
  w: number;
  h: number;
  scale?: number;
  gradient?: string;
  stroke?: boolean;
}> = ({ asset, x, y, w, h, scale = 1, gradient = "white", stroke = false }) => (
  <div
    style={{
      position: "absolute",
      left: x,
      top: y,
      width: w,
      height: h,
      scale,
      transformOrigin: "50% 100%",
    }}
  >
    {stroke && (
      <Img
        src={staticFile(asset + "-outline.svg")}
        style={{ position: "absolute", inset: 0, width: w, height: h }}
      />
    )}
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: gradient,
        maskImage: `url(${staticFile(asset + ".svg")})`,
        maskSize: "100% 100%",
        filter: "drop-shadow(2px 3px 2px #0008)",
      }}
    />
  </div>
);
export const SquidScene: React.FC = () => {
  const f = useCurrentFrame();
  const stages = [
    { at: 8, asset: "squid", x: 429, w: 430 },
    { at: 38, asset: "squid-game", x: 364, w: 565 },
    { at: 56, asset: "squid-huggy", x: 212, w: 863 },
    { at: 80, asset: "squid-wuggy", x: 26, w: 1224 },
  ];
  const s = stages.filter((s) => f >= s.at).slice(-1)[0];
  return (
    <AbsoluteFill style={{ background: "black" }}>
      <Bg name="Squid" />
      {f >= 10 && f < 57 && (
        <Img
          src={staticFile("organic-frame.png")}
          style={{
            position: "absolute",
            width: 1280,
            height: 720,
            opacity: interpolate(f, [10, 14, 54, 57], [0.6, 1, 1, 0], clamp),
          }}
        />
      )}
      {s && f < 121 && (
        <Glyph
          asset={s.asset}
          x={s.x}
          y={541}
          w={s.w}
          h={103}
          scale={interpolate(f, [s.at, s.at + 12], [0.73, 1], clamp)}
          gradient="linear-gradient(100deg,#52042f,#700755 40%,#7c0843 75%,#5b003f)"
          stroke
        />
      )}
    </AbsoluteFill>
  );
};
export const HumanScene: React.FC = () => {
  const f = useCurrentFrame();
  const s =
    f < 32
      ? { at: 6, asset: "human", x: 435, w: 420 }
      : f < 46
        ? { at: 32, asset: "human-male", x: 275, w: 745 }
        : { at: 46, asset: "human-fighter", x: 35, w: 1210 };
  return (
    <AbsoluteFill>
      <Bg name="Human" />
      {f >= 6 && f < 62 && (
        <Glyph
          {...s}
          y={518}
          h={105}
          scale={interpolate(f, [s.at, s.at + 11], [0.72, 1], clamp)}
        />
      )}
    </AbsoluteFill>
  );
};
export const MetallicTitle: React.FC<{
  text: string;
  y: number;
  gradient: string;
  width?: number;
  scale?: number;
  compress?: number;
  fontSize?: number;
  center?: number;
  origin?: string;
  edgeColor?: string;
  textured?: boolean;
}> = ({
  text,
  y,
  gradient,
  width = 550,
  scale = 1,
  compress = 1,
  fontSize = 160,
  center = 640,
  origin = "50% 100%",
  edgeColor = "#dbe5dd77",
  textured = false,
}) => {
  const colors = Array.from(
    gradient.matchAll(/(#[a-fA-F0-9]{3,8})(?:\s+(\d+)%)?/g),
  );
  const id = text.replace(/[^a-z]/gi, "");
  const w = width * compress;
  return (
    <svg
      width={w}
      height={160}
      viewBox={`0 0 ${w} 160`}
      style={{
        position: "absolute",
        left: center - w / 2,
        top: y,
        scale,
        transformOrigin: origin,
        overflow: "visible",
        filter: "drop-shadow(2px 4px 2px #19191bcc)",
      }}
    >
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1={fontSize * 0.125}
          x2="0"
          y2={fontSize * 0.875}
        >
          {colors.map((c, i) => (
            <stop
              key={i}
              offset={c[2] ? Number(c[2]) / 100 : i / (colors.length - 1)}
              stopColor={c[1]}
            />
          ))}
        </linearGradient>
        <clipPath id={id + "clip"}>
          <text
            x={0}
            y={fontSize * 0.875}
            fontFamily="Impact"
            fontSize={fontSize}
            textLength={w}
            lengthAdjust="spacingAndGlyphs"
          >
            {text}
          </text>
        </clipPath>
        <filter
          id={id + "texture"}
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency=".045 .10"
            numOctaves={1}
            seed={9}
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale={20}
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
      {textured && (
        <g clipPath={`url(#${id}clip)`}>
          <rect
            x={-10}
            y={0}
            width={w + 20}
            height={160}
            fill={`url(#${id})`}
            filter={`url(#${id}texture)`}
          />
        </g>
      )}
      <text
        x={0}
        y={fontSize * 0.875}
        fontFamily="Impact"
        fontSize={fontSize}
        textLength={w}
        lengthAdjust="spacingAndGlyphs"
        fill={textured ? "transparent" : `url(#${id})`}
        stroke={edgeColor}
        strokeWidth={1}
      >
        {text}
      </text>
    </svg>
  );
};
export const RizzScene: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <div
        style={{
          width: 1280,
          height: 720,
          scale: interpolate(
            f,
            [0, 50, 51, 60, 75, 90, 119],
            [1, 1, 1.35, 1.7, 2.1, 2.2, 2.2],
            clamp,
          ),
          transformOrigin: "640px 400px",
        }}
      >
        <Bg name="Rizz" />
      </div>
      {f >= 8 && f < 112 && (
        <MetallicTitle
          text="ON GYATT"
          y={24}
          width={550}
          scale={interpolate(f, [8, 21], [0.75, 1], clamp)}
          gradient="linear-gradient(#e7efed 0%,#dce1df 47%,#e5fc94 56%,#ece6eb 68%,#aaa2ac 81%,#c000b5 94%,#620353)"
        />
      )}
      {f >= 51 && f < 112 && (
        <MetallicTitle
          text="RIZZ KING"
          textured
          y={542}
          width={550}
          scale={interpolate(f, [51, 72], [0.62, 1], clamp)}
          gradient="linear-gradient(#008a99 0%,#02b9bd 40%,#a2ccc6 51%,#e0dbd0 58%,#382923 72%,#a74f08 94%,#c97512)"
        />
      )}
    </AbsoluteFill>
  );
};
export const PronounsScene: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Bg name="Pronouns" />
      {f >= 5 && f < 31 && (
        <OffthreadVideo
          muted
          src={staticFile("pronoun-first.mp4")}
          style={{
            position: "absolute",
            left: 104,
            top: 146,
            width: 274,
            height: 429,
            scale: interpolate(f, [5, 14], [0.77, 1], clamp),
          }}
        />
      )}
      {f >= 17 && f < 31 && (
        <Img
          src={staticFile("pronoun-second.png")}
          style={{
            position: "absolute",
            left: 58,
            top: 211,
            width: 352,
            height: 299,
            scale: interpolate(f, [17, 23], [0.65, 1], clamp),
          }}
        />
      )}
      {f >= 5 && f < 31 && (
        <MetallicTitle
          text={f < 17 ? "PRONOUNCE: THEY" : "PRONOUNCE: THEY/THEM"}
          y={515}
          width={f < 17 ? 636 : 900}
          compress={1}
          origin="50% 50%"
          edgeColor="#151b1b"
          fontSize={139}
          center={604}
          scale={
            f < 17
              ? interpolate(f, [5, 8, 12, 16], [0.736, 0.85, 0.985, 1], clamp)
              : interpolate(
                  f,
                  [17, 18, 20, 23, 27, 30],
                  [0.732, 0.76, 0.846, 0.963, 0.989, 0.985],
                  clamp,
                )
          }
          gradient="linear-gradient(#ffff00 0%,#ffff00 24%,#f8f8f6 25%,#f8f8f6 51%,#9c45cb 52%,#9c45cb 78%,#1a2020 79%)"
        />
      )}
    </AbsoluteFill>
  );
};
export const MemeTitleStack: React.FC = () => {
  const f = useCurrentFrame();
  const small = f < 44;
  return (
    <AbsoluteFill>
      <Bg name="Meme" />
      {f >= 4 && f < 44 && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: "inset(0 0 0 840px)",
            filter: "invert(.1) brightness(1.05)",
          }}
        >
          <Bg name="Meme" />
        </div>
      )}
      {f >= 4 && f < 44 && (
        <>
          <div
            style={{
              position: "absolute",
              left: 334,
              top: 120,
              fontFamily: "Times New Roman",
              fontSize: 30,
              color: "#c492df",
            }}
          >
            STUPID stat (awful)
          </div>
          <div
            style={{
              position: "absolute",
              left: 329,
              top: 414,
              fontFamily: "Times New Roman",
              fontSize: 30,
              color: "#89e1c3",
            }}
          >
            POWERFUL Rizz
          </div>
        </>
      )}
      {f >= 44 && f < 85 && (
        <>
          <BlendedFillText
            text="FUCK YOU"
            canvasWidth={1280}
            canvasHeight={720}
            centerX={805}
            textWidth={520}
            baselineY={125}
            fontFamily="Impact"
            fontStyle="italic"
            fontSize={128}
            fillColor="#4800f2"
            fillOpacity={0.95}
            blendMode="difference"
            edgeColor="#15377a"
            edgeOpacity={0.8}
            edgeWidth={3}
            letterSpacing={0}
            revealStartFrame={-2}
            revealEndFrame={-1}
            scaleFrom={1}
          />
          <BlendedFillText
            text="I CAST TESTICULAR"
            canvasWidth={1280}
            canvasHeight={720}
            centerX={791}
            textWidth={582}
            baselineY={540}
            fontFamily="Impact"
            fontStyle="italic"
            fontSize={76}
            fillColor="#4800f2"
            fillOpacity={0.92}
            blendMode="difference"
            edgeColor="#254d94"
            edgeOpacity={0.7}
            edgeWidth={2}
            letterSpacing={0}
            revealStartFrame={-2}
            revealEndFrame={-1}
            scaleFrom={1}
          />
          <BlendedFillText
            text="TORSION"
            canvasWidth={1280}
            canvasHeight={720}
            centerX={810}
            textWidth={282}
            baselineY={594}
            fontFamily="Impact"
            fontStyle="italic"
            fontSize={76}
            fillColor="#4800f2"
            fillOpacity={0.92}
            blendMode="difference"
            edgeColor="#254d94"
            edgeOpacity={0.7}
            edgeWidth={2}
            letterSpacing={0}
            revealStartFrame={-2}
            revealEndFrame={-1}
            scaleFrom={1}
          />
        </>
      )}
      {f >= 4 && f < 85 && (
        <svg
          width={1280}
          height={720}
          style={{
            position: "absolute",
            inset: 0,
            filter: "drop-shadow(2px 3px 2px #000a)",
          }}
        >
          <text
            x={640}
            y={636}
            textAnchor="middle"
            fontFamily="Impact"
            fontSize={65}
            textLength={small ? 290 : 559}
            lengthAdjust="spacingAndGlyphs"
            fill="#ffff53"
            stroke="#a30083"
            strokeWidth={6}
            paintOrder="stroke"
          >
            {small ? "UNNATURAL" : "UNNATURAL Charisma."}
          </text>
        </svg>
      )}
    </AbsoluteFill>
  );
};
