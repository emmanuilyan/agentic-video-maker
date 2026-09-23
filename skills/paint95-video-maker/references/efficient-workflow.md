# Token-Efficient Production Workflow

Use this reference for a new Paint95 video or a revision that has grown beyond one isolated edit. The goal is to keep creative decisions explicit, inspect only affected material, and avoid full renders during discovery.

Begin from the mode and paths recorded by `scripts/session_bootstrap.py` in `.paint95/session-state.json`. Do not load references that the bootstrap did not select unless a concrete implementation issue requires one.

## 1. Persist The Brief

Create `project-spec.json` in the video project before implementation. Keep it concise and update it instead of reconstructing decisions from conversation history.

```json
{
  "project": "atari-burial-stopmotion-short",
  "narration": "public/narration.m4a",
  "fps": 24,
  "durationPolicy": "last narration, caption, visual, or SFX plus final hold",
  "safeZones": {"subtitleTop": 1510, "mainBottom": 1480},
  "assetPolicy": "found-real-only",
  "motionPolicy": "static-except-explicit-ui-cursor",
  "captionPersistence": "until-next",
  "cursorMotion": {"path": "cubic-bezier", "postClickHoldFrames": 16},
  "selectionPolicy": "typed-and-spoken-beat-only",
  "lockedDecisions": ["Do not show Atari before its spoken question"],
  "forbiddenEffects": ["cursor click ring"],
  "knownGoodOutput": "out/video-v7.mp4"
}
```

Keep exact display strings in a copy module or JSON file. Keep source URLs and local asset paths in the asset manifest. Do not duplicate either inside scene components.

Treat `project-spec.json` as current state, not a chronological log. When feedback supersedes an earlier timing, effect, asset, or exception, replace or remove the old entry. Before rendering, scan `lockedDecisions`, `forbiddenEffects`, `change-set.json`, and the central cues for contradictions.

## 2. Build A Beat Map

Represent each narration phrase as data before editing JSX:

| Field | Purpose |
|---|---|
| `id` | stable name used by cues and QA |
| `voiceStart`, `voiceEnd` | measured timing |
| `primary` | one explanatory object or action |
| `support` | optional supporting object |
| `ambient` | optional background action |
| `in`, `ready`, `outStart`, `outEnd` | object lifecycle |
| `sfx` | contact cue only |
| `qaFrames` | boundaries and contact frames |

Do not introduce a named subject before the narration reaches it unless the early reveal is a deliberate setup. Before adding an object, define when the previous temporary object exits.

## 3. Enforce A Density Budget

Per spoken beat, allow at most:

- one primary explanatory object;
- one supporting prop;
- one ambient action.

Persistent shell, background, subject, and subtitle frame do not count, but labels, date cards, newspaper clippings, signs, vehicles, and memes do. When a beat exceeds the budget, remove or time-shift items instead of shrinking everything.

Keep ambient motion on the horizon or background lane. Align notable ambient events to named narration cues, distribute them across quiet intervals, and prevent them from covering explanatory objects or subtitles.

## 4. Record Revisions As Data

For each user feedback batch, write or update `change-set.json`:

```json
{
  "request": "Move the background event to the 1983 cue",
  "affectedCues": ["year1983"],
  "affectedFiles": ["src/timeline.ts", "src/video/scenes/AtariHistory.tsx"],
  "preserve": ["captions", "narration", "foreground layout"],
  "remove": ["date card after year1983.ready"],
  "qaFrames": [158, 160, 162, 202]
}
```

Inspect and edit only listed files plus their direct imports. After validation, merge durable decisions into `project-spec.json` and clear or archive the change set.

## 5. Use A Render Ladder

Use the cheapest artifact that can answer the current question:

1. Typecheck or lint for code correctness.
2. Critical stills at `PAINT95_QA_SCALE=0.5` for layout, z-order, and exact contacts.
3. A full-resolution still for fitted selection geometry or fine cursor-edge detail.
4. A low-resolution range for movement around changed cues.
5. A low-resolution full proxy only for pacing or structural changes.
6. One final `1080x1920` render after the proxy and targeted QA pass.

Do not render the full video to inspect one image position, exit cue, click, or impact. Preserve the latest known-good full render until the replacement passes verification.

Render only a changed interval when motion, rather than a still, needs inspection:

```bash
bash "$HOME/.codex/skills/paint95-video-maker/scripts/render_proxy.sh" \
  . src/index.tsx Video out/qa/changed-scene.mp4 120-240 0.5
```

Use `FRAME_RANGE=all` only after structural or pacing changes require a complete proxy.

## 6. Keep Tool Output Out Of Context

Run commands that emit progress bars or long diagnostics through the compact runner:

```bash
python3 "$HOME/.codex/skills/paint95-video-maker/scripts/run_compact.py" \
  --log out/logs/typecheck.log --label typecheck -- \
  npx tsc --noEmit

python3 "$HOME/.codex/skills/paint95-video-maker/scripts/run_compact.py" \
  --log out/logs/final-render.log --label final-render -- \
  npx remotion render src/index.tsx Video out/video-v08.mp4 \
  --codec=h264 --audio-codec=aac
```

On success, read only the compact status. On failure, inspect the bounded error tail first; open the full log only around a specific error pattern. Do not paste an entire log back into the task.

## 7. Orchestrate With Small Handoffs

When native Codex subagents are available, use the model routing, spawn thresholds, and report contracts in [agent-orchestration.md](agent-orchestration.md).

Parallelize only independent work:

- timing worker: narration metadata, captions, beat timings;
- research worker: asset candidates and source manifest;
- preparation worker: approved cutouts and alpha contact sheet.

Run implementation and visual QA sequentially because they share composition state. Each worker receives only the relevant rows from `project-spec.json` and the beat map, and returns files plus a short status. Do not give workers the full conversation or unrelated source tree.
