import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill } from "remotion";

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const outCubic = (value: number) => 1 - Math.pow(1 - clamp(value), 3);
const progress = (frame: number, start: number, length: number) =>
  outCubic((frame - start) / length);

export type FantasyScene = "ruins" | "knight" | "forest" | "battle" | "city";

const sceneColors: Record<FantasyScene, [string, string, string]> = {
  ruins: ["#071a20", "#126f69", "#69edbd"],
  knight: ["#220b2d", "#d84186", "#ffb9d6"],
  forest: ["#102623", "#48765f", "#b8db9a"],
  battle: ["#161126", "#614096", "#e7c6ff"],
  city: ["#261b1d", "#896555", "#f7b47c"],
};

/** Original vector stand-in. Replace with licensed game or live-action footage. */
export const FantasyBackdrop: React.FC<{
  scene: FantasyScene;
  frame: number;
}> = ({ scene, frame }) => {
  const [dark, mid, glow] = sceneColors[scene];
  const drift = Math.sin(frame / 45) * 11;
  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: `radial-gradient(ellipse at 72% 32%, ${mid} 0%, ${dark} 63%, #07080e 100%)`,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: "absolute",
          transform: `translateX(${drift}px) scale(1.03)`,
        }}
      >
        <defs>
          <radialGradient id={`sun-${scene}`}>
            <stop stopColor={glow} stopOpacity=".8" />
            <stop offset="1" stopColor={glow} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`figure-${scene}`} x2="0" y2="1">
            <stop stopColor={glow} stopOpacity=".88" />
            <stop offset=".2" stopColor={mid} />
            <stop offset="1" stopColor="#10101b" />
          </linearGradient>
        </defs>
        <circle cx="905" cy="192" r="300" fill={`url(#sun-${scene})`} />
        <path
          d="M0 520 130 397 209 453 322 322 500 475 655 339 795 483 1030 320 1280 456 1280 720 0 720Z"
          fill="#0d1320"
          opacity=".63"
        />
        <path
          d="M0 603 189 509 388 576 598 474 746 556 943 463 1120 575 1280 505 1280 720 0 720Z"
          fill="#0b0c13"
          opacity=".78"
        />
        {scene === "city" || scene === "ruins" ? (
          <g fill="#11131b" stroke={glow} strokeOpacity=".22" strokeWidth="3">
            <path d="M38 498V291l45-23v230Zm166 0V158l48-21v361Zm93 0V247l39-20v271Zm650 0V204l51-25v319Zm150 0V115l42-17v400Zm93 0V280l42-19v237Z" />
            <path d="M166 169 227 85l60 84ZM1058 125l61-92 60 92Z" />
          </g>
        ) : null}
        {scene === "forest" ? (
          <g stroke="#0c1c1b" strokeWidth="37" fill="none" opacity=".9">
            <path d="M96 720Q270 350 186-20M1190 720Q1041 359 1134-20M360 720Q322 457 449 121" />
            <path
              d="M180 205Q471 42 734 169M1110 194Q840 23 603 151"
              strokeWidth="82"
            />
          </g>
        ) : null}
        {scene === "knight" || scene === "battle" ? (
          <g transform="translate(620 95)">
            <path
              d="M-198 566Q-218 309-148 221L-88 171 83 171 165 229Q231 339 213 566Z"
              fill={`url(#figure-${scene})`}
              stroke={glow}
              strokeOpacity=".45"
              strokeWidth="8"
            />
            <path
              d="M-99 197Q-132 89-56 34L70 39Q132 107 93 196Z"
              fill="#292332"
              stroke={glow}
              strokeWidth="7"
            />
            <path
              d="M-79 62-139-28l69 33M78 64 152-34 91 9"
              fill="none"
              stroke={glow}
              strokeWidth="15"
              strokeLinecap="round"
            />
            <path
              d="M-136 263-21 376 126 255M-70 204 0 477 72 204"
              fill="none"
              stroke={glow}
              strokeOpacity=".54"
              strokeWidth="10"
            />
            <path d="M-49 129h26m71 0h26" stroke={glow} strokeWidth="7" />
          </g>
        ) : null}
        {scene === "battle" ? (
          <g stroke={glow} strokeWidth="5" opacity=".6">
            <path d="M75 700 440 120M1050 700 850 77M258 620 1010 300" />
            <circle
              cx="928"
              cy="389"
              r="87"
              fill={`url(#sun-${scene})`}
              stroke="none"
            />
          </g>
        ) : null}
      </svg>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(0deg, rgba(4,4,8,.72), transparent 45%, rgba(0,0,0,.13))",
        }}
      />
    </AbsoluteFill>
  );
};

