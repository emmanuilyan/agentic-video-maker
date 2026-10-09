# Four approved effects, 233–243 seconds

User approved all four on 2026-10-09. Ordinary ChatGPT returned all READY after sequential-frame review; playback/audio review was not performed. [Review](https://chatgpt.com/c/6ac7603b-6968-83ed-8c2b-8495bff3678d).

[Implementation](src/Effects.tsx), [recipe](effect.md). Runnable project: npm install, then npx remotion render src/index.ts MG-FEDERAL-TYPE-CAPTION out/title.mp4. Append -REVIEW for original-left comparison. All components use1280×720 at60fps. Replace public/assets by role; timings are frame-local.

|ID|Name|Source interval|Approved preview|
|---|---|---|---|
|`MG_FEDERAL_TYPE_CAPTION`|Поэтапный красный титр|233.650–235.050s|[Preview](../../assets/previews/MG_FEDERAL_TYPE_CAPTION-reference.mp4)|
|`MG_FIVE_PHOTO_PILEUP`|Накопительный фотоколлаж|236.650–237.800s|[Preview](../../assets/previews/MG_FIVE_PHOTO_PILEUP-reference.mp4)|
|`MG_TUTORIAL_WORD_CAPTION`|Голубая подпись по словам|239.000–240.300s|[Preview](../../assets/previews/MG_TUTORIAL_WORD_CAPTION-reference.mp4)|
|`MG_LEARNING_TWO_PART_CAPTION`|Двухэтапная розовая подпись|241.050–242.550s|[Preview](../../assets/previews/MG_LEARNING_TWO_PART_CAPTION-reference.mp4)|

Standalone media is cropped from the exact approved right-hand render, with no visual revision. Source-specific demo glyphs and inpainted backgrounds are approximations.
