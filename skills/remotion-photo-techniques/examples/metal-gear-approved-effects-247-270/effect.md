# Four approved effects, 247–270 seconds

Source: https://www.youtube.com/watch?v=41v3L0zCkNY
Native review: 1280×720 at 60 fps. Comparison: 2560×720, original left, independent Remotion layers right.

| Effect | Absolute interval | Transferable technique |
|---|---|---|
| SimpleQuote | 247.900–249.050 | Three-stage italic chromatic quote, hard word additions |
| RoosterInsert | 254.900–255.800 | Two asymmetric cutout images entering from different directions |
| JackedTitle | 258.200–259.600 | Huge two-row chromatic title, fast horizontal entry, later small punchline |
| DimesCaption | 268.800–270.150 | Red phrase assembled by words, recentered at each stage |

Text artwork is isolated PNG alpha, not a replay of the full effect. The demo background is the matching game footage with lettering or photos removed locally. Source-specific blended text is an approximation: the sprite color is sampled from one stable frame, and its mask may not reproduce every background-dependent color variation. Replace artwork for new content.

Rooster masks are local extracted photo cutouts; their entry, hold and hard exit are controlled by Remotion. Native game flashes, Blade Mode and camera movement are demonstration footage, not part of the transferable effect.

The full external review prompt is preserved in chatgpt-review-prompt.txt.

User approved all four on 2026-10-09. Use the exact approved comparisons as the visual reference.

## Frame timelines (60 fps, zero-based)

- `MG_ITALIC_STAGED_QUOTE`: f6 entrance, f11 a little, f29 full quote, f55 hard exit.
- `MG_OPPOSING_CUTOUT_INSERT`: first photo f10–14 slides from x−460 to zero; second f16–20 slides from x+420/y+150 to zero; f38 simultaneous hard exit.
- `MG_RGB_TITLE_PUNCHLINE`: first row f10/12/15/18 at x−1020/−670/−180/0; second f28–31 at x+300→0; small line f44; f64 hard exit. RGB artwork stays static, so subtle background-dependent colors differ from the original.
- `MG_RED_RECENTERED_PHRASE`: Dimes f8, adds 4 f28, full phrase f37, hard exit f68. Each full-canvas artwork state includes its measured centering.

Components accept {frame,duration}. Replace caption artwork and photos by role, preserving geometry and alpha; update the filename references in Effects.tsx. Scale positions from the 1280×720 base canvas for other outputs. Native game camera and VFX are demo footage.
