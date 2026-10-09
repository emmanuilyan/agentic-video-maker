# Four approved Maxor effects138–149sec

Source: https://www.youtube.com/watch?v=kO9HmhwGzXs
Source footage119–160 normalized to60fps before sampling. Reference analysis grids are in`reference/`. User approved all six phases on2026-10-09 and requested1–2 and3–4 to be combined into two effects. Four library entries result.

## MAXOR_SPECTRE_BLOODBORNE_SEQUENCE

Approved phases1–2 are one effect and one gallery preview.

### Phase1 — staged Spectre title

Tags: large title, staged words, condensed type, diagonal wipe.
Source138.45–139.95,90frames. First word slides horizontally into the upper center. Second phrase enters atf23 with a simultaneous gameplay cut. Condensed third word scales and rotates in atf30–38. The next anime/title scene overlaps via diagonal wipe fromf61.
`Spectre` combines three independent alpha glyph masks. Demo glyphs retain reference color and shape; replacement wording needs new glyph assets or a chosen font. Character footage is frozen and the second plate has the prior word removed.

### Phase2 — anime Bloodborne callout

Tags: cutout, two-line caption, paired entry, exit slide.
Source139.62–140.753,68frames. Cyan/magenta anime cutout on the left and white bold caption on the right enter independently, settle, then move right atf47–54. Hard cut atf56. `AnimeLayers` is shared by the preceding transition.
Reference character has a polygon alpha outline and minor edge approximation; background is an inpainted still. Caption is a glyph mask, not editable text.

## MAXOR_ESCAPE_BRACELET_SEQUENCE

Approved phases3–4 are one effect and one gallery preview.

### Phase1 — Escape Britain and flag

Tags: italic uppercase, two-stage caption, national flag, blended overlay.
Source141.00–142.333,80frames. White italic ESCAPE slides in from the left atf8–15. The second line entersf32–38; upper line shifts up. Large vector Union Jack slides in from the right and blends over footage. Next bracelet image crossfades over it fromf62.
Flag is original vector geometry with approximate source palette and screen blend. Caption uses extracted glyph masks. Background gameplay is a frozen frame.

### Phase2 — rotating bracelet

Tags: dashed ring, rotation, color difference, item callout, crossfade.
Source142.15–143.433,77frames. Centered image, yellow SVG circle with a rotating dashed sector; `mixBlendMode:difference` turns yellow into blue over lighter skin. AGED BRACELET enters from left atf14–24. Figure/title fade, scale and slide on exitf46–70.
Circle is procedural geometry and text editable. Font, blending and cleaned still figure are approximations. A ring-shaped inpaint mask removes the old ring without erasing the person's face.

## MAXOR_HOSE_OBJECT_COLLAGE

Tags: word build, serif caption, product cutouts, sequential entry, fade-out.
Source144.10–145.50,84frames. Text builds get→get the→two-line get the hose. Yellow coil enters from abovef23–27, dark coil scales/rotates in placef21–34, green nozzle enters from rightf27–34. Foreground holds, then fades over an incoming gameplay platef59–79.
Text is editable Times New Roman with magenta gradient and offset blue shadow. Foreground objects are separate polygon alpha sprites. Plate switch removes embedded old typography; small sprite edge/color remnants and font metrics differ from the reference.

## MAXOR_GIRLBOSS_HEART_STACK

Tags: three fonts, purple gradient, heart icons, meme insert, rotated card.
Source147.733–148.933,72frames. Three distinct purple word+heart masks enter from right sequentially. Rectified anime card rotates/slides in below the words; image content swaps to a second reference still. Title remains above card. All layers exit left over a next-background wipef57–60, accelerating the second half.
Three typography rows use exact source shapes and colors in alpha assets. Card's source animation is approximated by two still images; its content is not a fully recreated animated anime clip. Earlier YOU CANNOT LEVEL UP context is retained in the static menu plate.

## Review gates

Local rendered comparison inspection caught and repaired incomplete warm/purple glyph masks, duplicated background labels, incorrect ESCAPE typography and face damage from overly broad ring removal. Six v5 comparison MP4s received independent ordinary ChatGPT review. Main blockers were late overlap phases, black backdrop of bracelet, object timing and late Girlboss exit. Corrected v8/v9 frame sheets submitted for targeted recheck; see review-plan.json for exact mixed versions. Rechecks returned READY for1–5; Girlboss v10 accelerated the second half of wipe to full clearance atf60 and received READY. All six now ready for user review. User approval received; saved as four grouped library effects.

## Approved gallery previews and handoffs

The two grouped previews use only the latest approved Remotion renders. The first keeps84frames of Spectre v8 and continues Anime v8 from frame14 (138frames total). The second keeps80frames of Escape v8 and continues Bracelet v8 from frame18 (139frames total). This avoids repeating an already visible entrance at the clip boundary; the second handoff aligns the independent phase clocks and omits7 source-context frames. No new visual animation is introduced. The grouped files are re-encoded once atCRF16; gallery and skill copies are identical. Source ranges and the six approved parts are retained in review-plan.json. Hose v9 and Girlboss v10 are copied byte-for-byte. Posters derive from the same gallery MP4.

- `MAXOR_SPECTRE_BLOODBORNE_SEQUENCE` — [approved preview](../../assets/previews/MAXOR_SPECTRE_BLOODBORNE_SEQUENCE-reference.mp4), composition `01-spectre-bloodborne`, 138/60sec. Крупный титр собирается в три стадии и переходит в аниме-вставку с подписью.
- `MAXOR_ESCAPE_BRACELET_SEQUENCE` — [approved preview](../../assets/previews/MAXOR_ESCAPE_BRACELET_SEQUENCE-reference.mp4), composition `02-escape-bracelet`, 139/60sec. Двухэтапная подпись и флаг переходят в кольцо с вращающимся штриховым сектором.
- `MAXOR_HOSE_OBJECT_COLLAGE` — [approved preview](../../assets/previews/MAXOR_HOSE_OBJECT_COLLAGE-reference.mp4), composition `03-hose`, 84/60sec. Фраза дополняется словами; шланги входят сверху, растут с вращением и въезжают справа.
- `MAXOR_GIRLBOSS_HEART_STACK` — [approved preview](../../assets/previews/MAXOR_GIRLBOSS_HEART_STACK-reference.mp4), composition `04-girlboss`, 72/60sec. Три строки с сердцами появляются по очереди; снизу входит наклонная мем-карточка.
