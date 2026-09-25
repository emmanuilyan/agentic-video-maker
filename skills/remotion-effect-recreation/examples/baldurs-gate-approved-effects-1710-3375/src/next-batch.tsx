import { AbsoluteFill, Easing, interpolate } from "remotion";
import { FantasyBackdrop } from "./artwork";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

const CastingFigure: React.FC = () => (
  <svg width="450" height="570" viewBox="0 0 450 570" style={{ position: "absolute", left: 415, top: 48 }}>
    <defs><linearGradient id="casting-coat" x2="1" y2="1"><stop stopColor="#bb6650"/><stop offset=".44" stopColor="#712f42"/><stop offset="1" stopColor="#251c33"/></linearGradient></defs>
    <path d="M91 570Q80 406 142 342l80-35 83 28q66 93 58 235Z" fill="url(#casting-coat)" stroke="#d88d69" strokeWidth="7" />
    <path d="m206 316 15 165 30 89h48l-20-167 39 167h47l-36-199-68-61Z" fill="#24243b" stroke="#a45857" strokeWidth="6" />
    <path d="M193 146q-9-98 76-102 88 7 77 118l-9 98q-30 66-78 60-55-6-70-69Z" fill="#c68e70" stroke="#563b39" strokeWidth="8" />
    <path d="M186 152Q152 57 237 19q81-30 120 46l-8 93-41-76-42-12-47 23-30 72Z" fill="#d8d4cb" stroke="#777987" strokeWidth="8" />
    <path d="M217 169h24m54 0h25M267 188q-10 28-4 39h16m-48 32q38 20 76-2" fill="none" stroke="#3a2e34" strokeWidth="7" />
    <path d="M125 369Q35 326 68 205" fill="none" stroke="#7d4250" strokeWidth="42" strokeLinecap="round" />
    <path d="M329 359Q394 292 345 205" fill="none" stroke="#b35e52" strokeWidth="41" strokeLinecap="round" />
    <path d="m344 210 30-79 18 6-13 87" fill="none" stroke="#d9c6b0" strokeWidth="16" strokeLinecap="round" />
    <circle cx="380" cy="126" r="24" fill="#fff5c4" opacity=".92" />
    <circle cx="380" cy="126" r="57" fill="#ffb44a" opacity=".18" />
  </svg>
);

