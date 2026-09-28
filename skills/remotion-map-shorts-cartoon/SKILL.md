---
name: remotion-map-shorts-cartoon
description: Create or revise vertical Remotion Shorts with flat political maps, moving cameras, colored countries, place labels, and caption beats. Use for illustrated 2D map explainers.
---

# Map-driven Shorts in Remotion

Build a geographic visual story whose map shapes, borders, and labels stay registered while the camera moves. A runnable example shows the mechanism:

- [Sweden → Delaware](examples/sweden-delaware/recipe.md): flat political SVG map, zoom and hard cut, point label, and caption beat.

Adapt the mechanism to the new subject instead of reusing an example's geography or narration.

## Workflow

1. Inspect the requested reference or script. Note the geographic subject, shot bounds, visual beats, captions, and where the viewer's eye must land. Verify place names and political boundaries against suitable sources, especially when current or disputed.
2. Choose the map data and projection using [tools and data](references/tools-and-data.md). Project country polygons to SVG; use a live map engine when its geographic interaction is needed.
3. Record the map image source, data date, projection, bounding box, dimensions, and use conditions. Keep provider credits visible in the rendered video when required. Prepare the map plate before rendering; do not make the final render depend on loading remote tiles frame by frame.
4. Transform every geographic layer with the same frame-driven camera. Keep SVG land shapes, outlines, fills, and geographic markers inside one transform group.
5. Keep editorial elements outside that group: subtitles, title tags, flags, legends, and credits. Animate zoom, pan, opacity, and reveals from `useCurrentFrame()` with explicit frame ranges. A mask or path reveals a region; a separate subtle stroke reveals a boundary. Do not bake words or graphics into the source image.
6. Render the start, the camera endpoint, every reveal, and a full MP4. Check border alignment, typography at phone size, and transitions against the reference. Describe substitutions and remaining differences precisely.

For a source-specific recipe, include the projection, layer order, frame timeline, data credits, and a rendered checkpoint. Use the [Sweden → Delaware recipe](examples/sweden-delaware/recipe.md) as a concrete model.
