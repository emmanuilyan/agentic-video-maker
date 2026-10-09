# Five approved non-text Maxor examples, 341.45–367.90 s

Status: USER APPROVED on 2026-10-09. Exact approved renders in out/.

Source: https://www.youtube.com/watch?v=I6qlhmjkQ44 . Audio omitted.

Original on LEFT, independent Remotion animation on RIGHT in review/*-comparison.mp4.

## Run

npm ci
npm run typecheck
npx remotion render src/index.tsx CircleReveal out/01-circle-reveal.mp4

Other compositions and frame counts are in candidates.json. All are 1280×720, 60 fps. Use the compositions listed in candidates.json to render the other examples.

## Mechanisms and source limits

1. CircleReveal, 341.45–341.95: incoming kitchen plate clipped by a circle centered at50%/50%, radius grows55px/frame fromf3–10, then43px/frame; green/purple treatment fades to natural color. Independent SVG title above both plates. Kitchen region repaired beneath former title; gameplay frozen.
2. FramedProducts,349.00–349.70: three independent ornament frames and transparent packshots; scale entrances f6/f14/f22; frame dimensions275×266,282×236,298×266. Titles enterf22/f32. Frame raster pixels copied from source; occluded frame corners and can pixels may contain overlap artifacts. Background frozen.
3. NeonHero,355.40–356.30: hardcutf5, full-scene overshoot and blur/RGB entrance to f12; independent metallic-gradient title and can with shrink/rotation beatf26 and return growth to1.08 byf33; exitf49. IMPORTANT: green/purple grading and eye/cup light are inherited static source imagery, not independently recreated. Broad inpainting beneath title/can is approximate.
4. ProductCascade,356.30–356.80: five transparent product layers stagedf1/f7/f12/f17/f22; growing overlapping diagonal layout. Native gameplay frozen. Source packshots copied as static masks, timing and transforms rebuilt.
5. WebSpotlight,366.70–367.90: hardcutf1 to scrollable page, fixed caption and header, peripheral focus; measured content translations f1:-360,f5:-303,f9:-183,f14:-121,f19:-121,f24:-76,f29:-4,f34:0. Product switchf38 with transition blur settling f41, slight zoom, printed-product pose swapf61. Reference page raster retains peripheral source blur; vignette lifting/restitching and caption repair approximate. This demonstrates independent page movement and switches, not independently reconstructed webpage design.

## Review

All228 consecutive comparison frames are supplied in review/*-all-*.jpg, larger checkpoints in *-sheet.jpg. Scope sent to ordinary ChatGPT explicitly separates inherited source treatments from rebuilt animation. Actual v3 verdict: all five READY for user review. Evidence in review/verdict-v3.md and review/chatgpt-final-review.png. Reviewer used consecutive frames, not realtime playback. User approved all five on 2026-10-09.

## Reuse

Import components from `src/effects.tsx`. All measurements below are in a 1280×720 viewport at60fps; scale positions by width/1280 and height/720 for other sizes.

| ID | Component | Layer order and parameters |
|---|---|---|
| MAXOR_CIRCLE_REVEAL | CircleReveal | Old plate → circle-clipped incoming plate and fading hue layer → independent title. Props revealFrame=3,speed=55. Radius afterf10 uses43px/frame. |
| MAXOR_FRAMED_PRODUCTS | FramedProducts | Frozen game plate → titles → three independent jar/frame pairs. Card centers218/201,346/357,254/533. Entrancesf6/14/22 grow.62→1 over6frames. |
| MAXOR_NEON_PROMO_CUT | NeonHero | Lead plate → inherited processed hero plate → RGB entrance echo → editable gradient title → independent can. f5cut,f12settle,f26shrink,f33return,f49exit. |
| MAXOR_PRODUCT_CASCADE | ProductCascade | Frozen game plate → five transparent product images in appearance order. gap prop defaults5frames; first startsf1,nextf7/12/17/22. Each grows.7→1 over9frames. |
| MAXOR_WEBPAGE_SPOTLIGHT | WebSpotlight | Scrollable page → fixed header → vignette → fixed caption. switchFrame prop38. One document, independent scrollpause, page switch/blur, zoom, printed-product pose swap. |

The current demos use reference-specific staticFile assets. To reuse with other footage replace the plate/packshot/frame files or adapt their paths in the components; preserve transparent masks and layer order. Native lighting, grading, source blur and repaired pixels are explicitly bounded above; these examples do not supply an independent implementation of those inherited treatments.

```tsx
import {CircleReveal,ProductCascade,WebSpotlight} from './src/effects';
// Inside a 1280×720,60fps Remotion composition:
<CircleReveal revealFrame={3} speed={55}/>
// Alternative compositions:
<ProductCascade gap={5}/>
<WebSpotlight switchFrame={38}/>
```

Validation: all five rendered successfully; TypeScript typecheck passed. Comparisons and standalone outputs verified with ffprobe for dimensions,60fps and30/42/54/30/72 frames. Independent ChatGPT v3 inspected consecutive frames and passed all five, with small residual can-size difference atf30. Realtime playback was not reviewed by ChatGPT. User approved the exact comparisons and their right-hand renders.
