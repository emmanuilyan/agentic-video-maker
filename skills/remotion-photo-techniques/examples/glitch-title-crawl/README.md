# GLITCH_TITLE_CRAWL

Пример крупного одноцветного титра, который сначала распадается на glitch-срезы, затем собирается; маджентовые искажения ограничены маской каждой буквы. Полупрозрачные строки ползут сверху и снизу, яркая пиксельная рамка глитчит по периметру.

Композиция показывает приём на синтетическом фоне. Для рабочего ролика убери `SyntheticBackdrop` и наложи `GlitchTitleCrawl` на нужное видео.

```bash
npm install
npm run dev
npx remotion render src/index.ts glitch-title-crawl out/glitch-title-crawl.mp4
```

Переиспользуемый компонент находится в [`assets/techniques/glitch-title-crawl.tsx`](../../assets/techniques/glitch-title-crawl.tsx); его копия для автономного запуска — [`src/GlitchTitleCrawl.tsx`](src/GlitchTitleCrawl.tsx). Измерения, таймлайн и оговорки собраны в [рецепте эффекта](effect.md).

[Превью реконструкции](../../assets/previews/GLITCH_TITLE_CRAWL-reference.mp4) показывает тот же 1,8-секундный эффект, который сравнивался с референсом; это рендер реализации, а не клип-референс.
