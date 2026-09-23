# Ready assets from ordinary ChatGPT

Generate the story's chosen character and environment as replaceable files. The default pack is an original sketchbook illustration, not a requirement to reuse a particular creature or platform design.

## Chat handoff

Use an appropriate existing ordinary ChatGPT conversation and verify its current mode in the available UI when this matters to the user's preference. A `chatgpt` record type alone does not establish ordinary Chat mode. Do not create a new conversation unless requested. Use supported send/read tools or browser UI; do not infer or call private backend endpoints. Do not promise quota savings without evidence.

Send one compact brief: story setting, chosen medium, palette, exact asset list, file dimensions/anchors and requested delivery. For visual plans or image/photo search, ask for a short shot plan and candidate source links. State explicitly that ChatGPT should not fact-check the supplied story unless the user asked for that. Ask for ready separate assets with a manifest, not only suggestions or prompts. Download actual attachments and inspect them. If ChatGPT claims a file is attached but no download exists, request the actual attachment or complete SVG source once. Complete SVG text is usable as a ready vector file; inspect external references and active content before saving it. If reliable transfer remains unavailable, save one ready-to-send brief for the user, report the limitation, and continue independent mechanics work without labeling replacement art as ChatGPT-generated.

## Starter brief

Adapt this to the story rather than copying the demo theme automatically:

> Create ready reusable art for a 9:16 upward-jumping narrative video. Medium: hand-drawn ink and soft colours on a quiet paper world. Original character; full body; clear silhouette; no text. Deliver separate transparent PNGs or self-contained SVG files, plus manifest.json. Hero: 320×360, foot anchor (160,340); platforms: 400×100, top contact surface at y=20; cloud: 400×220; mountain: 500×700; leaf: 160×220; star: 160×160; paper tile: 512×512 opaque, vertically seamless. Use filenames hero.svg, platform.svg, cloud.svg, mountain.svg, leaf.svg, star.svg, paper-tile.svg. Return real downloads; if file delivery is unavailable, return complete SVG source strings as a JSON object keyed by filename. No sheet, labels, checkerboard backdrop or unexplained extra versions.

Request alternate poses or worlds only when needed. All character poses share one silhouette scale and the same foot anchor. Platform top surfaces remain visually usable for contact; clouds and decorative shapes do not define collision geometry.

## Pack validation

Keep assets under `public/assets/<pack>/` and their paths/metadata in `src/data/skins.json`. Record the chat URL, generation date, filenames, any local transformations and source status in `SOURCES.md`. Validate actual source dimensions and alpha. Inspect cutouts over light and dark backgrounds and the paper tile across several vertical repeats. Transparent margins can be intentional for consistent pose anchors; update metadata whenever trimming them.

At minimum, replace the hero and platform together for a coherent new setting; the palette and scenery are independently editable. At runtime, the same route and camera should work for both the original and replacement packs. Test at least one exact landing and an airborne frame after replacing art.

## Real historical photos

When the user wants documentary imagery, ask ordinary ChatGPT for a compact candidate list rather than generated lookalikes. Request a direct source page, direct downloadable file when available, date or depicted event, institution/author, and a short rights or licensing note. Reuse the existing relevant chat. Ask for several distinct candidates per era so successive climb reveals do not have to repeat one image.

Download only selected files, then verify the actual file type, pixel dimensions and visible content locally. A `.jpg` URL that returns HTML is not an image. Record the source page, file URL, retrieval date, rights note and any crop or factual caveat in `SOURCES.md`. Treat a plausible identification as uncertain until the source supports it.

Register chosen files in `story-assets.json`; keep crop decisions in `objectPosition`. Do not bake dates, arrows or explanatory labels into a photograph unless the user explicitly wants that treatment. Place added text in the surrounding composition so the image remains readable and can be replaced without recreating typography.
