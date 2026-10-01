# Five approved Maxor BG3 effects

Approved by the user on 2026-10-01. [Source](https://www.youtube.com/watch?v=I6qlhmjkQ44).

- `MAXOR_SQUID_STAGED_CARD` — Поэтапный Squid-титр с рамкой, 60.20–62.40; composition `Squid`; [approved preview](previews/MAXOR_SQUID_STAGED_CARD.mp4).
- `MAXOR_HUMAN_CLASSIFICATION` — Нарастающий HUMAN-титр, 64.10–65.20; composition `Human`; [approved preview](previews/MAXOR_HUMAN_CLASSIFICATION.mp4).
- `MAXOR_METALLIC_RIZZ_TITLE` — Металлический титр и приближение, 67.20–69.20; composition `Rizz`; [approved preview](previews/MAXOR_METALLIC_RIZZ_TITLE.mp4).
- `MAXOR_PRONOUN_CARDS` — Карточки и растущие THEY / THEM, 69.20–70.00; composition `Pronouns`; [approved preview](previews/MAXOR_PRONOUN_CARDS.mp4).
- `MAXOR_DIFFERENCE_MEME_STACK` — Мемные титры со смешением цветов, 71.60–73.10; composition `Meme`; [approved preview](previews/MAXOR_DIFFERENCE_MEME_STACK.mp4).

## Run

```bash
npm ci
npm run setup-font
npm run typecheck
npx remotion render src/index.ts Squid out/new.mp4
```

For systems without Impact, pass a locally licensed font file to `npm run setup-font -- /path/to/Impact.ttf`. The proprietary font is excluded from Git and archives. Anton is bundled with its OFL license; substituting it changes typography. These previews are exact approved right panels, including the small review label. Re-rendering requires the local font setup. Read [effect.md](effect.md) for reusable layers, timing and asset limits.
