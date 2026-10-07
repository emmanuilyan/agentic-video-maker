# VOX_NEWSPAPER_FOCUS_PUSH

Approved newspaper reveal and focus push from [StanzMedia's 4.5-second Short](https://www.youtube.com/shorts/_HU37rX4G1U). The user approved the exact right-hand render in the v11 comparison. The [preview](../../assets/previews/VOX_NEWSPAPER_FOCUS_PUSH-reference.mp4) and gallery card use that render, not the source or side-by-side file.

Run `npm install`, `npm run typecheck`, then `npm run render`. The `NewspaperComparison` composition is 360 × 640, 30 fps, 135 frames. The reusable [NewspaperFocusPush](../../assets/techniques/vox-newspaper-focus-push.tsx) wrapper performs the camera/focus movement around any newspaper contents; [scene.tsx](src/scene.tsx) shows the full two-card layout and reveal order. Copy the three images in `public/` when running this exact example. See [effect.md](effect.md) for the frame timeline and layer recipe.

The portrait cutouts were derived from the reference for this reproduction. Substitute assets suited to your project when reusing the component; the push/focus wrapper itself has no image dependency.
