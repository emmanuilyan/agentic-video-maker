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
- Подчеркнуть момент: FREEZE_FRAME остановкой, IMPACT_SHAKE ударом, FLASH_CUT светом, RGB_SPLIT каналами.
- Выделить фразу: TEXT_HIGHLIGHT жёлтой плашкой за уже видимым текстом; TEXT_REVEAL вводит саму надпись из-за маски.
- Добавить пространственность: PARALLAX для относительного движения планов, CAMERA_FLYTHROUGH для прохождения между ними.
- Текстурировать титр и перейти в новую сцену: самостоятельный `TEXTURE_ZOOM_TITLE` меняет фразу по этапам, двигает текстуру внутри глифов и завершает титр зум-кроссфейдом.

При смешивании приёмов сохраняй один доминирующий жест на монтажный акцент. Для обучения и сравнения показывай каждый отдельно.

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

These are standalone effects collected from one reviewed source segment, outside the numbered four-photo technique set. Use them as visual references and adapt text, footage, and frame timings to the new edit.

- `MAXOR_ELDEN_RING_TITLE` — dissolve from `ELDEN` into one centered `ELDEN RING` title. [Recipe and runnable component](../examples/maxor-approved-effects/effect.md), [preview](../assets/previews/MAXOR_ELDEN_RING_TITLE-reference.mp4).
- `MAXOR_CAPTION_ZOOM` — two-line condensed caption, hard change to a new plate, then a background zoom. [Recipe and runnable component](../examples/maxor-approved-effects/effect.md), [preview](../assets/previews/MAXOR_CAPTION_ZOOM-reference.mp4).
- `MAXOR_BOOMER_FONT_CYCLE` — both words change typeface together through four phases, with strong red extrusion shadows. [Recipe and runnable component](../examples/maxor-approved-effects/effect.md), [preview](../assets/previews/MAXOR_BOOMER_FONT_CYCLE-reference.mp4).
- `TEXTURE_ZOOM_TITLE` — moving texture clipped per glyph, staged text, then a zoom cut into new footage. [Recipe](../examples/texture-zoom-title/effect.md), [preview](../assets/previews/TEXTURE_ZOOM_TITLE-reference.mp4).
- `MAXOR_CYAN_MEME_COLLAGE` — two photo cards grow and shift, followed by a zooming video background, a cyan Japanese title above all layers, and a meme picture-in-picture. [Recipe, runnable component, and preview](../examples/maxor-approved-effects/effect.md).
- `MAXOR_DARK_SOULS_OVERLAY` — progressive title reveal with an irregular, tinted video overlay across roughly two-thirds of frame. [Recipe and runnable component](../examples/maxor-approved-effects/effect.md), [preview](../assets/previews/MAXOR_DARK_SOULS_OVERLAY-reference.mp4).
- `MAXOR_METAL_GEAR_WORDMARK_BUILD` — a two-row, four-color wordmark assembles through hard word entrances and in-place spelling corrections. [Recipe and runnable component](../examples/maxor-approved-effects/effect.md), [preview](../assets/previews/MAXOR_METAL_GEAR_WORDMARK_BUILD-reference.mp4).
- `MAXOR_DICE_GLITCH_QUOTE` — two fragmented glitch bands and a brief whole-scene RGB smear reveal a pixel quote; a real d20 falls inside the game card while the quote holds. [Recipe and runnable component](../../remotion-effect-recreation/examples/baldurs-gate-dice-glitch-fall-4105/effect.md), [preview](../assets/previews/MAXOR_DICE_GLITCH_QUOTE-reference.mp4).
