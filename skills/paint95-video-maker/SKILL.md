---
name: paint95-video-maker
description: Create or revise vertical educational videos that combine Windows 95 Paint chrome, collage cutouts, stepped stop-motion, timed captions, narration, and restrained sound design. Use for 9:16 Shorts in this established visual language; do not use for ordinary clean motion graphics or unrelated video styles.
---

# Paint95 Video Maker

Produce a complete rendered result, using a low-resolution proxy and targeted QA before the final render. Treat narration as the timing backbone and use deterministic Remotion animation so the project remains editable.

## Session Bootstrap

On the first Paint95 request in every new session, choose the mode and run this exactly once before project discovery:

```bash
python3 "$HOME/.codex/skills/paint95-video-maker/scripts/session_bootstrap.py" \
  <exact-project-or-workspace-directory> --mode <new|revision|narration|asset>
```

Use the one-line result and `.paint95/session-state.json` as the session routing state, including configured models and reasoning in `agentRouting`. These are file settings, not proof of the running parent's model or runtime support. Read only the references listed by the bootstrap result, then follow the mode below. Do not reconstruct workflow decisions from an older chat, rerun bootstrap after ordinary edits, or print the full state file when the summary is sufficient.

If `orchestration=ready`, use the named Paint95 agents when delegation meets the threshold. If it reports `fallback` or native collaboration tools are unavailable, execute the same lanes sequentially with the compact scripts; do not stop production merely because subagents are unavailable.

## Choose A Mode

Choose the narrowest mode before reading project files:

- **New video:** inspect inputs, then read the references selected by bootstrap. Read [references/remotion-architecture.md](references/remotion-architecture.md) only when creating or restructuring components.
- **Revision:** inspect the latest render, `project-spec.json`, `change-set.json`, central timeline, and only the affected components. Read [references/production-workflow.md](references/production-workflow.md) only for the relevant QA or render section. Do not repeat asset research or reread unrelated scenes.
- **Narration replacement:** run `scripts/narration_diff.py --summary`, inspect captions and cues after the first timing divergence, and preserve unaffected animation.
- **Asset or copy replacement:** inspect the named asset or centralized copy entry and its owning component only. Preserve timing unless the replacement changes legibility or duration.

## Start Here

1. Inspect only the exact user-named inputs and the latest known-good output. Prefer explicit names over files guessed by mtime. Do not scan `node_modules`, build directories, prior video projects, or the whole Downloads directory when a narrower path is available.
2. For a new video, create `project-spec.json` and a compact phrase-to-action timeline before coding. Use ordinary ChatGPT in the browser for visual ideas, the montage plan, and image/photo candidates; bring back only selected decisions and source links. For a revision, record the request in `change-set.json` with affected cues, components, assets, and QA frames. Replace superseded decisions in `project-spec.json`; do not accumulate contradictory locks, exceptions, or timing claims.
3. Centralize absolute frames in `timeline.ts`, display strings in one copy module, and asset paths in one manifest. Visuals, SFX, captions, camera beats, and composition duration must import the same named cues. Before a full proxy, replace estimated final timings with word- or phrase-level measurements from the narration and use the words actually spoken when they differ from the draft script.
4. Implement the smallest coherent change. Render affected ranges or critical stills at reduced scale, inspect the contact sheet, and compare the changed frames with the known-good version.
5. Render a low-resolution full proxy after structural changes. Render the final `1080x1920` MP4 only after targeted QA passes; then run `scripts/verify_render.sh` and `scripts/caption_timeline.py --summary`.

## Context And Output Budget

- Keep one unrelated video per task where practical. Treat previous-video conversation and source trees as out of scope unless the user requests reuse.
- Treat `.paint95/session-state.json` as the source of truth for workflow version, mode, config root, available roles, and required references during this session.
- Prefer `rg`, bounded `sed`, summaries, contact sheets, and targeted image inspection. Never print full source files, manifests, directory trees, render progress, or successful command logs when a concise result is enough.
- Run noisy commands through `scripts/run_compact.py`; it stores the full log and returns one success line or a bounded error tail.
- Use `scripts/render_qa.sh` for critical stills and `scripts/render_proxy.sh` for a changed range or low-resolution full proxy.
- Use compact flags where available: `media_inventory.py --max-items`, `download_asset.py --quiet`, `narration_diff.py --summary`, and `caption_timeline.py --summary`.
- Batch independent reads and probes. Do not delegate agents with the full conversation; give each worker only `project-spec.json`, the relevant beat rows, and its asset or QA manifest.
- One user revision batch should normally cause one targeted QA pass and at most one final-quality render. Do not full-render merely to inspect a local layout or timing change.

