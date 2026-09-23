# Remotion implementation patterns

## Project responsibilities

Keep the central timeline as JSON or TypeScript so visuals and generated sound use the same events. Centralize display copy and asset paths. A compact implementation normally needs a shell, document renderer, document-state evaluator, cursor track and sound layer; split further only when useful.

Represent document state with stable layer IDs, visibility, order, transform and selection. Evaluate it deterministically from the frame. A frame requested out of order must render identically: use `useCurrentFrame()` and pure functions, not timers, CSS animations or effect-driven state transitions.

Render the palette from the same layers as the canvas. An undo action selects or reconstructs an earlier state rather than visually approximating it with unrelated offsets.

## Coordinates and contact

Keep layer geometry in document coordinates. For viewport origin `(vx, vy)`, pan `(px, py)` and zoom `z`, convert a point with `sx = vx + (x + px) * z`, `sy = vy + (y + py) * z`. Apply rotation around the same pivot as the layer before this conversion.

For a corner drag with a fixed opposite corner `(ax, ay)`, compute dragged width and height from one progress value. Derive center and handle from that rectangle. The cursor hot spot must equal the active handle through the drag interval; its decorative glyph may extend beyond that point. Never ease the cursor and handle independently.

Use cubic Bézier paths for travel between controls. Explicitly hold at contacts, mouse-down and release. If a pressed cursor shrinks, set the transform origin at its hot spot so the contact point does not shift.

## Selections and masks

For marching ants, draw a contrasting solid outline and a dashed outline sharing the same fitted SVG path. Animate `strokeDashoffset` from the frame. Keep both inside the same layer transform.

Build brush and eraser masks from the actual tool path, stroke width and progressive path length. Derive the tool tip from that path's progress. Use one stable coordinate system for masked media; clip duplicated strips with compensated offsets if a multistrip reveal is needed.

Free Transform has eight handles and a shared transformed bounding box. A lasso contour and transform rectangle are separate states. Commit clears temporary bounds and shortcut badges.

## Typography and sound

Type by Unicode code points or graphemes, not raw UTF-16 slices when the copy includes emoji or combined characters. Keep the line box stable. Derive keyboard ticks from character-reveal frames; a line break need not create a visible glyph.

Schedule audio from the central contacts or render one deterministic PCM mix from them. When mixing, use short attack/release envelopes, headroom, and a cue report; measure the encoded proxy as well as source audio. Store the sound recipe when generating original SFX.

## Render checks

Inspect contact−1, contact, contact+1 for state changes; inspect start/middle/end for drags. Check that layer labels, eyes, selected tools and document results agree. For a five-second 24 fps composition verify 120 frames and a deliberate frame 119. Use the installed Remotion version's actual APIs and keep package versions aligned.

CLI reference: [render](https://www.remotion.dev/docs/cli/render), [still](https://www.remotion.dev/docs/cli/still). Browser executable configuration belongs to the runtime environment, not a hard-coded path required by the skill.
