import React from 'react';
import {Composition} from 'remotion';
import {Limgrave,Trees,NameCaption,WalterSwap,RedCircle,ShowerQuote} from './Effects';
export const Root:React.FC=()=> <>{[{id:'01-limgrave',c:Limgrave,n:60},{id:'02-tree-inserts',c:Trees,n:78},{id:'03-martin-name',c:NameCaption,n:78},{id:'04-walter-swap',c:WalterSwap,n:81},{id:'05-red-circle',c:RedCircle,n:48},{id:'06-shower-quote',c:ShowerQuote,n:81}].map(x=><Composition key={x.id} id={x.id} component={x.c} width={1280} height={720} fps={60} durationInFrames={x.n}/>)}</>;
