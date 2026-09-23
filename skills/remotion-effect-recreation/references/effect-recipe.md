# Effect recipe format

The recipe is an implementation handoff, not a review of the source video. Adapt headings to the effect, but keep the information needed to reproduce it. Write in the user's language.

```markdown
# <Effect name>

## Source and result
- Source: <video/path/URL and analyzed time range>
- Output: <composition ID, FPS, dimensions, duration, render path>
- Implementation: <path to reusable component and demo composition>
- Fidelity: <what matches and specific remaining differences>

## Visual anatomy
<One paragraph describing the effect's visible result and the mechanism that creates it.>

| Layer, back to front | Content | Position/size in normalized canvas coordinates | Blend/mask/style |
| --- | --- | --- | --- |
| ... | ... | ... | ... |

## Timeline
Times below are relative to the effect start. Include frames at the output FPS. Describe simultaneous changes in one row when they form one beat.

| Time / frames | Visible event | Animated properties | Easing or formula |
| --- | --- | --- | --- |
| ... | ... | ... | ... |

## Reusable controls
<Props and defaults, valid ranges when useful, and what changing each prop does. Include source-specific assets separately.>

## Reconstruction
<Ordered steps another agent can implement: geometry, layers, masks, animation, compositing, audio if relevant. Include concise formulas or pseudocode for non-obvious behavior. Link to source code for exact details.>

## Evidence and uncertainty
<Reference timestamps or frames supporting key measurements. Label estimates, obscured details, and chosen substitutes.>

## Verification
<How the implementation was rendered/checked, comparison timestamps, and concrete differences that remain.>
```

Use normalized coordinates (`x/W`, `y/H`, `width/W`, `height/H`) so the recipe survives a resolution change. Specify whether dimensions refer to an element's bounding box, anchor, or center. For typography, note font family or substitute, weight, size relative to canvas, line height, tracking, and line breaks when they affect appearance. For audio-driven effects, specify cue times and whether timing is driven by audio analysis or manually chosen beats.