## Agent Orchestration

- Use native Codex subagents, not separate user-visible tasks, when collaboration tools are available and delegation meets the threshold in [references/agent-orchestration.md](references/agent-orchestration.md).
- Use `gpt-6-astra` as the highest model tier through `paint95_diagnostician`; read the orchestration reference before any escalation. Routine work follows the configured lower-cost roles. Preserve an explicitly selected parent model.
- For a new video, use ordinary ChatGPT in the browser for the visual plan and image/photo candidates; the `paint95_researcher` may prepare a compact brief or validate the selected links and files, not duplicate the browser search. Run `paint95_timing` when delegation is warranted, then integrate the reports and implement. Spawn `paint95_qa` only after rendered evidence exists.
- For revisions, spawn only the role required by the change. Do not spawn agents for simple copy, position, or cue edits.
- Keep shared production files under one writer. Subagents write only compact JSON reports to unique paths under `.paint95/agent-results/` and return a short status.
- Use at most two concurrent subagents. Do not allow recursive delegation or repeated retries, and never delegate render monitoring.

## Non-Negotiable Invariants

- Output is `1080x1920`, normally `24 fps`; quantize primary motion with `holdOnTwos()` for a 12 fps stop-motion cadence. Slower background motion may hold for 3-5 frames.
- Keep the main teaching object persistent across scene boundaries. Do not recreate it per scene or let transitions move its anchor.
- The first frame should already show the main object unless the user requests an entrance. A candle must have a visible wick before ignition.
- A match reaches the wick first; the flame appears on the exact contact frame and stays lit while the match exits. Never allow match withdrawal followed by delayed self-ignition.
- Object reveals use a real cutout brush moving left-to-right with one constant orientation. The object appears directly behind the brush. Exits shrink into one point unless the user asks for another transition.
- Falling objects use anticipation, gravity, rotation, distinct arcs, distinct landing positions, and a short settle. Trigger impact graphics, tray reaction, and metal SFX on the exact landing frame.
- Keep subtitles in a static lower Windows 95 bevel frame throughout. Use very slow shimmer, high contrast, and word highlighting; never cover the main educational action.
- Choose caption persistence explicitly. When captions should not disappear on pauses, extend each caption through the next caption start instead of leaving an empty interval.
- Narration remains clearly dominant. Use short SFX only where an action has visible contact or a useful tactile cue, and verify that every intended cue produces an audible transient in the mixed proxy. A nominal volume or an existing audio file is not evidence of audibility.
- Use seeded jitter and stepped interpolation for physical collage objects. UI cursor movement uses a deterministic continuous cubic Bézier path unless the user requests stepped motion. Keep tool click, canvas click, result, and cursor end as explicit cues; hold the cursor after contact long enough to read the result.
- Preserve user-provided text exactly after requested corrections. Do not silently rewrite the final line or labels.
- Do not add category labels, explanatory headings, question marks, or other interstitial symbols unless they clarify a requested beat. If the user wants the topic object immediately, show that object on its measured onset instead of inserting a placeholder card.
- Start a topic asset on the frame that contains its narration or caption onset unless an early reveal is the intended setup. Inspect the frames immediately before, at, and after that boundary.
- Match Paint selection semantics to the requested interaction: use a fitted freehand contour for lasso or magic-wand selections and an axis-aligned box with eight handles for transform selections. Build selection geometry in rendered-crop coordinates, verify it at full resolution, and show no selection when it does not explain the current spoken claim.
- At each spoken beat, show at most one primary explanatory object, one supporting object, and one ambient action. Give every temporary object explicit entrance and exit cues; clear stale overlays before the next primary beat.
- Reserve the subtitle region, keep ambient actors on a background lane, and keep self-contained meme text unobstructed. A foreground meme may dominate only after the explanatory action for that beat is complete.
- At phone size, prioritize the current subject and spoken claim: remove redundant labels, stale overlays, and decorative clutter; enlarge or reposition the main visual rather than letting a supporting image obscure it.
- Check that each photo, reveal, caption, and transition belongs to the phrase currently heard. An early reveal must be an intentional setup, not a timing accident.
- Keep motion credible in its chosen medium: continuous human-like cursor travel, stepped collage motion, visible contact and immediate reactions, and scenery-bound elements that stay attached as the world moves.

