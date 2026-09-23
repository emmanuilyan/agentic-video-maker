#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 5 || $# -gt 6 ]]; then
  echo "usage: $0 PROJECT_DIR ENTRY_FILE COMPOSITION OUTPUT FRAME_RANGE [SCALE]" >&2
  echo "example: $0 . src/index.tsx Video out/qa/scene.mp4 120-240 0.5" >&2
  echo "use FRAME_RANGE=all for a full low-resolution proxy" >&2
  exit 2
fi

project_dir=$1
entry_file=$2
composition=$3
output_arg=$4
frame_range=$5
scale=${6:-0.5}
script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
compact_runner="$script_dir/run_compact.py"

if ! [[ "$frame_range" == "all" || "$frame_range" =~ ^[0-9]+-[0-9]+$ ]]; then
  echo "error: FRAME_RANGE must be start-end or all" >&2
  exit 2
fi
if ! [[ "$scale" =~ ^(0\.[1-9][0-9]*|1(\.0+)?)$ ]]; then
  echo "error: SCALE must be greater than 0 and no greater than 1" >&2
  exit 2
fi
for command in npx python3; do
  if ! command -v "$command" >/dev/null 2>&1; then
    echo "error: $command is required" >&2
    exit 2
  fi
done

project_dir=$(cd "$project_dir" && pwd)
if [[ "$output_arg" = /* ]]; then
  output=$output_arg
else
  output="$project_dir/$output_arg"
fi
mkdir -p "$(dirname "$output")"
log="${output%.*}.log"

command=(
  npx remotion render "$entry_file" "$composition" "$output"
  --codec=h264 --audio-codec=aac --scale="$scale" --quiet
)
if [[ "$frame_range" != "all" ]]; then
  command+=(--frames="$frame_range")
fi

(
  cd "$project_dir"
  python3 "$compact_runner" \
    --log "$log" --label proxy-render --silent-success -- "${command[@]}"
)

echo "proxy: frames=$frame_range scale=$scale output=$output log=$log"
