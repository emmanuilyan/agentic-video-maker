# Первые два одобренных приёма, 0:00–0:04,23

Запускаемый Remotion-пример для [исходного ролика](https://www.youtube.com/watch?v=I6qlhmjkQ44). Два приёма оформлены как отдельные композиции на 60 fps:

| Композиция | Рецепт | Превью |
| --- | --- | --- |
| `PortraitCard`, 174 кадра | [Дрожащая портретная карточка](portrait-card.effect.md) | [Видео](../../assets/previews/baldurs-gate-portrait-card.mp4) |
| `ThreeBeatTitle`, 81 кадр | [Титр в три появления с общим ударом](three-beat-title.effect.md) | [Видео](../../assets/previews/baldurs-gate-three-beat-title.mp4) |

```bash
npm ci
npm run lint
npx remotion render src/index.ts PortraitCard out/portrait-card.mp4
npx remotion render src/index.ts ThreeBeatTitle out/three-beat-title.mp4
```

Компоненты и их настраиваемые параметры находятся в [`src/effects.tsx`](src/effects.tsx). [`src/demo.tsx`](src/demo.tsx) содержит только примеры сцен. Кадры игрового видео в проект не входят: фон и лицо нарисованы в [`src/artwork.tsx`](src/artwork.tsx). Прозрачный слой рамки в `public/portrait-border.png` выделен из исходного кадра и специфичен для этого ролика; при переносе замените его или включите векторную рамку через `borderSrc=""`.
