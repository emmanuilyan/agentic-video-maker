# CC_LENS

Одобренная адаптация сферической линзы из [Shorts SonduckFilm](https://www.youtube.com/shorts/8pl2qxO3Uoc), 20–23 с. Графика заменена собственными SVG, искажение мягче оригинала.

```sh
npm install
npm run typecheck
npm run studio
npm run render
```

Композиция `CCLens`: 506×700, 30 FPS, 90 кадров. [Рецепт](effect.md), [компонент](../../assets/techniques/lens-warp.tsx), [одобренное превью](../../assets/previews/CC_LENS-reference.mp4).

```tsx
import {LensWarp} from './assets/techniques/lens-warp';

<LensWarp src={staticFile('photo.jpg')} durationInFrames={90} intensity={1} />
```

Для фото с тем же соотношением сторон используйте изображение на весь кадр. Это эффект одного изображения; два исходника можно сменить в момент раскрытия линзы. Пример разделяет фон и белый заголовок после раскрытия; точные параметры находятся в рецепте.
