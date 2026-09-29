import React from "react";
import {AbsoluteFill, Easing, Img, interpolate, OffthreadVideo, Sequence, staticFile, useCurrentFrame} from "remotion";

export type ComparisonId = "mosaic" | "crt" | "logo" | "neon";
type Props = {id: ComparisonId; name: string; frames: number; source: string; clean: string; cleanIsVideo?: boolean; sourceRange: string};
const clamp = {extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const};
const panelStyle: React.CSSProperties = {position: "absolute", top: 0, width: 1280, height: 720, overflow: "hidden"};

const PanelTag: React.FC<{text: string; right?: boolean}> = ({text, right}) => (
  <div style={{position: "absolute", zIndex: 50, top: 18, left: right ? undefined : 18, right: right ? 18 : undefined, padding: "10px 16px", background: "rgba(0,0,0,.76)", border: "1px solid rgba(255,255,255,.4)", color: "white", fontFamily: "Arial, sans-serif", fontSize: 21, fontWeight: 700, letterSpacing: 2}}>
    {text}
  </div>
);

const MosaicEffect: React.FC<{frame: number; duration: number}> = ({frame, duration}) => {
  const scale = interpolate(frame, [25, 33, 70, 95], [0.82, 0.88, 1.05, 1.05], {...clamp, easing: Easing.out(Easing.cubic)});
  const enter = interpolate(frame, [24, 33], [0, 1], clamp);
  const reveal = interpolate(frame, [72, 80, 85, 90, 95], [0.35, 0.6, 0.8, 0.9, 1], clamp);
  const cardExit = 1 - interpolate(frame, [90, 95], [0, 1], clamp);
  const backgroundDim = interpolate(frame, [24, 33, 72, 85, 95], [0, 0.38, 0.18, 0, 0], clamp);
  // Keep the poster art consistent with the source: repeated close face crops,
  // each revealed on its own beat while the red data plates are already present.
  const images = ["assets/mosaic-5.jpg", "assets/mosaic-6.jpg", "assets/mosaic-5.jpg", "assets/mosaic-6.jpg", "assets/mosaic-5.jpg", "assets/mosaic-6.jpg", "assets/mosaic-6.jpg", "assets/mosaic-5.jpg", "assets/mosaic-6.jpg", "assets/mosaic-5.jpg", "assets/mosaic-6.jpg", "assets/mosaic-5.jpg"];
  const cardStarts = [48, 25, 25, 61, 41, 25, 50, 25, 55, 25, 25, 48];
  const titleStarts = interpolate(frame, [25, 33], [0.32, 1], clamp);
  const fullTitle = interpolate(frame, [32, 33], [0, 1], clamp);
  return (
    <AbsoluteFill style={{overflow: "hidden", background: "#050608"}}>
      <OffthreadVideo src={staticFile("01_red-mosaic.mp4")} muted startFrom={0} endAt={duration} style={{position: "absolute", inset: 0, width: 1280, height: 720, objectFit: "cover"}}/>
      <div style={{position: "absolute", inset: 0, background: "rgba(0,0,0,.38)", opacity: backgroundDim}}/>
      <div style={{position: "absolute", inset: 0, width: 1280, height: 720, transform: `scale(${scale})`, opacity: enter, transformOrigin: "center center"}}>
        {[0, 1].map((row) => <div key={row} style={{position: "absolute", left: -130, top: row === 0 ? 0 : 440, width: 1540, height: 278, display: "grid", gridTemplateColumns: "repeat(6, 1fr)", gap: 18, opacity: cardExit}}>
          {Array.from({length: 6}, (_, index) => (
            <div key={index} style={{position: "relative", overflow: "hidden", background: "#090b11"}}>
              <Img src={staticFile(images[index + row * 6])} style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: `${35 + (index * 8) % 35}% ${28 + (index * 7) % 34}%`, opacity: interpolate(frame, [cardStarts[index + row * 6] - 1, cardStarts[index + row * 6] + 6], [0, 1], clamp), filter: "contrast(1.05) saturate(1.06) brightness(1.55)"}}/>
              <div style={{position: "absolute", left: 0, right: 0, top: row === 0 ? 62 : 88, height: 58, display: "flex", alignItems: "stretch", boxSizing: "border-box", opacity: interpolate(frame, [25, 33], [0.35, 1], clamp), background: "rgba(5,5,8,.96)", border: "2px solid #ff1727", boxShadow: "0 0 4px 2px rgba(255,18,35,.92), 0 0 15px rgba(255,18,35,.82)", color: "#ff303a", fontFamily: "monospace", letterSpacing: .4}}>
                <div style={{width: 46, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", borderRight: "2px solid #ff1727", fontSize: 23, fontWeight: 700, textShadow: "0 0 6px #ff2939"}}>{String(index + 1 + row * 6).padStart(2, "0")}</div>
                <div style={{display: "grid", gridTemplateRows: "repeat(5, 1fr)", alignContent: "center", padding: "2px 8px", fontSize: 8, lineHeight: 1, fontWeight: 600, whiteSpace: "nowrap", textShadow: "0 0 4px rgba(255,30,45,.65)"}}>
                  <span>{index % 2 ? "TACTICAL DATABASE // RECORD" : "COMBAT DATA // CLASSIFIED"}</span>
                  <span>SUBJECT FILE: {String(index + 1 + row * 6).padStart(2, "0")}  STATUS: ACTIVE</span>
                  <span>FIELD UNIT // NEURAL LINK: ONLINE</span>
                  <span>THREAT LEVEL: HIGH  //  ACCESS GRANTED</span>
                  <span>MISSION ARCHIVE  /  TOKYO SECTOR</span>
                </div>
              </div>
            </div>
          ))}
        </div>)}
        {frame >= 25 && <>
          <div style={{position: "absolute", top: 292, left: 0, right: 0, height: 148, background: "rgba(0,0,0,.9)", opacity: 1 - reveal}}/>
          <div style={{position: "absolute", top: 292, left: 0, right: 0, height: 148, display: "flex", alignItems: "center", justifyContent: "center", color: "#ff191f", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 91, fontWeight: 900, letterSpacing: 0, whiteSpace: "nowrap", opacity: titleStarts * (1 - fullTitle) * cardExit}}>THE</div>
          <div style={{position: "absolute", top: 292, left: 0, right: 0, height: 148, display: "flex", alignItems: "center", justifyContent: "center", color: "#ff191f", fontFamily: "Arial, Helvetica, sans-serif", fontSize: 91, fontWeight: 900, letterSpacing: 0, whiteSpace: "nowrap", opacity: titleStarts * fullTitle * cardExit}}>THE ILLUMINAUGHTY</div>
        </>}
      </div>
    </AbsoluteFill>
  );
};

