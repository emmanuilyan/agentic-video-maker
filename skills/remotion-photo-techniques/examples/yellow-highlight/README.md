# Жёлтое выделение текста

Небольшой Remotion-проект, повторяющий жёлтое выделение двух строк из [референса](https://www.youtube.com/watch?v=n3IYmdy6d4Y) на 14–15 секунде.

```bash
npm install
npm run dev
npx remotion render src/index.ts YellowTextHighlight out/yellow-highlight.mp4
```

Канонический компонент для повторного использования: [`YellowTextHighlight`](../../assets/techniques/text-highlight.tsx). Для автономного запуска проекта его копия находится в [`src/YellowTextHighlight.tsx`](src/YellowTextHighlight.tsx). Измерения, тайминг и параметры: [`effect.md`](effect.md). [Готовое видео](../../assets/previews/TEXT_HIGHLIGHT-reference.mp4) входит в Git и позволяет посмотреть приём без сборки проекта.
