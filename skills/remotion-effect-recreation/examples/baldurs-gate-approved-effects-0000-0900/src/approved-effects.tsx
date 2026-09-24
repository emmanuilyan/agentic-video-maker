import type { ReactNode } from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";

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

const ArcText: React.FC<{ text: string; amount?: number }> = ({ text, amount = 1 }) => {
  const chars = Array.from(text);
  const middle = (chars.length - 1) / 2 || 1;
  return (
    <span style={{ display: "inline-block", whiteSpace: "pre" }}>
      {chars.map((char, index) => {
        const offset = (index - middle) / middle;
        return (
          <span
            key={`${char}-${index}`}
            style={{
              display: "inline-block",
              transform: `translateY(${offset * offset * 5 * amount}px) rotate(${offset * 1.5 * amount}deg)`,
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
};

const ArcSoftWords: React.FC<{ text: string; frame: number; baseBlur: number[] }> = ({
  text,
  frame,
  baseBlur,
}) => (
  <span style={{ whiteSpace: "pre" }}>
    {text.split(" ").map((word, index) => (
      <span
        key={`${word}-${index}`}
        style={{
          display: "inline-block",
          marginRight: ".24em",
          filter: `blur(${Math.max(0.08, baseBlur[index % baseBlur.length] * 0.38 + Math.sin(frame / 9 + index * 2) * 0.12)}px)`,
        }}
      >
        <ArcText text={word} amount={1} />
      </span>
    ))}
  </span>
);

const GhostTextLayers: React.FC<{ amount: number; children: ReactNode }> = ({ amount, children }) => (
  <>
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        color: "#d9d6cf",
        opacity: amount * 0.28,
        filter: `blur(${amount * 1.5}px)`,
        transform: `translateX(${amount * 8}px)`,
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        color: "#d9d6cf",
        opacity: amount * 0.16,
        filter: `blur(${amount}px)`,
        transform: `translateX(${amount * -5}px)`,
        pointerEvents: "none",
      }}
    >
      {children}
    </div>
  </>
);

export const PortraitTitleCard: React.FC<{
  frame: number;
  fps?: number;
  heading?: string;
  title?: string;
  copy?: string[];
  borderSrc?: string;
  backgroundContent?: ReactNode;
  portraitContent?: ReactNode;
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
  borderSrc = "",
  backgroundContent,
  portraitContent,
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
  const portraitBlur = Math.min(4, speed * 0.03 + currentOffset.envelope * 0.12);
  const earlyTextGhost = clamp((0.48 - time) / 0.22);
  const titleShake = clamp((0.52 - time) / 0.19) * between(time, 0.33, 0.36);
  const backgroundX = Math.sin(frame / 5) * 4 + Math.sin(frame / 17) * 7;
  const backgroundY = Math.cos(frame / 7) * 3;
  const pullBack = 1.075 - 0.12 * clamp((time - 0.22) / 2.65);

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#10090d" }}>
      <AbsoluteFill
        style={{
          transform: `translate(${backgroundX}px, ${backgroundY}px) scale(1.08)`,
          filter: "blur(7px) brightness(.30) saturate(.72)",
        }}
      >
        {backgroundContent ?? (
          <Img src={staticFile("opening-background.svg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          opacity: 0.34,
          mixBlendMode: "difference",
          filter: "blur(3px) contrast(1.35) saturate(1.7)",
          transform: `translate(${backgroundX - 7}px, ${backgroundY + 2}px) scale(1.045)`,
          pointerEvents: "none",
        }}
      >
        {backgroundContent ?? (
          <Img src={staticFile("opening-background.svg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        )}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: "linear-gradient(90deg, #e61e34aa, transparent 50%, #008d91aa)",
          mixBlendMode: "screen",
          opacity: 0.48,
          pointerEvents: "none",
        }}
      />
      <AbsoluteFill
        style={{
          transform: `scale(${pullBack})`,
          transformOrigin: "50% 47%",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 18,
            width: "100%",
            textAlign: "center",
            fontFamily: 'Didot, "Times New Roman", serif',
            fontSize: 49,
            fontWeight: 400,
            color: "#d8d5ce",
            whiteSpace: "nowrap",
            textShadow: `0 1px 3px #0009, ${earlyTextGhost * 10}px 0 3px #d7d3cebb, ${earlyTextGhost * -8}px 0 2.5px #d7d3ce99`,
            opacity: 0.84,
          filter: `blur(${Math.max(0, 0.35 - time)}px)`,
          }}
        >
          <>
            <GhostTextLayers amount={earlyTextGhost}>
              <ArcSoftWords text={heading} frame={frame} baseBlur={[2.4, 0.55, 1.25, 2.3]} />
            </GhostTextLayers>
            <ArcSoftWords text={heading} frame={frame} baseBlur={[2.4, 0.55, 1.25, 2.3]} />
          </>
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
            boxShadow: "0 8px 20px #0008, -4px 0 #da163c66, 4px 0 #03c8ca66",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: "14px 10px 10px",
              overflow: "hidden",
              transform: `scale(${0.88 + 0.12 * clamp((time - 0.35) / 1.15)})`,
              transformOrigin: "center center",
            }}
          >
            {portraitContent ?? (
              <Img src={staticFile("portrait-motion.svg")} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            )}
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
            fontFamily: 'Didot, "Times New Roman", serif',
            fontSize: 40,
            fontWeight: 400,
            whiteSpace: "nowrap",
            color: "#d7d5ce",
            textShadow: `0 1px 3px #0009, ${earlyTextGhost * 10}px 0 3px #d7d3cebb, ${earlyTextGhost * -8}px 0 2.5px #d7d3ce99`,
            opacity: titleEntry,
            transform: `translate(${(1 - titleEntry) * -26 + titleShake * Math.sin(frame * 2.4) * 12}px, ${titleShake * Math.cos(frame * 2.1) * 3}px)`,
            filter: `blur(${Math.max(0, (0.5 - time) / 0.12) * 1.1 + earlyTextGhost * 0.7}px)`,
          }}
        >
          <>
            <GhostTextLayers amount={earlyTextGhost}>
              <ArcSoftWords text={title} frame={frame} baseBlur={[2.8, 0.45, 0.45, 0.6, 3]} />
            </GhostTextLayers>
            <ArcSoftWords text={title} frame={frame} baseBlur={[2.8, 0.45, 0.45, 0.6, 3]} />
          </>
        </div>
        <div
          style={{
            position: "absolute",
            top: 555,
            width: "100%",
            textAlign: "center",
            fontFamily: 'Didot, "Times New Roman", serif',
            fontSize: 32,
            lineHeight: 1.34,
            fontWeight: 400,
            color: "#d4d2cc",
            textShadow: `0 1px 3px #0009, ${earlyTextGhost * 10}px 0 3px #d7d3cebb, ${earlyTextGhost * -8}px 0 2.5px #d7d3ce99`,
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
                  position: "relative",
                  transform: `translate(${(1 - lineEntry) * (index % 2 ? 35 : -35) + Math.sin(frame * 2.5 + index) * lineShake * 8}px, ${Math.cos(frame * 1.8 + index) * lineShake * 2}px)`,
                  filter: `blur(${(1 - lineEntry) * 8 + 0.25 + lineShake * 0.6}px)`,
                }}
              >
                <>
                  <GhostTextLayers amount={earlyTextGhost}>
                    <ArcSoftWords
                      text={line}
                      frame={frame}
                      baseBlur={index === 2 ? [2.2, 1.5] : [2.2, 0.65, 1.5, 0.55, 2.2]}
                    />
                  </GhostTextLayers>
                  <ArcSoftWords
                    text={line}
                    frame={frame}
                    baseBlur={index === 2 ? [2.2, 1.5] : [2.2, 0.65, 1.5, 0.55, 2.2]}
                  />
                </>
              </div>
            );
          })}
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

/** Three distinct title beats at 2.95, 3.53, and 3.73 seconds. */
export const ThreeBeatSerifTitle: React.FC<{
  frame: number;
  fps?: number;
  words?: [string, string, string];
}> = ({ frame, fps = 60, words = ["BALDUR’S", "GAY", "3"] }) => {
  const time = frame / fps;
  const first = between(time, 1 / fps, 0.1);
  const second = clamp((time - 0.62) / (1 / fps));
  const third = clamp((time - 0.82) / (1 / fps));
  const secondPulse = time < 0.625 ? 0 : Math.exp(-(time - 0.625) / 0.055);
  const firstSize = 135 * (1 - 0.16 * second - 0.26 * secondPulse);
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
    fontFamily: 'Didot, "Times New Roman", serif',
    fontWeight: 400,
    lineHeight: 1,
    whiteSpace: "nowrap" as const,
    letterSpacing: -2,
    WebkitTextStroke: "1.5px #321333",
    textShadow:
      "1px 1px 0 #6de5dd, 2px 2px 0 #21142d, 3px 3px 0 #21142d, 4px 4px 0 #21142d, 5px 5px 0 #120d20, 6px 7px 2px #080710, 0 10px 12px #0009",
    transformStyle: "preserve-3d" as const,
  };
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        transform: `translate(${impactX}px, ${impactY}px) scale(${1 + impact * 0.06})`,
        transformOrigin: "center center",
        filter: `perspective(1000px) blur(${impact * 2.8}px)`,
        perspective: 1000,
        perspectiveOrigin: "50% 42%",
      }}
    >
      <div
        style={{
          ...wordStyle,
          left: 280 + 38 * second,
          top: 282 + 8 * second,
          fontSize: firstSize,
          color: "transparent",
          backgroundImage: "linear-gradient(168deg, #58ddd2 0%, #68d8cf 42%, #e34558 57%, #d72d4e 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transform: `perspective(700px) rotateY(-13deg) rotateX(4deg) rotateZ(-3deg) skewX(-8deg) scale(${firstZoom})`,
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
            color: "#e34258",
            opacity: 0.86,
            clipPath: "inset(0 0 50% 0)",
            transform: "translate(-2px, 1px)",
            WebkitTextFillColor: "#e34258",
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
          color: "#ef253e",
          opacity: second,
          filter: "none",
          textShadow: "1px 1px 0 #ff938b, 2px 2px 0 #351620, 3px 3px 0 #24101a, 4px 5px 4px #08071088",
          transform: `perspective(700px) rotateY(-11deg) rotateX(3deg) rotateZ(-2deg) skewX(-6deg) scale(${0.99 + 0.01 * second})`,
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
          color: "#ef253e",
          opacity: third,
          filter: "none",
          transform: `perspective(700px) rotateY(-13deg) rotateX(4deg) rotateZ(-3deg) skewX(-8deg) scale(${0.98 + 0.02 * third})`,
          transformOrigin: "left center",
        }}
      >
        {words[2]}
      </div>
    </AbsoluteFill>
  );
};
