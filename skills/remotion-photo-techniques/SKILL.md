---
name: remotion-photo-techniques
description: Use when animating photographs or text in Remotion with grids, zooms, rolling columns, card stacks, collages, photo transitions, kinetic text, yellow marker highlights, transparent outline-only text (TEXT_OUTLINE), color-blended text over footage (TEXT_BLEND_MODES), impact effects, parallax, camera flythroughs, a large glitch title with scrolling/crawling ticker text (GLITCH_TITLE_CRAWL), a moving texture-filled title that zooms into new footage (TEXTURE_ZOOM_TITLE), approved short Maxor effects, or the VOX_FORMULA_BOARD textured infographic with three animated connector lines.
---

# Remotion Photo Techniques

Применяй 30 именованных приёмов монтажа фото и текста в Remotion, включая 8 пространственных сцен с камерой. Сохраняй точные идентификаторы из [каталога](references/techniques.md), чтобы запрос «сделай GRID_ZOOM» однозначно выбирал эффект. Для жёлтого выделения текста по видеореференсу используй [TEXT_HIGHLIGHT](references/text-highlight.md): приём доступен и как отдельный компонент поверх любого кадра.

Для этого приёма есть [запускаемый пример](examples/yellow-highlight/README.md) и [видео-превью](assets/previews/TEXT_HIGHLIGHT-reference.mp4).