export const Portrait: React.FC<{ tint?: string }> = ({ tint = "#b8d4d8" }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 300 325"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="portrait-background" x2=".85" y2="1">
        <stop stopColor="#8ba9af" />
        <stop offset="1" stopColor="#151b2c" />
      </linearGradient>
      <linearGradient id="portrait-cloak" x2="1" y2="1">
        <stop stopColor="#91355e" />
        <stop offset="1" stopColor="#241c38" />
      </linearGradient>
    </defs>
    <rect width="300" height="325" fill="url(#portrait-background)" />
    <circle cx="219" cy="60" r="86" fill={tint} opacity=".22" />
    <path
      d="M-20 325Q1 241 109 230L169 230Q292 239 321 325Z"
      fill="url(#portrait-cloak)"
      stroke="#ddc79c"
      strokeWidth="6"
    />
    <path d="M119 210h67v66l-33 26-34-26Z" fill="#b6a9a4" />
    <path
      d="M81 91q-12-67 76-74 77 7 65 82l-12 105q-25 43-59 47-40-3-61-48Z"
      fill="#c8c5bd"
      stroke="#6b6873"
      strokeWidth="4"
    />
    <path
      d="M88 119 54 102 89 146M214 119l33-18-34 45"
      fill="#c8c5bd"
      stroke="#6b6873"
      strokeWidth="4"
    />
    <path
      d="M87 120Q76 25 159 13q74 5 63 110-21-48-61-58-36 30-74 55Z"
      fill="#e9e8e0"
      stroke="#939da2"
      strokeWidth="5"
    />
    <path
      d="M109 154q20-8 35 1m25 0q18-9 33 1"
      stroke="#272838"
      strokeWidth="6"
      fill="none"
    />
    <path
      d="M150 156q-9 34-2 41h15"
      stroke="#847d80"
      strokeWidth="4"
      fill="none"
    />
    <path
      d="M131 215q25 10 51-2"
      stroke="#7d676a"
      strokeWidth="4"
      fill="none"
    />
  </svg>
);

/** Portrait insert and staggered serif copy over a color-washed moving shot. */
export const WarningCard: React.FC<{
  frame: number;
  portrait?: ReactNode;
  heading?: string;
  title?: string;
  copy?: string;
}> = ({
  frame,
  portrait = <Portrait />,
  heading = "THIS VIDEO SPOILS THE",
  title = "ENTIRE FANTASY ADVENTURE",
  copy = "A fast journey through spells, strange heroes, and impossible choices.",
}) => {
  const entry = progress(frame, 6, 15);
  return (
    <AbsoluteFill style={{ background: "rgba(6,2,9,.32)" }}>
      <AbsoluteFill
        style={{
          background: `radial-gradient(ellipse at 24% 46%, rgba(214,22,61,${0.44 + Math.sin(frame / 20) * 0.16}), transparent 53%), radial-gradient(ellipse at 73% 47%, rgba(9,214,190,.29), transparent 50%)`,
          mixBlendMode: "screen",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 59,
          width: "100%",
          textAlign: "center",
          fontFamily: "Georgia, serif",
          fontSize: 49,
          color: "#e1ded7",
          letterSpacing: 2,
          textShadow: "0 3px 12px #000",
        }}
      >
        {heading}
      </div>
      <div
        style={{
          position: "absolute",
          left: 485,
          top: 144,
          width: 310,
          height: 315,
          border: "8px ridge #473227",
          boxShadow: "0 0 0 3px #141219, 0 20px 35px #000a",
          transform: `scale(${0.88 + entry * 0.12})`,
          opacity: entry,
          overflow: "hidden",
        }}
      >
        {portrait}
      </div>
      <div
        style={{
          position: "absolute",
          top: 485,
          width: "100%",
          textAlign: "center",
          fontFamily: "Georgia, serif",
          fontSize: 46,
          color: "#f2eee7",
          textShadow: "0 3px 10px #000",
          opacity: progress(frame, 13, 11),
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: "absolute",
          left: 230,
          top: 565,
          width: 820,
          textAlign: "center",
          fontFamily: "Georgia, serif",
          fontSize: 31,
          lineHeight: 1.18,
          color: "#e3ded5",
          textShadow: "0 3px 9px #000",
          opacity: progress(frame, 22, 13),
        }}
      >
        {copy}
      </div>
    </AbsoluteFill>
  );
};

