# Four approved effects, 01:10–01:55

User approved these comparisons on 2026-10-07 after [ChatGPT review](https://chatgpt.com/c/6ac68435-af64-83ed-b54b-805e4400518e) marked all four READY. Original: [Maxor, Metal Gear Rising](https://www.youtube.com/watch?v=41v3L0zCkNY). All compositions use1280×720,60fps, frame numbering from zero.

| ID | Name | Source interval | Approved comparison |
|---|---|---|---|
| `MG_LOGO_UI_BLEND` | Логотип поверх интерфейса | 01:10.400–01:11.600 | [TwitterBehindUI-v6](review/TwitterBehindUI-v6.mp4) |
| `MG_SETTING_ARROW_ZOOM` | Наезд на настройку со стрелкой | 01:40.500–01:42.000 | [ResolutionPunch-v10](review/ResolutionPunch-v10.mp4) |
| `MG_MEME_STRIP_SQUASH` | Сжатие видео в мем-полоску | 01:47.400–01:49.300 | [WatameSplit-v8](review/WatameSplit-v8.mp4) |
| `MG_GLITCH_PORTRAIT_PILEUP` | Глитч-коллаж с разъездом фотографий | 01:52.700–01:54.800 | [PresidentPileup-v9](review/PresidentPileup-v9.mp4) |

See [effect.md](effect.md) for layers, timelines, substitutions and reuse. The gallery uses standalone renders of the exact approved component code, with comparison labels removed. Posters derive from those previews.

## Run

Install dependencies with `npm install`, then:

```sh
npx remotion render src/index.ts MG-LOGO-UI-BLEND out/logo.mp4
```

Composition IDs replace underscores with hyphens. Append `-REVIEW` for original-left comparisons. Effects are built from independent Remotion layers and reference-specific still assets; no reference effect clip is used as the reconstruction. Replace assets in `public/assets` with the same roles and aspect ratios. Scale measured pixel coordinates from1280×720 for another format.

Reviewer inspected all402frames using sequential contact sheets and enlarged disputed frames; normal-speed playback and audio were not reviewed. Minor intermediate Watame letter crops and individual President glitch geometry remain approximate.
