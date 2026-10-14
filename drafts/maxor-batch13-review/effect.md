# Six approved Maxor effects,127–138 seconds

User approved on2026-10-09 after ordinary ChatGPT pre-review and two targeted rechecks. Source: https://www.youtube.com/watch?v=kO9HmhwGzXs . Geometry1280×720,60fps. Each independent composition uses its local frame. Timelines in review-plan.json.

| ID | Composition | Tags | Frame recipe |
|---|---|---|---|
|MAXOR_ZERO_TEXTURE_TITLE|01-zero|двухэтапный титр, цветная фактура|f8 title enters upward; f22 close cut and second line; f46 hard cut. Source glyph matte preserves letter geometry; animate hue inside mask.|
|MAXOR_SNEAKER_LOGO_SLIDE|02-shoe|кроссовок, логотип, въезд|f5–13 shoe from left, f14–23 logo from right, hold both. Independent cutout and logo alpha.|
|MAXOR_CONTRAST_CRUSH_RAMP|03-crushed|контраст, тёмные тени, цветокоррекция|f12–32 contrast1→2.2 and saturation1→.5; slow camera enlargement; f42 hard cut.|
|MAXOR_COMIC_GRACE_COLLAGE|04-comic|комикс, наклонная карточка, контур|f4–16 comic from right to x96,y42; f20–27 contour alpha; f34–44 second card from right, scale.7→1, rotation15→10°; f70 cut.|
|MAXOR_CASTLE_WIPE|05-wipe|проявление фона, шторка справа, перекрытие|Initial background dissolve with ramp−7–30; f42–60 castle clip-path right→left; f92–96 next portrait scale.05→1. Preserve overlap last4frames.|
|MAXOR_MEME_BURN_TRANSITION|06-memes|вращение мемов, solarize, маска яркости|f6–17 portrait scale; f24–29 cat slide, f24–32 rotation−80→17°; f46 burn LUT+edge filter; f54 incoming footage luma mask and IN, f57 DARK SOULS; f66 full new background; portrait exitsf64–70.|

## Reuse and limits

Import components from src/Effects.tsx and register a matching composition from src/Root.tsx. Replace plate and sprite files in public/assets. Use the documented local frame timings as editable parameters when adapting duration. For live footage, replace background Img layers with a separately timed video layer while retaining independent masks/transforms.

These examples use still background plates, restored text backgrounds and source-specific glyph/cutout mattes. Gameplay movement is not recreated. Burn colors and edge treatment are approximate; the LUT was fitted to reference colors and requires recalibration for different footage. The ZERO title is a source-specific glyph stencil, not editable font text. IN DARK SOULS is a separate editable text layer. Meme text remains part of the original image asset. Incoming footage uses a luma-keyed still and then a clean still, not the original effect video.

Exact user-approved renders:1–4v4,5–6v5. Gallery and skill preview use the Remotion-only MP4; posters derive from that same file. Review comparisons are excluded from library previews.
