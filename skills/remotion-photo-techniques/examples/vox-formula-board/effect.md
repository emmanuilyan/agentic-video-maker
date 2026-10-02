# VOX_FORMULA_BOARD recipe

Source: [Vox Design Short](https://www.youtube.com/shorts/r-lBhuu4sJc), approximately 0:51-0:52.8. The preview is a byte-for-byte copy of the user's approved `formula-draft-v9.mp4` render. The reviewed comparison is `C:\new\artifacts\vox-shorts-r-lBhuu4sJc\formula-compare-three-lines.mp4`.

## Composition

- Canvas: 540x960, 24 fps, 44 frames. Main black board is 540x400 at y=280. Blurred board duplicates extend it above and below.
- Heading `VOX FORMULA` is centered at board y=77. Three white connectors lead to question boxes at x=26, 202 and 378, y=202, each 135x68.
- `black-grunge.svg`, a dark radial gradient, fine diagonal wear, tiny light dots and cycling `dark-dust-0/1/2.png` overlays produce the distressed texture. The three dust frames switch every three video frames.
- The diagonal connectors use SVG turbulence and displacement for rough edges. All three connectors animate with stroke dash offset.

## Timing

| Frames | Event |
|---|---|
| 0-10 | Board and heading fade in. |
| 5-17 | Left connector draws. |
| 9-20 | Center connector draws. |
| 28-38 | Right connector draws. |
| 5-12 | Three boxes fade in with one-frame stagger. |

All interpolation uses cubic Bezier (.22, 1, .36, 1). Keep the third connector: the user explicitly requested it. Copy the four assets from this example's `public/` folder when moving the component. After any visual change, show the new render to the user before replacing the approved preview.
