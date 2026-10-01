# MG_MAP_COLLAGE_IRIS — Движущаяся карта и круговой выход

Утверждено пользователем 2026-10-01 после сравнения MapCircle-v13. Оригинал Maxor:29.467–30.933,88 кадров60fps. ChatGPT READY после полного покадрового аудита. [Рецепт](effect.md), [подтверждение](chatgpt-ready.jpg).

Композиция MG_MAP_COLLAGE_IRIS — самостоятельный эффект1280×720; MapReview — синхронное сравнение2560×720. После npm install: `npx remotion render src/index.ts MG_MAP_COLLAGE_IRIS out/map.mp4 --codec=h264 --crf=19`.

CircleCollage принимает foreground React-слой или foregroundDirectory с alpha PNG, blueCard/whiteCard, beforeImage/afterImage, тайминги и координаты панорамирования, центр/радиусы iris. Демо-материалы заменяемы. Карта CIA/LOC сознательно заменяет исходную географию и шрифт; движение и монтажный механизм воспроизведены кодом.
