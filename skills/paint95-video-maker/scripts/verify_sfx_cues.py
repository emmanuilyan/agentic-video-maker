#!/usr/bin/env python3
"""Verify that named SFX frames produce audible, non-clipping mixed transients."""

from __future__ import annotations

import argparse
import math
import re
import shutil
import subprocess
import sys
from pathlib import Path


MAX_VOLUME_RE = re.compile(r"max_volume:\s+(-?inf|-?\d+(?:\.\d+)?)\s+dB")


def peak_db(path: Path, start_seconds: float, duration_seconds: float) -> float:
    command = [
        "ffmpeg",
        "-hide_banner",
        "-nostats",
        "-ss",
        f"{start_seconds:.6f}",
        "-t",
        f"{duration_seconds:.6f}",
        "-i",
        str(path),
        "-vn",
        "-af",
        "volumedetect",
        "-f",
        "null",
        "-",
    ]
    result = subprocess.run(command, capture_output=True, text=True, check=False)
    if result.returncode != 0:
        raise RuntimeError(result.stderr.strip() or f"ffmpeg failed for {path}")
    match = MAX_VOLUME_RE.search(result.stderr)
    if not match:
        raise RuntimeError(f"max_volume was not reported for {path}")
    return -math.inf if match.group(1) == "-inf" else float(match.group(1))


def parse_frames(value: str) -> list[int]:
    try:
        frames = [int(item.strip()) for item in value.split(",") if item.strip()]
    except ValueError as error:
        raise argparse.ArgumentTypeError("cue frames must be comma-separated integers") from error
    if not frames or any(frame < 0 for frame in frames):
        raise argparse.ArgumentTypeError("cue frames must contain non-negative integers")
    return frames


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("mixed", type=Path, help="Rendered proxy or final media containing the mixed audio")
    parser.add_argument("--fps", type=float, default=24.0)
    parser.add_argument("--cue-frames", required=True, type=parse_frames)
    parser.add_argument("--baseline", type=Path, help="Narration-only media aligned to the same timeline")
    parser.add_argument("--window-ms", type=int, default=220)
    parser.add_argument("--pre-roll-ms", type=int, default=20)
    parser.add_argument("--min-peak-db", type=float, default=-12.0)
    parser.add_argument("--min-lift-db", type=float, default=3.0)
    parser.add_argument("--clip-db", type=float, default=-0.5)
    parser.add_argument("--summary", action="store_true")
    args = parser.parse_args()

    if shutil.which("ffmpeg") is None:
        print("error: ffmpeg is required", file=sys.stderr)
        return 2
    if args.fps <= 0 or args.window_ms <= 0 or args.pre_roll_ms < 0:
        print("error: fps and window must be positive; pre-roll cannot be negative", file=sys.stderr)
        return 2

    mixed = args.mixed.expanduser().resolve()
    baseline = args.baseline.expanduser().resolve() if args.baseline else None
    for path in [mixed, baseline]:
        if path is not None and not path.is_file():
            print(f"error: media not found: {path}", file=sys.stderr)
            return 2

    duration_seconds = args.window_ms / 1000
    failures: list[str] = []
    rows: list[tuple[int, float, float | None]] = []
    for frame in args.cue_frames:
        cue_seconds = frame / args.fps
        start_seconds = max(0.0, cue_seconds - args.pre_roll_ms / 1000)
        try:
            mixed_peak = peak_db(mixed, start_seconds, duration_seconds)
            baseline_peak = peak_db(baseline, start_seconds, duration_seconds) if baseline else None
        except RuntimeError as error:
            print(f"error: {error}", file=sys.stderr)
            return 2

        rows.append((frame, mixed_peak, baseline_peak))
        if mixed_peak < args.min_peak_db:
            failures.append(f"frame {frame}: mixed peak {mixed_peak:.1f} dBFS is below {args.min_peak_db:.1f} dBFS")
        if mixed_peak > args.clip_db:
            failures.append(f"frame {frame}: mixed peak {mixed_peak:.1f} dBFS is too close to clipping")
        if baseline_peak is not None and mixed_peak - baseline_peak < args.min_lift_db:
            failures.append(
                f"frame {frame}: transient lift {mixed_peak - baseline_peak:.1f} dB is below {args.min_lift_db:.1f} dB"
            )

    if args.summary:
        peaks = [row[1] for row in rows]
        message = f"sfx: cues={len(rows)}; mixed_peak_range={min(peaks):.1f}..{max(peaks):.1f} dBFS"
        lifts = [mixed_peak - baseline_peak for _, mixed_peak, baseline_peak in rows if baseline_peak is not None]
        if lifts:
            message += f"; lift_range={min(lifts):.1f}..{max(lifts):.1f} dB"
        print(message)
    else:
        print("frame\tmixed peak\tbaseline peak\tlift")
        for frame, mixed_peak, baseline_peak in rows:
            if baseline_peak is None:
                print(f"{frame}\t{mixed_peak:.1f} dBFS\t-\t-")
            else:
                print(f"{frame}\t{mixed_peak:.1f} dBFS\t{baseline_peak:.1f} dBFS\t{mixed_peak - baseline_peak:.1f} dB")

    if failures:
        print("\nwarnings:")
        for failure in failures:
            print(f"- {failure}")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
