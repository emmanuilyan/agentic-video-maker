# Script-To-Asset Research

Use this workflow when the user provides a script and expects the agent to find and download visual material. Ask ordinary ChatGPT in the browser for candidate images/photos, source pages, and a compact visual plan; use this reference to select, download, and verify the files locally. The result is a small, traceable asset library ready for cutout and Remotion work, not a list of links. If the user supplied finished audio and script, treat their claims as approved and explicitly tell ChatGPT not to fact-check them unless asked.

## Inputs And Outputs

Inputs:

- approved script text and, when available, timed narration or captions;
- user-provided reference images;
- requested visual style and explicit exclusions;
- current project's asset directory and existing sources manifest.

Outputs:

```text
public/assets/research/
  originals/
    images/
    video/
  candidates/
  manifest.json
  SOURCES.md
research/visual-coverage.md
```

Use ASCII kebab-case filenames. Keep originals unchanged; prepared cutouts, crops, frame sequences, and compressed proxies belong outside `originals/`.

## 1. Convert The Script Into A Visual Coverage Table

Split the script by spoken clause, not only by sentence. For each clause, extract:

- concrete subject or object;
- action or state change;
- mechanism that must be understood;
- period, location, or cultural context;
- optional metaphor, reaction, or background gag;
- whether existing project assets already cover the need.

Write `research/visual-coverage.md`:

| Beat | Script phrase | Required visual | Asset type | Priority | Existing asset | Search status |
|---:|---|---|---|---|---|---|
| 01 | exact short quote | hero object, front view | image cutout | A | none | queued |
| 02 | exact short quote | hand performing action | image or 2-5 s clip | A | none | queued |
| 03 | exact short quote | ambient background actor | pixel image | C | existing | covered |

Priority `A` explains the story, `B` improves the explanation, and `C` adds background life. Finish all `A` rows before researching decorative material.

One asset may cover several adjacent phrases. Do not force a new image for every sentence.

## 2. Prepare The Browser ChatGPT Brief

Give ChatGPT the visual coverage table, style, source constraints, and useful query variants in both the script language and English. Ask for a short candidate list with source-page and direct-media links when available, plus which phrase each candidate illustrates. Do not ask it to audit the story's truth unless the user explicitly requested that. If ordinary ChatGPT cannot be used reliably, prepare one ready-to-send brief for the user rather than silently switching to another research route.

For photographic cutouts:

```text
{object} isolated white background high resolution
{object} front view transparent png
рука держит {object} фото на белом фоне
{action} close up hands photo
```

For historical or educational subjects:

```text
{object} museum collection photograph
{object} historical illustration archive
{mechanism} diagram public domain
{object} vintage catalog scan
```

For collage and pixel background actors:

```text
{character} pixel sprite transparent
{object} 8 bit png sprite
{character} paper collage cutout
stop motion {object} reference
```

For video:

```text
{action} close up stock footage
{object} moving isolated background video
{action} archival footage
{object} turntable video
```

Add angle, pose, direction, and background requirements when composition matters. Search for the real object first; `stop motion {object}` is a useful variant but often returns finished edits that are harder to reuse.

## 3. Inspect And Shortlist

Inspect ChatGPT's candidate links and open each selected source page before downloading. Use direct search only to verify or replace a broken/unsuitable candidate, not to repeat the same broad research. Prefer stable original files from museums, archives, Wikimedia Commons, creator pages, or direct media hosts over thumbnails copied by aggregators.

For each required visual:

1. inspect enough results to understand the available angles and quality;
2. shortlist no more than three candidates;
3. choose the candidate that best fits the scene, not simply the largest file;
4. record the source page and direct media URL before downloading;
5. stop searching when one strong candidate satisfies an ordinary asset need.

Score candidates on:

- semantic match to the spoken phrase;
- useful angle and uncropped silhouette;
- resolution and focus;
- ease of background removal;
- consistency with the collage or pixel treatment;
- absence of baked-in labels, watermarks, and unrelated objects;
- enough visual room for the intended movement.

