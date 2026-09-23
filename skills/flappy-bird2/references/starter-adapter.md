# Повторное использование flappy-bird

**flappy-bird2 — инструкция производства, не уже обновлённый движок.** Собственный renderer/controller в него не включён. Можно использовать установленную рядом заготовку (пути относительно корня flappy-bird2):

    ../flappy-bird/assets/remotion-starter/
    ../flappy-bird/scripts/init_project.py
    ../flappy-bird/scripts/validate_manifest.py
    ../flappy-bird/scripts/validate_assets.py
    ../flappy-bird/scripts/qc_render.py

Проверить наличие, вызвать scripts с --help. init_project.py принимает новый путь назначения. Копировать в отдельный проект; не редактировать исходный flappy-bird и не копировать node_modules, старые outputs, .codegraph. Если заготовки нет, построить минимальную базу по gameplay-контракту: это необязательная зависимость.

Перед чтением/правкой соблюдать CodeGraph-правила AGENTS.md. Индексировать конкретный проект. Прямое чтение — при ошибке или недостаточном контексте графа.

## Проверенные особенности

Наблюдались 2026-09-15; перед адаптацией проверить актуальный код.

| Место | Уже есть | Требуется для flappy-bird2 |
|---|---|---|
| src/engine/physics.ts | фиксированная физика | одна step для live, replay, compile |
| src/engine/compileSimulation.ts | flapFrames, геометрия spawn | inputs, provenance, replay hash, последствия удара |
| src/engine/controller.ts | seeded cadence, ближайшие ворота | ограниченное наблюдение, память/реакция, без скрытого будущего |
| src/render/FlappyVideo.tsx | lookup абсолютного кадра | сохранить схему; три skin tracks |
| src/contracts.ts | один theme, wide/narrow levelProfile | независимые tracks в edit и адаптер render-схемы |

chooseControl получает весь запланированный массив препятствий. Разброс cadence и sinusoidal target drift не являются готовой моделью человека. compileSimulation ставит collision в каждом кадре, но сам не прекращает движение/зачёт. Исправить эти места **в копии проекта до приёмки базы**.

Симуляция заготовки работает на 30 Hz; frame 0 содержит состояние после первого step. Не смешивать с state[0]=initial: сохранить документированный legacy offset во всём проекте либо мигрировать данные, отображение и тесты вместе. Не объявлять 60 Hz при жёстких формулах на 30.

Строки schema flappy-bird/v1, simulation-v1 и physics flappy-v1 не переименовывать только из-за названия скилла. Дополнительные метаданные хранить отдельно. Изменение формата требует обновить потребителей/валидаторы.

Для уже сохранённого legacy replay оставить оригинал и записать adapterVersion. При одинаковом шаге initial можно добавить перед old[0], тогда new[k+1]=old[k]; для сохранения прежних кадров нужен явный offset выборки +1 tick. Исходный initial брать из старой конфигурации/engine, не угадывать по первому состоянию. Сравнить отображаемые состояния и события до/после, включая последний кадр. Без достоверных inputs/initial сохранить legacy-путь; не называть реконструкцию проверенным replay.

## Три дорожки при одном theme

Компилировать комбинации без копирования bitmap:

    hero=bird, level=forest, environment=day    → bird__forest__day
    hero=car,  level=forest, environment=day    → car__forest__day
    hero=car,  level=factory, environment=night → car__factory__night

Границы — объединение границ трёх дорожек. Презентация не меняет levelProfile: это отдельное изменение будущего layout. Стиль каждой caption cue хранить отдельно, чтобы тема не перекрашивала начатую реплику.

Для live-play добавить страницу записи с тем же engine. Получить inputs/config, пересчитать офлайн и сравнить состояния. Remotion preview не доказывает управляемость живыми нажатиями.

## Проверки после адаптации

В новом проекте прочитать package.json и использовать фактические команды. В проверенной заготовке есть npm test, npm run build:data, npm run studio, npm run render. После смены схем проверить validators; старый PASS не покрывает новые правила.

Минимум: replay-equivalence, отсутствие реакции до наблюдения, life/death, score-once, skin-invariance, неизменность активной геометрии, frame/tick mapping. Сохранить версии и пройти [QC](qc.md). Не выдавать тесты старого starter за проверку ещё не реализованных возможностей.
