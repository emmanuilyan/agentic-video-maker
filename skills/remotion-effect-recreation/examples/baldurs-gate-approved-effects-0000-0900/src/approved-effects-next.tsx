import { AbsoluteFill, Img, staticFile } from "remotion";

/** Static purple reaction insert, framed like the source's upper-left video tile. */
export const ReactionWindow: React.FC<{
  frame: number;
  fps?: number;
  startFrame?: number;
}> = ({ frame, fps = 60, startFrame = 0 }) => {
  const age = (frame - startFrame) / fps;
  const zoom = Math.max(0, Math.min(1, age / 0.35));
  const scale = 0.59 + 1.23 * (1 - Math.pow(1 - zoom, 3));
  return (
    <div
      style={{
        position: "absolute",
        left: 145,
        top: 130,
        width: 215,
        height: 215,
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        filter: `blur(${(1 - zoom) * 3.5}px)`,
        opacity: frame < startFrame ? 0 : 1,
      }}
    >
      <Img
        src={staticFile("reaction-tile.svg")}
        style={{ width: "100%", height: "100%", objectFit: "fill" }}
      />
    </div>
  );
};

/** Static impact word with a lower cast shadow and a short hard extrusion. */
export const KobeImpactCaption: React.FC<{
  frame: number;
  fps?: number;
  text?: string;
  startFrame?: number;
}> = ({ frame, text = "KOBE", startFrame = 0 }) => {
  const visible = frame >= startFrame;
  const age = Math.max(0, frame - startFrame);
  const enter = Math.min(1, age / 9);
  const scale = 0.62 + 0.38 * (1 - Math.pow(1 - enter, 3));
  const blur = (1 - enter) * 2.2;
  return (
    <>
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 650,
          top: 516,
          color: "#32291f",
          fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
          fontStyle: "italic",
          fontWeight: 900,
          fontSize: 114,
          letterSpacing: 0,
          lineHeight: 0.9,
          WebkitTextStroke: "0",
          textShadow: "none",
          transform: `translateX(-50%) translate(18px, 20px) skewX(-1deg) scale(${scale * 1.48}, ${scale * 0.9})`,
          transformOrigin: "center center",
          filter: `blur(${11 + blur}px)`,
          opacity: visible ? 0.95 * Math.min(1, scale) : 0,
          whiteSpace: "nowrap",
        }}
      >
        {text}
      </div>
      <div
        style={{
          position: "absolute",
          left: 646,
          top: 516,
          color: "#f5d93d",
          fontFamily: "Impact, 'Arial Narrow', Arial, sans-serif",
          fontStyle: "italic",
          fontWeight: 900,
          fontSize: 114,
          letterSpacing: 0,
          lineHeight: 0.9,
          WebkitTextStroke: "3px #17151a",
          paintOrder: "stroke fill",
          textShadow:
            "0 -1px 1px #fffbd0, 1px 1px 0 #fff199, 2px 3px 0 #b37527, 4px 6px 0 #513118, 5px 8px 5px #17100cbb, 10px 14px 11px #000a, 0 18px 18px #0007",
          backgroundImage: "linear-gradient(180deg, #fffbb1 0%, #fff17a 24%, #ffe64d 48%, #f6d93c 68%, #ffe978 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          transform: `translateX(-50%) skewX(-1deg) scale(${scale * 1.36}, ${scale * 0.82})`,
          transformOrigin: "center center",
          filter: `blur(${blur}px) drop-shadow(13px 17px 10px rgba(55, 38, 24, 0.9))`,
          opacity: visible ? 1 : 0,
          whiteSpace: "nowrap",
        }}
      >
        {text}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            color: "#fff8bd",
            WebkitTextFillColor: "#fff8bd",
            WebkitTextStroke: "0.5px #fffde1",
            clipPath: "inset(0 0 76% 0)",
            transform: "translate(-1px, -1px)",
            pointerEvents: "none",
          }}
        >
          {text}
        </span>
      </div>
    </>
  );
};

export const ActionSteps: React.FC = () => (
  <AbsoluteFill style={{ background: "linear-gradient(90deg,#111925,#23354a 66%,#101923)", overflow: "hidden" }}>
    <svg width="100%" height="100%" viewBox="0 0 1280 720" preserveAspectRatio="none">
      <path d="M0 220H820V270H0ZM0 312H930V362H0ZM0 405H1000V455H0ZM0 500H1120V550H0ZM0 600H1280V650H0Z" fill="#080e18" stroke="#334251" strokeWidth="3" />
      <path d="M698 0h210v350H698z" fill="#7ab9d0" opacity=".13" />
      <path d="M180 720 438 230l75 5-90 485z" fill="#496276" opacity=".25" />
      <ellipse cx="640" cy="700" rx="510" ry="70" fill="#080d14" opacity=".8" />
    </svg>
  </AbsoluteFill>
);
