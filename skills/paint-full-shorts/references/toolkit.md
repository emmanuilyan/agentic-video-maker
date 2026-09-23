# Portable Remotion toolkit

The source is in [assets/remotion-toolkit](../assets/remotion-toolkit). It is a copyable TypeScript/React library, with no network calls or additional runtime packages beyond the target Remotion project. `core.ts` is independent of React. `Example.tsx` provides a visual check composition for 1080×1920, 24 fps and 120 frames.

## Install and verify

Run the installer with the skill's real location:

```bash
node /path/to/paint-full-shorts/scripts/install-toolkit.mjs /absolute/remotion-project
node /path/to/paint-full-shorts/scripts/verify-toolkit.mjs /absolute/remotion-project
```

The installer copies into `src/paint-full`. An optional second argument selects another project-relative destination. Existing destinations are refused to preserve project edits. Update an existing copy by reviewing and applying the relevant changes, or install into another directory to compare. The verifier uses the target project's installed TypeScript; run the project's typecheck as well.

## Available building blocks

| Export | Input | Responsibility |
|---|---|---|
| `RetroEditor`, `Toolbar`, `Field`, `Icon` | File name, tool, options, canvas, overlay/footer slots | Portrait retro shell, rulers, tool buttons, 15 vector icons |
| `toolbarPoint` | Tool name and optional button list | Same button center used by the toolbar |
| `CanvasViewport`, `toScreen` | Viewport, pan, zoom | Camera isolated from chrome; document-to-screen contacts |
| `TransparencyGrid` | Tile size, light/dark colors | Checkerboard behind empty or transparent document regions |
| `ToolCursor`, `cursorTrack`, `travel` | Travel/hold/follow segments and pressed state | Deterministic pointer, text, brush and eraser cursors |
| `MarchingAnts` | SVG silhouette and frame | Lasso/magic-wand-style outline |
| `cornerDrag`, `TransformBox`, `handlePoint` | Box, corner, target size and frame interval | Fixed opposite anchor, rotated geometry, eight handles |
| `resizeDimensions`, `resizeAt`, `sizeForRatio` | W/H, aspect lock, frame range, format preset | Linked or independent dimensions; 9:16, 1:1, 16:9, 4:5, 4:3 and custom ratios |
| `CanvasSurface`, `fitDocument`, `contentFit`, `contentPoint` | Document size, fixed workspace, source size and fit mode | Resized document inside a stable editor; consistent content and cursor coordinates |
| `SizePanel`, `sizePanelPoint` | The same W/H, lock, preset and mode | Retro size dialog and deterministic preset-button contacts |
| `BrushMask`, `strokeAt` | Polyline strokes, widths and intervals | Reveal or erase with the cursor and mask on one path |
| `typingAt`, `TypeText` | Text and one reveal frame per grapheme | Stable Unicode typing and a caret at the rendered text end |
| `evaluateDocument`, `findLayer` | Initial layers, edit actions and frame | Select, update, duplicate, reorder, Undo and Redo |
| `LayerStack`, `LayersPanel`, `panelRows`, `layerEyePoint` | The same document state | Matching render/palette order, groups and eye contacts |

## Coordinate contract

Boxes use `x, y, w, h`, with rotation in degrees around the top-left origin. `cornerDrag` keeps the opposite corner fixed even for an already-rotated box. Use its `box` for the object and `TransformBox`; use its `handle` for the cursor. Do not animate their paths separately.

```tsx
const drag = cornerDrag(frame, {
  from: {x: 150, y: 300, w: 220, h: 180, rotation: -12},
  toSize: {w: 400, h: 330}, start: 24, end: 44, corner: 'se',
});
// TransformBox belongs inside the document SVG.
<TransformBox box={drag.box} />
// ToolCursor belongs in screen space.
<ToolCursor point={toScreen(drag.handle, viewport, camera)} pressed={drag.pressed} />
```

Use `cursorTrack` for travel between controls and a `follow` segment during a drag or brush action. Segments are ordered by their start frame, may touch, and must not overlap. Gaps hold the last end pose. All frame calculations are seek-safe.

## Size and proportions

Treat three sizes separately: an object's box, the document canvas, and the Remotion composition. The new helpers resize objects and the inner document; changing a canvas preset does not change the final video's dimensions.

`resizeDimensions(from, change, lockAspect, driver)` accepts pixel W/H. With the lock enabled, one axis drives the other using the original ratio. If both are supplied, width drives by default; set `driver: 'h'` to use height. With the lock disabled, both values are independent. The same options are available on `cornerDrag` and `resizeAt`. To express a percentage, multiply the original dimension by the scale factor before passing it.

```tsx
const next = resizeDimensions({w:400,h:300}, {w:800}, true); // 800×600
const free = resizeDimensions({w:400,h:300}, {w:800,h:250}); // intentional distortion
const square = sizeForRatio('1:1', 1080);
const custom = sizeForRatio({w:2,h:3}, 800); // 800×1200
```

`CanvasSurface` fits a separately sized document into a fixed workspace. Its content retains its original coordinate space; choose how it occupies the resized document:

- `preserve`: keep source pixels at 1:1; reveal extra canvas or clip overflow.
- `contain`: scale uniformly to show all content; unused canvas remains transparent.
- `cover`: scale uniformly to fill the document and clip overflow.
- `stretch`: scale width and height independently.

The normalized `anchor` defaults to `{x:.5,y:.5}`; use `{x:0,y:0}` to keep the top-left corner fixed. Cropping here is non-destructive viewport clipping, not an interactive crop-selection tool. Checkerboard transparency belongs to the actual document rectangle; the surrounding editor workspace is gray.

