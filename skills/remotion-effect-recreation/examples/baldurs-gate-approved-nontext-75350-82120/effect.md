# Approved partial Maxor batch 753.50–821.20

Five independent Remotion montage drafts at1280×72060fps. Original audio ignored. User approved the five final v3 comparisons after ChatGPT corrections. Full implementation in src/effects.tsx, registered in src/index.tsx. candidates.json records exact intervals; out/ contains independent previews; review/*-comparison.mp4 has source LEFT / draft RIGHT.

## LOOT_MONOCHROME_PORTRAIT_IRIS —753.50–755.10
Observed: inventory punch-in, selective gold color, persistent callout, expanding circle to a chef portrait. Draft: frozen clean inventory plate zoom1→1.6 f0–8 around(875,175); grayscale f4–23; separate callout without title switchesf53 to avoid a remaining GOLD fragment; independent extracted callout keeps gold color. Blurred surrounding plate plus sharp central region; clip coords account for pre-transform mask. Approximate UI zoom framing/content. Portrait cleaned of source captions by thin-mask inpainting; circle at(640,360), radius0→760 f54–69. Independent Times title/underline and secondary text appear f53. Native game motion frozen; portrait repair and typography approximate. Callout art/UI reference-specific.

## MONOCHROME_GHOST_CUTAWAY —777.20–778.20
Dense timing corrects survey778.5–779.5. This is hand/wrist (not a leg). Wide purple hand → monochrome wrist through opacity0→1 f6–14; hold; hard cut to face f56. Three frozen source plates, monochrome source appearance inherited. Native camera motion is frozen. Montage/color provenance in source not established; recreate only observed blend/hold/cut, not claim game VFX as a separate editorial effect. Source text baked in terminal face plate; do not reuse it as caption implementation.

## BETWEEN_FACES_CARTOON —781.05–782.05
Two faces naturally create central gap. Source moving cartoon is isolated from external placement/frame; cropped JPEG frame sequence preserves cartoon movement. Independent transparent raster frame and outer width240→400 f6–13; center(640,357), aspect400:226. Frozen clean background from781.1. Frame artwork reference-specific; inner crop/geometry approximate. Native reference cartoon does move. No copied whole edited source clip in right output.

## NESTED_INSPECT_MEME —812.15–813.35
Native inventory state switch → independent zoom/blur settling → locally growing meme in item-description panel. UI inspect state is raster plate from812.5, not a reimplementation of BG3. Separate native rotating item crop isolated as JPEG sequence on clean black rectangle(275,285,385,260). Switch f9; whole scene scale1.12→1 and blur4→0 f9–14. Meme appears f35: rect(712,290,323,330), scale.6→1 byf45; measured approximate. SAFE title inherited raster; SAFE KEEPING is a separate extracted raster crop, grows.6→1 f35–45; any inherited caption fragment on meme was removed. Gameplay background frozen; native object rotation preserved from crop. Partial reconstruction focuses on independent overlay/placement and transition.

## CLOWN_STAGE_CIRCULAR_OVERLAP —819.50–821.20
Pair plan → circle containing hazy wide stage → hard cut close clown. Stage source haze inherited, not independently graded. Pair/wide/close plates frozen. Circle center(640,360), radius0→750 f24–35; opaque second shot retains haze, two angles coexist outside/inside circle. Title/underline and a separate alpha raster subtitle appear f23; source subtitle removed with full-band inpainting; hard cut f76 with subtitle preserved in native close plate. Cleaned stage artwork by thin-mask inpainting, typography approximate. Exact original spelling Clwon Stage retained.

## Reuse and checks
Timing in frames relative to60fps; normalized positions divide x by1280/y by720. Replace reference plates/crops; keep montage, mask and scale curves. Run npm run typecheck and render the registered composition with npx remotion render. Four timed source/draft checkpoints per effect are archived alongside the original comparisons. inspect-interval.py extracts consecutive source frames, not sparse timing estimates. Ordinary ChatGPT selected candidates from bounded surveys; ChatGPT v2: cartoon READY; four requested corrections applied (GOLD residue, mono dissolve/terminal caption, inventory blur, Stage subtitle residues); Targeted v3 recheck accepted all four corrected examples; combined5/5 READY by control frames, not MP4 motion. Human approval received. No claimed independent acceptance yet.

## Saved example

Exact approved independent previews: out/MAXOR_*.mp4; code in src/effects.tsx. Install package dependencies, npm run typecheck, then npx remotion render src/index.tsx <composition> out/<file>.mp4. IDs LootIris, Mono, Cartoon, Nested, Stage; frames in candidates.json. Source comparisons and ChatGPT verdicts are archived under docs/maxor-reference-selection-75350-82120. ChatGPT assessed aligned control frames, not MP4 smoothness. User approved the playable comparisons. Preserve documented partial-reconstruction limits on reuse.
