# D&D Experience Lower Third

## Source and result
- Source: [Baldur's Gate video essay](https://www.youtube.com/watch?v=I6qlhmjkQ44), 19.65–21.15 s.
- Output: `DndExperience`, 1280×720, 60 fps, 90 frames; gallery render: [`MAXOR_DND_EXPERIENCE.mp4`](../../../../../docs/photo-techniques/previews/MAXOR_DND_EXPERIENCE.mp4).
- Implementation: [`DndExperienceEffect`](../src/next-batch.tsx), standalone composition in [`Root.tsx`](../src/Root.tsx).
- Fidelity: two-stage phrase reveal, condensed warm-gradient lettering, dark outline and impact bloom; actor and environment are procedural substitutes.

## Visual anatomy
An orange-to-red, condensed title sits against the lower edge. The short `THE D&D` phrase appears first, then gives way to the wider `THE D&D EXPERIENCE`. A pale/cyan impact bloom and slight background push support the second title beat. Both title versions stay sharp above the softened footage.

| Layer, back to front | Placement | Treatment |
| --- | --- | --- |
| Ruins backdrop and character | Full frame | Small push-in, brief blur during impact. |
| Cyan-white flash | Center | Screen-like bloom, peaking around the title expansion. |
| Short and full title | Bottom, centered | Impact-style condensed capitals; warm vertical gradient, thick dark stroke and shallow extrusion. |

## Timeline

| Time / frames | Visible event | Motion |
| --- | --- | --- |
| 7–34 / 0.12–0.57 s | `THE D&D` appears and holds. | Opacity reveal from frames 7–13. |
| 34–48 / 0.57–0.80 s | First title clears as the full phrase takes over. | Second reveal starts at 38 and resolves by 48. |
| 34–61 / 0.57–1.02 s | Cyan-white bloom and background blur/push. | Flash peaks at frame 47. |
| 70–82 / 1.17–1.37 s | Full title exits. | Opacity fades to zero. |

## Reuse
Use `DndExperienceEffect` with a local frame counter. Update the strings and `textLength` values in `DndTitle` to match a new phrase; preserve the two cues if the reference has a short title followed by a longer expansion.

## Evidence and uncertainty
Timing was estimated from the 19.65–21.15 s interval. Character art and scenery are stand-ins; font metrics vary with the installed Impact-compatible font.

## Verification
Standalone render from the approved comparison revision; lint and TypeScript passed. Gallery preview and poster use the same render.
