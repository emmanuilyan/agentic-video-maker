# Sweden → Delaware map beat

Reference: [HistoryShorts YouTube Short](https://youtube.com/shorts/FscKLyXUwC8), inspected at 0:00–0:10. Source frames show a tight dark-blue Sweden map, a wider Nordic view, meme cutouts over the map, thick white captions, and a cut to the Delaware coast around 0:08. The example translates those generic mechanics using a new sailboat sticker and new wording.

The example renders 9 seconds at 1080×1920, 30 fps. `src/flat-map.tsx` projects local Natural Earth/`world-atlas` data to SVG. `src/sweden-delaware.tsx` defines the camera and caption beats:

| Frames | View | Graphic beat |
|---|---|---|
| 0–59 | Close Sweden | Slow ease out, ship sticker enters |
| 60–209 | Wider Scandinavia | Sweden remains dark blue; short captions change |
| 210–269 | Delaware coast | Hard cut to coast; point and New Sweden label |

The palette is ocean `#a9c4d9`, land `#e0e9e9`, highlight `#07558a`, and yellow marker `#ffcd3c`. Captions use bold italic white with an 8 px dark outline. The caption zone begins at 1320/1920 of the frame height.

The New Sweden marker is a point near Wilmington at `[-75.55, 39.75]`. The [Delaware Public Archives](https://archives.delaware.gov/delaware-historical-markers/fort-christina/) and [National Park Service](https://www.nps.gov/places/fort-christina.htm) place the colony's 1638 landing and Fort Christina at present-day Wilmington. The point is intentionally approximate because the bundled modern country dataset has no seventeenth-century colonial boundaries. Replace it with sourced historical geometry if a border depiction is needed.

Run `npm install`, `npm run check`, then `npm run render` from this folder. `npm run still` produces a representative PNG. The [checked video](../../assets/previews/sweden-delaware.mp4) and [still](../../assets/previews/sweden-delaware.png) are bundled with the skill. The example requires no map key and no external media. It is a visual-only test; add a licensed narration and sound track to make a finished Short.
