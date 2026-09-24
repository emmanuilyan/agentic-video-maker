import type { ReactNode } from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { FantasyBackdrop, Portrait } from "./artwork";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const easeOut = (value: number) => 1 - Math.pow(1 - clamp(value), 3);
const between = (value: number, start: number, end: number) =>
  easeOut((value - start) / (end - start));

/** Hand-traced stand-in for the thin, irregular bronze game portrait bezel. */
const OrnateFrame: React.FC = () => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 380 350"
    preserveAspectRatio="none"
    style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
  >
    <defs>
      <linearGradient id="bronze" x1="0" y1="0" x2="1" y2="1">
        <stop stopColor="#b3a168" />
        <stop offset=".2" stopColor="#31251d" />
        <stop offset=".47" stopColor="#e0c484" />
        <stop offset=".7" stopColor="#332b27" />
        <stop offset="1" stopColor="#ba9b60" />
      </linearGradient>
      <linearGradient id="crest" x1="0" y1="0" x2="0" y2="1">
        <stop stopColor="#284cb3" />
        <stop offset=".45" stopColor="#102c92" />
        <stop offset="1" stopColor="#070f45" />
      </linearGradient>
    </defs>
    <path
      d="M3 4 30 3 49 7 88 5 110 8 142 5 170 9 195 4 223 8 248 4 278 7 320 5 350 7 377 3 376 43 373 97 377 152 374 205 377 276 376 346 331 344 287 347 250 343 198 347 161 343 114 346 72 343 34 348 3 346 5 284 2 230 5 173 2 121 5 69Z"
      fill="none"
      stroke="#0c121c"
      strokeWidth="6"
      strokeLinejoin="round"
    />
    <path
      d="M7 31 11 10 38 8 52 13 92 11 120 7 154 12 184 9 218 12 248 8 282 12 315 9 342 12 370 8 373 36 M7 34 10 83 7 128 10 176 7 233 10 287 8 338 M373 34 370 86 373 133 370 189 374 247 370 338 M8 339 37 336 76 340 117 337 153 340 192 335 232 340 275 337 318 340 371 338"
      fill="none"
      stroke="url(#bronze)"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <path
      d="M12 28 Q15 12 32 13 Q23 25 24 36 M18 18 Q42 20 53 11 Q47 29 31 33 M33 11 Q48 5 57 14 M366 28 Q363 12 347 13 Q354 25 353 36 M359 18 Q337 20 326 11 Q331 29 348 33 M348 11 Q333 5 323 14 M12 321 Q15 340 32 338 Q23 327 24 316 M18 332 Q42 329 53 341 Q47 323 31 318 M366 321 Q363 340 347 338 Q354 327 353 316 M359 332 Q337 329 326 341 Q331 323 348 318"
      fill="none"
      stroke="url(#bronze)"
      strokeWidth="3"
      strokeLinecap="round"
    />
    {[18, 39, 64, 91, 118, 265, 293, 321, 346, 362].map((x, i) => (
      <g key={x}>
        <path
          d={`M${x - 5} 9 Q${x} ${i % 2 ? 19 : 15} ${x + 5} 10 Q${x} 3 ${x - 5} 9Z`}
          fill={i % 3 === 0 ? "#ceb579" : "#6d593d"}
          opacity=".85"
        />
        <path
          d={`M${x - 4} 340 Q${x} 331 ${x + 5} 340`}
          fill="none"
          stroke="#7b683f"
          strokeWidth="2"
        />
      </g>
    ))}
    <path
      d="M145 3 Q158 8 165 2 L213 2 Q224 9 237 3 L230 20 Q214 25 192 23 Q163 25 150 19Z"
      fill="url(#crest)"
      stroke="#080e28"
      strokeWidth="3"
    />
    <path
      d="M156 8 Q173 15 188 7 Q207 15 224 8 M161 17 Q190 12 221 17"
      fill="none"
      stroke="#416bd9"
      strokeWidth="2"
      opacity=".65"
    />
  </svg>
);

const SoftWords: React.FC<{
  text: string;
  frame: number;
  baseBlur: number[];
}> = ({ text, frame, baseBlur }) => (
  <>
    {text.split(" ").map((word, index) => (
      <span
        key={`${word}-${index}`}
        style={{
          display: "inline-block",
          marginRight: ".24em",
          filter: `blur(${Math.max(0.2, baseBlur[index % baseBlur.length] + Math.sin(frame / 9 + index * 2) * 0.45)}px)`,
        }}
      >
        {word}
      </span>
    ))}
  </>
);

