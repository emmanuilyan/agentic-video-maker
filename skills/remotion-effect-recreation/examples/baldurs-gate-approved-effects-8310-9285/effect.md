# Growing captions, metallic spell title, and dialogue escalation

Approved approximate implementations; reference intervals are in README. Canvas 1280×720, 60 fps. Reusable code: [TimedTitle and Effect](src/index.tsx). Use editable SVG layers over your footage. Native gameplay explosion, magic, RGB smear and camera are not implemented as these caption techniques.

## Layers and layout

`TimedTitle({layer})`: text array, start/end pose `[frame,x,y,width,height]`, optional kind `yellow|white|pink|purple`. Coordinates are canvas pixels; divide x/width by1280 and y/height by720 for normalized values. Position/size interpolate linearly between endpoints. Layer visible inclusively start..end; absent outside. Multiple text strings share height as equal lines.

SVG viewBox1000×100, preserveAspectRatio none, textLength1000 and spacingAndGlyphs deliberately fit glyphs into the measured box. Impact yellow fill#f9ff57, magenta stroke#93005e, stroke6 SVG units. White Georgia fill#fff, black stroke#080808, stroke2. Metallic titles use Impact, offset duplicate dy5/stroke8 for depth, normal edge stroke4 and vertical gradient white→#e8e4e8→white→pink#cf4a8c/dark#692146 or purple#9381dd/dark#422466. This is a new gradient/depth construction, not the lost extracted original bevel graphic or identified exact typeface.

## Frame timeline and endpoints

| Composition | Layer | Start pose | End pose |
| --- | --- | --- | --- |
| Leaves | *leaves for the rest of the fight* | 5,365,543,547,59 | 50,250,552,778,55 |
| Detonate | *detonates entire room* | 4,405,543,466,75 | 31,311,535,650,90 |
| Necro | [performs necromancy] | 4,426,562,422,38 | 31,336,554,602,54 |
| Cast | I CAST, pink | 3,570,32,196,56 | 71,525,38,246,68 |
| Cast | MORAL AMBIGUITY, purple | 45,347,593,596,82 | 71,315,593,655,82 |
| Dialogue | keeping people as slaves / is literally illegal dude | 0,452,559,356,58 | 50,444,556,368,62 |
| Dialogue | are you a fucking stupid. / i am going to delete you | 51,433,554,389,69 | 106,412,551,447,72 |
| Dialogue | very | 110,592,566,90,38 | 133,582,562,110,46 |
| Dialogue | very badly. | 134,542,562,192,38 | 168,506,546,272,60 |

Endpoints came from previous session records; intermediate motion is an estimate using linear interpolation. Duration: Leaves55, Detonate36, Necro36, Cast77, Dialogue174 frames. Two white dialogue lines replace each other; short gaps and final yellow escalation are deliberate. No cursor or extraneous mask fragments.

## Usage

```tsx
<Effect name="Cast" background="your-footage.mp4" />
<TimedTitle layer={{text:['NEW TITLE'],start:[3,400,540,480,60],end:[30,300,530,680,80]}} />
```

Place TimedTitle over your own video inside a1280×720 canvas, or scale the whole canvas for another resolution. For other fps convert frame landmarks to seconds then back to frames. Effect demo loops73 background frames; adapt that wrapper to your media duration. Background demo crop is924×520 at178,0 scaled1280×720, from earlier77.42–78.65 footage. It is illustrative material, not the effect implementation. Local font setup is required to reproduce the approved typography.
