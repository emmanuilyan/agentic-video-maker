import {cpSync,existsSync,mkdirSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';

const target=process.argv[2];
if(!target){console.error('Usage: node install-toolkit.mjs /absolute/remotion-project [relative-destination]');process.exit(2);}
const project=path.resolve(target);
if(!existsSync(path.join(project,'package.json')))throw new Error('Target must be an existing Remotion project with package.json');
const destination=path.resolve(project,process.argv[3]??'src/paint-full');
const relative=path.relative(project,destination);
if(!relative||relative.startsWith('..')||path.isAbsolute(relative))throw new Error('Choose a destination inside the project');
if(existsSync(destination))throw new Error(`Destination already exists: ${destination}. Review it or choose another subdirectory; it will not be overwritten.`);
const source=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../assets/remotion-toolkit');
mkdirSync(path.dirname(destination),{recursive:true});
cpSync(source,destination,{recursive:true,errorOnExist:true,force:false});
console.log(`paint-full toolkit installed: ${destination}`);
