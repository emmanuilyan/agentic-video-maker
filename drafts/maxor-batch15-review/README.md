# Maxor batch15 — review drafts

Source: https://www.youtube.com/watch?v=kO9HmhwGzXs
Inspected 148–190 seconds. Local source starts exactly at148.000s (matched against the previous normalized source). 1280×720,60fps.

Six independent provisional recreations. No Git commit or library entry before user approval. The latest local version is v3.

| Composition | Source interval | Frames | Mechanism |
|---|---|---|---|
|01-killed|153.316667–153.933333|37|Whole three-line white caption slides from left and holds.|
|02-green-frame|153.900–154.416667|31|Green glyphs, bright border, left-to-right clearing, zoom/smear finish.|
|03-flee|158.200–159.566667|82|Two caption entrances, darkened lower lettering, RGB grading, cut and rightward exit.|
|04-geometry|159.633333–161.466667|110|USE then GEOMETRY, yellow frame, XOR squares and red rotating insert inside a wire cube, wipe.|
|05-stealth|164.950–166.566667|97|Red two-line oblique title enters from right, drifts left and fades over a cut.|
|06-rigid|167.183333–168.883333|102|Two character cutouts, three successive red lines with vertical reflow, cyan aside, hard cut.|

Run from this directory:

```sh
node node_modules/@remotion/cli/remotion-cli.js render src/index.tsx 04-geometry out/04-geometry.mp4 --concurrency=2
```

Files ending `-comparison-v3.mp4` show original LEFT, recreation RIGHT. Files ending `-v3.mp4` are Remotion only. Contact sheets are in reference/.

## Material approximations

Gameplay is represented by cleaned stills and measured cuts/transforms, not reconstructed game motion. Glyph masks are source-specific replaceable assets; USE and RIGID captions are editable text. Meme characters are isolated source stills with approximate polygon mattes; the right face has repaired text contamination. Geometry masks, cube and border are independent SVG/CSS. The Flee color treatment is approximate. Background repair can remain visible in close inspection.

## Independent review

2026-10-09: Six source sheets uploaded to existing ordinary ChatGPT dialogue 6abab094-3d00-83eb-8668-6804762c56a6. Request returned Unknown error; retry did not generate an answer. Reload remains on "Один момент…". Existing alternate dialogue tab3 timed out twice during selection. No preparation or visual-review verdict was obtained. User asked asynchronously to open a working ordinary ChatGPT tab. Gate remains PENDING; do not call these approved/READY or save them to the library.

## Повторная проверка
ChatGPT принял №1 v4, №2 v3, №4 v4, №5 v3, №6 v4. №3 v4: усилить уход вниз-влево f72–77; исправлено в v5, но повторная отправка вернула Unknown error и повтор генерации не удался. Пользовательский апрув ожидается; Git не сохранён.

№3 v7: ChatGPT READY, проверены f72–78; тайминг выхода совпал, масштаб f75–76 остаётся примерно на 10–20% больше. Все шесть готовы к пользовательскому ревью. Диалог: https://chatgpt.com/c/6ac9f085-b13c-83ed-a34c-3220330833f1
