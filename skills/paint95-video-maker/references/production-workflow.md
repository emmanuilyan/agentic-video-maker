# One-Pass Production Workflow

## 1. Discover Inputs

Inspect the workspace and the exact user-named files. On macOS, Downloads may contain visually similar Cyrillic names; use shell quoting and `find` or `rg --files`, then probe the candidates instead of assuming.

```bash
python3 "$HOME/.codex/skills/paint95-video-maker/scripts/media_inventory.py" \
  ~/Downloads ./public --max-items 80
```

Record duration, dimensions, fps, sample rate, and stream type. For a new narration, copy it into `public/` under a stable ASCII project filename, but retain the user's original file.

When replacing an existing narration:

```bash
python3 "$HOME/.codex/skills/paint95-video-maker/scripts/narration_diff.py" \
  public/old-narration.mp4 ~/Downloads/new-narration.mp4 --summary
```

Use the reported duration and silence-boundary deltas to identify where captions and late visual cues diverge. Do not shift the whole timeline when only the latter portion changed.

## 2. Research Missing Visuals

For a new script or incomplete asset set, follow [asset-research.md](asset-research.md) before implementation. Produce the coverage table, download the selected originals under `public/assets/research/`, and create `manifest.json` plus `SOURCES.md`. Probe downloaded media before preparing cutouts.

Do not download every search result. Keep two or three viable candidates for an uncertain hero asset and one selected original for ordinary supporting props.

## 3. Establish The Timing Backbone

Use 24 fps unless the existing project says otherwise. Define:

```ts
export const FPS = 24;
export const sec = (seconds: number) => Math.round(seconds * FPS);

export const cue = {
  ignitionContact: sec(0.92),
  firstPinImpact: sec(12.75),
  clickTool: sec(26.08),
  clickCanvas: sec(26.92),
  finalImage: sec(27.0),
} as const;
```

Names are illustrative; derive values from the current narration. Put all absolute frames in this file. Scene-local animation may use frames relative to its `Series.Sequence`, but shared events must reference the central cues.

Estimated timings are acceptable for an idea pass, not for the final caption or visual timeline. Before the full proxy, obtain word- or phrase-level timestamps from the narration, compare the transcript with the draft script, and replace every estimate that controls a caption, topic-image reveal, selection, cursor contact, or SFX. When the recording differs from the draft, caption the words actually spoken unless the user explicitly requests editorial subtitles.

Create a compact phrase-to-action table before coding:

| Voice phrase | Start/end | Foreground action | Background action | SFX/camera |
|---|---:|---|---|---|
| topic setup | measured | subject already visible; match approaches | cloud drift | strike/contact |
| mechanism | measured | marks/pin/burn/fall | one distant traverse | punch-in/impact |
| conclusion | measured | settled device/final UI gag | subdued | clicks/ding |

Every spoken claim should have a visual counterpart. Prefer one clear foreground action per phrase. Use background events to maintain energy, not to explain a second idea simultaneously.

For every topic-image change, use the same measured onset as its phrase or caption. Add the boundary frames `cue - 1`, `cue`, and `cue + 1` to QA so the outgoing image is still present before the onset and the new image is present on it.

Composition duration is the maximum of narration, last caption, and last visual or SFX event, plus any intentional hold:

```ts
Math.ceil(Math.max(narrationSeconds, lastCaptionSeconds, lastEventSeconds) * FPS)
```

## 4. Prepare Assets

Use user media first. For requested web assets, search for the exact object plus terms such as `cutout`, `transparent png`, `pixel sprite`, `collage`, or `stop motion`. Save original URLs and local filenames in `public/assets/SOURCES.md`. This is a private educational workflow: do not spend time checking rights or licenses and do not reject useful assets on that basis.

Preparation rules:

- keep an untouched `*-source.*` file;
- remove the background into a separate `*-cutout.png`;
- trim transparent padding while preserving a small safety margin;
- inspect the cutout over black, white, and the actual background;
- remove unrelated hardware, labels, or artifacts requested by the user;
- resize pixel art with nearest-neighbor and integer scaling;
- avoid destructive upscaling of photographic cutouts;
- use a subtle light edge plus offset drop shadow to integrate heterogeneous sources.

For a nearly solid background, ImageMagick can be sufficient:

```bash
magick source.jpg -alpha on -fuzz 10% -transparent "#ffffff" -trim +repage cutout.png
```

For complex backgrounds, use an available segmentation tool or careful image editing, then visually inspect the alpha. Do not trust automated removal without a rendered check.

## 5. Build The Remotion Layers

Read [remotion-architecture.md](remotion-architecture.md) when starting a new implementation.

Recommended z-order:

1. desktop and Paint chrome;
2. canvas wallpaper;
3. ambient clouds and water;
4. background actors;
5. persistent teaching object;
6. scene-specific overlays and impacts;
7. final replacement image;
8. subtitle frame;
9. cursor and click marks.

Keep the persistent object outside the scene `Series`; scene components should only add local annotations, props, and effects. This prevents anchor jumps at scene boundaries.

## 6. Synchronize Captions

Store captions as Remotion `Caption` JSON with `text`, `startMs`, `endMs`, `timestampMs`, and `confidence`. Keep wording exactly as approved.

Audit the file:

```bash
python3 "$HOME/.codex/skills/paint95-video-maker/scripts/caption_timeline.py" \
  public/captions-ru.json --fps 24 --video-frames 675
```

