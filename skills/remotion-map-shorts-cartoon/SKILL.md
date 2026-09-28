---
name: remotion-map-shorts-cartoon
description: Create or revise vertical Remotion map explainers with flat political or satellite maps, moving cameras, highlighted places and regions, labels, and caption beats. Use for map-driven Shorts; use a terrain engine for true 3D flights.
---

# Map-driven Shorts in Remotion

Build a geographic visual story whose map, masks, borders, and labels stay registered while the camera moves. Two runnable examples show different mechanisms:

- [Sweden → Delaware](examples/sweden-delaware/recipe.md): flat political SVG map, zoom and hard cut, point label, and caption beat.
- [Borneo](examples/borneo-map/effect.md): satellite-map passage at 0:00–0:17 of [this reference](https://www.youtube.com/shorts/EZbITnfIsuc), with an island zoom, country boundaries, and an amber region reveal.

Adapt the mechanism to the new subject instead of reusing an example's geography or narration.

## Workflow

1. Inspect the requested reference or script. Note the geographic subject, shot bounds, visual beats, captions, and where the viewer's eye must land. Verify place names and political boundaries against suitable sources, especially when current or disputed.
2. Choose the map mechanism for the shot using [tools and data](references/tools-and-data.md). A flat political map can be projected to SVG; a satellite shot can use a high-resolution local plate and aligned vector geometry. Use a live map engine when its geographic interaction is actually needed.
3. Record the map image source, data date, projection, bounding box, dimensions, and use conditions. Keep provider credits visible in the rendered video when required. Prepare the map plate before rendering; do not make the final render depend on loading remote tiles frame by frame.
4. Transform every geographic layer with the same frame-driven camera. For an equirectangular plate with bounds `[west,south,east,north]`, map a longitude/latitude point to `x=(lon-west)/(east-west)*imageWidth`, `y=(north-lat)/(north-south)*imageHeight`. For another projection, use its actual forward transform instead. Keep raster, outlines, fills, and geographic markers inside one transform group.
5. Keep editorial elements outside that group: subtitles, title tags, flags, legends, and credits. Animate zoom, pan, opacity, and reveals from `useCurrentFrame()` with explicit frame ranges. A mask or path reveals a region; a separate subtle stroke reveals a boundary. Do not bake words or graphics into the source image.
6. Render the start, the camera endpoint, every reveal, and a full MP4. Check outline alignment, tile or image sharpness, typography at phone size, and transitions against the reference. Describe substitutions and remaining differences precisely.

## Borneo style cues

The Borneo demo first zooms toward the island, then tints the surroundings dark while keeping the island bright. Thin pale borders, compact black map labels, short centered white subtitles, and a warm yellow dotted region fill complete the look. The demo implements these as layers in [`MapStory.tsx`](examples/borneo-map/src/MapStory.tsx). Its exact numbers belong to this example; match new reference timing rather than applying them to every map Short.

For a source-specific recipe, include the bounding box and image dimensions, projection formula, layer order, frame timeline, data credits, and a rendered checkpoint. Use the [effect recipe](examples/borneo-map/effect.md) as a concrete model.
