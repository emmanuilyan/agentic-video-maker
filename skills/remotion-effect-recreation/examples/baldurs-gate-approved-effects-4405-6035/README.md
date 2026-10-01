# Five approved BG3 montage techniques

Approved2026-10-01. Source: [Maxor BG3](https://www.youtube.com/watch?v=I6qlhmjkQ44).

- `MAXOR_POKEMON_CALLOUT` — Pokémon-карточка; preview [MP4](out/MAXOR_POKEMON_CALLOUT.mp4).
- `MAXOR_EXPLOSION_COUNTDOWN` — Отсчёт до взрыва; preview [MP4](out/MAXOR_EXPLOSION_COUNTDOWN.mp4).
- `MAXOR_N64_PIXEL_CAPTION` — Пиксельный N64-титр; preview [MP4](out/MAXOR_N64_PIXEL_CAPTION.mp4).
- `MAXOR_COMIC_FRAME_CAPTIONS` — Комиксная рамка и два титра; preview [MP4](out/MAXOR_COMIC_FRAME_CAPTIONS.mp4).
- `MAXOR_CHARACTER_NAMEPLATES` — Имена персонажей по этапам; preview [MP4](out/MAXOR_CHARACTER_NAMEPLATES.mp4).

## Run

```bash
npm ci
npm run typecheck
npx remotion render src/index.ts Pokemon out/new.mp4
```

Composition IDs: Pokemon, Countdown, N64, Comic, Names. Layout1280×720,60fps. See [effect.md](effect.md) and [src/scenes.tsx](src/scenes.tsx). Preview files are the approved right comparison panels including their small service label, not original footage or an earlier render. Demo assets are replaceable; comic camera uses stills. Glyph assets preserve reference lettering; other text can use supplied glyph contours or a font fallback. Cleaned backgrounds have inpainting artifacts. Pokémon game impact/flash is part of demo footage; panel/text/rails/movement are recreated separately.
