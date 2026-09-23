import React from 'react';
import {AbsoluteFill,useCurrentFrame} from 'remotion';
import {BrushMask,LayerStack,MarchingAnts,ToolCursor,TransformBox,TypeText} from './CanvasTools';
import {LayersPanel} from './EditorChrome';
import {cornerDrag,evaluateDocument,strokeAt,type DocumentState,type EditAction,type Stroke} from './core';

const stroke:Stroke={points:[{x:55,y:80},{x:345,y:80},{x:345,y:170},{x:55,y:170},{x:55,y:260},{x:345,y:260}],width:100,start:6,end:66};
const initial:DocumentState={selectedId:'circle',layers:[
  {id:'paper',name:'Фон',visible:true,color:'#291840',box:{x:0,y:0,w:400,h:260}},
  {id:'circle',name:'Объект',visible:true,color:'#ff9455',box:{x:80,y:55,w:140,h:140}},
]};
const edits:EditAction[]=[
  {at:24,type:'duplicate',id:'circle',newId:'copy',name:'Копия',offset:{x:85,y:30}},
  {at:48,type:'reorder',id:'circle',toIndex:2},
  {at:72,type:'undo'},
  {at:96,type:'redo'},
];
const positions={transform:{x:70,y:210},selection:{x:575,y:210},brush:{x:70,y:680},eraser:{x:575,y:680}};
const Card=({at,label,children}:{at:{x:number;y:number};label:string;children:React.ReactNode})=><div style={{position:'absolute',left:at.x,top:at.y,width:435,height:415,background:'#f4eeda',border:'3px solid #242434'}}><div style={{padding:'16px 18px',fontSize:30,fontWeight:700}}>{label}</div><div style={{position:'absolute',left:15,top:75,width:400,height:325}}>{children}</div></div>;

/** A 1080×1920 / 120-frame sample and visual check for the portable primitives. */
export const ToolkitExample=()=>{
  const frame=useCurrentFrame();
  const transform=cornerDrag(frame,{from:{x:90,y:40,w:170,h:150,rotation:14},toSize:{w:220,h:175},start:6,end:66,corner:'se'});
  const brush=strokeAt(frame,stroke),state=evaluateDocument(initial,edits,frame);
  const text='Привет, мир 👩‍🚀';
  const textFrames=[...new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(text)].map((_,i)=>6+i*5);
  return <AbsoluteFill style={{background:'#c6cbcd',fontFamily:'Arial',color:'#242434'}}>
    <style>{'*{box-sizing:border-box}'}</style>
    <div style={{position:'absolute',left:70,top:66,fontSize:54,fontWeight:900}}>PAINT FULL · TOOLKIT</div>
    <Card at={positions.transform} label="01 / TRANSFORM"><svg width="400" height="325"><g transform={`translate(${transform.box.x} ${transform.box.y}) rotate(${transform.box.rotation})`}><rect width={transform.box.w} height={transform.box.h} fill="#fa9658"/></g><TransformBox box={transform.box}/></svg><ToolCursor point={transform.handle} pressed={transform.pressed}/></Card>
    <Card at={positions.selection} label="02 / SELECTION"><svg width="400" height="325"><path d="M200 25 241 119 345 131 267 201 282 294 200 247 104 294 124 195 53 130 157 116Z" fill="#88b5a3"/><MarchingAnts frame={frame}><path d="M200 25 241 119 345 131 267 201 282 294 200 247 104 294 124 195 53 130 157 116Z"/></MarchingAnts></svg></Card>
    <Card at={positions.brush} label="03 / BRUSH MASK"><svg width="400" height="325"><rect width="400" height="325" fill="#291840"/><BrushMask frame={frame} strokes={[stroke]} bounds={{x:0,y:0,w:400,h:325}}><rect width="400" height="325" fill="#b9dac0"/><circle cx="200" cy="165" r="112" fill="#ff9455"/></BrushMask></svg><ToolCursor kind="brush" point={brush.tip} brushDiameter={stroke.width}/></Card>
    <Card at={positions.eraser} label="04 / ERASER"><svg width="400" height="325"><rect width="400" height="325" fill="#291840"/><text x="75" y="185" fill="#f4eeda" fontWeight="900" fontSize="66">СКРЫТО</text><BrushMask frame={frame} strokes={[stroke]} mode="erase" bounds={{x:0,y:0,w:400,h:325}}><rect width="400" height="325" fill="#ff9455"/></BrushMask></svg><ToolCursor kind="eraser" point={brush.tip} brushDiameter={stroke.width}/></Card>
    <div style={{position:'absolute',left:70,top:1150,width:940,height:185,padding:24,background:'#f4eeda',border:'3px solid #242434'}}><div style={{fontSize:28,fontWeight:700,marginBottom:19}}>05 / TYPE · UNICODE</div><TypeText text={text} frame={frame} revealFrames={textFrames} committed={frame>=80} style={{fontSize:59,fontWeight:800}}/></div>
    <div style={{position:'absolute',left:70,top:1390,fontSize:30,fontWeight:700}}>06 / LAYERS · DUPLICATE → REORDER → UNDO → REDO</div>
    <div style={{position:'absolute',left:70,top:1460,width:435,height:330,background:'#f4eeda',padding:17}}><div style={{position:'relative',width:400,height:260}}><LayerStack document={state} renderLayer={layer=><div style={{width:'100%',height:'100%',background:layer.color,borderRadius:layer.id==='paper'?0:'50%',border:layer.id==='paper'?'none':'4px solid #f4eeda',display:'grid',placeItems:'center',fontSize:24}}>{layer.id==='paper'?'':layer.id==='copy'?'2':'1'}</div>}/></div><div style={{fontSize:18,marginTop:12}}>frame {frame} · {frame<24?'original':frame<48?'duplicate':frame<72?'reorder':frame<96?'undo':'redo'}</div></div>
    <LayersPanel document={state} layout={{x:575,y:1460,w:435,h:330,border:3,title:36,options:44,row:62,eye:50}}/>
    <div style={{position:'absolute',left:70,top:1840,fontSize:23,color:'#50565a'}}>Все состояния вычисляются из номера кадра. Никаких таймеров.</div>
  </AbsoluteFill>;
};
