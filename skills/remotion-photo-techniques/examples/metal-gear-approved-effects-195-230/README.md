# Four approved effects, 195–230 seconds

User approved all four on 2026-10-08. Ordinary ChatGPT returned all READY after sequential-frame review; playback/audio review was not performed. [Review](https://chatgpt.com/c/6ac7603b-6968-83ed-8c2b-8495bff3678d).

[Implementation](src/Effects.tsx), [recipe](effect.md). Runnable project: npm install, then npx remotion render src/index.ts MG-BLUE-TITLE-EXIT out/title.mp4. Append -REVIEW for original-left comparison. All components use1280×720 at60fps. Replace public/assets by role; timings are frame-local.

|ID|Name|Source interval|Approved preview|
|---|---|---|---|
|`MG_BLUE_TITLE_EXIT`|Синий титр с быстрым выходом|195.300–197.700s|[Preview](../../assets/previews/MG_BLUE_TITLE_EXIT-reference.mp4)|
|`MG_POV_COLOR_EDGES`|POV с цветными контурами|216.400–217.500s|[Preview](../../assets/previews/MG_POV_COLOR_EDGES-reference.mp4)|
|`MG_RED_SCANNING_HUD`|Красный HUD с меняющимся индикатором|219.200–220.800s|[Preview](../../assets/previews/MG_RED_SCANNING_HUD-reference.mp4)|
|`MG_CUT_EXTENDED_CAPTION`|Подпись, дополняемая через склейку|228.000–230.000s|[Preview](../../assets/previews/MG_CUT_EXTENDED_CAPTION-reference.mp4)|

Standalone media is cropped from the exact approved right-hand render, with no visual revision. Source-specific demo glyphs and inpainted backgrounds are approximations.
