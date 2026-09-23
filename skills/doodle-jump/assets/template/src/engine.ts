export type Landing = {id: string; frame: number; x: number; y: number; width: number};
export type Motion = {holdFrames: number; arcHeight: number; motionStep: number;
  jumpCadenceFrames: number; durationInFrames: number; cameraDeadzone: number; cameraSmoothing: number};
export type Pose = {x: number; y: number; rotation: number; squash: number; landingIndex: number};
export const clamp = (n: number, a = 0, b = 1) => Math.max(a, Math.min(b, n));
const smooth = (n: number) => n * n * (3 - 2 * n);

// All positions are in world space, Y grows upward. Pose is pure, including out-of-order frames.
export function poseAt(frame: number, landings: Landing[], config: Motion): Pose {
  let i = 0;
  while (i + 1 < landings.length && frame >= landings[i + 1].frame) i++;
  const a = landings[i];
  const b = landings[i + 1];
  const sinceContact = Math.max(0, frame - a.frame);
  if (!b || sinceContact <= config.holdFrames) {
    return {x: a.x, y: a.y, rotation: 0,
      squash: sinceContact < config.holdFrames ? Math.sin(Math.PI * sinceContact / config.holdFrames) : 0,
      landingIndex: i};
  }
  const launch = a.frame + config.holdFrames;
  // Quantization is relative to launch; exact contact frames bypass it above.
  const sampled = launch + Math.floor((frame - launch) / config.motionStep) * config.motionStep;
  const u = clamp((sampled - launch) / (b.frame - launch));
  const direction = Math.sign(b.x - a.x);
  return {x: a.x + (b.x - a.x) * smooth(u),
    y: a.y + (b.y - a.y) * u + 4 * config.arcHeight * u * (1 - u),
    rotation: direction * 7 * Math.sin(Math.PI * u), squash: 0, landingIndex: i};
}

export function buildCamera(landings: Landing[], config: Motion): number[] {
  let camera = 0;
  let peak = 0;
  return Array.from({length: config.durationInFrames}, (_, frame) => {
    peak = Math.max(peak, poseAt(frame, landings, config).y);
    const target = Math.max(0, peak - config.cameraDeadzone);
    camera += (target - camera) * config.cameraSmoothing;
    return camera;
  });
}

export function criticalFrames(landings: Landing[], duration: number): number[] {
  const frames = new Set([0, duration - 1]);
  landings.forEach((landing, i) => {
    [landing.frame - 1, landing.frame, landing.frame + 1].forEach(f => {
      if (f >= 0 && f < duration) frames.add(f);
    });
    if (i) frames.add(Math.round((landings[i - 1].frame + landing.frame) / 2));
  });
  return [...frames].sort((a, b) => a - b);
}
