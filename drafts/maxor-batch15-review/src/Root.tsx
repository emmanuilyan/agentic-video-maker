import React from 'react';
import {Composition} from 'remotion';
import {Killed,GreenFrame,Flee,Geometry,Stealth,Rigid} from './Effects';
export const Root:React.FC=()=> <>{[["01-killed",Killed,37],["02-green-frame",GreenFrame,31],["03-flee",Flee,82],["04-geometry",Geometry,110],["05-stealth",Stealth,97],["06-rigid",Rigid,102]].map(([id,component,duration])=><Composition key={id as string} id={id as string} component={component as React.FC} durationInFrames={duration as number} fps={60} width={1280} height={720}/>)}</>;
