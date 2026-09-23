# Remotion Photo Techniques gallery

## Goal

Bring the existing 29-effect photo-animation catalogue from the `remotion-photo-techniques` project into the `video-maker` repository so the skill and its real previews can be browsed together.

## Current state

- The source gallery is `C:\new\remotion-photo-techniques\delivery\index.html`.
- It is a self-contained static HTML page with category filters, search, looping video previews, poster images, and individual MP4 download links.
- It covers 29 named effects. The 29 MP4 previews total 84.24 MB; the 29 posters total 4.69 MB.
- Two preview archive links in the source page refer to duplicate ZIPs totaling about 121 MB. The target repository has no existing web interface or GitHub Pages configuration.
- `video-maker` does not yet contain the `remotion-photo-techniques` skill.

## Proposed structure

- Copy the portable skill bundle into `skills/remotion-photo-techniques/`.
- Add the gallery to `docs/photo-techniques/index.html`.
- Place the 29 videos in `docs/photo-techniques/previews/` and the 29 posters in `docs/photo-techniques/posters/`, preserving the filenames expected by the page.
- Keep the small skill ZIP download, but remove links to the duplicate preview ZIP archives. Individual MP4 downloads remain available from each card.
- Link the skill and gallery from the root README; add the gallery to `docs/README.md`.

The gallery remains static HTML with relative asset paths and no new runtime dependencies. It can be opened from a clone and is compatible with GitHub Pages when Pages is configured to publish the repository's `docs/` folder. This change will not alter GitHub settings or publish the site.

## Acceptance checks

1. The page lists all 29 effect IDs and preserves the existing search, category filters, looping previews, and per-effect MP4 downloads.
2. Every poster, MP4, and retained skill-download link resolves within the repository; the page has no references to the source machine or the omitted preview ZIPs.
3. The skill's relative reference files remain present after copying.
4. The gallery opens locally and its layout remains usable on mobile and desktop.
5. README links point to the gallery and the copied skill.

## Out of scope

- Enabling or deploying GitHub Pages.
- Copying the 88.78 MB all-previews ZIP or 32.45 MB 3D-previews ZIP in addition to their MP4 contents.
- Changing the existing Remotion implementations, preview videos, or skill instructions beyond links required for the copied gallery.
