# Approved: five nontext Maxor mechanisms, 442.70–478.80

Status: user approved all five on 2026-10-12. Ordinary ChatGPT comparison review completed on retry and identified five material corrections. V4/V5/V6 address them. Ordinary ChatGPT accepted Grade/Dissolve/Menu in V4, Sheep timing in V5, SaveWindow timing in V6. Reviews concern the stated defects, not exact source equivalence. User approval granted 2026-10-12. Exact approved standalone previews are in out/.

Source: https://www.youtube.com/watch?v=I6qlhmjkQ44. Ignore audio. 1280×720, 60 fps. comparisons place original left and Remotion right.

| Composition | Source interval | Implemented mechanism | Limit |
|---|---|---|---|
| Grade | 442.70–443.70 | RGB affine color matrix on whole frame/HUD, transient blur and scale, neutral light alpha texture | Matrix is fitted approximation; native camera/explosion are frozen and do not match trajectory |
| GameOver | 454.40–454.90 | Incoming location plate dissolve f3–15, title alpha f3–6, scale .96→1.02 | Native UI and caption raster assets; source motion frozen |
| SaveWindow | 466.70–467.50 | Hold main menu untilf4, swapf4–8; blur peaks15px atf6; outgoing scale1→1.6, incoming1.28→1 | No vertical scrolling; incoming screen is still, caption alpha extracted |
| Sheep | 474.90–475.70 | Gameplay/black/incoming sheep overlap f1–11, scale .91→1.04, defocus0→1.4px, editable extruded pink THIRD→THIRD TRY atf25 | Approximate font/depth; locally repaired still has texture loss under caption; animal animation not recreated |
| Menu | 478.10–478.80 | Background replacement under separately extracted foreground logo/buttons/subtitle f3–7; outgoing old logo/caption gone atf5; blur5→0px and scale1.07→1 | UI is raster mask, not editable game widgets; source RGB shake not yet recreated; small repair artifacts possible under UI |

Implementation: src/effects.tsx. Local fonts awaited in src/index.tsx. Time animation derives only from useCurrentFrame/interpolate. npm run typecheck passed. render-batch.py renders all five through Remotion and makes hstack comparisons; qa.py supplies static checkpoints; review-package.py packages every frame with IDs and time labels.

To reuse: replace incoming/outgoing plates and UI alpha assets, preserving pixel coordinates or refit their masks. Replace the fixed color matrix for other footage; do not treat fitted values as an exact original grading preset. Obtain clean moving footage to remove the frozen-gameplay limitation. Do not publish as an exact reconstruction.

## V4 color peak
Channel-isolating SVG matrices feed magenta/cyan screen-blended copies at ±18px atf10, brightness1.65/contrast1.5/blur9px/scale1.16 peak overf8–15. Static fitted grade remains afterwards. Typecheck passed; all5 rerendered.

## Library IDs and usage

Prefix each ID in candidates.json with MAXOR_ for gallery lookup. Install with npm install; typecheck with npm run typecheck. Render using npx remotion render src/index.tsx SaveWindow out/SAVE_WINDOW_ZOOM.mp4 (other composition IDs in candidates.json). render-batch.py needs original clips copied from docs/maxor-reference-selection-44270-47880 into review/.

### Reuse measurements

The viewport is 1280×720 (16:9); each plate fills it, all scaling is anchored to its center. SVG caption center is x640/1280=.5; baseline650/720=.903; THIRD width570/1280=.445, THIRD TRY width1010/1280=.789. The caption uses an editable gradient and depth offsets6–18px; source font/bevel remains approximate. Menu UI uses an independent full-viewport alpha PNG retaining source coordinates. Replace plate and mask PNGs in public/ to reuse with other media. Timings are composition-relative frames at60fps. For another FPS, rescale frame constants.

### Approval evidence

Original-left / Remotion-right comparisons and ChatGPT review record are preserved in docs/maxor-reference-selection-44270-47880. V4 accepted Grade/Dissolve/Menu, V5 Sheep, V6 SaveWindow. This review checks named montage/timing defects on frame sheets; it does not certify identical gameplay motion or precise typography. Preserve those limits when reusing.