/** Oversized red/cyan serif lines appear one after another over live footage. */
export const StackedSerifTitle: React.FC<{
  frame: number;
  lines: string[];
}> = ({ frame, lines }) => (
  <div
    style={{
      position: "absolute",
      left: 0,
      top: 300,
      width: "100%",
      display: "flex",
      alignItems: "center",
      flexDirection: "column",
      fontFamily: "Georgia, serif",
      fontSize: 98,
      lineHeight: 0.9,
      letterSpacing: -3,
      textAlign: "center",
    }}
  >
    {lines.map((line, index) => {
      const amount = progress(frame, [6, 18, 25][index] ?? 25 + index * 8, 7);
      return (
        <div
          key={`${line}-${index}`}
          style={{
            color: index % 2 === 0 ? "#65d8c9" : "#d7426a",
            textShadow: "3px 4px 2px #180719, 0 9px 20px #000a",
            transform: `translateY(${(1 - amount) * 17}px) scale(${0.85 + amount * 0.15})`,
            opacity: amount,
          }}
        >
          {line}
        </div>
      );
    })}
  </div>
);

const boldCaption: CSSProperties = {
  fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
  fontStyle: "italic",
  fontWeight: 900,
  letterSpacing: 1,
  WebkitTextStroke: "2px #25132a",
  textShadow: "4px 5px 0 #211123, 0 0 14px #0009",
};

/** A short pop caption that stays on screen through a hard cut. */
export const ImpactCaption: React.FC<{
  frame: number;
  text: string;
  start?: number;
  left?: number;
  top?: number;
  color?: string;
}> = ({ frame, text, start = 0, left = 120, top = 575, color = "#f8df68" }) => {
  const amount = progress(frame, start, 5);
  return (
    <div
      style={{
        ...boldCaption,
        position: "absolute",
        left,
        top,
        color,
        fontSize: 70,
        transform: `skewX(-6deg) scale(${0.65 + amount * 0.35})`,
        transformOrigin: "left center",
        opacity: amount,
      }}
    >
      {text}
    </div>
  );
};

/** A poster/image insert inside game UI plus a gradient nameplate. */
export const MemeInsertCard: React.FC<{
  frame: number;
  label: string;
  poster?: ReactNode;
}> = ({ frame, label, poster }) => {
  const amount = progress(frame, 0, 7);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 110,
          top: 68,
          width: 360,
          height: 454,
          background: "#d9dcdf",
          border: "11px solid #211e28",
          boxShadow: "0 0 0 3px #89706a, 14px 19px 25px #000b",
          overflow: "hidden",
          transform: `translateX(${(1 - amount) * -100}px) rotate(${-2 + (1 - amount) * -5}deg)`,
        }}
      >
        {poster ?? (
          <div
            style={{
              height: "100%",
              padding: 20,
              boxSizing: "border-box",
              background: "linear-gradient(160deg,#f3f1e8,#a4c1b9)",
              textAlign: "center",
              fontFamily: "Impact, sans-serif",
              color: "#172328",
            }}
          >
            <div style={{ fontSize: 41, lineHeight: 1.05 }}>
              THE ONLY MAP
              <br />I TRUST
            </div>
            <div
              style={{
                height: 222,
                margin: "13px auto",
                borderRadius: "50%",
                background:
                  "radial-gradient(circle,#73908d,#314b51 55%,#1d2a34 56%)",
              }}
            />
            <div style={{ fontSize: 31, lineHeight: 1.05 }}>
              IS THE ONE
              <br />I DREW
            </div>
          </div>
        )}
      </div>
      <div
        style={{
          ...boldCaption,
          position: "absolute",
          left: 365,
          top: 521,
          fontSize: 86,
          color: "#e7deea",
          WebkitTextStroke: "2px #442046",
          background: "linear-gradient(90deg,#6b1a4c,#a83d6e 65%,transparent)",
          padding: "5px 32px 9px",
          transform: `translateY(${(1 - amount) * 45}px) skewX(-7deg)`,
          opacity: amount,
        }}
      >
        {label}
      </div>
    </AbsoluteFill>
  );
};

