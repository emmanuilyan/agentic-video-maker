# Remotion Architecture And Patterns

## Project Shape

Use a small layered structure:

```text
src/
  index.tsx
  Video.tsx
  timeline.ts
  scenes/
  video/
    Paint95Frame.tsx
    PersistentSubject.tsx
    Background.tsx
    Captions.tsx
    SoundEffects.tsx
    effects.tsx
    utils.ts
public/
  assets/
  sfx/
  captions.json
```

`Video.tsx` should mount narration and SFX once, then render the Paint frame. Inside the canvas, mount a story camera, the persistent subject, and a `Series` of scene overlays. Captions remain outside the story camera so zooms never move or scale them.

## Central Timeline

Avoid scattering raw frame numbers across components. Use named cues and derive scene-local offsets where needed:

```ts
export const FPS = 24;
export const sec = (value: number) => Math.round(value * FPS);

export const cue = {
  matchEnter: sec(0.0),
  matchContact: sec(0.92),
  flameOn: sec(0.92),
  matchGone: sec(1.92),
  pin1Release: sec(11.58),
  pin1Impact: sec(12.75),
} as const;

if (cue.flameOn !== cue.matchContact) {
  throw new Error("Ignition must coincide with match contact");
}
```

Use one cue for all representations of the same event:

```tsx
<FallingPin impactFrame={cue.pin1Impact} />
<ImpactBurst start={cue.pin1Impact} />
<Cue at={cue.pin1Impact} src="sfx/metal-drop.wav" />
```

## Deterministic Stop-Motion Helpers

```ts
import {Easing, interpolate} from "remotion";

export const clamp = (value: number, min = 0, max = 1) =>
  Math.max(min, Math.min(max, value));

export const holdOnTwos = (frame: number) => Math.floor(frame / 2) * 2;

export const seeded = (index: number, salt: number) => {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
};

export const stepJitter = (step: number, salt: number, amount: number) =>
  (seeded(step, salt) - 0.5) * amount;

export const steppedEase = (
  frame: number,
  input: [number, number],
  output: [number, number],
  steps: number,
) => {
  const value = interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.bezier(0.16, 1, 0.3, 1),
  });
  return Math.round(value * steps) / steps;
};
```

Use stable salts per property. Never call `Math.random()` during rendering.

## Painted Reveal Contract

A reusable reveal should accept `left`, `top`, `width`, `height`, `inStart`, `inEnd`, optional exit frames, and `rows`. Its behavior:

1. brush approaches from outside the box;
2. each row reveals with an irregular leading edge;
3. every row sweeps left-to-right with the same brush orientation;
4. content is rendered in one stable coordinate space inside each masked strip;
5. exit scales the whole content toward its center and fades only near the end.

Do not mount a fresh child with different coordinates for each strip. Repeat the same child at the inverse strip offset so rows align without seams.

## Persistent Burn Geometry

Define subject geometry once: holder box, candle body, centerline, burnable height, tray Y, wick offset, and flame offset. Compute all dependent positions from `burnProgress`:

```ts
const hiddenHeight = bodyHeight * clamp(burnProgress, 0, 0.92);
const burnLine = bodyTop + hiddenHeight;
const wickY = burnLine - wickOffset;
const flameY = burnLine - flameOffset;
```

Render a clipped candle image below `burnLine`, a small irregular melt edge at the line, then wick and flame anchored to that same value. This prevents the detached top defect.

## Falling Object Contract

Represent fall as two phases: `fall` from `0..1` and `settle` after contact. Use gravity for Y, a shaped lateral arc for X, and independent rotation:

```ts
const gravity = fall * fall;
const y = startY + (landingY - startY) * gravity;
const x = interpolate(fall, [0, 0.42, 0.76, 1], [startX, sideX, arcX, landingX]);
const rotation = interpolate(fall, [0, 0.35, 0.72, 1], [0, 14, 68, restAngle]);
```

After contact, use 3-5 stepped bounce poses with decreasing X, Y, and rotation. Assign landing coordinates and rest angles from explicit per-object arrays so repeated falls never stack at one point.

## Camera Beats

Store camera beats as data with `start`, `inEnd`, `outStart`, `end`, `scale`, and `origin`. Quantize the zoom and return to scale `1` outside each beat. Mount this camera around canvas content only; subtitle and Paint chrome are not children.

## Captions

Load caption JSON with `delayRender()` and `continueRender()`, and cancel on fetch failure. Select the active caption using exact `frame / fps * 1000`; do not quantize caption timing to stop-motion frames. The active-word highlight may use continuous time while object motion remains stepped.

Store caption persistence in data. For `until-next`, set every `endMs` to the next caption's `startMs` and the last caption to the composition boundary. Keep the renderer simple so `caption_timeline.py` audits the same intervals the viewer sees.

Use a stable subtitle box and dynamic font sizing based on measured or estimated line length. Always inspect the longest caption at mobile resolution.

## Paint Cursor And Selections

Keep UI interaction frames in the central timeline: `cursorStart`, `toolClick`, `canvasClick`, `result`, and `cursorEnd`. Drive the pressed tool state, pressed cursor pose, SFX, and result from those shared cues.

Physical cutouts use the stop-motion helpers above. A UI cursor may instead evaluate a cubic Bézier path continuously at each render frame. Give the cursor explicit control points and a post-click hold; do not encode its lifecycle as offsets from JSX mount time.

Represent Paint selections as typed data rather than an unlabelled rectangle:

```ts
type PaintSelection =
  | {kind: "lasso"; path: string}
  | {kind: "magic-wand"; path: string}
  | {kind: "transform"; left: number; top: number; width: number; height: number};
```

The transform renderer has eight handles. Freehand and magic-wand paths use coordinates from the rendered canvas crop, not the original asset.

## Sound Effects

Use a generic component:

```tsx
const Cue = ({at, duration, src, volume}: CueProps) => (
  <Sequence from={at} durationInFrames={duration} layout="none">
    <Audio src={staticFile(src)} volume={volume} />
  </Sequence>
);
```

Import timing constants. Keep every cue finite so dead air or a long source tail does not occupy the rest of the composition.

## Final Composition

Use `H.264 + AAC`, `1080x1920`, square pixels, and 24 fps. Extend `durationInFrames` for any post-narration gag. Confirm the last frame intentionally holds content rather than exposing an empty scene or cutting mid-click.
