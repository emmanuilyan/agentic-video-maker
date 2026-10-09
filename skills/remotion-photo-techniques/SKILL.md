---
name: remotion-photo-techniques
description: Use when animating photographs or text in Remotion with grids, zooms, rolling columns, card stacks, collages, photo transitions, kinetic text, yellow marker highlights, transparent outline-only text (TEXT_OUTLINE), color-blended text over footage (TEXT_BLEND_MODES), impact effects, parallax, camera flythroughs, a large glitch title with scrolling/crawling ticker text (GLITCH_TITLE_CRAWL), a moving texture-filled title that zooms into new footage (TEXTURE_ZOOM_TITLE), or approved short Maxor effects.
---

# Remotion Photo Techniques

Применяй 30 именованных приёмов монтажа фото и текста в Remotion, включая 8 пространственных сцен с камерой. Сохраняй точные идентификаторы из [каталога](references/techniques.md), чтобы запрос «сделай GRID_ZOOM» однозначно выбирал эффект. Для жёлтого выделения текста по видеореференсу используй [TEXT_HIGHLIGHT](references/text-highlight.md): приём доступен и как отдельный компонент поверх любого кадра.

Для этого приёма есть [запускаемый пример](examples/yellow-highlight/README.md) и [видео-превью](assets/previews/TEXT_HIGHLIGHT-reference.mp4).

