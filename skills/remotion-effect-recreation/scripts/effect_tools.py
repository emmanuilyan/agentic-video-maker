#!/usr/bin/env python3
"""Frame-accurate reference inspection and Remotion comparison using FFmpeg."""

from __future__ import annotations

import argparse
import json
import math
import re
import shutil
import statistics
import subprocess
import tempfile
from pathlib import Path


PTS = re.compile(r"\bn:\s*(\d+)\b.*?\bpts_time:([\d.]+)")


def ffmpeg(*args: str, capture: bool = False) -> subprocess.CompletedProcess:
    if not shutil.which("ffmpeg"):
        raise SystemExit("ffmpeg is required on PATH")
    return subprocess.run(
        ["ffmpeg", "-hide_banner", "-nostdin", *args],
        check=True,
        stdout=subprocess.PIPE if capture else subprocess.DEVNULL,
        stderr=subprocess.PIPE if capture else None,
    )


def probe(video: Path) -> dict:
    if not shutil.which("ffprobe"):
        raise SystemExit("ffprobe is required on PATH")
    result = subprocess.run(
        [
            "ffprobe", "-v", "error", "-select_streams", "v:0",
            "-show_entries", "stream=width,height,avg_frame_rate",
            "-show_entries", "format=duration", "-of", "json", str(video),
        ],
        check=True,
        capture_output=True,
        text=True,
    )
    data = json.loads(result.stdout)
    if not data.get("streams"):
        raise SystemExit(f"No video stream in {video}")
    return {**data["streams"][0], "duration": float(data["format"]["duration"])}


def parse_rect(value: str) -> tuple[int, int, int, int]:
    try:
        x, y, w, h = (int(n) for n in value.split(","))
    except (ValueError, TypeError):
        raise argparse.ArgumentTypeError("rectangle must be x,y,width,height") from None
    if x < 0 or y < 0 or w < 1 or h < 1:
        raise argparse.ArgumentTypeError("rectangle needs nonnegative origin and positive size")
    return x, y, w, h


def check_rect(rect: tuple[int, int, int, int], info: dict) -> None:
    x, y, w, h = rect
    if x + w > info["width"] or y + h > info["height"]:
        raise SystemExit(f"rectangle {rect} exceeds {info['width']}x{info['height']}")


def timestamps(stderr: bytes) -> list[float]:
    return [float(m.group(2)) for m in PTS.finditer(stderr.decode(errors="replace"))]


def frames(args: argparse.Namespace) -> None:
    source = args.video.resolve()
    info = probe(source)
    if not 0 <= args.start < args.end <= info["duration"] + 0.05:
        raise SystemExit("start/end must define a nonempty interval inside the video")
    out = args.out.resolve()
    out.mkdir(parents=True, exist_ok=True)
    result = ffmpeg(
        "-loglevel", "info", "-copyts", "-ss", str(args.start),
        "-t", str(args.end - args.start), "-i", str(source),
        "-vf", "showinfo", "-fps_mode", "passthrough", "-y",
        str(out / "frame_%04d.png"), capture=True,
    )
    files = sorted(out.glob("frame_*.png"))
    pts = timestamps(result.stderr)
    if len(files) != len(pts):
        raise SystemExit(f"Expected {len(pts)} frames, found {len(files)} in {out}")
    manifest = {
        "source": str(source), "metadata": info,
        "requested_range": [args.start, args.end],
        "frames": [{"file": f.name, "time": t} for f, t in zip(files, pts)],
    }
    (out / "frames.json").write_text(json.dumps(manifest, indent=2) + "\n")
    if files:
        selected = sorted({round(i * (len(files) - 1) / min(31, len(files) - 1))
                           for i in range(min(32, len(files)))}) if len(files) > 1 else [0]
        with tempfile.TemporaryDirectory() as temp:
            for i, index in enumerate(selected):
                shutil.copyfile(files[index], Path(temp) / f"tile_{i:04d}.png")
            rows = math.ceil(len(selected) / 4)
            ffmpeg(
                "-loglevel", "error", "-framerate", "1", "-i",
                str(Path(temp) / "tile_%04d.png"), "-vf",
                f"scale=480:-1,tile=4x{rows}:padding=4:margin=4:color=black",
                "-frames:v", "1", "-y", str(out / "contact-sheet.jpg"),
            )
    print(json.dumps({"frames": len(files), "manifest": str(out / "frames.json"),
                      "contact_sheet": str(out / "contact-sheet.jpg")}, indent=2))


