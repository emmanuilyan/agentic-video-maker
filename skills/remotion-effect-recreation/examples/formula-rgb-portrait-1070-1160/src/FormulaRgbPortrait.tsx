import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";

const formulas = [
  "x+y", "∫f(x)dx", "∑x²", "α/β", "√(a+b)", "∂x", "πr²", "E=mc²", "Δv", "∞",
  "a²+b²", "d/dt", "x−y", "f(x)", "λ=hc", "∇²", "sin θ", "Σn", "a/b", "x→∞",
  "v₀+at", "Δx/Δt", "eⁱπ+1", "a²−4ac", "∮F·dr", "P(A|B)", "θ(t)", "μ±σ",
  "∂²y", "y=mx+b", "x₁+x₂", "h→0", "r=√x", "∇·F", "Σ(i/n)", "f′(x)",
];

export type FormulaRgbPortraitProps = {
  frame: number;
  image: string;
  focusX?: number;
  focusY?: number;
};

/**
 * A brief two-portrait hold, a translucent close-up of the selected face,
 * then a fast push-in with soft horizontal color bands and drifting formulas.
 */
export const FormulaRgbPortrait: React.FC<FormulaRgbPortraitProps> = ({
  frame,
  image,
  focusX = 0.24,
  focusY = 0.28,
}) => {
  const reveal = interpolate(frame, [3, 9, 40, 50, 54], [0, 0.88, 0.92, 0, 0], { extrapolateRight: "clamp" });
  const zoom = interpolate(frame, [8, 18, 54], [1.1, 5.2, 6.1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const focusShiftX = 50 - focusX * 100;
  const crop = `translateX(${focusShiftX}%) scale(${zoom})`;
  const faceOpacity = interpolate(frame, [3, 9, 15], [0, 0.58, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const backgroundOpacity = 1 - interpolate(frame, [8, 15], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  const faceMask = interpolate(frame, [3, 9, 15], [34, 46, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#111827" }}>
      <Img
        src={staticFile(image)}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: backgroundOpacity, filter: `blur(${(1 - backgroundOpacity) * 5}px)` }}
      />
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          <filter id="formula-rgb-red-edge"><feOffset in="SourceGraphic" dx="-4" dy="0" result="shifted" /><feBlend in="SourceGraphic" in2="shifted" mode="difference" result="edges" /><feColorMatrix in="edges" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .38 0" /></filter>
          <filter id="formula-rgb-blue-edge"><feOffset in="SourceGraphic" dx="4" dy="0" result="shifted" /><feBlend in="SourceGraphic" in2="shifted" mode="difference" result="edges" /><feColorMatrix in="edges" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 .38 0" /></filter>
        </defs>
      </svg>
      <Img
        src={staticFile(image)}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
          transform: crop, transformOrigin: `${focusX * 100}% ${focusY * 100}%`,
          filter: "saturate(.82) contrast(1.12)", opacity: faceOpacity,
          clipPath: frame < 15 ? `ellipse(${faceMask}% ${faceMask}% at 50% 48%)` : "none",
        }}
      />
      <Img src={staticFile(image)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: crop, transformOrigin: `${focusX * 100}% ${focusY * 100}%`, filter: "url(#formula-rgb-red-edge)", opacity: reveal * faceOpacity * 0.72, mixBlendMode: "screen" }} />
      <Img src={staticFile(image)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transform: crop, transformOrigin: `${focusX * 100}% ${focusY * 100}%`, filter: "url(#formula-rgb-blue-edge)", opacity: reveal * faceOpacity * 0.75, mixBlendMode: "screen" }} />
      {["#ed2e6b", "#ff7d3d", "#e6db48", "#8bc546", "#3a92d1", "#5941bd"].map((color, index) => (
        <div key={color} style={{ position: "absolute", top: `${index * 14}%`, height: "23%", width: "100%", background: `linear-gradient(180deg, transparent, ${color}88 25%, ${color}a8 72%, transparent)`, mixBlendMode: "color", opacity: reveal * faceOpacity * 0.72 }} />
      ))}
      <AbsoluteFill style={{ opacity: reveal * faceOpacity * 0.16, mixBlendMode: "difference", background: "linear-gradient(90deg,#fb193e 0%,transparent 36%,#00d9ff 100%)", transform: `translateX(${Math.sin(frame / 4) * 13}px)` }} />
      {Array.from({ length: 56 }, (_, index) => {
        const text = formulas[index % formulas.length];
        const x = (index * 137 + Math.floor(index / 4) * 39 + 41) % 1220;
        const y = (index * 79 + Math.floor(index / 6) * 53 + 28) % 670;
        const pulse = 0.16 + Math.abs(Math.sin(frame / 5 + index * 1.7)) * 0.34;
        return (
          <div key={`${text}-${index}`} style={{ position: "absolute", left: x, top: y + Math.sin(frame / 6 + index) * 14, color: ["#eeeade", "#d5d9de", "#fffdf5"][index % 3], opacity: reveal * faceOpacity * pulse, fontSize: [18, 25, 32, 46, 59][index % 5], fontFamily: '"Bradley Hand", "Comic Sans MS", cursive', fontWeight: 400, fontStyle: "italic", textShadow: "0 0 1px #fff5", transform: `rotate(${(index % 2 ? -1 : 1) * (10 + index % 17)}deg) skewX(${(index % 3 - 1) * 4}deg)` }}>{text}</div>
        );
      })}
    </AbsoluteFill>
  );
};
