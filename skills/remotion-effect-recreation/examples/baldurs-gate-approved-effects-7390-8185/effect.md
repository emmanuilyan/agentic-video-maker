# Approved effects recipe: 73.90–81.85

[Implementation](src/scenes.tsx) · [compositions](src/root.tsx) · [run and previews](README.md). Canvas 1280×720, 60fps; coordinates below are pixels, normalized by /1280 and /720 when adapting. Source intervals are independent excerpts; gaps are not complete coverage. All animation uses frame-derived deterministic interpolation with clamped ends.

## MAXOR_RED_EDGE_TITLES

`BossTitles`, 45 frames. Moving gameplay → two separate red SVG contour masks. Fill #ef345a, no added outline. Visible f4–39; removed f40 on the cut. Upper line enters from outside top/left while shrinking 1.30→1.00; lower line enters from below/left with the same mechanism. Exact per-frame translation and scale are in [boss-motion.json](public/boss-motion.json); `Glyph` compensates center scaling so measured x/y remain top-left bounds. Upper settles near (33,20), lower (79,624), then mild drift/shrink until exit. Replace the two glyph assets for other text; preserve independent transforms and clipping. Entry f4–5 upper pose is extrapolated because it is partially occluded.

## MAXOR_GROWING_MEME_SWAP

`FramedMemeSwap({start:22,swap:37,end:53})`, 54 frames. Moving background → framed PNG with drop shadow. Center (989,360). First image 391×364, scale f22/f31/f36 = .67/1/1.04. Hard replace at f37; second image 351×359, scale f37/f44/f52 = .82/1.05/1.04. Remove f53. Organic borders are in the image assets. For reuse replace the PNGs and retain their dimensions/center; changing center or size is done in this component. RGB-impact before f22 is retained source context, with uncertain attribution; it is NOT a recreated mechanism of this technique.

## MAXOR_STAGED_PERSUASION_GAG

`SpeechStages({switchFrame:43,end:72})`, 73 frames. Gameplay → white serif prompt → yellow comic reply. Visible f1; white label removed at hard cut f43. Reply changes from “To kill...” to “himself.” on that same frame; removed f72. Label rectangle (320,530,618,41), white with 1.5px dark edge. First yellow rectangle (547,587,187,50), second (556,591,172,43), fill #f8ff53, purple edge #96005e, 2.5px four-direction drop shadows. There is no invented scale reveal. Use `Glyph` and replace contours for new wording.

## MAXOR_RGB_MEME_POSTER

`RgbMemePoster`, 38 frames. Inactive source context f0–4; active f5–30; hard remove f31. Layer order: neutralized moving background with separate demo grade → portrait → upper/lower acid-green SVG text → RGB split/blur of whole scene. Portrait (826,212), 340×312. Upper mask (821,164,358,90); lower (879,467,230,111), fill #acff26. Whole scene scale f5/f7/f12 = 1.36/1.13/1, origin (990,360). Red and cyan copies move ±[24,14,4,2,0,0]px at f[5,7,8,9,10,12]; cyan copy uses screen. Blur f5/f7/f9/f11/f12 = 7/4/3.8/1.2/0px. Shake until f12: x=sin(frame*2.7)*linear(36→0), y=cos(frame*2.3)*linear(15→0). Filters use a zero-sized absolutely positioned SVG, preventing layout shifts. Demo grade multiplies red1.35/green1.12/blue1. Native time-varying hue is not fully isolated. Seven entry background frames use a clean donor frame to remove the original RGB distortion, so gameplay movement can differ. Replace portrait and text assets for reuse; lift `RgbLayers` for the transition. Keep a coherent canvas/origin when adapting scale.

## MAXOR_RED_REACTION_CAPTION

`BehindCaption({text})`, 39 frames. Native game shot cut → separate editable text. Caption visible f2–30, removed f31. Impact65px, centered x640, baseline604, textLength770, fill #822f32, dark stroke #260711 at6px, paintOrder stroke, 4px bottom shadow #16030b. Timing follows the shot; no fade or invented pop. The demon/wings and camera are inside gameplay, NOT separate cutouts. Impact needs local setup.

## Assets and adaptation limits

Backgrounds are reference-derived demonstration footage with the selected author overlays removed using masks/inpainting; reconstructed pixels are approximate. Meme images and letter shapes are source-specific and are not blanket licensed for redistribution elsewhere. Substitute footage and pictures for independent productions. SVG contour masks give the exact demonstrated wording/style but are not fonts. `Glyph` exposes color, x/y, scale, edge and edgeWidth; captions expose text/timing where supported. To reuse other measured constants, edit the composition or expose them as props without changing the approved preview.

Example: render composition `Poster` for the complete demo, or wrap `RgbLayers` around a new background and independently positioned poster/text. Use the approved previews to check stage timing and effect intensity. [Review limits](review.md).
