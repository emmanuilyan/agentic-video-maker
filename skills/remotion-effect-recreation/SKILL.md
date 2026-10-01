---
name: remotion-effect-recreation
description: Analyze a reference video, recreate a visual or motion effect in Remotion, and document an implementation recipe another agent can reuse. Use for requests to copy an effect from a clip; not for general video editing without a reference effect.
---

# Recreate a video effect in Remotion

Deliver both a working Remotion implementation and an effect recipe. A verbal analysis alone does not complete a recreation request. Write the recipe after building and checking the implementation so it records what actually works.

## Review-first workflow for reference clips

When the user sends a video to find transferable techniques, look for brief effects (usually about five seconds or less), such as a frame, title, text treatment, transition, or footage distortion. Give each candidate a provisional descriptive name and record its exact source interval. Recreate one candidate at a time as a short Remotion draft.

Use this approval sequence:

1. Analyze the reference in layers and write down the user's stated preferences before building. Include geometry, timing, typography, color, masks, blending, and how overlays interact with the footage.
2. Render the draft and prepare a playable comparison using the same crop and timestamps, with the original on the left and the Remotion version on the right. Include the source interval and make both videos viewable in the conversation; do not send only a written description or still image.
3. Before showing the draft to the user, use the existing ordinary ChatGPT conversation in the in-app browser for an independent visual comparison when available. Make sure the video or compact, legible comparison sheet is actually visible to ChatGPT. Ask for concrete differences grouped by visual layer and severity. ChatGPT is a pre-review gate, not the user's approval: when it still sees material differences, fix and recheck them; when it finds no material differences, send the playable comparison to the user for the actual decision.
4. Apply ChatGPT's material corrections directly in the draft, preferably in one batch. Re-render and ask ChatGPT to recheck the changed details. Repeat this internal review until the main visual differences are resolved; keep any remaining minor stylization differences explicit.
5. Send the user the playable original-versus-draft comparison and the source interval for review. Keep the technique provisional and all files out of the skill library and Git until the user approves it. Treat approval per named technique; a user can review several named techniques together. If the user requests changes, revise and repeat the comparison step.
6. After approval, settle on the final technique name and useful search tags, then add the reusable implementation, example, recipe, and preview to the relevant Remotion technique library. For its gallery card, attach the exact latest Remotion render shown in the final comparison that the user approved, and derive the poster from that same render. Do not substitute the source clip, a comparison layout with both videos, or an earlier draft. If the render changes after approval, show the new version and get approval again before replacing the gallery preview. Verify the card is visible in the right category and its preview plays. Commit only the approved files to Git, preserving unrelated working-tree changes. Push only when the user asks.

For a long source, continue with the next unreviewed interval only after the current candidate reaches the user's approval gate. Keep unapproved drafts local and separate from approved library examples.

## 1. Locate the effect

- Identify the source video and the exact time range of the requested effect. If the user has not specified a range, inspect the video and choose the relevant range; state the choice.
- For a long source, work in bounded segments. Record the covered interval and the next interval with a short overlap in [the coverage ledger](references/long-video-coverage.md). Inspect each segment densely; a sparse whole-video pass is only an overview.
- Inspect video dimensions, frame rate, duration, and audio with `ffprobe` or an equivalent local tool. For a URL, obtain a local copy through an available public download method when allowed. If access fails, report the blocker rather than inventing the visual.
- Use representative frames to map composition and layers. For fast motion, inspect consecutive frames around the start, extrema, transitions, and end. A sparse overview cannot establish exact easing or frame timing.
- Record what is visible separately from what you infer: timing, layer order, masks, transforms, typography, color, blur, particles, camera movement, and sound cues. Mark uncertain or occluded details as estimates.
- Separate editorial overlays and transitions from subtitles, UI, particles, camera moves, and light already inside the source footage. Recreate only what the task calls for, and note uncertain attribution.
- If `watch` is available, it can help survey the clip, but inspect dense frames locally for motion measurements.
- For a local clip, use [the bundled FFmpeg tools](references/tools.md) to save frames with source timestamps, measure an accent color or its moving edge, and compare the Remotion render to the reference. Keep the extracted evidence next to the effect recipe when it is useful for later revision.

## 2. Build the smallest reusable implementation

- Use the existing Remotion project when one is supplied. Otherwise create a small local Remotion project or isolated composition suitable for running the effect. Follow `remotion-best-practices` and load its relevant creation, markup, and rendering guidance.
- If `remotion-photo-techniques` already provides the observed mechanism, adapt its component and verify it against the new reference. `TEXT_HIGHLIGHT` supplies the measured yellow marker reveal from the knuckle-video example.
- If a title, graphic, or overlay takes on the color or contrast of the footage, inspect its blend mode, fill opacity, and edge separately. Start from [TEXT_BLEND_MODES](../remotion-photo-techniques/examples/text-blend-modes/effect.md): use its [BlendedFillText](../remotion-photo-techniques/assets/techniques/blended-fill-text.tsx) for CSS modes over moving footage; use the [pixel compositor](../remotion-photo-techniques/assets/techniques/premiere-blend-still-text.tsx) for the additional Premiere-style modes over an image or frame sequence. Compare several candidate modes on the same source frame before choosing one; do not replace a required custom mode with a visually different CSS mode.
- For a complete reference-to-recipe example, see the [yellow highlight demo](../remotion-photo-techniques/examples/yellow-highlight/README.md) when working in this repository. It includes a runnable Remotion composition, an `effect.md` recipe, and a committed preview.
- Separate the reusable effect component from its demo composition. Expose parameters that materially vary between uses: duration, colors, text or media, intensity, direction, and relevant timing. Keep values measured from the reference as defaults where practical.
- Express timing in frames relative to the composition FPS. Keep animation deterministic from frame and props so seeking and rendering produce the same result. Preserve aspect ratio and explain any crop or scaling choice.
- Recreate the visual mechanism with Remotion, CSS, SVG, canvas, or appropriate assets. Distinguish a reusable effect from reference-specific footage, logos, fonts, and sound. Use user-provided assets when available and identify substitutes.
- Do not present an embedded clip of the reference as an implementation of the effect.

