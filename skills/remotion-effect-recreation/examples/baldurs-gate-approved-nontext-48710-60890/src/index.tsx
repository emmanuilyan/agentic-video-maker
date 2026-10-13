import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {Clown,Nested,Manga,Warp,Film} from './effects';
const Root=()=> <><Composition id="Clown" component={Clown} durationInFrames={45} fps={60} width={1280} height={720}/><Composition id="Nested" component={Nested} durationInFrames={31} fps={60} width={1280} height={720}/><Composition id="Manga" component={Manga} durationInFrames={84} fps={60} width={1280} height={720}/><Composition id="Warp" component={Warp} durationInFrames={48} fps={60} width={1280} height={720}/><Composition id="Film" component={Film} durationInFrames={81} fps={60} width={1280} height={720}/></>;
registerRoot(Root);
