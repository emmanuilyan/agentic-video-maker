# Remotion Photo Techniques Gallery Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Add the existing 29-effect Remotion photo catalogue and the portable skill bundle to `video-maker`.

**Architecture:** Keep the catalogue as static HTML under `docs/`, with local MP4 and poster assets beside it. Copy the current portable skill bundle into `skills/`; link the page and skill from the existing documentation.

**Tech Stack:** Static HTML/CSS/JavaScript, Markdown, local MP4/JPEG/ZIP assets. No new runtime dependencies.

**Spec:** `docs/superpowers/specs/2026-09-23-remotion-photo-techniques-gallery.md`

## Global Constraints

- Preserve all 29 effect IDs from the session gallery.
- Keep all gallery asset links relative and self-contained.
- Include 29 MP4 previews (84.24 MB total) and 29 posters (4.69 MB total).
- Do not include the duplicate preview ZIP archives (88.78 MB and 32.45 MB).
- Do not change GitHub Pages settings or publish the site.
- Do not edit existing effect implementations or existing preview media.

---

### Task 1: Add the portable skill and gallery assets

**Files:**
- Create: `skills/remotion-photo-techniques/` from the currently installed skill bundle at `C:\Users\Mr. Monitoro\.codex\skills\remotion-photo-techniques/`.
- Create: `docs/photo-techniques/index.html` from `C:\new\remotion-photo-techniques\delivery\index.html`.
- Create: `docs/photo-techniques/previews/*.mp4` from `C:\new\remotion-photo-techniques\delivery\previews/`.
- Create: `docs/photo-techniques/posters/*.jpg` from `C:\new\remotion-photo-techniques\delivery\posters/`.
- Create: `docs/photo-techniques/remotion-photo-techniques-skill.zip` from the copied skill folder.

**Interfaces:**
- The HTML derives each media path from an effect ID: `previews/<ID>.mp4` and `posters/<ID>.jpg`.
- The skill archive contains the copied `remotion-photo-techniques/` directory and its `SKILL.md`, references, assets, and agent metadata.

- [x] **Step 1: Copy the skill bundle and media folders**

Copy the full source skill directory recursively, then copy the page's preview and poster directories recursively without renaming their files.

- [x] **Step 2: Place the catalogue page and its skill archive**

Copy `delivery/index.html` to `docs/photo-techniques/index.html`. Create `docs/photo-techniques/remotion-photo-techniques-skill.zip` from the copied current skill folder so the page's existing skill-download button resolves.

- [x] **Step 3: Remove only the duplicate archive links from the page**

Delete the `photo-techniques-previews.zip` and `photo-techniques-3d-previews.zip` buttons from the header. Keep the `remotion-photo-techniques-skill.zip` button and per-effect MP4 download links.

### Task 2: Link the skill and catalogue from project docs

**Files:**
- Modify: `README.md`.
- Modify: `docs/README.md`.

**Interfaces:**
- Root README links to the skill's `SKILL.md` and `docs/photo-techniques/index.html`.
- Docs index identifies the gallery as the visual catalogue for the skill.

- [x] **Step 1: Add the skill to the Remotion row in README**

Add `remotion-photo-techniques` to the Remotion skill list and make it a link to `skills/remotion-photo-techniques/SKILL.md`.

- [x] **Step 2: Add a gallery link to both indexes**

Add a direct link to `docs/photo-techniques/index.html` in the root README and a short entry in `docs/README.md`.

### Task 3: Verify the local static package

**Files:**
- Verify: `docs/photo-techniques/index.html`, all media assets, and both README indexes.

**Interfaces:**
- No external server or runtime dependency is required to resolve gallery assets.

- [x] **Step 1: Check counts and links**

Confirm that the HTML contains 29 unique effect IDs and that each ID has one corresponding MP4 and poster. Confirm the skill ZIP and documentation links exist, and that no page reference points to a source-machine path or omitted ZIP.

- [x] **Step 2: Check the change set**

Run `git diff --check` and inspect the final Git status. Leave existing `.idea/` and unrelated skill changes untouched.
