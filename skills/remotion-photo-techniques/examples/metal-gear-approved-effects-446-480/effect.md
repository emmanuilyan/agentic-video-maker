# Batch 13 — утверждено пользователем 2026-10-14

Все сравнения 2560×720,60fps; слева источник, справа Remotion1280×720. Растровые слои извлечены из оригинала, механика реализована независимо.

## Парные фигуры с боковым входом
Источник446.5–448.2. Левая фигура входит f37–40, правая f39–45. Независимая прозрачность на выходе; левая исчезает кf66, правая кf67. Подложка очищена по маскам, сf65 исходный взрыв. Последнее внешнее ревью: READY v5.

## Три строки с монетой
Источник454.85–456.35. THE сразу, BITCOIN f9, FACTORY f35; круглая монета проявляется f23–46. Общий scale на переходеf68–80 вокруг(640,360), титр уходит вверх-влево, монета вниз-влево; opacity1→0. Ограничение: очищенный игровой кадр удержан доf68, затем crossfade на чистую новую сцену кf80. Движение игрового персонажа не воссоздано. Версияv7 READY. Авторские слои исчезают кf75.

## Подпись с каскадом фотоколлажа
Источник470.05–472.25. Подписьf21, расширениеf27. Левый человекf56–59; шинаf61–64; нижний рабочий fadef61–64 и подъёмf61–69; правый въезд и fadef59–62; заднийf63–72. Слои раздельные, дубли передних фото вырезаны из задних. Iris вокруг(640,360), f90–101; последний фрагментf100. Радиусыf93–99:510,450,385,305,250,170,90. Очищенный фон удерживается за фотографиями и внутри iris. Версияv10 READY. Правое фото въезжает f59–62 отx300 до0; нижняя фигура translateY f61..69=[300,260,200,140,100,60,30,10,0], fadef61–64.

## Расширяющаяся подпись по словам
Источник478–479.65. Zero f10, degree f32, vision f52. Три ступени clip-width и horizontal shift, без fade; полная яркость до смены сценыf78. Последнее внешнее ревью: READY v2.

## Reuse

Components accept `{frame:number,duration:number}`. Each overlay, transform and mask is independently animated. Replace sprites/video by their layer role and keep coordinates scaled together from1280×720. The source-specific backing footage is a demonstration plate. Background inpaint, held native footage, raster typography and the approximate contour processing are documented approximations preserved in the approved examples. See [Root](src/Root.tsx) for standalone and comparison IDs.
