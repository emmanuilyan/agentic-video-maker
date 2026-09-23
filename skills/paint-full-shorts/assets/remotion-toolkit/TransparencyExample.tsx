import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {BrushMask,LayerStack,ToolCursor} from './CanvasTools';
import {RetroEditor,LayersPanel,portraitViewport,defaultPalette,abs,inset} from './EditorChrome';
import {cursorTrack,evaluateDocument,layerEyePoint,localToDocument,strokeAt,toScreen,type DocumentState,type EditAction,type Stroke} from './core';

const viewport=portraitViewport;
const palette={...defaultPalette,y:1260,h:205};
const heroBox={x:206,y:355,w:450,h:450};
const cues={hideBackground:24,eraseStart:56,eraseEnd:86,rest:96};
const stroke:Stroke={points:[{x:50,y:170},{x:220,y:225},{x:400,y:280}],width:74,start:cues.eraseStart,end:cues.eraseEnd};
const initial:DocumentState={selectedId:'hero',layers:[
  {id:'background',name:'Фон',visible:true,color:'#f4eeda'},
  {id:'hero',name:'Планета',visible:true,box:heroBox,color:'#ff9455'},
]};
const actions:EditAction[]=[
  {at:cues.hideBackground,type:'update',id:'background',patch:{visible:false}},
  {at:cues.hideBackground,type:'select',id:'background'},
  {at:cues.eraseStart,type:'select',id:'hero'},
];
const eye=layerEyePoint(initial,'background',palette);
const tipAt=(frame:number)=>toScreen(localToDocument(strokeAt(frame,stroke).tip,heroBox),viewport);

/** 1080×1920, 24 fps, 120 frames: hide background, then erase into transparency. */
export const TransparencyExample=()=>{
  const frame=useCurrentFrame(),document=evaluateDocument(initial,actions,frame);
  const noBackground=frame>=cues.hideBackground,erasing=frame>=cues.eraseStart&&frame<=cues.eraseEnd;
  const cursor=cursorTrack(frame,[
    {kind:'move',start:0,end:cues.hideBackground,from:{x:900,y:1190},to:eye,bend:.08},
    {kind:'move',start:36,end:cues.eraseStart,from:eye,to:tipAt(cues.eraseStart),bend:-.12},
    {kind:'follow',start:cues.eraseStart,end:cues.eraseEnd,pointAt:tipAt},
    {kind:'move',start:cues.eraseEnd,end:cues.rest,from:tipAt(cues.eraseEnd),to:{x:936,y:1545},bend:.08},
  ]);
  return <AbsoluteFill style={{background:'#26656c',fontFamily:'Arial',color:'#171717'}}>
    <style>{'*{box-sizing:border-box}'}</style>
    <RetroEditor documentName="transparent.psd" activeTool={frame<cues.eraseStart?'move':'eraser'} toolLabel={frame<cues.eraseStart?'Layer visibility':'Eraser'} options={<span>{frame<cues.eraseStart?'Click the eye to hide a layer':'Brush: 74 px / Opacity: 100%'}</span>} overlay={<LayersPanel document={document} layout={palette}/>} footer={<>
      <div style={{...abs(143,1545,862,35),fontFamily:'Courier New',fontSize:21}}>PAINT FULL / TRANSPARENCY</div>
      <div style={{...abs(141,1603,864,172),background:'#282c33',...inset,padding:'22px 26px',color:'#f4eeda'}}>
        <div style={{fontFamily:'Courier New',fontSize:22,color:'#b9dac0',marginBottom:22}}>{!noBackground?'01 / BACKGROUND ON':frame<cues.eraseStart?'02 / BACKGROUND OFF':'03 / ERASE TO ALPHA'}</div>
        <div style={{fontSize:43,fontWeight:800}}>{!noBackground?'СКРОЙ ФОНОВЫЙ СЛОЙ.':frame<cues.eraseStart?'ФОНА НЕТ — ВИДНА ШАХМАТКА.':'СТЁРТОЕ — ТОЖЕ ПРОЗРАЧНО.'}</div>
      </div>
    </>}>
      <LayerStack document={document} renderLayer={layer=>layer.id==='background'?<div style={{width:'100%',height:'100%',background:layer.color}}/>:
        <svg width="450" height="450" viewBox="0 0 450 450"><defs><radialGradient id="transparency-planet" cx="30%" cy="22%" r="76%"><stop stopColor="#ffd894"/><stop offset=".48" stopColor="#ff944e"/><stop offset="1" stopColor="#ae4259"/></radialGradient><clipPath id="transparency-planet-edge"><circle cx="225" cy="225" r="210"/></clipPath></defs>
          <BrushMask frame={frame} strokes={[stroke]} mode="erase" bounds={{x:0,y:0,w:450,h:450}}><circle cx="225" cy="225" r="210" fill="url(#transparency-planet)"/><g clipPath="url(#transparency-planet-edge)" fill="none" stroke="#cf694c" strokeWidth="20" opacity=".4"><path d="M-10 100C140 20 285 230 470 165M-10 165C140 85 285 295 470 230M-10 285C140 205 285 415 470 350"/></g></BrushMask>
        </svg>}/>
    </RetroEditor>
    <ToolCursor point={cursor} kind={erasing?'eraser':'arrow'} pressed={frame===cues.hideBackground} brushDiameter={stroke.width}/>
  </AbsoluteFill>;
};
