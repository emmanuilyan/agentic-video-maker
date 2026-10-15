# HEAD_PIVOT_PUNCH_ZOOM

Резкий зум на голову, пауза, затем неподвижный титр и поворот фотографии на 180° вокруг головы.

- [Переиспользуемый компонент](../../assets/techniques/head-pivot-punch-zoom.tsx)
- [Рецепт, параметры и речевые метки](effect.md)
- [Точное утверждённое превью v6](../../assets/previews/HEAD_PIVOT_PUNCH_ZOOM-reference.mp4)

```powershell
npm install
npm run typecheck
npm run start
npm run render
```

Запускаемый пример использует собственный схематический SVG, а не фотографию из ролика. Это пример API, он не заменяет утверждённое превью галереи. Для нового кадра укажите `imageSrc`, `sourceSize`, `crop`, `anchor` и речевые метки `zoomStart`/`turnStart`. Координаты `anchor` задаются в пикселях исходного файла до кропа. При переносе на другой FPS пересчитайте длительности в кадрах.
