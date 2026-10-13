# Four approved effects, 415–446 seconds

User approved all four on 2026-10-13. Ordinary ChatGPT returned 4/4 READY; sequential decoding and critical-frame visual inspection were performed. Real-time playback and audio review were not performed. [Report](chatgpt-review-v5-ready.txt), [review chat](https://chatgpt.com/c/6ac9f073-0368-83eb-b9b4-360f42399b68).

[Components](src/Effects.tsx), [recipe](effect.md). Run npm install, then npx remotion render src/index.ts MG-DECORATIVE-TITLE-PASS out/effect.mp4. Append -REVIEW for original-left comparison. 1280×720, 60fps.

|ID|Name|Source interval|Preview|
|---|---|---|---|
|`MG_DECORATIVE_TITLE_PASS`|Декоративный титр со сквозным проездом|415.300–418.150s|[Preview](../../assets/previews/MG_DECORATIVE_TITLE_PASS-reference.mp4)|
|`MG_CONTOUR_OVERLOAD_TITLE`|Контурная перегрузка с крупной надписью|420.400–421.550s|[Preview](../../assets/previews/MG_CONTOUR_OVERLOAD_TITLE-reference.mp4)|
|`MG_STAGED_EMBLEM_ENTRY`|Въезд эмблемы с добавлением слов|442.600–444.350s|[Preview](../../assets/previews/MG_STAGED_EMBLEM_ENTRY-reference.mp4)|
|`MG_EXTRUDED_STAGED_CAPTION`|Поэтапная подпись с цветной экструзией|444.300–446.650s|[Preview](../../assets/previews/MG_EXTRUDED_STAGED_CAPTION-reference.mp4)|

Gallery previews contain the exact approved right half without a visual revision.
