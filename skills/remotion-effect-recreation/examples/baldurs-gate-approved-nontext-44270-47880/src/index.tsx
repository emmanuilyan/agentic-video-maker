import React,{useEffect,useState} from 'react';
import {registerRoot,Composition,delayRender,continueRender,staticFile} from 'remotion';
import {Grade,GameOver,SaveWindow,Sheep,Menu} from './effects';
const Fonts=({children}:{children:React.ReactNode})=>{const [h]=useState(()=>delayRender('fonts'));useEffect(()=>{Promise.all([new FontFace('Black',`url(${staticFile('black.ttf')})`).load(),new FontFace('Times',`url(${staticFile('times.ttf')})`).load()]).then(fs=>{fs.forEach(f=>(document.fonts as unknown as {add:(font:FontFace)=>void}).add(f));continueRender(h)});},[h]);return <>{children}</>};
const Root=()=> <>{[[Grade,'Grade',60],[GameOver,'GameOver',30],[SaveWindow,'SaveWindow',48],[Sheep,'Sheep',48],[Menu,'Menu',42]].map(([C,id,n])=><Composition key={String(id)} id={String(id)} component={()=> <Fonts>{React.createElement(C as React.FC)}</Fonts>} durationInFrames={n as number} fps={60} width={1280} height={720}/>)}</>;
registerRoot(Root);
