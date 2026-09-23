---
name: remotion-effect-recreation
description: Analyze a reference video, recreate a visual or motion effect in Remotion, and document an implementation recipe another agent can reuse. Use for requests to copy an effect from a clip; not for general video editing without a reference effect.
---

# Recreate a video effect in Remotion

Deliver both a working Remotion implementation and an effect recipe. A verbal analysis alone does not complete a recreation request. Write the recipe after building and checking the implementation so it records what actually works.

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
- For a complete reference-to-recipe example, see the [yellow highlight demo](../remotion-photo-techniques/examples/yellow-highlight/README.md) when working in this repository. It includes a runnable Remotion composition, an `effect.md` recipe, and a committed preview.
- Separate the reusable effect component from its demo composition. Expose parameters that materially vary between uses: duration, colors, text or media, intensity, direction, and relevant timing. Keep values measured from the reference as defaults where practical.
- Express timing in frames relative to the composition FPS. Keep animation deterministic from frame and props so seeking and rendering produce the same result. Preserve aspect ratio and explain any crop or scaling choice.
- Recreate the visual mechanism with Remotion, CSS, SVG, canvas, or appropriate assets. Distinguish a reusable effect from reference-specific footage, logos, fonts, and sound. Use user-provided assets when available and identify substitutes.
- Do not present an embedded clip of the reference as an implementation of the effect.

## 3. Compare and revise

- Render or capture the Remotion output at meaningful checkpoints, including the first visible frame, peak motion, transitions, and final frame. Compare against source frames at matching times and dimensions. For moving effects, check a short rendered sequence as well as stills.
- Correct material differences in geometry, timing, layering, easing, color, and typography. Stop when the result is visually credible for the requested scope; report remaining mismatches precisely.
- Run the project's relevant build or type check and a Remotion render or equivalent preview verification. State which checks actually ran and where the result is stored.

## 4. Write the reusable effect recipe

Create an `effect.md` next to the implementation, using [the recipe format](references/effect-recipe.md). Give another agent enough information to rebuild the effect without the source video: normalized layout measurements, a frame timeline, layer order, animation formulas or easing, assets, props, and a short usage example or entry point. Link to the tested implementation and rendered preview. Distinguish observations, estimates, and creative substitutions.

In the final response, provide links to the Remotion code, preview, and recipe. If no source video was supplied, ask for the video or URL; the effect cannot be analyzed yet.

## Analyzed examples

- [The first 0:00–0:30 of a long fantasy video essay](examples/baldurs-gate-intro-0000-0030/effect.md): a catalog of overlays, picture inserts, caption styles, glitch, rough frame, and impact flashes, with runnable Remotion components and a visual preview. Read it when reproducing one of these mechanisms or continuing that video's analysis.
