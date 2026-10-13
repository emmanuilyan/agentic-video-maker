# Каталог 30 приёмов

Точные ID сохраняются в коде, задании и имени MP4. В таблице указана реализация в `assets/techniques/`. Время — нормализованные кадры 0…179 демо; при 30 fps это 6 секунд. Настройки ниже — конкретные точки адаптации функций, не дополнительные props общего компонента.

| ID / функция | Рисунок движения и настройка | Что проверить |
|---|---|---|
| PHOTO_GRID / PhotoGrid | Сетка 2×2, появление с задержкой i×9, сдвиг снизу 60 px и scale .9→1. Меняй gap, число колонок, задержку. | Все фото читаются; равные зазоры; последняя ячейка успевает появиться. |
| GRID_ZOOM / GridZoom | Показ сетки → на 38…78 приблизить правую верхнюю ячейку → hold → на 119…161 выйти обратно. Меняй target center и масштаб w/cellWidth. | Двигается весь контейнер, выбранная ячейка попадает в центр без скачка. |
| ROLLING_COLUMNS / RollingColumns | Четыре клипованные колонки, знаки скоростей чередуются; длинные повторные полосы дают запас за границами. | Нет пустого края полосы в начале/конце; противоход различим. |
| CARD_STACK / CardStack | Новая карточка каждые 30 кадров, прилёт 24 кадра, накопление в центре, чередование углов. | Порядок наложения соответствует приходу; снизу видны края предыдущих. |
| PHOTO_WALL / PhotoWall | Регулярная мозаика 6×5, общий панорамный сдвиг и scale 1.18→.9. | Стена выходит за границы viewport весь пролёт; не превращается в четыре самостоятельных карточки. |
| COLLAGE_BUILD / CollageBuild | Четыре асимметричных слота; прилёт с двух сторон; новая карточка каждые 29 кадров. | Предыдущие элементы остаются, перекрытия не скрывают все сюжетные центры. |
| WHIP_PAN / WhipPan | В конце участка 27…44 outgoing x=-pW, incoming x=W-pW, blur=sin(πp)×18. | На выходе резкий кадр; направление едино; нет зазора между кадрами. |
| ZOOM_THROUGH / ZoomThrough | В outgoing вырезается растущее круглое отверстие, incoming за ним; outgoing scale 1→2.25. | Действительно видно слой позади через отверстие; радиус перекрывает диагональ кадра. |
| MATCH_POSITION / MatchPosition | Жёсткая смена через 45 кадров; позиция и размер выбранного объекта вычисляются из anchor/faceWidth. | Одинаковая деталь остаётся в одной точке и масштабе, координаты взяты с исходников. |
| FREEZE_FRAME / FreezeFrame | В каждом участке clock движется 0…15, стоит 15…34, затем продолжается без скачка. Рамка обозначает удержание. | Есть движение до/после; во время hold transform постоянный; подпись не заменяет заморозку. |
| CLONE_TRAIL / CloneTrail | Шесть экземпляров одной карточки; каждый получает задержку 2 кадра; opacity копий убывает. | Все копии — прошлые положения именно этой карточки, не случайный набор фото. |
| TEXT_PUSH / TextPush | На 8…25 растёт боковая текстовая панель до 42% ширины; фото уходит на половину её ширины. | Фото физически сдвигается вместе с появлением панели; слова полностью внутри панели. |
| TEXT_REVEAL / TextReveal | На 5…26 текст поднимается из-за неподвижного overflow:hidden. Фото остаётся под ним. | Маскируется текст, не фото; в финале видны все буквы. |
| TEXT_HIGHLIGHT / TextHighlight | Жёлтые плашки раскрываются за строками слева направо: задержка нижней строки ≈0,25 с, раскрытие ≈0,8 с. Точный компонент `YellowTextHighlight` доступен отдельно от фото-демо; см. [рецепт](text-highlight.md). | Буквы остаются поверх цвета, обе строки доходят до правого края, цвет и темп сравнимы с референсом. |
| MASK_REVEAL / MaskReveal | Диагональный polygon у incoming проходит от -25% до125%; передняя грань отклонена на22% ширины. | Нет остатка старого кадра при p=1 и утечки следующего при p=0. |
| FLASH_CUT / FlashCut | Жёсткая склейка с белой вспышкой, затухание за 5 кадров в начале нового участка. | Акцент короткий; новые фото читаются между вспышками. |
| IMPACT_SHAKE / ImpactShake | Seeded x/y shake, rotation и небольшой zoom; envelope=exp(-local/5.5). | Удар быстро затухает; scale даёт запас для тряски; random не меняется при рендере по частям. |
| RGB_SPLIT / RgbSplit | Три настоящие R/G/B матрицы; screen-смешивание со смещениями; envelope 19 кадров. | Каналы сходятся в исходные цвета; это не три цветные непрозрачные копии. |
| PIXEL_DISSOLVE / PixelDissolve | Маска 24×12; порог p убирает прямоугольники в порядке seeded random. | Ни один блок не возвращается; p=1 открывает весь следующий кадр. |
| PAPER_COLLAGE / PaperCollage | Накопление четырёх карточек на бумаге; polygon с неровными краями, светлая кайма, drop-shadow, скотч. | Тень идёт от формы бумаги; рваные края реально видны; фото не просто имеет rounded corners. |
| PARALLAX / Parallax | Четыре целые карточки; коэффициенты глубины .16/.35/.58/1; общая камера создаёт разный боковой сдвиг. | Ближние двигаются дальше дальних; объяснение не обещает сегментацию внутри фотографии. |
| CAMERA_FLYTHROUGH / CameraFlythrough | Панели разнесены по z через820, камера идёт на3350; проекция focal/z, боковые смещения и yaw; невидимые за камерой удаляются. | Следующие панели заранее видны в глубине; предыдущие уходят за камеру; нет деления на ноль у near plane. |
| SLALOM_FLYTHROUGH / SlalomFlythrough | Четыре панели через9 мировых единиц, x=±3.75. Камера проходит z=12→−23, двигается по X и наклоняется в поворотах. | Камера меняет направление, а панели остаются неподвижными; фото не пересекают её центральную траекторию. |
| ORBIT_GALLERY / OrbitGallery | Фото на кольце радиусом4.4, камера обходит его по кругу радиусом11.4. У каждого фото есть лицевая и обратная печать. | Полный круг раскрывает все четыре фото; надписи на обратной стороне не зеркалятся. |
| PHOTO_TUNNEL / PhotoTunnel | Фото на четырёх поверхностях тоннеля; 16 секций, камера ускоряется вдоль Z. | Видны пол, потолок и обе стены; повтор исходников является частью тоннеля. |
| SPIRAL_FLIGHT / SpiralFlight | Четыре фото на разных высотах и азимутах; камера одновременно обходит ось Y и поднимается. | Вертикальное перемещение различимо; это не только вращение горизонта. |
| DEPTH_DIVE / DepthDive | Камера смотрит вниз по −Y и проходит через горизонтальные уровни фотографий; up=[0,0,−1]. | Нет вырождения lookAt; подъём/падение читается по удаляющимся уровням шахты. |
| FROZEN_ORBIT / FrozenOrbit | Разлёт до42; мировые позиции и углы стоят до130; камера в это время облетает сцену; после130 объекты продолжают путь. | Во время hold кадры меняются только из-за камеры, не из-за движения самих фото. |
| EXPLODED_PHOTO / ExplodedPhoto | Фото разбито на6×4 фрагмента с собственными UV. Фрагменты расходятся в XYZ, камера проходит между ними к следующему фото. | Собранная картинка не имеет перепутанных фрагментов; не изменяется crop общей Texture. |
| PORTAL_ROOMS / PortalRooms | Четыре стены через12 единиц. Перед камерой центральный проём раскрывается; UV-размеченные полосы оставляют его физически пустым. | Следующая комната видна сквозь проём; камера пересекает Z стены; за отверстием нет непрозрачной подложки. |

