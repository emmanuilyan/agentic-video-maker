# Four approved effects from Maxor’s Metal Gear Rising passage

Standalone recreation comps from the user-approved review batch for [Maxor’s video](https://www.youtube.com/watch?v=41v3L0zCkNY). Each comparison composition is 1280×720 per panel at 60 fps. Source and clean plates are in `public/`; replace them when adapting the effect.

Install dependencies with `npm install`, then render a comparison:

```sh
npx remotion render src/index.ts RedMosaicReview out/red-mosaic.mp4
npx remotion render src/index.ts CrtPortraitReview out/crt-portrait.mp4
npx remotion render src/index.ts SplitLogoReview out/split-logo.mp4
npx remotion render src/index.ts CyanNeonReview out/cyan-neon.mp4
```

These compositions are the reviewed side-by-side demonstrations. The skill gallery and preview assets use only the approved Remotion panel, cropped from the same final comparison render, with a poster frame taken from that cropped MP4.

See [`effect.md`](effect.md) for source intervals, recipes, timing, and evidence. Implementations are in [`src/Composition.tsx`](src/Composition.tsx); registrations and frame counts are in [`src/Root.tsx`](src/Root.tsx).
