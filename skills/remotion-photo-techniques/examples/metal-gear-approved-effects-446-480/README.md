# Four approved effects, 446–480 seconds

User approved all four on 2026-10-14. Ordinary ChatGPT returned 4/4 READY; sequential decoding and critical-frame visual inspection were performed. Real-time playback and audio review were not performed. [Report](chatgpt-review-final.txt), [review chat](https://chatgpt.com/c/6acef245-aa98-83ed-8a8c-c6d5b5671164).

[Components](src/Effects.tsx), [recipe](effect.md). Run npm install, then npx remotion render src/index.ts MG-PAIRED-EDGE-CUTOUTS out/effect.mp4. Append -REVIEW for original-left comparison. 1280×720, 60fps.

|ID|Name|Source interval|Preview|
|---|---|---|---|
|`MG_PAIRED_EDGE_CUTOUTS`|Парные фигуры с боковым входом|446.500–448.200s|[Preview](../../assets/previews/MG_PAIRED_EDGE_CUTOUTS-reference.mp4)|
|`MG_STACKED_COIN_TITLE`|Три строки с монетой|454.850–456.350s|[Preview](../../assets/previews/MG_STACKED_COIN_TITLE-reference.mp4)|
|`MG_PHOTO_CASCADE_IRIS`|Подпись с каскадом фотоколлажа|470.050–472.250s|[Preview](../../assets/previews/MG_PHOTO_CASCADE_IRIS-reference.mp4)|
|`MG_WORD_EXPANSION_CAPTION`|Расширяющаяся подпись по словам|478.000–479.650s|[Preview](../../assets/previews/MG_WORD_EXPANSION_CAPTION-reference.mp4)|

Gallery previews contain the exact approved right half without a visual revision.
