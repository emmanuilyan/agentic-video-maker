# Engine and replaceable world

The template source is copied into each project. Read the actual project data before editing; the starter route is an example, not a required layout or duration.

## Data ownership

| File | Responsibility |
| --- | --- |
| `src/data/video.json` | Output metadata, audio, camera/motion settings, theme cues, optional copy |
| `src/data/landings.json` | Ordered contacts: unique ID, absolute frame, world X/Y, platform width |
| `src/data/captions.json` | Measured word tokens in Remotion Caption format |
| `src/data/beats.json` | Semantic story windows, optional photo and selected landing link |
| `src/data/story-assets.json` | Reusable story media paths, crops and credit notes |
| `src/data/skins.json` | Asset paths, source dimensions, foot anchor, platform surface, palette |
| `src/timeline.ts` | Shared timeline exports, precomputed camera, landing audio cues, QA frames |
| `src/engine.ts` | Pure frame-to-pose and camera functions |
| `src/Video.tsx` | Persistent rig, world rendering, parallax, fixed overlays, audio |

The world uses upward-positive Y. A world point appears at `floorScreenY - worldY + cameraY`. One source-pixel anchor gives the hero's foot position; scale and rotate its enclosing rig around that point. The platform SVG origin is above its surface: subtract `surfaceY * displayedWidth / sourceWidth` from the contact Y. Check the visible painted surface, not only its metadata.

For a flight between contacts, after a short launch hold:

`y(u) = fromY + (toY - fromY) * u + 4 * arcHeight * u * (1 - u)`

Horizontal movement uses smoothstep. Arrival is descending only when `toY - fromY < 4 * arcHeight`. Every adjacent contact interval equals `jumpCadenceFrames`; a lively 30-frame cadence at 30 fps is the starter default. Change the configured cadence once for the route instead of varying individual jumps around narration. The final contact leaves a visible settle before the composition ends.

After changing `jumpCadenceFrames`, route lanes or vertical step, run `npm run route`. It rebuilds contacts with stable `step-N` IDs, maps story beats to the nearest contact at their semantic onset and snaps theme changes to contacts. Run it inside a started revision because it intentionally updates `landings.json`, `beats.json` and theme cue frames.

Camera values are computed once for every absolute frame using the running maximum hero height and a smoothing filter. Every render worker then sees identical values even when frames are evaluated out of order. Use no wall-clock time, CSS animation, unseeded random state or playback-dependent physics.

## Extending a story

Add story props through `beats.json` with `id`, `asset`, `startFrame`, `endFrame`, and optional world coordinates. World props share the camera; screen overlays live outside it. Reuse selected landing IDs for phrase events and contact SFX. A prop can be revealed at its spoken onset while filler jumps continue. See [story-beats.md](story-beats.md).

Skin cues can change a whole world at a landing, as the demo does, or select one pack for an entire video. Future platforms take the new skin while existing platforms retain the skin active at their contact frame; this makes an era transition legible during the scroll. Preserve frame-zero hero visibility and verify the exact switch. For multiple hero poses, normalize all poses to the same foot anchor and do not change the collision reference when the bitmap changes.

The default Shorts framing extends the world to the top edge and reserves the bottom for fixed subtitles. `worldTop` and `worldBottom` define the clipped game viewport; optional title, eyebrow and footer copy starts empty. Demo status is recorded in project metadata instead of a visible technical label. Optional decorative grid, height scale and ambience can be removed through the project components; they are not part of the mechanics contract.

## QA

`npm run check` tests constant cadence, contact coordinates and descending approach, monotonic camera, hero action bounds, story ranges, landing links, local asset existence and decodable raster photos. It does not judge actual artwork alpha edges, typography, crop quality, narration intelligibility or artistic timing. `npm run qa` includes representative contacts, skin changes and every story boundary. `npm run review` creates full-timeline sheets plus dense motion strips from the current versioned proxy.
