# Five approved Maxor BG3 caption effects: 83.10–92.85

Approved by the user on 2026-10-07 after viewing ORIGINAL-left / REBUILD-right comparisons. [Source](https://www.youtube.com/watch?v=I6qlhmjkQ44). These are approved approximate rebuilds, not exact restoration of the lost original renders.

- `MAXOR_GROWING_MEME_CAPTION` — Растущая мем-подпись; source 83.10–84.02; composition `Leaves`, 55 frames. [Exact approved preview](previews/MAXOR_GROWING_MEME_CAPTION.mp4).
- `MAXOR_DETONATE_CAPTION` — Растущая подпись detonates; source 86.62–87.22; composition `Detonate`, 36 frames. [Exact approved preview](previews/MAXOR_DETONATE_CAPTION.mp4).
- `MAXOR_NECROMANCY_CAPTION` — Подпись некромантии в скобках; source 88.25–88.85; composition `Necro`, 36 frames. [Exact approved preview](previews/MAXOR_NECROMANCY_CAPTION.mp4).
- `MAXOR_TWO_STAGE_METALLIC_CAST` — Двухэтапные металлические титры; source 88.73–90.02; composition `Cast`, 77 frames. [Exact approved preview](previews/MAXOR_TWO_STAGE_METALLIC_CAST.mp4).
- `MAXOR_DIALOGUE_ESCALATION` — Диалог и усиление very badly; source 89.95–92.85; composition `Dialogue`, 174 frames. [Exact approved preview](previews/MAXOR_DIALOGUE_ESCALATION.mp4).

## Run

```bash
npm ci
npm run setup-font -- /path/to/Impact.ttf
npm run typecheck
npx remotion render src/index.tsx Leaves out/new.mp4 --concurrency=1
```

Impact is a locally licensed font excluded from Git; supply your own licensed file. Georgia is a platform font and must be available for dialogue. Substitution changes letter shapes. The bundled gameplay is an earlier demonstration shot cropped to remove an old patch; it is not the original 83–93 second footage. Previews are byte-identical to the approved v4 right-hand videos and are not fresh renders. See [recipe](effect.md) and [review scope](review.md).