def raw_frames(video: Path, start: float, end: float,
               rect: tuple[int, int, int, int]) -> tuple[list[float], bytes]:
    x, y, w, h = rect
    result = ffmpeg(
        "-loglevel", "info", "-copyts", "-ss", str(start),
        "-t", str(end - start), "-i", str(video),
        "-vf", f"crop={w}:{h}:{x}:{y},showinfo,format=rgb24",
        "-fps_mode", "passthrough", "-f", "rawvideo", "-pix_fmt", "rgb24",
        "-", capture=True,
    )
    pts = timestamps(result.stderr)
    frame_size = w * h * 3
    if len(result.stdout) != len(pts) * frame_size:
        raise SystemExit("Decoded frame count did not match frame timestamps")
    return pts, result.stdout


def color(args: argparse.Namespace) -> None:
    info = probe(args.video)
    check_rect(args.rect, info)
    pts, data = raw_frames(args.video, args.time, args.time + 0.1, args.rect)
    if not pts:
        raise SystemExit("No frame at the requested time")
    _, _, w, h = args.rect
    pixels = []
    for i in range(0, w * h * 3, 3):
        rgb = data[i:i + 3]
        hi, lo = max(rgb), min(rgb)
        if hi / 255 >= args.min_brightness and (hi - lo) / max(hi, 1) >= args.min_saturation:
            pixels.append(rgb)
    if not pixels:
        raise SystemExit("No pixels match brightness/saturation thresholds; choose a tighter rectangle")
    med = [round(statistics.median(p[channel] for p in pixels)) for channel in range(3)]
    print(json.dumps({"time": pts[0], "pixels": len(pixels), "rgb": med,
                      "hex": "#" + "".join(f"{v:02X}" for v in med)}, indent=2))


def track(args: argparse.Namespace) -> None:
    info = probe(args.video)
    check_rect(args.rect, info)
    x, y, w, h = args.rect
    bands = [tuple(int(v) for v in band.split(":")) for band in args.band] or [(y, y + h)]
    for top, bottom in bands:
        if not y <= top < bottom <= y + h:
            raise SystemExit(f"band {top}:{bottom} must fit inside rectangle")
    target = bytes.fromhex(args.color.removeprefix("#"))
    if len(target) != 3:
        raise SystemExit("color must be a six-digit RGB hex value")
    pts, data = raw_frames(args.video, args.start, args.end, args.rect)
    size = w * h * 3
    rows = []
    for fi, time in enumerate(pts):
        frame = memoryview(data)[fi * size:(fi + 1) * size]
        for bi, (top, bottom) in enumerate(bands):
            left, right, upper, lower, count = w, -1, h, -1, 0
            for py in range(top - y, bottom - y):
                row_start = py * w * 3
                for px in range(w):
                    k = row_start + px * 3
                    if all(abs(frame[k + c] - target[c]) <= args.tolerance for c in range(3)):
                        left, right = min(left, px), max(right, px)
                        upper, lower = min(upper, py), max(lower, py)
                        count += 1
            rows.append({"time": time, "band": bi, "left": x + left if count else None,
                         "right": x + right if count else None,
                         "top": y + upper if count else None,
                         "bottom": y + lower if count else None, "pixels": count})
    output = args.out.resolve()
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps({"source": str(args.video.resolve()),
                                  "rectangle": args.rect, "color": args.color,
                                  "rows": rows}, indent=2) + "\n")
    print(json.dumps({"frames": len(pts), "bands": len(bands), "output": str(output)}, indent=2))


