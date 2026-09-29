# TEXT_BLEND_MODES — смешение цвета текста с фоном

Один приём, 28 вариантов смешивания. [Интерактивная таблица](modes.html) показывает один и тот же кадр и титр при одинаковых цвете и прозрачности; можно менять оба параметра и увеличивать выбранный режим. В галерее у приёма одна карточка с [видеопревью Screen](../../assets/previews/TEXT_BLEND_MODES-reference.mp4). Файл исходного ролика в пример не входит; фон для демонстрации взят из уже сохранённого Maxor-примера.

## Запуск

```bash
npm ci
npm run lint
npm run render
npm run render:premiere
```

- `BlendedFillTextDemo`: 1280 × 720, 60 fps, 120 кадров; SVG-оверлей `screen` поверх движущегося изображения. Это тот же рендер, что показан в галерее.
- `BlendModesA` и `BlendModesB`: сетки 17 режимов CSS; контрольный фон в последней ячейке. [Лист A](blend-modes-a.png) · [лист B](blend-modes-b.png).
- `PremiereBlendStillDemo`: одиночный кадр с `linear-dodge`, рассчитанный на Canvas. Для подвижного фона подставляй URL соответствующего кадра в `backgroundSrc`.

Рабочие реализации: [CSS/SVG-оверлей](../../assets/techniques/blended-fill-text.tsx), [режимы и формулы](../../assets/techniques/blend-modes.ts), [Canvas-композитор](../../assets/techniques/premiere-blend-still-text.tsx). [Рецепт](effect.md) объясняет выбор режима и порядок слоёв.
