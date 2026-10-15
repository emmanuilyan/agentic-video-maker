# Approved: five non-text montage variants, 405–431s

Source: https://www.youtube.com/watch?v=I6qlhmjkQ44, 1280×720, 60fps. User approved saving after explicitly discussing partial recreation and frozen source footage. These are approved approximations.

## Reusable mechanisms

- LOCATION_MATCH_DISSOLVE (404.90–405.90): two framed shots dissolve over frames22–30 while first shot pushes1→1.38 before the dissolve; incoming shot pushes1→1.02. Frame/text artwork inherited from still source; no original transition video is embedded. Game and live-action motion frozen; original has larger evolving crop and label.
- EDITOR_SHOT_SWITCH (408.00–409.20): face/editor still switches to full-body class editor at frame26. Short5px blur recovers over12frames, incoming scale1.025→1. Frozen pose/native UI. Original blur may combine game camera and editorial blur; attribution uncertain.
- MOD_MANAGER_ASSEMBLY (417.30–418.10): background still, left card at8frames, central panel at13, right at20. Each starts45% size and expands to1 over12/10/13frames. Cards are individually extracted; hidden panel regions repaired with local inpainting. Labels inside panel are raster artwork. Window growth slightly approximate.
- PORTRAIT_SCREENSHOT_CALLOUTS (418.40–419.00): existing right callout and portrait frozen; separate left card grows from frame14 over16frames. Masked polygon preserves tilted edge. Soft peripheral blur inherited in still. Native portrait and right-callout motion not reconstructed.
- PAIRED_DOSSIER_DISSOLVE (429.45–430.60): incoming first dossier stabilizes from114% to100%, blur9→0. Second portrait dissolves frames37–49; separately extracted colored name enters frames35–39. Initial6frames rebuild red/cyan channel separation. Source is two frozen card textures. Title is a raster alpha mask, including approximate repaired edges. Original RGB entry remains less pronounced.

src/effects.tsx contains parameterized LayeredDissolve and GrowingCard. Deterministic useCurrentFrame(), 60fps. `npm run typecheck`; `python3 render-batch.py` renders out/ and comparison MP4s in review/, original left/recreated right. Consecutive reference sheets in review/.

Independent ChatGPT review unavailable: existing conversation failed, then Cloudflare human verification after reload. No successful independent review verdict obtained. User subsequently approved saving these exact renders.
