# Four approved effects, 247–270 seconds

User approved all four on 2026-10-09. Ordinary ChatGPT returned all READY after sequential-frame review; playback/audio review was not performed. [Review](https://chatgpt.com/c/6ac7603b-6968-83ed-8c2b-8495bff3678d).

[Implementation](src/Effects.tsx), [recipe](effect.md). Runnable project: npm install, then npx remotion render src/index.ts MG-ITALIC-STAGED-QUOTE out/title.mp4. Append -REVIEW for original-left comparison. All components use 1280×720 at 60 fps. Replace public/assets by role; timings are frame-local.

|ID|Name|Source interval|Approved preview|
|---|---|---|---|
|`MG_ITALIC_STAGED_QUOTE`|Поэтапная наклонная цитата|247.900–249.050s|[Preview](../../assets/previews/MG_ITALIC_STAGED_QUOTE-reference.mp4)|
|`MG_OPPOSING_CUTOUT_INSERT`|Встречный вход двух вырезок|254.900–255.800s|[Preview](../../assets/previews/MG_OPPOSING_CUTOUT_INSERT-reference.mp4)|
|`MG_RGB_TITLE_PUNCHLINE`|Крупный RGB-титр с подстрочником|258.200–259.600s|[Preview](../../assets/previews/MG_RGB_TITLE_PUNCHLINE-reference.mp4)|
|`MG_RED_RECENTERED_PHRASE`|Красная фраза по словам|268.800–270.150s|[Preview](../../assets/previews/MG_RED_RECENTERED_PHRASE-reference.mp4)|

Standalone media is cropped from the exact approved right-hand render, with no visual revision. Source-specific demo glyphs and inpainted backgrounds are approximations.
