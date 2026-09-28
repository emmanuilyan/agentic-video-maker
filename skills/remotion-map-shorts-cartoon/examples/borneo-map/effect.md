# Satellite map zoom and region reveal

## Source and result

- Source: [«Самый необычный остров»](https://www.youtube.com/shorts/EZbITnfIsuc), 0:00–0:17 of the map passage.
- Output: `BorneoMap`, 1080×1920, 25 fps, 425 frames (17 s); local render `out/borneo-map.mp4`.
- Implementation: [`MapStory.tsx`](src/MapStory.tsx), [`borneoGeometry.ts`](src/borneoGeometry.ts), [`BorneoMapDemo.tsx`](src/BorneoMapDemo.tsx).
- Fidelity: approximate composition, map camera, pale boundaries, numbered tags, and yellow Indonesia reveal. At the user's direction, the surroundings now darken after the zoom rather than starting dark as in the reference. The NASA plate has different surface texture and color. Caption text and typeface are approximations; the trial has no narration or music.

## Visual anatomy

| Back to front | Content | Placement / size | Treatment |
| --- | --- | --- | --- |
| 1 | Southeast Asia map plate | 2160×3840 image transformed behind 1080×1920 frame | Teal grade; fixed raster from NASA GIBS. |
| 2 | Surroundings dim | Everything outside the Borneo outline | Dark teal SVG layer revealed only after the zoom; island cut out with a mask. |
| 3 | Borneo land emphasis | Same geographic extent as the plate; island about 0.4 canvas width at start and 0.85 near 4 s | Higher-resolution local plate clipped to island geometry; brightens as the surroundings dim. |
| 3 | Island outline and borders | Geographic SVG paths sharing the plate transform | Off-white strokes, about 1–2 output pixels. |
| 4 | Indonesia region | Country path on Borneo | Amber translucent fill and small dot pattern. |
| 5 | Map labels and badges | Editorial positions around the island | Black compact labels; numbered hexagon badges. |
| 6 | Subtitles and credit | Subtitle centered at y≈0.675H; credit bottom right | White, small shadow; credit stays visible. |

## Timeline

Times are from the first frame of the 25 fps composition.

| Frames / time | Visible beat | Mechanism |
| --- | --- | --- |
| 0–105 / 0–4.2 s | Borneo grows from regional context to main subject | Shared map transform zoom 0.93→1.82, eased with cubic Bézier `(0.22,1,0.36,1)`; screen anchor moves from x=0.44W to 0.53W. The map stays at its normal grade. |
| 120–158 / 4.8–6.3 s | The surroundings turn dark while Borneo stays bright | An SVG mask excludes the island from a dark teal tint that reaches 0.7 opacity; the detail plate brightens from 1.10 to 1.35. Camera remains still. |
| 35–70 / 1.4–2.8 s | Island edge appears | Outline opacity 0→0.72. |
| 75–222 / 3–8.9 s | Name tag holds then exits | Black tag opacity changes; kept outside map transform. |
| 220–250 / 8.8–10 s | National boundaries appear | Country path stroke opacity 0→0.62. |
| 230–345 / 9.2–13.8 s | Three region badges appear in order, then leave | Per-badge frame offset and opacity. |
| 333–350 / 13.3–14 s | Indonesian part becomes yellow | Fill and dot-pattern opacity; geographic path remains aligned with plate. |
| 383–400 / 15.3–16 s | Indonesian flag and tag appear | Editorial overlay opacity. |

## Reusable controls

`MapStory` exposes `imagery`, `detailImagery`, `showSubtitles`, and `accentColor`. For a new location, replace the imagery, geographic paths, map bounds, and anchor coordinates together. Keep the raster and paths in the same projection. The subtitle cues and political labels are content for this example, not reusable defaults.

## Reconstruction

1. Export a map plate for a documented bbox and projection. For this trial: EPSG:4326, `[west,south,east,north]=[92,-36,136,42]`, 2160×3840.
2. Convert polygon coordinates with `x=(lon-92)/44*2160`, `y=(42-lat)/78*3840`. Place the resulting paths in an SVG with the same 2160×3840 viewBox as the raster.
3. Render both image and SVG inside the same absolutely positioned element. For frame `f`, compute a zoom and focus point, then `left=screenX-focusX*zoom`, `top=screenY-focusY*zoom`, `transform=scale(zoom)` from the top-left origin.
4. Keep the first map view at a readable normal grade. Once the camera reaches its endpoint, tint the surroundings through a mask that excludes the island. Clip a second high-resolution raster by the island path and brighten it with the tint. In this trial its bbox is `[105,-10,122,12]`; set its top-left and size with the same projection formula. Draw outlines above it, then fill the selected region under borders. Keep captions and labels outside the map element so they do not grow with the camera.
5. Drive every transition from `useCurrentFrame()` and render checkpoint stills before exporting the MP4.

## Evidence and uncertainty

The source at 0:00 shows Borneo about two fifths of frame width; near 0:10 it occupies most of the width. The source shows boundaries and numeric badges by 0:10–0:11, the yellow region at roughly 0:14, and the flag at about 0:15. Exact source easing, source imagery provider, font, and compositing method are not observable; the implementation estimates these from visible frames.

## Verification

`npm run typecheck` passed. Remotion rendered the full 425-frame MP4 and still frames at 0, 250, and 405. The 17-second local side-by-side check is `out/borneo-map-comparison.mp4`; it uses the source only for review, not as an implementation asset. The main visible difference is the NASA plate's softer land detail and darker ocean texture.

Run from this directory with `npm install`, `npm run typecheck`, and `npm run render`; `npm run dev` opens Studio.
