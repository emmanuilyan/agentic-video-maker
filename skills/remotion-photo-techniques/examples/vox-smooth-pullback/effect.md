# VOX_SMOOTH_PULLBACK recipe

Source: [Vox Design Short](https://www.youtube.com/shorts/KkckBGX6Yho), 0:05.5–0:08.5. The user approved the third comparison after requesting a **smooth pullback**. The approved standalone render is `FlatVsDepth-v3.mp4` (SHA-256 `93C0C5E9473E0B3577CF258D2A6AB590C171ED3D0CD2182C3583680E87AD2DA4`). The gallery preview is a byte-for-byte copy of that render; its poster is extracted from the same file. The two-panel comparison stays outside the library.

## Mechanism

- One 360×640 still remains on screen through the whole pullback. Do not switch between a layered image and a flattened image during the zoom: that creates a visible jump.
- Animate the containing image scale from 1.35 to 0.95 on frames 2–18 at 24 fps, using `Easing.bezier(.42, 0, .58, 1)`. Keep the underlying image transform at `translateY(-38px) scale(1.12)` for this specific plate.
- As the scale decreases, increase blur from 0 to 0.8 px and reduce brightness from 1 to 0.77. Keep the photo's saturation at 0.57 and contrast at 0.85.
- Only after the pullback finishes, fade the white serif `this is` title and red `bad` label in on frames 19–23. The thin white curved arrow follows the callout. Caption switches to `KIND OF FLAT` on frame 19.
- The reference excerpt cuts to another close shot near its end; the example jumps back to scale 1.35 at frame 67 and removes the flat treatment.

## Layer order

1. Full still with continuous scale and color treatment.
2. White serif title, red highlighted word and white arrow.
3. Small dark caption strip near the bottom.

Use [VoxSmoothPullback](../../assets/techniques/vox-smooth-pullback.tsx) with `imageSrc`, optional title words, captions and accent color. The [example composition](src/Root.tsx) supplies the reviewed still. Replace it with your own still to reuse the motion; positions and pixel values above are measured for the 360×640 example. The source mountain image was reconstructed for review and is a visual substitute, not the original photo.
