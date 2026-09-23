import React from 'react';
import {Box,ContentFit,Point,Size,aspectPresets,contentFit,fitDocument} from './core';
import {TransparencyGrid,type TransparencyGridProps} from './CanvasTools';
import {abs,bevel,inset} from './EditorChrome';

export type CanvasSurfaceProps={workspace:Size;size:Size;contentSize?:Size;mode?:ContentFit;anchor?:Point;padding?:number;transparency?:boolean|TransparencyGridProps;children:React.ReactNode};
/** An independently sized document, clipped and fitted inside stable editor chrome. */
export const CanvasSurface=({workspace,size,contentSize=size,mode='preserve',anchor,padding=24,transparency=true,children}:CanvasSurfaceProps)=>{
  const display=fitDocument(size,workspace,padding),fit=contentFit(contentSize,size,mode,anchor);
  return <div style={{position:'absolute',inset:0,background:'#858589'}}>
    <div style={{...abs(display.box.x,display.box.y,display.box.w,display.box.h),overflow:'hidden',boxShadow:'0 0 0 2px #4b4b4d, 7px 7px 0 #0000001c'}}>
      {transparency&&<TransparencyGrid {...(typeof transparency==='object'?transparency:{})}/>}
      <div style={{position:'absolute',left:0,top:0,width:size.w,height:size.h,transformOrigin:'0 0',transform:`scale(${display.zoom})`}}>
        <div style={{position:'absolute',left:fit.x,top:fit.y,width:contentSize.w,height:contentSize.h,transformOrigin:'0 0',transform:`scale(${fit.scaleX}, ${fit.scaleY})`}}>{children}</div>
      </div>
    </div>
  </div>;
};

export const sizePanelPresets=Object.keys(aspectPresets) as (keyof typeof aspectPresets)[];
export const sizePanelPoint=(box:Box,preset:keyof typeof aspectPresets):Point=>({x:box.x+25+sizePanelPresets.indexOf(preset)*((box.w-50)/5)+(box.w-70)/10,y:box.y+184});
export type SizePanelProps={box:Box;size:Size;lockAspect?:boolean;preset?:keyof typeof aspectPresets;mode?:ContentFit;title?:string;pressedPreset?:keyof typeof aspectPresets};
/** Frame-driven display panel. Values and clicks come from the host timeline. */
export const SizePanel=({box,size,lockAspect=false,preset,mode='preserve',title='Canvas Size',pressedPreset}:SizePanelProps)=>{
  const names:Record<ContentFit,string>={preserve:'Keep pixel size',contain:'Fit inside',cover:'Fill and crop',stretch:'Stretch'};
  return <div style={{...abs(box.x,box.y,box.w,box.h),...bevel,background:'#c5c5c5',boxShadow:'7px 7px 0 #00000025'}}>
    <div style={{height:33,background:'#242d72',color:'white',fontSize:22,padding:'3px 10px',display:'flex',justifyContent:'space-between'}}><b>{title}</b><span>×</span></div>
    <div style={{position:'absolute',left:22,top:56,right:22,display:'flex',alignItems:'center',gap:14,fontSize:22}}>
      <span>W:</span><span style={{...inset,background:'white',padding:'7px 10px',width:130}}>{Math.round(size.w)}</span><span>px</span>
      <span style={{...bevel,width:45,height:40,display:'grid',placeItems:'center',background:lockAspect?'#e3ebdd':'#c5c5c5'}}><svg width="25" height="25" viewBox="0 0 25 25" fill="none" stroke="#242434" strokeWidth="2"><path d="M9 17 5 21a4 4 0 0 1-6-6l5-5a4 4 0 0 1 6 0M15 7l4-4a4 4 0 0 1 6 6l-5 5a4 4 0 0 1-6 0" transform="translate(1 -1)"/>{lockAspect?<path d="m7 18 11-11"/>:<path d="M9 8 6 5M17 18l3 3"/>}</svg></span>
      <span>H:</span><span style={{...inset,background:'white',padding:'7px 10px',width:130}}>{Math.round(size.h)}</span><span>px</span>
    </div>
    <div style={{position:'absolute',left:25,top:116,fontSize:20,color:'#383838'}}>{lockAspect?'✓ Constrain proportions':'Independent width / height'}</div>
    {sizePanelPresets.map((name,i)=>{
      const step=(box.w-50)/5,w=step-4;
      return <div key={name} style={{...abs(22+i*step,161,w,40),...(pressedPreset===name?inset:bevel),background:preset===name?'#242d72':'#d5d5d5',color:preset===name?'white':'#171717',display:'grid',placeItems:'center',fontSize:23,fontWeight:700}}>{name}</div>;
    })}
    <div style={{position:'absolute',left:25,top:222,fontSize:21}}>Content: <b>{names[mode]}</b></div>
  </div>;
};
