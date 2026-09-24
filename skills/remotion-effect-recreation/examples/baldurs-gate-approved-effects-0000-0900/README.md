# Одобренные эффекты: 0:00–0:09

Пять секундальных монтажных приемов из [начала видеореференса](https://www.youtube.com/watch?v=I6qlhmjkQ44), собранные в отдельный запускаемый Remotion-проект. Четыре варианта прошли сравнение и пользовательское ревью. В репозитории находятся компоненты и превью на самостоятельно нарисованной графике; исходное видео и его кадры не включены.

```bash
npm ci
npm run lint
npx remotion studio src/index.ts
npx remotion render src/index.ts ApprovedEffectsReel out/approved-effects.mp4
```

Покадровый рецепт — в [effect.md](effect.md), реализация — в [src/approved-effects.tsx](src/approved-effects.tsx) и [src/approved-effects-next.tsx](src/approved-effects-next.tsx), композиции — в [src/ApprovedDemos.tsx](src/ApprovedDemos.tsx). В композициях доступны четыре отдельных эффекта и общий контактный ролик. [Превью](../../assets/previews/baldurs-gate-approved-effects-0000-0900.mp4) показывает их подряд.

Для портретной карточки передавайте свои видео через `portraitContent` и `backgroundContent`. Передача `<Video src={...} muted />` сохраняет движение внутри рамки и в фоновых слоях; SVG по умолчанию нужен только для автономного демо.
