import { CSSProperties } from "react";
import { Img, interpolate, Easing, random } from "remotion";
import { SPATIAL_IDS } from "./spatial-state";

export type Photo = {
  src: string;
  width: number;
  height: number;
  anchor?: [number, number];
  faceWidth?: number;
};
export const IDS = [
  "PHOTO_GRID",
  "GRID_ZOOM",
  "ROLLING_COLUMNS",
  "CARD_STACK",
  "PHOTO_WALL",
  "COLLAGE_BUILD",
  "WHIP_PAN",
  "ZOOM_THROUGH",
  "MATCH_POSITION",
  "FREEZE_FRAME",
  "CLONE_TRAIL",
  "TEXT_PUSH",
  "TEXT_REVEAL",
  "MASK_REVEAL",
  "FLASH_CUT",
  "IMPACT_SHAKE",
  "RGB_SPLIT",
  "PIXEL_DISSOLVE",
  "PAPER_COLLAGE",
  "PARALLAX",
  "CAMERA_FLYTHROUGH",
  ...SPATIAL_IDS,
] as const;
export type Technique = (typeof IDS)[number];
export type Scene = {
  photos: Photo[];
  f: number;
  w: number;
  h: number;
  accent: string;
  text: string;
  seed: string;
  intensity: number;
};
export const clamp = (v: number, lo = 0, hi = 1) =>
  Math.min(hi, Math.max(lo, v));
export const mix = (a: number, b: number, p: number) => a + (b - a) * p;
export const ease = Easing.bezier(0.22, 1, 0.36, 1);
export const move = (f: number, a: number, b: number, from = 0, to = 1) =>
  interpolate(f, [a, b], [from, to], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: ease,
  });
export const smooth = (f: number, a: number, b: number) => {
  const p = clamp((f - a) / (b - a));
  return p * p * (3 - 2 * p);
};
export const noise = (seed: string, i: number) => random(`${seed}-${i}`);
export const fill: CSSProperties = {
  position: "absolute",
  inset: 0,
  width: "100%",
  height: "100%",
};
export function Image({
  p,
  style,
  fit = "contain",
}: {
  p: Photo;
  style?: CSSProperties;
  fit?: "contain" | "cover";
}) {
  return <Img src={p.src} style={{ ...fill, objectFit: fit, ...style }} />;
}
export function Surface({
  p,
  style,
  backdrop = true,
}: {
  p: Photo;
  style?: CSSProperties;
  backdrop?: boolean;
}) {
  return (
    <div
      style={{ ...fill, overflow: "hidden", background: "#10110f", ...style }}
    >
      {backdrop && (
        <Image
          p={p}
          fit="cover"
          style={{ filter: "blur(22px) brightness(.30)", scale: "1.14" }}
        />
      )}
      <Image p={p} />
    </div>
  );
}
export function Card({
  p,
  x,
  y,
  w,
  h,
  rotate = 0,
  scale = 1,
  opacity = 1,
  paper = false,
  style,
}: {
  p: Photo;
  x: number;
  y: number;
  w: number;
  h: number;
  rotate?: number;
  scale?: number;
  opacity?: number;
  paper?: boolean;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: w,
        height: h,
        rotate: `${rotate}deg`,
        scale,
        opacity,
        background: paper ? "#e8e2d4" : "#141511",
        padding: paper ? 10 : 0,
        boxSizing: "border-box",
        boxShadow: "0 18px 55px #0009",
        ...style,
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <Image p={p} />
      </div>
    </div>
  );
}
export const segment = (f: number, n: number) => {
  const span = 180 / n;
  const i = Math.min(n - 1, Math.floor(f / span));
  return { i, local: f - i * span, span };
};
