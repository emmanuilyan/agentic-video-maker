#!/usr/bin/env python3
"""Run a noisy command, store its full log, and print a bounded status."""

from __future__ import annotations

import argparse
import re
import shlex
import subprocess
import sys
import time
from collections import deque
from pathlib import Path


ANSI_RE = re.compile(r"\x1b\[[0-?]*[ -/]*[@-~]")


def tail_lines(path: Path, count: int, max_chars: int) -> list[str]:
    if count <= 0:
        return []
    with path.open("r", encoding="utf-8", errors="replace") as source:
        lines = deque(source, maxlen=count)
    result = []
    for raw in lines:
        line = ANSI_RE.sub("", raw.rstrip())
        if len(line) > max_chars:
            line = line[: max_chars - 3] + "..."
        result.append(line)
    return result


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--log", required=True, type=Path, help="File for complete combined output")
    parser.add_argument("--label", default="command", help="Short name used in the status line")
    parser.add_argument("--success-tail", type=int, default=0)
    parser.add_argument("--error-tail", type=int, default=40)
    parser.add_argument("--max-line-chars", type=int, default=600)
    parser.add_argument("--silent-success", action="store_true")
    parser.add_argument("command", nargs=argparse.REMAINDER)
    args = parser.parse_args()

    command = args.command[1:] if args.command[:1] == ["--"] else args.command
    if not command:
        parser.error("a command is required after --")
    if args.success_tail < 0 or args.error_tail < 0 or args.max_line_chars < 20:
        parser.error("tail counts must be non-negative and --max-line-chars must be at least 20")

    log = args.log.expanduser().resolve()
    log.parent.mkdir(parents=True, exist_ok=True)
    started = time.monotonic()

    with log.open("w", encoding="utf-8") as output:
        output.write(f"$ {shlex.join(command)}\n")
        output.flush()
        try:
            completed = subprocess.run(command, stdout=output, stderr=subprocess.STDOUT, check=False)
            return_code = completed.returncode
        except OSError as error:
            output.write(f"runner error: {error}\n")
            return_code = 127

    elapsed = time.monotonic() - started
    if return_code == 0:
        if not args.silent_success:
            print(f"ok: {args.label} ({elapsed:.1f}s); log={log}")
        for line in tail_lines(log, args.success_tail, args.max_line_chars):
            print(line)
        return 0

    print(
        f"error: {args.label} exited {return_code} after {elapsed:.1f}s; log={log}",
        file=sys.stderr,
    )
    for line in tail_lines(log, args.error_tail, args.max_line_chars):
        print(line, file=sys.stderr)
    return return_code


if __name__ == "__main__":
    raise SystemExit(main())
