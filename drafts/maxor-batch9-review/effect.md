# Maxor batch 9 — review drafts

Status: unapproved. No library or Git integration. Source: https://www.youtube.com/watch?v=kO9HmhwGzXs. Local source covers 59–90 seconds, 1280×720, 60 fps. Comparisons are 1280×360 with reference left and recreation right. All frame numbers are relative to each composition.

| Draft | Source interval | Current render | Mechanism |
| --- | --- | --- | --- |
| Comic presentation | 80.00–81.55 | 01-comic-presentation-v8.mp4 | Separate comic, presentation chrome, presenter and final diagonal wipe |
| Diagonal hand wipe | 81.45–83.45 | 02-diagonal-hand-wipe-v2.mp4 | A slanted mask moves left-to-right over replaceable footage |
| Vertical chapel slit | 83.35–84.45 | 03-vertical-chapel-slit-v4.mp4 | Gray scene replaces green, central vertical slit widens |
| Skeleton fire callout | 84.35–85.05 | 04-skeleton-fire-callout-v8.mp4 | Skull, fire and three-line caption; new scene reveals by luminance |
| Cyberpunk neon title | 85.00–86.60 | 05-cyberpunk-neon-title-v15.mp4 | Jagged two-color title phases, spectral figure, grade and horizontal strip reveal |
| FromSoftware quote | 87.35–88.20 | 06-from-software-quote-v9.mp4 | Heading, independently entering portrait and translucent quote box |

## Implementation and asset scope

`src/Effects.tsx` contains six draft compositions; `src/Root.tsx` registers them. Images and footage under `public/` are reference-specific demo assets. The reusable mechanisms are masks, timing and layer order; extracted title textures, presenter, skull, portrait and gameplay must be replaced for another production. The spectral samurai is a generated substitute. Static clean footage frames approximate native video motion; this is not a reproduction of the underlying actor/game animation.

## Frame timelines

1. Comic enters f4–12; artwork zoom f18–31; presentation chrome f32–37; presenter f42–47. Final green diagonal begins after f89. At f90/91/92 the upper boundary is x76/228/380 in 1280px coordinates; lower boundary is upper minus 440px. This was measured from the reference, not guessed easing.
2. Reveal f0–15: moving slanted edge `x=1500*t-450`; polygon upper boundary x+440, lower x−90. Green border travels with it. Native backing footage remains replaceable.
3. Green-to-gray f0–7; brightness/desaturation f8–23; a 4px slit is present before f13 and then width grows 14→500px through f62. Center is x640.
4. Skull f0–10, caption f7–13. At f35–41 the next scene passes over the old layers by luminance, not a single rectangle. SVG alpha is `clamp(18*(luma-threshold),0,1)` with threshold .94→.34. Bright sky and metal arm appear first; dark torso allows skull/caption to remain visible through it. The new scene overlays the incoming wake title.
5. Medium-to-close cut f24. Jagged FUCK UP template enters f26–28, yellow UP switches in fragments at f32 and is fully purple at f33. SAMURAI begins f50; spectral figure f50–58; grade f54–70; narrow glitch slices f78–85. New footage strip f86–94 uses top/bottom positions 236/490px at f90 and 136/520px by f94. Text color masks affect letters only. Texture templates are reference-specific; editable CSS text remains a fallback underlayer.
6. Heading f1–7, portrait f8–11. Quote opacity f14–17; first visible frame f15. Box X follows measured positions f15/16/17/18 = 34/88/140/188px, easing to 324px by f25. Clean portrait was extracted before the quote appears; never use an asset with part of the blue callout baked into it. Box top444, size590×184 including tail; outlined SVG polygon has a cut upper-right corner. Text X=boxX+16, top482, 54px bold Arial. Fill opacity .28. Portrait crop left33/top250, size370×450.

## Review record

Ordinary ChatGPT first review identified missing transitions in 1/4, title phases in 5, and timing in 6; 2/3 were judged ready in sampled phases. Second targeted review identified diagonal geometry, fragmented scene masking, early title texture and a premature blue fragment. Drafts v8/v8/v14/v8 address these observations. New ordinary ChatGPT conversation https://chatgpt.com/c/6ac6844f-8314-83eb-8097-9a0ccce6276f passed 1 and 4 in their corrected ranges. Final recheck of 5 v15 and 6 v9 was submitted, but ChatGPT returned “Вы исчерпали свой лимит. Повторите попытку позже.” It did not inspect these final two versions. Effects 1/4 passed corrected ranges, and 2/3 passed the earlier review. User-facing review now includes 1–4 only; 5/6 stay pending.

TypeScript `tsc --noEmit` passed, and all six compositions rendered. User approval is required before naming final library techniques, adding gallery cards or committing. Gallery previews must be the exact latest Remotion-only renders the user approves.
