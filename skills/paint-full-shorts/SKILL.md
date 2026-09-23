---
name: paint-full-shorts
description: Create or revise vertical Remotion Shorts staged entirely inside a retro Photoshop-like editor, where cursor actions, layers, selections, masks and transforms drive the story and the cuts. Use for this editing-as-story style, including short visual demos.
---

# Paint Full Shorts

Make the video feel like a graphic document being edited in real time. The editor is the stage and its tools are the storytelling language: an edit has a visible cause, a target, and a readable result. Build an editable Remotion project and deliver the rendered video.

## Establish the format

Use the user's topic, media and exact copy. For an unspecified style demo, choose one simple subject and a small sequence of operations. A five-second demo normally fits three or four edits plus a final hold; a narrated Short follows measured speech instead.

Default to 1080×1920 at 24 fps. Use late-1990s Photoshop-inspired square gray panels, blue title bars, beveled controls, rulers, checkerboard transparency, a two-column toolbar and a Layers palette. Adapt the layout to a phone: one large canvas, a readable subject, and small supporting UI. Keep the recognizable shell throughout the video. Historical interface accuracy is optional unless requested.

This style extends the Paint95 collage idea with Photoshop document operations. Choose motion cadence for the story: smooth deterministic UI gestures, optional held poses for tactile cutouts. A photographic brush, a particular caption frame, an always-moving background, and narration are not required for a brief visual demo.

## Plan the edits

Before coding, record dimensions, audio mode, safe areas, asset sources and a compact action timeline. For each action define `tool`, `target`, `approach`, `contact`, `changeStart`, `changeEnd`, `release`, and the readable hold as applicable. Use one named cue for every representation of the same event: cursor, button, document, layer row, caption and sound.

For a new story or additional transitions, read [the editing language](references/editing-language.md) and choose operations that communicate the content. Each beat needs a clear purpose beyond demonstrating a tool. Keep one primary edit active at a time. Reuse the same document and subject across beats.

For visual concepts, montage plans, and image/photo candidates, use ordinary ChatGPT in the browser. Send a compact brief with the requested style, script or measured speech beats, and source constraints; bring back selected ideas and links, then inspect chosen files locally. If the ordinary chat cannot be used reliably, prepare one ready-to-send brief for the user instead of silently changing research routes. Prefer real photo cutouts when the user asks for a documentary collage; generate imagery only when the user requests it or the chosen brief calls for original art. If finished audio and a script are supplied, treat the story claims as approved: do not fact-check or rewrite them unless asked. Explicitly tell ChatGPT not to fact-check in every planning, sourcing, or generation brief unless the user requested that check.

For a revision, inspect the existing output, timeline and affected components. Preserve unrelated design and timings. A replacement voice track changes only the events affected by its measured timing.

## Build the document

Use the bundled [portable toolkit](references/toolkit.md) for a new project or when replacing one-off editor mechanics. It includes reusable chrome, cursor tracks, selection/transform overlays, brush/eraser masks, typewriter text, layers and undo/redo. Copy the toolkit into the target project with `scripts/install-toolkit.mjs`; keep story assets and timing outside it. Read the toolkit reference for installation, API examples and supported boundaries. Adapt existing project copies deliberately instead of reinstalling over local changes.

When implementing or restructuring, read [Remotion patterns](references/remotion-patterns.md). Keep editor chrome, document viewport, document layers, palettes, cursor and captions in separate coordinate spaces with explicit conversions.

- The Layers palette and rendered layer visibility/order come from one document state. Hidden groups may reveal several children together if the palette communicates the group.
- Show the canvas transparency checkerboard wherever no opaque layer covers it, including empty documents, hidden backgrounds and erased regions. The toolkit provides this behind the document automatically; it is an editor display, not a background layer.
- A lasso or magic wand uses a fitted silhouette contour. Free Transform uses a rectangle with eight handles. A rotated transform box rotates with the object.
- During a drag, derive the object, active handle and cursor from the same geometry. Keep the opposite anchor fixed unless the chosen transform says otherwise.
- Distinguish object size, document canvas size and output-video dimensions. Use the toolkit's linked W/H resize for proportional objects and independent W/H for intentional distortion. For canvas resizing, choose preserve/contain/cover/stretch explicitly and keep the editor shell stable; new uncovered canvas shows transparency.
- Paint and eraser results follow the tool tip. Selection alone selects; a visible edit, layer toggle, or keyboard command causes the change.
- Move the cursor on deterministic paths and pause at meaningful contacts. Represent keyboard shortcuts visibly when they replace a mouse operation.
- Keep chrome stable during canvas pans and zooms. Convert document-space contacts to screen space after the camera transform.
- Use document edit operations for transitions: masking, layer visibility, displacement, crop, undo, or an explicit file/tab change. Give temporary dialogs and selection overlays exit cues.
- Essential copy should read at phone size. UI labels may be smaller if they are supporting detail. Keep critical action and narration captions away from the platform's bottom and right overlays.
- Keep the current subject visually dominant: remove redundant labels, stale overlays, and decorative clutter; do not let props or captions block the information they explain.
- Start each topic image and caption with the matching spoken phrase, unless an early setup is intentional. A transient image or transition should have a clear narrative purpose.
- Make motion consistent with its medium: smooth, human-like editor gestures; tactile cutouts may move in held steps. Verify contact, landing, and any scene attachment rather than relying on approximate timing.

Use local media and stable asset paths. Prefer supplied assets; source or generate additional visuals only within the user's request. Record sources for externally sourced files. Code-native illustrations are appropriate for an original graphical demo; use real cutouts when the subject requires them.

## Audio and words

For narration, measure phrases or words from the actual recording and bind captions and topic reveals to those measurements. Keep narration dominant. For a visual demo, use concise action labels and tactile SFX; do not invent a transcript or claim labels are speech captions.

Place click sounds at mouse-down, keyboard sounds at actual character changes, and a short commit sound at a visible confirmation. Tie drag or brush sounds to the active gesture interval. Keep cue tails inside the composition and leave the final design enough time to read.
Keep these cues audible without masking narration; judge the mix by listening to the rendered proxy, not only by nominal gain values.

## Verify and deliver

Typecheck, render a small proxy, and inspect the first frame, contacts, drag midpoint/end, state changes and final frame. Use a full-resolution still when checking fitted selection or cursor contact. Verify the mixed cue transients and listen when audio playback is available; report any unperformed listening check accurately.

Render the full-resolution MP4 after the proxy passes. Check duration, dimensions, frame rate, decodability and audio presence. Deliver the absolute video link/embed and editable project location. Mention which operations the demo demonstrates; distinguish implemented examples from proposed future recipes.

A visual demo is complete with source, explicit timeline, readable action copy, synchronized SFX when intended, inspected rendered evidence and the requested MP4. A narrated video additionally requires measured captions and checked speech timing. In the handoff, embed the MP4 and attach a clean PNG contact sheet of the final render's key editor actions; for a brief single-action demo, one representative PNG still is enough. Reuse an existing final-render QA still or sheet instead of rendering again just to make the preview.

Respect the requested stage: deliver a plan or short test when that is what the user asked for, and continue to the full video when explicitly requested without inventing another approval gate. After a finished video, offer an optional ChatGPT-in-browser montage review and correction pass. Do not upload the video or apply that review until the user accepts. If accepted, use the repo's `docs/chatgpt-video-review.md` prompt when available and ask ChatGPT not to fact-check the story unless the user requested it.
