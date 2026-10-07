# Approved Maxor effects, 80–84 seconds

Approved by the user on 2026-10-07. Exact approved preview versions: comic v8, wipe v2, slit v4. Source: https://www.youtube.com/watch?v=kO9HmhwGzXs . Canvas 1280×720, 60fps.

## MAXOR_COMIC_PRESENTATION
Tags: presentation, comic, presenter, diagonal exit. Source80.00–81.55s,93frames. Comic enters f4–12; zoom f18–31; presentation chrome f32–37; presenter f42–47. Final diagonal upper boundary x=0/76/228/380 at f89/90/91/92, bottom=upper−440. Keep UI, presenter and artwork separate.

## MAXOR_DIAGONAL_HAND_WIPE
Tags: diagonal wipe, green edge, video transition. Source81.45–83.45s,120frames. During f0–15, t=clamped linear progress, x=1500t−450. Mask upper boundary x+440 and lower x−90. Border moves with mask. Native footage is a backing layer, not a recreated author effect.

## MAXOR_VERTICAL_CHAPEL_SLIT
Tags: vertical slit, center reveal, desaturation. Source83.35–84.45s,66frames. Green→gray f0–7, brightness/desaturation f8–23. Slit centered x640 is4px wide until f13, then grows14→500px by f62. Keep gray base and chapel reveal separate.

## Adaptation and review
Replace source-specific stills, presenter and backing video in public/. UI labels are approximated; static base frames do not reproduce native gameplay motion. Timelines and layer order reproduce the approved montage. Source code is in src/Effects.tsx and registrations in src/Root.tsx. Each gallery card uses the exact approved Remotion-only MP4; poster comes from that same file. Original/comparison files are excluded from gallery previews.
