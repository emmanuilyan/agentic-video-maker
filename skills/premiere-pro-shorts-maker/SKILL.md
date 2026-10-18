---
name: premiere-pro-shorts-maker
description: Use when building or revising editable vertical Shorts in Adobe Premiere Pro from long footage or recorded narration, especially when audio cues, source shots, captions, and user-approved graphics need individual timing and framing.
---

# Premiere Pro Shorts Maker

Turn selected moments or finished narration into editable vertical Shorts. Build from the latest approved audio, visual choices, and delivery format.

For narration-led photo/meme videos, changed audio under existing graphics, or a user-chosen Remotion handoff, read [references/narration-and-visuals.md](references/narration-and-visuals.md). Keep the user's chosen editor and deliverable.

## Start from the latest approved state

1. For Premiere work, inspect the active project, sequence settings, tracks, source paths, offline media, captions, and reference overlays through MCP. Read the user's corrected clip-by-clip Motion values; scale examples belong to those assets.
2. Keep a compact project note with: **current narration file/revision; visual reference and approved preview; captions mode (off / SRT / burned in / editable); exact on-screen copy; delivery format; latest delivered filename and absolute path**. Fill these from the conversation and project before asking about missing choices.
3. The latest explicit correction governs the current project. A decision to remove subtitles from one video is not a permanent ban for future videos. Reuse settled choices without asking for approval again; clarify only an ambiguity that changes the result.
4. Save a new project copy or candidate sequence before broad timeline edits. Preserve approved sequences and exports.

## Cut narration before detailed graphics

- Keep each Short in its own 1080×1920 sequence for 9:16 delivery. Preserve individual source clips when the user needs an editable timeline; avoid nests or reframing that hides shot controls.
- Maintain the requested speed. Preserve narration and timing when solving a framing or graphics request.
- For a dense narration cut, inspect each selected audio clip and trim empty starts and tails individually. Locate speech in the source audio rather than assuming the existing clip edges are tight; leave a small safety handle around soft consonants and word endings, then listen for clipped phonemes.
- Arrange consecutive narration clips on alternating audio tracks. Start the next phrase 4 frames before the previous clip ends at 30 fps (about 0.13 seconds); use the closest frame count at other rates. Apply the overlap after trimming, so leftover silence does not consume it.
- **Question exception:** when the outgoing phrase is a spoken question, use a butt join: start the next clip exactly when the question clip ends, with zero overlap. Do not add an automatic pause; follow any user-approved timing for that question. Identify questions from the heard words and delivery, not punctuation alone.
- Read back source in/out points, timeline positions, track routing, and every join; audition the candidate. Intelligibility is the acceptance criterion for overlap: if two spoken words mask one another, repair that join rather than maximizing density.
- Use the latest approved narration export as the timing source for visuals. If the user changes overlaps in Premiere, export the actual revised mix and update affected cues before delivering another video. See the reference for clock mapping and sync checks.

## Plan visuals against spoken cues

- Keep a small cue sheet: **spoken phrase; start/end on the current audio; asset/source; crop; exact editorial text; motion; entry/exit**. Record short-lived logos, memes, reveals, and news inserts as explicit intervals, not merely as members of a scene.
- When a question sets up a reveal, show a neutral image, question card, meme, or silhouette until the answer is spoken. Check that a source headline or embedded text does not reveal the answer early.
- A phrase-specific reaction appears on that phrase and disappears when it finishes. For example, a prohibition logo attached to “никакого интима” should not remain throughout the whole pink-rabbit scene. Check the frame before entry, first visible frame, last visible frame, and first absent frame against speech.
- Give each on-screen text element a purpose: **question, essential measurement/name, source evidence, deliberate joke, or optional verbatim captions**. Keep these roles separate. Removing subtitles removes the narration-caption layer, while approved measurements and jokes remain.
- Keep editorial copy sparse. Avoid adding chapter-like commentary such as “вопрос масштаба” or “сравниваем размеры” when the image and narration already explain the beat. Preserve user-specified spelling, case, and censor symbols in editorial titles; caption normalization applies only to captions.
- For a visual reveal on the same photograph, keep orientation, crop, and subject position matched before and after the explanation. For a document/news beat, use a real readable source capture; a mobile viewport usually needs less cropping for 9:16. Show a book and its record page as separate shots when that order is requested.
- If the visual language is still unresolved, show a few representative frames and a short motion preview before an expensive full render. Use already approved choices immediately; this is not an extra approval gate for every routine edit.

## Frame and animate deliberately

