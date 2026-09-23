---
name: cringe-meme
description: Select a fitting cringe, cursed, awkward, or exaggerated reaction image from the bundled smiley pack for memes, edits, and short-form videos.
---

# Cringe Meme

Choose a smiley by the reaction the scene needs, then use the bundled image as the asset.

## Selection workflow

1. Identify the intended reaction: awkwardness, disbelief, nervousness, hysterical laughter, despair, menace, smugness, or absurdity. Also note whether the image must read instantly at small size.
2. Read [`references/catalog.tsv`](references/catalog.tsv). Its tab-separated columns are `filename`, `source title`, and `description`; each row corresponds to the same numbered tile in [`assets/contact-sheet.jpg`](assets/contact-sheet.jpg).
3. Use the contact sheet to compare plausible candidates. Inspect the individual files in [`assets/smiles/`](assets/smiles/) when crop, transparency, facial detail, or resolution matters.
4. Select the single strongest match. If the prompt is genuinely ambiguous, offer no more than three ranked options and explain the tonal difference in one line each.
5. Report the row number, title, filename, and path relative to this skill. Show the selected image inline and include it as a PNG deliverable. When the source is JPEG, create a PNG copy in the project's output folder without changing the bundled original. When the surrounding task requires an edit or render, use the original file directly or copy it into the project asset folder. The contact sheet is for choosing candidates, not a required attachment when one clear image was selected.

Prefer emotional precision and instant readability over a merely strange face. Match the production's existing visual language when one is established.

## Content cautions

- Row 13 contains a gun-to-head/self-harm image; reserve it for an explicitly suitable context.
- Rows 11 and 16 use sexualized ahegao-style expressions; avoid them for general-audience work unless the user specifically wants that tone.
- Rows 5, 10, 12, and 42 lean horror or grotesque; use them when menace is intentional rather than as a neutral cringe reaction.

The catalog metadata came with the supplied pack and can be broad. Treat the actual image as authoritative when its appearance differs from the title or description.
