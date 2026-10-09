import React from 'react';
import {registerRoot,Composition} from 'remotion';
import {Location,Editor,Mod,Callouts,Dossier} from './effects';
const Root=()=> <>{[[Location,'Location',60],[Editor,'Editor',72],[Mod,'Mod',48],[Callouts,'Callouts',36],[Dossier,'Dossier',69]].map(([component,id,duration])=><Composition key={String(id)} id={String(id)} component={component as React.FC} durationInFrames={duration as number} fps={60} width={1280} height={720}/>)}</>;
registerRoot(Root);
