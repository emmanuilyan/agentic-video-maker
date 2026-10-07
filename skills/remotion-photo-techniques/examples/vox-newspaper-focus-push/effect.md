# VOX_NEWSPAPER_FOCUS_PUSH recipe

**Reference:** [How to Edit Like Vox — Newspaper Animation](https://www.youtube.com/shorts/_HU37rX4G1U), 0:00–0:04.5. The reference is a creator's “MY EDIT” / “ORIGINAL” comparison; this technique describes the observed graphic motion, not an official Vox style rule.

**Approved output:** 360 × 640, 30 fps, 135 frames. The [preview](../../assets/previews/VOX_NEWSPAPER_FOCUS_PUSH-reference.mp4) is the exact Remotion render the user approved in the v11 source/render comparison. The [component](../../assets/techniques/vox-newspaper-focus-push.tsx) and [runnable scene](src/scene.tsx) implement the same movement.

## Geometry and layers

- Two 310 × 176 article cards begin at x=25; y=106 and y=318 in a 360 × 640 canvas. They sit on a charcoal background with fine diagonal grain. “MY EDIT” and “ORIGINAL” labels occupy the gap above each card.
- Each card has a thin, sharp blue border outside the animated content wrapper. Inside: pale irregular paper texture, red date tab, serif two-line headline, semitransparent yellow highlight, body copy, byline, black-and-white cutout figure, animated red SVG arrow, fine grain.
- Keep date, headline, highlighter, portrait, and body copy as separate layers. The highlight is behind the letterforms. The cutout image needs a transparent silhouette; a rectangular photo leaves a gray patch on the paper.

## Frame timeline

- Frames 0–49: reveal date and headline lines independently with right-side `clipPath`; the lower card starts six frames after the upper. Raise and fade in the figures from the bottom edge.
- Frames 63–90: simulate a small handheld camera move **inside** each frame. The upper card scales from 1 to 0.965 by frame 70, then pushes to 1.12 by frame 82 and holds. The lower card moves from 1 to 0.965 by frame 68, then pushes to 1.15 by frame 82 and holds. Add only about 1–1.5 px of positional drift. Keep the blue border fixed.
- Focus is a separate curve: upper card blurs from frame 67 to a 3.2 px peak at frame 77 and reaches zero at frame 83; lower card starts at frame 64, peaks at frame 77, and recovers at frame 84. The pullback precedes the strongest defocus; the push-in overlaps focus recovery. **The final enlarged scale persists.** Avoid a symmetric blur/zoom pulse that returns both to their initial values.
- Frames 37–118 (variant-dependent): extend yellow marker bars across chosen phrases, then reveal secondary copy. Draw the red arrow with animated `strokeDashoffset` and hold the final composition.

## Reuse

Wrap article contents with `<NewspaperFocusPush frame={frame} variant="upper">…</NewspaperFocusPush>` (or `variant="lower"`). Place this wrapper inside a clipped card; draw the border on the outer card so it stays sharp. The exact demo uses `paper-texture.png`, `trump-cutout-complete.png`, and `musk-cutout-complete.png` from `public/`; replace the portraits and editorial text for another project.

The source offered no caption track and local speech recognition produced no intelligible words. The transferable directions above come from the visible graphics and the user's review of the motion.
