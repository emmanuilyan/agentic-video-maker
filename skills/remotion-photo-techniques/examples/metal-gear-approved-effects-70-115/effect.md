# Approved effect recipes

Implementation: [Effects.tsx](src/Effects.tsx). Registration: [Root.tsx](src/Root.tsx). Pass local `frame` and `duration`; all movement is deterministic. Default assets live in `public/assets`. For editable content, replace each asset by role; retain timings below. Source intervals and frozen user-approved comparisons are in [README.md](README.md). Canvas1280×720,60fps. Coordinates below are pixels; normalize x/1280,y/720 when porting.

## MG_LOGO_UI_BLEND — логотип поверх интерфейса

Tags: logo overlay, screen blend, UI preservation, zoom dissolve. Component `TwitterBehindUI`,72frames.

Layers: outgoing UI plate; blue logo at(420,160),445×445; incoming scene. Logo uses `screen`, preserving white letters and the luminous ring. Opacity keyframes f6/17/24 =0/.55/.63; scale f6/24/56=.7/.99/1.03. Old group moves from scale1 to1.03 atf56 and1.2 atf63, x0→−15→−35, origin50%45%. Incoming opacity f57/63/64=0/.65/1; old group absentf64.

Replace `twitter.svg`, `twitter-clean.png`, `twitter-ui.png`, `twitter-next.png`. The bird silhouette is a substitute; the UI is a held source-specific plate. For moving footage, place footage in the same group under the screen logo.

## MG_SETTING_ARROW_ZOOM — наезд на настройку со стрелкой

Tags: menu focus, camera push, staged caption, red arrow, difference blend. Component `ResolutionPunch`,90frames.

Layers: menu plate; arrow; independently positioned text using difference blending; next scene. Menu scale f0/27/32/45/65=1/1/1.14/1.66/2.08 around(115,148); screen y f27/41/53/65=0/40/78/103. `high` entersf27–32 at x−150/−40/68/151/216/240, y450, Arial110; `high resolutions` replaces it fully atf41. Arrow SVG210×125 scales1.3; x f46/53/60/63/66=1260/950/560/455/425, y590/425/265/238/230. It crosses the title then brakes near the selected setting. Hold throughf86, next cleanf87.

Replace menu/next plates and two strings in the component. Re-anchor zoom and arrow together for another target row. Arial and the vector arrow approximate reference typography/artwork.

## MG_MEME_STRIP_SQUASH — сжатие видео в мем-полоску

Tags: vertical squash, meme split, central strip, whole-group zoom dissolve. Component `WatameSplit`,114frames.

Layers: incoming city; meme card with a narrow central seam; fullscreen gameplay overlay. Full gameplay holdsf0–4. ScaleY f4/5/7/10=1/.75/.42/.105 around center; overlay opacityf9–12=1→0, exposing card. Hold card throughf74. Entire card (text, face and strip together) scales f74/75/76/78/80/81=1/1.045/1.10/1.25/1.40/1.45; opacityf74/75/76/78/81/82=1/.88/.74/.47/.12/0. City starts behind atf75 and is cleanf82, with slight−12px drift afterward.

Replace `watame-game.png`, `watame-card-f12.png`, `watame-next.png`. The sample card has baked reference lettering and a held gameplay seam; for independent editable titles prepare your own card or separate layers inside the same scale container. This is full-frame squash, not a cropped gameplay viewport.

## MG_GLITCH_PORTRAIT_PILEUP — глитч-коллаж с разъездом фотографий

Tags: portrait pileup, coarse slice glitch, progressive title, independent photo exit. Component `PresidentPileup`,126frames.

Layers: gameplay contextf0–10; close gameplay platef11–108; right portrait; three coarse distorted band clones; large left photo; small foreground photo; transparent title; next scene on exit. Right portrait width732,height720, normal opacity.78. Entry x f37/38/41/44=1210/1090/710/548. Small foreground at y315,height405, width310 (285 afterf73), x f44/46/48/49=−295/−120/−20/0. Large left545×720 enters x f68/69/71/74=−515/−380/−135/0. Title at(0,570),1280×150 rises120→0px f12–17; swaps stagesf38/f65.

Glitchf37–108: phase=floor(frame/3); three bands y=[phase×29 mod220,220+phase×17 mod190,440+phase×11 mod180], heights18+(i×11+phase×7) mod27, xshift=sin(phase×1.7+i×3.1)×10. Clip each pixelated scene clone to its band. This preserves large intact areas and changes slice locations over time. Reference slice geometry is approximate.

Exitf109–116: next scene replaces gameplay; right photo has normal opacity.48 and no gameplay ghost or glitch. Right x f109/110/111/112/113/114/115/116=548/600/690/812/980/1145/1250/1280. Left x=0/−25/−95/−183/−310/−425/−520/−545. Small foreground follows a slower early left curve. Title moves down170px. All old layers gonef116.

Replace clean/pixelated gameplay and portrait pairs, large left photo, small photo pair, three transparent title stages, and next scene. Pixelated assets are nearest-neighbor downsampled stills; prepare corresponding versions for replacement media. Reference title PNGs preserve custom lettering but are not editable text; replace them with your own transparent title artwork.

## Assets and limitations

Reference-specific held gameplay, meme crops and extracted lettering are included only for this approved recreation. They are not a generic asset license grant. The independent right portrait is adapted from [Pete Souza's official2009 photograph](https://commons.wikimedia.org/wiki/File:Official_portrait_of_Barack_Obama.jpg), [CC BY3.0](https://creativecommons.org/licenses/by/3.0/), cropped and resized. The logo SVG is a silhouette substitute. Review MP4s contain original-left footage; gallery MP4s contain only the Remotion reconstruction. Preview code and timing are frozen to the user-approved versions.
