#!/usr/bin/env python3
"""Initialize and audit one Paint95 session with compact output."""

from __future__ import annotations

import argparse
import json
import os
import sys
import tomllib
from datetime import datetime, timezone
from pathlib import Path


WORKFLOW_VERSION = 5
AGENT_NAMES = {
    "paint95_researcher",
    "paint95_timing",
    "paint95_qa",
    "paint95_diagnostician",
}
MODE_REFERENCES = {
    "new": [
        "efficient-workflow.md",
        "asset-research.md",
        "style-bible.md",
        "agent-orchestration.md",
    ],
    "revision": ["efficient-workflow.md", "production-workflow.md"],
    "narration": ["efficient-workflow.md", "production-workflow.md"],
    "asset": ["asset-research.md", "style-bible.md"],
}
REQUIRED_SCRIPTS = {
    "caption_timeline.py",
    "download_asset.py",
    "media_inventory.py",
    "narration_diff.py",
    "render_proxy.sh",
    "render_qa.sh",
    "run_compact.py",
    "verify_render.sh",
    "verify_sfx_cues.py",
}


def detect_mode(project: Path) -> str:
    revision_markers = [
        project / "project-spec.json",
        project / "src" / "timeline.ts",
        project / "src" / "video",
    ]
    return "revision" if any(marker.exists() for marker in revision_markers) else "new"


def find_config_root(project: Path) -> Path | None:
    for candidate in (project, *project.parents):
        if (candidate / ".codex" / "config.toml").is_file():
            return candidate
    return None


def load_toml(path: Path, warnings: list[str]) -> dict[str, object]:
    try:
        with path.open("rb") as source:
            return tomllib.load(source)
    except (OSError, tomllib.TOMLDecodeError) as error:
        warnings.append(f"invalid config {path}: {error}")
        return {}


def discover_agents(
    config_root: Path | None, warnings: list[str]
) -> tuple[dict[str, str], dict[str, dict[str, str]]]:
    discovered: dict[str, str] = {}
    routing: dict[str, dict[str, str]] = {}
    directories = [Path.home() / ".codex" / "agents"]
    if config_root is not None:
        directories.insert(0, config_root / ".codex" / "agents")

    for directory in directories:
        if not directory.is_dir():
            continue
        for path in sorted(directory.glob("*.toml")):
            data = load_toml(path, warnings)
            name = data.get("name")
            if isinstance(name, str) and name in AGENT_NAMES and name not in discovered:
                discovered[name] = str(path)
                model = data.get("model")
                effort = data.get("model_reasoning_effort")
                if not all(isinstance(value, str) and value.strip() for value in (model, effort)):
                    warnings.append(f"agent {name} needs explicit model and reasoning effort")
                    continue
                routing[name] = {"model": model, "reasoningEffort": effort}
    return discovered, routing


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("project", type=Path, help="Exact video project or workspace directory")
    parser.add_argument("--mode", choices=["auto", *MODE_REFERENCES], default="auto")
    parser.add_argument("--json", action="store_true", help="Emit one compact JSON object")
    args = parser.parse_args()

    project = args.project.expanduser().resolve()
    if not project.is_dir():
        print(f"error: project directory not found: {project}", file=sys.stderr)
        return 2

    mode = detect_mode(project) if args.mode == "auto" else args.mode
    warnings: list[str] = []
    config_root = find_config_root(project)
    config: dict[str, object] = {}
    if config_root is None:
        warnings.append("no project .codex/config.toml found; use current parent settings")
    else:
        config = load_toml(config_root / ".codex" / "config.toml", warnings)

    raw_agents = config.get("agents")
    agent_config = raw_agents if isinstance(raw_agents, dict) else {}
    orchestration_enabled = bool(agent_config.get("enabled", True))
    concurrency = agent_config.get("max_concurrent_threads_per_session")
    if not orchestration_enabled:
        warnings.append("project config disables subagents; use sequential lanes")
    if isinstance(concurrency, int) and concurrency > 2:
        warnings.append(f"subagent concurrency is {concurrency}; Paint95 should use at most 2")

    discovered_agents, agent_routing = discover_agents(config_root, warnings)
    missing_agents = sorted(AGENT_NAMES - discovered_agents.keys())
    if missing_agents:
        warnings.append("missing custom agents: " + ",".join(missing_agents))

    skill_root = Path(__file__).resolve().parent.parent
    script_dir = skill_root / "scripts"
    missing_scripts = sorted(name for name in REQUIRED_SCRIPTS if not (script_dir / name).is_file())
    non_executable = sorted(
        name
        for name in REQUIRED_SCRIPTS
        if (script_dir / name).is_file() and not os.access(script_dir / name, os.X_OK)
    )
    if missing_scripts:
        warnings.append("missing scripts: " + ",".join(missing_scripts))
    if non_executable:
        warnings.append("non-executable scripts: " + ",".join(non_executable))

    state_dir = project / ".paint95"
    result_dir = state_dir / "agent-results"
    result_dir.mkdir(parents=True, exist_ok=True)
    state_path = state_dir / "session-state.json"
    state = {
        "workflowVersion": WORKFLOW_VERSION,
        "startedAt": datetime.now(timezone.utc).isoformat(),
        "mode": mode,
        "project": str(project),
        "configRoot": str(config_root) if config_root else None,
        "parentModel": config.get("model"),
        "parentReasoningEffort": config.get("model_reasoning_effort"),
        "defaultSubagentModel": agent_config.get("default_subagent_model"),
        "defaultSubagentReasoningEffort": agent_config.get("default_subagent_reasoning_effort"),
        "orchestrationReady": orchestration_enabled and AGENT_NAMES == agent_routing.keys(),
        "agents": discovered_agents,
        "agentRouting": agent_routing,
        "agentResultDir": str(result_dir),
        "compactToolsReady": not missing_scripts and not non_executable,
        "scriptRoot": str(script_dir),
        "references": MODE_REFERENCES[mode],
        "warnings": warnings[:8],
    }
    temporary = state_path.with_suffix(".json.tmp")
    temporary.write_text(json.dumps(state, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    os.replace(temporary, state_path)

    if args.json:
        print(json.dumps(state, ensure_ascii=False, separators=(",", ":")))
    else:
        references = ",".join(state["references"])
        readiness = "ready" if state["orchestrationReady"] else "fallback"
        diagnosis = agent_routing.get("paint95_diagnostician", {})
        escalation = f"{diagnosis.get('model', 'unconfigured')}/{diagnosis.get('reasoningEffort', 'unset')}"
        print(
            f"paint95-bootstrap: workflow={WORKFLOW_VERSION} mode={mode} "
            f"orchestration={readiness} agents={len(discovered_agents)}/4 "
            f"escalation={escalation} "
            f"refs={references} state={state_path} warnings={len(warnings[:8])}"
        )
        for warning in warnings[:8]:
            print(f"warning: {warning}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
