---
name: remotion-photo-techniques
description: Use when animating photographs or text in Remotion with grids, zooms, rolling columns, card stacks, collages, rapid photo flipbook cuts, photo transitions, lateral camera pans across adjacent photos, kinetic text, yellow marker highlights, transparent outline-only text (TEXT_OUTLINE), impact effects, parallax, camera flythroughs, a large glitch title with scrolling/crawling ticker text (GLITCH_TITLE_CRAWL), a moving texture-filled title that zooms into new footage (TEXTURE_ZOOM_TITLE), or approved short Maxor effects.
---

# Remotion Photo Techniques

Применяй 30 именованных приёмов монтажа фото и текста в Remotion, включая 8 пространственных сцен с камерой. Сохраняй точные идентификаторы из [каталога](references/techniques.md), чтобы запрос «сделай GRID_ZOOM» однозначно выбирал эффект. Для жёлтого выделения текста по видеореференсу используй [TEXT_HIGHLIGHT](references/text-highlight.md): приём доступен и как отдельный компонент поверх любого кадра.

Для этого приёма есть [запускаемый пример](examples/yellow-highlight/README.md) и [видео-превью](assets/previews/TEXT_HIGHLIGHT-reference.mp4).

Для быстрого «перелистывания» полноэкранных фотографий жёсткими склейками используй [RAPID_PHOTO_FLIPBOOK](references/techniques.md#standalone-photo-effect-rapid_photo_flipbook). Приём из `Sundress` (1:57–1:59) держит каждый план два кадра при 24 fps; внутри пары можно передать два микрокадра. [Компонент](assets/techniques/photo-flipbook.tsx), [пример](examples/rapid-photo-flipbook/README.md) и [одобренное превью](assets/previews/RAPID_PHOTO_FLIPBOOK-reference.mp4).

Для крупного глитч-титра с ползущим текстом по краям используй отдельный эффект [GLITCH_TITLE_CRAWL](references/techniques.md#standalone-text-effect-glitch_title_crawl). Теги для выбора: **крупный титр**, **ползущий/бегущий текст**, **glitch title**, **crawling ticker**. Компонент [GlitchTitleCrawl](assets/techniques/glitch-title-crawl.tsx) работает как оверлей поверх видео и не входит в четырёхфотный `PhotoTechnique`; смотри [пример](examples/glitch-title-crawl/README.md) и [превью](assets/previews/GLITCH_TITLE_CRAWL-reference.mp4).

Для титра с движущейся текстурой внутри букв и зум-переходом на новый кадр используй отдельный эффект [TEXTURE_ZOOM_TITLE](references/techniques.md#standalone-text-effect-texture_zoom_title). Теги для выбора: **текстура в буквах**, **постепенная смена фразы**, **зум в новое видео**, **moving texture title**. Компонент [TextureZoomTitle](assets/techniques/texture-zoom-title.tsx) работает поверх видео и не входит в `PhotoTechnique`; смотри [пример](examples/texture-zoom-title/README.md), [рецепт](examples/texture-zoom-title/effect.md) и [превью](assets/previews/TEXTURE_ZOOM_TITLE-reference.mp4).

Для текста, у которого виден только контур, а внутри букв просвечивает фон, используй самостоятельный [TEXT_OUTLINE](references/techniques.md#standalone-text-effect-text_outline). Компонент [OutlineOnlyText](assets/techniques/outline-only-text.tsx) открывает надпись слева направо; параметры, [пример](examples/outline-only-text/README.md), [рецепт](examples/outline-only-text/effect.md) и [превью](assets/previews/TEXT_OUTLINE-reference.mp4) доступны отдельно от `PhotoTechnique`.

Для иллюзии бокового пролёта камеры через соседние фотографии используй самостоятельный `CAMERA_PHOTO_PAN`: [LateralPhotoPan](assets/techniques/lateral-photo-pan.tsx) принимает от двух фото, их ширины и ключевые положения камеры. Точный тайминг перехода из референса 0:43–0:45, параметры и [запускаемый пример](examples/camera-photo-pan/README.md) описаны в [рецепте](examples/camera-photo-pan/effect.md); [видео-превью](assets/previews/CAMERA_PHOTO_PAN-reference.mp4) показывает одобренный рендер.

Для утверждённых коротких приёмов из видео Maxor смотри [MAXOR examples](examples/maxor-approved-effects/effect.md): поэтапный титр ELDEN RING, двухстрочная подпись с зумом, синхронный цикл шрифтов BOOMER BAND, коллаж с циановым японским титром поверх мем-вставки, видеооверлей THE DARK SOULS и сборка логотипа METAL GEAR RISING с поэтапным исправлением слов. Ещё четыре утверждённых приёма из Baldur's Gate 3 собраны в [следующем наборе](../remotion-effect-recreation/examples/baldurs-gate-approved-effects-1710-3375/README.md): электрический ударный титр, двухэтапная подпись D&D, волнистый титр MY BLOOD IS / SPICY и две игровые плашки с мемами. `TEXTURE_ZOOM_TITLE` также показан в первой подборке и имеет отдельную компонентную реализацию. В галерее эффекты собраны по фильтру **Maxor**. После пользовательского апрува прикрепляй к карточке галереи именно последний Remotion-рендер из сравнения, который получил апрув: этот MP4 должен воспроизводиться на странице, а постер нужно сделать из того же рендера. Не используй исходный клип, двухпанельное сравнение или устаревший черновик. Если рендер менялся после апрува, снова покажи его пользователю. После добавления проверь карточку и воспроизведение в категории **Maxor**.

`MAXOR_DICE_GLITCH_QUOTE` — утверждённая [глитч-цитата с настоящим падением d20](../remotion-effect-recreation/examples/baldurs-gate-dice-glitch-fall-4105/README.md). Используй её, когда нужен короткий RGB-смаз игровой сцены, две полосы фрагментов, затем пиксельная двухстрочная надпись с удержанием до завершения броска. Параметры и точные кадры — в [рецепте](../remotion-effect-recreation/examples/baldurs-gate-dice-glitch-fall-4105/effect.md); [превью](assets/previews/MAXOR_DICE_GLITCH_QUOTE-reference.mp4).

Шесть следующих утверждённых приёмов собраны в [запускаемом примере](examples/maxor-batch7-effects/README.md) и [рецептах](examples/maxor-batch7-effects/effect.md): `MAXOR_SKYRIM_BLENDED_TITLE` (крупный титр смешивается с фоном и исчезает по буквам), `MAXOR_SPEED_DISCLAIMER_WIPE` (подпись уходит влево под световым проходом), `MAXOR_JAPAN_MAP_CALLOUT` (единый силуэт Японии поверх всех вставок), `MAXOR_EASTERN_EUROPE_SCALE` (растущая карта и дописываемое сравнение с Африкой), `MAXOR_RGB_BLOCK_GLITCH` (RGB-блоки, глитч букв, зум и цветокоррекция), `MAXOR_MARGIT_FRAME_TITLE` (светлая рамка, выгнутый жёлтый титр и тонкая нижняя подпись). Каждый эффект короче трёх секунд; выбирай конкретный рецепт по визуальному приёму.

Четыре одобренных эффекта из Metal Gear Rising описаны и запускаются в [наборе примеров](examples/metal-gear-approved-effects-2026/README.md): `MG_RED_MOSAIC_REVEAL` (красная мозаика карточек с отдельным раскрытием лица), `MG_CRT_SIGNAL_BREAKUP` (портрет в зелёном CRT-окне с широкими полосами помех), `MG_SPLIT_WORDMARK_BUILD` (кастомный логотип с поэтапным исправлением слов), `MG_CYAN_NEON_EXIT` (логотип и электрические дуги синхронно уходят вверх). Рецепты, исходные интервалы и тайминг — в [effect.md](examples/metal-gear-approved-effects-2026/effect.md). Для галереи используй только одобренную панель Remotion и постер из того же MP4.

Для пяти одобренных эффектов из Shorts используй `ECHO`, `GLOW`, `CC_LENS`, `CC_PIXEL_POLLY`, `MOTION_TILE`: [компоненты](assets/techniques/shorts-five-effects.tsx), [запускаемый пример](examples/shorts-five-effects/README.md), [рецепты и параметры](examples/shorts-five-effects/effect.md). Echo создаёт задержанные копии движущегося слоя; Glow добавляет неоновый ореол; CC Lens изгибает всю композицию; Pixel Polly разрезает изображение на треугольные осколки; Motion Tile бесшовно повторяет и прокручивает ячейку. Эффекты работают отдельно от четырёхфотного `PhotoTechnique`; превью каждого ID находятся в `assets/previews`.

Четыре утверждённых эффекта Maxor из фрагментов 00:50–01:10: `MG_GUITAR_ROCK_TITLE` (гитара и цветной RGB-титр), `MG_TOONTOWN_ARTICLE_COLLAGE` (логотип, фото и три статьи), `MG_FALLING_ABOVE_40` (раздельное падение слоёв и допись числа), `MG_OVAL_MEME_CAPTIONS` (овальная вставка и две встречные подписи). [Запускаемый пример](examples/metal-gear-approved-effects-50-70/README.md), [рецепты с таймингом](examples/metal-gear-approved-effects-50-70/effect.md) и точные утверждённые сравнения лежат вместе; чистые превью доступны в `assets/previews/`.

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

Для сферического искажения и раскрытия изображения используй `CC_LENS` — одобренную адаптацию CC Lens из Shorts: [LensWarp](assets/techniques/lens-warp.tsx), [пример и параметры](examples/cc-lens/effect.md), [превью](assets/previews/CC_LENS-reference.mp4). Теги: **сферическая линза**, **fisheye**, **CC Lens**. Эффект принимает одно изображение; собственная SVG-графика в примере заменяет графику оригинала.

Для утверждённого `MG_MAP_COLLAGE_IRIS` («Движущаяся карта и круговой выход») используй [пример и рецепт](examples/metal-gear-map-collage-iris/README.md): карта панорамируется отдельно за игровым передним планом, меняет палитру и закрывается круглой маской. Демо — точная утверждённая v13.

## Maxor: шесть приёмов 0:59–1:18

Для `MAXOR_DOG_CAPTION_FRAME`, `MAXOR_GOD_FREED_FRAME`, `MAXOR_PART_ONE_DRIFT_CARD`, `MAXOR_LOGO_PRESS_ZOOM`, `MAXOR_KEYBOARD_FLASH_COLLAGE`, `MAXOR_CHARACTER_SMEAR_TITLE` используй [запускаемый пример](examples/maxor-batch8-effects/README.md) и [покадровые рецепты](examples/maxor-batch8-effects/effect.md). В третьем приёме после появления обе строки продолжают движение в разные стороны. Превью каждой карточки Maxor — точная последняя утверждённая версия без оригинального видео слева.

## Approved Metal Gear effects, 01:10–01:55

For a logo that preserves bright UI, a menu zoom with an arrow, a gameplay squash into a meme strip, or a glitch portrait pileup, use [four approved recipes](examples/metal-gear-approved-effects-70-115/effect.md): `MG_LOGO_UI_BLEND`, `MG_SETTING_ARROW_ZOOM`, `MG_MEME_STRIP_SQUASH`, `MG_GLITCH_PORTRAIT_PILEUP`. The runnable example and latest user-approved previews are linked in [README](examples/metal-gear-approved-effects-70-115/README.md).

## Approved Maxor effects, 80–84 seconds

Use [three approved examples](examples/maxor-approved-effects-80-84/effect.md) for `MAXOR_COMIC_PRESENTATION`, `MAXOR_DIAGONAL_HAND_WIPE`, and `MAXOR_VERTICAL_CHAPEL_SLIT`: presentation layers, a diagonal footage wipe, or a widening central slit. Exact approved renders are attached to their Maxor gallery cards.

## Approved Maxor composite and quote

Use [the composite example and quote recipe](examples/maxor-chapel-neon-sequence/effect.md) for `MAXOR_CHAPEL_SKELETON_NEON_SEQUENCE` (effects3–5 as one montage) and `MAXOR_FROM_SOFTWARE_QUOTE` (heading, portrait and translucent speech bubble). Exact saved previews appear in Maxor.

## Approved Maxor effects, 91–108 seconds

Use [six approved examples](examples/maxor-approved-effects-91-108/effect.md) for `MAXOR_HOLE_SLIDE_TITLE`, `MAXOR_FUN_RED_IMPACT`, `MAXOR_MAKING_FRIENDS_ZOOM`, `MAXOR_LIFE_STAGED_CAPTION`, `MAXOR_TOUCH_GRASS_COLLAGE`, and `MAXOR_WELCOME_LIMGRAVE`. Includes exact approved previews, frame timelines and documented static-background/blend approximations.

## Approved Maxor effects, 108–120 seconds

For a centered location title, paired tree inserts, a two-color name reveal, a character cutout swap, a red-circle pulse or a typewriter quote box, use [six approved examples](examples/maxor-approved-effects-108-120/effect.md). IDs: `MAXOR_LIMGRAVE_CENTER_TITLE`, `MAXOR_PAIRED_TREE_INSERTS`, `MAXOR_MARTIN_NAME_REVEAL`, `MAXOR_WALTER_CHARACTER_SWAP`, `MAXOR_RED_CIRCLE_PULSE`, `MAXOR_TYPEWRITER_QUOTE_BOX`. Exact approved previews, frame timing and still-background/mask limits are included.

## Approved Metal Gear effects, 146–192 seconds

Use [four approved examples](examples/metal-gear-approved-effects-146-192/README.md) for `MG_NEON_CHARACTER_TITLE`, `MG_SPEEDLINE_GLITCH_BURST`, `MG_PIXEL_DIALOG_SLIDE`, `MG_DIAGONAL_CUTOUT_PILEUP`. Exact approved component code, previews, frame timelines and documented background/typography approximations are included.

## Approved Maxor effects,119–126 seconds

For a staged helmet collage, rainbow depth title, meme aura, chromatic fringe, sliding meme card or talking-mouth overlay, use [six approved examples](examples/maxor-approved-effects-119-126/effect.md). IDs: `MAXOR_HELMET_COLLAGE`, `MAXOR_HELMET_RAINBOW_TITLE`, `MAXOR_MEME_AURA`, `MAXOR_CRINGE_CHROMATIC_FRINGE`, `MAXOR_MAIDEN_MEME_SLIDE`, `MAXOR_TALKING_MOUTH_OVERLAY`. Exact approved previews and frame timelines included; retain the documented still-background, glyph and speech approximations.

## Approved Metal Gear effects, 195–230 seconds

Use [four approved examples](examples/metal-gear-approved-effects-195-230/README.md) for `MG_BLUE_TITLE_EXIT`, `MG_POV_COLOR_EDGES`, `MG_RED_SCANNING_HUD`, `MG_CUT_EXTENDED_CAPTION`. Includes independent title, color-edge, scanning HUD and cut-persistent caption layers, exact approved previews and frame timelines. Preserve documented inpainted-background and source-specific glyph limits.

## Approved Maxor effects,127–138 seconds

For a staged texture title, sneaker/logo entrance, contrast ramp, comic collage, castle wipe or meme/burn transition, use [six approved examples](examples/maxor-approved-effects-127-138/effect.md). IDs: `MAXOR_ZERO_TEXTURE_TITLE`, `MAXOR_SNEAKER_LOGO_SLIDE`, `MAXOR_CONTRAST_CRUSH_RAMP`, `MAXOR_COMIC_GRACE_COLLAGE`, `MAXOR_CASTLE_WIPE`, `MAXOR_MEME_BURN_TRANSITION`. Exact approved previews, tags and frame timelines included; preserve documented still-background and color approximations.

## Approved Metal Gear effects, 233–243 seconds

Use [four approved examples](examples/metal-gear-approved-effects-233-243/README.md) for `MG_FEDERAL_TYPE_CAPTION`, `MG_FIVE_PHOTO_PILEUP`, `MG_TUTORIAL_WORD_CAPTION`, `MG_LEARNING_TWO_PART_CAPTION`. Includes staged captions and independent photo accumulation, exact approved previews and frame timelines. Preserve documented inpainted-background and source-specific glyph limits.

## Approved Metal Gear effects, 247–270 seconds

Use [four approved examples](examples/metal-gear-approved-effects-247-270/README.md) for `MG_ITALIC_STAGED_QUOTE`, `MG_OPPOSING_CUTOUT_INSERT`, `MG_RGB_TITLE_PUNCHLINE`, `MG_RED_RECENTERED_PHRASE`. Includes staged captions, opposing cutouts and a two-row RGB title, exact approved previews and frame timelines. Preserve documented inpainted-background and source-specific glyph limits.

## Approved Metal Gear effects,271–293 seconds

For a headline/subline exit, brief logo overlay, italic word append or layered diagonal wipe, use [four approved examples](examples/metal-gear-approved-effects-271-293/README.md). IDs: `MG_HEADLINE_SUBLINE_EXIT`, `MG_BRIEF_LOGO_OVERLAY`, `MG_ITALIC_WORD_APPEND`, `MG_LAYERED_DIAGONAL_EXIT`. Includes independent components, animated cutout assets, frame timelines and the exact approved previews; preserve the documented raster-color and repaired-background limits.

## Approved Maxor effects138–149sec

For a staged title that transitions into an anime callout, an Escape/flag sequence that transitions into a rotating bracelet ring, a hose-object collage or a three-font/heart meme stack, use [four approved grouped examples](examples/maxor-approved-effects-138-149/effect.md). IDs: `MAXOR_SPECTRE_BLOODBORNE_SEQUENCE`, `MAXOR_ESCAPE_BRACELET_SEQUENCE`, `MAXOR_HOSE_OBJECT_COLLAGE`, `MAXOR_GIRLBOSS_HEART_STACK`. Group1–2 and3–4 as single effects; exact approved frame selections, joined previews, tags and media approximations are documented.

## Approved Metal Gear effects,315–349 seconds

For a side-entering title/subtitle, pulsing portrait, title-to-edge collage or staged caption with portraits, use [four approved examples](examples/metal-gear-approved-effects-315-349/README.md). IDs: `MG_SIDE_TITLE_SUBLINE`, `MG_PORTRAIT_WHITE_PULSES`, `MG_TITLE_TO_EDGE_COLLAGE`, `MG_STAGED_CAPTION_PORTRAITS`. Includes independent layers, frame timelines and exact user-approved v4 previews. Preserve the documented repaired-background, raster-artwork and static-portrait limits.
