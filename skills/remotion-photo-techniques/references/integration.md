# Интеграция

Библиотека проверена на Remotion 4.0.522 и React 19.2.3. Двумерные сцены используют `Img`, `useCurrentFrame`, `useVideoConfig`, `interpolate`, `Easing`, `random`. Общий `index.tsx` также импортирует пространственные сцены: для него нужны `@remotion/three`, `three`, `@react-three/fiber` и TypeScript-типы `@types/three`. Проверенные версии и установка описаны в [3D-интеграции](spatial.md). Учитывай версии существующего проекта; держи `remotion` и все `@remotion/*` на одной версии. Установка конкретной старой версии не является обязательным требованием skill.

## Подключение

Скопируй папку `assets/techniques` целиком в `src/photo-techniques` проекта. Ей не нужны исходные демонстрационные фотографии. Положи фотографии пользователя в `public/photos`; используй их реальные ширину и высоту. Служебный footer в библиотеку не включён.

```tsx
import {Sequence, staticFile} from 'remotion';
import {PhotoTechnique, Photo} from './photo-techniques';

const photos: Photo[] = [
  {src: staticFile('photos/a.jpg'), width: 1600, height: 900},
  {src: staticFile('photos/b.jpg'), width: 1200, height: 800},
  {src: staticFile('photos/c.jpg'), width: 1000, height: 1500},
  {src: staticFile('photos/d.jpg'), width: 1600, height: 1000},
];

export const PhotoScene = () => (
  <Sequence from={37} durationInFrames={144}>
    <PhotoTechnique
      technique="GRID_ZOOM"
      photos={photos}
      durationInFrames={144}
      text="СМОТРИ БЛИЖЕ"
      accent="#d8ed78"
    />
  </Sequence>
);
```

При 24 fps внутренние 144 кадра дадут 6 секунд. При 30 fps для 6 секунд передавай 180. Компонент нормализует локальный диапазон в `f=0…179`: одинаковая доля анимации сохраняется при другом fps. `useCurrentFrame` внутри Sequence уже локальный — не вычитай `from` второй раз. `durationInFrames` без явного prop берётся от всей Composition, не от родительского Sequence.

| Prop | Назначение |
|---|---|
| `technique` | Точный ID из каталога, с подчёркиваниями. |
| `photos` | Ровно четыре `{src,width,height,anchor?,faceWidth?}`. |
| `durationInFrames` | Длина именно этой сцены; не менее 2. |
| `frame` | Необязательный локальный кадр для управляемого времени; обычно не нужен. |
| `width`, `height` | Область эффекта; по умолчанию размеры composition. |
| `text` | Надпись TEXT_PUSH/TEXT_REVEAL. Проверяй длинные слова и новый шрифт. |
| `accent` | Цвет акцентов, включая текст, рамки и маркер совпадения. |
| `seed` | Воспроизводимый порядок PIXEL_DISSOLVE, IMPACT_SHAKE и бумажной фактуры. |
| `intensity` | 0…2: сила WHIP_PAN, FLASH_CUT, IMPACT_SHAKE, RGB_SPLIT. Другие приёмы этим prop не регулируются. |

## Настройка

В `layouts.tsx` находятся раскладки и глубина, в `effects.tsx` — переходы, текст и акценты. В `spatial.tsx` — восемь 3D-миров, а в `spatial-state.ts` — их камеры и независимые часы. Константы времени рассчитаны в нормализованных кадрах 0…179. Меняй их при адаптации длительности отдельных фаз, а не умножай повторно на fps.

Локальный `segment(f,4)` создаёт четыре участка по 45 нормализованных кадров. Переходы WHIP_PAN/ZOOM_THROUGH/MASK_REVEAL/PIXEL_DISSOLVE переводят A→B в конце первого участка, B→C во втором, C→D в третьем; четвёртый удерживает D. FLASH_CUT/IMPACT_SHAKE/RGB_SPLIT действуют около начала участка. Это демо расписание, не готовый интерфейс для двух соседних Sequence.

Если нужна одна склейка между двумя кадрами, возьми геометрию выбранной функции и подай локальный progress `p=clamp((frame-start)/(end-start))` для outgoing/incoming. Сохрани точные состояния: p=0 показывает A, p=1 показывает B. Для единичного перехода не размножай два файла до четырёх ради API демо.

Если фото меньше или больше четырёх, адаптируй раскладку: число строк/столбцов, слоты, индексы и длительность участков. Не отбрасывай пользовательские исходники молча. Библиотека явно отклоняет неподходящее количество.

Для вертикального формата переразложи фото и перепроверь текст. Ширина и высота параметризованы, но горизонтальная художественная композиция сама по себе не гарантирует удачный 9:16.

Для нескольких RGB_SPLIT одновременно замени SVG filter ID на уникальный префикс экземпляра (`useId` с безопасными символами) и используй тот же префикс в `filter:url(...)`. Один экземпляр уже работает из коробки.

## MATCH_POSITION

`anchor:[x,y]` — центр одинаковой визуальной детали в долях исходника; `faceWidth` — ширина этой детали в долях ширины исходника. Название исторически связано с лицами, но деталью может быть любой сопоставимый предмет.

В шаблоне желаемая экранная ширина детали `h*0.36`, целевая точка `(w*0.5,h*0.45)`:

```ts
const s = (h * 0.36) / (photo.width * photo.faceWidth);
const left = w * 0.5 - photo.anchor[0] * photo.width * s;
const top = h * 0.45 - photo.anchor[1] * photo.height * s;
```

Подложка заполняет незакрытые области. Для чистового ролика убери диагностический крест, если он не нужен по дизайну. Значения по умолчанию `[.5,.5]` и `.18` — геометрические fallback, не автоматическое распознавание.

## Проверка и экспорт

Composition ID в Remotion использует дефисы, например `GRID-ZOOM`; prop technique остаётся `GRID_ZOOM`.

```sh
npx tsc --noEmit
npx remotion still GRID-ZOOM out/grid-zoom-mid.png --frame=70
npx remotion render GRID-ZOOM out/GRID_ZOOM.mp4 --codec=h264 --pixel-format=yuv420p
```

Проверь начало, пик действия и конец, а для склеек — оба соседних кадра. Freeze проверяй только в области эффекта: внешний индикатор прогресса может продолжать движение. Для одних и тех же кадров повторный рендер должен быть одинаковым. Для GIF сначала рендери MP4, затем делай палитру FFmpeg; GIF не обязателен для превью.

Официальные источники: [локальное время useCurrentFrame](https://www.remotion.dev/docs/use-current-frame), [детерминированный random](https://www.remotion.dev/docs/random), [renderMedia](https://www.remotion.dev/docs/renderer/render-media). Проверены 2026-09-09.
