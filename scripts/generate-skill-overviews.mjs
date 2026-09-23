import {existsSync, mkdirSync, readFileSync, writeFileSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const skills = [
  {id:'comics-shorts', title:'Comics Shorts', category:'Формат Shorts', summary:'Фотографические сцены, комиксные реплики и движение камеры по истории.', when:'Нужен короткий рассказ в виде последовательности реалистичных кадров с комиксными облачками.', input:'Аудио или сценарий, герои и визуальные ограничения.', result:'Проверенный пакет кадров для ревью, затем смонтированный вертикальный ролик.', steps:['Разбить рассказ на сцены','Подготовить фото и реплики','Показать кадры на ревью'], color:'#ffb454'},
  {id:'cringe-meme', title:'Cringe Meme', category:'Вспомогательный', summary:'Подбор подходящей кринжовой или неловкой реакции из локальной коллекции смайликов.', when:'Нужна реакционная картинка для мема, монтажа или короткого видео.', input:'Сцена, эмоция или желаемый тип реакции.', result:'Выбранный файл смайлика с названием и путём.', steps:['Описать нужную реакцию','Найти кандидатов в каталоге','Выбрать и показать смайлик'], color:'#ff6b81'},
  {id:'doodle-jump', title:'Doodle Jump', category:'Формат Shorts', summary:'Рассказанный Short как подъём героя по платформам через единый движущийся мир.', when:'История подходит для последовательного подъёма, открытий и препятствий.', input:'Озвучка, сценарий, герой и визуальные материалы.', result:'Редактируемый Remotion-проект, MP4 и кадры для QA.', steps:['Разметить фразы и события','Собрать героя, мир и платформы','Проверить маршрут и рендер'], color:'#71d6a4'},
  {id:'paint-full-shorts', title:'Paint Full Shorts', category:'Формат Shorts', summary:'Ретро-редактор становится сценой: курсор, слои и инструменты рассказывают историю.', when:'Смысл ролика можно раскрыть через видимые операции редактирования.', input:'Идея или озвучка, изображения и желаемая операция.', result:'Редактируемый Short с понятной последовательностью действий.', steps:['Выбрать действие редактора','Показать инструмент и изменение','Проверить читаемость результата'], color:'#70a7ff'},
  {id:'paint95-video-maker', title:'Paint95 Video Maker', category:'Формат Shorts', summary:'Образовательный коллаж в окне Windows 95 Paint с покадровым движением и озвучкой.', when:'Нужен ролик в установленной визуальной стилистике Paint95.', input:'Сценарий или готовое аудио, источники и стиль.', result:'Проверенный MP4, проект, субтитры и контакт-лист.', steps:['Сопоставить речь и визуальные beats','Собрать Paint95-коллаж','Проверить proxy и финал'], color:'#53c8d0'},
  {id:'remotion-best-practices', title:'Remotion Best Practices', category:'Навигационный скилл', summary:'Маршрутизатор по узким скиллам и справочникам Remotion.', when:'Нужно начать задачу в Remotion и выбрать подходящую инструкцию.', input:'Краткое описание видео-задачи.', result:'Нужный узкий скилл и только относящиеся к задаче рекомендации.', steps:['Определить тип задачи','Подключить профильный скилл','Следовать его проверкам'], color:'#a893ff'},
  {id:'remotion-captions', title:'Remotion Captions', category:'Remotion', summary:'Транскрипция, структура captions и анимированное отображение субтитров.', when:'Нужно получить, импортировать или стилизовать подписи для видео.', input:'Аудио/видео или готовый текст и тайминги.', result:'Синхронизированные данные captions и отображение в композиции.', steps:['Получить текст и таймкоды','Подготовить caption JSON','Проверить стиль и синхрон'], color:'#ffc85a'},
  {id:'remotion-create', title:'Remotion Create', category:'Remotion', summary:'Стартовая сборка новой Remotion-композиции и её базовой структуры.', when:'Создаётся новый Remotion-проект или композиция.', input:'Задача видео, формат, медиа и окружение проекта.', result:'Рабочий проект с композицией и доступным preview.', steps:['Проверить проект и задачу','Создать композицию','Открыть preview'], color:'#60d3c1'},
  {id:'remotion-docs', title:'Remotion Docs', category:'Remotion', summary:'Поиск актуальной документации Remotion для конкретного технического вопроса.', when:'Нужно проверить API, ограничения или рекомендуемый способ использования.', input:'Вопрос по Remotion или конкретный компонент/API.', result:'Краткий ответ с опорой на официальные страницы документации.', steps:['Сформулировать API-вопрос','Найти первичную документацию','Применить ответ к задаче'], color:'#6da6ff'},
  {id:'remotion-interactivity', title:'Remotion Interactivity', category:'Remotion', summary:'Структура Remotion-композиции, которую можно исследовать и менять через Studio.', when:'Нужно управлять параметрами, слоями или состояниями из Studio.', input:'Композиция и параметры, которые пользователь должен менять.', result:'Интерактивный preview с читаемыми controls.', steps:['Выделить параметры','Связать их с props','Проверить controls в Studio'], color:'#ee8bff'},
  {id:'remotion-maps', title:'Remotion Maps', category:'Remotion', summary:'Картографические сцены и анимация маршрутов, слоёв и геоданных.', when:'Видео включает карту, географический маршрут или пролёт.', input:'Место, геоданные, стиль карты и движение камеры.', result:'Стабильная картографическая композиция для рендера.', steps:['Подготовить геоданные','Собрать карту и слои','Анимировать маршрут'], color:'#69c6ff'},
  {id:'remotion-markup', title:'Remotion Markup', category:'Remotion', summary:'Сборка сцен из React/HTML/SVG, эффектов, текста, переходов и звука.', when:'Нужно реализовать визуальную сцену или отдельный motion-элемент.', input:'Storyboard, композиция, copy и доступные ассеты.', result:'Синхронизированная визуальная сцена в Remotion.', steps:['Разложить сцену на слои','Задать frame-based движение','Проверить кадры и звук'], color:'#fb8f67'},
  {id:'remotion-multimedia', title:'Remotion Multimedia', category:'Remotion', summary:'Чтение аудио- и видеофайлов через Mediabunny и извлечение их свойств.', when:'Нужно проверить длительность, размеры или медиа-данные в браузерном проекте.', input:'Аудио/видео и задача обработки.', result:'Доступные медиа-метаданные или поток для композиции.', steps:['Открыть media source','Прочитать нужные свойства','Подать данные в композицию'], color:'#80d8ad'},
  {id:'remotion-render', title:'Remotion Render', category:'Remotion', summary:'Экспорт Remotion-композиции с контролем параметров и итогового файла.', when:'Нужно отрендерить видео или отдельный кадр.', input:'Проект, composition ID, формат и параметры экспорта.', result:'Проверенный видеофайл или still.', steps:['Проверить композицию','Настроить render','Проверить итоговый файл'], color:'#ff7474'},
  {id:'remotion-saas', title:'Remotion SaaS', category:'Remotion', summary:'Встраивание Remotion Player и рендеринга в пользовательское приложение.', when:'Строится продукт с видео-preview, параметрами и/или генерацией роликов.', input:'Приложение, UI и сценарий взаимодействия с видео.', result:'Player или render flow внутри приложения.', steps:['Спроектировать интерфейс','Подключить Player/render','Проверить пользовательский поток'], color:'#71a4ff'},
  {id:'remotion-studio', title:'Remotion Studio', category:'Remotion', summary:'Запуск и просмотр композиции в Remotion Studio для визуальной проверки.', when:'Нужно открыть preview и проверить сцену по таймлайну.', input:'Remotion-проект и конкретная композиция.', result:'Рабочий preview и просмотренные кадры/тайминг.', steps:['Запустить Studio','Найти композицию и beat','Проверить кадры и движение'], color:'#ffb454'},
  {id:'remotion-upgrade', title:'Remotion Upgrade', category:'Remotion', summary:'Обновление Remotion и зависимостей с проверкой совместимости проекта.', when:'Нужно перейти на новую версию Remotion или исправить несовместимости.', input:'Текущая версия, целевая версия и проект.', result:'Обновлённые зависимости и проверенная сборка.', steps:['Определить версии','Применить migration notes','Запустить проверки и preview'], color:'#d69bff'},
  {id:'watch', title:'Watch', category:'Вспомогательный', summary:'Разбор видео по транскрипту и выборочным кадрам из URL или локального файла.', when:'Нужно ответить на вопрос о содержании ролика.', input:'URL/файл видео и вопрос пользователя.', result:'Краткий ответ с опорой на речь и выбранные кадры.', steps:['Получить видео и транскрипт','Извлечь ключевые кадры','Ответить по наблюдениям'], color:'#63c9e8'},
];

const xml = (value) => value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const wrapWords = (value, limit = 27) => {
  const lines = [];
  let line = '';
  for (const word of value.split(/\s+/)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length > limit && line) {
      lines.push(line);
      line = word;
    } else {
      line = next;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 2);
};

function makeSvg(skill) {
  const nodes = skill.steps.map((label, index) => {
    const x = 44 + index * 384;
    const lines = wrapWords(label);
    return `<g><rect x="${x}" y="178" width="330" height="142" rx="18" fill="#172238" stroke="#334563"/><circle cx="${x + 32}" cy="210" r="17" fill="${skill.color}"/><text x="${x + 32}" y="216" text-anchor="middle" class="num">${index + 1}</text><text x="${x + 60}" y="216" class="eyebrow">ШАГ ${index + 1}</text><text x="${x + 24}" y="260" class="node">${lines.map((line, lineIndex) => `<tspan x="${x + 24}" dy="${lineIndex ? 28 : 0}">${xml(line)}</tspan>`).join('')}</text></g>${index < 2 ? `<path d="M ${x + 338} 249 H ${x + 374}" stroke="${skill.color}" stroke-width="3" marker-end="url(#arrow)"/>` : ''}`;
  }).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="390" viewBox="0 0 1200 390" role="img" aria-labelledby="title desc"><title id="title">${xml(skill.title)} — схема работы</title><desc id="desc">${xml(skill.summary)}</desc><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="${skill.color}"/></marker></defs><rect width="1200" height="390" rx="26" fill="#0b1020"/><rect x="26" y="26" width="1148" height="338" rx="22" fill="#101a2d" stroke="#243450"/><text x="54" y="76" class="tag">${xml(skill.category.toUpperCase())}</text><text x="54" y="124" class="title">${xml(skill.title)}</text><text x="54" y="153" class="sub">${xml(skill.summary)}</text>${nodes}<text x="54" y="345" class="foot">INPUT → PROCESS → RESULT</text><style>.tag{font:600 13px system-ui,sans-serif;letter-spacing:2px;fill:${skill.color}}.title{font:700 29px system-ui,sans-serif;fill:#f5f7fb}.sub{font:400 15px system-ui,sans-serif;fill:#aebbd0}.num{font:700 14px system-ui,sans-serif;fill:#101a2d}.eyebrow{font:600 12px system-ui,sans-serif;letter-spacing:1px;fill:#8fa1bb}.node{font:600 18px system-ui,sans-serif;fill:#f5f7fb}.foot{font:600 11px system-ui,sans-serif;letter-spacing:2px;fill:#687b98}</style></svg>`;
}

for (const skill of skills) {
  const dir = path.join(root, 'skills', skill.id);
  if (!existsSync(path.join(dir, 'SKILL.md'))) throw new Error(`Missing SKILL.md: ${skill.id}`);
  const readmePath = path.join(dir, 'README.md');
  const force = process.argv.includes('--force');
  if (existsSync(readmePath) && !force) throw new Error(`Refusing to overwrite ${readmePath}; pass --force to regenerate this gallery.`);
  const assetDir = path.join(dir, 'assets');
  mkdirSync(assetDir, {recursive: true});
  writeFileSync(path.join(assetDir, 'visual-reference.svg'), makeSvg(skill));
  const readme = `<!-- generated by scripts/generate-skill-overviews.mjs -->\n\n# ${skill.title}\n\n![${skill.title}: схема работы](assets/visual-reference.svg)\n\n${skill.summary}\n\n*Схема показывает назначение и ход работы скилла; это не скриншот готового результата.*\n\n**Когда использовать:** ${skill.when}\n\n**На входе:** ${skill.input}\n\n**Результат:** ${skill.result}\n\n**Инструкции:** [SKILL.md](SKILL.md)\n`;
  writeFileSync(readmePath, readme);
}

console.log(`Created ${skills.length} skill overview READMEs with GitHub-renderable SVG references.`);