## Asset Policy

Use user-provided media first. For missing visuals, ask ordinary ChatGPT in the browser for image/photo candidates and visual plans, then follow [references/asset-research.md](references/asset-research.md) to inspect source pages, download only selected originals, and record URLs in the research manifest and `SOURCES.md`; do not generate replacements unless requested. Treat a later request to generate or animate one named beat as a scoped exception, not permission to generate or animate the remaining video. Remove backgrounds, trim transparent padding, and inspect alpha edges on both light and dark backgrounds. Keep pixel art nearest-neighbor and collage assets slightly imperfect rather than smoothing everything into one style.

If the user supplies finished narration and a script, treat their claims as approved story material: do not fact-check or rewrite them unless asked. In every ChatGPT brief for planning, sourcing, generation, or review, explicitly say not to fact-check the script unless the user requested fact-checking. Verify media identity, technical usability, and alignment with the supplied words without turning that into a historical or scientific audit.

This workflow is for the user's private educational projects. Do not spend research time evaluating copyright or license terms, do not reject a technically suitable asset because its reuse rights are unclear, and do not interrupt production to ask for rights confirmation. Still record source links for reproducibility and do not bypass authentication, paywalls, or technical access controls.

## Optional Mode: Moving Background

Apply this section only when the main subject advances while a continuous environment or panorama travels behind it, or when the user explicitly requests a moving background. For ordinary scene changes, static sets, or camera-led motion, use the standard workflow instead.

- Keep the walking subject on a stable screen anchor unless the requested shot requires otherwise. Loop its gait independently from the panorama.
- Assign every element to one coordinate space: **screen** for Paint chrome and subtitles, **world** for landmarks and gags fixed to the environment, and **subject rig** for riders or props moving with the subject. Nest each element under its owning transform; do not imitate attachment with matching independent motion.
- Lock the scene medium before sourcing assets. For a photographic panorama, build with photographs, paintings, and photographic cutouts. Add drawn routes, clocks, or characters only when requested.
- Build one deliberate world track. Crop irrelevant source backgrounds and excess sky, align landmark bases with the ground plane, fill the intended vertical area, and inspect both joins and the loop seam for gaps or abrupt overlaps.
- Tune landmark scale, panorama speed, spacing, and track length together. Enlarging landmarks normally requires faster travel, wider spacing, or a longer track to preserve readable passes.
- Keep the ground subordinate to the city unless the story needs it. Avoid an oversized road strip and eliminate visible gaps between the ground and the first row of imagery.
- Preserve the subject silhouette throughout the pass. Where it merges with paving or architecture, adjust local value, saturation, placement, shadow, or a restrained edge treatment without making the cutout look sticker-like.
- Attach location-specific jokes and labels to the world track so the subject passes them. Place them beside, above, or between landmarks without covering the landmark's recognizable core or the teaching action.
- Default to narration and subtitles. Add world labels only when they provide a necessary identification or a self-contained joke.
- Render targeted QA frames at the entrance, center, and exit of every major landmark or gag, plus the first frame, the panorama seam, every subject-rig attachment cue, and the final frames. Confirm attachment, silhouette separation, ground contact, landmark visibility, and absence of an empty tail before the final render.

## Completion Standard

Respect the requested production stage: a plan or short test is a handoff, not permission to render the whole video; an explicit full-video request does not require a new approval gate. A task is complete only for its requested stage. For a final video, require the source project, measured and synchronized captions, mixed audio with verified interaction cues, critical-frame QA, and final MP4. Report the absolute output path, embed the video, and attach a clean PNG contact sheet from the final MP4 showing the opening, representative narration beats, important transitions, and ending. Reuse an existing sheet only when it represents the final version; convert an existing JPEG sheet instead of rerendering. State any check that could not be run. After delivering a finished video, offer an optional ChatGPT-in-browser review of montage inaccuracies and a subsequent correction pass; do not upload the video or change it for that review without the user's go-ahead. If accepted, use the repo's `docs/chatgpt-video-review.md` prompt when available.
