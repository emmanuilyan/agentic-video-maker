# Satellite map sources for video

| Shot | Starting point | Practical constraint |
|---|---|---|
| Fixed 2D satellite or relief zoom | Local plate from [NASA GIBS WMS](https://nasa-gibs.github.io/gibs-api-docs/access-basics/) plus aligned SVG or GeoJSON | Export at the shot's projection and bounds before rendering. Inspect imagery date and attribution. |
| Managed static map | [MapTiler Static Maps](https://docs.maptiler.com/guides/maps-apis/static-maps/static-map-area/) | Requires an API key; check video use terms and attribution. |
| Styled interactive 2D map | [MapLibre GL JS](https://maplibre.org/maplibre-gl-js/docs/examples/) with a suitable imagery provider | A provider and style are separate choices. [Remotion's example](https://github.com/remotion-dev/maplibre-example) shows frame-driven capture. |
| Globe or detailed managed terrain | [Mapbox GL JS](https://docs.mapbox.com/mapbox-gl-js/guides/) | Requires a token and a suitable plan for export. |
| True 3D terrain flight | [Google Earth Studio](https://earth.google.com/studio/docs/) or [CesiumJS camera controls](https://cesium.com/learn/cesiumjs-learn/cesiumjs-camera/) | Use a terrain renderer and check its export conditions; a scaled 2D plate cannot supply perspective. |

[MapTiler's cloud terms](https://www.maptiler.com/terms/cloud/) include video conditions and on-screen attribution unless agreed otherwise. If using OpenStreetMap-based tiles, follow the [OpenStreetMap Foundation attribution guidance](https://osmfoundation.org/wiki/Licence/Attribution_Guidelines) and the tile provider's terms.

## Data in the Borneo example

[NASA GIBS WMS](https://nasa-gibs.github.io/gibs-api-docs/access-basics/) served two `BlueMarble_ShadedRelief_Bathymetry` images in EPSG:4326: a 2160×3840 regional plate with bbox `92,-36,136,42`, and a 2160×2795 detail plate with bbox `105,-10,122,12`. Both are bundled locally. [NASA's imagery guidance](https://esrs.jsc.nasa.gov/Collections/EarthFromSpace/guidelines.htm) asks for an acknowledgement; the video includes one.

The island and country shapes come from [Natural Earth's public-domain 1:10m country polygons](https://www.naturalearthdata.com/about/terms-of-use/), filtered to Borneo and simplified by 0.013°. The YouTube reference was used for visual comparison only; its pixels and audio are not implementation assets.
