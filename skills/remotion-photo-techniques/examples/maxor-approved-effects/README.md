# Maxor approved effects

Runnable Remotion recreations for six approved effects from the source video: the ELDEN RING title, double caption/zoom, BOOMER BAND font cycle, cyan Japanese-title meme collage, DARK SOULS overlay, and the METAL GEAR RISING wordmark build. The previously approved CRASH texture-to-zoom effect lives in the sibling [`texture-zoom-title`](../texture-zoom-title/README.md) example.

Install dependencies with `npm ci`, then use `npm run lint` or render a composition, for example:

```sh
npx remotion render src/index.ts maxor-cyan-meme-collage out/cyan-collage.mp4
```

The source-specific plates are still frames extracted from the reviewed clip; replace them with the target footage in a new project. The wordmark build is `maxor-metal-gear-wordmark-build` (192 frames, 60 fps).
