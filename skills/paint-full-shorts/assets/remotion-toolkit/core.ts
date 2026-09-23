/** Document coordinates throughout. Screen conversion happens exactly once. */
export type Point = {x: number; y: number};
export type Box = Point & {w: number; h: number; rotation?: number};
export type Camera = {pan?: Point; zoom?: number};
export type Size = {w:number;h:number};
export type ContentFit = 'preserve'|'contain'|'cover'|'stretch';
export const aspectPresets = {'9:16':{w:9,h:16},'1:1':{w:1,h:1},'16:9':{w:16,h:9},'4:5':{w:4,h:5},'4:3':{w:4,h:3}} as const;
const validSize=(size:Size):Size=>{
  if(!Number.isFinite(size.w)||!Number.isFinite(size.h)||size.w<=0||size.h<=0)throw new Error('Width and height must be finite and positive');
  return {w:size.w,h:size.h};
};
/** A locked edit derives the other dimension from the explicitly driven axis. */
export const resizeDimensions=(from:Size,change:Partial<Size>,lockAspect=false,driver?:'w'|'h'):Size=>{
  validSize(from);
  const next=validSize({w:change.w??from.w,h:change.h??from.h});
  if(!lockAspect||(change.w===undefined&&change.h===undefined))return next;
  const axis=driver??(change.w!==undefined?'w':'h');
  if(change[axis]===undefined)throw new Error('Locked resize requires a value for its driven axis');
  return validSize(axis==='w'?{w:next.w,h:next.w*from.h/from.w}:{w:next.h*from.w/from.h,h:next.h});
};
export const sizeForRatio=(ratio:keyof typeof aspectPresets|Size,width=1080):Size=>{
  const r=validSize(typeof ratio==='string'?aspectPresets[ratio]:ratio);
  validSize({w:width,h:width*r.h/r.w});
  return {w:Math.max(1,Math.round(width)),h:Math.max(1,Math.round(width*r.h/r.w))};
};
export const progress = (f: number, start: number, end: number) => end <= start ? Number(f >= start) : Math.max(0, Math.min(1, (f-start)/(end-start)));
export const smooth = (t: number) => t*t*(3-2*t);
const mix = (a: number, b: number, t: number) => a+(b-a)*t;
export const resizeAt=(frame:number,plan:{from:Size;to:Partial<Size>;start:number;end:number;lockAspect?:boolean;driver?:'w'|'h'}):Size=>{
  const target=resizeDimensions(plan.from,plan.to,plan.lockAspect,plan.driver);
  const t=smooth(progress(frame,plan.start,plan.end));
  return {w:mix(plan.from.w,target.w,t),h:mix(plan.from.h,target.h,t)};
};
/** Fit the actual document rectangle inside a fixed editor workspace. */
export const fitDocument=(size:Size,workspace:Size,padding=24)=>{
  validSize(size);validSize(workspace);
  if(!Number.isFinite(padding)||padding<0||padding*2>=Math.min(workspace.w,workspace.h))throw new Error('Padding leaves no room for the document');
  const zoom=Math.min((workspace.w-padding*2)/size.w,(workspace.h-padding*2)/size.h);
  return {box:{x:(workspace.w-size.w*zoom)/2,y:(workspace.h-size.h*zoom)/2,w:size.w*zoom,h:size.h*zoom},zoom};
};
/** Original layer coordinates stay intact; cropping is non-destructive. */
export const contentFit=(source:Size,target:Size,mode:ContentFit='preserve',anchor:Point={x:.5,y:.5})=>{
  validSize(source);validSize(target);
  if(!Number.isFinite(anchor.x)||!Number.isFinite(anchor.y)||anchor.x<0||anchor.x>1||anchor.y<0||anchor.y>1)throw new Error('Anchor must be within 0..1');
  const sx=target.w/source.w,sy=target.h/source.h;
  const scale=mode==='contain'?Math.min(sx,sy):mode==='cover'?Math.max(sx,sy):1;
  const scaleX=mode==='stretch'?sx:scale,scaleY=mode==='stretch'?sy:scale;
  return {x:(target.w-source.w*scaleX)*anchor.x,y:(target.h-source.h*scaleY)*anchor.y,scaleX,scaleY};
};
export const contentPoint=(point:Point,fit:ReturnType<typeof contentFit>):Point=>({x:fit.x+point.x*fit.scaleX,y:fit.y+point.y*fit.scaleY});
export const toScreen = (p: Point, viewport: Point, camera: Camera = {}): Point => ({
  x: viewport.x+(p.x+(camera.pan?.x ?? 0))*(camera.zoom ?? 1),
  y: viewport.y+(p.y+(camera.pan?.y ?? 0))*(camera.zoom ?? 1),
});
export const localToDocument = (p: Point, box: Box): Point => {
  const a = (box.rotation ?? 0)*Math.PI/180;
  return {x:box.x+p.x*Math.cos(a)-p.y*Math.sin(a),y:box.y+p.x*Math.sin(a)+p.y*Math.cos(a)};
};
export const handlePoint = (box: Box, u = 1, v = 1) => localToDocument({x:box.w*u,y:box.h*v},box);

