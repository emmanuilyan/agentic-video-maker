# Four approved effects,271–293 seconds

User approved all four on2026-10-09 after ordinary ChatGPT returned all READY. Review used every extracted frame; continuous playback/audio review was not performed. [Full verdict](chatgpt-review-final.txt), [review chat](https://chatgpt.com/c/6ac7603b-6968-83ed-8c2b-8495bff3678d).

[Implementation](src/Effects.tsx), [recipe](effect.md). Run npm install, then npx remotion render src/index.ts MG-HEADLINE-SUBLINE-EXIT out/effect.mp4. Append -REVIEW for original-left comparison.1280×720,60fps.

|ID|Name|Source interval|Preview|
|---|---|---|---|
|`MG_HEADLINE_SUBLINE_EXIT`|Разъезд заголовка и подписи|270.950–272.450s|[Preview](../../assets/previews/MG_HEADLINE_SUBLINE_EXIT-reference.mp4)|
|`MG_BRIEF_LOGO_OVERLAY`|Короткая вставка логотипа|279.750–280.650s|[Preview](../../assets/previews/MG_BRIEF_LOGO_OVERLAY-reference.mp4)|
|`MG_ITALIC_WORD_APPEND`|Наклонная фраза по словам|285.500–286.450s|[Preview](../../assets/previews/MG_ITALIC_WORD_APPEND-reference.mp4)|
|`MG_LAYERED_DIAGONAL_EXIT`|Многослойная вставка с диагональным выходом|292.300–293.450s|[Preview](../../assets/previews/MG_LAYERED_DIAGONAL_EXIT-reference.mp4)|

Standalone gallery media is cropped from the exact approved right half, with no visual revision.