## Быстрый выбор

- Показать коллекцию: PHOTO_GRID для порядка, PHOTO_WALL для количества, COLLAGE_BUILD для накопления, CARD_STACK для смены фокуса.
- Связать две сцены: WHIP_PAN направлением, MATCH_POSITION формой, MASK_REVEAL границей, ZOOM_THROUGH глубиной маски.
- Провести камеру вдоль двух или более соседних фото: самостоятельный CAMERA_PHOTO_PAN с общей полосой и ключевыми координатами камеры.
- Быстро сменять полноэкранные фотографии без движения края страницы: самостоятельный RAPID_PHOTO_FLIPBOOK с жёсткими сменами через два кадра и необязательным микродвижением внутри пары.
- Подчеркнуть момент: FREEZE_FRAME остановкой, IMPACT_SHAKE ударом, FLASH_CUT светом, RGB_SPLIT каналами.
- Выделить фразу: TEXT_HIGHLIGHT жёлтой плашкой за уже видимым текстом; TEXT_REVEAL вводит саму надпись из-за маски.
- Добавить пространственность: PARALLAX для относительного движения планов, CAMERA_FLYTHROUGH для прохождения между ними.
- Текстурировать титр и перейти в новую сцену: самостоятельный `TEXTURE_ZOOM_TITLE` меняет фразу по этапам, двигает текстуру внутри глифов и завершает титр зум-кроссфейдом.

