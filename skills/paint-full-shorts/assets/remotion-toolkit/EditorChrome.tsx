import React from 'react';
import {Box, DocumentState, Layer, PaletteLayout, panelRows} from './core';
import {CanvasViewport, type TransparencyGridProps} from './CanvasTools';
import {Icon, IconName} from './Icons';

export const bevel:React.CSSProperties={borderTop:'3px solid #fff',borderLeft:'3px solid #fff',borderRight:'3px solid #545454',borderBottom:'3px solid #545454'};
export const inset:React.CSSProperties={borderTop:'2px solid #666',borderLeft:'2px solid #666',borderRight:'2px solid #f7f7f7',borderBottom:'2px solid #f7f7f7'};
export const abs=(x:number,y:number,w:number,h:number):React.CSSProperties=>({position:'absolute',left:x,top:y,width:w,height:h,boxSizing:'border-box'});
export const defaultTools:IconName[]=['select','move','lasso','wand','crop','brush','stamp','eraser','bucket','dropper','type','hand','zoom'];
export const portraitViewport:Box={x:142,y:278,w:862,h:1226};
export const defaultPalette:PaletteLayout={x:677,y:1193,w:327,h:295,border:3,title:30,options:42,row:46,eye:49};
export const toolbarPoint=(name:IconName,tools:readonly IconName[]=defaultTools)=>{
  const i=tools.indexOf(name);if(i<0)throw new Error(`Tool is not present: ${name}`);
  return {x:43+(i%2)*41+21,y:314+Math.floor(i/2)*58+21.5};
};
export const Field=({value,width}:{value:string;width:number})=><span style={{display:'inline-block',width,height:33,background:'#f7f7f7',...inset,padding:'1px 8px',fontSize:22}}>{value}</span>;

export const Toolbar=({active,tools=defaultTools,foreground='#241832',background='#eee7d8'}:{active:IconName;tools?:readonly IconName[];foreground?:string;background?:string})=><>
  <div style={{...abs(39,294,88,522),...bevel,background:'#c5c5c5'}}><div style={{height:15,margin:4,background:'#8e8e8e',borderTop:'2px solid #fff'}}/></div>
  {tools.map((name,i)=><div key={`${name}-${i}`} style={{...abs(43+(i%2)*41,314+Math.floor(i/2)*58,42,43),display:'grid',placeItems:'center',...(name===active?{...inset,background:'#e5e5e5'}:{}),padding:name===active?'2px 0 0 2px':0}}><Icon name={name} size={29}/></div>)}
  <div style={{...abs(50,752,36,37),background:foreground,border:'3px solid white',outline:'1px solid #222'}}/>
  <div style={{...abs(73,773,35,35),background,border:'3px solid #888'}}/>
</>;

