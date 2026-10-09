# Approved short montage effects,271–293 seconds

## Shared canvas and usage

Base canvas1280×720 at60fps. Components in [src/Effects.tsx](src/Effects.tsx) accept `{frame:number,duration:number}`. Root provides standalone and `-REVIEW` compositions; see [README](README.md) for IDs and exact approved media. Multiply pixel coordinates by outputWidth/1280 when adapting aspect-compatible output. Full-canvas transparent assets store measured layout; replace artwork by role without moving its glyph origin.

## MG_HEADLINE_SUBLINE_EXIT

Layers: cleaned moving demo footage, red two-row headline with black extrusion, small italic subline. Headline occupies approximately x54–480,y30–490; subline x54–550,y650–700. Both enter from left, fading f8–16: x-offsets f9/13/16 =−600/−180/0. Hold until f60. Headline exits f64–72: offsets0,156,310,466,620,775,930,1084,1240. Subline exits f60–68:0,34,122,262,436,630,836,1042,1248. Each is one independently clipped sprite; do not leave the original lettering on the background during exit. Replace `bezos-title.png`, `bezos-subline.png` and `bezos-background.mp4`.

## MG_BRIEF_LOGO_OVERLAY

Cleaned moving footage followed by independent logo/arrow sprite. Bbox approximately x370–900,y245–550, centered slightly right. Scale fixed. Opacity f7/12/22/32=0/1/1/0. Replace `prime-logo.png` and `prime-background.mp4`. The source-specific RGB artwork is rasterized; the supplied sprite freezes its color field rather than calculating a fresh blend against every moving pixel.

## MG_ITALIC_WORD_APPEND

Moving demo background followed by one phrase sprite at lower left. Two states preserve the first word origin: x≈60,y510–675, approximately−4° rotation embedded in artwork. Enter f6–10 with x−460→0 and opacity0→1. Swap short/full at f22 so the encoded comparison shows full phrase alongside the reference at f23. Hold through f43; exit f43–50 by y0→65, scale1→1.14 about(430,600), opacity1→0. Replace `boss-short.png`, `boss-full.png`, `boss-background.mp4`. Original colored fill geometry is rasterized, not an arbitrary-font generator.

## MG_LAYERED_DIAGONAL_EXIT

Order: incoming scene, outgoing cleaned moving footage, train photo, separate animated figure, staged blended phrase. Train and figure opacity f15–22=0→1. Train scale f22–55=1→0.98 about(650,400). Figure uses replaceable full-canvas transparent PNG sequence `assets/figure-frames/022.png` through055.png; clamp frame selection to22–55. Do not mirror the figure. This source sprite sequence reproduces pose variation independently of the train, text and wipe.

Caption artwork masks use Arial Bold158px at(170,285), stages `in`, `in front`, `in front of`, `in front of it` at f15/23/39/45. Caption enters x−210→0 and opacity0→1 through f21. Magenta fill with CSS Difference; cyan drop-shadow at(6,5). Blend is applied above photo and figure, inside the outgoing scene.

Diagonal clipPath: outgoing polygon `(xTop,0),(1280,0),(1280,720),(xTop−605,720)`. xTop at f55–63 =−82,123,330,535,740,945,1152,1358,1564. This reveals the incoming scene from the upper left. Keep text/photo/figure inside this common clip. At f63 switch to clean next-scene source demonstration footage.

## Observations and approximations

Timelines and geometry are measured from dense60fps source frames. Native game camera, explosions, eye glow and scene movement are demonstration footage. Clean backgrounds use inpainting. The hidden train region is reconstructed from visible rail detail. Figure extraction inverts the source Difference caption and cleans remaining contours; edge differences remain. The sprite sequence is a replaceable animated asset, not the entire original effect video. Raster title/logo color fields are static approximations. Audio is omitted. User approved these exact comparisons; preserve them as the visual reference when reusing the recipe.