При смешивании приёмов сохраняй один доминирующий жест на монтажный акцент. Для обучения и сравнения показывай каждый отдельно.

## Standalone photo effect: RAPID_PHOTO_FLIPBOOK

**Теги:** быстрое перелистывание фотографий, фотофлипбук, жёсткие склейки, двухкадровый ритм, rapid photo flipbook, hard cuts.

`PhotoFlipbook` выбирает одну фотографию на весь кадр по локальному номеру кадра. По умолчанию новый план появляется каждые два кадра при 24 fps; `holdFrames` меняет длительность отдельного плана, а `frameSources` задаёт отдельные микрокадры внутри него. Поворота страницы и кроссфейда нет. Компонент принимает любое количество фото и работает отдельно от четырёхфотного `PhotoTechnique`. [Измеренный рецепт](../examples/rapid-photo-flipbook/effect.md), [запускаемый пример](../examples/rapid-photo-flipbook/README.md), [компонент](../assets/techniques/photo-flipbook.tsx), [одобренное превью](../assets/previews/RAPID_PHOTO_FLIPBOOK-reference.mp4).

## Standalone photo transition: CAMERA_PHOTO_PAN

**Теги:** камера вправо, боковой пролёт, перелистывание фотографий, несколько соседних сцен, lateral photo pan.

`LateralPhotoPan` размещает два или более фото в одной горизонтальной полосе и смещает её по ключам виртуальной камеры. На стыке одновременно видны уходящее и входящее фото; узкий разделитель может имитировать край дверного проёма. Компонент принимает `photos`, `cameraKeys`, `seamWidth`, `seamColor` и `background` и работает отдельно от четырёхфотного `PhotoTechnique`. [Рецепт с измеренным таймлайном](../examples/camera-photo-pan/effect.md), [запускаемый пример](../examples/camera-photo-pan/README.md), [компонент](../assets/techniques/lateral-photo-pan.tsx), [превью](../assets/previews/CAMERA_PHOTO_PAN-reference.mp4).

## Standalone text effect: GLITCH_TITLE_CRAWL

**Теги:** крупный титр, ползущий текст, бегущая строка, large title, scrolling text, crawling ticker, glitch typography.

Большой одноцветный титр собирается из фрагментов; отдельные глитч-срезы ограничены маской каждой буквы, чтобы сохранять межбуквенные просветы. По верхнему и нижнему краям одновременно ползут полупрозрачные строки в одном акцентном цвете; по периметру проходит широкая пиксельная рамка. `GlitchTitleCrawl` — самостоятельный прозрачный оверлей поверх любого фонового видео, а не элемент четырёхфотного `PhotoTechnique`. Рецепт, параметры и измеренный таймлайн: [GLITCH_TITLE_CRAWL effect](../examples/glitch-title-crawl/effect.md); компонент: [glitch-title-crawl.tsx](../assets/techniques/glitch-title-crawl.tsx).

## Standalone text effect: TEXTURE_ZOOM_TITLE

**Теги:** движущаяся текстура в буквах, титр с меняющейся фразой, зум в новый фон, moving texture title, textured glyphs, zoom transition.

