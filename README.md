# Agentic Video Maker

Коллекция самостоятельных Codex skills и тематических справочников для создания YouTube Shorts. Общего управляющего skill здесь нет: выбирай формат или инструмент под текущую задачу.

## Skills

| Направление | Skills | Для чего |
|---|---|---|
| Форматы Shorts | [paint95-video-maker](skills/paint95-video-maker/README.md), [paint-full-shorts](skills/paint-full-shorts/README.md), [doodle-jump](skills/doodle-jump/README.md), [comics-shorts](skills/comics-shorts/README.md) | Четыре отдельных визуальных подхода к ролику. |
| Remotion | [best practices](skills/remotion-best-practices/README.md), [captions](skills/remotion-captions/README.md), [create](skills/remotion-create/README.md), [docs](skills/remotion-docs/README.md), [interactivity](skills/remotion-interactivity/README.md), [maps](skills/remotion-maps/README.md), [markup](skills/remotion-markup/README.md), [multimedia](skills/remotion-multimedia/README.md), [render](skills/remotion-render/README.md), [SaaS](skills/remotion-saas/README.md), [Studio](skills/remotion-studio/README.md), [upgrade](skills/remotion-upgrade/README.md) | Создание и анимация, captions, мультимедиа, предпросмотр и рендер. |
| Вспомогательные | [cringe-meme](skills/cringe-meme/README.md), [watch](skills/watch/README.md) | Подбор мемной реакции и разбор видео. |

В каждой папке скилла есть `README.md` с визуальной схемой и коротким описанием, а также `SKILL.md` с полными инструкциями. Используй подходящий skill напрямую, например `$paint95-video-maker`; общей последовательности, которая выбирает и вызывает остальные, пока нет.
Если меняется назначение или этапы скилла, обновляй его карточку через `scripts/generate-skill-overviews.mjs`.

## Документы

- [`docs/README.md`](docs/README.md) — указатель по темам и этапам.
- [`docs/png-delivery.md`](docs/png-delivery.md) — когда и какое PNG-превью прикладывать к результату.
- [`docs/chatgpt-video-review.md`](docs/chatgpt-video-review.md) — промпт для необязательной проверки монтажа готового видео в браузерном ChatGPT.
- [`docs/stop-motion/`](docs/stop-motion/) — полная тематическая база: поиск источников, сцена, движение, покадровая работа и QC.
- [`docs/paint-editor/`](docs/paint-editor/) — концепция редакторного повествования и toolkit.

Для нового Shorts-проекта открывай один форматный skill и подключай только те справочники, которые нужны текущему этапу. Документы — reference, а не дополнительные инструкции агента.
