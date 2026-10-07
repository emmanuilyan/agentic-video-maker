import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {Swap,Pair,Hand,ImpactZoom,BlockDegradation} from './effects';
const Root=()=> <>{([['Swap',Swap,78],['Pair',Pair,63],['Hand',Hand,84],['Impact',ImpactZoom,90],['Blocks',BlockDegradation,72]] as const).map(([id,component,n])=><Composition key={id} id={id} component={component as React.FC<any>} durationInFrames={n} fps={60} width={1280} height={720}/>)}</>;
registerRoot(Root);