```tsx
const size = resizeAt(frame, {
  from:{w:720,h:1280}, to:{w:1080,h:1080}, start:24, end:44,
});
<CanvasSurface workspace={{w:862,h:1226}} size={size}
  contentSize={{w:1000,h:1000}} mode="contain">
  {originalArtwork}
</CanvasSurface>
```

For a cursor inside the artwork, apply the same content fit and display fit:

```tsx
const display = fitDocument(size, workspace, padding);
const fit = contentFit(sourceSize, size, mode, anchor);
const cursor = toScreen(contentPoint(localPoint, fit), {
  x:viewport.x+display.box.x, y:viewport.y+display.box.y,
}, {zoom:display.zoom});
```

`SizePanel` displays pixel dimensions, linked/unlinked sides, preset buttons and the fit mode. Use `sizePanelPoint(panelBox, '1:1')` for button contact. It is a timeline-driven visual, like the other editor controls, rather than an interactive form.

Add `size` to the initial `DocumentState`, and use `{at, type:'resize-canvas', size:{w,h}}` to make a committed resize participate in Undo/Redo. For a smooth visual preview, interpolate the frame-local returned state's `size` during the chosen transition. Keep panel values and the canvas bound to that same current size.

## Brush and eraser

`CanvasViewport` and `RetroEditor` enable a checkerboard automatically. Opaque background layers cover it; hidden backgrounds, alpha edges and eraser holes expose it. It stays fixed in the clipped viewport while the document camera moves. It is not a document layer and does not participate in selection, ordering or Undo.

Use `transparency={{tileSize:24,light:'#f3f3f3',dark:'#d2d2d2'}}` to customize it, or `transparency={false}` to omit the display grid. A standalone `TransparencyGrid` fills its positioned parent. The display grid is visible imagery in an editor-style MP4; for a separate asset export with actual alpha, omit the grid and use an alpha-capable format.

`BrushMask` and `MarchingAnts` are SVG children. Supply SVG shapes or an SVG `<image>` inside the mask, rather than HTML `<div>` or Remotion `<Img>`. The stroke is a polyline with arc-length interpolation. Repeated points are supported; the visible trail persists after the gesture. Multiple strokes accumulate.

```tsx
const stroke = {
  points: [{x: 80, y: 240}, {x: 600, y: 240}, {x: 600, y: 350}, {x: 80, y: 350}],
  width: 120, start: 30, end: 65,
};
const brush = strokeAt(frame, stroke);
<svg width={720} height={1000}>
  <BrushMask frame={frame} strokes={[stroke]} bounds={{x:0,y:0,w:720,h:1000}} mode="reveal">
    <image href={staticFile('photo.png')} width={720} height={1000}/>
  </BrushMask>
</svg>
<ToolCursor kind="brush" point={toScreen(brush.tip, viewport)} brushDiameter={stroke.width} />
```

Set `mode="erase"` to remove the covered region. Keep the cursor visible only during the gesture if the scene should have no resting brush. With camera zoom, multiply `brushDiameter` by the camera zoom.

## Layers and history

`DocumentState.layers` is ordered from bottom to top. Group children use the same convention and coordinates relative to their parent. `LayerStack` paints in that order; `LayersPanel` lists the topmost first. Use stable IDs and `contentId` to map image layers to story assets. Groups inherit visibility and opacity from their parent.

```tsx
const document = evaluateDocument(initial, [
  {at: 24, type:'duplicate', id:'hero', newId:'hero-copy', offset:{x:200,y:0}},
  {at: 48, type:'update', id:'background', patch:{visible:false}},
  {at: 72, type:'undo'},
  {at: 96, type:'redo'},
], frame);
<LayerStack document={document} renderLayer={renderStoryLayer}/>
<LayersPanel document={document}/>
```

Duplicate deep-copies group children with new deterministic IDs. `reorder.toIndex` is a bottom-to-top index within the current parent's children. Undo/Redo restore complete document snapshots; selecting a row is not an undoable document edit. A new edit after Undo discards the old redo branch. For smooth motion, evaluate `cornerDrag` and assign the resulting `box` to the returned frame-local layer state; it is detached from the initial state.

Expand a group before asking `layerEyePoint` for a child row. Provide enough palette height for expanded rows. Derive the row click position from the evaluated document after any reorder.

## Scope of this version

The shell defaults to the established 1080×1920 portrait composition. Place it in a full-frame root and use `box-sizing: border-box` for the video. `CanvasSurface` supports changing the inner document's proportions without moving the shell. Redesign chrome coordinates if changing the output video's aspect ratio. Actions are pre-authored for deterministic rendering; this is not an interactive Photoshop implementation.

Selection contours are supplied geometry, not image segmentation. Brush paths are polylines, not pressure-sensitive paint simulation. Reorder stays within one parent; moving a layer into another group is not implemented. Fill, eyedropper, crop, curves and automatic cutout are possible next additions; their toolbar icons alone do not implement those effects.

For the example, register `ToolkitExample` from `./paint-full/Example` as a Remotion composition. Critical frames 0, 36, 66 and 96 cover empty/partial/full masks and the history sequence. Use the same event frames to schedule click and keyboard audio in the host video's audio layer.

`TransparencyExample` from `./paint-full/TransparencyExample` is a silent five-second visual check (1080×1920, 24 fps, 120 frames). Frames 0, 24, 70 and 119 demonstrate the background layer on, the background hidden, an eraser stroke and its persistent transparent result.

`SizingExample` from `./paint-full/SizingExample` demonstrates 9:16 → 1:1 → 16:9 while retaining a round planet using `contain`. Preset contacts are frames 24 and 64; settled sizes are frames 0, 44 and 84. The example is 1080×1920, 24 fps, 120 frames, and intentionally silent.
