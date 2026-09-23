#!/usr/bin/env python3
"""Compare two narration files using duration and detected silence boundaries."""

from __future__ import annotations

import argparse
import re
import shutil
import statistics
import subprocess
import sys
from pathlib import Path

SILENCE_RE = re.compile(r"silence_(start|end):\s*([0-9.]+)")


def duration(path: Path) -> float:
    result = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "default=nw=1:nk=1", str(path)],
        check=True,
        capture_output=True,
        text=True,
    )
    return float(result.stdout.strip())


def boundaries(path: Path, threshold: str, minimum: float) -> list[tuple[str, float]]:
    result = subprocess.run(
        [
            "ffmpeg", "-hide_banner", "-nostats", "-i", str(path), "-vn",
            "-af", f"silencedetect=noise={threshold}:d={minimum}", "-f", "null", "-",
        ],
        check=False,
        capture_output=True,
        text=True,
    )
    return [(kind, float(value)) for kind, value in SILENCE_RE.findall(result.stderr)]


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("old", type=Path)
    parser.add_argument("new", type=Path)
    parser.add_argument("--threshold", default="-36dB")
    parser.add_argument("--minimum", type=float, default=0.12)
    parser.add_argument("--tolerance", type=float, default=0.12, help="Maximum delta treated as the same boundary")
    parser.add_argument("--summary", action="store_true", help="Print timing totals without the full boundary table")
    args = parser.parse_args()

    if shutil.which("ffmpeg") is None or shutil.which("ffprobe") is None:
        print("error: ffmpeg and ffprobe are required", file=sys.stderr)
        return 2

    old_path = args.old.expanduser().resolve()
    new_path = args.new.expanduser().resolve()
    for path in (old_path, new_path):
        if not path.is_file():
            print(f"error: not found: {path}", file=sys.stderr)
            return 2

    old_duration = duration(old_path)
    new_duration = duration(new_path)
    old_bounds = boundaries(old_path, args.threshold, args.minimum)
    new_bounds = boundaries(new_path, args.threshold, args.minimum)

    print(f"old duration: {old_duration:.6f}s")
    print(f"new duration: {new_duration:.6f}s")
    print(f"duration delta: {new_duration - old_duration:+.6f}s")
    deltas: list[float] = []
    matches: list[tuple[str, float, float, float]] = []
    new_index = 0
    for old_kind, old_time in old_bounds:
        best: tuple[int, float] | None = None
        for index in range(new_index, min(len(new_bounds), new_index + 5)):
            new_kind, new_time = new_bounds[index]
            if new_kind != old_kind:
                continue
            distance = abs(new_time - old_time)
            if best is None or distance < best[1]:
                best = (index, distance)
        if best is None or best[1] > args.tolerance:
            continue
        index = best[0]
        new_kind, new_time = new_bounds[index]
        delta = new_time - old_time
        deltas.append(delta)
        matches.append((new_kind, old_time, new_time, delta))
        new_index = index + 1

    if not args.summary:
        print("\nmatched silence boundaries:")
        print("kind\told\tnew\tdelta")
        for kind, old_time, new_time, delta in matches:
            print(f"{kind}\t{old_time:.6f}\t{new_time:.6f}\t{delta:+.6f}")

    if deltas:
        prefix = "" if args.summary else "\n"
        print(f"{prefix}matched boundaries: {len(deltas)}; median shift: {statistics.median(deltas):+.6f}s")
    else:
        print("\nwarning: no comparable silence boundaries found")
    print("Review audio around the first boundary whose delta changes; do not apply a global shift blindly.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