export const PortraitTitleCard: React.FC<{
  frame: number;
  fps?: number;
  heading?: string;
  title?: string;
  copy?: string[];
  borderSrc?: string;
  portrait?: ReactNode;
  background?: ReactNode;
  fontFamily?: string;
}> = ({
  frame,
  fps = 60,
  heading = "THIS VIDEO SPOILS THE",
  title = "ENTIRE VIDEO GAME BALDURS GATE",
  copy = [
    "ALL MY VIDEOS ARE REALLY FAST AND I",
    "WANT YOU TO BE ALIVE. THIS CONTAINS",
    "FLASHING LIGHTS.",
  ],
  borderSrc = staticFile("portrait-border.png"),
  portrait = <Portrait />,
  background,
  fontFamily = 'Didot, "Times New Roman", serif',
}) => {
  const time = frame / fps;
  const portraitEntry = between(time, 0.15, 0.24);
  const titleEntry = between(time, 0.33, 0.43);
  const copyEntry = between(time, 0.47, 0.69);
  const cardOffset = (atFrame: number) => {
    const envelope = clamp((0.36 - atFrame / fps) / 0.2);
    return {
      x: envelope * (Math.sin(atFrame * 1.7) * 23 + Math.cos(atFrame * 3.3) * 10),
      y: envelope * (Math.sin(atFrame * 2.5) * 17 + Math.cos(atFrame * 4.1) * 8),
      rotation: envelope * (Math.sin(atFrame * 2.4) * 1.7 + Math.cos(atFrame * 0.9) * 0.5),
      envelope,
    };
  };
  const currentOffset = cardOffset(frame);
  const previousOffset = cardOffset(frame - 1);
  const speed = Math.hypot(
    currentOffset.x - previousOffset.x,
    currentOffset.y - previousOffset.y,
  );
  const portraitBlur = Math.min(22, speed * 0.5 + currentOffset.envelope * 6);
  const titleShake = clamp((0.52 - time) / 0.19) * between(time, 0.33, 0.36);
  const backgroundX = Math.sin(frame / 5) * 4 + Math.sin(frame / 17) * 7;
  const backgroundY = Math.cos(frame / 7) * 3;

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#1a0d10" }}>
      <AbsoluteFill
        style={{
          transform: `translate(${backgroundX}px, ${backgroundY}px) scale(1.04)`,
          filter: "blur(3px)",
        }}
      >
        {background ?? <FantasyBackdrop scene="ruins" frame={frame} />}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at ${20 + Math.sin(frame / 17) * 20}% 37%, #dd111edb, transparent 64%), radial-gradient(ellipse at ${70 + Math.cos(frame / 22) * 10}% 65%, #006e77a5, transparent 55%), radial-gradient(ellipse at 46% 82%, #ba531754, transparent 50%)`,
          mixBlendMode: "screen",
          filter: "blur(25px)",
          transform: `translate(${backgroundX * 1.8}px, ${backgroundY * 1.8}px) scale(1.08)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 18,
          width: "100%",
          textAlign: "center",
          fontFamily,
          fontSize: 49,
          fontWeight: 400,
          color: "#d8d5ce",
          whiteSpace: "nowrap",
          textShadow: "0 2px 5px #0009",
          opacity: 0.84,
          filter: `blur(${Math.max(0, 3 - time * 8)}px)`,
        }}
      >
        <SoftWords text={heading} frame={frame} baseBlur={[2.4, 0.55, 1.25, 2.3]} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 440,
          top: 100,
          width: 400,
          height: 355,
          opacity: portraitEntry,
          transform: `translate(${currentOffset.x}px, ${currentOffset.y}px) rotate(${currentOffset.rotation}deg) scale(${0.95 + portraitEntry * 0.05})`,
          filter: `blur(${portraitBlur}px)`,
          boxShadow: "0 8px 20px #0008",
        }}
      >
        <div style={{ position: "absolute", inset: 5, overflow: "hidden" }}>
          {portrait}
        </div>
        {borderSrc ? (
          <Img
            src={borderSrc}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
          />
        ) : (
          <OrnateFrame />
        )}
      </div>
      <div
        style={{
          position: "absolute",
          top: 456,
          width: "100%",
          textAlign: "center",
          fontFamily,
          fontSize: 40,
          fontWeight: 400,
          whiteSpace: "nowrap",
          color: "#d7d5ce",
          textShadow: `0 2px 5px #000a, ${titleShake * 13}px 0 3px #d7d5ce66, ${-titleShake * 11}px 1px 3px #d7d5ce55`,
          opacity: titleEntry,
          transform: `translate(${(1 - titleEntry) * -26 + titleShake * Math.sin(frame * 2.4) * 12}px, ${titleShake * Math.cos(frame * 2.1) * 3}px)`,
          filter: `blur(${Math.max(0, (0.5 - time) / 0.12) * 6}px)`,
        }}
      >
        <SoftWords text={title} frame={frame} baseBlur={[2.8, 0.45, 0.45, 0.6, 3]} />
      </div>
      <div
        style={{
          position: "absolute",
          top: 555,
          width: "100%",
          textAlign: "center",
          fontFamily,
          fontSize: 32,
          lineHeight: 1.34,
          fontWeight: 400,
          color: "#d4d2cc",
          textShadow: "0 2px 5px #000a",
          opacity: copyEntry,
        }}
      >
        {copy.map((line, index) => {
          const lineEntry = between(time, 0.47 + index * 0.045, 0.67 + index * 0.045);
          const lineShake = clamp((0.75 + index * 0.045 - time) / 0.25);
          return (
            <div
              key={line}
              style={{
                whiteSpace: "nowrap",
                transform: `translate(${(1 - lineEntry) * (index % 2 ? 35 : -35) + Math.sin(frame * 2.5 + index) * lineShake * 8}px, ${Math.cos(frame * 1.8 + index) * lineShake * 2}px)`,
                filter: `blur(${(1 - lineEntry) * 13 + 1 + lineShake * 1.5}px)`,
              }}
            >
              <SoftWords
                text={line}
                frame={frame}
                baseBlur={index === 2 ? [2.2, 1.5] : [2.2, 0.65, 1.5, 0.55, 2.2]}
              />
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

/** Three distinct title beats at 2.95, 3.53, and 3.73 seconds. */
export const ThreeBeatSerifTitle: React.FC<{
  frame: number;
  fps?: number;
  words?: [string, string, string];
  colors?: [string, string, string];
  fontFamily?: string;
  impactStrength?: number;
}> = ({
  frame,
  fps = 60,
  words = ["BALDUR’S", "GAY", "3"],
  colors = ["#62d2cb", "#d83f60", "#eb4c6b"],
  fontFamily = 'Didot, "Times New Roman", serif',
  impactStrength = 1,
}) => {
  const time = frame / fps;
  const first = between(time, 1 / fps, 0.1);
  const second = between(time, 0.625, 0.665);
  const third = between(time, 0.825, 0.865);
  const firstSize = 135 - 5 * second;
  const firstZoom = 0.72 + between(time, 1 / fps, 0.55) * 0.28;
  const beatFrames = [Math.round(fps / 60), Math.round(fps * 0.625), Math.round(fps * 0.825)];
  const impulse = (start: number) => {
    const age = frame - start;
    return age < 0 || age > 10 ? 0 : Math.pow(1 - age / 10, 2);
  };
  const impacts = beatFrames.map(impulse);
  const impact = Math.max(...impacts);
  const impactX = impacts.reduce(
    (sum, amount, index) => sum + Math.cos((frame - beatFrames[index]) * 2.1) * amount * 8,
    0,
  );
  const impactY = impacts.reduce(
    (sum, amount, index) => sum + Math.sin((frame - beatFrames[index]) * 2.5) * amount * 5,
    0,
  );
  const wordStyle = {
    position: "absolute" as const,
    fontFamily,
    fontWeight: 400,
    lineHeight: 1,
    whiteSpace: "nowrap" as const,
    letterSpacing: -2,
    textShadow: "1px 2px 3px #12071788, 0 5px 13px #0007",
  };
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        transform: `translate(${impactX * impactStrength}px, ${impactY * impactStrength}px) scale(${1 + impact * 0.06 * impactStrength})`,
        transformOrigin: "center center",
        filter: `blur(${impact * 2.8 * impactStrength}px)`,
      }}
    >
      <div
        style={{
          ...wordStyle,
          left: 280 + 38 * second,
          top: 282 - 62 * second,
          fontSize: firstSize,
          color: colors[0],
          transform: `scale(${firstZoom * (1 - 0.06 * second)})`,
          transformOrigin: "left center",
          opacity: first,
        }}
      >
        {words[0]}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            color: colors[1],
            clipPath: `inset(${Math.round(52 + second * 48)}% 0 0 0)`,
          }}
        >
          {words[0]}
        </span>
      </div>
      <div
        style={{
          ...wordStyle,
          left: 495 - 178 * third,
          top: 356 + 20 * third,
          fontSize: 125 + 12 * third,
          color: colors[2],
          opacity: second,
          filter: `blur(${(1 - second) * 8}px)`,
          transform: `scale(${0.75 + 0.25 * second})`,
          transformOrigin: "left center",
        }}
      >
        {words[1]}
      </div>
      <div
        style={{
          ...wordStyle,
          left: 898,
          top: 371,
          fontSize: 108,
          color: colors[2],
          opacity: third,
          filter: `blur(${(1 - third) * 7}px)`,
          transform: `scale(${0.65 + 0.35 * third})`,
          transformOrigin: "left center",
        }}
      >
        {words[2]}
      </div>
    </AbsoluteFill>
  );
};
