# Five effects from SonduckFilm Shorts

Status: all five effects approved by the user on 2026-10-01. Source: https://www.youtube.com/shorts/8pl2qxO3Uoc. Source and compositions are 360×640 at 30 FPS. The original tutorial UI, captions, and After Effects badge are editorial overlays and are omitted from the recreated effect layers.

## Tested entry points

- [Reusable components](../../assets/techniques/shorts-five-effects.tsx)
- [Reference-specific demos](src/Demos.tsx)
- [Composition registration](src/Root.tsx)
- [All five previews](../../assets/previews/SHORTS_FIVE_EFFECTS-reference.mp4)
- The original-versus-Remotion comparison was reviewed before approval; original footage is not bundled.

Every frame is computed deterministically from the Remotion frame and props. The implementations generate the effect rather than playing the reference video.

## 1. Echo — source 3.00–5.00 seconds

Observed: a stationary white ECHO title, subtle red contour background, and repeated tiny DUPLICATE labels circulating around the perimeter. The central title briefly shrinks. These are delayed states of one moving label, not duplicate central titles.

Layer order: black/red contours → delayed perimeter labels and dots → central title. Labels follow a rectangle from x=32 to 328, y=28 to 606, with orientation following its sides. The demo uses ten samples, 146 frames apart, at 1.2 pixels per frame. Each sample calls `renderAt(frame - age * delayFrames)`; opacity is `decay ** age`. The central title scales from 1.27 to 1 over frames 11–16 with smoothstep. Sample spacing and contour shapes are visual estimates.

Reusable API: `Echo({renderAt, copies, delayFrames, decay, frame})`. Keep stationary artwork outside Echo; place only the animated layer inside `renderAt`. Standalone composition: `Echo`, 60 frames.

## 2. Glow — source 8.00–10.00 seconds

Observed: three green outlined ROTARY words and hollow circular separators rotate around a ring, with a bright inner edge and broad soft halo.

Layer order: black → broad glow → medium glow → tight glow → crisp outlined artwork. Demo circle center=(180,320), baseline radius=130; text size=38, green=#55ff36. Rotation is 0.75 degrees per frame. Glow uses blurred copies at 26, 8, and 1.5 pixels with opacity 0.16, 0.45, and 0.8, plus an unblurred copy. CSS screen blending preserves the neon appearance. Rotation phase, exact font, and blur falloff are estimates.

Reusable API: `Glow({children, radii, strength})`; the demo defaults to three radii. Standalone composition: `Glow`, 60 frames.

## 3. CC Lens — source 17.00–19.50 seconds

Observed: the entire TOP 5 / EFFECTS graphic bends into a sphere, including the white title. At the rim, the folded image produces repeated white title fragments. The sphere rapidly expands back into the flat graphic.

The synthetic SVG artwork is rendered into `public/lens-artwork.png` and sampled by a WebGL shader. It is not an extracted source frame. Aspect-correct radial distance is `length(vec2((u-.5)*aspect,v-.5))`. Within radius R, q=distance/R and fold=`sqrt(max(0,1-q*q))`. UV coordinates fold toward anchor=(.5,.466); amount blends this mapping with the unchanged image. Outside the sphere is black. sRGB conversion preserves artwork brightness.

Timeline: frames 0–34 flat artwork; 35–38 peak sphere at radius .48; frames 38–44 radius expands by 2.4; frames 40–44 amount falls to zero using smoothstep. This is a visual recreation, not Adobe's proprietary CC Lens implementation. Background typography, font, and rim curvature differ from the original.

Reusable API: `CCLens({src, radius, amount})`, where radius is measured relative to composition height. Render the full layer stack into the input texture so text and background bend together. Standalone composition: `Lens`, 75 frames.

## 4. CC Pixel Polly — source 25.40–28.40 seconds

Observed: three black BREAK rows on white; principally the B breaks into small triangular shards, while REAK remains readable. The rows have separate start times and trajectories; small fragments also leave the K edge.

Layer order: white → masked intact text → moving triangular portions of the same text image. Row baselines are 166,346,526. B regions start at x=49, width=55, height=59, y=111/291/471. Start frames are 16/3/9. A 6-pixel strip at x=307 supplies the K-edge shards. Cell size=7; each cell becomes two triangles. Clip paths cut actual pixels from `public/break-artwork.png`.

Per-shard deterministic launch delays span 18 frames. Position is velocity*time plus vertical acceleration `direction*32*time²`; rotation and cosine thinning suggest tumbling. Shards fade between 2.8 and 3.5 seconds after their launch. Particle velocities, gravity, and seed are estimates; their exact paths differ from the source.

Reusable API: `PixelPolly({src,width,height,regions,cell,seed,frame})`. Regions carry x/y/width/height/start/direction. Standalone composition: `PixelPolly`, 90 frames.

## 5. Motion Tile — source 34.20–35.20 seconds

Observed: full-screen rows of hollow white STORIES text scroll continuously on black, without an exposed edge or reset.

Each cell is 360×50; glyph font size=53, text width=350, stroke=1.15. The demo scrolls at -1.7 pixels per frame. Offsets use positive modulo of frame*speed; enough cells are drawn beyond every edge to fill the composition throughout the motion. Font and exact scroll speed are estimates.

Reusable API: `MotionTile({children,tileWidth,tileHeight,speedX,speedY,mirror,frame})`. Standalone composition: `MotionTile`, 60 frames. The comparison uses only the clean first second before the reference switches to tutorial UI.

## Verification and reproduction

`npm run typecheck` passed. All five standalone compositions and the 345-frame overview rendered successfully with Remotion 4.0.527 and `--gl=angle`. Matched comparison clips were generated and representative frames inspected for layout, color, effect extrema, and particle masks.

Run `npm run studio` for interactive inspection or `npm run render` for the overview. Render an individual example with `npx remotion render src/index.ts Echo out/Echo.mp4 --gl=angle`, substituting the composition ID.

Run `npm install` before using the example on another machine. The generated artwork is bundled; the downloaded original is not.
