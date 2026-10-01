# Approved BG3 effects, 60.20–73.10

All layout coordinates below use 1280×720 at 60fps. Frames are local; hide at the first specified outgoing frame, not one frame later. Source: https://www.youtube.com/watch?v=I6qlhmjkQ44 . User approved the five comparison versions on 2026-10-01. Implementations: [src/scenes.tsx](src/scenes.tsx).

## MAXOR_SQUID_STAGED_CARD

132 frames, 60.20–62.40. Four independent SVG glyph masks plus outline layers: SQUID f8, SQUID GAME f38, SQUID GAME HUGGY f56, full HUGGY WUGGY f80. Each scales .73→1 over12frames. Text y541,h103; widths430/565/863/1224 and x429/364/212/26. Purple gradient, white edge and dark shadow. Separate transparent organic perimeter appears f10 and fades by56. Remove title f121. `SquidScene` uses replaceable `Bg` and glyph assets; regenerate contours for different text.

## MAXOR_HUMAN_CLASSIFICATION

66frames,64.10–65.20. White bold italic glyph contours with dark shadow. HUMAN f6, HUMAN MALE f32, full HUMAN MALE FIGHTER f46. Scale .72→1 over11frames; y518,h105; x435,w420 / x275,w745 / x35,w1210. Hide f62. `HumanScene` stages masks independently over moving footage.

## MAXOR_METALLIC_RIZZ_TITLE

120frames,67.20–69.20. `MetallicTitle` exposes text, dimensions, font size, gradient colors and scale. Impact is a visual match, not proven original font. ONGYATT starts f8, y24,w550,font160; scale .75→1 through21. RIZZ KING starts51,y542,w550; scale .62→1 through72. Cyan/white/brown/orange gradient; seeded SVG turbulence/displacement inside a fixed glyph clip gives the irregular white metallic band. Remove both f112. Demo background camera is normalized, then reapplied independently: frames[0,50,51,60,75,90,119], zoom[1,1,1.35,1.7,2.1,2.2,2.2], anchor640,400. Replace background with unzoomed footage when reusing.

## MAXOR_PRONOUN_CARDS

48frames,69.20–70.00. First card separate moving video at104,146,274×429, scale .77→1 f5–14. Second PNG at58,211,352×299, scale .65→1 f17–23. Caption centered604,y515,font139: first stage f5–16 widths468→627; THEY/THEM from17 widths653→882. First scale checkpoints[5,8,12,16]→[.736,.85,.985,1]; second[17,18,20,23,27,30]→[.732,.76,.846,.963,.989,.985]. Yellow/white/purple bands, black edge #151b1b, center SVG origin. Remove all layers f31. `PronounsScene` keeps video cards and text separate. Native background character-editor motion stays in demo footage.

## MAXOR_DIFFERENCE_MEME_STACK

90frames,71.60–73.10. `MemeTitleStack`: first phase f4–43 has STUPID stat (awful), POWERFUL Rizz annotations (Times New Roman30) and UNNATURAL caption; second f44–84 has UNNATURAL Charisma and three large blended title lines. Bottom caption Impact65, baseline636, yellow #ffff53, stroke6 #A30083, shadow; widths290/559. Large text: FUCK YOU center805,baseline125,font128,width520; I CAST TESTICULAR center791,baseline540,font76,width582; TORSION center810,baseline594,font76,width282. Italic Impact, fill #4800f2, difference opacity .95/.92, independent normal dark blue edge. Hide all f85.

The reused `BlendedFillText` adds canvasWidth/canvasHeight/centerX/textWidth/fontStyle props. Its fill must be a separate root SVG with mixBlendMode; outline is a second normal SVG. Putting blending only on a text node inside a clipped SVG group isolated the blend from underlying footage in the renderer. This tested variant is [src/blended-fill-text.tsx](src/blended-fill-text.tsx); use it for blended text over video and adapt the existing TEXT_BLEND_MODES family. Difference is the best measured candidate here, not a claim about the exact Premiere mode used originally.

## Assets and limits

Selected editorial captions were removed from reference-derived demo backgrounds by masks/inpainting; recovered pixels are approximate. Native animation, game UI and particles remain footage. Organic frame and glyph contours are reference-specific extracted assets, not universal procedural generators. First pronoun card is cropped moving video, separate from background. Spell magic is native footage. First meme portrait tint uses a normalized background plus separate CSS treatment; original grade identification is uncertain. Typography uses locally licensed Impact; arbitrary replacement text needs that font or new glyph assets. No audio included. Excluded red-smear experiment is not part of this approved batch.

## Verification

TypeScript and local video playback checked. Ordinary ChatGPT inspected numbered all-frame contact sheets and enlarged entrances/stages/exits; no real-time MP4 playback by that reviewer. Squid v5, Human v3, Rizz v5 READY; final Pronouns v7 and Meme v4 READY. Previews crop these exact user-approved comparisons, never a new demo render.
