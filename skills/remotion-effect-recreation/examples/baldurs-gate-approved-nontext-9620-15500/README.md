# Пять утверждённых нетекстовых эффектов Maxor

Пользователь утвердил 2026-10-07 последние сравнения: оригинал слева / Remotion справа. [Источник](https://www.youtube.com/watch?v=I6qlhmjkQ44). Превью ниже — точные утверждённые правые половины, без повторного рендера.

- `MAXOR_CUTOUT_CARD_SWAP` — Смена мем-вставки; 96.20–97.50 с, `Swap`, 78 кадров. [Превью](previews/MAXOR_CUTOUT_CARD_SWAP.mp4). Рост вырезанного мема и мгновенная замена рамкой и портретом.
- `MAXOR_PAIRED_IMAGE_GROWTH` — Две растущие карточки; 108.00–109.05 с, `Pair`, 63 кадров. [Превью](previews/MAXOR_PAIRED_IMAGE_GROWTH.mp4). Независимое появление двух карточек с удержанием первой.
- `MAXOR_HAND_COLLAGE_RGB` — Коллаж на ладони с RGB-входом; 136.65–138.05 с, `Hand`, 84 кадров. [Превью](previews/MAXOR_HAND_COLLAGE_RGB.mp4). RGB-разъезд, shake и последовательное перекрытие мем-карточек. Фон и надпись заморожены.
- `MAXOR_IMPACT_CAMERA_ZOOM` — Ударный зум; 151.55–153.05 с, `Impact`, 90 кадров. [Превью](previews/MAXOR_IMPACT_CAMERA_ZOOM.mp4). Ударное приближение, удержание и возврат. Фаза игрового взрыва заморожена.
- `MAXOR_BLOCK_FRAME_DEGRADATION` — Блочная деградация кадра; 153.80–155.00 с, `Blocks`, 72 кадров. [Превью](previews/MAXOR_BLOCK_FRAME_DEGRADATION.mp4). Зелёная блочная порча изображения и резкий выход. Визуальная имитация без повреждения кодека.

## Запуск

```bash
npm ci
npm run typecheck
npx remotion render src/index.tsx Swap out/new.mp4 --concurrency=2
```

1280×720,60fps,без звука. [Рецепт](effect.md), [компоненты](src/effects.tsx), [границы проверки](review.md). Игровые материалы и растровые карточки заменяемые; авторская анимация карточек, RGB, камера и блоки описаны отдельно.
