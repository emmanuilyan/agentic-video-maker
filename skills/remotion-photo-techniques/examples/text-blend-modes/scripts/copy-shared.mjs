import {copyFileSync, mkdirSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {dirname, join, resolve} from 'node:path';

const example = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = resolve(example, '../../assets/techniques');
const target = join(example, 'src/shared');
mkdirSync(target, {recursive: true});
for (const file of ['blend-modes.ts', 'blended-fill-text.tsx', 'premiere-blend-still-text.tsx']) {
  copyFileSync(join(source, file), join(target, file));
}
