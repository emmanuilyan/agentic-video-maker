#!/usr/bin/env python3
"""Audit, shift, or make Remotion caption intervals persistent."""

from __future__ import annotations

import argparse
import json
import math
import sys
from pathlib import Path


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("captions", type=Path)
    parser.add_argument("--fps", type=float, default=24.0)
    parser.add_argument("--video-frames", type=int)
    parser.add_argument("--shift-after-ms", type=int)
    parser.add_argument("--shift-ms", type=int, default=0)
    parser.add_argument("--hold-until-next", action="store_true", help="Extend each caption to the next start time")
    parser.add_argument("--final-end-ms", type=int, help="End time for the last persistent caption")
    parser.add_argument("--output", type=Path)
    parser.add_argument("--summary", action="store_true", help="Print totals and warnings instead of every caption")
    args = parser.parse_args()

    path = args.captions.expanduser().resolve()
    data = json.loads(path.read_text(encoding="utf-8"))
    if not isinstance(data, list):
        print("error: captions JSON must be an array", file=sys.stderr)
        return 2

    if args.final_end_ms is not None and not args.hold_until_next:
        print("error: --final-end-ms requires --hold-until-next", file=sys.stderr)
        return 2

    shifted: list[dict] = []
    for raw in data:
        item = dict(raw)
        start = int(item["startMs"])
        end = int(item["endMs"])
        if args.shift_after_ms is not None:
            if start >= args.shift_after_ms:
                start += args.shift_ms
            if end >= args.shift_after_ms:
                end += args.shift_ms
        item["startMs"] = start
        item["endMs"] = end
        item["timestampMs"] = start
        shifted.append(item)

    if args.hold_until_next and shifted:
        for index, item in enumerate(shifted[:-1]):
            item["endMs"] = int(shifted[index + 1]["startMs"])
        if args.final_end_ms is not None:
            final_end = args.final_end_ms
        elif args.video_frames is not None:
            final_end = round(args.video_frames / args.fps * 1000)
        else:
            final_end = int(shifted[-1]["endMs"])
        shifted[-1]["endMs"] = final_end

    errors: list[str] = []
    previous_end = 0
    if not args.summary:
        print("#\tstart-end ms\tframes\ttext")
    for index, item in enumerate(shifted):
        start = int(item["startMs"])
        end = int(item["endMs"])

        if end <= start:
            errors.append(f"caption {index}: endMs must be greater than startMs")
        if start < previous_end:
            errors.append(f"caption {index}: overlaps previous caption by {previous_end - start}ms")
        gap = start - previous_end
        if index > 0 and gap > 250:
            errors.append(f"caption {index}: gap of {gap}ms")
        previous_end = max(previous_end, end)

        start_frame = math.floor(start / 1000 * args.fps)
        end_frame = math.ceil(end / 1000 * args.fps)
        if not args.summary:
            print(f"{index}\t{start}-{end}\t{start_frame}-{end_frame}\t{item.get('text', '')}")

    required_frames = math.ceil(previous_end / 1000 * args.fps)
    prefix = "" if args.summary else "\n"
    print(f"{prefix}captions: {len(shifted)}; last_end={previous_end}ms; minimum_frames={required_frames} at {args.fps:g}fps")
    if args.video_frames is not None and required_frames > args.video_frames:
        errors.append(f"captions exceed video by {required_frames - args.video_frames} frames")

    if args.output:
        output = args.output.expanduser().resolve()
        output.parent.mkdir(parents=True, exist_ok=True)
        output.write_text(json.dumps(shifted, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"wrote: {output}")
    elif args.shift_after_ms is not None and args.shift_ms != 0:
        errors.append("shift requested without --output; source was not modified")

    if errors:
        print("\nwarnings:")
        for error in errors:
            print(f"- {error}")
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
