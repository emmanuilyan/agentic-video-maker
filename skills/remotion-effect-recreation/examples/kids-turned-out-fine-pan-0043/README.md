# CAMERA_PHOTO_PAN — исходная версия для сравнения

Локальный пример горизонтального пролёта камеры по соседним фотографиям. Основан на участке [A$AP Rocky — Kids Turned Out Fine](https://www.youtube.com/watch?v=FUQI-o02JYU), 42.8–45.8 с. Версия v3 одобрена пользователем и сохранена в [remotion-photo-techniques](../../../remotion-photo-techniques/examples/camera-photo-pan/README.md).

```bash
npm install
npm run typecheck
npm run render
```

- `src/LateralPhotoPan.tsx` — переиспользуемый компонент; принимает две или больше фотографий и ключевые позиции виртуальной камеры.
- `src/Demo.tsx` — настройка под пример.
- [Одобренное превью](../../../remotion-photo-techniques/assets/previews/CAMERA_PHOTO_PAN-reference.mp4) — точный Remotion-рендер, показанный пользователю; `out/camera-photo-pan.mp4` — локальная копия.
- `out/comparison-v3.mp4` — оригинал слева, Remotion справа. Папка `out/` локальная и игнорируется Git.
- `effect.md` — рецепт по проверенной версии.

Три JPEG в `public/` извлечены как стоп-кадры из указанного клипа только для визуальной проверки механики. Исходное видео не воспроизводится внутри Remotion-композиции. Для собственного проекта замените `src` фотографий в `src/Demo.tsx`.