Фраза собирается по этапам; многослойная цветная текстура движется внутри отдельных букв, а короткие глитч-срезы остаются в маске глифа. После удержания полной надписи титр уходит во время увеличения исходной сцены и кроссфейда на новый кадр. `TextureZoomTitle` принимает две React-сцены, текстуру, этапы надписи и параметры перехода; он работает как самостоятельный оверлей, а не элемент `PhotoTechnique`. Рецепт и проверяемый пример: [TEXTURE_ZOOM_TITLE effect](../examples/texture-zoom-title/effect.md), [пример](../examples/texture-zoom-title/README.md); компонент: [texture-zoom-title.tsx](../assets/techniques/texture-zoom-title.tsx).

## Standalone text effect: TEXT_OUTLINE

**Теги:** прозрачный текст, текст только с обводкой, контурные буквы, hollow text, outline-only text.

`OutlineOnlyText` рисует только SVG-обводку букв (`fill="none"`), чтобы фон оставался видимым через середину. Прямоугольная маска раскрывает слово слева направо на кадрах 6–34; масштаб слегка растёт от 0.96 до 1. Компонент — самостоятельный прозрачный оверлей поверх любой сцены, а не элемент `PhotoTechnique`. [Рецепт и параметры](../examples/outline-only-text/effect.md), [запускаемый пример](../examples/outline-only-text/README.md), [компонент](../assets/techniques/outline-only-text.tsx), [превью](../assets/previews/TEXT_OUTLINE-reference.mp4).

## Approved source effects: Maxor
- `MG_RED_MOSAIC_REVEAL` — красные карточки-досье и отдельное раскрытие лица через центральное окно. [Рецепт и запуск](../examples/metal-gear-approved-effects-2026/effect.md), [превью](../assets/previews/MG_RED_MOSAIC_REVEAL-reference.mp4).
- `MG_CRT_SIGNAL_BREAKUP` — портрет в зелёном CRT-окне, широкие размытые полосы сигнала и сканлинии внутри окна. [Рецепт и запуск](../examples/metal-gear-approved-effects-2026/effect.md), [превью](../assets/previews/MG_CRT_SIGNAL_BREAKUP-reference.mp4).
- `MG_SPLIT_WORDMARK_BUILD` — кастомный двухрядный логотип собирается жёсткими входами и заменой промежуточных написаний. [Рецепт и запуск](../examples/metal-gear-approved-effects-2026/effect.md), [превью](../assets/previews/MG_SPLIT_WORDMARK_BUILD-reference.mp4).
- `MG_CYAN_NEON_EXIT` — циановый логотип с электрическими дугами цельной композицией уходит вверх. [Рецепт и запуск](../examples/metal-gear-approved-effects-2026/effect.md), [превью](../assets/previews/MG_CYAN_NEON_EXIT-reference.mp4).
- `MG_GUITAR_ROCK_TITLE` — гитара влетает независимо от тонкого разноцветного RGB-титра; композиция растёт и растворяется через склейку. [Рецепт и запуск](../examples/metal-gear-approved-effects-50-70/effect.md), [превью](../assets/previews/MG_GUITAR_ROCK_TITLE-reference.mp4).
- `MG_TOONTOWN_ARTICLE_COLLAGE` — логотип, центральное фото и три статьи появляются по отдельным тактам. [Рецепт и запуск](../examples/metal-gear-approved-effects-50-70/effect.md), [превью](../assets/previews/MG_TOONTOWN_ARTICLE_COLLAGE-reference.mp4).
- `MG_FALLING_ABOVE_40` — персонаж, ноутбук и клинок падают раздельно, затем надпись дополняется числом и коллаж растворяется. [Рецепт и запуск](../examples/metal-gear-approved-effects-50-70/effect.md), [превью](../assets/previews/MG_FALLING_ABOVE_40-reference.mp4).
- `MG_OVAL_MEME_CAPTIONS` — овальная мем-вставка и две встречные подписи покачиваются, увеличиваются и растворяются. [Рецепт и запуск](../examples/metal-gear-approved-effects-50-70/effect.md), [превью](../assets/previews/MG_OVAL_MEME_CAPTIONS-reference.mp4).

