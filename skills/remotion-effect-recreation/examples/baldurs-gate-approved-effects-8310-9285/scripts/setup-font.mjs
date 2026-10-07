import {copyFileSync,existsSync} from 'node:fs';
const path=process.argv[2] || '/System/Library/Fonts/Supplemental/Impact.ttf';
if(!existsSync(path))throw new Error('Provide a locally licensed Impact font path: npm run setup-font -- /path/to/Impact.ttf');
copyFileSync(path,'public/impact.ttf');
console.log('Local Impact font prepared. This font is excluded from Git.');