/** Small square reaction image that appears over a character close-up. */
export const PictureInPicture: React.FC<{
  frame: number;
  image?: ReactNode;
}> = ({ frame, image }) => {
  const amount = progress(frame, 0, 5);
  return (
    <div
      style={{
        position: "absolute",
        left: 148,
        top: 129,
        width: 212,
        height: 220,
        border: "5px ridge #29392f",
        background: "#151d24",
        boxShadow: "0 0 0 2px #a1ae9a, 4px 7px 13px #0009",
        overflow: "hidden",
        opacity: amount,
        transform: `scale(${0.8 + amount * 0.2})`,
      }}
    >
      {image ?? (
        <div
          style={{
            width: "100%",
            height: "100%",
            filter: "hue-rotate(225deg) saturate(2.5)",
          }}
        >
          <Portrait tint="#b65cf5" />
        </div>
      )}
    </div>
  );
};

/** Thin white serif title and its growing underline over changing shots. */
export const UnderlinedSerifTitle: React.FC<{
  frame: number;
  text: string;
}> = ({ frame, text }) => {
  const amount = progress(frame, 0, 10);
  return (
    <div
      style={{
        position: "absolute",
        top: 456,
        left: 0,
        width: "100%",
        textAlign: "center",
        color: "#faf7f1",
        fontFamily: "Georgia, serif",
        fontSize: 75,
        textShadow: "0 2px 6px #000, 0 5px 18px #000",
        opacity: amount,
      }}
    >
      {text}
      <div
        style={{
          width: `${amount * 62}%`,
          height: 3,
          margin: "-1px auto 0",
          background: "#f8f7f2",
          boxShadow: "0 2px 8px #000",
        }}
      />
    </div>
  );
};

/** Deterministic block corruption and RGB bars, with readable text after 0.2s. */
export const GlitchIntertitle: React.FC<{
  frame: number;
  top: string;
  bottom: string;
  children?: ReactNode;
}> = ({ frame, top, bottom, children }) => {
  const bars = Array.from({ length: 86 }, (_, index) => {
    const seed = (index * 73 + Math.floor(frame / 2) * 19) % 97;
    const height = 18 + ((index * 37 + seed * 11) % 160);
    return {
      left: `${(index * 41) % 100}%`,
      top: `${28 + ((index * 17) % 56)}%`,
      width: `${0.3 + ((index * 13) % 16) / 10}%`,
      height,
      background: ["#e0f8f4", "#e390d2", "#54d4bd", "#7676a6"][index % 4],
      opacity: frame < 8 ? 0.5 : 0.72,
    } satisfies CSSProperties;
  });
  return (
    <AbsoluteFill style={{ background: "#131218", overflow: "hidden" }}>
      {children}
      <div
        style={{
          ...boldCaption,
          position: "absolute",
          top: 51,
          width: "100%",
          textAlign: "center",
          color: "#d9f7f2",
          fontSize: 66,
          textShadow: "5px 0 #c955a8,-5px 0 #4ecbb8,0 6px #16121e",
          opacity: progress(frame, 6, 5),
        }}
      >
        {top}
      </div>
      {bars.map((style, index) => (
        <div key={index} style={{ position: "absolute", ...style }} />
      ))}
      <div
        style={{
          ...boldCaption,
          position: "absolute",
          top: 566,
          width: "100%",
          textAlign: "center",
          color: "#ebcde7",
          fontSize: 55,
          textShadow: "5px 0 #c955a8,-5px 0 #4ecbb8,0 6px #16121e",
          opacity: progress(frame, 12, 5),
        }}
      >
        {bottom}
      </div>
    </AbsoluteFill>
  );
};

/** Upper and lower lyric-like captions with a magenta extruded shadow. */
export const TwoLineCaption: React.FC<{
  frame: number;
  top: string;
  bottom: string;
}> = ({ frame, top, bottom }) => {
  const amount = progress(frame, 0, 5);
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {[
        { text: top, y: 32 },
        { text: bottom, y: 609 },
      ].map(({ text, y }, index) => (
        <div
          key={index}
          style={{
            ...boldCaption,
            position: "absolute",
            top: y,
            left: 0,
            width: "100%",
            textAlign: "center",
            fontSize: 58,
            color: "#eee4ef",
            WebkitTextStroke: "2px #6c2a6e",
            textShadow: "3px 5px 0 #893a89, 6px 8px 2px #211027",
            opacity: index ? progress(frame, 9, 5) : amount,
          }}
        >
          {text}
        </div>
      ))}
    </AbsoluteFill>
  );
};

