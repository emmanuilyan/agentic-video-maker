# Approved Maxor effect recipes: batch seven

Source: [Maxor video](https://www.youtube.com/watch?v=kO9HmhwGzXs). The reviewed source excerpts were kept in the working review folder; their absolute offsets within the YouTube video were not recorded, so no approximate timestamp is asserted here. Timecodes below are relative to each remake. Each effect has a separate source clip and final side-by-side comparison in the review workflow.

All six implementations are in [src/Effects.tsx](src/Effects.tsx), registered in [src/Root.tsx](src/Root.tsx), at 1280 × 720 and 60 fps. `ramp(f, a, b)` clamps a linear 0→1 transition to the given frame interval. Every gallery MP4 is copied byte-for-byte from the last approved standalone Remotion render; its JPEG poster comes from that MP4.

| ID / composition | Duration | Core motion | Approved standalone preview |
| --- | ---: | --- | --- |
| `MAXOR_SKYRIM_BLENDED_TITLE` / `01-skyrim-title` | 60 frames, 1.0 s | Large centered Skyrim wordmark; fill mixes with the background; letters vanish at staggered times | [MP4](../../assets/previews/MAXOR_SKYRIM_BLENDED_TITLE-reference.mp4) |
| `MAXOR_SPEED_DISCLAIMER_WIPE` / `02-speed-disclaimer-wipe` | 66 frames, 1.1 s | Colored subtitle drifts left while a bright wipe and hard plate change replace the backdrop | [MP4](../../assets/previews/MAXOR_SPEED_DISCLAIMER_WIPE-reference.mp4) |
| `MAXOR_JAPAN_MAP_CALLOUT` / `03-japan-map-callout` | 72 frames, 1.2 s | Red Japanese title, two hard-appearing inserts, and one full-canvas Japan silhouette above every layer | [MP4](../../assets/previews/MAXOR_JAPAN_MAP_CALLOUT-reference.mp4) |
| `MAXOR_EASTERN_EUROPE_SCALE` / `04-eastern-europe-scale` | 150 frames, 2.5 s | Expanding map, actual US/Africa silhouettes, centered type-on caption | [MP4](../../assets/previews/MAXOR_EASTERN_EUROPE_SCALE-reference.mp4) |
| `MAXOR_RGB_BLOCK_GLITCH` / `05-rgb-block-glitch` | 120 frames, 2.0 s | RGB image blocks, glyph-confined glitch, color-burn grade and background zoom | [MP4](../../assets/previews/MAXOR_RGB_BLOCK_GLITCH-reference.mp4) |
| `MAXOR_MARGIT_FRAME_TITLE` / `06-margit-frame-title` | 60 frames, 1.0 s | Glowing frame, arched yellow headline with pink shadow, thin lower caption | [MP4](../../assets/previews/MAXOR_MARGIT_FRAME_TITLE-reference.mp4) |

## 1. Skyrim: large blended title

Visual anatomy, back to front: full-frame `plate-skyrim.jpg`; a subsequent plate crossfade; subtle edge darkening; centered six-letter serif wordmark at roughly `y=.39H`, `font=.328H`; small series label at `y=.275H`. White letters have `mix-blend-mode: screen` and partial opacity so footage changes their apparent color. There is no separate glow or light pass.

Frames 0–9 scale the wordmark from 91% to 100% and reveal the letters. Starting at frame 35, each successive letter begins to disappear 0.55 frames later than its neighbor. Frames 36–45 change the background; the small label fades over frames 42–52. Reuse by changing both plates, the two text strings, letter spacing, and the stagger interval. Preserve the per-glyph spans; fading a whole word uniformly loses the source rhythm.

## 2. Speed disclaimer: left drift and wipe

Visual anatomy: full-screen first plate; high-contrast grayscale version clipped by a moving reveal; dark multiply layer; skewed white screen-blend strip; centered lavender caption at about `y=.14H`; second plate behind the outgoing first plate. Caption color is `#aaaefa`, with a dark violet stroke and compact two-part shadow.

The caption appears in frames 12–16. From frames 16–34 it travels approximately 140 px left, in addition to a 54 px base offset. A broad wipe travels across the frame over frames 21–48. The first plate clears and the next plate appears around frames 49–54. Swap in replacement footage and adjust the strip width, caption text, and drift distance. The color edge belongs to the type, while the moving white strip belongs to the picture transition.

## 3. Japan: one map over every picture

Visual anatomy: full-frame gameplay plate; dark wash; clean anime panel at `(105,273)` sized `640×390`; second inset in the lower right at `440×245`; red `日本語` at `(52,32)` with dark outline and offset shadows; **one transparent full-canvas Japan silhouette at z-index 20**, above the title, panels, and background. The clean panel deliberately contains no baked-in red map fragment.

Frame 13 hard-enables the map and title. Frame 28 hard-enables both inserts. Frame 56 cuts to the next scene and removes the callout layers. Do not dissolve the inserts; the source uses direct appearances. To reuse, replace `japan-map-overlay-v2.png` with one transparent silhouette covering the entire 1280×720 canvas. Do not split its visible portions between panel art and background layers: that caused the broken island corrected in the final approved version.

## 4. Eastern Europe: growing map and typed scale claim

Visual anatomy: full-screen gameplay plate; centered `EASTERN EUROPE` headline and underline; map-card layer expanding from roughly `360×205` to canvas size; US silhouette on left, Africa in the middle, another US silhouette on right; centered white multi-line caption. The three geographic silhouettes use SVG masks and color-blend layers so map texture remains visible rather than showing flat opaque stickers.

The initial title enters in frames 0–11 and leaves around frames 43–51. The map fades in frames 43–54 and expands frames 60–78. `slightly larger` types in frames 82–98; `than` enters frames 100–108; `Africa` enters at frames 108–120, after the map reaches full size; `(to scale)` follows in frames 126–138. All text is centered on the canvas. Replace the underlying footage and map image; preserve the geographic silhouette masks and delay of `Africa` if recreating this exact timing.

## 5. RGB blocks: glyph glitch, zoom, and grade

Visual anatomy: full-frame first and second footage plates; 195 moving image tiles in cyan/magenta/white; two picture-copy polygons; screen and color-burn overlays; rune-like white glyphs with cyan/magenta offset shadows and intermittent clipped slices; 25 narrow flickering image strips; a short radial flash. The glitch colors are confined to each glyph span so the negative spaces remain readable.

The first block burst is strongest in frames 0–27. Duplicate picture fragments develop in frames 22–34. Glyphs enter over frames 29–40. The background slowly zooms and gains cyan/purple/red color correction through frames 40–76; the new plate cuts in around frames 78–86; a brief flash peaks at frame 107. Replace `glitch-pre.jpg`, `glitch-next.jpg`, and `plate-glitch-b.jpg` to apply the treatment to other scenes. Adjust `tiles` count and opacity for render cost, but keep random-looking positions deterministic from frame and index.

## 6. Margit: framed arched headline

Visual anatomy: full-frame game plate; bright pale-green 8 px rectangular border inset 24 px; large yellow `MARGARET` with heavy pink/magenta offset shadow; thin pink `THE FELL REFUND` at the lower left. Each headline glyph gets a sine-based vertical offset so the top edge forms a shallow arch; both text lines sit low in the frame.

The frame scales from 92% to 100% in frames 0–12. Headline letters appear left to right starting at frame 9 with a 1.35-frame stagger; the lower caption enters with them. Both clear during frames 39–49. For reuse, change the plate and strings, then tune border inset, arch amplitude (17 px), yellow fill, pink shadow, and subtitle baseline. Do not curve only one word: the approved layout treats the entire headline as a single arched phrase.

## Fidelity and verification notes

The source-specific plates are still frames from the reviewed footage, not continuously moving footage. The reconstructions preserve the visible layer order, short duration, typography, transitions, and color roles agreed during review. Original typefaces are approximated with installed serif, Impact, and Arial families; image blend behavior depends on the replacement footage. The final gallery cards contain only the standalone recreations. Their posters were extracted from those same files, and the source/comparison panels remain outside the gallery.