def still(video: Path, time: float, rect: tuple[int, int, int, int] | None,
          path: Path) -> None:
    command = ["-loglevel", "error", "-ss", str(time), "-i", str(video)]
    if rect:
        x, y, w, h = rect
        command += ["-vf", f"crop={w}:{h}:{x}:{y}"]
    ffmpeg(*command, "-frames:v", "1", "-y", str(path))


def compare(args: argparse.Namespace) -> None:
    source_info, render_info = probe(args.source), probe(args.render)
    if args.rect:
        check_rect(args.rect, source_info)
        check_rect(args.rect, render_info)
    elif (source_info["width"], source_info["height"]) != (render_info["width"], render_info["height"]):
        raise SystemExit("Videos need matching dimensions; provide --rect or resize one first")
    out = args.out.resolve()
    out.mkdir(parents=True, exist_ok=True)
    for time in args.times:
        render_time = time - args.render_zero_at
        if not 0 <= render_time < render_info["duration"]:
            raise SystemExit(f"Source time {time} maps outside the render")
        with tempfile.TemporaryDirectory() as temp:
            left, right = Path(temp) / "source.png", Path(temp) / "render.png"
            still(args.source, time, args.rect, left)
            still(args.render, render_time, args.rect, right)
            output = out / f"compare_{time:.3f}.png"
            ffmpeg("-loglevel", "error", "-i", str(left), "-i", str(right),
                   "-filter_complex", "hstack=inputs=2", "-frames:v", "1",
                   "-y", str(output))
            print(output)


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest="command", required=True)

    p = sub.add_parser("frames", help="Extract every frame with source PTS and a contact sheet")
    p.add_argument("video", type=Path)
    p.add_argument("--start", type=float, required=True)
    p.add_argument("--end", type=float, required=True)
    p.add_argument("--out", type=Path, required=True)
    p.set_defaults(func=frames)

    p = sub.add_parser("color", help="Median saturated color in a chosen source rectangle")
    p.add_argument("video", type=Path)
    p.add_argument("--time", type=float, required=True)
    p.add_argument("--rect", type=parse_rect, required=True)
    p.add_argument("--min-saturation", type=float, default=0.3)
    p.add_argument("--min-brightness", type=float, default=0.4)
    p.set_defaults(func=color)

    p = sub.add_parser("track", help="Track matching color bounds for each source frame")
    p.add_argument("video", type=Path)
    p.add_argument("--start", type=float, required=True)
    p.add_argument("--end", type=float, required=True)
    p.add_argument("--rect", type=parse_rect, required=True)
    p.add_argument("--band", action="append", default=[], help="Absolute y0:y1; repeat per line")
    p.add_argument("--color", required=True, help="Target color such as #E8D943")
    p.add_argument("--tolerance", type=int, default=45, help="Per-channel RGB tolerance")
    p.add_argument("--out", type=Path, required=True)
    p.set_defaults(func=track)

    p = sub.add_parser("compare", help="Side-by-side source/render frames at source timestamps")
    p.add_argument("source", type=Path)
    p.add_argument("render", type=Path)
    p.add_argument("--render-zero-at", type=float, required=True,
                   help="Source time corresponding to render frame zero")
    p.add_argument("--times", type=lambda s: [float(v) for v in s.split(",")], required=True)
    p.add_argument("--rect", type=parse_rect)
    p.add_argument("--out", type=Path, required=True)
    p.set_defaults(func=compare)

    args = parser.parse_args()
    if args.command in {"track", "frames"} and args.end <= args.start:
        parser.error("--end must exceed --start")
    try:
        args.func(args)
    except subprocess.CalledProcessError as exc:
        message = exc.stderr.decode(errors="replace")[-2000:] if exc.stderr else str(exc)
        raise SystemExit(f"FFmpeg failed: {message}") from exc


if __name__ == "__main__":
    main()