const GameHud: React.FC = () => (
  <>
    <div style={{ position: "absolute", left: 0, bottom: 48, width: 58, display: "grid", gap: 6 }}>
      {Array.from({ length: 5 }, (_, i) => <div key={i} style={{ height: 48, marginLeft: i % 2 ? 9 : 0, background: `linear-gradient(90deg,#282b35,#${["8a544d", "596d91", "77668c", "657c61", "90714f"][i]})`, border: "2px solid #a6a5a0", borderRadius: 5, boxShadow: "0 2px 5px #000" }} />)}
    </div>
    <div style={{ position: "absolute", right: 24, top: 20, width: 94, height: 94, border: "4px solid #a2a8a0", borderRadius: "50%", background: "radial-gradient(circle at 30% 30%,#59644d,#292d28 68%)", boxShadow: "0 0 0 4px #171a1e" }} />
    <div style={{ position: "absolute", bottom: 5, left: 285, width: 710, height: 54, border: "3px solid #464a52", borderRadius: "12px 12px 2px 2px", background: "linear-gradient(#262b31,#101419)", display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
      {Array.from({ length: 14 }, (_, i) => <div key={i} style={{ width: 37, height: 34, border: "2px solid #718387", borderRadius: 5, background: `linear-gradient(140deg,${i % 3 === 0 ? "#60518b" : i % 2 ? "#4b594e" : "#805b4c"},#161a1f)` }} />)}
    </div>
  </>
);

const WavyLetters: React.FC<{
  text: string;
  frame: number;
  amplitude: number;
  fill: string;
  outerStroke: string;
  stroke: string;
  shadow: string;
}> = ({ text, frame, amplitude, fill, outerStroke, stroke, shadow }) => (
  <div style={{ position: "absolute", inset: 0, display: "flex", justifyContent: "center", alignItems: "baseline", whiteSpace: "pre", pointerEvents: "none" }}>
    {Array.from(text).map((char, index) => {
      const glyph = char === " " ? "\u00a0" : char;
      const y = Math.sin(frame * 0.105 - index * 0.68) * amplitude;
      return <span key={`${char}-${index}`} style={{ position: "relative", display: "inline-block", transform: `translateY(${y}px)` }}>
        <span aria-hidden style={{ position: "absolute", inset: 0, color: "transparent", WebkitTextFillColor: "transparent", WebkitTextStroke: outerStroke, paintOrder: "stroke fill" }}>{glyph}</span>
        <span style={{ display: "inline-block", color: fill, WebkitTextFillColor: fill, WebkitTextStroke: stroke, paintOrder: "stroke fill", textShadow: shadow }}>{glyph}</span>
      </span>;
    })}
  </div>
);

export const DndExperienceEffect: React.FC<{ frame: number }> = ({ frame }) => {
  const firstTitle = interpolate(frame, [7, 13, 34, 41], [0, 1, 1, 0], clamp);
  const fullTitle = interpolate(frame, [38, 48, 70, 82], [0, 1, 1, 0], { ...clamp, easing: Easing.bezier(0.16, 1, 0.3, 1) });
  const flash = interpolate(frame, [34, 47, 61], [0, 0.92, 0], clamp);
  return <AbsoluteFill style={{ overflow: "hidden", background: "#151c27" }}>
    <AbsoluteFill style={{ scale: interpolate(frame, [0, 25, 50, 89], [1, 1.02, 1.12, 1.04], clamp), filter: `blur(${interpolate(frame, [26, 35, 48], [0, 8, 0], clamp)}px)` }}>
      <FantasyBackdrop scene="ruins" frame={frame} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 49%,rgba(247,255,255,.78),rgba(119,238,247,.32) 30%,transparent 63%)", opacity: flash }} />
      <CastingFigure />
    </AbsoluteFill>
    <DndTitle text="“THE D&amp;D”" opacity={firstTitle} widthScale={1.2} />
    <DndTitle text="“THE D&amp;D EXPERIENCE”" opacity={fullTitle} widthScale={1.45} />
  </AbsoluteFill>;
};

const DndTitle: React.FC<{ text: string; opacity: number; widthScale: number }> = ({ text, opacity, widthScale }) => (
  <svg width="100%" height="120" viewBox="0 0 1280 120" style={{ position: "absolute", left: 0, bottom: 4, opacity }}>
    <defs>
      <linearGradient id="dnd-title-gradient" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#ffb33b" /><stop offset=".38" stopColor="#ff7b1c" /><stop offset=".7" stopColor="#f83c2b" /><stop offset="1" stopColor="#ec253f" /></linearGradient>
      <filter id="dnd-title-shadow" x="-20%" y="-40%" width="140%" height="200%"><feDropShadow dx="0" dy="4" stdDeviation="2" floodColor="#100b11" floodOpacity=".8" /></filter>
    </defs>
    <text x="640" y="106" textAnchor="middle" textLength={(text.includes("EXPERIENCE") ? 590 : 264) * widthScale} lengthAdjust="spacingAndGlyphs" fontFamily="Impact, 'Arial Narrow', sans-serif" fontSize="82" fontWeight="900" fill="#21171d" stroke="#21171d" strokeWidth="9" paintOrder="stroke fill">{text}</text>
    <text x="640" y="100" textAnchor="middle" textLength={(text.includes("EXPERIENCE") ? 590 : 264) * widthScale} lengthAdjust="spacingAndGlyphs" fontFamily="Impact, 'Arial Narrow', sans-serif" fontSize="82" fontWeight="900" fill="url(#dnd-title-gradient)" stroke="#48231f" strokeWidth="4" paintOrder="stroke fill" filter="url(#dnd-title-shadow)">{text}</text>
  </svg>
);

const Explosion: React.FC<{ frame: number }> = ({ frame }) => {
  const spread = interpolate(frame, [0, 21, 49], [0.22, 1, 1.6], { ...clamp, easing: Easing.out(Easing.cubic) });
  const fade = 1 - interpolate(frame, [40, 65], [0, 1], clamp);
  return <svg width="100%" height="100%" viewBox="0 0 1280 720" style={{ position: "absolute", inset: 0, opacity: fade }}>
    <defs>
      <radialGradient id="fire-core"><stop stopColor="#fffbd5"/><stop offset=".2" stopColor="#fff1a4"/><stop offset=".46" stopColor="#ff9b38"/><stop offset=".78" stopColor="#ef4b19" stopOpacity=".65"/><stop offset="1" stopColor="#d71831" stopOpacity="0"/></radialGradient>
      <filter id="fire-cloud" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="18"/></filter>
    </defs>
    <circle cx="640" cy="338" r={spread*250} fill="url(#fire-core)" opacity=".85" />
    <g filter="url(#fire-cloud)" opacity=".82">
      {Array.from({ length: 22 }, (_, i) => {
        const angle = (Math.PI * 2 * i) / 22;
        const radius = spread * (110 + ((i * 43) % 180));
        const x = 640 + Math.cos(angle) * radius;
        const y = 345 + Math.sin(angle) * radius * 0.66;
        const puff = 24 + ((i * 31) % 68) * spread;
        return <circle key={`cloud-${i}`} cx={x} cy={y} r={puff} fill={i%3===0?"#fff0b3":i%2?"#ff9b39":"#eb4e20"} opacity={.32 + (i%4)*.12} />;
      })}
    </g>
    {Array.from({ length: 34 }, (_, i) => {
      const angle = (Math.PI * 2 * i) / 34;
      const r1 = 35 + ((i*37)%78);
      const r2 = spread*(180 + ((i*59)%290));
      const x1 = 640 + Math.cos(angle)*r1, y1 = 344 + Math.sin(angle)*r1;
      const x2 = 640 + Math.cos(angle)*r2, y2 = 344 + Math.sin(angle)*r2;
      return <path key={i} d={`M${x1} ${y1}L${x2} ${y2}`} stroke={i%4===0?"#fff7cb":"#ff8b2f"} strokeWidth={i%3===0?5:2} opacity={.8} />;
    })}
  </svg>;
};

const ImpactWords: React.FC<{ frame: number }> = ({ frame }) => {
  const top = interpolate(frame, [9, 17, 28], [0, 1, 1], { ...clamp, easing: Easing.out(Easing.back(1.25)) });
  const bottom = interpolate(frame, [16, 25, 34], [0, 1, 1], { ...clamp, easing: Easing.out(Easing.back(1.3)) });
  const style = (opacity: number, topPx: number, size: number): React.CSSProperties => ({ position: "absolute", left: 0, top: topPx, width: "100%", height: size * 1.7, opacity, scale: `${0.72+opacity*.28} ${0.72+opacity*.28}`, translate: `${(1-opacity)*24}px 0`, fontFamily: "Impact, 'Arial Narrow', sans-serif", fontStyle: "italic", fontWeight: 900, fontSize: size, transform: "skewX(-7deg) scaleX(1.1)" });
  return <>
    <div style={style(top, 26, 88)}><WavyLetters text="MY BLOOD IS" frame={frame} amplitude={6} fill="#c5c7ca" outerStroke="6px #b86e32" stroke="4px #28232b" shadow="0 3px 0 #774324,0 7px 0 #201a20,0 12px 0 #111014,0 15px 8px #000e" /></div>
    <div style={style(bottom, 588, 91)}><WavyLetters text="SPICY" frame={frame} amplitude={7} fill="#c5c7ca" outerStroke="6px #b86e32" stroke="4px #28232b" shadow="0 3px 0 #774324,0 7px 0 #201a20,0 12px 0 #111014,0 15px 8px #000e" /></div>
  </>;
};

export const BloodSpicy: React.FC<{ frame: number }> = ({ frame }) => {
  const punch = interpolate(frame, [0, 24, 65], [1, 1.03, 1.16], clamp);
  const blur = interpolate(frame, [0, 8, 18, 49, 65], [0, 12, 5, 0, 3], clamp);
  const flash = interpolate(frame, [7, 17, 23, 36], [0, 0.98, 0.38, 0], clamp);
  return <AbsoluteFill style={{ overflow: "hidden", background: "#101319" }}>
    <AbsoluteFill style={{ scale: punch, filter: `blur(${blur}px)` }}>
      <FantasyBackdrop scene="city" frame={frame} />
      <Explosion frame={frame} />
      <GameHud />
    </AbsoluteFill>
    <AbsoluteFill style={{ background: "#fff8dd", opacity: flash, mixBlendMode: "screen" }} />
    <ImpactWords frame={frame} />
  </AbsoluteFill>;
};

const MemeAvatar: React.FC = () => (
  <svg width="100%" height="100%" viewBox="0 0 520 680" preserveAspectRatio="xMidYMid meet">
    <defs><linearGradient id="robe" x2="1" y2="1"><stop stopColor="#9466ca"/><stop offset="1" stopColor="#49305f"/></linearGradient></defs>
    <path d="M50 680Q66 398 190 360L327 360Q463 419 477 680Z" fill="url(#robe)" stroke="#302846" strokeWidth="12" />
    <path d="M190 371 258 530 332 370 301 354 225 354Z" fill="#f3e7d5" />
    <path d="M185 121Q197 48 279 52 356 55 360 139l-20 150q-35 55-78 51-58-10-71-66Z" fill="#d6a382" stroke="#553a38" strokeWidth="9" />
    <path d="M185 145Q159 60 239 28q99-28 136 70l-12 68-28-54-49-26-50 28-49 71Z" fill="#44342f" />
    <path d="M218 176h25m55 0h25" stroke="#2b2224" strokeWidth="8" />
    <path d="M257 204q-8 30-1 37h17M236 267q34 20 66-1" fill="none" stroke="#754d43" strokeWidth="7" />
    <path d="M373 389q76-115 52-224" fill="none" stroke="#d3a579" strokeWidth="33" strokeLinecap="round" />
    <path d="M426 158v-62m0 52 27-21m-27 14-23-20" fill="none" stroke="#d3a579" strokeWidth="22" strokeLinecap="round" />
    <path d="M92 419Q39 350 26 268" fill="none" stroke="#8a65a0" strokeWidth="36" strokeLinecap="round" />
  </svg>
);

export const MemeScene: React.FC<{ frame: number }> = ({ frame }) => {
  const gameplay = frame >= 27;
  const leftOpacity = 1 - interpolate(frame, [22, 30], [0, 1], clamp);
  return <AbsoluteFill style={{ overflow: "hidden", background: "#24272a" }}>
    <AbsoluteFill style={{ opacity: leftOpacity, background: "linear-gradient(180deg,#b5b7b2 0%,#767e7b 46%,#494c4b 100%)" }}>
      <div style={{ position: "absolute", inset: 0, background: "repeating-linear-gradient(90deg,transparent 0 150px,#262727 152px 158px),linear-gradient(0deg,#1f2525 0 18%,transparent 18%)", opacity: .62 }} />
      <div style={{ position: "absolute", left: 390, top: 18, width: 500, height: 660 }}><MemeAvatar /></div>
    </AbsoluteFill>
    <AbsoluteFill style={{ opacity: gameplay ? 1 : 0 }}><FantasyBackdrop scene="battle" frame={frame} /></AbsoluteFill>
    {gameplay ? <>
      <div style={{ position: "absolute", left: 520, top: 235, width: 235, height: 380, clipPath: "polygon(30% 0,70% 0,100% 100%,0 100%)", background: "linear-gradient(90deg,#1b2436,#8e4b43,#27263a)" }} />
      <div style={{ position: "absolute", left: 600, top: 150, width: 76, height: 92, borderRadius: "48%", background: "#c9aa91", boxShadow: "0 -15px 0 #342f38" }} />
    </> : null}
    <GameHud />
    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg,rgba(0,0,0,.16),transparent 23%,transparent 77%,rgba(0,0,0,.3))" }} />
    <MemeCaption frame={frame} top textA="I MAY BE OUT OF SPELLS" textB="THE PLAYERS DEMAND" />
    <MemeCaption frame={frame} top={undefined} bottom textA="BUT NOT OUTTA SHELLS" textB="A BDSM SCENE" />
  </AbsoluteFill>;
};

