# Formula RGB Portrait

## Source and result

- Source: [video reference](https://www.youtube.com/watch?v=I6qlhmjkQ44), 10.70–11.60 s.
- Result: `FormulaRgbPortraitDemo`, 1280×720, 60 fps, 54 frames.
- Component: [FormulaRgbPortrait.tsx](src/FormulaRgbPortrait.tsx).
- Preview: [formula-rgb-portrait-1070-1160.mp4](../../assets/previews/formula-rgb-portrait-1070-1160.mp4).
- Review: user approved the portrait order and push-in after independent frame comparison.

## Visual recipe

| Local time | Layers and motion |
| --- | --- |
| 0.00–0.05 s | Hold the two-face source image. Keep any existing formulas very faint. |
| 0.05–0.25 s | Reveal an enlarged, translucent view of the selected face over the two-face image. Use an oval mask that expands while opacity rises; dissolve the pair into the selected portrait. |
| 0.13–0.30 s | Push in quickly toward the selected face. Position the zoom origin at its normalized `focusX`/`focusY`; translate by `50 - focusX × 100` percent so that horizontal focus remains centered. |
| 0.05–0.84 s | Add soft horizontal bands in pink, orange, yellow, green, cyan, and purple, each around 23% high with 14% vertical spacing and `mix-blend-mode: color`. Keep edges feathered. |
| 0.05–0.84 s | Float 56 low-opacity, varied-size handwritten-style formulas across the image. Use deterministic frame/index offsets for a light drift and pulse. Fade the entire overlay before the end of the source interval. |
| 0.05–0.84 s | Add narrow red and blue edge splits using offset/difference SVG filters, roughly ±4 px; avoid broad RGB blur. |

## Reuse

`FormulaRgbPortrait` accepts a still path, a local frame, and normalized face focus coordinates. Use a 54-frame, 60 fps composition for the measured timing. The paired-character SVG is only demo art; replace it with a source still containing the desired faces. The original video and its extracted frames are not committed.

```tsx
<FormulaRgbPortrait
  frame={useCurrentFrame()}
  image="my-paired-characters.png"
  focusX={0.24}
  focusY={0.28}
/>
```

## Verification and fidelity

The output was compared side by side with the source, including the initial two-face hold, the translucent left-face ghost, and the final focus. The effect timing and layer behavior are preserved; demo illustration and handwritten symbols are replaceable stand-ins.
