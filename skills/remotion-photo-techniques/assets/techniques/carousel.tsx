import React from "react";
import { Easing, Img, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { Photo, Scene, clamp, fill } from "./core";

export type CarouselPhoto = Photo & {
  angle: number;
  objectPosition?: string;
  fit?: "cover" | "contain";
};
export type CarouselCamera = {
  angle: number;
  zoom: number;
  focusX: number;
  focusY: number;
};
const limits = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
const progress = (f: number, a: number, b: number) =>
  interpolate(f, [a, b], [0, 1], {
    ...limits, easing: Easing.bezier(.22, .8, .22, 1),
  });

// One local clock for orbit, approach, retreat and final hold.
// Reference coordinates are 1080x1920; reference clock is 0..237.
export function carouselCamera(frame: number, durationInFrames = 238): CarouselCamera {
  const f = clamp(frame / (durationInFrames - 1)) * 237;
  const orbit = interpolate(f, [0, 69], [-.9, 2], {
    ...limits, easing: Easing.bezier(.38, .1, .62, .9),
  });
  const approach = progress(f, 60, 84);
  const retreat = progress(f, 102, 130);
  return {
    angle: orbit + 1.25 * retreat,
    zoom: 1 + 2.4 * approach - (3.4 - 1.42) * retreat,
    focusX: 28 * approach * (1 - retreat),
    focusY: -180 * approach * (1 - retreat),
  };
}

export function projectCarousel(angle: number, radius: number, y: number) {
  const depth = 1300 + radius * (1 - Math.cos(angle));
  const s = 1100 / depth;
  return { x: Math.sin(angle) * radius * s, y: y * s, s, depth };
}

export type CarouselOrbitProps = {
  photos: CarouselPhoto[];
  durationInFrames: number;
  frame?: number;
  width?: number;
  height?: number;
  camera?: CarouselCamera;
  decoration?: React.ReactNode;
  decorationCount?: number;
  borderColor?: string;
  background?: string;
  topShade?: boolean;
};

// Explicit painter ordering: perspective is local to each card, with no shared
// preserve-3d scene or intersecting transparent guide planes.
export function CarouselOrbit({
  photos, durationInFrames, frame, width, height, camera: cameraOverride,
  decoration, decorationCount = 40, borderColor = "#efd6a5",
  background = "radial-gradient(ellipse at 50% 56%,#85673b 0%,#273b2f 46%,#152b25 83%)",
  topShade = true,
}: CarouselOrbitProps) {
  const current = useCurrentFrame(), config = useVideoConfig();
  if (durationInFrames < 2) throw new Error("CarouselOrbit durationInFrames must be at least 2.");
  if (!photos.length) throw new Error("CarouselOrbit requires at least one photo.");
  const local = frame ?? current;
  const f = clamp(local / (durationInFrames - 1)) * 237;
  const camera = cameraOverride ?? carouselCamera(local, durationInFrames);
  const w = width ?? config.width, h = height ?? config.height;
  const viewportScale = Math.min(w / 1080, h / 1920);
  const count = decoration ? Math.max(0, Math.floor(decorationCount)) : 0;
  const firstRingCount = Math.ceil(count / 2);
  const objects = [
    ...photos.map((photo, i) => ({
      kind: "photo" as const, key: `photo-${i}`, angle: photo.angle,
      radius: 1420, y: 0, rotation: 0, photo,
    })),
    ...Array.from({ length: count }, (_, i) => {
      const front = i < firstRingCount;
      const ringCount = front ? firstRingCount : count - firstRingCount;
      const index = front ? i : i - firstRingCount;
      return {
        kind: "decoration" as const, key: `decoration-${i}`,
        angle: index * Math.PI * 2 / ringCount + (front ? .13 : .29),
        radius: front ? 1130 : 1660,
        y: (front ? -610 : 650) + 90 * Math.sin(i * 2.1),
        rotation: ((i * 47) % 95) - 47, photo: undefined,
      };
    }),
  ].map(obj => ({ ...obj, projection: projectCarousel(obj.angle - camera.angle, obj.radius, obj.y) }))
    .sort((a, b) => b.projection.depth - a.projection.depth);
  return <div style={{ ...fill, width: w, height: h, overflow: "hidden", background }}>
    <div style={{ position: "absolute", left: (w - 1080 * viewportScale) / 2,
      top: (h - 1920 * viewportScale) / 2, width: 1080, height: 1920,
      transformOrigin: "0 0", transform: `scale(${viewportScale})` }}>
      <div style={{ position: "absolute", left: 540, top: 1120, transformOrigin: "0 0",
        transform: `scale(${camera.zoom}) translate(${-camera.focusX}px,${-camera.focusY}px)` }}>
        {objects.map((obj, i) => {
          const { x, y, s } = obj.projection;
          const a = obj.angle - camera.angle;
          if (obj.kind === "decoration") return <div key={obj.key} style={{
            position: "absolute", left: x, top: y, width: 0, height: 0, zIndex: i,
            transform: `scale(${s}) rotate(${obj.rotation + Math.sin(a) * 12}deg)`,
            opacity: .55 + .45 * Math.max(0, Math.cos(a)),
          }}>
            <div style={{ position: "absolute", left: -310, top: -181, width: 660,
              height: 495, filter: "drop-shadow(0 15px 13px #0007)" }}>{decoration}</div>
          </div>;
          return <div key={obj.key} data-carousel-photo={obj.photo.src} style={{
            position: "absolute", left: x, top: y, width: 0, height: 0,
            zIndex: i, transform: `scale(${s})`,
          }}>
            <div style={{ position: "absolute", left: -360, top: -470, width: 720,
              height: 940, transform: `perspective(1000px) rotateY(${-Math.sin(a) * 29}deg)`,
              backfaceVisibility: "hidden", border: `8px solid ${borderColor}`,
              boxSizing: "border-box", boxShadow: "0 25px 48px #07130d88",
              background: "#14271f", overflow: "hidden" }}>
              <Img src={obj.photo.src} style={{ width: "100%", height: "100%",
                objectFit: obj.photo.fit ?? "cover", objectPosition: obj.photo.objectPosition ?? "50% 50%" }}/>
            </div>
          </div>;
        })}
      </div>
    </div>
    {topShade && <div style={{ ...fill, pointerEvents: "none", opacity: progress(f, 120, 129),
      background: "linear-gradient(#152b25 0%,#152b25f5 25%,transparent 39%)" }}/>}
  </div>;
}

// Four-photo adapter for the existing demo dispatcher. For arbitrary counts,
// cutouts and camera overrides, import CarouselOrbit directly.
export function CarouselOrbitDemo({ photos, f, w, h, accent }: Scene) {
  return <CarouselOrbit photos={photos.map((photo, i) => ({ ...photo,
    angle: [0, 1, 2, 3.25][i] }))} frame={f} durationInFrames={180}
    width={w} height={h} borderColor={accent}/>;
}
