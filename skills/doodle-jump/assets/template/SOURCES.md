# Asset provenance

Art source: ordinary ChatGPT, existing conversation [Подбор исходников для видео](https://chatgpt.com/c/6aa1cde6-9298-83eb-baa2-07172fa96e88), 2026-09-14. A first answer claimed a ZIP without a real attachment. The follow-up returned complete SVG source for nine assets; those actual SVG sources were transferred to `public/assets/`. No downloadable PNG or ZIP was supplied.

Files: `hero-sprout.svg`, `hero-cloud.svg`, `platform-grass.svg`, `platform-cloud.svg`, `cloud.svg`, `mountain.svg`, `leaf.svg`, `star.svg`, `paper-tile.svg`. SVG whitespace was normalized, redundant inherited `fill="none"` omitted, and paper grid paths combined without altering shapes. Measured runtime anchors live in `src/data/skins.json`.

The initial ChatGPT manifest claimed hero feet at (160,340) and platforms at y=20. Runtime metadata was corrected to feet (160,357), grass surface y=14 and cloud surface y=10 based on the painted paths. Palette and source dimensions were retained.

Landing SFX: locally synthesized deterministic PCM by `scripts/make-sfx.mjs`. Demo captions: authored demonstration copy; no narration or measured transcript was supplied.

Implementation API references: [Remotion Composition](https://www.remotion.dev/docs/composition), [Remotion audio](https://www.remotion.dev/docs/audio). Package versions pinned in the project lockfile.

## Story and photo sources

The demo contains no documentary photos. Replace this note with one row per selected story asset; keep uncertain identification or rights status explicit.

| Asset ID | Local file | Source page | Direct file | Retrieved | Rights/license | Crop, transformation or factual caveat |
| --- | --- | --- | --- | --- | --- | --- |
| — | — | — | — | — | — | — |
