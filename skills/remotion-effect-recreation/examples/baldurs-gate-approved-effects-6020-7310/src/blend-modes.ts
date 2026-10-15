export const blendModes = [
  { id: "normal", label: "Обычный" },
  { id: "multiply", label: "Умножение" },
  { id: "screen", label: "Экран" },
  { id: "overlay", label: "Перекрытие" },
  { id: "darken", label: "Темнее" },
  { id: "lighten", label: "Светлее" },
  { id: "color-dodge", label: "Осветление цвета" },
  { id: "color-burn", label: "Затемнение цвета" },
  { id: "soft-light", label: "Мягкий свет" },
  { id: "hard-light", label: "Жёсткий свет" },
  { id: "difference", label: "Разница" },
  { id: "exclusion", label: "Исключение" },
  { id: "hue", label: "Цветовой тон" },
  { id: "saturation", label: "Насыщенность" },
  { id: "color", label: "Цвет" },
  { id: "luminosity", label: "Яркость" },
  { id: "plus-lighter", label: "Сложение света" },
] as const;

export type BlendMode = (typeof blendModes)[number]["id"];

/** Premiere-style modes not exposed by CSS mix-blend-mode in Remotion's Chromium. */
export const premiereBlendModes = [
  { id: "dissolve", label: "Растворение" },
  { id: "linear-burn", label: "Линейное затемнение" },
  { id: "darker-color", label: "Цвет темнее" },
  { id: "linear-dodge", label: "Линейное осветление" },
  { id: "lighter-color", label: "Цвет светлее" },
  { id: "vivid-light", label: "Яркий свет" },
  { id: "linear-light", label: "Линейный свет" },
  { id: "pin-light", label: "Точечный свет" },
  { id: "hard-mix", label: "Жёсткое смешение" },
  { id: "subtract", label: "Вычитание" },
  { id: "divide", label: "Деление" },
] as const;

export type PremiereBlendMode = (typeof premiereBlendModes)[number]["id"];
export type Rgb = [number, number, number]; // channel range: 0..1, sRGB

const clamp = (value: number) => Math.max(0, Math.min(1, value));
const luminance = ([r, g, b]: Rgb) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
const burn = (backdrop: number, source: number) =>
  source <= 0 ? 0 : 1 - Math.min(1, (1 - backdrop) / source);
const dodge = (backdrop: number, source: number) =>
  source >= 1 ? 1 : Math.min(1, backdrop / (1 - source));
const vivid = (backdrop: number, source: number) =>
  source < 0.5 ? burn(backdrop, source * 2) : dodge(backdrop, source * 2 - 1);

/** Blend source and backdrop pixel colors before applying glyph mask and opacity. */
export const blendPremierePixel = (
  mode: PremiereBlendMode,
  backdrop: Rgb,
  source: Rgb,
): Rgb => {
  if (mode === "dissolve") return source;
  if (mode === "darker-color")
    return luminance(source) < luminance(backdrop) ? source : backdrop;
  if (mode === "lighter-color")
    return luminance(source) > luminance(backdrop) ? source : backdrop;

  return backdrop.map((b, i) => {
    const s = source[i];
    switch (mode) {
      case "linear-burn":
        return clamp(b + s - 1);
      case "linear-dodge":
        return clamp(b + s);
      case "vivid-light":
        return vivid(b, s);
      case "linear-light":
        return clamp(b + 2 * s - 1);
      case "pin-light":
        return s < 0.5 ? Math.min(b, 2 * s) : Math.max(b, 2 * s - 1);
      case "hard-mix":
        return vivid(b, s) < 0.5 ? 0 : 1;
      case "subtract":
        return clamp(b - s);
      case "divide":
        return s === 0 ? 1 : clamp(b / s);
    }
  }) as Rgb;
};

const hash = (x: number, y: number) =>
  ((((x * 73856093) ^ (y * 19349663)) >>> 0) % 997) / 997;

/** Composite one antialiased text-mask pixel onto one backdrop pixel. */
export const compositePremierePixel = (
  mode: PremiereBlendMode,
  backdrop: Rgb,
  source: Rgb,
  opacity: number,
  maskAlpha: number,
  x: number,
  y: number,
): Rgb => {
  const coverage = clamp(maskAlpha);
  if (coverage === 0) return backdrop;
  if (mode === "dissolve" && hash(x, y) >= clamp(opacity)) return backdrop;
  const mixed = blendPremierePixel(mode, backdrop, source);
  const alpha = mode === "dissolve" ? coverage : coverage * clamp(opacity);
  return backdrop.map((b, i) => b * (1 - alpha) + mixed[i] * alpha) as Rgb;
};