Для крупного глитч-титра с ползущим текстом по краям используй отдельный эффект [GLITCH_TITLE_CRAWL](references/techniques.md#standalone-text-effect-glitch_title_crawl). Теги для выбора: **крупный титр**, **ползущий/бегущий текст**, **glitch title**, **crawling ticker**. Компонент [GlitchTitleCrawl](assets/techniques/glitch-title-crawl.tsx) работает как оверлей поверх видео и не входит в четырёхфотный `PhotoTechnique`; смотри [пример](examples/glitch-title-crawl/README.md) и [превью](assets/previews/GLITCH_TITLE_CRAWL-reference.mp4).

Для титра с движущейся текстурой внутри букв и зум-переходом на новый кадр используй отдельный эффект [TEXTURE_ZOOM_TITLE](references/techniques.md#standalone-text-effect-texture_zoom_title). Теги для выбора: **текстура в буквах**, **постепенная смена фразы**, **зум в новое видео**, **moving texture title**. Компонент [TextureZoomTitle](assets/techniques/texture-zoom-title.tsx) работает поверх видео и не входит в `PhotoTechnique`; смотри [пример](examples/texture-zoom-title/README.md), [рецепт](examples/texture-zoom-title/effect.md) и [превью](assets/previews/TEXTURE_ZOOM_TITLE-reference.mp4).

Для текста, у которого виден только контур, а внутри букв просвечивает фон, используй самостоятельный [TEXT_OUTLINE](references/techniques.md#standalone-text-effect-text_outline). Компонент [OutlineOnlyText](assets/techniques/outline-only-text.tsx) открывает надпись слева направо; параметры, [пример](examples/outline-only-text/README.md), [рецепт](examples/outline-only-text/effect.md) и [превью](assets/previews/TEXT_OUTLINE-reference.mp4) доступны отдельно от `PhotoTechnique`.

Когда цвет заливки текста взаимодействует с фоном, используй один приём [TEXT_BLEND_MODES](references/techniques.md#standalone-text-effect-text_blend_modes), а режим выбирай параметром. Для 17 CSS-режимов поверх любого видео бери [BlendedFillText](assets/techniques/blended-fill-text.tsx); 11 дополнительных режимов Premiere реализованы [пиксельным композитором](assets/techniques/premiere-blend-still-text.tsx) для изображения или последовательности кадров. [Рецепт](examples/text-blend-modes/effect.md), [запускаемый пример](examples/text-blend-modes/README.md) и [интерактивное сравнение всех 28 вариантов](examples/text-blend-modes/modes.html) находятся вместе.

Для утверждённых коротких приёмов из видео Maxor смотри [MAXOR examples](examples/maxor-approved-effects/effect.md): поэтапный титр ELDEN RING, двухстрочная подпись с зумом, синхронный цикл шрифтов BOOMER BAND, коллаж с циановым японским титром поверх мем-вставки, видеооверлей THE DARK SOULS и сборка логотипа METAL GEAR RISING с поэтапным исправлением слов. Ещё четыре утверждённых приёма из Baldur's Gate 3 собраны в [следующем наборе](../remotion-effect-recreation/examples/baldurs-gate-approved-effects-1710-3375/README.md): электрический ударный титр, двухэтапная подпись D&D, волнистый титр MY BLOOD IS / SPICY и две игровые плашки с мемами. `TEXTURE_ZOOM_TITLE` также показан в первой подборке и имеет отдельную компонентную реализацию. В галерее эффекты собраны по фильтру **Maxor**. После пользовательского апрува прикрепляй к карточке галереи именно последний Remotion-рендер из сравнения, который получил апрув: этот MP4 должен воспроизводиться на странице, а постер нужно сделать из того же рендера. Не используй исходный клип, двухпанельное сравнение или устаревший черновик. Если рендер менялся после апрува, снова покажи его пользователю. После добавления проверь карточку и воспроизведение в категории **Maxor**.

`MAXOR_DICE_GLITCH_QUOTE` — утверждённая [глитч-цитата с настоящим падением d20](../remotion-effect-recreation/examples/baldurs-gate-dice-glitch-fall-4105/README.md). Используй её, когда нужен короткий RGB-смаз игровой сцены, две полосы фрагментов, затем пиксельная двухстрочная надпись с удержанием до завершения броска. Параметры и точные кадры — в [рецепте](../remotion-effect-recreation/examples/baldurs-gate-dice-glitch-fall-4105/effect.md); [превью](assets/previews/MAXOR_DICE_GLITCH_QUOTE-reference.mp4).

Шесть следующих утверждённых приёмов собраны в [запускаемом примере](examples/maxor-batch7-effects/README.md) и [рецептах](examples/maxor-batch7-effects/effect.md): `MAXOR_SKYRIM_BLENDED_TITLE` (крупный титр смешивается с фоном и исчезает по буквам), `MAXOR_SPEED_DISCLAIMER_WIPE` (подпись уходит влево под световым проходом), `MAXOR_JAPAN_MAP_CALLOUT` (единый силуэт Японии поверх всех вставок), `MAXOR_EASTERN_EUROPE_SCALE` (растущая карта и дописываемое сравнение с Африкой), `MAXOR_RGB_BLOCK_GLITCH` (RGB-блоки, глитч букв, зум и цветокоррекция), `MAXOR_MARGIT_FRAME_TITLE` (светлая рамка, выгнутый жёлтый титр и тонкая нижняя подпись). Каждый эффект короче трёх секунд; выбирай конкретный рецепт по визуальному приёму.

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

## Approved BG3 batch60–73seconds

Use [five approved examples](../remotion-effect-recreation/examples/baldurs-gate-approved-effects-6020-7310/README.md) for `MAXOR_SQUID_STAGED_CARD`, `MAXOR_HUMAN_CLASSIFICATION`, `MAXOR_METALLIC_RIZZ_TITLE`, `MAXOR_PRONOUN_CARDS`, and `MAXOR_DIFFERENCE_MEME_STACK`. The recipe includes exact stage/cut timing and a tested TEXT_BLEND_MODES variant with separate blended-fill and normal-outline SVG layers.


## Approved BG3 batch73–82seconds

Use [five approved examples](../remotion-effect-recreation/examples/baldurs-gate-approved-effects-7390-8185/README.md) for `MAXOR_RED_EDGE_TITLES`, `MAXOR_GROWING_MEME_SWAP`, `MAXOR_STAGED_PERSUASION_GAG`, `MAXOR_RGB_MEME_POSTER`, and `MAXOR_RED_REACTION_CAPTION`. Includes frame timelines, independent overlays, RGB/blur/shake implementation and exact approved previews. Distinguish native gameplay from author layers as described in the recipe.

## Approved BG3 captions83–93seconds

Use [five approved approximate caption examples](../remotion-effect-recreation/examples/baldurs-gate-approved-effects-8310-9285/README.md) for `MAXOR_GROWING_MEME_CAPTION`, `MAXOR_DETONATE_CAPTION`, `MAXOR_NECROMANCY_CAPTION`, `MAXOR_TWO_STAGE_METALLIC_CAST`, `MAXOR_DIALOGUE_ESCALATION`. Editable SVG fill/outline, growing captions, staged metallic gradient/depth and dialogue escalation. Exact user-approved v4 previews are included; font, background and intermediate-motion substitutions are documented in the recipe.

## Approved non-text Maxor effects96–155seconds

For cutout replacement, paired card growth, RGB hand collage, impact camera zoom or simulated block degradation, use [five approved recipes](../remotion-effect-recreation/examples/baldurs-gate-approved-nontext-9620-15500/effect.md). IDs: `MAXOR_CUTOUT_CARD_SWAP`, `MAXOR_PAIRED_IMAGE_GROWTH`, `MAXOR_HAND_COLLAGE_RGB`, `MAXOR_IMPACT_CAMERA_ZOOM`, `MAXOR_BLOCK_FRAME_DEGRADATION`. Exact approved previews are linked in the example. Preserve documented frozen-background, frozen-explosion and simulated-codec limits; no independent ChatGPT verdict was obtained because its limit was exhausted.

## Approved non-text Maxor effects164–217seconds

For selective color, UI collage, dark focus, an in-panel meme reveal or RGB reaction entry, use [five approved recipes](../remotion-effect-recreation/examples/baldurs-gate-approved-nontext-16480-21680/effect.md). IDs: `MAXOR_SELECTIVE_COLOR`, `MAXOR_UI_COLLAGE`, `MAXOR_DARK_FOCUS`, `MAXOR_MEME_IN_UI`, `MAXOR_REACTION_GLITCH`. Preserve the documented frozen footage and restored background limits. The exact approved renders are included; ChatGPT review was unavailable.

## Approved non-text Maxor effects227–257seconds

For staged meme cards, a two-shot dissolve, monochrome focus, a head-anchored mind orb or a full-frame-to-editor reveal, use [five approved recipes](../remotion-effect-recreation/examples/baldurs-gate-approved-nontext-22730-25655/effect.md). IDs: `MAXOR_STAGED_MEME_COLLAGE`, `MAXOR_DOUBLE_EXPOSURE`, `MAXOR_MONOCHROME_FOCUS`, `MAXOR_MIND_ORB`, `MAXOR_EDITOR_REVEAL`. Import reusable components from src/effects.tsx. Preserve the documented frozen footage, restored orb and native-VFX attribution limits. These are user-approved approximations; no independent ChatGPT verdict was obtained.

## Approved non-text Maxor effects274–335seconds

For a rough matte, color thaw with radial zoom, directional RGB smear, cat focus with meme overlay or inventory punch with insert, use [five approved recipes](../remotion-effect-recreation/examples/baldurs-gate-approved-nontext-27445-33535/effect.md). IDs: `MAXOR_ROUGH_MATTE`, `MAXOR_COLOR_THAW_ZOOM`, `MAXOR_DIRECTIONAL_RGB_SMEAR`, `MAXOR_CAT_FOCUS_MEME`, `MAXOR_INVENTORY_PUNCH_INSERT`. Import reusable components from src/effects.tsx. Exact approved renders are in out/. Preserve the documented frozen gameplay, raster caption and repaired background limits. All five passed independent ChatGPT frame review before user approval.

## Approved non-text Maxor effects341–368seconds

For a circular reveal, framed product collage, promo cut with directional smear, packshot cascade or webpage focus/scroll, use [five approved recipes](../remotion-effect-recreation/examples/baldurs-gate-approved-nontext-34145-36790/effect.md). IDs: `MAXOR_CIRCLE_REVEAL`, `MAXOR_FRAMED_PRODUCTS`, `MAXOR_NEON_PROMO_CUT`, `MAXOR_PRODUCT_CASCADE`, `MAXOR_WEBPAGE_SPOTLIGHT`. Components are in src/effects.tsx; exact approved previews in out/. Preserve the documented frozen gameplay, inherited hero grading/glow and webpage blur limits. Independent ChatGPT v3 passed all five before user approval.
