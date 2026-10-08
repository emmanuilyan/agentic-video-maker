import React from 'react';
import {Composition} from 'remotion';
import {HelmetCollage,HelmetTitle,RickAura,CringeGlitch,MaidenMeme,FaceTalk} from './Effects';
export const Root:React.FC=()=> <>{[{id:'01-helmets',c:HelmetCollage,n:66},{id:'02-helmet-title',c:HelmetTitle,n:45},{id:'03-rick-aura',c:RickAura,n:51},{id:'04-cringe-glitch',c:CringeGlitch,n:25},{id:'05-maiden-meme',c:MaidenMeme,n:34},{id:'06-face-talk',c:FaceTalk,n:156}].map(x=><Composition key={x.id} id={x.id} component={x.c} width={1280} height={720} fps={60} durationInFrames={x.n}/>)}</>;
