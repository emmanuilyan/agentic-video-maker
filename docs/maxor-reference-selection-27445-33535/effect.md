# Five provisional non-text Maxor recreations,274–335seconds

Status: USER APPROVED on2026-10-09. Exact approved renders in out/.
Source: https://www.youtube.com/watch?v=I6qlhmjkQ44 . Audio ignored.
Inspected257–280 remaining interval and279.5–340 overview; dense0.1sec survey plus consecutive frames around selected cuts. Selected intervals are not full coverage of gaps.

## Outputs / check

Source1280×72060fps. Drafts1280×72060fps. Comparisons1920×54060fps,original left / rebuild right, same trim timestamps. `npm run typecheck` and all five Remotion renders completed. ffprobe verified48/51/36/33/60frames. Dense sheets available in `review`; local key-sheet inspection is not a claim of inspecting every comparison frame. ChatGPT v2 review returned specific blocking defects; fixes rendered in v3. v3 review passed RoughFrame and CatFocus; v4 adjusts the three remaining effects, pending repeated review.

`src/effects.tsx` separates mechanisms from source-specific demos; `src/index.tsx` registers compositions. `render.py` rerenders; `compare.py` trims no further temporal offset and makes all-frame sheets.

## 1. Rough editorial matte

Source274.45–275.25. CompositionRoughFrame48frames. Reusable `RoughMatte({children,inset,seed})`.
Independent generated SVG clip polygon around1280×720viewport. Each edge has14broad points with mixed sine perturbations8/6px, edgeinset24px, deterministic seed3; avoids high-frequency sawtooth. A black AbsoluteFill below the clipped source creates torn paper / rough border. Mild0.3px blur applied to inside group.
Demo holds unmasked footagef0–6, applies mattef7–47. Native gameplay, sheep and native scene zoom remain supplied footage. Restored edge strips35px were inpainted on48sourceframes before adding the new matte. This is a new matte over repaired footage, not an embedded reference effect. Boundary reconstruction can have small smears. Use an untreated replacement clip for production to avoid repair work.

## 2. Color thaw with radial zoom

Source293.35–294.20. CompositionThawZoom51frames. `RadialSmear({children,amount,origin})` is reusable.
Layers: frozen incoming elephantf0–2; gameplay platef3–50; source caption alpha above plate; radial sampling of entire composition including captions; zoom wrapper.
Grayscale1→0f10–27; blue source caption stays colored. Zoom keyframes f36/37/40/43 with scale1/1.12/1.22/1.28, origin50%50%. Radial keyframes f36/37/39/42 with amount0/1.5/.6/0; another amount.85 atf50 follows the next source impact.24scale taps from1 to1+0.12amount with each opacity0.045 and blur1.5amount px. No CSS temporal animation.
Gameplay actors are frozen at293.9, incidental native spell not recreated. Caption repaired by color-mask inpainting, then isolated source blue glyph artwork overlays it. Font is not reconstructed. Geometry of native character pose differs from original early frames. Timings are estimates measured at selected frames, pending review.

## 3. RGB smear entry

Source319.35–319.95. CompositionRgbSmear36frames. `ChromaticSmear({children,frame,start,end})` plusRoughMatte.
Original clean rat stillf0–8. Processing startsf9: blur6px, sinusoidal translation±23pxhorizontal±3vertical, rotate±1.3deg. Split red/cyanfeColorMatrix screen-blended copies, separation±28px, opacity0.36, all decreasing to0f14. 12horizontal trail taps9px apart with opacity0.065×amount. Cropped scene scale1.42→1.43f9–15origincentre, widthfactor1.07, translation0→−140pxf9–13. Hue35→0deg,saturation1.65→1f9–20. New matte24px. Full raster quote at200,500size860×160, independent of camera zoom, shares chromatic processing.
Native rat pose frozen; freeze is a known substitution. Quote is raster extracted from the original, not editable text. RGB profile and blur are approximations; do not claim exact matching before review.

## 4. Cat focus and meme overlay

Source322.25–322.80. CompositionCatFocus33frames. `FocusCutout({background,foreground,amount})`.
First native closeup as frozen plate. Atf6–13crossfade to native second pose, foreground alpha isolated by seeded GrabCut over restored backdrop. Background grayscale0.075,blur0.6px,brightness0.97; radial vignetteopacity0.09, background native softness retained. Original furry masking is approximate, especially feet.
Independent raster caption at370,548size540×68. Native mouth motion frozen. Atf19a separate source meme image appears at475,185size325×355; scale0.93→1.04f19–25, foreground stays sharp. Underlying cat+caption group blurs3px. Layerorder background→cat→caption→meme. Source memes are assets; placement and transition rebuilt.

## 5. Inventory punch and tooltip insert

Source334.35–335.35. CompositionInventoryPunch60frames. `InventoryPunch({frame,panel,background,tooltip})`.
Frozen native inventory plate; caption region525–625 repaired by inpainting. Camera wrapper measured scale1.002/1.078/1.204/1.39/1.439 atf7/8/10/13/14, held, origin75%50%. Whole UI and gameplay plate move together. Radial amount.55/.6/0 atf8/10/15. Tooltip separate460×215image at455,265; entersf8,scale0.68→1f8–15,blur3px×smearamount. This is camera enlargement with an insert, not a claim that native inventory panels independently explode.
SVG captions above zooming scene: firstGAMER SUPPSf0–7atx640baseline610,83pxGeorgia700,cream/lime to magenta gradient; f8–28GAMER SUPPS/ENERGY; f29–59GAMER SUPPS/ENERGY DRINKS,60→92pxf8–17Georgia700,lime/magenta,baselines565/649. Originalfontidentity unknown; these are approximations. Tooltip raster uses source item parody. Native UI cursor and character animations not rebuilt.

## Reuse

Import reusable components from `src/effects.tsx`; supply untreated media assets. All geometry in source pixels at1280×720; for other dimensions use a source-sized group and scale that group uniformly. Timings in composition frames at60fps. Keep reusable mechanism distinct from cropped source media and native game VFX. For blending mechanisms reuse existingTEXT_BLEND_MODES rather than inventing a new compositor.

## Next continuation

After approval/save, inspect339.5 onward with overlap. The gaps257–340 are inspected, not declared exhaustively recreated. Do not continue new work before the current user review gate.

Review history: v4 passed RoughFrame, ThawZoom, CatFocus, InventoryPunch. RgbSmear v5 reduces the oversize crop; ChatGPT passed v5 after all36frames; all five ready for user review. No user approval yet.

Final prereview result: №1/2/4/5 passed v4, №3 passed v5. ChatGPT reviewed all-frame sheets; realtime playback unavailable, disclosed. Minor source freeze/pose, approximate fur repair, font and smear geometry remain disclosed. User approved all five on2026-10-09.
