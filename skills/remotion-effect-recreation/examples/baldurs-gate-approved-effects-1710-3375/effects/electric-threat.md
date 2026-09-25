# Electric Threat Card

## Source and result
- Source: [Baldur's Gate video essay](https://www.youtube.com/watch?v=I6qlhmjkQ44), 17.10–18.23 s.
- Output: `ElectricThreat`, 1280×720, 60 fps, 68 frames; gallery render: [`MAXOR_ELECTRIC_THREAT.mp4`](../../../../../docs/photo-techniques/previews/MAXOR_ELECTRIC_THREAT.mp4).
- Implementation: [`ThreatCard`](../src/electric-threat.tsx), standalone composition in [`Root.tsx`](../src/Root.tsx).
- Fidelity: title scale, color edge, pulse, bloom and background push are reproduced; the gameplay scene and asymmetric electric architecture are procedural substitutes.

## Visual anatomy
Two screen-locked uppercase italic lines frame a dark game-like scene. Pale lavender fill, magenta edge and stacked deep-purple shadows give the words shallow extrusion. Irregular violet electrical rails, white sparks, streaks, and a red left-side glow sit behind the title. A hot center-left bloom softens the scene before the background pushes in and regains focus.

| Layer, back to front | Placement | Treatment |
| --- | --- | --- |
| Fantasy gameplay stand-in | Full frame | Animated vector environment; scale and blur together. |
| Red pulse, electric rails, sparks | Right and left edges | Screen blend glow, deterministic seeded points. |
| Vignette and bloom | Full frame | Bloom peaks near the center-left; vignette stays subtle. |
| Two title lines | Top and bottom margins | Fixed to screen; pale fill, purple/magenta stroke and extruded shadows. |

## Timeline

| Time / frames | Visible event | Motion |
| --- | --- | --- |
| 0–17 / 0.00–0.28 s | Both title lines scale up over the electric scene. | Cubic ease-out growth. |
| 17–29 / 0.28–0.48 s | Hold; rails pulse and sparks flicker. | Seeded procedural accents. |
| 29–45 / 0.48–0.75 s | Center-left flash blooms and softens the background. | Opacity peaks at frame 39; text remains crisp. |
| 41–67 / 0.68–1.12 s | Scene punches toward camera and recovers focus. | Scale rises to 1.17; blur eases down then leaves slight residual softness. |

## Reuse
Mount `ThreatCard` with the local composition frame. Replace `FantasyBackdrop` with the target footage, and tune `flash`, `punch`, `blur`, title geometry and color. Keep titles outside the blurred/scaled scene layer so they remain screen-locked.

## Evidence and uncertainty
Boundaries are estimated from dense review samples in the source interval. The preview is a procedural reconstruction, not source footage. The actual game camera motion and irregular electric geometry remain the largest visual differences.

## Verification
Standalone render from the approved comparison revision; lint and TypeScript passed. The gallery MP4 and poster are derived from this same render.