Для крупного глитч-титра с ползущим текстом по краям используй отдельный эффект [GLITCH_TITLE_CRAWL](references/techniques.md#standalone-text-effect-glitch_title_crawl). Теги для выбора: **крупный титр**, **ползущий/бегущий текст**, **glitch title**, **crawling ticker**. Компонент [GlitchTitleCrawl](assets/techniques/glitch-title-crawl.tsx) работает как оверлей поверх видео и не входит в четырёхфотный `PhotoTechnique`; смотри [пример](examples/glitch-title-crawl/README.md) и [превью](assets/previews/GLITCH_TITLE_CRAWL-reference.mp4).

Для титра с движущейся текстурой внутри букв и зум-переходом на новый кадр используй отдельный эффект [TEXTURE_ZOOM_TITLE](references/techniques.md#standalone-text-effect-texture_zoom_title). Теги для выбора: **текстура в буквах**, **постепенная смена фразы**, **зум в новое видео**, **moving texture title**. Компонент [TextureZoomTitle](assets/techniques/texture-zoom-title.tsx) работает поверх видео и не входит в `PhotoTechnique`; смотри [пример](examples/texture-zoom-title/README.md), [рецепт](examples/texture-zoom-title/effect.md) и [превью](assets/previews/TEXTURE_ZOOM_TITLE-reference.mp4).

Для текста, у которого виден только контур, а внутри букв просвечивает фон, используй самостоятельный [TEXT_OUTLINE](references/techniques.md#standalone-text-effect-text_outline). Компонент [OutlineOnlyText](assets/techniques/outline-only-text.tsx) открывает надпись слева направо; параметры, [пример](examples/outline-only-text/README.md), [рецепт](examples/outline-only-text/effect.md) и [превью](assets/previews/TEXT_OUTLINE-reference.mp4) доступны отдельно от `PhotoTechnique`.

Когда цвет заливки текста взаимодействует с фоном, используй один приём [TEXT_BLEND_MODES](references/techniques.md#standalone-text-effect-text_blend_modes), а режим выбирай параметром. Для 17 CSS-режимов поверх любого видео бери [BlendedFillText](assets/techniques/blended-fill-text.tsx); 11 дополнительных режимов Premiere реализованы [пиксельным композитором](assets/techniques/premiere-blend-still-text.tsx) для изображения или последовательности кадров. [Рецепт](examples/text-blend-modes/effect.md), [запускаемый пример](examples/text-blend-modes/README.md) и [интерактивное сравнение всех 28 вариантов](examples/text-blend-modes/modes.html) находятся вместе.

For the approved Vox infographic, use [VOX_FORMULA_BOARD](references/techniques.md#standalone-vox-effect-vox_formula_board): distressed black board, heading, three question boxes and **three animated connectors**. Tags: Vox, textured infographic, question boxes, three lines. See the [component](assets/techniques/vox-formula-board.tsx), [runnable example](examples/vox-formula-board/README.md), [recipe](examples/vox-formula-board/effect.md) and [exact approved preview](assets/previews/VOX_FORMULA_BOARD-reference.mp4). Copy all four texture files in the example's `public/` folder with the component.

## Как работать

1. Определи нужный приём, длительность, формат и предоставленные фотографии. Если приём уже назван, сразу используй соответствующую реализацию. Для выбора сравни геометрию в каталоге.
2. Прочитай [интеграцию](references/integration.md) и только нужную строку каталога. Для новых пролётов, орбит, тоннеля, спирали, падения, замершего облёта, фрагментов и комнат используй [3D-сцены](references/spatial.md). В [assets/techniques](assets/techniques/index.tsx) лежит работающая библиотека TypeScript/React. Копируй всю папку и подключай `PhotoTechnique`, либо адаптируй функцию из `layouts.tsx`, `effects.tsx` или `spatial.tsx`.
3. Библиотека — готовые демонстрационные сцены на **четырёх фото**, а не универсальный transition API. Для другой численности или встраивания одной склейки адаптируй выбранный приём по интеграции. `YellowTextHighlight` работает отдельно от фото-демо. Не подменяй входные фотографии ради ограничения примера.
4. Движение вычисляй по локальному кадру. Вложенной сцене явно передавай `durationInFrames`; фиксированный seed сохраняет порядок пикселей и тряску при рендере вразнобой.
5. Отрендери контрольные кадры в начале, во время действия и в конце. Для подборки «один приём — одно превью» создай отдельную composition и отдельный файл на каждый выбранный ID. Объяснение и название держи вне области демонстрации.

## Визуальный контракт

- GRID_ZOOM двигает общий контейнер сетки к центру выбранной ячейки; ZOOM_THROUGH открывает отверстие в передней плоскости; CAMERA_FLYTHROUGH проходит между плоскостями на разных расстояниях.
- MATCH_POSITION требует ручных `anchor` и `faceWidth` для одинакового объекта на каждом исходнике. Перепроверь соседние кадры склейки. Центрирование файлов само по себе не совмещает лица.
- FREEZE_FRAME на неподвижных фотографиях сначала создаёт движение, затем удерживает один и тот же transform и возобновляет движение. Для настоящего видео используй заморозку медиавремени.
- PARALLAX без масок означает движение **целых фотографий** на разных планах. Внутренний параллакс объекта требует подготовленных foreground/background слоёв; не называй приближение плоского JPEG глубиной объекта.
- Новые 3D-сцены используют `ThreeCanvas` с настоящими плоскостями, камерой и перекрытиями. FROZEN_ORBIT замораживает мировые transform объектов, но не камеру. EXPLODED_PHOTO меняет геометрию фрагментов с сохранением их UV; PORTAL_ROOMS оставляет реальный проём в геометрии стены.
- COLLAGE_BUILD сохраняет ранее появившиеся карточки. PAPER_COLLAGE добавляет форму бумаги, неровные края, тени и крепления. PHOTO_WALL и ROLLING_COLUMNS могут повторять исходники по смыслу приёма.
- Проверяй текст после раскрытия маски, включая последнее слово. Для фото со встроенными надписями выбирай `contain`, а намеренные крупные планы оценивай отдельно.
- TEXT_HIGHLIGHT раскрывает жёлтые полосы позади неподвижного текста; нижняя строка стартует позже верхней. Используй отдельный компонент для точного наложения на существующую сцену.

Демо по умолчанию: 6 секунд, 30 fps, 16:9, без звука. Это параметры примера, не ограничения пользовательских роликов. Готовый skill не требует конкретных фото, абсолютных путей или дополнительного генератора изображений.

## Approved BG3 batch44–60seconds

Use [five approved montage examples](../remotion-effect-recreation/examples/baldurs-gate-approved-effects-4405-6035/README.md) for `MAXOR_POKEMON_CALLOUT`, `MAXOR_EXPLOSION_COUNTDOWN`, `MAXOR_N64_PIXEL_CAPTION`, `MAXOR_COMIC_FRAME_CAPTIONS`, and `MAXOR_CHARACTER_NAMEPLATES`. Recipes, independent layers and the exact approved previews are included.
