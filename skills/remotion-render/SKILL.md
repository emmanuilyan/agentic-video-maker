---
name: remotion-render
description: Export a Remotion video
version: 4.0.519
---

## General rendering strategy

Render a video using:

```
npx remotion render
```

Full list of options: https://www.remotion.dev/docs/cli/render.md

Render a still using:

```
npx remotion still
```

Full list of options: https://www.remotion.dev/docs/cli/still.md

## Transparent videos

See [Transparent videos](./transparent-videos.md) for rendering out a video with transparency.

After a requested video render, create one representative PNG still from the final composition and deliver it beside the MP4. Do not render a full video solely to create the PNG; if rendering was not requested, omit it.
