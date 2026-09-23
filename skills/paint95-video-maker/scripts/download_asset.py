#!/usr/bin/env python3
"""Download one direct media URL atomically and optionally update a JSON manifest."""

from __future__ import annotations

import argparse
import hashlib
import json
import os
import shutil
import subprocess
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone
from pathlib import Path


def detected_mime(path: Path) -> str | None:
    if shutil.which("file") is None:
        return None
    result = subprocess.run(
        ["file", "--brief", "--mime-type", str(path)],
        check=False,
        capture_output=True,
        text=True,
    )
    return result.stdout.strip().lower() if result.returncode == 0 else None


def update_manifest(path: Path, entry: dict[str, object]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    if path.exists():
        data = json.loads(path.read_text(encoding="utf-8"))
        if not isinstance(data, list):
            raise ValueError(f"manifest must contain a JSON array: {path}")
    else:
        data = []

    duplicate = next(
        (
            item.get("localPath")
            for item in data
            if isinstance(item, dict)
            and item.get("sha256") == entry["sha256"]
            and item.get("localPath") != entry["localPath"]
        ),
        None,
    )
    if duplicate:
        entry["duplicateOf"] = duplicate

    data = [
        item
        for item in data
        if not isinstance(item, dict) or item.get("localPath") != entry["localPath"]
    ]
    data.append(entry)
    temporary = path.with_suffix(path.suffix + ".tmp")
    temporary.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    os.replace(temporary, path)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("url", help="Direct HTTP(S) URL of an image, video, or audio file")
    parser.add_argument("output", type=Path, help="Local output path")
    parser.add_argument("--source-page", default="", help="Human-facing source page")
    parser.add_argument("--query", default="", help="Search query that found the asset")
    parser.add_argument("--scene", default="", help="Beat or scene identifier")
    parser.add_argument("--manifest", type=Path, help="JSON array to create or update")
    parser.add_argument("--referer", default="", help="Optional public source-page referer")
    parser.add_argument("--overwrite", action="store_true")
    parser.add_argument("--max-mb", type=int, default=500)
    parser.add_argument("--retries", type=int, default=3)
    parser.add_argument("--quiet", action="store_true", help="Print one summary line instead of the manifest entry")
    args = parser.parse_args()

    parsed = urllib.parse.urlparse(args.url)
    if parsed.scheme not in {"http", "https"}:
        print("error: URL must use http or https", file=sys.stderr)
        return 2
    if args.max_mb <= 0 or args.retries <= 0:
        print("error: --max-mb and --retries must be positive", file=sys.stderr)
        return 2

    output_arg = args.output.expanduser()
    output = output_arg.resolve()
    if output.exists() and not args.overwrite:
        print(f"error: output exists; pass --overwrite to replace it: {output}", file=sys.stderr)
        return 2
    output.parent.mkdir(parents=True, exist_ok=True)
    part = output.with_suffix(output.suffix + ".part")
    part.unlink(missing_ok=True)

    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Paint95VideoMaker/1.0",
        "Accept": "image/*,video/*,audio/*,application/octet-stream;q=0.9,*/*;q=0.2",
    }
    if args.referer:
        headers["Referer"] = args.referer

    max_bytes = args.max_mb * 1024 * 1024
    content_type = ""
    final_url = args.url
    sha256 = hashlib.sha256()
    byte_count = 0
    last_error: Exception | None = None

    for attempt in range(args.retries):
        try:
            request = urllib.request.Request(args.url, headers=headers)
            with urllib.request.urlopen(request, timeout=45) as response:
                final_url = response.geturl()
                content_type = response.headers.get_content_type().lower()
                declared_length = int(response.headers.get("Content-Length", "0") or 0)
                if content_type.startswith("text/") or content_type in {
                    "application/xhtml+xml",
                    "application/json",
                }:
                    raise ValueError(f"URL returned {content_type}, not a direct media file")
                if declared_length > max_bytes:
                    raise ValueError(
                        f"declared file size {declared_length} exceeds --max-mb {args.max_mb}"
                    )

                with part.open("wb") as destination:
                    while True:
                        chunk = response.read(1024 * 1024)
                        if not chunk:
                            break
                        byte_count += len(chunk)
                        if byte_count > max_bytes:
                            raise ValueError(f"download exceeds --max-mb {args.max_mb}")
                        sha256.update(chunk)
                        destination.write(chunk)
            last_error = None
            break
        except (OSError, urllib.error.URLError, urllib.error.HTTPError, ValueError) as error:
            last_error = error
            part.unlink(missing_ok=True)
            byte_count = 0
            sha256 = hashlib.sha256()
            if isinstance(error, ValueError) or attempt + 1 >= args.retries:
                break
            time.sleep(2**attempt)

    if last_error is not None:
        print(f"error: download failed: {last_error}", file=sys.stderr)
        return 1
    if byte_count == 0:
        part.unlink(missing_ok=True)
        print("error: downloaded file is empty", file=sys.stderr)
        return 1

    mime = detected_mime(part) or content_type or "unknown"
    if mime.startswith("text/") or mime in {"application/xhtml+xml", "application/json"}:
        part.unlink(missing_ok=True)
        print(f"error: downloaded payload is {mime}, not media", file=sys.stderr)
        return 1

    os.replace(part, output)
    digest = sha256.hexdigest()
    entry: dict[str, object] = {
        "id": output.stem,
        "kind": mime.split("/", 1)[0] if "/" in mime else "unknown",
        "query": args.query,
        "scene": args.scene,
        "sourcePage": args.source_page or args.referer or args.url,
        "downloadUrl": args.url,
        "finalUrl": final_url,
        "localPath": str(output_arg),
        "absolutePath": str(output),
        "contentType": content_type or "unknown",
        "detectedMime": mime,
        "bytes": byte_count,
        "sha256": digest,
        "downloadedAt": datetime.now(timezone.utc).isoformat(),
    }

    if args.manifest:
        update_manifest(args.manifest.expanduser().resolve(), entry)

    if args.quiet:
        print(f"downloaded: {output} ({byte_count} bytes, {mime}, sha256={digest[:12]})")
    else:
        print(json.dumps(entry, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
