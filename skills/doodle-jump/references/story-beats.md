# Story beats and photo climbs

Use this layer when narration needs real photos, diagrams or story objects that appear during an otherwise steady climb. Mechanical landings and semantic beats are separate clocks: `landings.json` keeps a fixed jump cadence; `beats.json` follows the spoken meaning.

## Data

Register reusable media in `src/data/story-assets.json`:

```json
{
  "ship-1870": {
    "src": "story/ship-1870.jpg",
    "objectPosition": "52% 44%",
    "credit": "Source and rights summary; full provenance in SOURCES.md"
  }
}
```

Add ordered windows to `src/data/beats.json`:

```json
[
  {
    "id": "shipping-company",
    "startFrame": 120,
    "endFrame": 205,
    "asset": "ship-1870",
    "title": "Судоходная компания",
    "date": "1870-е",
    "worldX": 540,
    "worldY": 945,
    "width": 520,
    "landingId": "step-7"
  }
]
```

`landingId` is optional. Add it only when the story deserves a contact accent; the timeline then suppresses routine SFX on filler contacts. Keep frames in increasing order and inside the composition. Set `requireUniqueAdjacentStoryAssets` in `video.json` when every successive reveal must use a different image.

## Composition rules

- Put the image in world space so the hero can reach it and the camera can carry it away. Keep captions in screen space.
- Keep authored labels outside the photograph by default. Short date/title copy may sit below the card; omit it when captions already carry the fact.
- Use one main explanatory image at a time. Make the next asset visible as the previous one exits instead of stacking unreadable cards.
- Choose crops that preserve the subject at phone size. Store crop changes as metadata, not destructive edits to the source.
- A new background colour is not a new story beat. Change era skins only when narration changes period or setting, and snap the cue to a landing.

## Review

Run `npm run check` to catch missing/undecodable images, invalid ranges, unknown landing IDs and unintended adjacent repeats. Run `npm run qa` for exact story boundaries, then `npm run proxy && npm run review`. Inspect whether each photo is new, readable before it scrolls away, visually fits the supplied story beat, and is free of added text that competes with captions. Do not turn visual fit into unsolicited fact-checking of a supplied script.