export type Corner = 'nw' | 'ne' | 'sw' | 'se';
const corners: Record<Corner, [number,number]> = {nw:[0,0],ne:[1,0],sw:[0,1],se:[1,1]};
/** Keep the opposite corner fixed even when the box is rotated. */
export const cornerDrag = (f: number, plan: {from: Box; toSize: Partial<Size>; start:number;end:number;corner?:Corner;lockAspect?:boolean;driver?:'w'|'h'}) => {
  const uv = corners[plan.corner ?? 'se'];
  const {w,h}=resizeAt(f,{from:plan.from,to:plan.toSize,start:plan.start,end:plan.end,lockAspect:plan.lockAspect,driver:plan.driver});
  const anchor=handlePoint(plan.from,1-uv[0],1-uv[1]);
  const delta=localToDocument({x:w*(1-uv[0]),y:h*(1-uv[1])},{x:0,y:0,w,h,rotation:plan.from.rotation});
  const box={...plan.from,x:anchor.x-delta.x,y:anchor.y-delta.y,w,h};
  return {box,handle:handlePoint(box,uv[0],uv[1]),anchor,pressed:f>=plan.start&&f<plan.end};
};

export const travel = (f:number,start:number,end:number,a:Point,b:Point,bend=0):Point => {
  const t=smooth(progress(f,start,end)),u=1-t,dx=b.x-a.x,dy=b.y-a.y;
  const c1={x:a.x+dx*.36-dy*bend,y:a.y+dy*.36+dx*bend};
  const c2={x:a.x+dx*.76-dy*bend,y:a.y+dy*.76+dx*bend};
  return {x:u*u*u*a.x+3*u*u*t*c1.x+3*u*t*t*c2.x+t*t*t*b.x,y:u*u*u*a.y+3*u*u*t*c1.y+3*u*t*t*c2.y+t*t*t*b.y};
};
export type CursorSegment = {start:number;end:number} & (
  | {kind:'move';from:Point;to:Point;bend?:number}
  | {kind:'hold';point:Point}
  | {kind:'follow';pointAt:(frame:number)=>Point}
);
/** Gaps hold the preceding end pose; seeking backwards has no side effects. */
export const cursorTrack = (frame:number,segments:readonly CursorSegment[]):Point => {
  if (!segments.length) throw new Error('Cursor track requires a segment');
  const sorted=[...segments].sort((a,b)=>a.start-b.start);
  for(let i=1;i<sorted.length;i++) if(sorted[i].start<sorted[i-1].end) throw new Error('Cursor segments overlap');
  let chosen=sorted[0];
  for(const segment of sorted) {if(segment.start>frame) break;chosen=segment;}
  const f=Math.max(chosen.start,Math.min(chosen.end,frame));
  return chosen.kind==='hold'?chosen.point:chosen.kind==='follow'?chosen.pointAt(f):travel(f,chosen.start,chosen.end,chosen.from,chosen.to,chosen.bend);
};

export type Stroke = {points: readonly Point[];width:number;start:number;end:number};
/** The visible trail and brush tip share arc-length interpolation on one polyline. */
export const strokeAt = (frame:number,stroke:Stroke) => {
  if(stroke.points.length<2) throw new Error('Brush stroke needs at least two points');
  if(stroke.width<=0) throw new Error('Brush width must be positive');
  const lengths=stroke.points.slice(1).map((p,i)=>Math.hypot(p.x-stroke.points[i].x,p.y-stroke.points[i].y));
  const total=lengths.reduce((a,b)=>a+b,0), t=progress(frame,stroke.start,stroke.end);
  let remaining=total*t;
  const points:Point[]=[stroke.points[0]];
  for(let i=0;i<lengths.length;i++) {
    const a=stroke.points[i],b=stroke.points[i+1],length=lengths[i];
    if(length===0) continue;
    if(remaining>=length){points.push(b);remaining-=length;}
    else {const p=remaining/length;points.push({x:mix(a.x,b.x,p),y:mix(a.y,b.y,p)});break;}
  }
  return {tip:points[points.length-1],path:points.map((p,i)=>`${i?'L':'M'}${p.x} ${p.y}`).join(' '),visible:frame>=stroke.start,active:frame>=stroke.start&&frame<=stroke.end,progress:t};
};

