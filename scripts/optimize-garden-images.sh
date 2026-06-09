#!/usr/bin/env bash
# Resize garden source art to 768px wide WebP (~70–130 KB each).
# Usage: ./scripts/optimize-garden-images.sh public/images/garden-autumn.jpg
set -euo pipefail
cd "$(dirname "$0")/.."

for input in "$@"; do
  base="${input%.*}"
  output="${base}.webp"
  npx --yes sharp-cli -i "$input" -o "$output" -f webp -q 78 resize 768
  echo "Wrote $output"
done