const MemeCaption: React.FC<{
  frame: number;
  top?: boolean;
  bottom?: boolean;
  textA: string;
  textB: string;
}> = ({ frame, top, bottom, textA, textB }) => {
  const second = frame >= 105;
  const local = second ? frame - 105 : frame;
  const visible = second ? interpolate(local, [0, 6], [0, 1], clamp) : interpolate(frame, [0, 3, 20, 27], [0, 1, 1, 0], clamp);
  const phrase = second ? textB : textA;
  return <div style={{ position: "absolute", left: 0, top: top ? 16 : undefined, bottom: bottom ? 12 : undefined, width: "100%", height: 112, opacity: visible, scale: `${0.92 + visible*.08} ${0.92+visible*.08}`, transform: "skewX(-4deg)", fontFamily: "Impact, 'Arial Narrow', sans-serif", fontStyle: "italic", fontWeight: 900, fontSize: 78, letterSpacing: 1, lineHeight: 1 }}>
    <WavyLetters text={phrase} frame={frame} amplitude={6} fill="#c8c9cb" outerStroke="8px #111b2a" stroke="4px #263443" shadow="0 3px 0 #aeb3ba,0 6px 0 #1b2533,0 10px 0 #080f18,0 14px 8px #000c" />
  </div>;
};
