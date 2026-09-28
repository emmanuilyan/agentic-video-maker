# Map tools for video

| Need | Good starting point | Why |
|---|---|---|
| Flat political map with fast cuts and colored countries | [D3 Geo](https://d3js.org/d3-geo/projection) + [Natural Earth](https://www.naturalearthdata.com/downloads/) or [world-atlas](https://github.com/topojson/world-atlas) | SVG paths are easy to color, crop, and animate deterministically. Bundled geometry needs no live tile requests. |
| Satellite or relief map with a modest 2D zoom | Local map plate + aligned GeoJSON/SVG; [NASA GIBS WMS](https://nasa-gibs.github.io/gibs-api-docs/access-basics/) is one source | Prepare imagery and vectors at the same projection/bounds before rendering; the final video needs no live tile requests. |
| Roads, labels, rich 2D vector tiles | [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/examples/) | Flexible client renderer; choose a compatible tile and style provider separately. Follow the repo's `remotion-maps` MapLibre technique for frame capture and map readiness. |
| Managed styles and static raster plates | [MapTiler Static Maps](https://docs.maptiler.com/guides/maps-apis/static-maps/static-map-area/) | Simple export for a fixed view. A live API key is required; check its license and attribution before output. |
| Globe and detailed managed map styles | [Mapbox](https://docs.mapbox.com/mapbox-gl-js/guides/) | Useful where styled terrain or buildings justify a managed service. Requires a token and provider terms review. |
| Photoreal terrain flight | [Google Earth Studio](https://earth.google.com/studio/docs/) or the `remotion-maps` Cesium technique | Use when the shot is a camera flight over terrain; Earth Studio is a separate rendering workflow. |

[OpenFreeMap](https://openfreemap.org/quick_start/) offers a no-key vector style for MapLibre; it is not satellite imagery. [Remotion's MapLibre example](https://github.com/remotion-dev/maplibre-example) demonstrates deterministic frame-driven map output. [CesiumJS camera controls](https://cesium.com/learn/cesiumjs-learn/cesiumjs-camera/) support real terrain and perspective flights. [MapTiler cloud terms](https://www.maptiler.com/terms/cloud/) include video conditions and require on-screen attribution unless agreed otherwise.

Natural Earth says its vector and raster data are [public domain](https://www.naturalearthdata.com/about/terms-of-use/). It is a modern general-purpose basemap, so it cannot itself establish historic borders. For a historic claim, use a sourced period geometry or mark only a verified settlement point. In the example, the point near Wilmington denotes the New Sweden area rather than claiming an exact colonial border.

If using OpenStreetMap-based tiles instead, follow the [OpenStreetMap Foundation attribution guidance](https://osmfoundation.org/wiki/Licence/Attribution_Guidelines) for video and confirm any tile provider's own terms.

## Data in the Borneo example

[NASA GIBS WMS](https://nasa-gibs.github.io/gibs-api-docs/access-basics/) served two `BlueMarble_ShadedRelief_Bathymetry` images in EPSG:4326: a 2160×3840 regional plate with bbox `92,-36,136,42`, and a 2160×2795 detail plate with bbox `105,-10,122,12`. Both are bundled locally. [NASA's imagery guidance](https://esrs.jsc.nasa.gov/Collections/EarthFromSpace/guidelines.htm) asks for an acknowledgement; the video includes one.

The island and country shapes come from [Natural Earth's public-domain 1:10m country polygons](https://www.naturalearthdata.com/about/terms-of-use/), filtered to Borneo and simplified by 0.013°. The YouTube reference was used for visual comparison only; its pixels and audio are not implementation assets.