- Choose each shot's scale and position from its subject, context, and aspect ratio. Close-ups can fill more of the frame; groups, signs, documents, and archival photos often need a wider view. Move the image to keep the subject inside the vertical crop.
- A blurred background can fill unused space behind a photo. Keeping the complete image readable is often better than enlarging it until faces, text, or historical context disappear.
- Premiere Motion scale may be relative to a source already conformed with **Set to Frame Size**. Do not infer final pixel size from the percentage alone. Check a representative source frame or rendered frame and the actual Motion properties.
- Use sequence-aware MCP calls and batch Motion edits when many independent clips need changes. Keep a per-clip record of the intended scale and position; inspect the per-clip success results.
- When the brief calls for movement, give held photos a restrained continuous push, drift, or parallax with a clear focal point. A wide/close/wide hard cut is a different treatment from continuous zoom. Recreate the actual reference's timing, pivot, rotation, texture behavior, and text, not an assumed generic effect.
- Scale the requested object, not its container: enlarging a logo inside a prohibition sign does not imply enlarging the sign. Preserve the approved subject size and composition during a timing-only correction.

## Captions — when enabled

- Apply the **current request first**, then update the project note. An explicit “add subtitles” turns captions **on**, even when the previous version/note says **off**. For an MP4 delivery, “add subtitles to the video” means burned-in captions; no separate format confirmation is needed. An explicit removal turns them off. When the request does not change captions, reuse the latest approved state. A Short alone does not imply captions.
- When captions are requested, the preset below is sufficient without a fresh reference; a new reference can override it. Deliver the requested form rather than automatically producing editable captions, burned-in captions, and SRT together.
- The preset is bold, condensed, italic, uppercase Cyrillic text in warm ivory with a short dark teal shadow. It is a close free-font match, not a claim about the reference's original font. Use a uniform fill; word-by-word yellow highlighting is a separate effect that requires a request.
- Font: **Roboto Condensed Black Italic**, weight 900. It supports Cyrillic and is distributed under the SIL Open Font License in [Google Fonts](https://github.com/google/fonts/blob/main/ofl/robotocondensed/METADATA.pb). If Premiere cannot use the variable font reliably, install a static Black Italic build of the same family. Verify that Cyrillic glyphs render correctly before applying captions throughout a sequence.
- At 1080×1920, start at **72 px**, adjusting within roughly **64–82 px** to match the reference. Use centered alignment and up to two lines with tight but distinct spacing. A **600–760 px** block is a useful starting point when leaving room for right-side controls; check the actual font and device preview. Split an unusually long phrase instead of shrinking all captions.
- Fill: warm ivory **#FFF8E1**. Add a thin dark teal outline **#12343A** around **3 px** and a crisp dark teal shadow **#0B262C** at about 80% opacity, offset approximately **5 px right and 6 px down** with minimal blur. No solid background box. Judge the final thickness against the approved Short at phone size.
- Keep one fixed caption anchor through the video: the **text block center** at about **x=540, y=1095** (roughly y1080–1110), slightly below the vertical midpoint. Reserve this band when framing imagery and editorial labels. Change caption position only when the user requests it; solve ordinary collisions by recomposing the other elements.
- Set text in **ALL CAPS** and remove punctuation marks. Keep words and numbers intact; do not insert commas, periods, quotation marks, dashes, or emoji. Break lines at natural phrase boundaries.
- Time captions to the **audible speech**: each short phrase starts with its first spoken word and ends as its last word finishes. Check by listening and scrubbing, especially after audio trims or overlaps. Avoid captions that lead the voice, linger through silence, or jump at an unrelated edit. Keep the caption clips editable in Premiere when practical.
- When SRT is requested, derive it from the same corrected text/timing data as displayed captions. Verify names and ASR errors against the recording. Keep punctuation in a working transcript if useful for sentence/question detection, and remove it from caption text. An SRT carries phrase text and timing, not the baked-in font/shadow or word highlighting.

## Check interface zones and deliver the right version

- Use current [YouTube Shorts visual guides](https://support.google.com/youtube/answer/16215842) or an applicable platform preview for edges, right-side buttons, and the bottom description. An advertising safe-zone template is not a universal specification for organic Shorts. If using a local UI mockup, label it approximate.
- Check at phone size in 9:16 and a tall viewport. A center-fill crop can be an additional stress test; do not present that crop as guaranteed app behavior. Prioritize faces, essential text, measurements, and evidence; decorative photo edges may extend beyond the working margins.
- Review opening, middle, ending, moving subjects, and cue boundaries. Check actual exported frames when cached/stale previews are suspected. Batch received corrections, preview the changed portion, then make the requested full export once the edit is stable.
- If Premiere MCP fails, make a bounded connection check and report the actionable issue. Do not repeatedly spend long timeouts on the same failure. If the user accepts MP4/SRT temporarily, complete that authorized delivery and record any requested Premiere update that remains outstanding.
- Before delivery, confirm applicable essentials: ratio, independent source clips when required, framing, requested caption mode, audio sync, playback speed, and available media. Check final media decoding and duration; for audio handoffs, check audible alignment as described in the reference.
- Save to a new named project/export without overwriting approved files. Update the project note to the **actual completed export**. Return its player/link with the **versioned filename and absolute local path** so “latest version” and “where is it?” are unambiguous. Export when requested or needed to complete the task.