export type RetroEditorProps={
  title?:string;documentName:string;menus?:readonly string[];viewport?:Box;activeTool:IconName;
  toolLabel:string;options?:React.ReactNode;foreground?:string;children:React.ReactNode;
  overlay?:React.ReactNode;footer?:React.ReactNode;zoomLabel?:string;transparency?:boolean|TransparencyGridProps;
};
/** Portrait shell with slots: story content stays separate from editor chrome. */
export const RetroEditor=({title='Adobe Photoshop',documentName,menus=['File','Edit','Image','Layer','Select','Filter','View','Window'],viewport=portraitViewport,activeTool,toolLabel,options,foreground,children,overlay,footer,zoomLabel='66.7%',transparency=true}:RetroEditorProps)=> <>
  <div style={{...abs(22,30,1036,1834),background:'#c5c5c5',...bevel,boxShadow:'10px 12px 0 #123c44'}}/>
  <div style={{...abs(31,39,1018,49),background:'#10196f',color:'#fff',display:'flex',alignItems:'center',padding:'0 11px',gap:13,fontSize:25,fontWeight:700}}>
    <div style={{width:30,height:30,background:'#d6e3dc',display:'grid',placeItems:'center',color:'#212155',fontFamily:'Georgia',fontStyle:'italic',fontSize:22}}>Ps</div>
    <span>{title}</span><span style={{fontWeight:400,opacity:.8}}>— {documentName}</span>
    <div style={{marginLeft:'auto',display:'flex',gap:4}}>{['_','□','×'].map(t=><div key={t} style={{width:32,height:30,background:'#c5c5c5',color:'#111',textAlign:'center',fontSize:26,lineHeight:'21px',...bevel}}>{t}</div>)}</div>
  </div>
  <div style={{...abs(48,100,976,35),display:'flex',gap:27,fontSize:24}}>{menus.map(m=><span key={m}><u>{m[0]}</u>{m.slice(1)}</span>)}</div>
  <div style={{...abs(36,143,1005,62),borderTop:'2px solid #fff',borderBottom:'2px solid #888',display:'flex',alignItems:'center',gap:24,padding:'0 14px',fontSize:23}}>
    <Icon name={activeTool} size={31}/><span style={{width:193,fontWeight:700}}>{toolLabel}</span><span style={{height:40,borderLeft:'2px solid #888'}}/>{options}
  </div>
  <Toolbar active={activeTool} foreground={foreground}/>
  <div style={{...abs(viewport.x-13,viewport.y-56,viewport.w+33,34),background:'#909090',color:'#fff',fontSize:20,padding:'3px 9px',...bevel,borderWidth:2}}>{documentName} @ {zoomLabel} (RGB/8)<span style={{float:'right'}}>— □ ×</span></div>
  <div style={{...abs(viewport.x,viewport.y-20,viewport.w,20),background:'#dedede',borderBottom:'1px solid #777',overflow:'hidden'}}>{Array.from({length:Math.ceil(viewport.w/20)},(_,i)=><div key={i} style={{position:'absolute',left:i*20,top:i%5===0?0:12,height:i%5===0?20:8,borderLeft:'1px solid #777',fontSize:10,paddingLeft:3}}>{i%5===0?i*20:''}</div>)}</div>
  <div style={{...abs(viewport.x-21,viewport.y,21,viewport.h),background:'#dedede',borderRight:'1px solid #777',overflow:'hidden'}}>{Array.from({length:Math.ceil(viewport.h/20)},(_,i)=><div key={i} style={{position:'absolute',top:i*20,left:i%5===0?0:12,width:i%5===0?21:9,borderTop:'1px solid #777',fontSize:10}}>{i%5===0?<span style={{writingMode:'vertical-rl',paddingTop:3}}>{i*20}</span>:null}</div>)}</div>
  <CanvasViewport box={viewport} transparency={transparency}>{children}</CanvasViewport>
  <div style={{...abs(viewport.x+viewport.w+1,viewport.y,20,viewport.h+22),background:'#acacac',...inset}}><div style={{...abs(1,18,16,509),background:'#d2d2d2',...bevel,borderWidth:2}}/></div>
  <div style={{...abs(viewport.x,viewport.y+viewport.h+1,viewport.w-1,22),background:'#b2b2b2',...inset}}><div style={{...abs(24,0,540,17),background:'#d2d2d2',...bevel,borderWidth:2}}/></div>
  {overlay}{footer}
</>;

export const LayersPanel=({document,layout=defaultPalette,title='Layers',thumbnail}:{document:DocumentState;layout?:PaletteLayout;title?:string;thumbnail?:(layer:Layer)=>React.ReactNode}) =>
  <div style={{...abs(layout.x,layout.y,layout.w,layout.h),background:'#c4c4c4',...bevel,borderWidth:layout.border,boxShadow:'7px 7px 0 #0a091d33'}}>
    <div style={{height:layout.title,background:'#242d72',color:'white',fontSize:20,padding:'2px 7px',display:'flex',justifyContent:'space-between'}}><b>{title}</b><span>×</span></div>
    <div style={{height:layout.options,display:'flex',alignItems:'center',gap:7,padding:'0 7px',fontSize:17}}><span style={{background:'white',...inset,padding:'2px 6px',width:123}}>Normal ▾</span><span>Opacity: 100%</span></div>
    {panelRows(document.layers).map(({layer,depth,effectiveVisible})=>{
      const selected=layer.id===document.selectedId;
      return <div key={layer.id} style={{height:layout.row,display:'flex',alignItems:'center',borderTop:'1px solid #8f8f8f',background:selected?'#243876':'#d4d4d4',color:selected?'white':'#171717',fontSize:22}}>
        <span style={{width:layout.eye,flexShrink:0,display:'grid',placeItems:'center',height:'100%',borderRight:'1px solid #929292'}}>{layer.visible?<span style={{opacity:effectiveVisible?1:.4}}><Icon name="eye" size={23} color={selected?'white':'#252525'}/></span>:<span style={{width:18,height:16,border:'1px solid #909090'}}/>}</span>
        <span style={{width:35,flexShrink:0,margin:`0 9px 0 ${9+depth*17}px`,height:32,background:layer.kind==='group'?'transparent':'#f4eeda',border:layer.kind==='group'?'none':'1px solid #888',display:'grid',placeItems:'center',color:'#111'}}>
          {thumbnail?thumbnail(layer):layer.kind==='group'?<Icon name="folder" size={29} color={selected?'white':'#242424'}/>:layer.kind==='text'?'T':<span style={{width:24,height:24,background:layer.color??'#a0b8bc'}}/>}
        </span><span style={{opacity:effectiveVisible?1:.5,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis'}}>{layer.name}</span>
      </div>;
    })}
    <div style={{height:29,display:'flex',justifyContent:'flex-end',gap:20,padding:'1px 15px',fontSize:18,color:'#494949'}}>fx <span>▣</span><span>▱</span><span>▤</span><span>♲</span></div>
  </div>;
