import React, {useId} from 'react';
import {Box, Camera, DocumentState, Layer, Point, Stroke, strokeAt, typingAt} from './core';

export type TransparencyGridProps = {tileSize?:number;light?:string;dark?:string};
/** Editor display only: not a document layer, and never part of layer history. */
export const TransparencyGrid = ({tileSize=24,light='#f3f3f3',dark='#d2d2d2'}:TransparencyGridProps) => {
  if(!Number.isFinite(tileSize)||tileSize<=0)throw new Error('Transparency tileSize must be positive');
  return <div aria-hidden style={{position:'absolute',inset:0,pointerEvents:'none',backgroundColor:light,backgroundImage:`conic-gradient(${dark} 25%, ${light} 0 50%, ${dark} 0 75%, ${light} 0)`,backgroundSize:`${tileSize*2}px ${tileSize*2}px`}}/>;
};

export const CanvasViewport = ({box,camera={},transparency=true,children}: {box:Box;camera?:Camera;transparency?:boolean|TransparencyGridProps;children:React.ReactNode}) =>
  <div style={{position:'absolute',left:box.x,top:box.y,width:box.w,height:box.h,overflow:'hidden'}}>
    {transparency&&<TransparencyGrid {...(typeof transparency==='object'?transparency:{})}/>}
    <div style={{position:'absolute',inset:0,transformOrigin:'0 0',transform:`scale(${camera.zoom??1}) translate(${camera.pan?.x??0}px, ${camera.pan?.y??0}px)`}}>{children}</div>
  </div>;

/** Supply SVG children (<path>, <circle>, etc.) in document/layer coordinates. */
export const MarchingAnts = ({frame,children,width=2,dash='6 6'}:{frame:number;children:React.ReactNode;width?:number;dash?:string}) => <>
  <g fill="none" stroke="white" strokeWidth={width}>{children}</g>
  <g fill="none" stroke="#171717" strokeWidth={width} strokeDasharray={dash} strokeDashoffset={-(frame%12)}>{children}</g>
</>;

export const TransformBox = ({box,handleSize=10}:{box:Box;handleSize?:number}) =>
  <g transform={`translate(${box.x} ${box.y}) rotate(${box.rotation??0})`}>
    <rect width={box.w} height={box.h} fill="none" stroke="white" strokeWidth="3"/>
    <rect width={box.w} height={box.h} fill="none" stroke="#171717" strokeWidth="1.5" strokeDasharray="6 5"/>
    {[[0,0],[.5,0],[1,0],[0,.5],[1,.5],[0,1],[.5,1],[1,1]].map(([u,v],i)=><rect key={i} x={box.w*u-handleSize/2} y={box.h*v-handleSize/2} width={handleSize} height={handleSize} fill="white" stroke="#171717" strokeWidth="2"/>)}
    <path d={`M${box.w/2-8} ${box.h/2}h16M${box.w/2} ${box.h/2-8}v16`} stroke="white" strokeWidth="1.5"/>
  </g>;

/** SVG-only mask; use under an <svg>. Completed strokes persist. */
export const BrushMask = ({frame,strokes,bounds,mode='reveal',children}:{frame:number;strokes:readonly Stroke[];bounds:Box;mode?:'reveal'|'erase';children:React.ReactNode}) => {
  const id=`brush-${useId().replace(/[^a-zA-Z0-9_-]/g,'')}`;
  const background=mode==='reveal'?'black':'white',ink=mode==='reveal'?'white':'black';
  return <>
    <defs><mask id={id} maskUnits="userSpaceOnUse" x={bounds.x} y={bounds.y} width={bounds.w} height={bounds.h} style={{maskType:'luminance'}}>
      <rect x={bounds.x} y={bounds.y} width={bounds.w} height={bounds.h} fill={background}/>
      {strokes.map((stroke,i)=>{
        const sample=strokeAt(frame,stroke);
        return sample.visible?<g key={i} fill={ink}><circle cx={stroke.points[0].x} cy={stroke.points[0].y} r={stroke.width/2}/><path d={sample.path} fill="none" stroke={ink} strokeWidth={stroke.width} strokeLinecap="round" strokeLinejoin="round"/></g>:null;
      })}
    </mask></defs>
    <g mask={`url(#${id})`}>{children}</g>
  </>;
};

export const ToolCursor = ({point,pressed=false,kind='arrow',size=1,opacity=1,brushDiameter=44}:{point:Point;pressed?:boolean;kind?:'arrow'|'text'|'brush'|'eraser';size?:number;opacity?:number;brushDiameter?:number}) =>
  <div style={{position:'absolute',left:point.x,top:point.y,zIndex:100,pointerEvents:'none',opacity,transformOrigin:'0 0',scale:size*(pressed&&kind==='arrow'?.88:1),filter:'drop-shadow(3px 4px 0 #00000035)'}}>
    {kind==='arrow'?<svg width="43" height="55" viewBox="0 0 43 55"><path d="M0 0v43l11-11 10 20 9-5-10-19h17Z" fill="#fff" stroke="#101010" strokeWidth="2.5" strokeLinejoin="miter"/></svg>:
    kind==='text'?<svg width="28" height="45" viewBox="-13 -22 28 45" style={{position:'absolute',left:-13,top:-22}}><path d="M-10-21h20M0-21v42M-10 21h20" stroke="white" strokeWidth="6"/><path d="M-10-21h20M0-21v42M-10 21h20" stroke="#111" strokeWidth="2"/></svg>:
    <svg width={brushDiameter+4} height={brushDiameter+4} style={{position:'absolute',left:-brushDiameter/2-2,top:-brushDiameter/2-2}}><circle cx={brushDiameter/2+2} cy={brushDiameter/2+2} r={brushDiameter/2} fill={kind==='eraser'?'#ffffff44':'none'} stroke="white" strokeWidth="3"/><circle cx={brushDiameter/2+2} cy={brushDiameter/2+2} r={brushDiameter/2} fill="none" stroke="#111" strokeWidth="1"/></svg>}
  </div>;

/** HTML text keeps the caret next to the actual rendered glyphs, including emoji. */
export const TypeText = ({text,frame,revealFrames,committed=false,style}:{text:string;frame:number;revealFrames:readonly number[];committed?:boolean;style?:React.CSSProperties}) => {
  const visible=typingAt(text,frame,revealFrames);
  return <div style={{whiteSpace:'pre-wrap',...style}}>{visible}<span aria-hidden style={{display:'inline-block',height:'.85em',width:0,borderLeft:'3px solid currentColor',verticalAlign:'baseline',visibility:committed||frame%12>=9?'hidden':'visible'}}/></div>;
};

/** Layer arrays and the palette use the same bottom-to-top ordering. */
export const LayerStack = ({document,renderLayer}:{document:DocumentState;renderLayer:(layer:Layer)=>React.ReactNode}) => {
  const render=(layers:Layer[]):React.ReactNode => layers.map(layer=>{
    const b=layer.box;
    return <div key={layer.id} data-layer={layer.id} style={{position:'absolute',left:b?.x??0,top:b?.y??0,width:b?.w??'100%',height:b?.h??'100%',opacity:layer.opacity??1,visibility:layer.visible?'inherit':'hidden',transform:b?.rotation?`rotate(${b.rotation}deg)`:undefined,transformOrigin:'0 0'}}>
      {layer.kind==='group'?render(layer.children??[]):renderLayer(layer)}
    </div>;
  });
  return <>{render(document.layers)}</>;
};
