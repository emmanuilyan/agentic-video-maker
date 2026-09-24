# Formula RGB Portrait · 10.70–11.60 s

An approved Remotion recreation of the opening portrait push-in from the reference video. The demo artwork is original SVG; no source-video frames are included.

```bash
npm ci
npm run lint
npx remotion studio src/index.ts
npx remotion render src/index.ts FormulaRgbPortraitDemo out/formula-rgb-portrait.mp4
```

The reusable component is [src/FormulaRgbPortrait.tsx](src/FormulaRgbPortrait.tsx), and the timing/layer recipe is [effect.md](effect.md). Replace `paired-portraits.svg` with a still containing two faces and pass the normalized position of the face that should receive the push-in. The tested preview is [formula-rgb-portrait-1070-1160.mp4](../../assets/previews/formula-rgb-portrait-1070-1160.mp4).