export const graphemes = (text:string):string[] => Array.from(new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(text),x=>x.segment);
export const typingAt = (text:string,frame:number,revealFrames:readonly number[]) => {
  const chars=graphemes(text);
  if(revealFrames.length!==chars.length) throw new Error('Each grapheme, including a newline, needs one reveal frame');
  if(revealFrames.some((n,i)=>i>0&&n<revealFrames[i-1])) throw new Error('Text reveal frames must be sorted');
  return chars.slice(0,revealFrames.filter(n=>frame>=n).length).join('');
};

export type Layer = {
  id:string;name:string;kind?:'image'|'text'|'group';visible:boolean;
  opacity?:number;box?:Box;text?:string;color?:string;contentId?:string;
  expanded?:boolean;children?:Layer[];
};
/** Arrays are bottom-to-top paint order, including each group's children. */
export type DocumentState = {layers:Layer[];selectedId:string|null;size?:Size};
export type EditAction = {at:number} & (
  | {type:'select';id:string}
  | {type:'update';id:string;patch:Partial<Pick<Layer,'name'|'visible'|'opacity'|'box'|'text'|'color'|'expanded'>>}
  | {type:'duplicate';id:string;newId:string;name?:string;offset?:Point}
  | {type:'reorder';id:string;toIndex:number}
  | {type:'resize-canvas';size:Size}
  | {type:'undo'}
  | {type:'redo'}
);
export const findLayer = (layers:readonly Layer[],id:string):Layer|undefined => {
  for(const layer of layers){if(layer.id===id)return layer;const child=findLayer(layer.children??[],id);if(child)return child;}
};
const siblingList = (layers:Layer[],id:string):Layer[]|undefined => {
  if(layers.some(l=>l.id===id))return layers;
  for(const layer of layers){const list=siblingList(layer.children??[],id);if(list)return list;}
};
const assertUnique = (layers:readonly Layer[],seen=new Set<string>()) => {
  for(const l of layers){if(seen.has(l.id))throw new Error(`Duplicate layer id: ${l.id}`);seen.add(l.id);assertUnique(l.children??[],seen);}
};
export const evaluateDocument = (initial:DocumentState,actions:readonly EditAction[],frame:number):DocumentState => {
  assertUnique(initial.layers);
  let history=[structuredClone(initial)],index=0;
  for(const action of [...actions].sort((a,b)=>a.at-b.at)) {
    if(action.at>frame) break;
    if(action.type==='undo'){index=Math.max(0,index-1);continue;}
    if(action.type==='redo'){index=Math.min(history.length-1,index+1);continue;}
    const state=structuredClone(history[index]);
    if(action.type==='resize-canvas'){
      state.size=validSize(action.size);history=history.slice(0,index+1);history.push(state);index++;continue;
    }
    const layer=findLayer(state.layers,action.id);
    if(!layer)throw new Error(`Unknown layer: ${action.id}`);
    if(action.type==='select'){state.selectedId=action.id;history[index]=state;continue;}
    if(action.type==='update')Object.assign(layer,action.patch);
    if(action.type==='duplicate') {
      const clone=structuredClone(layer),oldId=clone.id;
      const rename=(l:Layer)=>{l.id=l.id===oldId?action.newId:`${action.newId}/${l.id}`;l.children?.forEach(rename);};
      rename(clone);clone.name=action.name??`${clone.name} copy`;
      if(clone.box)clone.box={...clone.box,x:clone.box.x+(action.offset?.x??0),y:clone.box.y+(action.offset?.y??0)};
      const siblings=siblingList(state.layers,action.id)!;siblings.splice(siblings.indexOf(layer)+1,0,clone);state.selectedId=clone.id;
    }
    if(action.type==='reorder') {
      const siblings=siblingList(state.layers,action.id)!;
      siblings.splice(siblings.indexOf(layer),1);siblings.splice(Math.max(0,Math.min(siblings.length,action.toIndex)),0,layer);
    }
    assertUnique(state.layers);history=history.slice(0,index+1);history.push(state);index++;
  }
  return structuredClone(history[index]);
};
export const panelRows = (layers:readonly Layer[],depth=0,parentVisible=true):{layer:Layer;depth:number;effectiveVisible:boolean}[] =>
  [...layers].reverse().flatMap(layer=>[
    {layer,depth,effectiveVisible:parentVisible&&layer.visible},
    ...(layer.expanded?panelRows(layer.children??[],depth+1,parentVisible&&layer.visible):[]),
  ]);
export type PaletteLayout = {x:number;y:number;w:number;h:number;border:number;title:number;options:number;row:number;eye:number};
export const layerEyePoint = (state:DocumentState,id:string,layout:PaletteLayout):Point => {
  const index=panelRows(state.layers).findIndex(r=>r.layer.id===id);
  if(index<0)throw new Error(`Layer is not visible in palette (expand its parent): ${id}`);
  return {x:layout.x+layout.border+layout.eye/2,y:layout.y+layout.border+layout.title+layout.options+layout.row*(index+.5)};
};
