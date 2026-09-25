# Two-Beat Game Meme Bands

## Source and result
- Source: [Baldur's Gate video essay](https://www.youtube.com/watch?v=I6qlhmjkQ44), 30.75–33.75 s.
- Output: `MemeBands`, 1280×720, 60 fps, 180 frames; gallery render: [`MAXOR_MEME_BANDS.mp4`](../../../../../docs/photo-techniques/previews/MAXOR_MEME_BANDS.mp4).
- Implementation: [`MemeScene`](../src/next-batch.tsx), standalone composition in [`Root.tsx`](../src/Root.tsx).
- Fidelity: first and second caption beats, scene cut, persistent game-like HUD and letter wave are recreated; footage, avatar and HUD art are simplified substitutes.

## Visual anatomy
Two screen-wide caption bands frame a character/game image. The first pair reads `I MAY BE OUT OF SPELLS` and `BUT NOT OUTTA SHELLS`. The scene then cuts from a posed character to gameplay, and a later pair reads `THE PLAYERS DEMAND` and `A BDSM SCENE`. Captions use pale gray faces, dark blue-gray outlines, deep extruded shadows and a slight synchronized wave. The game HUD stays around the frame.

| Layer, back to front | Placement | Treatment |
| --- | --- | --- |
| Character / gameplay background | Full frame | Hard scene change at local frame 27. |
| Simplified HUD | Bottom and upper-right | Static frame around the changing scene. |
| Top and bottom caption bands | Near the upper/lower edges | Gray Impact-style italic lettering, dark outline/extrusion, small wave. |

## Timeline

| Time / frames | Visible event | Motion |
| --- | --- | --- |
| 0–6 / 0.00–0.10 s | First caption pair appears. | Fast opacity and scale-in. |
| 6–27 / 0.10–0.45 s | First joke holds, then clears. | Caption exits by frame 27. |
| 27 / 0.45 s | Posed scene hard-cuts to gameplay. | HUD remains in place. |
| 105–111 / 1.75–1.85 s | Second caption pair appears. | Fast fade/scale-in. |
| 111–180 / 1.85–3.00 s | Second joke holds through the end. | Letter wave continues. |

## Reuse
Use `MemeScene` with local frames. Set `textA`/`textB` on `MemeCaption` for new copy, and change the `second` threshold in `MemeScene` when the cut or second caption beat moves. Keep caption presentation in screen space while footage changes behind it.

## Evidence and uncertainty
Timing is taken from the 30.75–33.75 s source range and the reviewed three-second draft. The illustrated character, landscape and HUD are deliberately generic; replace them with licensed or user-provided footage/assets for a closer production recreation.

## Verification
Standalone render from the approved comparison revision; lint and TypeScript passed. Gallery preview and poster use the same render.
