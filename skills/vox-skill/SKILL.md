---
name: vox-skill
description: Use when planning or producing Vox-inspired documentary explainers, or when extracting design principles from videos that analyze Vox's visual storytelling. Build an evidence-backed, evolving style guide without treating commentary as official Vox rules.
---

# Vox-inspired documentary design

Use this skill for the editorial decisions behind an explainer. For a specific on-screen effect from a reference clip, use `remotion-effect-recreation` to build and compare it; add a reusable effect to `remotion-photo-techniques` only after the user approves the rendered comparison.

## Working principles

The five principles below come from the creator's commentary in [“5 tricks from Vox”](https://www.youtube.com/shorts/r-lBhuu4sJc), not from Vox's own style documentation. Read [the source notes](references/r-lBhuu4sJc.md) when using this clip as a reference.

1. **Visualize concrete claims.** For numbers, places, events, and people, give the viewer something specific to see: a chart, map, document, labeled image, or footage. The visual should carry information rather than merely decorate the sentence.
2. **Use motion to explain relationships.** Let movement reveal a sequence, comparison, change in scale, or causal link. Choose maps, diagrams, cutouts, and typography according to the idea being explained.
3. **Keep visual progression active.** Reframe, reveal, move, or replace visual elements as the explanation advances. A stationary source can gain purposeful motion through camera moves, highlights, and changing emphasis; avoid motion that obscures the claim.
4. **Connect adjacent scenes.** Use a zoom, slide, match cut, or another motivated handoff when two images share a shape, position, direction, or subject. Preserve continuity that helps the viewer follow the argument.
5. **Coordinate story, edit, and graphics.** Graphic design alone does not make the sequence work. Match visual emphasis and timing to the narration and editorial point.

### Motion-matched hard cuts

In [Chris Moran's Short about smooth cuts](https://www.youtube.com/shorts/KtEgj5hMEUk), the creator recommends a specific handoff: animate the outgoing object with strong easing at both ends, make the incoming object follow the same position and velocity, and cut hard when the shared motion is fastest. The change of image is less conspicuous because the viewer's eye is already tracking a continuous trajectory. Treat this as the creator's demonstrated technique, not a universal Vox rule. See [source notes](references/KtEgj5hMEUk.md) for the spoken instruction and visible examples.

### Newspaper article reveals

In [StanzMedia's 4.5-second comparison](https://www.youtube.com/shorts/_HU37rX4G1U), the visible construction uses separate reveals for a date tab, serif headline lines, yellow marker bars, a rising black-and-white cutout portrait, secondary copy and a red hand-drawn pointer. Follow the article's reading order and attach irregular paper grain to the paper panel itself. This is a visual observation, not a verified spoken instruction or an official Vox rule; see [source notes](references/_HU37rX4G1U.md). Keep exact geometry and timing in the Remotion draft until the user approves an effect for the technique library.

### Carry one object from anatomy to consequence

In [Mohamed A.'s dopamine reel](https://www.youtube.com/shorts/gtxHSafv2Lk), the brain illustration first identifies a highlighted region with a label, then shrinks into the center of a happiness gauge. When a narration shifts from naming a thing to describing its effect, keep that object on screen and transform the surrounding graphic into a scale or causal diagram. The continuity helps viewers link the two claims; use color and size changes to emphasize the measured outcome. This is an inference from the visible example, not spoken design advice or an official Vox rule. See [source notes](references/gtxHSafv2Lk.md).

## Texture as a layered design decision

Chris Moran's [12-minute breakdown of Vox-inspired motion graphics](https://www.youtube.com/watch?v=sACZlG7z35Q) adds a material-aware production rule: decide what each image represents before choosing its imperfections. These are the commentator's analysis and demonstrations, not official Vox specifications. See [timestamped source notes](references/sACZlG7z35Q.md).

- **Give each source its own material cues.** A paper collage can use an off-white tint, imperfect edges, and restrained halftone or paper grain; a webpage can use subtle scanlines, pixel structure, and optical defects. Keep text and evidence legible.
- **Use optical finishing sparingly.** A mild vignette, chromatic fringe, or light leak can tie a composition together when it supports its material. Judge the combined result at delivery size; the author explicitly warns against conspicuous chromatic aberration.
- **Choose motion cadence per element.** In a 24 fps composition, 12 distinct poses per second give animated cutouts an “on twos” handmade rhythm; 8 gives a stronger collage feel. Apply stepped timing to the intended graphic motion while allowing an attention-guiding camera move to stay smooth when the reference calls for it.
- **Unify mixed footage by a shared treatment.** Archive, phone, and web clips can feel like one sequence through consistent tone, grain, edge softness, or restrained optical defects. Match the result across cuts instead of applying a fixed stack to every shot.

The examples inside this creator's Short use different kinds of wear; this is an observation about the sampled clips, not a universal Vox rule. Before adding noise, identify which physical or editorial layer it belongs to:

1. **Material surface:** paper grain, scan lines, folds, stains, or dark board scratches belong to the background object. If that object moves, its texture moves with it.
2. **Printed graphics:** chipped ink and fine paper relief also appear *inside* large letters, logos, lines, and frames. Use a subtle alpha mask on the graphic, or a shared light texture above it; a background texture alone leaves the lettering too clean. Keep distress fine enough that the words stay readable.
3. **Whole-frame finish:** sparse dust points, short scratches, and low-contrast tonal variation can sit over the complete composition. Keep this layer fixed to the screen or change it deterministically in a few phases; do not unintentionally attach it to a moving photo.

Tune these layers separately against matched source frames at full output size. A dense, high-contrast speckle mask looks like missing paint and can overwhelm the fine print wear in the reference. On the pale photo card around 0:28–0:31, the visible marks are sparse small dark points and subtle uneven paper tone across the full frame. On the dark formula board around 0:51–0:53, the scratches, light specks, question boxes, and drawn connector lines share a distressed finish. Animate the connector strokes before the final grain layer so the motion remains visible.

For reusable implementations, alpha masks can cut tiny gaps into text while blend modes add a subtle surface layer; see [MDN masking](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/mask-image) and [MDN blend modes](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/blend-mode). Adobe's [Noise & Grain guidance](https://helpx.adobe.com/after-effects/desktop/apply-effects-and-animation-presets/list-of-effects/noise-grain-effects.html) explains matching grain to the image and controlling it with blend modes and masks. [Texturelabs paper](https://texturelabs.org/textures/paper_269/) and [scratched grunge](https://texturelabs.org/textures/grunge_226/) are useful visual references. Their [terms](https://texturelabs.org/terms/) allow rendered motion graphics but restrict redistributing the texture files or bundling them into design templates; generate original reusable texture assets for a skill library.

## When extending this skill

- Record each new video as a separate source note with URL, exact intervals, observed visual behavior, the narrator's explicit advice, and any uncertainty.
- Distinguish what the commentator recommends from what is visibly present in a sampled Vox clip. Do not turn one example into a universal house rule.
- Add a general principle here only when it changes a production decision. Keep effect-specific geometry, frame timing, code, and previews in `remotion-photo-techniques` after user approval.
