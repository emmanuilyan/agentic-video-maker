#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 || $# -gt 4 ]]; then
  echo "usage: $0 VIDEO [EXPECTED_WIDTH] [EXPECTED_HEIGHT] [EXPECTED_FPS]" >&2
  exit 2
fi

video=$1
expected_width=${2:-1080}
expected_height=${3:-1920}
expected_fps=${4:-24}

for command in ffmpeg ffprobe; do
  if ! command -v "$command" >/dev/null 2>&1; then
    echo "error: $command is required" >&2
    exit 2
  fi
done

if [[ ! -f "$video" ]]; then
  echo "error: video not found: $video" >&2
  exit 2
fi

width=$(ffprobe -v error -select_streams v:0 -show_entries stream=width -of default=nw=1:nk=1 "$video")
height=$(ffprobe -v error -select_streams v:0 -show_entries stream=height -of default=nw=1:nk=1 "$video")
fps_ratio=$(ffprobe -v error -select_streams v:0 -show_entries stream=avg_frame_rate -of default=nw=1:nk=1 "$video")
duration=$(ffprobe -v error -show_entries format=duration -of default=nw=1:nk=1 "$video")
video_codec=$(ffprobe -v error -select_streams v:0 -show_entries stream=codec_name -of default=nw=1:nk=1 "$video")
audio_codec=$(ffprobe -v error -select_streams a:0 -show_entries stream=codec_name -of default=nw=1:nk=1 "$video" || true)
fps=$(awk -v value="$fps_ratio" 'BEGIN {split(value,a,"/"); if (a[2] == 0) print 0; else printf "%.3f", a[1]/a[2]}')

echo "file: $video"
echo "duration: ${duration}s"
echo "video: ${video_codec} ${width}x${height} ${fps}fps"
echo "audio: ${audio_codec:-none}"

failed=0
if [[ "$width" != "$expected_width" || "$height" != "$expected_height" ]]; then
  echo "error: expected ${expected_width}x${expected_height}" >&2
  failed=1
fi
if ! awk -v actual="$fps" -v expected="$expected_fps" 'BEGIN {exit !((actual-expected < 0.01) && (expected-actual < 0.01))}'; then
  echo "error: expected ${expected_fps}fps" >&2
  failed=1
fi
if [[ -z "$audio_codec" ]]; then
  echo "error: no audio stream" >&2
  failed=1
fi

echo "decoding full file..."
ffmpeg -v error -i "$video" -f null -

echo "audio levels..."
ffmpeg -hide_banner -nostats -i "$video" -vn -af volumedetect -f null - 2>&1 \
  | grep -E 'mean_volume|max_volume' || true

if [[ "$failed" -ne 0 ]]; then
  exit 1
fi
echo "verification: passed"
