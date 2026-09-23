---
name: premiere-pro-audio-shorts-cutter
description: Use when recorded narration in an open Adobe Premiere Pro project must be cut into a dense YouTube Short, especially when duplicate takes, false starts, long pauses, internal silence, or unsafe master-sequence edits are likely.
allowed-tools: Read, Glob, Grep, Bash, Write, AskUserQuestion, mcp__premiere-pro__*
metadata:
  argument-hint: "[sequence or narration context]"
  user-invocable: true
---

# Premiere Pro Audio Shorts Cutter

Create a reversible dialogue-cut candidate for listening. Never call a structurally correct cut final: spoken rhythm is approved by the user after playback.

**REQUIRED SUB-SKILL:** Use `premiere-pro-mcp` for live Premiere operations.

**REQUIRED SUB-SKILL:** Use `dialogue-editing-adr` for word edges, breaths, phonemes, and listening judgments.

Read [references/cutting-workflow.md](references/cutting-workflow.md) before changing a timeline. In `C:\youtube`, also read `docs/INDEX.md`, `docs/PREMIERE.md`, `docs/CHANNEL.md`, `docs/DIALOGUE_PREFLIGHT.md`, and `docs/TOOLS.md`.

## Phase 1 — Discover and protect

1. Confirm that the request authorizes editing, not only diagnosis. Do not infer permission to export.
2. Read the active project, sequence, tracks, source media, frame rate, and dialogue duration before mutation.
3. Save the project, create a verified project backup, and preserve the original WAV/media.
4. Duplicate the source sequence with a versioned `candidate` name. Never cut the master, source sequence, or only copy of a take.
5. Run source dialogue preflight or build an evidence-backed take map. Mark selected takes, rejected duplicates/restarts, uncertain spans, and semantic pauses.

If the source, backup, script, or intended take is ambiguous, return `CONCERNS` and ask the user before cutting that span.

## Phase 2 — Build the dialogue candidate

Work only in the duplicate sequence. Build an exact range table in frames before batch insertion or ripple edits.

- Every scripted line appears once, in order.
- Remove confirmed duplicates, false starts, and large internal silent spans.
- Ordinary joins retain **2–3 frames total silence**. This is the default, not “natural micro-pauses.”
- A longer gap is allowed only when labelled semantic. For a first 30 fps comedy candidate, use 5 frames for a setup-to-punchline beat unless evidence suggests otherwise.
- Protect consonant onsets, word tails, meaningful breaths, and uncertain ASR spans. Never classify a cough or mouth noise without listening evidence.
- Keep dialogue contiguous on its intended track; do not introduce digital gaps or shift unrelated tracks.

After every mutating batch, read back the affected TrackItems. If any source or timeline boundary differs from the planned table, stop and repair before continuing.

## Phase 3 — Verify and hand off

Read back all candidate clips: media identity, track, timeline start/end, source in/out, duration, order, overlaps, gaps, and clip count. Confirm other tracks and the master/source sequence were not changed.

Attempt `Constant Power` at most once. If Premiere returns a QE matching error, stop; report it and leave transitions unapplied.

Save, make the candidate active, and park the playhead at `00:00`. Do not export XML, WAV, video, proxy, or review media unless the user explicitly asks.

Report one status:

- `FAIL` — destructive risk, missing/duplicated line, wrong range, partial batch, or unverified mutation.
- `CONCERNS` — structurally usable but uncertain take, protected acoustic event, or untested rhythm.
- `PASS (structural candidate)` — exact live readback passed; still awaiting user playback approval.

Next step: ask the user to listen to the active candidate and identify rushed or slow joins. Only then perform the fine dialogue/crossfade pass; export remains a separate explicit action.