These are standalone effects collected from one reviewed source segment, outside the numbered four-photo technique set. Use them as visual references and adapt text, footage, and frame timings to the new edit.

- `MAXOR_ELDEN_RING_TITLE` — dissolve from `ELDEN` into one centered `ELDEN RING` title. [Recipe and runnable component](../examples/maxor-approved-effects/effect.md), [preview](../assets/previews/MAXOR_ELDEN_RING_TITLE-reference.mp4).
- `MAXOR_CAPTION_ZOOM` — two-line condensed caption, hard change to a new plate, then a background zoom. [Recipe and runnable component](../examples/maxor-approved-effects/effect.md), [preview](../assets/previews/MAXOR_CAPTION_ZOOM-reference.mp4).
- `MAXOR_BOOMER_FONT_CYCLE` — both words change typeface together through four phases, with strong red extrusion shadows. [Recipe and runnable component](../examples/maxor-approved-effects/effect.md), [preview](../assets/previews/MAXOR_BOOMER_FONT_CYCLE-reference.mp4).
- `TEXTURE_ZOOM_TITLE` — moving texture clipped per glyph, staged text, then a zoom cut into new footage. [Recipe](../examples/texture-zoom-title/effect.md), [preview](../assets/previews/TEXTURE_ZOOM_TITLE-reference.mp4).
- `MAXOR_CYAN_MEME_COLLAGE` — two photo cards grow and shift, followed by a zooming video background, a cyan Japanese title above all layers, and a meme picture-in-picture. [Recipe, runnable component, and preview](../examples/maxor-approved-effects/effect.md).
- `MAXOR_DARK_SOULS_OVERLAY` — progressive title reveal with an irregular, tinted video overlay across roughly two-thirds of frame. [Recipe and runnable component](../examples/maxor-approved-effects/effect.md), [preview](../assets/previews/MAXOR_DARK_SOULS_OVERLAY-reference.mp4).
- `MAXOR_METAL_GEAR_WORDMARK_BUILD` — a two-row, four-color wordmark assembles through hard word entrances and in-place spelling corrections. [Recipe and runnable component](../examples/maxor-approved-effects/effect.md), [preview](../assets/previews/MAXOR_METAL_GEAR_WORDMARK_BUILD-reference.mp4).
- `MAXOR_DICE_GLITCH_QUOTE` — two fragmented glitch bands and a brief whole-scene RGB smear reveal a pixel quote; a real d20 falls inside the game card while the quote holds. [Recipe and runnable component](../../remotion-effect-recreation/examples/baldurs-gate-dice-glitch-fall-4105/effect.md), [preview](../assets/previews/MAXOR_DICE_GLITCH_QUOTE-reference.mp4).

## Five approved Shorts effects

Для пяти одобренных эффектов из Shorts используй `ECHO`, `GLOW`, `CC_LENS`, `CC_PIXEL_POLLY`, `MOTION_TILE`: [компоненты](../assets/techniques/shorts-five-effects.tsx), [запускаемый пример](../examples/shorts-five-effects/README.md), [рецепты и параметры](../examples/shorts-five-effects/effect.md). Echo создаёт задержанные копии движущегося слоя; Glow добавляет неоновый ореол; CC Lens изгибает всю композицию; Pixel Polly разрезает изображение на треугольные осколки; Motion Tile бесшовно повторяет и прокручивает ячейку. Эффекты работают отдельно от четырёхфотного `PhotoTechnique`; превью каждого ID находятся в `assets/previews`.

## MG_MAP_COLLAGE_IRIS

Движущаяся карта за отдельным передним планом, смена палитры и круговой выход. [Компонент, параметры и рецепт](../examples/metal-gear-map-collage-iris/README.md), [утверждённое превью](../assets/previews/MG_MAP_COLLAGE_IRIS-reference.mp4).

## Maxor: утверждённые приёмы 0:59–1:18