Use user-provided media ahead of web candidates when it satisfies the beat.

## 4. Record The Manifest

Create `public/assets/research/manifest.json` as an array. Keep one entry per downloaded original:

```json
[
  {
    "id": "hand-holding-stopwatch-01",
    "beatIds": [2, 3],
    "kind": "image",
    "query": "hand holding stopwatch isolated photo",
    "sourcePage": "https://example.org/item/123",
    "downloadUrl": "https://example.org/media/123.jpg",
    "localPath": "public/assets/research/originals/images/hand-holding-stopwatch-01.jpg",
    "selected": true,
    "notes": "Good wrist silhouette; remove white background"
  }
]
```

Also maintain a concise human-readable `SOURCES.md` with local filename, source-page link, and intended beat. This is for reproducibility and later retrieval, not a rights review.

This workflow is specifically for a private educational project. Do not research licenses or copyright status, do not filter candidates by reuse rights, and do not pause to request rights confirmation. Select on visual and technical fitness. Never bypass authentication, paywalls, access controls, or technical download restrictions.

## 5. Download Selected Originals

Download direct image, audio, or video URLs with the helper so HTML error pages are not silently stored as media:

```bash
python3 "$HOME/.codex/skills/paint95-video-maker/scripts/download_asset.py" \
  "DIRECT_MEDIA_URL" \
  "public/assets/research/originals/images/object-01.jpg" \
  --source-page "SOURCE_PAGE_URL" \
  --query "SEARCH QUERY" \
  --scene "beat-03" \
  --manifest "public/assets/research/downloads.json"
```

The helper follows redirects, retries transient failures, rejects HTML responses, downloads through a temporary `.part` file, computes SHA-256, and updates a machine-readable download manifest. Use `--referer` only when the media host expects the public source page as a referer. Use `--overwrite` only after confirming that replacement is intended.

If a page does not expose a direct file URL:

- inspect its `og:image`, `og:video`, download link, or documented API;
- use an available browser or purpose-built downloader when permitted;
- if the source remains inaccessible, choose the next candidate rather than attempting a bypass.

Do not download full long videos when a short public clip or still image covers the beat. For a permitted long source, keep the original once and derive a short local working segment with FFmpeg.

## 6. Validate Downloads

Run the media inventory on the research folder:

```bash
python3 "$HOME/.codex/skills/paint95-video-maker/scripts/media_inventory.py" \
  public/assets/research --json > research/media-inventory.json
```

Check:

- file opens and its MIME type matches its extension;
- image dimensions are sufficient for the planned crop;
- video has decodable frames, useful action, and no unexpected audio requirement;
- the selected subject is not clipped at a critical edge;
- duplicates are removed using SHA-256 from the download manifest;
- every downloaded file maps to at least one coverage-table beat.

Extract a contact sheet for video candidates instead of watching every file end to end:

```bash
ffmpeg -i input.mp4 -vf "fps=1/2,scale=320:-1,tile=4x3" -frames:v 1 contact-sheet.jpg
```

For stop-motion treatment, derive a frame sequence from the selected local clip only after selection:

```bash
ffmpeg -ss 00:00:02 -t 4 -i input.mp4 -vf "fps=6,scale=720:-2" \
  prepared/action-%03d.png
```

## 7. Hand Off To Production

Update `visual-coverage.md` so every priority `A` row is `covered`. For each selected asset, note the next operation: cutout, crop, pixelate, halftone, frame extraction, or direct use.

Research is complete when:

- every essential phrase has a feasible visual treatment;
- selected originals are downloaded and readable;
- filenames and folders are stable;
- source page and direct URL are recorded for reproducibility, without a license review;
- no implementation depends on a thumbnail URL or an unverified remote resource;
- the editor can build the timeline without reopening search.
