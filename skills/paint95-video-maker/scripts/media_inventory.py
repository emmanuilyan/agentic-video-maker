#!/usr/bin/env python3
"""Probe media files in paths and print a compact deterministic inventory."""

from __future__ import annotations

import argparse
import json
import math
import os
import shutil
import subprocess
import sys
from pathlib import Path

MEDIA_EXTENSIONS = {
    ".aac", ".aiff", ".flac", ".gif", ".jpeg", ".jpg", ".m4a", ".mkv",
    ".mov", ".mp3", ".mp4", ".ogg", ".png", ".wav", ".webm", ".webp",
}
EXCLUDED_DIRECTORIES = {".cache", ".git", ".remotion", "build", "dist", "node_modules", "out"}


def files_from_paths(paths: list[Path], include_generated: bool) -> list[Path]:
    found: set[Path] = set()
    for path in paths:
        path = path.expanduser().resolve()
        if path.is_file() and path.suffix.lower() in MEDIA_EXTENSIONS:
            found.add(path)
        elif path.is_dir():
            for root, directories, filenames in os.walk(path):
                if not include_generated:
                    directories[:] = [name for name in directories if name not in EXCLUDED_DIRECTORIES]
                for filename in filenames:
                    candidate = Path(root, filename)
                    if candidate.suffix.lower() in MEDIA_EXTENSIONS:
                        found.add(candidate.resolve())
        else:
            print(f"warning: not found: {path}", file=sys.stderr)
    return sorted(found, key=lambda item: str(item).casefold())


def probe(path: Path, fps: float) -> dict[str, object]:
    command = [
        "ffprobe", "-v", "error", "-show_entries",
        "format=duration,size:stream=index,codec_name,codec_type,width,height,avg_frame_rate,sample_rate,channels",
        "-of", "json", str(path),
    ]
    completed = subprocess.run(command, check=False, capture_output=True, text=True)
    if completed.returncode != 0:
        return {"path": str(path), "error": completed.stderr.strip() or "ffprobe failed"}

    data = json.loads(completed.stdout)
    format_data = data.get("format", {})
    duration = float(format_data.get("duration", 0) or 0)
    return {
        "path": str(path),
        "bytes": int(format_data.get("size", path.stat().st_size) or 0),
        "durationSeconds": round(duration, 6),
        "framesAtTargetFps": math.ceil(duration * fps),
        "streams": data.get("streams", []),
    }


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("paths", nargs="+", type=Path, help="Files or directories to scan")
    parser.add_argument("--fps", type=float, default=24.0, help="Target composition fps")
    parser.add_argument("--json", action="store_true", help="Emit JSON instead of a table")
    parser.add_argument("--max-items", type=int, default=80, help="Maximum files to probe; 0 means all")
    parser.add_argument("--include-generated", action="store_true", help="Include build, out, and dependency directories")
    args = parser.parse_args()

    if shutil.which("ffprobe") is None:
        print("error: ffprobe is required", file=sys.stderr)
        return 2

    if args.max_items < 0:
        print("error: --max-items must be non-negative", file=sys.stderr)
        return 2

    files = files_from_paths(args.paths, args.include_generated)
    omitted = max(0, len(files) - args.max_items) if args.max_items else 0
    if args.max_items:
        files = files[: args.max_items]
    inventory = [probe(path, args.fps) for path in files]
    if args.json:
        print(json.dumps(inventory, ensure_ascii=False, indent=2))
        if omitted:
            print(f"warning: omitted {omitted} files; pass --max-items 0 to include all", file=sys.stderr)
        return 0

    print("duration\tframes\tsize\tstreams\tpath")
    for item in inventory:
        if "error" in item:
            print(f"ERROR\t-\t-\t{item['error']}\t{item['path']}")
            continue
        streams = ",".join(
            f"{stream.get('codec_type')}:{stream.get('codec_name')}"
            for stream in item["streams"]  # type: ignore[index]
        )
        print(
            f"{item['durationSeconds']:.3f}s\t{item['framesAtTargetFps']}\t"
            f"{item['bytes']}\t{streams}\t{item['path']}"
        )
    if omitted:
        print(f"... omitted {omitted} files; pass --max-items 0 to include all")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
