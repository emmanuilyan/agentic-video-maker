# Approved Maxor effects from the review session

Six short effects from the approved batch have independently runnable Remotion components in [`src/Effects.tsx`](src/Effects.tsx). The already-approved texture title is documented in [`../texture-zoom-title/effect.md`](../texture-zoom-title/effect.md) and uses [`../../assets/techniques/texture-zoom-title.tsx`](../../assets/techniques/texture-zoom-title.tsx).

All timings below are measured at 60 fps and are relative to the effect segment. Captured plates reproduce the reviewed source composition. Replace them with your own footage for reuse.

| Technique ID | Approx. source interval | Motion recipe | Implementation / demo |
|---|---:|---|---|
| `MAXOR_ELDEN_RING_TITLE` | 0:02.4–0:03.3 | Cream serif title reveals `ELDEN`, dissolves, then quickly resolves to `ELDEN RING`; centered on one line with restrained gold and cyan edge shadows. | `EldenRing`, 54 frames |
| `MAXOR_CAPTION_ZOOM` | 0:03.7–0:04.4 | Two-line condensed caption sits on a clean frame; a hard frame change swaps in the next plate, then the new background pushes forward under the caption. | `DoubleCaption`, 42 frames |
| `MAXOR_BOOMER_FONT_CYCLE` | 0:04.4–0:06.1 | `boomer` arrives first; `band` joins. Both words switch typeface together through four typographic phases, with thick offset red shadows; the whole phrase exits quickly. | `BoomerBand`, 102 frames |
| `TEXTURE_ZOOM_TITLE` | 0:06.9–0:08.1 | `CRASH` builds to `CRASH MY CAR`, animated color texture and narrow glitch slices stay clipped to each glyph, then the title clears as the background zoom-cuts into new footage. | [TextureZoomTitle example](../texture-zoom-title/effect.md) |
| `MAXOR_CYAN_MEME_COLLAGE` | 0:10.0–0:11.05 | Two photos enlarge and push toward each other; the background zooms into new footage, a large cyan Japanese title appears above every layer, and a meme enters as a picture-in-picture insert. | `CyanCardMontage`, 63 frames |
| `MAXOR_DARK_SOULS_OVERLAY` | 0:25.3–0:27.0 | `THE DARK SOULS OF` reveals horizontally; a shifting, translucent video insert covers an irregular area of roughly two-thirds of frame and overlaps the title before the cut. | `DarkSouls`, 102 frames |
| `MAXOR_METAL_GEAR_WORDMARK_BUILD` | 1:16.8–1:20.0 | Four-color logo assembles in two rows. The center and right words briefly show `GERE` and `RAISING`, then correct; the lower word changes from `REPEN.` to `REVENGEANCE` without a fade or scale-up. | `MetalGearWordmarkBuild`, 192 frames |

## MAXOR_METAL_GEAR_WORDMARK_BUILD

