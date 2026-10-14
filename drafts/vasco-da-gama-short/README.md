# Vasco da Gama Short

Vertical 1080×1920, 30 fps, 27 seconds. Eight user supplied images and the original narration. The seven joins use the `ShortformTransition` component from `remotion-photo-techniques`.

| Image | Narration starts | Time | Transition in |
|---|---|---:|---|
| 1 | «Вот представь…» | 0.00 s | — |
| 2 | «И во время путешествия…» | 3.50 s | `SWIPE_PUSH` |
| 3 | «Вдруг резко тебя выдергивает…» | 4.80 s | `ZOOM_PUNCH` |
| 4 | «И спрашивает у твоего мужа…» | 6.92 s | `SWIPE_PUSH` |
| 5 | «Он признаётся…» | 9.10 s | `COVER_SWIPE` |
| 6 | «Секут плетью…» | 11.38 s | `FLASH_BEAT` |
| 7 | «Но тебе повезло…» | 14.16 s | `ZOOM_PUNCH` |
| 8 | «Эх, Гоа…» | 25.06 s | `SPIN_BLUR` |

The supplied audio includes an additional explanation from 17.78 to 24.98 seconds. Image 7 holds and slowly reframes through that passage.

Run `npm run studio` to edit or `npm run render` to export the MP4.

Version 2 adds a camera move from the husband's reaction to Vasco's face during image 3, and word-timed captions throughout. Captions are stored as Remotion `Caption` JSON in `src/captions.json`; the spoken word is highlighted yellow.

Version 7 adds sound design. `public/mixed-audio.m4a` is the mastered narration and effects mix (-15.8 LUFS, -2.93 dBTP). `scripts/sounddesign.py` builds the deterministic ambience and timed effects in `public/sounddesign.wav`. Whoosh, whip and impact sources: https://remotion.media/whoosh.wav, https://remotion.media/whip.wav, https://remotion.media/vine-boom.wav. Sea, creaks, diffuse plaza murmur and splash are synthesized locally. Original narration is retained in `public/voice.m4a`.