If a revised narration adds a known offset after an edit point, create a new caption file rather than applying ad hoc changes in JSX:

```bash
python3 "$HOME/.codex/skills/paint95-video-maker/scripts/caption_timeline.py" \
  public/captions-ru.json --shift-after-ms 12147 --shift-ms 67 \
  --output public/captions-ru-v2.json
```

The shift point is the first changed audio boundary, not automatically the start of the nearest caption. The script shifts each caption boundary at or after that point, so a caption that straddles the edit keeps its original start and receives a later end.

Listen around the edit point and inspect captions near every phrase boundary. Silence detection is a guide, not a substitute for listening.

Choose one caption persistence mode and record it in `project-spec.json`:

- `speech-end`: clear the caption when its measured phrase ends;
- `until-next`: extend each `endMs` to the next caption's `startMs`, with the last caption ending at the composition boundary.

Materialize persistent timing in the caption JSON instead of hiding the behavior in component logic:

```bash
python3 "$HOME/.codex/skills/paint95-video-maker/scripts/caption_timeline.py" \
  public/captions-ru.json --fps 24 --video-frames 675 \
  --hold-until-next --output public/captions-ru-persistent.json
```

## 7. Add SFX

Trim cues first, then sequence them at named timeline frames. Use the same impact constant for object contact, graphic burst, tray shake, and SFX. Keep fire ambience short. Lower or remove any cue that masks consonants in the voice.

Useful check:

```bash
ffmpeg -hide_banner -i out/final.mp4 -vn -af volumedetect -f null -
```

Do not normalize blindly after mixing. Peak and mean levels are diagnostics; speech intelligibility is the decision criterion.

An SFX cue is verified only when its transient is present around the named contact frame in the mixed proxy. Check every interaction cue, not only the file-wide mean and peak:

```bash
python3 "$HOME/.codex/skills/paint95-video-maker/scripts/verify_sfx_cues.py" \
  out/proxy.mp4 --fps 24 --cue-frames 316,336,680,704 \
  --baseline public/narration.m4a --summary
```

Trim leading silence from the source cue. If the mixed transient remains below the nearby narration, raise or replace the cue and rerender the proxy; do not infer audibility from the Remotion `volume` prop.

## 8. Critical-Frame QA Before Full Render

Select frames that expose synchronization and layout failures:

- frame 0;
- wick before ignition;
- match contact minus 2, contact, plus 2;
- each reveal midpoint and completion;
- pin insertion midpoint and end;
- each landing minus 2, contact, plus 2;
- camera punch-in peaks;
- first and last frame of every subtitle;
- topic-image boundaries at `cue - 1`, `cue`, and `cue + 1`;
- cursor start, tool depression, travel samples, canvas depression, post-click hold, cursor end, replacement-image first frame, and final frame;
- the activation frame of every fitted selection at full resolution.

```bash
bash "$HOME/.codex/skills/paint95-video-maker/scripts/render_qa.sh" \
  . src/index.tsx CandleStopMotion out/qa \
  0,20,22,24,202,234,304,306,308,474,476,478,644,646,648,674 4
```

Inspect the generated `contact-sheet.png` at original detail. Fix these common defects before a full render:

- missing wick or floating candle top;
- match leaves before flame appears;
- pin or insertion artifact beside the candle;
- duplicate frames or transitions between continuous actions;
- moving anchor props when overlays appear;
- all pins sharing one landing point;
- impact starting after the object has settled;
- subtitle overflow or overlap;
- a topic image arriving before or after its phrase onset;
- a lasso or transform box measured against the uncropped source instead of the rendered object;
- an arbitrary selection that does not explain the current phrase;
- a cursor teleport, linear shortcut when a Bézier path was requested, or disappearance before the result can be read;
- cursor click occurring after the canvas replacement;
- final action clipped by composition duration.

## 9. Render And Verify

Version outputs instead of overwriting the last known-good file.

```bash
npx tsc --noEmit
npx remotion render src/index.tsx CandleStopMotion out/video-vNN.mp4 \
  --codec=h264 --audio-codec=aac
bash "$HOME/.codex/skills/paint95-video-maker/scripts/verify_render.sh" \
  out/video-vNN.mp4 1080 1920 24
```

Open the final video in the app. Return a clickable absolute path and include duration and resolution plus any skipped validation.

## Efficiency Rules

- Read [efficient-workflow.md](efficient-workflow.md) for persisted briefs, change sets, density limits, render ladders, and small orchestration handoffs.
- Inspect targeted source files with `rg` and `sed`; do not load all assets into context.
- Probe media in one bounded batch with `media_inventory.py --max-items`; narrow the input path before raising the limit.
- Keep timeline constants, subject geometry, and asset paths centralized.
- Reuse one generic `Cue` component for SFX and one generic painted reveal.
- Use deterministic scripts for caption shifts, still rendering, and final verification.
- Use `run_compact.py` for Remotion, npm, FFmpeg, and other noisy commands. Keep complete logs on disk and inspect only a bounded error tail.
- `render_qa.sh` bundles once, renders stills at half scale by default, and suppresses successful progress output. Override with `PAINT95_QA_SCALE=1` only for edge-detail inspection.
- Use `render_proxy.sh` for motion QA of one changed frame range; use its `all` range only when overall pacing changed.
- Render targeted stills or changed ranges before a low-resolution proxy. A final-resolution full render is the last expensive step, not the first diagnostic.
- Preserve a known-good output while iterating.
