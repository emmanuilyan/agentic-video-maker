# Four approved effects from 00:50–01:10

Source: [Maxor's Metal Gear Rising video](https://www.youtube.com/watch?v=41v3L0zCkNY), 1280×720 at 60 fps. The user approved the exact comparison MP4s linked in [README.md](README.md). All local frame numbers below start at zero in the corresponding standalone composition. The compositions include context frames so the visual cut can be judged. Code: [Effects.tsx](src/Effects.tsx); composition registration: [Root.tsx](src/Root.tsx).

## `MG_GUITAR_ROCK_TITLE` — гитара и цветной рок-титр

**Tags:** guitar entrance, multicolor title, RGB contours, image and text drift, scale dissolve. **Source:** 00:50.750–00:51.900. **Length:** 69 frames / 1.150 s. [Approved comparison](review/GuitarRock-v9.mp4), [clean preview](../../assets/previews/MG_GUITAR_ROCK_TITLE-reference.mp4).

Layer order: next gameplay plate; outgoing gameplay plate with slight blur; feathered explosion; dark blue edge treatment; transparent guitar cutout; three offset SVG text copies. The guitar moves independently from the title. The two words occupy separate measured spans, retaining a visible gap. The moving blue/green SVG fill, displaced magenta and green contours, small turbulence distortion and 3.5 px morphology erosion reproduce the thin luminous strokes. The blue edge treatment is approximate because its source attribution is uncertain.

| Local frames | Motion |
| --- | --- |
| 0–3 | Previous gameplay context. |
| 4–20 | Guitar flies from lower left to center; title rises into the bottom of frame. Explosion begins at frame 9. |
| 21–56 | Guitar and title drift by small measured offsets over the held explosion. |
| 57–64 | Outgoing layers grow toward 1.38× and dissolve through several density keyframes; next plate becomes clear at frame 64. |
| 65–68 | Next plate holds. |

Use `GuitarRock` with a replacement `text` prop for the title; replace `guitar.png`, the two gameplay plates and explosion with assets of the same role. Its frame mapping uses `t = frame + 225` and measured `interpolate` keyframes. Keep the guitar, title and explosion fades separate because their densities differ during the cut.

## `MG_TOONTOWN_ARTICLE_COLLAGE` — логотип и въезд статей

**Tags:** logo scale, photo collage, staggered article cards, right-edge slides. **Source:** 00:52.967–00:54.533. **Length:** 94 frames / 1.567 s. [Approved comparison](review/ArticleCollage-v6.mp4), [clean preview](../../assets/previews/MG_TOONTOWN_ARTICLE_COLLAGE-reference.mp4).

Layer order: gameplay background; central clean photo and caption; masked orange logo and separate white script; three independently timed article strips. The logo scales from 1.25 through 0.937 to 1.0, then gently grows to 1.026. Its alpha mask removes stray parts of the extracted artwork so the background stays clear outside the logo. The photo is reconstructed without baked-in article text, preventing doubled cards.

| Local frames | Motion |
| --- | --- |
| 0–2 | Previous scene remains visible; hard cut to new background at frame 3. |
| 3–9 | Logo appears and shrinks to its resting scale. |
| 34–46 | Center photo/caption reveal. Top, middle and bottom strips begin at frames 34, 37 and 38, then enter from the right on separate tracks. Each is fully hidden before its own start. |
| 47–90 | Assembled collage holds with a slow scale increase. |
| 91–93 | Hard cut to next plate. |

Use `ArticleCollage` as a layout recipe: replace the masked logo, photo and strips, then update the three cards' `x/y/w/h` and entry windows in `Effects.tsx`. Its frame mapping uses `t = frame + 358`. The hard visibility gate on each strip matters as much as its slide curve.

## `MG_FALLING_ABOVE_40` — падение слоёв и допись числа

**Tags:** falling cutouts, independent affine motion, blade, blood accent, stepped title, dissolve. **Source:** 00:55.533–00:57.117. **Length:** 95 frames / 1.583 s. [Approved comparison](review/FallingPhoto-v5.mp4), [clean preview](../../assets/previews/MG_FALLING_ABOVE_40-reference.mp4).

Layer order: next gameplay plate; outgoing room; separate person and laptop cutouts; one vector blade; centered title; blood accent. The person and laptop follow different affine matrices, so both can rotate and descend without becoming one flat plate. The blade is one SVG shape whose points interpolate continuously between its early and late position; there is no crossfade between duplicate blades. The room group enlarges while its opacity decreases over the new plate.

| Local frames | Motion |
| --- | --- |
| 0–2 | Previous scene context. |
| 3–8 | Room appears; blade enters from the left and blood accent reaches full density. |
| 25–41 | Person, laptop and blade fall and rotate; the blade advances with the fall rather than lagging above the face. |
| 39, 53 | `ABOVE` appears, then becomes `ABOVE 40` on frame 53. |
| 81–90 | Room collage scales from 1.0 to 1.3 and progressively dissolves; next plate is readable by frame 85. |
| 90–94 | Next plate alone. |

`FallingPhoto` exposes `firstWord` and `secondWord`; replace the person, laptop, room, blood and next-plate assets to adapt it. It maps `t = frame + 512`. Key arrays `personKeys` and `personMatrices`, and the laptop matrix keys, control the distinct trajectories.

## `MG_OVAL_MEME_CAPTIONS` — овальная вставка и встречные подписи

**Tags:** feathered picture insert, top and bottom caption, bob, scale dissolve. **Source:** 01:08.967–01:09.883. **Length:** 55 frames / 0.917 s. [Approved comparison](review/SoftMeme-v9.mp4), [clean preview](../../assets/previews/MG_OVAL_MEME_CAPTIONS-reference.mp4).

Layer order: next gameplay plate; fading outgoing gameplay plate; feathered oval image; two white Impact captions with dark outline. The oval grows from 0.7 to 1.0 and holds while the captions enter from the upper and lower edges. The group bobs by a few pixels. Its image and lettering have separate exit opacity curves, which keeps the picture readable through the beginning of the transition.

| Local frames | Motion |
| --- | --- |
| 0–2 | Previous context. |
| 3–10 | Oval scales in. Captions remain hidden until frame 10. |
| 10–15 | Top and bottom `MEMES.` captions enter from opposite edges. |
| 16–41 | Image and captions hold with small vertical bob. |
| 42–50 | Old background, oval and captions dissolve on their own curves; oval is dense through frame 42 and gone at frame 50. |
| 50–54 | Next plate alone. |

`SoftMeme` accepts replacement `text`. Replace `meme-picture.png` with a feathered transparent cutout, the two gameplay plates, and optionally `Impact.ttf`. It maps `t = frame + 1318`. The captions are gated by frame rather than opacity alone to avoid a flash before entry.

## Porting the effects

All transforms are deterministic from the local frame and assets. The supplied assets are reference-specific; for other projects, retain each layer's role and relative timing, then adjust pixel coordinates proportionally from the 1280×720 canvas. Use new source footage and typography where appropriate. The provided review clips include original footage for comparison; the gallery previews contain only the effect render.