### Source and result
- Source: [Maxor video](https://www.youtube.com/watch?v=41v3L0zCkNY), 1:16.8–1:20.0.
- Output: `maxor-metal-gear-wordmark-build`, 1280×720, 60 fps, 192 frames (3.2 seconds).
- Implementation: [`src/Effects.tsx`](src/Effects.tsx) exports `WordmarkBuild` and the source-specific `MetalGearWordmarkBuild` demo; [`src/Root.tsx`](src/Root.tsx) registers the composition.
- Preview: [standalone MP4](../../assets/previews/MAXOR_METAL_GEAR_WORDMARK_BUILD-reference.mp4); the gallery uses the same render and its poster.
- Fidelity: preserves the approved positions, colors, outlines, and hard word corrections. The sunset/gameplay plate is a cleaned still from the same passage; font fallback is Impact/Arial Black.

### Visual anatomy

The logo is four separate text layers over a full-frame sunset plate. `METAL` sits at the upper left in yellow, `GEAR` is centered in cyan italic, and `RISING` sits to its right in magenta italic. A red `REVENGEANCE` is centered below. The intermediate spellings change in place at fixed scale and opacity, so the corrections feel like deliberate type swaps instead of fades.

| Layer, back to front | Content | Position/size in normalized canvas coordinates | Blend/mask/style |
| --- | --- | --- | --- |
| Plate | Clean gameplay/sunset still | Full canvas `(0, 0, 1, 1)` | Cover; warm source footage |
| Upper-left | `METAL` | Left `.039`, top `.181`; font size `.208H` | Yellow, 3 px dark stroke, hard offset shadow |
| Upper-center | `GERE → GEAR` | Center x `.5`, top `.178`; box width `.375W`; font size `.208H` | Cyan italic, centered, dark stroke and shadow |
| Upper-right | `RAISING → RISING` | Left `.744`, top `.181`; font size `.169H` | Magenta italic, dark stroke and shadow |
| Lower | `REPEN. → REVENGEANCE` | Center x `.5`, top `.5`; font size `.225H` | Red, 4 px dark stroke and offset shadow |

### Timeline

| Time / frames | Visible event | Animated properties | Easing or formula |
| --- | --- | --- | --- |
| 0 / 0 | `METAL` is visible | No movement | Static |
| 0.20 s / 12 | `GERE` appears in the upper center | Hard layer enable | Cut |
| 0.40 s / 24 | `GERE` becomes `GEAR` | Text content only | Hard swap |
| 0.42 s / 25 | `RAISING` appears at upper right | Hard layer enable | Cut |
| 0.63 s / 38 | `RAISING` becomes `RISING` | Text content only | Hard swap |
| 0.87 s / 52 | `REPEN.` appears centered below | Hard layer enable | Cut |
| 1.20 s / 72 | `REPEN.` becomes `REVENGEANCE` | Text content only | Hard swap |
| 1.20–3.20 s / 72–191 | Full logo holds | Static | No easing |

### Reusable controls

`WordmarkBuild` accepts the local frame plus the four phrase parts, their intermediate spellings, and the frame for each entrance or correction. Defaults reproduce this approved Maxor example at 60 fps. Replace the strings, frame values, and plate to adapt the timing to another logo; the fixed color positions can be changed in the component styles.

### Reconstruction

1. Place a clean full-frame plate behind the text.
2. Render each word independently so each can use its own color, font size, italic style, outline, and shadow.
3. Center the `GEAR` wrapper in a fixed-width top-row box; center the lower phrase over the full canvas.
4. Use hard frame gates for entrances and direct text swaps for each correction. Keep transform and opacity constant.

Exact timings, styles, and the demo entry point are in [`src/Effects.tsx`](src/Effects.tsx) and [`src/Root.tsx`](src/Root.tsx).

### Evidence and uncertainty

The source passage and approved comparison establish the word order, relative alignment, color roles, and hard corrections. Pixel positions and typeface details are estimates from the 1280×720 recreation; Impact with Arial Black fallback is a substitute for the source's custom lettering.

### Verification

Rendered as a 192-frame standalone 1280×720 MP4 at 60 fps. The downloadable preview and Maxor gallery card use this render; the gallery poster was extracted from that same MP4.

The page previews in [`docs/photo-techniques/previews`](../../../../docs/photo-techniques/previews) are standalone approved Remotion renders, with the original panel and comparison labels removed. The full gallery is [`docs/photo-techniques/index.html`](../../../../docs/photo-techniques/index.html).

Four approved Baldur's Gate effects from a later review batch are documented with standalone compositions and recipes in [`remotion-effect-recreation/examples/baldurs-gate-approved-effects-1710-3375`](../../../remotion-effect-recreation/examples/baldurs-gate-approved-effects-1710-3375/README.md). Their MAXOR cards are in the same gallery category; each card uses a standalone render and a poster extracted from that exact render.
