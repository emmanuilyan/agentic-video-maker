---
name: remotion-map-shorts-satellite
description: Create or revise vertical Remotion Shorts with satellite map imagery, a camera zoom, darkened surroundings, geographic outlines, region highlights, labels, and captions. Use for 2D satellite map explainers based on a reference clip or script.
---

# Satellite map Shorts in Remotion

Build the shot from a local map plate and vector geometry in the same projection. The [Borneo example](examples/borneo-map/effect.md) recreates a 17-second passage from a [reference Short](https://www.youtube.com/shorts/EZbITnfIsuc). [Watch its rendered preview](assets/previews/borneo-map.mp4).

## Workflow

1. Inspect the subject and visual beats. Record the camera start and endpoint, the moment each geographic feature appears, and any caption or narration cues. Verify place names and boundaries against appropriate geographic sources.
2. Choose imagery and geometry using [map sources and data notes](references/map-sources.md). Record the source, date, projection, bounding box, dimensions, and use conditions. Prepare a local plate before rendering.
3. Project outlines, fills, masks, and geographic markers into the plate's coordinate system. For an EPSG:4326 plate with bounds `[west,south,east,north]`, use `x=(lon-west)/(east-west)*imageWidth` and `y=(north-lat)/(north-south)*imageHeight`. Use the actual forward transform for other projections.
4. Place the plate and geographic layers in one frame-driven camera group. Keep subtitles, title tags, flags, legends, and credits outside that group. Animate with `useCurrentFrame()` and explicit frame ranges.
5. For the Borneo-style reveal, finish the zoom first. Then tint everything outside the island path through a mask and brighten the island detail plate. Draw the island outline above the imagery; reveal political regions after the camera settles. Adapt timing and layer treatment to each new reference.
6. Render stills at the camera endpoint and each reveal, then a full MP4. Check outline registration, plate sharpness, caption readability at phone size, and source credits. Document concrete differences from the reference.

The [Borneo recipe](examples/borneo-map/effect.md) records the projection, layer order, frame timeline, and reusable controls. The example is a visual trial; supply narration and music separately when a finished Short needs them.
