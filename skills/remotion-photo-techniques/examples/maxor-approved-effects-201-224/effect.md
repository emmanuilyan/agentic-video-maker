# Six approved Maxor effects,201–224seconds

Source https://www.youtube.com/watch?v=kO9HmhwGzXs. Independent Remotion layers in src/Effects.tsx, registered in src/Root.tsx;1280×72060fps. User approved all six final comparisons on2026-10-26 after independent ChatGPT READY. Approval metadata and preview provenance are in approved-manifest.json. Original-left/Remotion-right comparisons were shown to the user before approval.

## Implementation and limits

P positions PNG plates/cutouts. v is clamped linear frame interpolation. Fonts resolves local font assets. No original source video is embedded in the Remotion output. Native footage, fire, particles, meme artwork and eye RGB treatment are held source-derived raster plates; this does not reconstruct their native motion. Background repair and alpha mattes approximate the reference. Source font artwork for Faces is isolated into transparent word images, with independent timing. Replace the plates/word masks and preserve the frame choreography for reuse; run `npm run fonts` to prepare local macOS fonts before rendering (or set MAXOR_FONT_DIR). Font binaries are not included.

1. **Amazon card reveal / color hit**,201.4–204.45. Posterized silhouette+lower-right Home Depot card; two-line white/red serif title enters from below; gameplay plate crossfade; blue card slides from left, composition switches early, bow/logo variant replaces the card during red-white hit; hard cut at exit. Separate card,title,background layers.
2. **DIE THE LEAST**,206.35–207.9. Three red words with black extrusion enter separately (left,bottom,right); large DIE above THE/LEAST; diagonal scene wipe with all caption layers removed by f86. Background is a held clean pre-caption frame.
3. **Portrait gift card**,209.5–211.6. Wide portrait zooms; close portrait crossfades f33–51; card appears and rotates at f73+; THE GIFT CARD caption reveals horizontally; all layers cut away atf118. Card is perspective-rectified source artwork, rotation independently animated.
4. **Faces of Evil**,212–214.2. Two cartoon mattes gradually overlay knight; separate THE,FACES,OF,EVIL masks enter in order; EVIL reaches its lower-row position byf85; hall replaces background while overlay group fades. Source artwork/raster word masks approximate blending and edges.
5. **Fallen face / eye / cosmic CANON**,218.25–221.65. Diagonal wipe red scene→fallen face; eye RGB plate startsf21, opaque by27; hardcut to cosmic scene at54; THIS IS CANON reveals at150+, art drops from above at163+; final cut at201. Native eye treatment inherited from source, not a newly implemented chromatic-aberration filter.
6. **WAIT / WTF double exposure**,221.65–224.55. Small wait becomes larger wtf; held gameplay zooms; blue scene linearly overlays from f24 toward full visibility at121; caption dissolves separately. Updated text baselines follow pixel measurements of white glyphs in source; no native character motion recreated.

Review: preparation decoded1260frames. Initial gate accepted6v2 and requested five timing fixes. Corrections recorded in reference/chatgpt-review.md; final targeted recheck passed all six (1v9,2v7,3v8,4v8,5v5,6v5). User approved the precise final renders; see approved-manifest.json for provenance.

## Render and exact previews

Install the pinned dependencies, run `npm run fonts`, then `npx remotion render src/index.tsx EFFECT_ID out/effect.mp4`. Components are registered under final IDs. Gallery previews are byte-identical copies of the approved MP4s, not new renders; posters were extracted from those files.

- `MAXOR_AMAZON_DIFFERENCE_CARD`: component `Amazon`; tags gift card, difference, color hit, maxor. [Approved v9](../../assets/previews/MAXOR_AMAZON_DIFFERENCE_CARD-reference.mp4).
- `MAXOR_DIE_THE_LEAST`: component `Die`; tags staged caption, extrusion, diagonal wipe, maxor. [Approved v7](../../assets/previews/MAXOR_DIE_THE_LEAST-reference.mp4).
- `MAXOR_PORTRAIT_GIFT_CARD`: component `Gift`; tags portrait, dissolve, card rotation, maxor. [Approved v8](../../assets/previews/MAXOR_PORTRAIT_GIFT_CARD-reference.mp4).
- `MAXOR_FACES_OF_EVIL`: component `Faces`; tags meme collage, staged words, raster typography, maxor. [Approved v8](../../assets/previews/MAXOR_FACES_OF_EVIL-reference.mp4).
- `MAXOR_EYE_COSMIC_CANON`: component `Canon`; tags eye insert, montage, image drop, maxor. [Approved v5](../../assets/previews/MAXOR_EYE_COSMIC_CANON-reference.mp4).
- `MAXOR_WAIT_WTF_DOUBLE_EXPOSURE`: component `Wtf`; tags caption swap, double exposure, zoom, maxor. [Approved v5](../../assets/previews/MAXOR_WAIT_WTF_DOUBLE_EXPOSURE-reference.mp4).
