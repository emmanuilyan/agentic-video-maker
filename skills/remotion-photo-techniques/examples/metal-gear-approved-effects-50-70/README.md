# Four approved Maxor effects, 00:50–01:10

These four short effects recreate passages from [Maxor's Metal Gear Rising video](https://www.youtube.com/watch?v=41v3L0zCkNY). The user approved the final side-by-side videos on 2026-10-06 after ChatGPT's frame-by-frame review marked all four READY. Every scene is 1280×720 at 60 fps. The compositions named by technique ID contain only the Remotion scene; the `_REVIEW` compositions place the original on the left for comparison.

| ID | Name | Original interval | Approved comparison |
| --- | --- | --- | --- |
| `MG_GUITAR_ROCK_TITLE` | Гитара и цветной рок-титр | 00:50.750–00:51.900 | [GuitarRock-v9](review/GuitarRock-v9.mp4) |
| `MG_TOONTOWN_ARTICLE_COLLAGE` | Логотип и въезд статей | 00:52.967–00:54.533 | [ArticleCollage-v6](review/ArticleCollage-v6.mp4) |
| `MG_FALLING_ABOVE_40` | Падение слоёв и допись числа | 00:55.533–00:57.117 | [FallingPhoto-v5](review/FallingPhoto-v5.mp4) |
| `MG_OVAL_MEME_CAPTIONS` | Овальная вставка и встречные подписи | 01:08.967–01:09.883 | [SoftMeme-v9](review/SoftMeme-v9.mp4) |

The reviewed comparisons above are frozen. The gallery MP4s contain the same final effect components at the same frame counts, without the comparison border and labels. Posters come from those gallery MP4s. See [the recipes](effect.md) for timing, layers and adaptation notes, and [the audit screenshot](review/chatgpt-ready.png) for the final reviewer verdict.

## Run

Install dependencies in this folder with `npm install`. Render one standalone effect:

```sh
npx remotion render src/index.ts MG-GUITAR-ROCK-TITLE out/guitar-rock.mp4
npx remotion render src/index.ts MG-TOONTOWN-ARTICLE-COLLAGE out/article-collage.mp4
npx remotion render src/index.ts MG-FALLING-ABOVE-40 out/falling-photo.mp4
npx remotion render src/index.ts MG-OVAL-MEME-CAPTIONS out/oval-meme.mp4
```

The Remotion composition IDs use hyphens because Remotion does not accept underscores. Append `-REVIEW` to a composition ID to recreate its side-by-side layout. The components live in [src/Effects.tsx](src/Effects.tsx), composition settings in [src/Root.tsx](src/Root.tsx), and plates and cutouts in `public/`. Replace the source-specific plates, cutouts and typography when applying a technique elsewhere. The first 3–4 context frames use the original clip; the staged effects themselves are built from separate Remotion layers.
