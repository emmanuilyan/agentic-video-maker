import React from 'react';
import {Composition,registerRoot} from 'remotion';
import {RoughDemo,ThawDemo,RatDemo,CatDemo,UiDemo} from './effects';
const Root=()=> <>{[['RoughFrame',RoughDemo,48],['ThawZoom',ThawDemo,51],['RgbSmear',RatDemo,36],['CatFocus',CatDemo,33],['InventoryPunch',UiDemo,60]].map(([id,component,duration])=><Composition key={id as string} id={id as string} component={component as React.FC} durationInFrames={duration as number} fps={60} width={1280} height={720}/>)}</>;
registerRoot(Root);
