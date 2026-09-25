# Approved Maxor effects from the review session

Five short effects from the approved batch have independently runnable Remotion components in [`src/Effects.tsx`](src/Effects.tsx). The already-approved texture title is documented in [`../texture-zoom-title/effect.md`](../texture-zoom-title/effect.md) and uses [`../../assets/techniques/texture-zoom-title.tsx`](../../assets/techniques/texture-zoom-title.tsx).

All timings below are measured at 60 fps and are relative to the effect segment. Captured plates reproduce the reviewed source composition. Replace them with your own footage for reuse.

| Technique ID | Approx. source interval | Motion recipe | Implementation / demo |
|---|---:|---|---|
| `MAXOR_ELDEN_RING_TITLE` | 0:02.4–0:03.3 | Cream serif title reveals `ELDEN`, dissolves, then quickly resolves to `ELDEN RING`; centered on one line with restrained gold and cyan edge shadows. | `EldenRing`, 54 frames |
| `MAXOR_CAPTION_ZOOM` | 0:03.7–0:04.4 | Two-line condensed caption sits on a clean frame; a hard frame change swaps in the next plate, then the new background pushes forward under the caption. | `DoubleCaption`, 42 frames |
| `MAXOR_BOOMER_FONT_CYCLE` | 0:04.4–0:06.1 | `boomer` arrives first; `band` joins. Both words switch typeface together through four typographic phases, with thick offset red shadows; the whole phrase exits quickly. | `BoomerBand`, 102 frames |
| `TEXTURE_ZOOM_TITLE` | 0:06.9–0:08.1 | `CRASH` builds to `CRASH MY CAR`, animated color texture and narrow glitch slices stay clipped to each glyph, then the title clears as the background zoom-cuts into new footage. | [TextureZoomTitle example](../texture-zoom-title/effect.md) |
| `MAXOR_CYAN_MEME_COLLAGE` | 0:10.0–0:11.05 | Two photos enlarge and push toward each other; the background zooms into new footage, a large cyan Japanese title appears above every layer, and a meme enters as a picture-in-picture insert. | `CyanCardMontage`, 63 frames |
| `MAXOR_DARK_SOULS_OVERLAY` | 0:25.3–0:27.0 | `THE DARK SOULS OF` reveals horizontally; a shifting, translucent video insert covers an irregular area of roughly two-thirds of frame and overlaps the title before the cut. | `DarkSouls`, 102 frames |

The page previews in [`docs/photo-techniques/previews`](../../../../docs/photo-techniques/previews) are the approved Remotion panels from the source comparisons, with the original panel and comparison labels removed. The full gallery is [`docs/photo-techniques/index.html`](../../../../docs/photo-techniques/index.html).
