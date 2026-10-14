# MAXOR_PORTRAIT_PUNCH_FRAME

Approved 2026-10-14 after independent ChatGPT READY and user approval of comparison 03-portrait-comparison-v1.mp4. Source: https://www.youtube.com/watch?v=kO9HmhwGzXs, 192.40–193.45 seconds.

Tags: portrait, punch zoom, color flash, frame, maxor.

63 frames at 60fps, 1280×720. Frames 0–13 hold the wider portrait. Frame 14 hard-cuts to the closer portrait at scale 1.35, easing linearly to 1 by frame 45. Frames 14–24 use saturation 1.9 and hue rotation 330 degrees. Frames 17–23 add an independent 8px pink border inset 4px. Preserve hard cut, short grading beat and independent border timing.

Implementation: src/Effects.tsx, Portrait component; src/Root.tsx registers MAXOR_PORTRAIT_PUNCH_FRAME. Replace public/assets/portrait-bg.png and portrait-close.png with matching portraits. Dependencies pinned in package.json. Render with `npx remotion render src/index.tsx MAXOR_PORTRAIT_PUNCH_FRAME out/portrait.mp4`.

Limits: source-derived static portrait plates; gameplay motion is not recreated. Final approved Remotion-only preview: ../../assets/previews/MAXOR_PORTRAIT_PUNCH_FRAME-reference.mp4. Gallery uses that exact v1 render, with poster extracted from it; no original footage side-by-side in gallery.
