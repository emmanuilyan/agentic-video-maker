# Baldur's Gate effects: 17.10–33.75 s

Four approved standalone Remotion recreations from the video essay. Each composition is 1280×720 at 60 fps and uses generated fantasy artwork instead of source footage.

| Composition | Reference time | Recipe |
| --- | --- | --- |
| `ElectricThreat` | 17.10–18.23 s | [Electric Threat Card](effects/electric-threat.md) |
| `DndExperience` | 19.65–21.15 s | [D&D Experience Lower Third](effects/dnd-experience.md) |
| `BloodSpicy` | 25.55–26.65 s | [My Blood Is / Spicy Impact Title](effects/blood-spicy.md) |
| `MemeBands` | 30.75–33.75 s | [Two-Beat Game Meme Bands](effects/meme-bands.md) |

## Run

```bash
npm install
npm run lint
npx remotion render src/index.ts ElectricThreat out/electric-threat.mp4
```

Replace the procedural backdrops and vector characters with footage or prepared artwork for a production edit. The effect timing and title animation are frame-driven and deterministic.
