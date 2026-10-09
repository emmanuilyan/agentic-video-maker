import React,{useEffect,useState} from 'react';
import {Composition,registerRoot,delayRender,continueRender,staticFile} from 'remotion';
import {CircleReveal,FramedProducts,NeonHero,ProductCascade,WebSpotlight} from './effects';
const Fonts=()=>{const [h]=useState(()=>delayRender("fonts"));useEffect(()=>{Promise.all([new FontFace("MaxorTimes",`url(${staticFile("times.ttf")})`).load(),new FontFace("MaxorGeorgia",`url(${staticFile("georgia-bold.ttf")})`).load()]).then(fs=>{fs.forEach(f=>(document.fonts as unknown as {add:(font:FontFace)=>void}).add(f));continueRender(h);});},[h]);return null;};
const Root=()=> <><Fonts/>{[["CircleReveal",CircleReveal,30],["FramedProducts",FramedProducts,42],["NeonHero",NeonHero,54],["ProductCascade",ProductCascade,30],["WebSpotlight",WebSpotlight,72]].map(([id,component,n])=><Composition key={id as string} id={id as string} component={()=>{const C=component as React.FC;return <><Fonts/><C/></>;}} durationInFrames={n as number} fps={60} width={1280} height={720}/>)}</>;
registerRoot(Root);