/** Rough black vertical gate and torn top/bottom edges. */
export const InkFrame: React.FC = () => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1280 720"
      preserveAspectRatio="none"
    >
      <path
        d="M0 0H1280V20l-80-7-35 11-50-8-24 12-68-11-45 8-74-11-36 12-64-9-47 9-54-11-38 13-48-7-65 9-49-12-37 12-55-10-51 9-47-8-33 9-37-7-42 8-41-4V0ZM0 720V696l43 7 58-8 38 11 51-8 66 10 45-12 71 8 52-12 42 8 58-11 54 9 47-10 64 11 44-9 48 13 52-11 67 10 45-8 47 10 53-10 43 10 40-8 44 8V720Z"
        fill="#040508"
      />
      <path
        d="M0 0h33l-9 124 17 72-12 121 12 100-16 156 14 147H0ZM1280 0h-37l11 109-19 80 20 108-20 130 16 131-14 162h43Z"
        fill="#040508"
      />
    </svg>
  </AbsoluteFill>
);

/** Short digital smear or white impact flash on an editorial cut. */
export const FlashZoom: React.FC<{
  frame: number;
  children: ReactNode;
  start?: number;
  strength?: number;
}> = ({ frame, children, start = 0, strength = 1 }) => {
  const age = frame - start;
  const amount =
    age >= 0 && age < 11 ? Math.pow(1 - age / 11, 2) * strength : 0;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill
        style={{
          transform: `scale(${1 + amount * 0.23})`,
          filter: `blur(${amount * 13}px) saturate(${1 + amount * 0.85})`,
        }}
      >
        {children}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background: `rgba(255,246,238,${Math.min(0.9, amount * 0.84)})`,
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
      {amount > 0.15 ? (
        <AbsoluteFill
          style={{
            boxShadow: `inset ${amount * 17}px 0 0 #e7376288, inset ${-amount * 17}px 0 0 #38e2e088`,
            pointerEvents: "none",
          }}
        />
      ) : null}
    </AbsoluteFill>
  );
};

/** Comic-gold text at opposite edges of an explosion shot. */
export const OrangeImpactTitle: React.FC<{
  frame: number;
  top: string;
  bottom: string;
}> = ({ frame, top, bottom }) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    {[
      { text: top, y: 27 },
      { text: bottom, y: 615 },
    ].map(({ text, y }, index) => {
      const amount = progress(frame, index * 6, 5);
      return (
        <div
          key={index}
          style={{
            ...boldCaption,
            position: "absolute",
            top: y,
            left: 0,
            width: "100%",
            textAlign: "center",
            fontSize: 67,
            color: "#f2d6a8",
            WebkitTextStroke: "2px #8f5029",
            textShadow:
              "0 2px 0 #fff6da, 4px 5px 0 #9c4339, 7px 8px 8px #1d1014",
            transform: `scale(${0.78 + 0.22 * amount}) skewX(-6deg)`,
            opacity: amount,
          }}
        >
          {text}
        </div>
      );
    })}
  </AbsoluteFill>
);

/** Single orange lower third, carried across one or more action shots. */
export const GradientLowerThird: React.FC<{ frame: number; text: string }> = ({
  frame,
  text,
}) => {
  const amount = progress(frame, 0, 5);
  return (
    <div
      style={{
        ...boldCaption,
        position: "absolute",
        top: 564,
        width: "100%",
        textAlign: "center",
        color: "#f4c88c",
        fontSize: 90,
        WebkitTextStroke: "2px #6f3b27",
        textShadow: "0 2px 0 #fff1c9, 4px 6px 0 #d75b45, 7px 10px 9px #000",
        transform: `scale(${0.76 + amount * 0.24}) skewX(-5deg)`,
        opacity: amount,
      }}
    >
      {text}
    </div>
  );
};

/** Semi-transparent equation graphics composited over an existing close-up. */
export const MathOverlay: React.FC<{ frame: number }> = ({ frame }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      mixBlendMode: "screen",
      opacity: progress(frame, 0, 7) * 0.62,
      background: "linear-gradient(90deg,#392c86aa,#8b4a42aa,#325778aa)",
    }}
  >
    {["∫x²dx", "Σ(n+1)", "x−2", "πr²", "√(a+b)", "f(x)", "∂/∂t", "A=½bh"].map(
      (formula, index) => (
        <div
          key={formula}
          style={{
            position: "absolute",
            left: 45 + ((index * 157) % 1080),
            top: 80 + ((index * 109) % 510),
            color: index % 2 ? "#d9b6ff" : "#92f9da",
            fontFamily: "Georgia, serif",
            fontSize: 42 + (index % 3) * 13,
            transform: `rotate(${(index % 2 ? -1 : 1) * 13}deg) translateY(${Math.sin(frame / 12 + index) * 9}px)`,
          }}
        >
          {formula}
        </div>
      ),
    )}
  </AbsoluteFill>
);