const CrtEffect: React.FC<{frame: number; duration: number}> = ({frame, duration}) => {
  const size = frame < 20 ? 0.56 : frame < 27 ? 0.78 : frame < 28 ? 0.89 : 1;
  const windowWidth = 628 * size;
  const windowHeight = 720 * size;
  const titleLeft = interpolate(frame, [26, 27, 28, 29, 30, 31], [windowWidth, 350, 500, 580, 630, 668], clamp);
  const titleClipLeft = interpolate(frame, [26, 27, 28, 29, 30, 31], [0, 230, 180, 80, 25, 0], clamp);
  const titleOpacity = interpolate(frame, [25, 26, 63, 64, 65], [0, 1, 1, 1, 0], clamp);
  const titleText = frame === 26 ? "ERIOUS, RAIDEN?" : "WHY SO SERIOUS, RAIDEN?";
  const titleLength = frame === 26 ? 500 : 800;
  const titleFill = frame === 26 ? "url(#crt-texture-first)" : "url(#crt-texture)";
  const titleFilter = frame === 26 ? "drop-shadow(0 0 2px rgba(80,190,90,.18))" : "drop-shadow(0 0 4px rgba(80,255,110,.35))";
  const titleFrameOpacity = frame === 26 ? 0.76 : 1;
  const auxiliaries = interpolate(frame, [14, 15], [0, 1], clamp) * (frame < 65 ? 1 : 0);
  const portraitFilter = frame < 28
    ? "blur(2.2px) grayscale(.64) sepia(.7) hue-rotate(57deg) saturate(1.85) contrast(1.32) brightness(.9)"
    : "grayscale(.72) sepia(.46) hue-rotate(292deg) saturate(1.45) contrast(1.12)";
  const signalBands = [
    {top: 12, bottom: 24, offset: -8, blur: 4.5, brightness: 1.5, contrast: .76},
    {top: 32, bottom: 44, offset: 7, blur: 5.5, brightness: .48, contrast: 1.18},
    {top: 54, bottom: 67, offset: -6, blur: 4, brightness: 1.38, contrast: .8},
    {top: 76, bottom: 85, offset: 9, blur: 5, brightness: .52, contrast: 1.15},
  ];
  return (
    <AbsoluteFill style={{background: "#000", color: "#75d37d"}}>
      {frame < 15 && <Sequence from={0} durationInFrames={15}><OffthreadVideo src={staticFile("02_crt-scanline.mp4")} muted startFrom={0} style={{width: 1280, height: 720, objectFit: "cover"}}/></Sequence>}
      {frame >= 15 && frame < 65 && <div style={{position: "absolute", left: 0, top: 0, width: windowWidth, height: windowHeight, overflow: "hidden", background: "#020805", zIndex: 2}}>
        <Img src={staticFile("assets/clean-face-crop.jpg")} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%", transform: "scale(1.18)", filter: portraitFilter}}/>
        {signalBands.map((band) => <Img key={band.top} src={staticFile("assets/clean-face-crop.jpg")} style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%", transform: `scale(1.18) translateY(${band.offset}px)`, clipPath: `inset(${band.top}% 0 ${100 - band.bottom}% 0)`, filter: `${portraitFilter} brightness(${band.brightness}) contrast(${band.contrast}) blur(${band.blur}px)`, opacity: .94}}/>)}
        <div style={{position: "absolute", inset: 0, background: "linear-gradient(0deg,transparent 0 13%,rgba(184,255,190,.2) 13% 15%,transparent 15% 31%,rgba(0,8,2,.38) 31% 34%,transparent 34% 61%,rgba(175,255,181,.16) 61% 65%,transparent 65% 82%,rgba(0,0,0,.42) 82% 85%,transparent 85%),repeating-linear-gradient(0deg,rgba(0,0,0,.42) 0 8px,rgba(178,255,181,.13) 8px 13px,rgba(0,0,0,.14) 13px 17px,transparent 17px 23px)"}}/>
        <div style={{position: "absolute", inset: 0, boxShadow: "inset 0 0 52px #001906"}}/>
      </div>}
      {frame >= 15 && frame < 65 && <div style={{position: "absolute", left: 928, top: 15, width: 352, height: 392, overflow: "hidden", opacity: auxiliaries, filter: "saturate(.82) contrast(1.08) sepia(.16)", zIndex: 3}}>
        <Img src={staticFile("assets/clean-face-crop.jpg")} style={{width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 35%"}}/>
        <div style={{position: "absolute", inset: 0, background: "repeating-linear-gradient(0deg,rgba(0,0,0,.08) 0 .45px,transparent .45px 1.3px)"}}/>
      </div>}
      {frame >= 15 && frame < 65 && <div style={{position: "absolute", left: 436, top: 96, width: 400, height: 274, opacity: auxiliaries, zIndex: 1}}>
        {[384, 384, 138, 118, 98, 78, 72, 72, 72, 72, 72].map((width, index) => <div key={index} style={{position: "absolute", left: 0, top: index < 2 ? index * 32 : 62 + (index - 2) * 24, width, height: index < 2 ? 24 : 16, clipPath: index >= 2 && index < 6 ? "polygon(0 0,100% 0,82% 100%,0 100%)" : undefined, background: index < 2 ? "#303235" : index < 5 ? "#414346" : index < 8 ? "#7b807d" : "#e8eee9"}}/>)}
      </div>}
      {frame >= 26 && frame < 65 && <svg viewBox="0 0 850 76" style={{position: "absolute", left: titleLeft, top: 477, width: 850, height: 76, overflow: "visible", transform: "scaleX(.75)", transformOrigin: "left center", opacity: titleOpacity * titleFrameOpacity, zIndex: 1, filter: titleFilter}}>
        <defs><clipPath id="crt-title-reveal"><rect x={titleClipLeft} y="0" width={850 - titleClipLeft} height="76"/></clipPath></defs>
        <defs>
          <pattern id="crt-texture" patternUnits="userSpaceOnUse" width="4" height="3"><rect width="4" height="3" fill="#a0eea6"/><path d="M0 1.6H4" stroke="#5d9f67" strokeWidth=".55" opacity=".5"/></pattern>
          <pattern id="crt-texture-first" patternUnits="userSpaceOnUse" width="7" height="5"><rect width="7" height="5" fill="#526f56"/><path d="M0 .8H3M4 .8H7M0 2.3H7M2 3.7H7" stroke="#263e2a" strokeWidth=".7" opacity=".78"/><path d="M0 4.6H2" stroke="#a0b69d" strokeWidth=".4" opacity=".25"/></pattern>
        </defs>
        <text clipPath="url(#crt-title-reveal)" x="0" y="68" textLength={titleLength} lengthAdjust="spacingAndGlyphs" fontFamily="Avenir Next Condensed Medium, DIN Condensed, Arial Narrow, sans-serif" fontSize="76" fontWeight="500" letterSpacing="3.5" fill={titleFill} stroke={frame === 26 ? "#344c37" : "#6fcf7a"} strokeWidth=".2">{titleText}</text>
      </svg>}
      {frame >= 65 && <Sequence from={65} durationInFrames={duration - 65}><OffthreadVideo src={staticFile("02_crt-scanline.mp4")} muted startFrom={65} style={{position: "absolute", inset: 0, width: 1280, height: 720, objectFit: "cover"}}/></Sequence>}
    </AbsoluteFill>
  );
};

const SplitLogoEffect: React.FC<{frame: number; duration: number}> = ({frame, duration}) => {
  const metal = frame < 3 ? "logo-pedal.png" : "logo-metal.png";
  const gear = frame < 17 ? "" : frame < 24 ? "logo-gere.png" : "logo-gear.png";
  const rising = frame < 31 ? "" : frame < 38 ? "logo-raising.png" : "logo-rising.png";
  const revengeance = frame < 60 ? "" : frame < 66 ? "logo-red-60-v2.png" : frame < 80 ? "logo-red-73-v2.png" : frame < 86 ? "logo-red-83-v2.png" : frame < 110 ? "logo-revengeance-v2.png" : "";
  const redWidths: Record<string, number> = {"logo-red-60-v2.png": 200, "logo-red-73-v2.png": 480, "logo-red-83-v2.png": 1020, "logo-revengeance-v2.png": 1030};
  const redWidth = redWidths[revengeance] ?? 1020;
  const transition = interpolate(frame, [109, 110], [0, 1], clamp);
  const backgroundScale = interpolate(frame, [0, 109], [1.035, 1.095], {...clamp, easing: Easing.inOut(Easing.quad)});
  const backgroundX = interpolate(frame, [0, 109], [0, -20], clamp);
  const backgroundY = interpolate(frame, [0, 109], [0, -8], clamp);
  const word = (asset: string, style: React.CSSProperties) => <Img src={staticFile(`assets/${asset}`)} style={{position: "absolute", objectFit: "contain", filter: "drop-shadow(2px 3px 1px rgba(0,0,0,.7))", opacity: 1 - transition, ...style}}/>;
  return (
    <AbsoluteFill style={{background: "#111", overflow: "hidden"}}>
      <Img src={staticFile("assets/clean-logo-bg-v2.png")} style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: `translate(${backgroundX}px, ${backgroundY}px) scale(${backgroundScale})`, transformOrigin: "center center", opacity: 1 - transition}}/>
      <Img src={staticFile("assets/clean-action.jpg")} style={{position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: transition}}/>
      <div style={{position: "absolute", inset: 0, background: "rgba(20,7,0,.08)"}}/>
      {word(metal, {left: 28, top: 128, width: 444, height: 132})}
      {gear && word(gear, {left: 500, top: 128, width: 420, height: 174})}
      {rising && word(rising, {left: 928, top: 128, width: 306, height: 132})}
      {revengeance && word(revengeance, {left: (1280 - redWidth) / 2, top: 350, width: redWidth, height: 190})}
    </AbsoluteFill>
  );
};

const NeonEffect: React.FC<{frame: number; duration: number}> = ({frame}) => {
  const startScale = interpolate(frame, [0, 44], [1.02, 1.055], {...clamp, easing: Easing.inOut(Easing.quad)});
  const actionScale = interpolate(frame, [45, 89], [1.02, 1.07], {...clamp, easing: Easing.inOut(Easing.quad)});
  const startX = interpolate(frame, [0, 44], [0, -12], clamp);
  const actionX = interpolate(frame, [45, 89], [0, -18], clamp);
  return (
    <AbsoluteFill style={{overflow: "hidden", background: "#080d10"}}>
      <OffthreadVideo src={staticFile("04_neon-sync.mp4")} muted startFrom={0} endAt={90} style={{position: "absolute", inset: 0, width: 1280, height: 720, objectFit: "cover", transform: `scale(${frame < 45 ? startScale : actionScale}) translateX(${frame < 45 ? startX : actionX}px)`, transformOrigin: "center center"}}/>
    </AbsoluteFill>
  );
};

export const Comparison: React.FC<Props> = ({id, source, clean, cleanIsVideo, sourceRange, frames}) => {
  const frame = useCurrentFrame();
  const duration = frames;
  const backdrop = cleanIsVideo ? (
    <AbsoluteFill style={{overflow: "hidden"}}>
      <Sequence from={0} durationInFrames={frames}><OffthreadVideo src={staticFile(clean)} muted startFrom={0} endAt={frames} style={{position: "absolute", inset: 0, width: 1280, height: 720, objectFit: "cover"}}/></Sequence>
    </AbsoluteFill>
  ) : <Img src={staticFile(clean)} style={{width: 1280, height: 720, objectFit: "cover"}}/>;
  const effect = id === "mosaic" ? <MosaicEffect frame={frame} duration={duration}/> : id === "crt" ? <CrtEffect frame={frame} duration={duration}/> : id === "logo" ? <SplitLogoEffect frame={frame} duration={duration}/> : <NeonEffect frame={frame} duration={duration}/>;
  return (
    <AbsoluteFill style={{background: "black", display: "flex", flexDirection: "row"}}>
      <div style={{...panelStyle, left: 0}}>
        <OffthreadVideo src={staticFile(source)} muted startFrom={0} endAt={duration} style={{width: 1280, height: 720, objectFit: "cover"}}/>
        <PanelTag text={`ORIGINAL · ${sourceRange}`}/>
      </div>
      <div style={{...panelStyle, left: 1280}}>
        {id !== "neon" && backdrop}
        {effect}
        {id === "logo" && frame >= 110 && <Sequence from={110} durationInFrames={frames - 110}><OffthreadVideo src={staticFile(source)} muted startFrom={110} style={{position: "absolute", inset: 0, width: 1280, height: 720, objectFit: "cover"}}/></Sequence>}
        <PanelTag text="REMOTION · ВАРИАНТ" right/>
      </div>
      <div style={{position: "absolute", left: 1278, top: 0, width: 4, height: 720, background: "white", zIndex: 100, opacity: .8}}/>
    </AbsoluteFill>
  );
};
