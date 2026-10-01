# Five approved Maxor BG3 effects: 73.90–81.85

Approved by the user on 2026-10-01. [Source](https://www.youtube.com/watch?v=I6qlhmjkQ44).

- `MAXOR_RED_EDGE_TITLES` — Красные титры из-за границ кадра, 73.90–74.65; composition `Boss`; [approved preview](previews/MAXOR_RED_EDGE_TITLES.mp4).
- `MAXOR_GROWING_MEME_SWAP` — Растущие мем-карточки и замена, 75.43–76.32; composition `Cards`; [approved preview](previews/MAXOR_GROWING_MEME_SWAP.mp4).
- `MAXOR_STAGED_PERSUASION_GAG` — Двухэтапная комедийная подпись, 77.42–78.65; composition `Speech`; [approved preview](previews/MAXOR_STAGED_PERSUASION_GAG.mp4).
- `MAXOR_RGB_MEME_POSTER` — Постер с RGB-входом, 78.55–79.17; composition `Poster`; [approved preview](previews/MAXOR_RGB_MEME_POSTER.mp4).
- `MAXOR_RED_REACTION_CAPTION` — Красная реплика на смене плана, 81.20–81.85; composition `Behind`; [approved preview](previews/MAXOR_RED_REACTION_CAPTION.mp4).

## Run

```bash
npm ci
npm run setup-font
npm run typecheck
npx remotion render src/index.ts Boss out/new.mp4
```

Impact is locally licensed and excluded from Git/ZIP. Supply it with `npm run setup-font -- /path/to/Impact.ttf`. Anton and its OFL license are bundled as an optional substitute; changing the font changes the result. Other titles use editable colored SVG contour masks extracted from the reference; arbitrary wording requires replacing the mask or matching its typeface.

The previews are cropped from the exact latest comparisons the user approved, including the small review label. They were not replaced with fresh renders. [Recipe](effect.md) documents frame timing and reusable layers; [review](review.md) records the review scope and limits. Reference-specific gameplay/memes are demonstration assets, not general-purpose effect code. Original comparison/reference clips are excluded.
