# Dice Glitch Quote — падение d20

Утверждённый самостоятельный пример Remotion по [Maxor, 41.05–41.53 с](https://www.youtube.com/watch?v=I6qlhmjkQ44&t=41s). В начале игровой кадр получает краткий RGB-смаз и две полосы глитча; под ними проявляется двухстрочная пиксельная цитата. Затем настоящий d20 из [отдельного ролика Baldur’s Gate 3](https://www.youtube.com/watch?v=74HP05sIxJY&t=2s) пролетает над титром и падает в карточку.

- [`DiceGlitchQuote`](src/DiceGlitchQuote.tsx) — переиспользуемый компонент с настройками источника видео, строк, цветов, размытия и кадров появления.
- [`Root.tsx`](src/Root.tsx) — композиция `DiceGlitchQuote`, 1280×720, 60 fps, 60 кадров. Только демо-обёртка добавляет маленькую подпись `REMOTION` и край разделителя, которые присутствовали в утверждённом сравнении; сам компонент остаётся чистым оверлеем.
- [`effect.md`](effect.md) — схема слоёв, тайминг и измерения для повторения.
- [`out/DiceGlitchQuote.mp4`](out/DiceGlitchQuote.mp4) — правая половина утверждённого сравнения без оригинала. Этот же файл воспроизводится в [галерее Maxor](../../../../docs/photo-techniques/index.html#maxor).

```bash
npm ci
npm run lint
npx remotion render src/index.ts DiceGlitchQuote out/new-render.mp4
```

В `public/` лежат только нужные для примера короткий игровой фрагмент и Pixelify Sans с [лицензией OFL](public/OFL-PixelifySans.txt). Оригинальный фрагмент Maxor в репозиторий не добавлен. Для другой сцены замените `backgroundSrc` на свой клип с видимым движением кубика и при необходимости измените `quoteLines` и массивы кадров.
