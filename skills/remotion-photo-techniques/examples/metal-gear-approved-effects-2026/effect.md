# Four approved effects: Metal Gear Rising

Source: [Maxor](https://www.youtube.com/watch?v=41v3L0zCkNY). These four effects were compared against their original source passages and approved by the user. An external ChatGPT frame-by-frame audit marked all 534 frames READY before that approval. Durations and timings below use the 60 fps Remotion compositions.

| Technique ID | Source interval | Demo duration | Recipe |
| --- | ---: | ---: | --- |
| `MG_RED_MOSAIC_REVEAL` | 00:13.0–00:15.4 | 144 frames / 2.4 s | A matrix of red dossier cards settles behind a large center title. Reveal the face separately through the center slot, then fade the cards only near the end. Stagger card imagery so the grid resolves over time. |
| `MG_CRT_SIGNAL_BREAKUP` | 00:17.0–00:18.8 | 108 frames / 1.8 s | A green CRT portrait fills a rectangular display. Broad, soft horizontal signal bands independently shift, brighten, and darken slices of the portrait; dense scanlines and a dark inset vignette complete the display. Keep the scanning line inside the portrait window. |
| `MG_SPLIT_WORDMARK_BUILD` | 01:16.8–01:20.0 | 192 frames / 3.2 s | Assemble a two-row custom wordmark by hard enabling transparent logo layers: `PEDAL` corrects to `METAL`, `GERE` to `GEAR`, `RAISING` to `RISING`, then red fragments expand through `REPEN.` to `REVENGEANCE`. Hold scale and opacity steady during corrections; transition to action footage at the end. |
| `MG_CYAN_NEON_EXIT` | 02:48.0–02:49.5 | 90 frames / 1.5 s | Preserve the source footage’s cyan logo and electric arcs as one synchronized graphic, and move the complete image upward together. Use a restrained, continuous background push so the glow and lettering share the same motion. |

## Implementation and review media

The source-specific comparisons are registered in `src/Root.tsx` and implemented in `src/Composition.tsx`. Their review-ready outputs are 1280×720 per panel, 60 fps. Gallery MP4s are the right-hand Remotion panels from the approved final renders; original/source panels and comparison labels are excluded. Each gallery poster is extracted from its matching standalone gallery MP4.

| ID | Approved comparison render | Gallery preview |
| --- | --- | --- |
| `MG_RED_MOSAIC_REVEAL` | `01-red-mosaic-comparison-v11.mp4` | [MP4](../../../../docs/photo-techniques/previews/MG_RED_MOSAIC_REVEAL.mp4) · [poster](../../../../docs/photo-techniques/posters/MG_RED_MOSAIC_REVEAL.jpg) |
| `MG_CRT_SIGNAL_BREAKUP` | `02-crt-portrait-comparison-v23.mp4` | [MP4](../../../../docs/photo-techniques/previews/MG_CRT_SIGNAL_BREAKUP.mp4) · [poster](../../../../docs/photo-techniques/posters/MG_CRT_SIGNAL_BREAKUP.jpg) |
| `MG_SPLIT_WORDMARK_BUILD` | `03-split-logo-comparison-v12.mp4` | [MP4](../../../../docs/photo-techniques/previews/MG_SPLIT_WORDMARK_BUILD.mp4) · [poster](../../../../docs/photo-techniques/posters/MG_SPLIT_WORDMARK_BUILD.jpg) |
| `MG_CYAN_NEON_EXIT` | `04-cyan-neon-comparison-v17.mp4` | [MP4](../../../../docs/photo-techniques/previews/MG_CYAN_NEON_EXIT.mp4) · [poster](../../../../docs/photo-techniques/posters/MG_CYAN_NEON_EXIT.jpg) |

## Reuse notes

- Treat the plates and extracted logos as reference assets; replace them with the new project’s footage and typography.
- Keep the CRT scanline and distortion layers clipped to the display bounds.
- Build spelling changes from separate word layers or direct asset swaps. Do not introduce opacity or scale animation into the word corrections.
- For the neon exit, move the logo, lightning, and glow as one masked group so their registration remains stable.
