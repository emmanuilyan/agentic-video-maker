# Four approved effects, 146–192 seconds

User approved on 2026-10-08. [ChatGPT review](https://chatgpt.com/c/6ac7603b-6968-83ed-8c2b-8495bff3678d) returned all four READY after sequential-frame review; no playback/audio review.

- `MG_NEON_CHARACTER_TITLE` — Неоновый титр персонажа; component `SamNameplate`.
- `MG_SPEEDLINE_GLITCH_BURST` — Скоростные линии и глитч-вспышка; component `SpeedlineGlitch`.
- `MG_PIXEL_DIALOG_SLIDE` — Пиксельное окно снизу; component `PixelDialog`.
- `MG_DIAGONAL_CUTOUT_PILEUP` — Коллаж с диагональным выходом; component `PrehistoricPileup`.

[Recipe](effect.md). Run `npm install`, then `npx remotion render src/index.ts MG-NEON-CHARACTER-TITLE out/title.mp4`. Add `-REVIEW` for original-left comparison. Demo artwork/background restoration are source-specific; replace public/assets by role for reuse. All animations are independent layers, 1280×720,60fps.

## Approved previews and source intervals

| ID | Source interval | Standalone preview |
|---|---|---|
| `MG_NEON_CHARACTER_TITLE` | 146.650–147.800s | [Preview](../../assets/previews/MG_NEON_CHARACTER_TITLE-reference.mp4) |
| `MG_SPEEDLINE_GLITCH_BURST` | 161.050–164.500s | [Preview](../../assets/previews/MG_SPEEDLINE_GLITCH_BURST-reference.mp4) |
| `MG_PIXEL_DIALOG_SLIDE` | 183.150–184.650s | [Preview](../../assets/previews/MG_PIXEL_DIALOG_SLIDE-reference.mp4) |
| `MG_DIAGONAL_CUTOUT_PILEUP` | 189.850–191.400s | [Preview](../../assets/previews/MG_DIAGONAL_CUTOUT_PILEUP-reference.mp4) |
