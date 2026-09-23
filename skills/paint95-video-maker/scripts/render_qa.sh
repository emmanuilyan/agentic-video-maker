#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 6 ]]; then
  echo "usage: $0 PROJECT_DIR ENTRY_FILE COMPOSITION OUT_DIR FRAME_LIST COLUMNS" >&2
  echo "example: $0 . src/index.tsx Video out/qa 0,22,24,306 3" >&2
  exit 2
fi

project_dir=$1
entry_file=$2
composition=$3
out_dir=$4
frame_list=$5
columns=$6
qa_scale=${PAINT95_QA_SCALE:-0.5}
script_dir=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)
compact_runner="$script_dir/run_compact.py"

if ! [[ "$columns" =~ ^[1-9][0-9]*$ ]]; then
  echo "error: COLUMNS must be a positive integer" >&2
  exit 2
fi
if ! [[ "$qa_scale" =~ ^(0\.[1-9][0-9]*|1(\.0+)?)$ ]]; then
  echo "error: PAINT95_QA_SCALE must be greater than 0 and no greater than 1" >&2
  exit 2
fi

for command in ffmpeg npx python3; do
  if ! command -v "$command" >/dev/null 2>&1; then
    echo "error: $command is required" >&2
    exit 2
  fi
done
if [[ ! -f "$compact_runner" ]]; then
  echo "error: compact runner not found: $compact_runner" >&2
  exit 2
fi

project_dir=$(cd "$project_dir" && pwd)
if [[ "$out_dir" = /* ]]; then
  output_root=$out_dir
else
  output_root="$project_dir/$out_dir"
fi
log_dir="$output_root/logs"
bundle_dir="$output_root/.remotion-bundle"

mkdir -p "$output_root" "$log_dir"
rm -f "$output_root"/frame-*.png "$output_root/contact-sheet.png"
IFS=',' read -r -a frames <<< "$frame_list"

(
  cd "$project_dir"
  python3 "$compact_runner" \
    --log "$log_dir/bundle.log" --label qa-bundle --silent-success -- \
    npx remotion bundle "$entry_file" --out-dir="$bundle_dir" --quiet
)

for frame in "${frames[@]}"; do
  if ! [[ "$frame" =~ ^[0-9]+$ ]]; then
    echo "error: invalid frame: $frame" >&2
    exit 2
  fi
  printf -v padded "%06d" "$frame"
  (
    cd "$project_dir"
    python3 "$compact_runner" \
      --log "$log_dir/frame-$padded.log" --label "qa-frame-$frame" --silent-success -- \
      npx remotion still "$bundle_dir" "$composition" "$output_root/frame-$padded.png" \
      --frame="$frame" --scale="$qa_scale" --quiet
  )
done

count=${#frames[@]}
rows=$(( (count + columns - 1) / columns ))
ffmpeg -hide_banner -loglevel error -y -framerate 1 \
  -pattern_type glob -i "$output_root/frame-*.png" \
  -vf "scale=360:-1,tile=${columns}x${rows}:padding=8:margin=8:color=0x303030" \
  -frames:v 1 "$output_root/contact-sheet.png"

echo "qa: frames=$count scale=$qa_scale contact_sheet=$output_root/contact-sheet.png logs=$log_dir"
