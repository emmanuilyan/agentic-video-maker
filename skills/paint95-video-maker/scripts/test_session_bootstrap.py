"""Check routing discovery without invoking models or touching real session state."""

import contextlib
import io
import json
import sys
import tempfile
import unittest
from pathlib import Path
from unittest.mock import patch

import session_bootstrap as bootstrap


class BootstrapRoutingTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.project = self.root / "workspace" / "video"
        self.project.mkdir(parents=True)
        self.config_dir = self.project.parent / ".codex"
        self.agent_dir = self.config_dir / "agents"
        self.agent_dir.mkdir(parents=True)
        self.config = self.config_dir / "config.toml"
        self.config.write_text('model = "gpt-5.6-sol"\n[agents]\nenabled = true\n')
        for name in bootstrap.AGENT_NAMES:
            model = "gpt-6-astra" if name == "paint95_diagnostician" else "gpt-5.6-luna"
            (self.agent_dir / f"{name}.toml").write_text(
                f'name = "{name}"\nmodel = "{model}"\nmodel_reasoning_effort = "high"\n'
            )

    def run_bootstrap(self, mode="revision"):
        output = io.StringIO()
        with (
            patch.object(Path, "home", return_value=self.root / "home"),
            patch.object(sys, "argv", ["session_bootstrap", str(self.project), "--mode", mode, "--json"]),
            contextlib.redirect_stdout(output),
        ):
            self.assertEqual(bootstrap.main(), 0)
        emitted = json.loads(output.getvalue())
        stored = json.loads((self.project / ".paint95" / "session-state.json").read_text())
        self.assertEqual(emitted, stored)
        return emitted

    def test_new_and_revision_sessions_record_project_route_over_personal_route(self):
        personal = self.root / "home" / ".codex" / "agents"
        personal.mkdir(parents=True)
        (personal / "old-diagnostician.toml").write_text(
            'name = "paint95_diagnostician"\nmodel = "gpt-5.6-sol"\nmodel_reasoning_effort = "medium"\n'
        )
        for mode in bootstrap.MODE_REFERENCES:
            with self.subTest(mode=mode):
                result = self.run_bootstrap(mode)
                self.assertTrue(result["orchestrationReady"])
                self.assertEqual(result["workflowVersion"], 5)
                self.assertEqual(result["configRoot"], str(self.project.parent.resolve()))
                self.assertEqual(result["agentRouting"]["paint95_diagnostician"], {
                    "model": "gpt-6-astra", "reasoningEffort": "high",
                })
                self.assertEqual(result["references"], bootstrap.MODE_REFERENCES[mode])

    def test_missing_effort_does_not_claim_ready_or_inherit_personal_settings(self):
        path = self.agent_dir / "paint95_diagnostician.toml"
        path.write_text('name = "paint95_diagnostician"\nmodel = "gpt-6-astra"\n')
        result = self.run_bootstrap()
        self.assertFalse(result["orchestrationReady"])
        self.assertNotIn("paint95_diagnostician", result["agentRouting"])
        self.assertTrue(any("explicit model and reasoning" in item for item in result["warnings"]))

    def test_disabled_or_incomplete_configuration_uses_fallback(self):
        self.config.write_text('[agents]\nenabled = false\n')
        self.assertFalse(self.run_bootstrap()["orchestrationReady"])
        self.config.unlink()
        result = self.run_bootstrap()
        self.assertFalse(result["orchestrationReady"])
        self.assertEqual(result["agentRouting"], {})


if __name__ == "__main__":
    unittest.main()
