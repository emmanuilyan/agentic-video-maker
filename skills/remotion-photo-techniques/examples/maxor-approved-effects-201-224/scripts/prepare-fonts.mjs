import {readFile,writeFile} from 'node:fs/promises';
const dir=process.env.MAXOR_FONT_DIR||'/System/Library/Fonts/Supplemental';
for(const [source,target] of [['Arial Bold.ttf','Arial-Bold.ttf'],['Impact.ttf','Impact.ttf'],['Georgia.ttf','Georgia.ttf']]){await writeFile(new URL('../public/assets/'+target,import.meta.url),await readFile(dir+'/'+source));}
