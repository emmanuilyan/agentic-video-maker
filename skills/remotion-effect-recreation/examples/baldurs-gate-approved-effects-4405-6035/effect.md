# Five approved Maxor BG3 techniques

Source: [Maxor BG3](https://www.youtube.com/watch?v=I6qlhmjkQ44). User approved2026-10-01: comparisons01/02/04/05 v8 and03 v12. Gallery MP4s are their exact right1280×720 panels, including the small service label. All animation timelines below use local zero-based frames at60fps. [Implementation](src/scenes.tsx), [compositions](src/root.tsx), [review history](review.md).

## MAXOR_POKEMON_CALLOUT —44.05–45.57

91frames. Layer order: replaceable cleaned game video, patterned white side rails, moving dialog, two caption lines. Demo footage retains original game flash/RGB; these baked pixels are not claimed as newly implemented effects. Dialog and captions are recreated layers.

Panel x350,y565,width575,height103 (normalized.273,.785,.449,.143),turquoise#5ba8ae,red#df392b border4px/side15px,radius14px,depth5×6px#4d0c21. White rails80px atx0/1200 with four large clipped gray Pokéballs. VT32337px atx386,y574; white fill,2px teal depth. Font is a visual candidate.

Panel startsf6; both linesf8; rails fadef13–20. Measured panel y offsets atf6/7/8/9/10/11/12/13/14/15/17/20/24:55/52/56/43/35/21/12/12/8/6/4/2/−1px. Brief horizontal jerk peaks−34px atf8 then+9pxf11, settles0f20. Scale.883→1 with1.015 overshoot, origin50%86%. Blur6→0px, skew−8→0deg throughf21. Previous small white subtitle exists beforef6.

`PokemonScene` accepts backgroundSrc and two caption lines. Replace demo footage without altering animation. [Approved preview](out/MAXOR_POKEMON_CALLOUT.mp4).

## MAXOR_EXPLOSION_COUNTDOWN —45.55–47.15

96frames. Cleaned video below independently rendered title and warm screen glow. Impact53px,y540 (normalized.75height),centered,yellow#f4f86a,magenta7px#a00061 stroke,dark depth3×4px. Scale f5–8:.17→.94,cubic-out; X factor1.05. Title opacity0→1,holds throughf78 then.82f95. Title blur beginsf55,reaches4pxf67,7pxf95. Background scales1→1.09,blur0→6px late. Screen glow risesf80 then falls.

`CountdownScene` accepts backgroundSrc and text. Game light partly belongs to source-derived footage. [Approved preview](out/MAXOR_EXPLOSION_COUNTDOWN.mp4).

## MAXOR_N64_PIXEL_CAPTION —47.75–49.15

84frames. Independent glyph canvas x270,y520,740×120 (normalized.211,.722,.578,.167) over cleaned moving footage. No caption beforef4; removed fromf75 exactly with next-shot cut.

f4–13: actual glyph ink density produces narrow opaque gold/pink cells. Spans500/650/700px and heights42/84/96px atf4/8/13;48→64columns,1→3rows.20% of cell width remains transparent; lower cells below.24 ink density are disabled. Word spaces remain clear, upper high-density cells create rises. No separate wave behind already readable text.

f14–20: independent SVG contours resolve through nearest sampling80→144columns and6→24rows. Source-specific n64-glyphs.svg preserves exact step-shaped lettering; gold gradient, pink3px edge and lower gold depth5px. It contains no game background. Glyph/Font loads are awaited with delayRender/continueRender. `PixelImpactCaption` accepts text,glyphAsset,endFrame(default75). For a different phrase supply transparent SVG contours or use Pixelify Sans fallback; no claim that the original font was identified.

[Approved preview](out/MAXOR_N64_PIXEL_CAPTION.mp4).

## MAXOR_COMIC_FRAME_CAPTIONS —51.45–52.85

84frames. Initial source game blast belongs to replaceable demo footage, first2frames. Clean wide stillf2–23,full-frame second still fromf24,screen-fixed transparent border on top. Camera crop uses scales1/2/4.3/6.7 atf24/35/50/83,origin51%50%; no black inset. It is a still-based camera recreation, so acting and sharpness differ from live reference.

Top IGNORE WOMEN startsf46; bottom BOTTOM TEXT f61. Both `ComicCaption` layers scale.08→1 over7frames cubic-out, X factor1.6,skew−10deg. Anton76px (candidate),centered,top16/bottom580. Green/cyan→blue gradient,2px blue edge,multiple blue depth shadows and yellow glow. Text,start,bottom props allow independent reuse. Border is replaceable raster asset.

[Approved preview](out/MAXOR_COMIC_FRAME_CAPTIONS.mp4).

## MAXOR_CHARACTER_NAMEPLATES —57.10–60.35

195frames. Clean moving character UI is a replaceable demo video; its camera motion is baked in. Name,text stages and inserted meme are independent overlays.

ASTARION startsf30,scale.25→1 byf37,cubic-out; Times New Roman144px,y520,cream#f8ede0 with red depth. Meme entersf75–81,scale.7→1,x190,y80,290×400. Character change then THEf104,THE DARKf122,THE DARK URGEf147. Each stage separately grows.7→1 over10frames,cubic-out. Gothic glyphs use three independent transparent SVG contours atx0,y440,1280×240,origin50%60%,magenta#d51985,purple depth/glow. Arbitrary phrases require their own SVG contours or a font fallback. Overlay hidesf193; next shot appears in full state.

[Approved preview](out/MAXOR_CHARACTER_NAMEPLATES.mp4).

## Verification and demo assets

Exact latest comparisons reviewed independently in ordinary ChatGPT, complete sequential contact sheets plus large details; reviewer did not use real-time playback. User approved five playable comparisons. TypeScript passes for this runnable example. Gameplay, frame, meme and glyph assets are source-specific demonstration materials; replace them for production. Cleaned backplates can show inpainting artifacts. Fonts VT323,Anton,Pixelify Sans include OFL files; Impact/Times New Roman depend on host availability.

```tsx
<PokemonScene backgroundSrc="my-game.mp4" lines={["PLAYER used","NEW SPELL"]}/>
<CountdownScene backgroundSrc="my-game.mp4" text="3 turns left"/>
<PixelImpactCaption text="NEW PIXEL QUOTE" glyphAsset="my-glyphs.svg" endFrame={90}/>
<ComicCaption text="TOP CAPTION" start={46}/>
```
