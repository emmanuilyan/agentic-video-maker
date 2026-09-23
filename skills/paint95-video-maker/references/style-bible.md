# Paint95 Stop-Motion Style Bible

## Visual Hierarchy

The video is a handmade educational collage running inside a Windows 95 Paint window. The UI is a stage, not the subject. At every moment the viewer should understand, in this order:

1. the mechanical or educational action;
2. the current subtitle phrase;
3. a small background gag or ambient movement;
4. the Paint chrome.

Use recognizably tactile source material: photographic cutouts, halftone hands, paper collage characters, pixel sprites, simple painted marks, and deliberately stepped motion. Avoid polished vector motion, glossy 3D objects, smooth easing, modern rounded UI, gradients used as decorative atmosphere, and generic stock-video transitions.

## Windows 95 Paint Stage

For a 1080x1920 master, the proven proportions are:

- teal desktop background;
- outer window near `(20, 28)`, about `1040x1864`, classic light top/left and dark bottom/right bevel;
- dark-blue title bar near `(28, 36)`, about `1024x42`;
- title is the subject, such as `древний будильник`, never `Untitled` once the topic is known;
- menu row with restrained Tahoma/Arial typography;
- narrow two-column tool strip at the left;
- one custom pixel-cat tool icon when a cat interaction is part of the ending;
- Paint canvas near `(116, 128)`, using a content scale around `0.802`;
- palette and status bar below the canvas.

Only use the native window and canvas bevels. Do not add a second decorative frame around the teaching object or between the content and Paint chrome.

Use square corners, sharp 2-10 px borders, `#c0c0c0` chrome, `#000080` title bars, `#ffffff` highlights, and `#404040` shadows. Letter spacing stays `0`.

## Subtitle Frame

Reserve the lower content area before placing the main object. A useful content-space frame is around `(68, 1518)`, `944x274`.

- Keep it static for the whole video.
- Use a classic raised outer bevel and inset dark display.
- Add only a very slow pearlescent pass, roughly one traversal across the entire Short.
- Use high-contrast white text with black outline/shadow and yellow active-word emphasis.
- Keep phrases short enough for two lines. Reduce font size for long captions instead of clipping or allowing overlap.
- Choose whether captions end with speech or persist until the next phrase. In persistent mode, keep the previous phrase visible across narration pauses; the text changes directly on the next measured onset.
- The last caption may outlive narration when the ending gag continues, but it must remain intentional and readable through the final frame.

## Stop-Motion Cadence

Render at 24 fps and animate key poses on twos. Background water, clouds, and distant actors can update every 3-5 frames. The visual should feel deliberately stepped, not like low-frame-rate smooth motion.

Use:

- 6-12 discrete poses for a normal entrance or gesture;
- 12-20 poses for a long traverse;
- 2-4 pose anticipation before contact;
- 3-5 settle poses after impact;
- 1-3 px seeded registration jitter for cutouts;
- larger jitter only during impact or deliberately rough collage movement.

Avoid changing an object's width, transform origin, or parent layout during animation. Stable boxes prevent accidental jumps.

UI cursor motion is a scoped exception to the physical stop-motion cadence. Move it continuously along a deterministic cubic Bézier path unless the requested gag calls for stepped poses. The cursor pauses on the tool, visibly depresses it, travels to the canvas, visibly clicks the target, and remains at the contact point for roughly `0.5-0.8` seconds or until the result is readable.

## Paint Selection Language

Use the selection treatment that matches the visible Paint operation:

- a freehand lasso follows the rendered silhouette closely;
- magic-wand marching ants follow the selected region with restrained dash movement;
- a transform selection is an axis-aligned rectangle with four corner and four edge handles.

Measure selection geometry on the final rendered crop because `object-fit`, scaling, and clipping change source-image coordinates. Render the activation frame at full resolution and confirm that the boundary reaches the intended pixels. A selection exists only while it explains the current phrase; an unannotated object is the default.

## Appearance And Disappearance

### Painted entrance

Use a photographic brush cutout. Pre-orient it once, then preserve that orientation throughout the animation. It approaches from outside the object box, sweeps left-to-right, jumps to the next strip without flipping, and reveals the object immediately behind its bristles. Use irregular strip edges or short paint dabs so the reveal does not look like a plain rectangular mask.

### Point exit

The object shrinks toward its own visual center, loses opacity only near the end, and disappears at a single point. Do not run the brush backward for exits by default.

### Continuity rule

Do not place transitions between actions that are physically continuous. A match lighting a wick, a flame melting wax, and a pin beginning to fall should read as one uninterrupted mechanism.

## Main Mechanical Action

For a candle timer or analogous device:

- show the intact device from frame zero;
- anchor flame and wick to the current burn line, not to the original candle top;
- reveal calibration marks sequentially;
- align one pin with each marked hour;
- if demonstrating insertion, begin with the other pins already installed and animate only the demonstrated pin;
- begin wax glow or wobble shortly before release;
- make each pin fall tip-first or on a rotating arc, never flat;
- use different lateral arcs and landing points;
- start the impact star/ripple, tray shake, and sound on the same frame the pin reaches the tray.

When a bird, alarm, hand, or other explanatory overlay appears, keep the underlying device fixed. Overlays animate relative to it instead of shifting the entire composition.

## Camera And Focus

Use subtle stepped punch-ins, typically `1.05-1.10`, around:

- insertion/contact;
- melt and release;
- each important landing;
- a small final reveal.

Keep the transform origin near the action. During these beats, reduce background-actor opacity and saturation rather than removing the background. Never zoom the Windows 95 chrome; zoom only the canvas content.

## Living Background

Start with a bright Windows 95-like sky/water image. Keep it alive with low-priority stepped motion:

- clouds drift continuously in different directions and speeds;
- water bands and elliptical ripples shift every few frames;
- one distant actor crosses every few seconds: airplane, bird, balloon, pixel sprite, or meme cutout;
- vary altitude, direction, size, and path;
- evenly distribute events instead of clustering them;
- dim background actors to roughly 35-60% during close teaching beats.

Background actors may be absurd, but they must remain behind the subject and outside the subtitle frame. Pixel characters and recognizable meme assets are optional, not mandatory. Do not add a rainbow unless requested.

When the user forbids motion effects, replace this moving lane with one static, topic-specific pattern or texture that visually bridges the Paint canvas and subtitle frame. Keep it subordinate to the teaching object and preserve clean subtitle contrast. A later request for cursor motion or one animated beat is a local exception; it does not reactivate ambient motion elsewhere.

## Sound Language

Narration is the hierarchy anchor. Useful cues include:

- match strike near first visible friction;
- fire only for the first roughly three seconds after ignition unless requested longer;
- brush texture during a painted reveal;
- metal impact at each pin landing;
- cuckoo only when the cuckoo action is actually visualized;
- mouse clicks at visible cursor depressions;
- restrained Windows confirmation sound after a successful UI action.

Trim dead air from cues before sequencing them. Audition every cue in the mixed proxy; component volume values are starting points, not evidence. A short UI click may peak above the simultaneous narration for an instant, but it must not mask a word or approach clipping. Use `scripts/verify_sfx_cues.py` for a quantitative cue check, then use listening as the final criterion.

## Ending Gag

When using the Paint cursor gag, move the cursor along a continuous cubic Bézier path by default, click the custom tool icon, move to the canvas, click again, hold on the result, then replace the canvas with the supplied image for at least one second. Drive both visible depressions and both click sounds from the same named contact cues. Extend the composition instead of crushing the action into the narration. The final subtitle may remain while the voice has ended.
