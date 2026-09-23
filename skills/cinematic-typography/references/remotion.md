# Детерминированная реализация в Remotion

## Инварианты

- Используй `useCurrentFrame()`; не используй CSS animation, таймеры, `Date.now()` или обычный `Math.random()`.
- Положение, переносы и внешний силуэт текста не зависят от фазы текстуры.
- Все дефекты рисуются в чёрном внутри SVG mask, белый текст задаёт видимую область.
- Квантуй время: при 30 fps меняй маску примерно раз в 3 кадра.
- Пример ниже — реализационная адаптация наблюдаемого эффекта, а не восстановленный авторский пайплайн.

## Один рабочий компонент

Координаты задаются в локальной системе 720×720. Масштабирование SVG на композицию сохраняет пропорции дефектов.

```tsx
import React, {useId} from 'react';
import {random, useCurrentFrame, useVideoConfig} from 'remotion';

type Props = {
  text: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color?: string;
  fontFamily?: string;
  fontSize?: number;
  seed: string;
};

const hole = (seed: string, phase: number, index: number, channel: string) =>
  random(`${seed}:${phase}:${index}:${channel}`);

export const CinematicCaption: React.FC<Props> = ({
  text,
  x,
  y,
  width,
  height,
  color = '#FCF081',
  fontFamily = 'Bebas Neue Pro Expanded, Bebas Neue, Impact, sans-serif',
  fontSize = 82,
  seed,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const phase = Math.floor(frame / Math.max(1, Math.round(fps / 10)));
  const reactId = useId().replace(/:/g, '');
  const maskId = `caption-mask-${reactId}`;

  const small = Array.from({length: 105}, (_, index) => ({
    cx: x + hole(seed, phase, index, 'sx') * width,
    cy: y - height + hole(seed, phase, index, 'sy') * height,
    rx: 1 + hole(seed, phase, index, 'srx') * 3,
    ry: 1 + hole(seed, phase, index, 'sry') * 3,
    opacity: 0.55 + hole(seed, phase, index, 'so') * 0.4,
  }));

  const large = Array.from({length: 18}, (_, index) => ({
    cx: x + hole(seed, phase, index, 'lx') * width,
    cy: y - height + hole(seed, phase, index, 'ly') * height,
    rx: 4 + hole(seed, phase, index, 'lrx') * 7,
    ry: 4 + hole(seed, phase, index, 'lry') * 6,
    angle: hole(seed, phase, index, 'la') * 180,
    opacity: 0.45 + hole(seed, phase, index, 'lo') * 0.4,
  }));

  return (
    <svg viewBox="0 0 720 720" width="100%" height="100%">
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          <rect width="720" height="720" fill="black" />
          <text
            x={x}
            y={y}
            fill="white"
            fontFamily={fontFamily}
            fontSize={fontSize}
            fontWeight={800}
            letterSpacing="0.055em"
          >
            {text.toUpperCase()}
          </text>
          {[...small, ...large].map((item, index) => (
            <ellipse
              key={index}
              cx={item.cx}
              cy={item.cy}
              rx={item.rx}
              ry={item.ry}
              fill="black"
              opacity={item.opacity}
              transform={
                'angle' in item
                  ? `rotate(${item.angle} ${item.cx} ${item.cy})`
                  : undefined
              }
            />
          ))}
        </mask>
      </defs>

      <rect width="720" height="720" fill={color} mask={`url(#${maskId})`} />
    </svg>
  );
};
```

## Подгонка

1. Сначала загрузи и дождись шрифта; затем измерь реальную ширину строки.
2. Подставь фактический `x`, baseline `y`, `width` и высоту зоны глифов. Дефекты должны покрывать буквы, а не весь кадр статистически равномерно.
3. Отрендери фазы `0`, `1`, `2` и наложи их разностно. Контур должен совпадать, рисунок внутри — меняться.
4. Если пропадает больше `18%` площади, уменьши количество/opacity крупных эллипсов. Если эффект не читается, сначала увеличь крупные дефекты, а не частоту мерцания.
5. Для двух строк используй отдельные `<text>` или `<tspan>` с одинаковой фазой и общим якорем.

## Что не делать

- Не меняй `baseFrequency` SVG turbulence плавно: получится жидкость.
- Не генерируй новые координаты через состояние React или недетерминированную случайность.
- Не анимируй накопление грязи один раз и не замораживай её: в референсе рисунок продолжает обновляться.
- Не добавляй чёрный прямоугольник или толстый stroke ради контраста.
- Не считай количество эллипсов доказательством. Финальный критерий — измеренная доля вычитания и покадровое сравнение.
