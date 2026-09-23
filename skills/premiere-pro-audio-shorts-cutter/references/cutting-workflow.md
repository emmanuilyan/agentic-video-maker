# Cutting workflow reference

Use this reference for exact preparation, Premiere mutation, validation, and handoff. It is deliberately stricter than a general editing guide because the most expensive failures are invisible: the wrong take can sound plausible, source ranges can drift by a frame, and a successful MCP response can still leave the timeline wrong.

## 1. Inputs and evidence

Collect before editing:

- active project path and active/source sequence ID;
- sequence frame rate and start time;
- source WAV/project item IDs, duration, channels, and current clip gain;
- approved script or explicit target reading;
- source preflight transcript, silence spans, duplicate/restart findings, and review markers;
- user instruction about export. Absence of an export request means **no export**.

For `C:\youtube`, prefer the documented `dialogue-preflight` launcher. Its ASR is evidence, not ground truth. A `missing_take`, implausible word span, or acoustic suspect requires review rather than an automatic cut.

## 2. Backup and candidate isolation

Before the first mutation:

1. Save the project.
2. Copy the `.prproj` to the documented output/backups folder with a timestamp and `test` or `candidate` status.
3. Verify that the backup exists and record its size or SHA-256.
4. Duplicate the intended source sequence using a new monotonically versioned candidate name.
5. Read back the duplicate's settings and clips before clearing or changing it.

If rebuilding from selected ranges, clear only the verified duplicate. If ripple editing, retain a separately readable copy of the pre-cut sequence. Never replace source media or bake processing into the WAV.

## 3. Plan in frames

Create a table before mutation:

| # | Script unit | Source in | Source out | Timeline in | Timeline out | Join type | Evidence |
|---|---|---:|---:|---:|---:|---|---|
| 1 | exact text or take label | frame | frame | frame | frame | start/ordinary/semantic | transcript + silence/listening |

Convert seconds only at the boundary of the tool call:

`seconds = frames / sequence_fps`

Keep the authoritative plan in integer frames. Do not round each intermediate calculation independently.

### Pause policy

- **Ordinary join:** 2–3 frames of total retained silence across the outgoing tail and incoming head. At 30 fps this is about 67–100 ms.
- **Semantic join:** explicitly labelled rhetorical/comedic beat. A useful first candidate at 30 fps is 5 frames, then tune by listening.
- **Large internal silence:** split the take inside confirmed silence and retain only the ordinary or labelled semantic budget.
- **Protected edge:** default source handles are about 80 ms, but word/phoneme evidence wins. Inspect roughly 3–5 frames around every edit when possible.

The pause budget is the audible gap between speech events, not merely the empty timeline space. Do not keep 2–3 frames on both sides if that produces 4–6 frames total.

Protect plosive and fricative onsets, soft Russian consonants, word tails, performance breaths that carry phrasing, and spans where ASR timing is implausible. Place cuts near the middle of a verified silent region, never through a confident word span merely to hit a number.

## 4. Execute in Premiere

Prefer one deterministic batch after the range table is complete. Use exact imported project item IDs and the duplicate sequence ID. Preserve sequence settings, track routing, clip gain, and existing audio processing unless the user asks to change them.

After every mutating command:

1. Check the MCP success/failure result and per-item results.
2. Read the live sequence, not only the command response.
3. Compare every affected TrackItem against the planned integer-frame table.
4. Stop on a partial batch, missing item, wrong media identity, unexpected offset, or changed unrelated track.

Do not assume a universal Premiere/MCP one-frame correction. If the current bridge empirically inserts a consistent offset, measure it with a disposable candidate, compensate once, and prove the final ranges by live readback.

For crossfades, attempt `Constant Power` once only after the structural cut is correct. If the tool reports `Could not locate matching QE clip for transition`, record the limitation and continue without claiming a transition was applied.

## 5. Verification gate

The candidate cannot receive structural `PASS` until all checks succeed:

- sequence ID/name is the intended versioned duplicate;
- every scripted unit occurs exactly once and in order;
- confirmed duplicate/restart ranges are absent;
- all source in/out and timeline start/end values match the plan;
- durations are positive; there are no overlaps, digital gaps, offline items, or partial insertions;
- ordinary pauses satisfy the 2–3-frame rule; longer pauses are individually labelled;
- unrelated video/audio tracks, source media, master sequence, and source sequence are unchanged;
- no new processing, loudness normalization, export, or replacement media was introduced;
- project save succeeded; active sequence is the candidate; playhead is `00:00`.

Automated `PASS` proves structure only. Listening can still reveal clipped consonants, robotic rhythm, a swallowed breath, or a joke that needs more space.

## 6. Handoff template

Report:

```text
Status: PASS (structural candidate) | CONCERNS | FAIL
Candidate: <sequence name and ID>
Backup: <path and verification>
Source: <media/project item IDs>
Result: <clip count, total frames/seconds, ordinary and semantic pause policy>
Readback: <all ranges matched / exact mismatch>
Unchanged: <master/source sequence, unrelated tracks, source WAV, processing>
Transitions: <none / applied and verified / one QE failure, stopped>
Exports: none unless explicitly requested
Listening gate: awaiting user approval
Recommended next step: listen from 00:00 and name any rushed or slow boundary
```

Do not use `final`, `clean`, or `mastered` in the candidate name before user playback approval.
