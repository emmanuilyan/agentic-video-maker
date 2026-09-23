# Scoped revisions

Preserve known-good video outputs and change only the requested concern. Begin with:

```bash
npm run revision -- "faster steady jumps"
```

The helper increments `project-spec.json.revision`, assigns new proxy/final paths and writes a `change-set.json` stub. Existing files listed in the prior output paths are recorded under `preservedOutputs`; the helper does not delete or move them.

For a global pace change, edit `jumpCadenceFrames` and related route geometry in `video.json`, then run `npm run route`. The route helper rebuilds uniform contacts and remaps beat/contact links plus era cues to their nearest valid contacts; inspect those mappings before rendering.

Fill `affectedBeats` with IDs from `beats.json` and split the request into concrete `requestedChanges`. Keep unrelated timing, crops, skin anchors and audio untouched. If the request changes a global invariant such as jump cadence, rebuild the complete mechanical route at one interval and leave semantic beat frames intact unless their visible relationship actually breaks.

Use the smallest adequate validation loop:

1. Run `npm run check` after data or engine changes.
2. Run `npm run qa` for affected contacts, story boundaries and era cues.
3. Render `npm run proxy`, then run `npm run review`; compare its evidence with the prior known-good version.
4. Listen to narration and narrative contact accents after audio changes.
5. Set `timingStatus: reviewed` only after measured caption/beat alignment is reviewed; render and verify the new final without overwriting the earlier one.

When complete, set the revision status in `change-set.json` and `project-spec.json` to `verified`. Keep only the latest decisions in the active data files; preserved outputs provide comparison history, not an alternate source of truth.
