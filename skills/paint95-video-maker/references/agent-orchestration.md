# Cost-Aware Codex Orchestration

Use this reference only when native Codex subagent or collaboration tools are available and the task contains independent work. Native subagent workflows are preferable to creating ordinary user-visible tasks. If subagent tools are unavailable, execute the same lanes sequentially with compact scripts.

At session start, `scripts/session_bootstrap.py` reads the nearest project `.codex/config.toml`, discovers project or personal Paint95 custom agents, and records their model and effort in `agentRouting`. This is configured routing, not a runtime model probe. Check the current tool's model and effort support before dispatch; preserve the user's active parent model. Editing config does not switch an already-running task.

Codex supports project instructions that request delegation and custom agents in `.codex/agents/` or `~/.codex/agents/`. See the [official subagent documentation](https://learn.chatgpt.com/docs/agent-configuration/subagents).

## Model Routing

| Role | Model | Effort | Use |
|---|---|---|---|
| parent orchestrator and editor | `gpt-5.6-sol` | `medium` | decisions, architecture, implementation, final integration |
| `paint95_researcher` | `gpt-5.6-luna` | `medium` | compact ChatGPT brief or validation of selected asset links/files; no duplicate broad search |
| `paint95_timing` | `gpt-5.6-luna` | `medium` | narration metadata, captions, beat map, cue evidence |
| `paint95_qa` | `gpt-5.6-terra` | `high` | visual and motion-design review of rendered evidence |
| `paint95_diagnostician` (highest tier) | `gpt-6-astra` | `high` | two failed focused fixes, or evidence of a defect across shared systems |

This is the default Paint95 profile. The discovered TOML files take precedence over this table when the user customizes a project. The unassigned-worker default remains Luna with `low`; research and timing explicitly use `medium`.

After editing routing or bootstrap, run `python3 scripts/test_session_bootstrap.py` from the skill directory and run bootstrap against the target workspace. Confirm `agentRouting` matches the selected TOML files. These checks validate configuration, not model execution.

### Reasoning And Escalation

- `low`: mechanical checks or extraction when delegation is otherwise justified. Simple local edits stay with the parent.
- `medium`: routine planning, implementation, research, and timing evidence.
- `high`: focused visual QA and Astra diagnosis. Use Astra only for an unresolved question that could avoid another faulty edit or render.
- `xhigh`: one bounded follow-up on Astra only when a high-effort diagnosis identifies a specific unresolved dependency and new evidence is available. Keep `max` and `ultra` outside automatic routing.

Reuse the existing diagnosis report when escalating. After diagnosis, the parent applies the fix and returns to normal production; Astra is not an extra reviewer for every scene. If the parent is already Astra, diagnose locally unless an independent review justifies another agent.

Read the custom role's model and effort together from `agentRouting`. Prefer the registered custom role. If only generic subagents are available, pass its model, effort, and bounded instructions explicitly with `fork_context=false`. Custom-agent file settings override spawn settings, so an exceptional effort change needs a generic bounded worker when the named role pins a different effort. Verify availability with the live tool schema; do not rely on implicit inheritance for budget routing.

If Astra cannot be selected, record that limitation and use Sol `high` for one bounded fallback, or diagnose in the current parent if model switching is unavailable. Mark unresolved findings honestly. The documented API model ID is [`gpt-6-astra`](https://developers.openai.com/api/docs/models/gpt-6-astra); Codex support is checked at dispatch.

## Delegation Threshold

Spawn a subagent only when at least one condition is true:

- two independent work lanes can run in parallel;
- exploration would otherwise place substantial search results, logs, or image notes in the parent context;
- an independent visual review materially reduces the chance of another full render;
- a repeated defect needs a fresh, bounded diagnosis.

Do not spawn for a copy correction, one asset move, a single command, routine render monitoring, or a task the parent can complete with one targeted read. Every subagent performs its own model and tool work, so unnecessary delegation costs more than a single-agent pass.

## New Video Flow

1. The parent creates the project directory, `project-spec.json`, agent result directory, and exact report paths.
2. Ask ordinary ChatGPT in the browser for the visual plan and image/photo candidates. When delegation is warranted, run `paint95_timing`; use `paint95_researcher` only for a compact browser brief or verification of ChatGPT's selected asset links/files. Give each agent only relevant specification fields, exact input paths, and one output path.
3. Collect any reports using bounded waits. Read their compact JSON results, resolve conflicts, then finalize the beat map and asset manifest.
4. The parent downloads approved assets, prepares cutouts, implements all production code, and runs targeted QA. Keep one writer for shared Remotion and timeline files.
5. After a meaningful contact sheet or proxy exists, spawn one `paint95_qa`. Apply confirmed findings as one revision batch.
6. Escalate to `paint95_diagnostician` after two targeted attempts fail or supplied evidence demonstrates a defect across shared systems. Include the escalation reason and relevant failing frames; the evidence-based route does not require two deliberate failed attempts.
7. The parent performs final render and verification. Do not delegate long-running command execution or render monitoring.

## Revision Routing

| Change | Delegation |
|---|---|
| exact text or one position | none |
| new or replacement web asset | ChatGPT in browser for candidates; researcher only for bounded local verification if warranted |
| changed narration | timing only |
| structural motion or density change | QA after parent renders targeted evidence |
| full new video | ChatGPT browser plan/candidates, timing when warranted, then QA after rendered evidence |
| defect survives two targeted fixes, or evidence spans shared systems | Astra diagnostician |

Never spawn all roles automatically. Use only the lanes required by the current change set.

## Handoff Contract

A spawn prompt must include:

- one bounded objective;
- exact input paths and named beats;
- exact output JSON path;
- explicit files or behavior to preserve;
- an output schema and item limit;
- a prohibition on production edits and recursive delegation;
- a stopping condition.

Include the selected model and effort in the parent's dispatch record. For escalation, include previous attempts or evidence spanning shared systems. Keep this record beside the report in `.paint95/agent-results/` so later sessions can see which lane actually ran; bootstrap alone records only configuration.

Do not paste the full conversation, whole source tree, full render logs, or unrelated references. Prefer a prompt shaped like:

```text
Act as paint95_qa. Review frames 238, 240, 242 and the range proxy at <path>
against <project-spec> and <change-set>. Preserve captions and audio timing.
Write the documented QA JSON schema to <report-path>, at most eight findings.
Do not edit source, render media, or spawn agents. Return only status and path.
```

Agent reports belong under a per-video directory such as `.paint95/agent-results/`. Give every agent a unique file to prevent write conflicts. The parent reads reports once and carries only accepted decisions into `project-spec.json` or `change-set.json`.

Report arrays are bounded to keep both files and returned summaries small:

- research: at most 12 selected assets, 6 alternatives, and 6 missing slots;
- timing: at most 24 beats, 8 divergences, and 48 QA frames;
- QA: at most 8 findings, 48 checked frames, and 4 residual risks;
- diagnosis: at most 8 evidence items, 8 affected files, and 24 verification frames.

Timing agents may estimate audio cue frames for an idea pass. Before the full proxy, they must replace estimates that control captions, topic-image reveals, cursor contact, selections, or SFX with word- or phrase-level measurements from the actual narration. Rendered QA then confirms the exact visual contact frame and whether the cue reads correctly in motion.

## Concurrency And Retries

- Use at most two concurrent subagents for a short video.
- Parallelize read-heavy or report-only lanes; keep production edits sequential.
- Wait on the current fan-out with bounded waits and keep the user informed during longer work. Poll again only while required results are still pending; avoid repeated reads of unchanged reports.
- Retry a lane once only when its report is missing, invalid, or blocked by a concrete transient failure.
- Do not ask one agent to repeat another agent's work for consensus unless the decision has high visual or factual risk.
- Close or stop obsolete agent work after the user's direction changes.