- `MAXOR_DOG_CAPTION_FRAME` — красная открытая рамка, двухцветная нижняя подпись и RGB-акцент. [Рецепт](../examples/maxor-batch8-effects/effect.md), [превью](../assets/previews/MAXOR_DOG_CAPTION_FRAME-reference.mp4).
- `MAXOR_GOD_FREED_FRAME` — крупный жёлтый титр в рамке, толчок и смена плана. [Рецепт](../examples/maxor-batch8-effects/effect.md), [превью](../assets/previews/MAXOR_GOD_FREED_FRAME-reference.mp4).
- `MAXOR_PART_ONE_DRIFT_CARD` — поэтапный титр и две строки карточки, медленно расходящиеся после появления. [Рецепт](../examples/maxor-batch8-effects/effect.md), [превью](../assets/previews/MAXOR_PART_ONE_DRIFT_CARD-reference.mp4).
- `MAXOR_LOGO_PRESS_ZOOM` — приближение логотипа и оптический удар фразы PRESS ANY BUTTON. [Рецепт](../examples/maxor-batch8-effects/effect.md), [превью](../assets/previews/MAXOR_LOGO_PRESS_ZOOM-reference.mp4).
- `MAXOR_KEYBOARD_FLASH_COLLAGE` — три фрагмента, пересвет, движущийся фон, подпись и зум. [Рецепт](../examples/maxor-batch8-effects/effect.md), [превью](../assets/previews/MAXOR_KEYBOARD_FLASH_COLLAGE-reference.mp4).
- `MAXOR_CHARACTER_SMEAR_TITLE` — смазанный переход, металлическое слово и две мем-вставки. [Рецепт](../examples/maxor-batch8-effects/effect.md), [превью](../assets/previews/MAXOR_CHARACTER_SMEAR_TITLE-reference.mp4).

## Metal Gear: утверждённые приёмы 01:10–01:55

- `MG_LOGO_UI_BLEND` — Логотип поверх интерфейса. [Рецепт](../examples/metal-gear-approved-effects-70-115/effect.md), [превью](../assets/previews/MG_LOGO_UI_BLEND-reference.mp4).
- `MG_SETTING_ARROW_ZOOM` — Наезд на настройку со стрелкой. [Рецепт](../examples/metal-gear-approved-effects-70-115/effect.md), [превью](../assets/previews/MG_SETTING_ARROW_ZOOM-reference.mp4).
- `MG_MEME_STRIP_SQUASH` — Сжатие видео в мем-полоску. [Рецепт](../examples/metal-gear-approved-effects-70-115/effect.md), [превью](../assets/previews/MG_MEME_STRIP_SQUASH-reference.mp4).
- `MG_GLITCH_PORTRAIT_PILEUP` — Глитч-коллаж с разъездом фотографий. [Рецепт](../examples/metal-gear-approved-effects-70-115/effect.md), [превью](../assets/previews/MG_GLITCH_PORTRAIT_PILEUP-reference.mp4).

## Approved Metal Gear effects, 146–192 seconds

Use [four approved examples](../examples/metal-gear-approved-effects-146-192/README.md) for `MG_NEON_CHARACTER_TITLE`, `MG_SPEEDLINE_GLITCH_BURST`, `MG_PIXEL_DIALOG_SLIDE`, `MG_DIAGONAL_CUTOUT_PILEUP`. Exact approved component code, previews, frame timelines and documented background/typography approximations are included.

## Approved Metal Gear effects, 195–230 seconds

Use [four approved examples](../examples/metal-gear-approved-effects-195-230/README.md) for `MG_BLUE_TITLE_EXIT`, `MG_POV_COLOR_EDGES`, `MG_RED_SCANNING_HUD`, `MG_CUT_EXTENDED_CAPTION`. Includes independent title, color-edge, scanning HUD and cut-persistent caption layers, exact approved previews and frame timelines. Preserve documented inpainted-background and source-specific glyph limits.

## Approved Metal Gear effects, 233–243 seconds

Use [four approved examples](../examples/metal-gear-approved-effects-233-243/README.md) for `MG_FEDERAL_TYPE_CAPTION`, `MG_FIVE_PHOTO_PILEUP`, `MG_TUTORIAL_WORD_CAPTION`, `MG_LEARNING_TWO_PART_CAPTION`. Includes staged captions and independent photo accumulation, exact approved previews and frame timelines. Preserve documented inpainted-background and source-specific glyph limits.

