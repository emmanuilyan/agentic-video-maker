# StanzMedia: newspaper animation comparison

Source: [How to Edit Like Vox - Newspaper Animation](https://www.youtube.com/shorts/_HU37rX4G1U), 4.505 seconds, 360 × 640, 30 fps. Analyzed from a local copy of the public Short on 2026-10-07.

## What is visible

- 0:00–0:01.3: two empty, pale paper panels sit in thin blue frames on a dark, faintly textured field. Red date tabs appear; serif headlines reveal in chunks, with the upper panel slightly ahead of the lower one.
- 0:01–0:02: black-and-white cutout portraits rise from the lower edges of their panels. Bright yellow marker bars emphasize short phrases in the headlines.
- 0:02–0:03: the article contents first retreat slightly, then defocus, then push forward as focus returns. They settle at a larger scale than before the move. Secondary copy and bylines become legible.
- 0:03–0:04.5: yellow highlighting extends to secondary copy; thin red hand-drawn arrows point at the portraits. Both article cards hold for comparison.

The upper panel is labeled “MY EDIT” and the lower “ORIGINAL”. This is a creator's side-by-side demonstration; it is not evidence of an official Vox house style. The paper is irregular and lightly crumpled, not a regular digital dot grid. The editorial hierarchy is date → headline → selected phrase → subject portrait → supporting text/annotation.

## Audio / attribution boundary

The platform offered no caption track. A local Whisper base pass returned only an ellipsis, with no intelligible words. Do not attribute any specific spoken instruction to the creator based on this clip. The production guidance above is inferred from the visible motion only.

## Transferable decision

For newspaper graphics, build independent layers for the date, headline lines, highlighter strokes, cutout subject, body copy and hand-drawn callout. Time each reveal to the reading order. Treat paper texture as part of the article surface and keep the highlighter semitransparent enough to preserve letterforms. Verify motion in frames before treating a still as evidence of the reveal order.

Keep the blue card border outside the blur/zoom transform: the paper and article contents soften and enlarge while the border stays sharp. Model the move with separate scale and focus curves: a small pullback precedes defocus, and the subsequent push-in brings the article back into focus at a larger size. Cutout figures need a real silhouette mask; a rectangular image with blended or faded edges leaves a visible gray patch on the paper. Match each highlighter's start position to the selected words, not merely to the start of the text line.
