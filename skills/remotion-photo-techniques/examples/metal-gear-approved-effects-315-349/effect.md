# Approved batch 10 — recipes

Source: https://www.youtube.com/watch?v=41v3L0zCkNY
Canvas 1280×720, 60fps. Comparison 2560×720, ORIGINAL left / REMOTION right.

## MG_SIDE_TITLE_SUBLINE — Титр с боковым въездом и подписью
315.500–316.750; BorisTitle. Two-row gold title with red extrusion enters from right over frames 10–20, drifts slightly left, hard clears at 67. Lower italic outlined subtitle enters 19–26. Title asset is an isolated transparent glyph sprite; subtitle is separately generated. Native camera movement belongs to backing footage.

## MG_PORTRAIT_WHITE_PULSES — Мем-портрет с белыми импульсами
325.600–328.000; ReactionFlash. Vertical talking portrait at x954 y160, 280×534. Entrance fade9–22, irregular white exposures from per-frame flash envelope, exit130–137. Face media uses normalized nonwhite source portrait samples, not full reference-composition playback. Decorative permanent border removed following external review.

## MG_TITLE_TO_EDGE_COLLAGE — Титр с переходом в коллаж по краям
333.150–336.300; DoktorCollage. Cyan angular two-row title enters from left17–30; subtitle24–30. Title accelerates right108–116. Three independent illustration sprites enter lower-left, upper-right and lower-right134–142; hold to166; fade166–174. Source-specific background repair holds a clean nearby frame under the collage, then dissolves into clean later footage; this background plate is for the comparison, not part of the reusable overlay. Upper photo contains an occluded overlap hidden under the lower sprite in its settled pose.

## MG_STAGED_CAPTION_PORTRAITS — Фраза по частям с портретами
347.200–349.000; PresidentCaption. Three discrete caption states at8/33/64: president; president bumsack; president bumsack o'chungus. First is normal purple; later states green Difference over footage. Left portrait enters from beyond left32–38, gently grows and rocks; right portrait enters64–72. Source-specific static portraits retain some backing-image blending; source speaking motion is approximated by a still portrait. Handle ends while overlay is still visible; exit is not asserted. These limitations are preserved in the user-approved v4.

## Reuse

Components accept `{frame:number,duration:number}`; standalone and comparison compositions are registered in [Root](src/Root.tsx). All artwork uses the1280×720 coordinate space; scale both offsets and dimensions by outputWidth/1280 for a matching aspect ratio. Replace named sprites/video by layer role. `reaction-flash.json` is a deterministic per-frame opacity envelope; replace it to author a different pulse rhythm. Source-specific backing footage is a demonstration plate. Overlays, transforms, flashes and caption stages are separate layers. Background repairs, static portrait pose and raster font artwork are approximations. See [README](README.md) for exact previews and composition IDs.
