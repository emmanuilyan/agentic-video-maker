# Six Maxor drafts,108–120 seconds

Source https://www.youtube.com/watch?v=kO9HmhwGzXs . Next batch after107.55s. Native UI/actions are not claimed as recreated effects. All six effects approved by the user on 2026-10-08. Source downloaded107–132s and normalized to H264,60fps before extracting assets; the downloaded file may contain negative preroll timestamps. Canvas1280×720.

## Recipes
1. LIMGRAVE: full landscape dissolves into second plan f16–24; centered white Arial116px label f18–23; label stays fully visible; horse scene hardcutf51. Labels are normal alpha, not outlined neon. Source108–109.
2. TREES: clean horseback plate; separate left foliage PNG at(0,160),620×560 enters fromleft f11–17, separate right tree(740,0),540×720 enters f17–22; both hold; hardcut to statue f48. Source109.05–110.35. Tree silhouettes are source-specific approximations from saturation mattes.
3. MARTINCITOPANTS: wide→close push f0–13 with short blur; font82px Arialbold white Martin/cyan citopants, bottom15,right23; reveal f35–43; cleanNPC scene f65. Source112.8–114.1.
4. WALTER: NPC plate push f17–38, briefblur f34–40; hard foreground replacement f39 with an independent manually traced Walter PNG and slightzoom; hardcut back to dialogue f65. Source115.55–116.9.
5. RED CIRCLE: initial dialogue, new portrait atf7, red circle f12–27, then hardcut. Ellipse center640/360,radius273; rgba115/0/15/.43. Whole-scene scale pulses .92→1.08→1 acrossf0–17, shortblur. Source117.9–118.7. Base color under the circle was approximately recovered from the reference, so the grade is estimated.
6. SHOWER QUOTE: wide→close push f7–15; translucent blue SVGbox left428/top326,size490×152; thin blue edge with upper-right tail and cut lower-left corner. Yellow TimesNewRoman46px text left468/top351. Typewriter firstline TOOK A SHOWER f21–30, secondline WITH YO f41–51; box/text disappear with hardcutf69. Source118.75–120.1. The original itself says WITH YO in this passage; no missing suffix is invented.

## Adaptation and uncertainty
Source-specific still plates approximate native motion; do not claim a full gameplay reconstruction. Tree matte, Walter edge and underlying recovered circle colors are approximate. Static text treatment does not recompute blend with moving footage. Replace assets and expose scene timings/colors/phrases when integrating into another production. Source and clean plate transformations are separate from all editorial overlays.

## Review
Ordinary ChatGPT reviewed six complete comparisons at 60fps in conversation 6abab094-3d00-83eb-8668-6804762c56a6. It accepted the red-circle v2 and flagged exits in 1/2/4, label geometry in 3, and typewriter rhythm in 6. Applied frame-specific fixes to 1/2/4/6. For 3, direct inspection of frame44 showed the source label was wider and lower (the reviewer incorrectly described it as smaller); adjusted to82px,bottom15 based on actual pixels. Tree matte and crop also corrected. Latest comparisons: v7 for1/3/6, v8 for2/4, v2 for5. User approved all revised versions on 2026-10-08; no second ChatGPT verdict was obtained.

## Library IDs and approved previews

- `MAXOR_LIMGRAVE_CENTER_TITLE` → `01-limgrave`; [approved preview](../../assets/previews/MAXOR_LIMGRAVE_CENTER_TITLE-reference.mp4): Белый центральный титр над сменой пейзажа и резкий выход всей сцены.
- `MAXOR_PAIRED_TREE_INSERTS` → `02-tree-inserts`; [approved preview](../../assets/previews/MAXOR_PAIRED_TREE_INSERTS-reference.mp4): Две цветные кроны выезжают с разных сторон игрового кадра.
- `MAXOR_MARTIN_NAME_REVEAL` → `03-martin-name`; [approved preview](../../assets/previews/MAXOR_MARTIN_NAME_REVEAL-reference.mp4): Зум и раскрытие бело-циановой подписи справа внизу.
- `MAXOR_WALTER_CHARACTER_SWAP` → `04-walter-swap`; [approved preview](../../assets/previews/MAXOR_WALTER_CHARACTER_SWAP-reference.mp4): Приближение к персонажу, резкая замена на мем-вырезку и возврат.
- `MAXOR_RED_CIRCLE_PULSE` → `05-red-circle`; [approved preview](../../assets/previews/MAXOR_RED_CIRCLE_PULSE-reference.mp4): Пульс масштаба и полупрозрачный красный круг поверх персонажа.
- `MAXOR_TYPEWRITER_QUOTE_BOX` → `06-shower-quote`; [approved preview](../../assets/previews/MAXOR_TYPEWRITER_QUOTE_BOX-reference.mp4): Синяя полупрозрачная плашка и жёлтая надпись: первая строка, пауза, вторая.

Gallery MP4s are the exact approved Remotion-only renders (v7 for1/3/6, v8 for2/4, v2 for5); posters derive from the same MP4s.
