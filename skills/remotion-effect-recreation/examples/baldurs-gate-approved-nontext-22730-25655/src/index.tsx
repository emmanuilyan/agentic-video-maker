import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {Collage,Ghost,Mono,Brain,Editor} from './effects';
const Root=()=> <>{[['StagedCollage',Collage,54],['DoubleExposure',Ghost,36],['MonochromeFocus',Mono,48],['MindOrb',Brain,54],['EditorReveal',Editor,54]].map(([id,component,duration])=><Composition key={id as string} id={id as string} component={component as React.FC} durationInFrames={duration as number} fps={60} width={1280} height={720}/>)}</>;
registerRoot(Root);
