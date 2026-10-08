import React from 'react';
import {Composition} from 'remotion';
import {Hole,Fun,Friends,Life,Grass,Welcome} from './Effects';
export const Root:React.FC=()=> <>{[{id:'01-hole',component:Hole,n:66},{id:'02-fun',component:Fun,n:63},{id:'03-friends',component:Friends,n:75},{id:'04-life',component:Life,n:78},{id:'05-grass',component:Grass,n:81},{id:'06-welcome',component:Welcome,n:138}].map(c=><Composition key={c.id} id={c.id} component={c.component} width={1280} height={720} fps={60} durationInFrames={c.n}/>)}</>;
