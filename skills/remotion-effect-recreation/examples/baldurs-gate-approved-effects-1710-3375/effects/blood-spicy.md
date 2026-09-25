# My Blood Is / Spicy Impact Title

## Source and result
- Source: [Baldur's Gate video essay](https://www.youtube.com/watch?v=I6qlhmjkQ44), 25.55–26.65 s.
- Output: `BloodSpicy`, 1280×720, 60 fps, 66 frames; gallery render: [`MAXOR_BLOOD_SPICY.mp4`](../../../../../docs/photo-techniques/previews/MAXOR_BLOOD_SPICY.mp4).
- Implementation: [`BloodSpicy`](../src/next-batch.tsx), standalone composition in [`Root.tsx`](../src/Root.tsx).
- Fidelity: staggered two-line entrance, gray face, muted warm edge, dark extrusion and letter wave; fire and game HUD are generated substitutes.

## Visual anatomy
The upper phrase `MY BLOOD IS` appears near the top, followed a few frames later by `SPICY` at the bottom. Gray letter faces carry a restrained bronze edge, dark heavy extrusion, and soft cast shadow. A growing fireball and pale center flash happen behind the words while the scene takes a controlled punch-in. Each glyph moves vertically with a small phase offset to create the title wave.

| Layer, back to front | Placement | Treatment |
| --- | --- | --- |
| City/gameplay stand-in | Full frame | Gradual punch-in with a short blur pulse. |
| Fire cloud, core, streaks and HUD | Center / edges | Radial expansion and warm flash behind text. |
| `MY BLOOD IS` | Upper margin | Italic Impact-style caps; wave amplitude 6 px. |
| `SPICY` | Lower margin | Matching treatment; wave amplitude 7 px; delayed entrance. |

## Timeline

| Time / frames | Visible event | Motion |
| --- | --- | --- |
| 0–9 / 0.00–0.15 s | Background begins to punch and soften. | Scale 1.00→1.03; initial blur pulse. |
| 9–17 / 0.15–0.28 s | Upper phrase enters with overshoot. | Back-eased scale/opacity. |
| 16–25 / 0.27–0.42 s | `SPICY` follows as the explosion expands. | Second back-eased entrance. |
| 17–49 / 0.28–0.82 s | Fireball spreads; flash falls away and backdrop clears. | Procedural expanding core, cloud and rays. |
| 49–65 / 0.82–1.08 s | Title holds over the last soft frame. | Letter wave continues; background retains a slight blur. |

## Reuse
Mount `BloodSpicy` with local frames. Change phrases and baseline positions in `ImpactWords`; keep glyph wave amplitude small relative to cap height. Use a separate background container so blur never softens the type.

## Evidence and uncertainty
Sampled source frames around 25.55, 25.80, 26.05 and 26.30 s. The exact fire simulation, HUD and typeface are replaced with procedural art and an Impact-compatible system font.

## Verification
Standalone render from the approved comparison revision; lint and TypeScript passed. Gallery preview and poster use the same render.
