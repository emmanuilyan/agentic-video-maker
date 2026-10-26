# Approved Maxor effects,188–201 seconds

User approved all five playable comparisons on 2026-10-26. Source: https://www.youtube.com/watch?v=kO9HmhwGzXs. The separately approved portrait is in ../maxor-approved-portrait-192/.

## Reuse

1280×720,60fps. Install package dependencies, then render: `npx remotion render src/index.tsx EFFECT_ID out/effect.mp4`. Register exports from src/Effects.tsx and provide the PNG files in public/assets. Replace the held backgrounds and cutouts while preserving documented timing and layer order. Frame values are zero-based. Animation uses useCurrentFrame/interpolate; Space is procedural radial star lines.

## Approval and limitations

These are user-approved approximations. Initial independent ChatGPT review requested corrections; a repeat verdict could not be obtained because the ordinary ChatGPT dialogue returned an error. Do not label these final versions ChatGPT READY. Gameplay, memes, fire and restored backgrounds are held raster plates; native gameplay movement/fire deformation is not recreated. Typography, globe geography, color treatment and mattes approximate the reference. Raster glitch lettering and cosmic background reconstruction may retain source artwork/repair artifacts. No new render was substituted after approval: gallery MP4 files are byte-identical copies of the precise versions shown in the final comparisons. Posters come from those MP4s. approved-manifest.json records hashes, source intervals and provenance.

## MAXOR_NO_CAP_HAT_CALLOUT

NO CAP: подпись и шапка. Source 188.30–189.20s; 54 frames; approved v7. Component `NoCap` in src/Effects.tsx.

Tags: caption, hat, callout, maxor.

f0 no; f4 hat at x810/y145, 140×100; f6 CAP; f34–42 fade all overlays; f42 clean held plate.

Exact approved Remotion-only preview: [MP4](../../assets/previews/MAXOR_NO_CAP_HAT_CALLOUT-reference.mp4).

## MAXOR_PLANET_COLOR_HIT_TITLE

ON THE PLANET: цветовой удар и глобус. Source 190.75–192.25s; 90 frames; approved v8. Component `Planet` in src/Effects.tsx.

Tags: staged title, globe, color hit, maxor.

f24 color-hit held plate and ON; f40 THE; f44 procedural space and circular texture crop; f47–54 contour fades in as filled circle fades out; f52 PLANET and title moves upward; f78 next scene. Georgia 200px, magenta fill, white/cyan shadows. Globe is an approximate raster contour, not a physically rotating globe.

Exact approved Remotion-only preview: [MP4](../../assets/previews/MAXOR_PLANET_COLOR_HIT_TITLE-reference.mp4).

## MAXOR_CLEVELAND_MAP_ZOOM

CLEVELAND OHIO: карты и зум. Source 194.30–196.20s; 114 frames; approved v7. Component `Cleveland` in src/Effects.tsx.

Tags: map collage, zoom, caption, maxor.

f3 Ohio enters left; f10 county enters bottom; f15 town enters right; f5 title and underline; f25–30 SpongeBob enters upper right; f25–60 grows .6→1.8, f30–70 rotates −25→25 degrees; f65–83 group scale 1→1.5, title changes to outline; f68 city grid replaces maps; f82–93 group fades; f88 queen background.

Exact approved Remotion-only preview: [MP4](../../assets/previews/MAXOR_CLEVELAND_MAP_ZOOM-reference.mp4).

## MAXOR_MARINARA_RGB_ZOOM_OUT

QUEEN MARINARA: коллаж и цветной вылет. Source 195.90–197.30s; 84 frames; approved v5. Component `Marinara` in src/Effects.tsx.

Tags: food collage, RGB trails, zoom out, maxor.

f0 gradient border and QUEEN; f14–23 left plate enters; f18 MARINARA; f22–31 right plate enters and rotates 75→0 degrees; f55–66 own rendered collage snapshot replaces live layers, scales anisotropically, blurs and leaves two faint hue-shifted trails; f62 curtain background. Snapshot marinara-hold is our composition, not a source-video frame.

Exact approved Remotion-only preview: [MP4](../../assets/previews/MAXOR_MARINARA_RGB_ZOOM_OUT-reference.mp4).

## MAXOR_FIRE_COSMIC_UNIVERSE

Огонь → космос → THE FUCKING UNIVERSE. Source 197.60–201.20s; 216 frames; approved v6. Component `Fire` in src/Effects.tsx.

Tags: meme montage, color hit, cosmos, staged title, maxor.

f5–20 flame enters right; f25–77 purple/screen grade; f28–77 lower raster glitch lettering jitters; f62–84 green flame insert; f75–95 base flame moves left/down and shrinks; f78 space; f110 THE/FUCKING caption; f112 flame ends, blue cosmic background and glowing figure; f147 UNIVERSE; f150 galaxy replaces blue cosmic scene. Caption has gradient fill, cyan shadow and −8 degree rotation.

Exact approved Remotion-only preview: [MP4](../../assets/previews/MAXOR_FIRE_COSMIC_UNIVERSE-reference.mp4).
