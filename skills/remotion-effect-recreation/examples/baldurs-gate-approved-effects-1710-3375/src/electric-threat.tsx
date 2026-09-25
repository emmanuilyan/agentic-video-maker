import { AbsoluteFill, Easing, interpolate } from "remotion";
import { FantasyBackdrop } from "./artwork";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const noise = (seed: number) => {
  const n = Math.sin(seed * 78.233) * 43758.5453;
  return n - Math.floor(n);
};

export const ThreatCard: React.FC<{ frame: number }> = ({ frame }) => {
  const flash = interpolate(frame, [29, 36, 39, 45], [0, 0.86, 1, 0], {
    ...clamp,
    easing: Easing.bezier(0.32, 0, 0.68, 1),
  });
  const punch = interpolate(frame, [41, 67], [1, 1.17], {
    ...clamp,
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  const blur = interpolate(frame, [27, 39, 46, 58, 67], [0, 13, 6, 2, 4], clamp);
  const redPulse = interpolate(frame, [0, 5, 20, 40, 60], [0.48, 0.82, 0.58, 0.88, 0.26], clamp);
  const titleOpacity = interpolate(frame, [0, 5, 56, 67], [0, 1, 1, 0.82], clamp);
  const topGrow = interpolate(frame, [0, 12, 31, 42], [0.52, 0.76, 1.08, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const bottomGrow = interpolate(frame, [4, 17, 36, 46], [0.48, 0.72, 1.06, 1], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#100914" }}>
      <AbsoluteFill style={{ scale: punch, filter: `blur(${blur}px)` }}>
        <FantasyBackdrop scene="battle" frame={frame} />
        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at 22% 43%, rgba(255,53,37,${redPulse}) 0%, rgba(241,34,90,${redPulse * 0.42}) 23%, transparent 48%)`, mixBlendMode: "screen" }} />
        <svg width="100%" height="100%" viewBox="0 0 1280 720" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <filter id="electric-glow" x="-60%" y="-40%" width="220%" height="180%">
              <feGaussianBlur stdDeviation="14" result="blur" />
              <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
            </filter>
            <linearGradient id="electric-line" x1="0" y1="0" x2="1" y2="1">
              <stop stopColor="#efeaff" /><stop offset=".55" stopColor="#a89bff" /><stop offset="1" stopColor="#e6e0ff" />
            </linearGradient>
          </defs>
          <g fill="none" stroke="url(#electric-line)" strokeWidth="9" filter="url(#electric-glow)" opacity="1">
            <path d="M826 0v86l-24 18v117l-35 25v194l-38 27v146h190V452l-28-21V179l-30-27V0" />
            <path d="M722 120h105l22 19h106M725 550h115l26 22h51" strokeWidth="6" opacity=".95" />
            <path d="m701 254 41-28 22 14m194 106-35-24 2-45M767 246l-34-21-5-39m195 222 30 22 20-12m-165 96-27 21 3 34" strokeWidth="6" />
          </g>
          <g fill="#fff" opacity=".88">
            {Array.from({ length: 38 }, (_, i) => {
              const x = noise(i * 7 + 2) * 1280;
              const y = noise(i * 13 + 8) * 720;
              const radius = 1 + noise(i * 5 + 3) * 2.4;
              const pulse = 0.35 + noise(i * 17 + Math.floor(frame / 5)) * 0.65;
              return <circle key={i} cx={x} cy={y} r={radius * pulse} />;
            })}
          </g>
          <g stroke="#d9faff" strokeWidth="2" opacity={interpolate(frame, [0, 5, 20, 40, 58], [0.8, 0.2, 0.7, 0.3, 0], clamp)}>
            {Array.from({ length: 24 }, (_, i) => {
              const x = noise(i * 21) * 1280;
              const y = noise(i * 29 + 5) * 720;
              return <path key={i} d={`M${x} ${y}l${-42 - noise(i) * 56} ${-8 + noise(i * 3) * 16}`} />;
            })}
          </g>
        </svg>
      </AbsoluteFill>

      <AbsoluteFill style={{ background: "radial-gradient(ellipse at 50% 50%, transparent 12%, rgba(9,4,18,.5) 100%)", pointerEvents: "none" }} />
      <AbsoluteFill style={{
        background: "radial-gradient(ellipse at 43% 47%, rgba(255,255,255,.98) 0%, rgba(255,249,255,.84) 18%, rgba(180,164,255,.7) 48%, rgba(67,42,139,.15) 80%, transparent 100%)",
        opacity: flash, mixBlendMode: "screen", pointerEvents: "none",
      }} />
      <div style={{ position: "absolute", inset: 0, opacity: titleOpacity, pointerEvents: "none" }}>
        <ThreatLine text="WE ARE GOING TO" top={31} size={70} width={890} grow={topGrow} strokeWidth={3} />
        <ThreatLine text="BEAT U TO DEATH" top={607} size={61} width={825} grow={bottomGrow} strokeWidth={3.5} />
      </div>
    </AbsoluteFill>
  );
};

const ThreatLine: React.FC<{ text: string; top: number; size: number; width: number; grow: number; strokeWidth: number }> = ({ text, top, size, width, grow, strokeWidth }) => (
  <div style={{
    position: "absolute", top, left: "50%", width, transform: `translateX(-50%) skewX(-7deg) scale(${grow})`, transformOrigin: "center center",
    textAlign: "center", whiteSpace: "nowrap", color: "#c7bbcf",
    fontFamily: "Impact, 'Arial Narrow', sans-serif", fontStyle: "italic", fontWeight: 900,
    fontSize: size, letterSpacing: -1.5, lineHeight: 1,
    WebkitTextStroke: `${strokeWidth}px #54254f`, paintOrder: "stroke fill",
    textShadow: "0 1px 0 #dfa9df, 0 3px 0 #7b477d, 0 6px 0 #342438, 0 10px 0 #1d1622, 0 13px 7px #100a18, 0 0 12px #ca7bd7",
  }}>{text}</div>
);
