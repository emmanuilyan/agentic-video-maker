# Narration-led visuals and editor handoffs

Read for photo/meme Shorts, changes to narration under existing graphics, reference effects, or a user-chosen Premiere/Remotion workflow. Apply only the sections relevant to the current edit.

## Keep a cue sheet tied to the current audio

Use the project's existing format; a small table or JSON is sufficient. Each meaningful cue needs:

| Field | What it resolves |
|---|---|
| Audio revision and phrase | Which approved recording and heard words drive this cue |
| Entry / exit | Start and end in output time or frames, including brief reactions |
| Asset / source | Exact local file and source page when applicable |
| Framing / motion | Subject, crop, pivot, movement and hold |
| Editorial copy | Exact text; distinguish it from optional verbatim captions |
| Reveal condition | What remains hidden during the preceding question |

For a reference motion, also record its event order and relative timings. For example, a brief can call for **establishing shot → abrupt zoom → hold → title plus rotation → next shot**. Determine durations, angle, direction, subject size, and pivot from the actual reference; that example does not prescribe a universal effect.

When “center the text” is requested, separate horizontal alignment from moving the block vertically. When the user names an original type treatment, an approved clean crop of the original lettering may be more faithful than an unidentified substitute font.

## Replace changed audio before retiming visuals

1. Read the actual revised Premiere sequence and export the current narration mix to a named WAV revision. Do not silently reconstruct the user's revised mix from old source clips. Record sequence, duration, frame rate, and source path.
2. Compare the revised audio with the previous approved export. Locate changed joins/pauses and re-align affected words. Do not stretch the whole visual timeline by a duration ratio when the edits are local.
3. Keep two clocks explicit when necessary: **source visual time** preserves an approved animation's phases; **output time** follows the final audio. A Remotion `Freeze`, held frame, scene-local frame, or remapping function may stop or shift the first clock. A phrase-triggered logo or meme must still use the correct output interval. A separate `Sequence` outside the frozen visual tree is one implementation; equivalent explicit clock mapping is also valid.
4. Quantize cues to the output frame rate and inspect the frames before/at/after the audible boundary. Verify entry and exit, not just a representative midpoint. Use measured word boundaries as a starting point and audition ambiguous speech.
5. Verify the final encoded output's audible sync after muxing. Correct stream start times alone do not prove waveform alignment. Compare a few clear speech transients or use waveform correlation against the approved WAV. If an intermediate AAC step adds measured delay, encode the WAV once at final mux or compensate the measured offset, then recheck. Do not assume one fixed AAC offset for every pipeline.

If the export API depends on an unavailable encoder, inspect supported direct-export options and existing working presets. On Windows, an ExtendScript direct-export call may require normalized output and preset paths via `File.fsName` when slash-form paths fail. Record the command/preset that actually worked for this environment. Preserve the current project and audio source. When the user chooses a different deliverable, follow that choice and state any editor work left undone.

Reuse an existing working local transcription/alignment runtime and model before installing another stack. If a backend repeatedly crashes at model initialization, switch to a known working alternative rather than cycling through model sizes on that backend. Keep word-level source data for reuse after local edits; do not repeat ASR for a purely visual correction. A working whisper.cpp word/DTW pipeline can be an alternative, but verify its emitted timestamps against the audio rather than assuming the model output is final.

## Choose evidence and collage assets before detailed animation

- Reuse suitable approved/local assets before repeating research. Keep exact source URLs and local filenames together. Follow the workspace's ordinary-ChatGPT preparation preference when applicable; small local corrections do not need a research handoff.
- Use real source captures for record claims and news beats. For 9:16, capture a mobile viewport and keep the headline, relevant photo, and proof field readable. Remove cookie/navigation clutter through legitimate page controls or a transparent crop; preserve the meaning of the evidence. Do not fabricate a source page.
- An image on a question must not accidentally expose the answer through its caption, headline, or recognizable reveal. A silhouette or neutral meme can carry the question instead.
- For an explanatory overlay on a photo, decide whether the user wants a clean image, an in-image measurement/name, a source capture, or a joke. Extra headings above and below the image are not automatic.
- When a collage is requested from real images, keep its subject, background, and props as separate assets. A request to remove one background is not permission to regenerate the entire scene. Use the requested image-editing workflow for that cutout.
- Inspect a cutout's real alpha channel and its edges on light, dark, and final backgrounds. A visible checkerboard may be baked into the image. A luminance threshold can destroy pale fur or leave a white halo. If a generated cutout reconstructs details, do not describe it as exact segmentation; keep that fact in the asset note.

## Make reference effects observable and reusable

Use `remotion-effect-recreation` when an actual reference effect is being recreated. Record:

- Hard cuts versus continuous camera movement; establishing, close-up hold, and return phases.
- Subject size in the frame, especially head size; zoom amount alone does not establish a visual match.
- Rotation angle/direction and pivot; distinguish rotating the photograph from rotating the text.
- Exact title copy, its entry, its readability, and any unwanted lettering baked into the source image.
- Texture material, strength, and coordinate space: fixed to the screen, fixed to the photograph, or animated. “Film texture” does not imply moving noise.

Use `vox-skill` or `remotion-photo-techniques` when the brief calls for their visual language. Inspect an approved technique's actual preview before choosing it; an effect name alone does not establish a match. Choose a technique for its role in the narration; do not turn every available technique into another layer. Short held photos can move subtly, while labels remain stable and readable.

Follow applicable workspace review rules for reference comparisons and gallery additions. Keep drafts separate from approved library assets; when the user approves an effect, save the implementation/recipe with the exact final preview they approved. Project-specific meme text, a particular animal, or one closing joke should not become a default for unrelated Shorts.

## Reduce repeated full renders

For a new visual direction, a compact useful preview consists of the opening, one explanatory photo, one meme/reference effect, one evidence insert, and the ending. For a correction, preview just the affected shot and its entry/exit boundaries. Continue independent preparation while the user reviews an unresolved choice.

Keep a single current record of caption mode, audio revision, exact copy, and delivered filename. Separate editable source data from its rendered preview. Batch corrections already received; do not start multiple render jobs against a bundle that is being rewritten.

Before a complete delivery:

- Check the requested change in exported frames; verify that nearby approved elements remain intact.
- Decode/probe the final file for errors, dimensions, frame rate, and duration. Check narration alignment when audio/export handling changed.
- Provide the completed full video when requested, even if a short excerpt was used to check the edit. Preserve earlier exports and identify the new file by its exact absolute path.