## Approved Metal Gear effects, 247–270 seconds

Use [four approved examples](../examples/metal-gear-approved-effects-247-270/README.md) for `MG_ITALIC_STAGED_QUOTE`, `MG_OPPOSING_CUTOUT_INSERT`, `MG_RGB_TITLE_PUNCHLINE`, `MG_RED_RECENTERED_PHRASE`. Includes staged captions, opposing cutouts and a two-row RGB title, exact approved previews and frame timelines. Preserve documented inpainted-background and source-specific glyph limits.

## Approved Metal Gear effects,271–293 seconds

For a headline/subline exit, brief logo overlay, italic word append or layered diagonal wipe, use [four approved examples](../examples/metal-gear-approved-effects-271-293/README.md). IDs: `MG_HEADLINE_SUBLINE_EXIT`, `MG_BRIEF_LOGO_OVERLAY`, `MG_ITALIC_WORD_APPEND`, `MG_LAYERED_DIAGONAL_EXIT`. Includes independent components, animated cutout assets, frame timelines and the exact approved previews; preserve the documented raster-color and repaired-background limits.

## Approved Metal Gear effects,315–349 seconds

For a side-entering title/subtitle, pulsing portrait, title-to-edge collage or staged caption with portraits, use [four approved examples](../examples/metal-gear-approved-effects-315-349/README.md). IDs: `MG_SIDE_TITLE_SUBLINE`, `MG_PORTRAIT_WHITE_PULSES`, `MG_TITLE_TO_EDGE_COLLAGE`, `MG_STAGED_CAPTION_PORTRAITS`. Includes independent layers, frame timelines and exact user-approved v4 previews. Preserve the documented repaired-background, raster-artwork and static-portrait limits.

## Approved Maxor effects153–169seconds

Use [six approved recipes](examples/maxor-approved-effects-153-169/effect.md): `MAXOR_WHITE_CAPTION_SLIDE`, `MAXOR_GREEN_SYMBOL_FRAME`, `MAXOR_FLEE_TITLE_ZOOM_EXIT`, `MAXOR_GEOMETRY_CALLOUT`, `MAXOR_RED_STEALTH_SLIDE`, `MAXOR_RIGID_MEME_CAPTION_STACK`. Exact user-approved previews and source intervals are included; preserve the documented frozen backgrounds, raster glyph masks and font approximations.

## Approved Metal Gear effects,367–392 seconds

For staged typography with side objects, a circle-revealed sports collage, a growing RGB inversion circle or a four-line diagonal caption wipe, use [four approved examples](../examples/metal-gear-approved-effects-367-392/README.md). IDs: `MG_STAGED_TITLE_SIDE_OBJECTS`, `MG_CIRCLE_SPORTS_COLLAGE`, `MG_RGB_INVERSION_CIRCLE`, `MG_FOUR_LINE_DIAGONAL_CAPTION`. Includes independent layers, frame timelines and exact user-approved previews. Preserve documented held-background, raster-artwork and color approximations.

## Approved Metal Gear effects,415–446 seconds

For a decorative title crossing the frame, a contour overload with a large title, staged emblem entry or extruded staged caption, use [four approved examples](../examples/metal-gear-approved-effects-415-446/README.md). IDs: `MG_DECORATIVE_TITLE_PASS`, `MG_CONTOUR_OVERLOAD_TITLE`, `MG_STAGED_EMBLEM_ENTRY`, `MG_EXTRUDED_STAGED_CAPTION`. Includes independent layers, frame timelines and exact user-approved previews. Preserve documented held-background, raster-artwork and color approximations.

## Approved Maxor effects169–188seconds

Use [six approved recipes](examples/maxor-approved-effects-169-188/effect.md): `MAXOR_VIOLENCE_FLAG_CALLOUT`, `MAXOR_GAME_OVER_RED_BANNER`, `MAXOR_WHITE_WORD_STEPS`, `MAXOR_MELINA_FRAME_BOTTLE`, `MAXOR_SEXUAL_STYLE_MEME_TITLE`, `MAXOR_LEVEL_UP_WORD_ENTRIES`. Exact user-approved previews and source intervals are included; preserve the documented frozen backgrounds, raster glyph masks and font approximations.
