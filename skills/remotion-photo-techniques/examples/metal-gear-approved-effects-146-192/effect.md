# Four approved Maxor effects

Source: Metal Gear Rising review Part1, video41v3L0zCkNY. Approved by user on 2026-10-08 after all four READY in ordinary ChatGPT.

## Common contract
1280×720 demo layer; 60fps deterministic animations using supplied relative frame and duration. The comparison adds original on left and independent Remotion layers on right in2560×720. No source-effect video is used as the effect implementation; title/animal/dialog still artwork and locally reconstructed footage are reference-specific demo assets. Inpainting and held/repeated gameplay are known demo limitations, not reusable techniques. Reuse should accept clean footage and replacement overlay artwork.

## MG_NEON_CHARACTER_TITLE — SamNameplate
- Large angular cyan face with purple/magenta depth. Independent transparent title PNG, measured from source artwork.
- Top-left title enters horizontally from left aroundf10, braking untilf25; bottom italic caption enters later aroundf18–26.
- Background changesf42 while overlay remains, then both leave right; source cleanf50.
- Component uses independentX curves. When adapting, expose title image, bottom caption text/style, enter/hold/exit frames and shared exit curve.
- Current approximation: bottomArialitalic gradient, extracted customtopglyphs. Recoveredmovingbackground includes imperfect masked areas.

## MG_PIXEL_DIALOG_SLIDE — PixelDialog
- Exact pixel artwork separate414×115crop, placed438,566 atstablephase, rendered405×114.
- Enter from below startsf4, travels718→594→566 onf4→8→12; text is already present, revealed only by frame clipping.
- Holds throughf82; scene cut and window disappearf83. No typewriter.
- Reuse with custom pixel artwork or independently drawn frame+pixelfont; start/end positions andscene-cutframe exposed.

## MG_DIAGONAL_CUTOUT_PILEUP — PrehistoricPileup
- FourRGBAcutouts, fixedsize; mammothlower-right, tigerlower-left,rexupper-left,rhinoupper-right.
- First entriesf1/f9/f16/f33. ~5frametranslation from correspondingedge; upperanimalsalso moveverticallydown.
- Scene andall fourcutoutsinsideoneoldscenecontainer. Nextsceneunderneath; diagonalclip advancesupper-left→lower-rightf74–82,cleanf83.
- Reference-specific demo: polygon-derivedalphas, movingbackgroundrecovery64framesthenhold; nextsceneheld. Replacewithcleangameplay andpropersegmentedPNGassets forreuse.

## MG_SPEEDLINE_GLITCH_BURST — SpeedlineGlitch
- Backgroundgameplay, translucentpurplevignette, deterministicedgeSVGlinefield, centralgreen/cyan radialglow, blurredburstpolygonrays, processedmovingfootagepatch, isolatedtwo-linecustomtextartwork.
- Greenstart~f100,textvisible~f104; bothgrowthroughtof182.
- Wholegreen/textoverlayusesradialtransparentholefromf182to192. Edgelineslastf191; puregameplayf192.
- Textwholeblock,nolettertyping. RGBoffset/shapes varydeterministicallyfromframe.
- Reference-specific demo: reconstructed90framefootage repeats; SVGlinepositions/raygeometry approximated; exactnativeparticles/combat not recreated.


Final burst uses preprocessed moving palette texture, opacity .64, a radial soft mask (opaque through45%, partial65%, transparent95%) and blur18px glow at .82 opacity. Black diagonal tears fade within the inner radius. Native particles and specific texture geometry remain approximate. See src/Effects.tsx for exact curves.
