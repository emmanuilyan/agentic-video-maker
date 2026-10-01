import {Composition} from 'remotion';
import {PokemonScene,CountdownScene,N64Scene,ComicScene,NameplateCycle} from './scenes';
const items=[['Pokemon',PokemonScene,91],['Countdown',CountdownScene,96],['N64',N64Scene,84],['Comic',ComicScene,84],['Names',NameplateCycle,195]] as const;
export const Root:React.FC=()=> <>{items.map(([id,component,duration])=><Composition key={id} id={id} component={component} width={1280} height={720} fps={60} durationInFrames={duration}/>)}</>;
