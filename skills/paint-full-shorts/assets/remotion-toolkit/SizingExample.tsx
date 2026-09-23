import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {ToolCursor} from './CanvasTools';
import {RetroEditor,portraitViewport,abs,inset} from './EditorChrome';
import {CanvasSurface,SizePanel,sizePanelPoint} from './Sizing';
import {cursorTrack,evaluateDocument,fitDocument,resizeAt,type DocumentState,type EditAction,type Size} from './core';

const viewport=portraitViewport;
const panel={x:230,y:1220,w:720,h:277};
const sizes={portrait:{w:720,h:1280},square:{w:1080,h:1080},landscape:{w:1280,h:720}};
const cues={square:24,squareReady:44,landscape:64,landscapeReady:84,exit:100};
const initial:DocumentState={layers:[],selectedId:null,size:sizes.portrait};
const actions:EditAction[]=[{at:cues.square,type:'resize-canvas',size:sizes.square},{at:cues.landscape,type:'resize-canvas',size:sizes.landscape}];

/** 120 frames at 24 fps. Document ratios change inside a fixed portrait editor. */
export const SizingExample=()=>{
  const frame=useCurrentFrame(),state=evaluateDocument(initial,actions,frame);
  if(frame>=cues.square&&frame<cues.squareReady)state.size=resizeAt(frame,{from:sizes.portrait,to:sizes.square,start:cues.square,end:cues.squareReady});
  if(frame>=cues.landscape&&frame<cues.landscapeReady)state.size=resizeAt(frame,{from:sizes.square,to:sizes.landscape,start:cues.landscape,end:cues.landscapeReady});
  const size=state.size as Size,preset=frame<cues.square?'9:16':frame<cues.landscape?'1:1':'16:9';
  const display=fitDocument(size,viewport,72);
  const squareButton=sizePanelPoint(panel,'1:1'),wideButton=sizePanelPoint(panel,'16:9');
  const cursor=cursorTrack(frame,[
    {kind:'move',start:0,end:cues.square,from:{x:951,y:1175},to:squareButton,bend:.08},
    {kind:'move',start:56,end:cues.landscape,from:squareButton,to:wideButton,bend:-.1},
    {kind:'move',start:90,end:cues.exit,from:wideButton,to:{x:1015,y:1550},bend:.08},
  ]);
  return <AbsoluteFill style={{background:'#26656c',fontFamily:'Arial',color:'#171717'}}>
    <style>{'*{box-sizing:border-box}'}</style>
    <RetroEditor documentName="resize.psd" activeTool="crop" toolLabel="Canvas Size" transparency={false} zoomLabel={`${(display.zoom*100).toFixed(1)}%`} options={<><span>W: {Math.round(size.w)} px</span><span>H: {Math.round(size.h)} px</span></>} overlay={<>
      <SizePanel box={panel} size={size} preset={preset} mode="contain" pressedPreset={frame===cues.square?'1:1':frame===cues.landscape?'16:9':undefined}/>
      <div style={{...abs(170,305,147,55),...inset,background:'#d7d7d7',display:'grid',placeItems:'center',fontFamily:'Courier New',fontSize:31,fontWeight:700}}>{preset}</div>
    </>} footer={<>
      <div style={{...abs(143,1545,862,35),fontFamily:'Courier New',fontSize:21}}>PAINT FULL / CANVAS SIZE</div>
      <div style={{...abs(141,1603,864,172),...inset,background:'#282c33',padding:'21px 26px',color:'#f4eeda'}}><div style={{fontFamily:'Courier New',fontSize:22,color:'#b9dac0',marginBottom:23}}>9:16 → 1:1 → 16:9</div><div style={{fontSize:43,fontWeight:800}}>МЕНЯЙ ФОРМАТ ХОЛСТА.</div></div>
    </>}>
      <CanvasSurface workspace={viewport} size={size} contentSize={{w:1000,h:1000}} mode="contain" padding={72}>
        <svg width="1000" height="1000" viewBox="0 0 1000 1000"><defs><radialGradient id="resize-planet" cx="30%" cy="23%" r="76%"><stop stopColor="#ffd894"/><stop offset=".48" stopColor="#ff944e"/><stop offset="1" stopColor="#ac4259"/></radialGradient><clipPath id="resize-edge"><circle r="310"/></clipPath></defs><g transform="translate(500 500)">
          <g transform="rotate(-24)"><ellipse rx="450" ry="145" fill="none" stroke="#b9dac0" strokeWidth="60"/></g><circle r="310" fill="url(#resize-planet)"/><g clipPath="url(#resize-edge)" stroke="#ce684c" strokeWidth="23" fill="none" opacity=".4"><path d="M-340-180C-130-280 80 90 360-40M-350-80C-130-180 80 190 360 60M-330 100C-130 0 80 320 360 200"/></g><g transform="rotate(-24)"><path d="M-450 0A450 145 0 0 0 450 0" fill="none" stroke="#b9dac0" strokeWidth="60"/><path d="M-450 0A450 145 0 0 0 450 0" fill="none" stroke="#648b85" strokeWidth="3"/></g>
        </g></svg>
      </CanvasSurface>
    </RetroEditor>
    <ToolCursor point={cursor} pressed={frame===cues.square||frame===cues.landscape}/>
  </AbsoluteFill>;
};
