import {
  Scene,
  Photo,
  Image,
  Surface,
  Card,
  fill,
  mix,
  move,
  clamp,
  segment,
  noise,
} from "./core";
import { YellowTextHighlight } from "./text-highlight";
export function WhipPan({ f, w, photos, intensity }: Scene) {
  const { i, local } = segment(f, 4),
    next = Math.min(i + 1, 3),
    p = i === next ? 0 : move(local, 27, 44),
    x = p * w;
  return (
    <div
      style={{
        ...fill,
        filter: `blur(${Math.sin(p * Math.PI) * 18 * intensity}px)`,
      }}
    >
      <Surface p={photos[i]} style={{ translate: `${-x}px 0`, scale: 1.035 }} />
      {next !== i && (
        <Surface
          p={photos[next]}
          style={{ translate: `${w - x}px 0`, scale: 1.035 }}
        />
      )}
    </div>
  );
}
export function ZoomThrough({ photos, f, w, h }: Scene) {
  const { i, local } = segment(f, 4),
    next = Math.min(i + 1, 3),
    p = i === next ? 0 : move(local, 20, 44),
    r = p * Math.hypot(w, h) * 0.67;
  return (
    <>
      <Surface p={photos[next]} />
      <div
        style={{
          ...fill,
          maskImage: `radial-gradient(circle at 50% 50%,transparent ${r}px,#000 ${r + 2}px)`,
        }}
      >
        <Surface p={photos[i]} style={{ scale: mix(1, 2.25, p) }} />
      </div>
    </>
  );
}
function Matched({ p, w, h }: { p: Photo; w: number; h: number }) {
  const [ax, ay] = p.anchor ?? [0.5, 0.5],
    scale = (h * 0.36) / (p.width * (p.faceWidth ?? 0.18));
  return (
    <>
      <Surface p={p} style={{ opacity: 0.3 }} />
      <Image
        p={p}
        style={{
          position: "absolute",
          inset: "auto",
          width: p.width * scale,
          height: p.height * scale,
          left: w * 0.5 - ax * p.width * scale,
          top: h * 0.45 - ay * p.height * scale,
          maxWidth: "none",
        }}
      />
    </>
  );
}
export function MatchPosition({ photos, f, w, h, accent }: Scene) {
  const { i } = segment(f, 4);
  return (
    <>
      <Matched p={photos[i]} w={w} h={h} />
      <div
        style={{
          position: "absolute",
          left: w * 0.5 - 8,
          top: h * 0.45 - 8,
          width: 16,
          height: 16,
          border: `1px solid ${accent}`,
          borderRadius: "50%",
          opacity: 0.75,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: w * 0.5 - 40,
          top: h * 0.45,
          width: 80,
          borderTop: `1px solid ${accent}88`,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: w * 0.5,
          top: h * 0.45 - 40,
          height: 80,
          borderLeft: `1px solid ${accent}88`,
        }}
      />
    </>
  );
}
export function FreezeFrame({ photos, f, w, accent }: Scene) {
  const { i, local } = segment(f, 4),
    frozen = local >= 15 && local < 34,
    clock = local < 15 ? local : local < 34 ? 15 : local - 19;
  return (
    <>
      <Surface
        p={photos[i]}
        style={{
          scale: 1 + clock * 0.009,
          translate: `${(clock - 15) * w * 0.005}px 0`,
        }}
      />
      {frozen && (
        <>
          <div
            style={{
              ...fill,
              border: `7px solid ${accent}`,
              boxSizing: "border-box",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 30,
              top: 28,
              padding: "12px 20px",
              background: accent,
              color: "#161811",
              fontSize: 31,
              fontWeight: 850,
              letterSpacing: 2,
            }}
          >
            Ⅱ СТОП-КАДР
          </div>
        </>
      )}
    </>
  );
}
export function CloneTrail({ photos, f, w, h, accent }: Scene) {
  const { i, local } = segment(f, 4),
    cw = w * 0.53,
    ch = h * 0.74;
  return (
    <>
      {[5, 4, 3, 2, 1, 0].map((delay) => {
        const t = clamp((local - delay * 2) / 31),
          x = mix(-cw * 0.7, w * 0.38, move(t, 0, 1));
        return (
          <Card
            key={delay}
            p={photos[i]}
            x={x}
            y={h * 0.12 + Math.sin(t * Math.PI) * -h * 0.05}
            w={cw}
            h={ch}
            rotate={mix(-9, 3, t)}
            opacity={delay === 0 ? 1 : mix(0.09, 0.39, 1 - delay / 6)}
            style={{ outline: delay === 0 ? `2px solid ${accent}` : "none" }}
          />
        );
      })}
    </>
  );
}
export function TextPush({ photos, f, w, h, accent, text }: Scene) {
  const { i, local } = segment(f, 4),
    p = move(local, 8, 25),
    panel = w * 0.42 * p;
  return (
    <>
      <Surface p={photos[i]} style={{ translate: `${-panel * 0.5}px 0` }} />
      <div
        style={{
          position: "absolute",
          left: w - panel,
          top: 0,
          width: w * 0.42,
          height: h,
          background: accent,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: w * 0.35,
            fontSize: Math.min(w * 0.068, h * 0.16),
            fontWeight: 950,
            lineHeight: 1,
            color: "#11140f",
            letterSpacing: -3,
          }}
        >
          {text.split(" ").map((word, j) => (
            <div key={j}>{word}</div>
          ))}
        </div>
      </div>
    </>
  );
}
export function TextReveal({ photos, f, w, h, accent, text }: Scene) {
  const { i, local } = segment(f, 4),
    p = move(local, 5, 26);
  return (
    <>
      <Surface p={photos[i]} />
      <div
        style={{
          ...fill,
          background: "linear-gradient(transparent 25%,#000b 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: w * 0.055,
          right: w * 0.055,
          bottom: h * 0.06,
          height: h * 0.28,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            fontSize: Math.min(
              w * 0.085,
              h * 0.25,
              (w * 0.88) / (text.length * 0.86),
            ),
            lineHeight: 1,
            fontWeight: 950,
            letterSpacing: -3,
            color: accent,
            whiteSpace: "nowrap",
            translate: `0 ${(1 - p) * h * 0.29}px`,
          }}
        >
          {text}
        </div>
      </div>
    </>
  );
}
export function TextHighlight({ photos, f, w, h, accent, text }: Scene) {
  const { i, local } = segment(f, 4);
  const lines = text.split("\n").filter(Boolean);
  const blockWidth = w * 0.64;
  const lineHeight = h * 0.086;
  return (
    <>
      <Surface p={photos[i]} />
      <div style={{ ...fill, background: "#d6dadd", opacity: 0.8 }} />
      <YellowTextHighlight
        lines={lines}
        width={blockWidth}
        lineHeight={lineHeight}
        fontSize={h * 0.064}
        highlightColor={accent}
        startFrame={4}
        staggerFrames={8}
        revealFrames={24}
        frame={local}
        style={{ position: "absolute", left: w * 0.1, top: h * 0.45 }}
        textStyle={{ fontWeight: 600 }}
      />
    </>
  );
}
export function MaskReveal({ photos, f, w, h, accent }: Scene) {
  const { i, local } = segment(f, 4),
    next = Math.min(i + 1, 3),
    p = i === next ? 0 : move(local, 21, 44),
    edge = mix(-25, 125, p);
  return (
    <>
      <Surface p={photos[i]} />
      <Surface
        p={photos[next]}
        style={{
          clipPath: `polygon(0 0, ${edge}% 0, ${edge - 22}% 100%, 0 100%)`,
        }}
      />
      {p > 0 && p < 1 && (
        <div
          style={{
            position: "absolute",
            height: h * 1.4,
            width: 4,
            background: accent,
            left: (w * (edge - 11)) / 100,
            top: -h * 0.2,
            rotate: `${(Math.atan((w * 0.22) / h) * 180) / Math.PI}deg`,
          }}
        />
      )}
    </>
  );
}
export function FlashCut({ photos, f, intensity }: Scene) {
  const { i, local } = segment(f, 4),
    peak = i > 0 ? clamp(1 - local / 5) : 0;
  return (
    <>
      <Surface p={photos[i]} />
      <div
        style={{
          ...fill,
          background: "#fff9e9",
          opacity: peak * Math.min(intensity, 1),
        }}
      />
    </>
  );
}
export function ImpactShake({ photos, f, w, h, intensity, seed }: Scene) {
  const { i, local } = segment(f, 4),
    env = Math.exp(-local / 5.5) * intensity,
    x = (noise(seed, Math.floor(f) * 2) - 0.5) * w * 0.075 * env,
    y = (noise(seed, Math.floor(f) * 2 + 1) - 0.5) * h * 0.11 * env;
  return (
    <Surface
      p={photos[i]}
      style={{
        scale: 1.08 + 0.06 * env,
        translate: `${x}px ${y}px`,
        rotate: `${Math.sin(local * 2.8) * 2.6 * env}deg`,
      }}
    />
  );
}
export function RgbSplit({ photos, f, intensity }: Scene) {
  const { i, local } = segment(f, 4),
    env = Math.max(0, 1 - local / 19),
    d = (16 + Math.sin(local * 1.7) * 6) * env * intensity;
  const matrices = [
    "1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0",
    "0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0",
    "0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0",
  ];
  return (
    <>
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {matrices.map((values, c) => (
            <filter
              key={c}
              id={`photo-rgb-${c}`}
              colorInterpolationFilters="sRGB"
            >
              <feColorMatrix type="matrix" values={values} />
            </filter>
          ))}
        </defs>
      </svg>
      <div style={{ ...fill, isolation: "isolate", background: "#000" }}>
        {[0, 1, 2].map((c) => (
          <Image
            key={c}
            p={photos[i]}
            style={{
              filter: `url(#photo-rgb-${c})`,
              mixBlendMode: "screen",
              translate: `${(c - 1) * d}px ${(1 - c) * d * 0.2}px`,
            }}
          />
        ))}
      </div>
    </>
  );
}
export function PixelDissolve({ photos, f, seed }: Scene) {
  const { i, local } = segment(f, 4),
    next = Math.min(i + 1, 3),
    p = i === next ? 0 : clamp((local - 18) / 26),
    cols = 24,
    rows = 12;
  const rects = Array.from({ length: cols * rows }, (_, k) =>
    noise(seed, k) >= p
      ? `<rect x="${k % cols}" y="${Math.floor(k / cols)}" width="1.02" height="1.02"/>`
      : "",
  ).join("");
  const mask = `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="${cols}" height="${rows}" viewBox="0 0 ${cols} ${rows}"><g fill="black">${rects}</g></svg>`)}")`;
  return (
    <>
      <Surface p={photos[next]} />
      <Surface
        p={photos[i]}
        style={{
          maskImage: mask,
          maskSize: "100% 100%",
          maskRepeat: "no-repeat",
        }}
      />
    </>
  );
}