## 3. Compare and revise

- Render or capture the Remotion output at meaningful checkpoints, including the first visible frame, peak motion, transitions, and final frame. Compare against source frames at matching times and dimensions. For moving effects, check a short rendered sequence as well as stills.
- Before the first review, make a layer checklist from the reference (for example: frame, central title, side ticker, background interaction, and glitch). Compare every layer in one compact contact sheet: same timestamps and crop, source on the left and draft on the right. Resize the sheet enough to upload reliably while preserving text legibility; confirm the reviewer can actually see it before asking for feedback.
- Ask the reviewer to list only concrete mismatches by layer and severity. Apply all material fixes together, then request a targeted recheck of those fixes instead of restarting a broad critique. Carry the user's already stated preferences into the initial brief.
- Correct material differences in geometry, timing, layering, easing, color, and typography. Stop when the result is visually credible for the requested scope; report remaining mismatches precisely.
- Run the project's relevant build or type check and a Remotion render or equivalent preview verification. State which checks actually ran and where the result is stored.

## 4. Write the reusable effect recipe

Create an `effect.md` next to the implementation, using [the recipe format](references/effect-recipe.md). Give another agent enough information to rebuild the effect without the source video: normalized layout measurements, a frame timeline, layer order, animation formulas or easing, assets, props, and a short usage example or entry point. Link to the tested implementation and rendered preview. Distinguish observations, estimates, and creative substitutions.

In the final response, provide links to the Remotion code, preview, and recipe. If no source video was supplied, ask for the video or URL; the effect cannot be analyzed yet.

## Analyzed examples

- [The first 0:00–0:30 of a long fantasy video essay](examples/baldurs-gate-intro-0000-0030/effect.md): an exploratory catalog of overlays, picture inserts, caption styles, glitch, rough frame, and impact flashes. Use it to locate candidates; present each one for approval before adding its recipe, implementation, or preview to Git.
- [Dice Glitch Quote at 0:41.05–0:41.53](examples/baldurs-gate-dice-glitch-fall-4105/effect.md): approved 60-frame Remotion example with whole-scene RGB smear, fragmented reveal, pixel quote, and extended real d20 fall. The example includes a runnable composition and the exact right-hand preview from the approved comparison.
- [Formula RGB Portrait, 0:10.70–0:11.60](examples/formula-rgb-portrait-1070-1160/effect.md): a two-face hold that ghosts the selected portrait before a face-anchored push-in with soft color bands, drifting formulas, and narrow RGB edge splits.
- [Editor Nameplate, 0:13.20–0:15.20](examples/editor-nameplate-1320-1520/effect.md): three gallery states where the left insert and slanted title lead each character change, followed by a one-way zoom of the character and background.
- [Approved effects from 0:00–0:09](examples/baldurs-gate-approved-effects-0000-0900/effect.md): four user-approved examples with runnable components and a synthetic-media preview.
- [Approved effects from 0:17.10–0:33.75](examples/baldurs-gate-approved-effects-1710-3375/README.md): four more user-approved examples (electric impact title, two-stage D&D lower third, wavy explosion title, and two-beat caption bands), with standalone renders, recipes, and a runnable Remotion project. The original footage is not bundled.

## Approved BG3 batch44–60seconds

Use [five approved montage examples](examples/baldurs-gate-approved-effects-4405-6035/README.md) for `MAXOR_POKEMON_CALLOUT`, `MAXOR_EXPLOSION_COUNTDOWN`, `MAXOR_N64_PIXEL_CAPTION`, `MAXOR_COMIC_FRAME_CAPTIONS`, and `MAXOR_CHARACTER_NAMEPLATES`. Recipes, independent layers and the exact approved previews are included.

## Approved BG3 batch60–73seconds

Use [five approved examples](examples/baldurs-gate-approved-effects-6020-7310/README.md) for `MAXOR_SQUID_STAGED_CARD`, `MAXOR_HUMAN_CLASSIFICATION`, `MAXOR_METALLIC_RIZZ_TITLE`, `MAXOR_PRONOUN_CARDS`, and `MAXOR_DIFFERENCE_MEME_STACK`. The recipe includes exact stage/cut timing and a tested TEXT_BLEND_MODES variant with separate blended-fill and normal-outline SVG layers.
