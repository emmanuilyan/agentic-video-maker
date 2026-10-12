# Four approved effects, 367–392 seconds

User approved all four on 2026-10-12. Ordinary ChatGPT returned 4/4 READY; sequential decoding and critical-frame visual inspection were performed. Real-time playback and audio review were not performed. [Report](chatgpt-review-v6-ready.txt), [review chat](https://chatgpt.com/c/6ac9f073-0368-83eb-b9b4-360f42399b68).

[Components](src/Effects.tsx), [recipe](effect.md). Run npm install, then npx remotion render src/index.ts MG-STAGED-TITLE-SIDE-OBJECTS out/effect.mp4. Append -REVIEW for original-left comparison. 1280×720, 60fps.

|ID|Name|Source interval|Preview|
|---|---|---|---|
|`MG_STAGED_TITLE_SIDE_OBJECTS`|Надпись по частям с боковыми объектами|367.650–369.400s|[Preview](../../assets/previews/MG_STAGED_TITLE_SIDE_OBJECTS-reference.mp4)|
|`MG_CIRCLE_SPORTS_COLLAGE`|Круговое раскрытие спортивного коллажа|370.750–373.050s|[Preview](../../assets/previews/MG_CIRCLE_SPORTS_COLLAGE-reference.mp4)|
|`MG_RGB_INVERSION_CIRCLE`|Растущая инверсия с цветными контурами|380.250–383.000s|[Preview](../../assets/previews/MG_RGB_INVERSION_CIRCLE-reference.mp4)|
|`MG_FOUR_LINE_DIAGONAL_CAPTION`|Четыре строки с диагональным стиранием|390.250–392.100s|[Preview](../../assets/previews/MG_FOUR_LINE_DIAGONAL_CAPTION-reference.mp4)|

Gallery previews contain the exact approved right half without a visual revision.
