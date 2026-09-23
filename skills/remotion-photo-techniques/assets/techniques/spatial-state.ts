export const SPATIAL_IDS = [
  "SLALOM_FLYTHROUGH",
  "ORBIT_GALLERY",
  "PHOTO_TUNNEL",
  "SPIRAL_FLIGHT",
  "DEPTH_DIVE",
  "FROZEN_ORBIT",
  "EXPLODED_PHOTO",
  "PORTAL_ROOMS",
] as const;
export type SpatialId = (typeof SPATIAL_IDS)[number];
export type Vec3 = [number, number, number];
export type CameraState = {
  position: Vec3;
  target: Vec3;
  roll: number;
  up?: Vec3;
  fov: number;
};
const clamp = (v: number) => Math.min(1, Math.max(0, v));
export const step = (v: number, a: number, b: number) => {
  const p = clamp((v - a) / (b - a));
  return p * p * (3 - 2 * p);
};
export const frozenClock = (f: number) =>
  f < 42 ? step(f, 0, 42) : f <= 130 ? 1 : 1 + ((f - 130) / 49) * 0.65;
export const explodeProgress = (local: number) => step(local, 8, 43);
export const portalOpening = (distance: number) => step(12 - distance, 0, 8);
export function cameraFor(id: SpatialId, f: number): CameraState {
  const t = clamp(f / 179);
  switch (id) {
    case "SLALOM_FLYTHROUGH": {
      const z = 12 - 35 * t,
        x = Math.sin(t * Math.PI * 3.7) * 0.95;
      return {
        position: [x, 0.3 + Math.sin(t * 5) * 0.35, z],
        target: [Math.sin((t + 0.12) * Math.PI * 3.7) * 1.8, 0.2, z - 7],
        roll: Math.sin(t * Math.PI * 3.7) * 0.075,
        fov: 58,
      };
    }
    case "ORBIT_GALLERY": {
      const a = 0.28 + t * Math.PI * 2;
      return {
        position: [
          Math.sin(a) * 11.4,
          2.1 + Math.sin(a * 2) * 0.4,
          Math.cos(a) * 11.4,
        ],
        target: [0, 0.15, 0],
        roll: 0,
        fov: 52,
      };
    }
    case "PHOTO_TUNNEL": {
      const z = 8 - 56 * (0.12 * t + 0.88 * t * t);
      return {
        position: [Math.sin(t * 5) * 0.24, Math.sin(t * 7) * 0.2, z],
        target: [0, 0, z - 14],
        roll: Math.sin(t * 6) * 0.035,
        fov: 70,
      };
    }
    case "SPIRAL_FLIGHT": {
      const a = -0.4 + t * 6,
        y = -1 + t * 14;
      return {
        position: [Math.sin(a) * 10.3, y + 1.2, Math.cos(a) * 10.3],
        target: [0, y, 0],
        roll: Math.sin(t * Math.PI) * -0.11,
        fov: 58,
      };
    }
    case "DEPTH_DIVE": {
      const y = 12 - 31 * step(f, 0, 155);
      return {
        position: [Math.sin(t * 6) * 0.5, y, 0],
        target: [0, y - 10, 0],
        up: [0, 0, -1],
        roll: 0.1 + t * Math.PI * 0.42,
        fov: 65,
      };
    }
    case "FROZEN_ORBIT": {
      const a = -0.16 + step(f, 43, 130) * 1.1;
      return {
        position: [Math.sin(a) * 15, 1.4, Math.cos(a) * 15],
        target: [0, 0, 0],
        roll: 0,
        fov: 50,
      };
    }
    case "EXPLODED_PHOTO": {
      const p = explodeProgress(f % 45),
        z = 11 - 12 * p;
      return {
        position: [Math.sin(p * Math.PI) * 1.5, Math.sin(p * Math.PI) * 0.3, z],
        target: [0, 0, z - 11],
        roll: Math.sin(p * Math.PI) * 0.1,
        fov: 52,
      };
    }
    case "PORTAL_ROOMS": {
      const z = 14 - 40 * step(f, 0, 152);
      return {
        position: [Math.sin(t * Math.PI * 3) * 0.45, 0, z],
        target: [0, 0, z - 12],
        roll: Math.sin(t * Math.PI * 2) * 0.025,
        fov: 62,
      };
    }
  }
}
