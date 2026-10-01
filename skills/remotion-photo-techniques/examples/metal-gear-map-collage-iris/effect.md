# MG_MAP_COLLAGE_IRIS

## Map → closing iris (29.467–30.933)

Current comparison: previews/MapCircle-v13.mp4, ChatGPT READY2026-10-01; approved by user2026-10-01. 88 frames. Original interval29.467–30.933. Before f12 and from f74 onward, unaffected source footage. Collage reveal f12–22 uses sqrt(clamped linear f11→22). Blue map pan f12→36: x157.2→0; cream map f36→64: x−39.27→144, y31.91→−117. Both maps1664×1104 with192px overscan. Palette crossfade f36→42.

Foreground is separately extracted actual gameplay footage: foreground_sequence.py registers a seed matte from source f64 using ORB and affine estimation, refines each alpha mask with GrabCut, fills enclosed holes and preserves the lower building façade. Assets map-foreground-sequence/022.png–064.png; displayed frame is clamp(f,22,63). Early entrance f12→22 uses scale1.12→1 and y−40→0. The original foreground camera motion continues f22–63. During the iris the foreground holds frame63 and scales1→1.035 at f64→69. The source map is removed; map pan, palette crossfade, reveal and iris are separate deterministic Remotion layers.

Closing iris centered(640,360), radii at f64…75:750,640,570,500,430,360,290,220,150,80,0,0. The full collage is clipped by this circle over the next-scene plate. Atlas geography/type are deliberately substituted from the public-domain CIA/LOC map, not claimed to match source printing. Previous v5–v8 foreground padding and source-map fragment reconstruction are superseded. Effect code project/src/Effects.tsx, CircleCollage; demo project/src/Comparison.tsx.

## Assets and adaptation

Source https://www.youtube.com/watch?v=41v3L0zCkNY ,29.467–30.933. Atlas: https://commons.wikimedia.org/wiki/File:Political_world_map._LOC_00559557.jpg , public-domain US government work. The new atlas geography/type differs intentionally. Prepared alpha footage22–63 preserves real gameplay motion, while source-map pixels are excluded. Masks are source-specific estimates refined by GrabCut and a manually traced roof contour, tracked per frame with ORB/affine. Replace demo footage/mattes for another scene.

Layer order: before/after plate, panning blue atlas, panning cream atlas with palette opacity, gameplay alpha sequence; reveal opacity and iris mask wrap all collage layers. Foreground is held at22 during entrance and63 during exit. All parameters use local60fps frames. Original footage outsidef12–73 supplies surrounding cuts only.

Approved implementation src/Effects.tsx; exact approved solo preview ../../assets/previews/MG_MAP_COLLAGE_IRIS-reference.mp4. TSC/render successful; ChatGPT checked all88frames in blocks8 and enlarged transitions, READY11m6s. User approval2026-10-01.
