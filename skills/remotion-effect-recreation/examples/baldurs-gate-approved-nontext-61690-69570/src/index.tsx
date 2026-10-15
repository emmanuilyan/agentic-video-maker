import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {Equations,Ghost,Posters,Insert} from './effects';
const Root=()=> <><Composition id="Equations" component={Equations} durationInFrames={44} fps={60} width={1280} height={720}/><Composition id="Ghost" component={Ghost} durationInFrames={72} fps={60} width={1280} height={720}/><Composition id="Posters" component={Posters} durationInFrames={72} fps={60} width={1280} height={720}/><Composition id="Insert" component={Insert} durationInFrames={96} fps={60} width={1280} height={720}/></>;
registerRoot(Root);
