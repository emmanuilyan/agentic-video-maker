---
name: doodle-jump
description: "Create or revise vertical narration-led videos with a central character jumping up platforms, a continuous scrolling world, and replaceable character/environment assets. Use for doodle_jump / Doodle Jump style video production, not for building a playable game or Paint95 chrome."
---

# Doodle Jump

Produce an editable Remotion project and a rendered vertical video from the user's narration and script. The reusable core is an upward platform journey; each story chooses its own character, platforms, scenery and palette. The installed invocation is `$doodle-jump`; recognize the user's spelling `doodle_jump` too.

## Choose the scope

- **New narrated video:** inspect the exact audio, script and supplied assets; read [production.md](references/production.md). Initialize from the bundled template, measure narration, build a phrase-to-action plan, replace demo material, then render and verify. For real photos or climb-revealed illustrations, also read [story-beats.md](references/story-beats.md).
- **Mechanics or environment prototype:** use the bundled demo without invented narration. Identify the result as a technical demo; validate motion and asset replacement.
- **Revision:** read [revisions.md](references/revisions.md), inspect `project-spec.json`, current timing data, affected files and the last good render, then run `npm run revision -- "short scope"`. Record affected beats in `change-set.json`; preserve unrelated timing, assets and known-good outputs.
- **Narration replacement:** compare measured words with the old transcript and retime from the first divergence. Preserve the original narration and known-good timing until the replacement is verified.
- **Character/environment replacement:** read [asset-packs.md](references/asset-packs.md), update asset metadata and the skin manifest. Recheck anchors, silhouettes and the affected frames; preserve the route unless requested otherwise.

## Start a project

Run the helper with an unused, specific project directory:

```bash
python3 /Users/mac/.codex/skills/doodle-jump/scripts/init_project.py /absolute/path/to/video-project
```

It copies a self-contained template with two art packs, deterministic mechanics, captions, contact SFX and render helpers. It does not install dependencies or replace an existing directory. Run `npm ci` in the new project, then use its package scripts. For engine changes or a custom route, read [engine.md](references/engine.md).

## Production rules

- Narration is the semantic authority; `jumpCadenceFrames` is the mechanical authority. Use the words actually spoken and map meaningful phrases to selected contacts or reveals, while filler jumps continue at one steady cadence. Do not stretch a jump to fill a sentence.
- When changing global pace, edit the cadence/route settings once and run `npm run route`; inspect its remapped beat contacts and era cues instead of hand-editing every landing.
- Plan a meaningful visual development approximately every two seconds: a visible goal, obstacle, action, reaction or result tied to the spoken story. Follow [Attention rhythm](references/production.md#attention-rhythm) when planning beats or reviewing pacing; keep one primary event at a time and allow deliberate reading or payoff holds.
- Keep one persistent world and hero rig. World Y grows upward; platforms and story props share its camera transform. Captions and optional interface text stay in screen space. Accessories belong inside the hero rig.
- The hero is visible from the first frame. Feet meet the platform on its landing cue while descending; jump squash and platform contact marks share that cue. Keep a short contact pose and readable apex inside the fixed cadence; reserve SFX for contacts linked to semantic beats when story data exists.
- The camera advances upward smoothly and retains its height between jumps. Changing skins preserves foot position, route and camera. Smooth 30 fps is the starter default; use stepped motion only when chosen for the story.
- Use a full-height Shorts world above fixed lower subtitles. Keep optional titles, eyebrows and technical footer empty by default; add them only when requested for the story. Preserve a clear action lane and a fixed caption region. At a spoken beat, prioritize one explanatory object or event; clear temporary story props at explicit exit cues. A long new scene cannot be represented only by a background colour swap.
- Keep paths in the skin manifest and times in the timeline data. Different art sizes require measured anchors and platform surface offsets, not compensating motion edits.
- Put story timing in `beats.json` and reusable media metadata in `story-assets.json`. Keep added labels outside photo pixels by default. When a story climb replaces a photo, use a genuinely different asset for the next beat unless repetition is intentional.
- Ask ordinary ChatGPT for ready asset files when generating art, following [asset-packs.md](references/asset-packs.md). Keep the request compact and use an appropriate existing ordinary chat. Work mode and Codex subagents are not substitutes for this preference. Verify real files or complete source, not claims of attachment.
- Use ordinary ChatGPT in the browser for visual plans and image/photo candidates too. Send the story, style, measured speech beats when available, and constraints in one compact brief; select assets there and verify the actual files locally. Prefer found documentary photos when the user wants real imagery; do not silently replace them with generated lookalikes.
- If finished audio and script are supplied, treat their claims as approved material. Skip fact-checking unless requested, and explicitly tell ChatGPT not to fact-check in every planning, search, or generation brief. Still check that selected assets fit the stated scene and can be used technically.
- Keep the hero and current visual claim readable at phone size. Remove redundant labels and stale story props, prevent occlusion of captions or the teaching object, and bring a new image in with its matching spoken phrase unless an early setup is intentional.
- Preserve believable contacts and attachments: feet land on a platform when the contact reaction fires, accessories move with the hero, and world objects remain in world space. Keep SFX audible but subordinate to narration.

## Verification and completion

For a final video handoff, include the MP4 and a clean PNG contact sheet from the final render showing the opening, key story beats, transitions and ending. Reuse the review sheet if it reflects the final render; convert an existing JPEG sheet instead of rerendering.

Run `npm run check`, inspect critical stills with `npm run qa`, and render a complete low-resolution proxy with `npm run proxy` after structural changes. Run `npm run review` to create full-timeline contact sheets and dense one-second motion strips without an external video-watching service. Inspect contact−1/contact/contact+1, apex, era transition, story photo changes, longest caption, first and last frames. Verify visible foot contact, silhouette, camera continuity, no caption overlap, no popped-in platforms and no empty tail. Review attention rhythm against the beat plan, including the opening, gaps between events and ending; resolve unexplained monotonous stretches. Listen to the mixed proxy and check intended narrative contact transients; narration remains dominant.

For a production video, review measured captions and phrase-to-action alignment, set `timingStatus` to `reviewed` only after that review, then run `npm run render` and `npm run verify`. The verifier checks final geometry, FPS, frame count and audio peaks; inspect the final frame and listen separately. Report the absolute project/output paths and embed the MP4; state any check that could not be performed. A mechanics demo may finish without narration; a requested narrated video may not be reported complete with demo copy or estimated word timing.

Respect the requested stage: a plan or short test is its own deliverable, while an explicit full-video request needs no extra approval gate. After a finished video, offer an optional ChatGPT-in-browser review of montage inaccuracies and a correction pass; upload nothing for that review until the user accepts. If accepted, use the repo's `docs/chatgpt-video-review.md` prompt when available and exclude unsolicited fact-checking.
