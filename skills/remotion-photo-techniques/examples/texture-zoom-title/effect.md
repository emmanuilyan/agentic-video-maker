# TEXTURE_ZOOM_TITLE — moving texture title with zoom transition

## Source and result

- Source: [YouTube reference](https://www.youtube.com/watch?v=kO9HmhwGzXs), approximately 6.9–8.1 s.
- Output: `texture-zoom-title`, 1280×720, 60 fps, 72 frames (1.2 s).
- Implementation: [`TextureZoomTitle`](../../assets/techniques/texture-zoom-title.tsx) and [demo composition](src/Composition.tsx).
- Preview: [`TEXTURE_ZOOM_TITLE-reference.mp4`](../../assets/previews/TEXTURE_ZOOM_TITLE-reference.mp4).
- Fidelity: staged phrase, moving multicolor texture clipped into glyphs, short letter-local glitches, and a zoom crossfade to new footage. Demo scenery is synthetic; the source video and its extracted frames are not included.

## Visual anatomy

The title changes in stages while a color texture moves inside the letter shapes. Narrow glitch slices shift individual glyphs briefly. After the complete phrase holds for a few frames, the title fades as the outgoing shot pushes toward the viewer and crossfades to an incoming shot that also scales up.

| Layer, back to front | Content | Position/size | Blend/mask/style |
| --- | --- | --- | --- |
| Incoming footage | Next video or scene | Full canvas | Crossfade in; scale from 0.92 through 1.34 |
| Outgoing footage | Current video or scene | Full canvas | Crossfade out; scale from 1 to about 1.85 |
| Edge vignette | Subtle center-to-edge darkening | Full canvas | Radial gradient; fades with outgoing shot |
| Staged title | `CRASH` → `CRASH MY` → `CRASH MY CAR` | Centered, about 9–18% canvas height | Moving texture clipped to glyphs; short colored slices stay inside each glyph |
| Impact streak | One low-opacity diagonal | Full canvas | Screen blend, frame-driven drift |

## Timeline

| Time / frames | Visible event | Animated properties | Easing or formula |
| --- | --- | --- | --- |
| 0.00–0.37 s / 0–22 | `CRASH` appears and holds | Scale 0.82→1; texture begins to move | Clamped interpolation; texture position advances from local frame |
| 0.37–0.62 s / 22–37 | Phrase extends to `CRASH MY` then `CRASH MY CAR` | Old and new phrases briefly dissolve across stages | 4-frame cross-dissolve at each stage |
| 0.62–0.72 s / 37–43 | Full phrase holds; moving texture and brief glyph-local slices remain | Texture offsets, streak and slight title pulse | Deterministic functions of local frame and glyph index |
| 0.72–1.02 s / 43–61 | Zoom transition replaces the original shot with the next | Outgoing scale reaches about 1.85; incoming reaches about 1.34; title fades | Clamped linear ramps over 18 frames |
| 1.02–1.20 s / 61–72 | New footage holds cleanly | Incoming scene settles | End hold |

## Reusable controls

`TextureZoomTitle` accepts `outgoing` and `incoming` React nodes, a `texture` URL, ordered `stages` (`frame` and `text`), `accent`, `titleColor`, `fontSize`, `titleTop`, `transitionStart`, and `transitionDuration`. Pass `OffthreadVideo` elements for moving footage or scene compositions for a self-contained demo. Keep stages sorted by local frame.

```tsx
<TextureZoomTitle
  outgoing={<OffthreadVideo src={beforeSrc} muted />}
  incoming={<OffthreadVideo src={afterSrc} muted />}
  texture={staticFile("moving-texture.svg")}
  stages={[
    {frame: 0, text: "CRASH"},
    {frame: 22, text: "CRASH MY"},
    {frame: 37, text: "CRASH MY CAR"},
  ]}
  transitionStart={43}
  transitionDuration={18}
/>
```

## Evidence and uncertainty

The source interval 6.9–8.1 s was checked frame by frame. The phrase builds from `CRASH` through `CRASH MY` to `CRASH MY CAR`; the background changes after the full title and the cut carries a zoom. Exact font metrics and source footage are specific to the reference. The packaged demo uses a synthetic car scene and an authored moving texture so it runs without the copyrighted source clip.

## Verification

Rendered and reviewed in Remotion at 60 fps, including each text-stage boundary, the beginning and midpoint of the zoom, and the settled incoming scene. The user approved this effect for saving after paired review. The latest source comparison found the Remotion word changes slightly faster than the reference while placing the video transition in the same final phase.
