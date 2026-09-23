import assert from 'node:assert/strict';
import {readFileSync,mkdtempSync,writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import os from 'node:os';
import path from 'node:path';

const project=path.resolve(process.argv[2]??process.cwd());
const require=createRequire(path.join(project,'package.json'));
const ts=require('typescript');
const folder=path.resolve(project,process.argv[3]??'src/paint-full');
const tmp=mkdtempSync(path.join(os.tmpdir(),'paint-full-check-'));
const source=readFileSync(path.join(folder,'core.ts'),'utf8');
writeFileSync(path.join(tmp,'core.cjs'),ts.transpileModule(source,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText);
const api=require(path.join(tmp,'core.cjs'));
let tests=0;
const test=(name,run)=>{run();tests++;};
const near=(a,b)=>assert.ok(Math.abs(a-b)<1e-8,`${a} != ${b}`);
const point=(a,b)=>{near(a.x,b.x);near(a.y,b.y);};

for(const corner of ['nw','ne','sw','se'])test(`fixed opposite anchor ${corner}`,()=>{
  const plan={from:{x:170,y:190,w:100,h:140,rotation:27},toSize:{w:280,h:205},start:10,end:30,corner};
  const uv={nw:[1,1],ne:[0,1],sw:[1,0],se:[0,0]}[corner];
  const expected=api.handlePoint(plan.from,...uv);
  for(let frame=0;frame<45;frame++){
    const drag=api.cornerDrag(frame,plan);point(api.handlePoint(drag.box,...uv),expected);
    point(api.cursorTrack(frame,[{kind:'follow',start:10,end:30,pointAt:f=>api.toScreen(api.cornerDrag(f,plan).handle,{x:25,y:60},{pan:{x:-20,y:30},zoom:1.5})}]),api.toScreen(drag.handle,{x:25,y:60},{pan:{x:-20,y:30},zoom:1.5}));
  }
});
test('cursor gaps, boundaries and seeking',()=>{
  const track=[{kind:'move',start:10,end:20,from:{x:0,y:0},to:{x:10,y:20}},{kind:'hold',start:30,end:40,point:{x:25,y:30}}];
  point(api.cursorTrack(-10,track),{x:0,y:0});point(api.cursorTrack(25,track),{x:10,y:20});
  point(api.cursorTrack(30,track),{x:25,y:30});point(api.cursorTrack(100,track),{x:25,y:30});point(api.cursorTrack(10,track),{x:0,y:0});
});
test('brush tip follows arc length and holds its trail',()=>{
  const stroke={points:[{x:0,y:0},{x:0,y:0},{x:100,y:0},{x:100,y:300}],width:30,start:10,end:50};
  point(api.strokeAt(20,stroke).tip,{x:100,y:0});point(api.strokeAt(30,stroke).tip,{x:100,y:100});point(api.strokeAt(80,stroke).tip,{x:100,y:300});
  assert.equal(api.strokeAt(9,stroke).visible,false);assert.equal(api.strokeAt(10,stroke).visible,true);
  assert.equal(api.strokeAt(80,stroke).path,api.strokeAt(50,stroke).path);
});
test('Unicode graphemes remain intact',()=>{
  const text='A👩‍🚀é\nЯ',frames=[1,2,3,4,5];
  assert.equal(api.graphemes(text).length,5);assert.equal(api.typingAt(text,2,frames),'A👩‍🚀');assert.equal(api.typingAt(text,99,frames),text);
  assert.throws(()=>api.typingAt(text,5,[1,2]),/grapheme/);
});
const initial={selectedId:'a',layers:[{id:'a',name:'A',visible:true,box:{x:10,y:20,w:30,h:40}},{id:'b',name:'B',visible:true}]};
test('duplicate, reorder, undo and redo preserve previous snapshots',()=>{
  const edits=[{at:1,type:'duplicate',id:'a',newId:'c',offset:{x:50,y:10}},{at:2,type:'reorder',id:'a',toIndex:2},{at:3,type:'undo'},{at:4,type:'redo'}];
  assert.deepEqual(api.evaluateDocument(initial,edits,1).layers.map(x=>x.id),['a','c','b']);
  assert.deepEqual(api.evaluateDocument(initial,edits,2).layers.map(x=>x.id),['c','b','a']);
  assert.deepEqual(api.evaluateDocument(initial,edits,3).layers.map(x=>x.id),['a','c','b']);
  assert.deepEqual(api.evaluateDocument(initial,edits,4).layers.map(x=>x.id),['c','b','a']);
  assert.equal(api.findLayer(api.evaluateDocument(initial,edits,1).layers,'c').box.x,60);
  assert.deepEqual(initial.layers.map(x=>x.id),['a','b']);assert.equal(initial.layers[0].box.x,10);
});
test('a new edit after Undo discards the old redo branch',()=>{
  const edits=[{at:1,type:'update',id:'a',patch:{visible:false}},{at:2,type:'undo'},{at:3,type:'update',id:'b',patch:{name:'Changed'}},{at:4,type:'redo'}];
  const state=api.evaluateDocument(initial,edits,10);assert.equal(state.layers[0].visible,true);assert.equal(state.layers[1].name,'Changed');
});
test('nested groups keep unique clone IDs and inherited visibility',()=>{
  const tree={selectedId:'g',layers:[{id:'g',name:'Group',kind:'group',visible:false,expanded:true,children:[{id:'child',name:'Child',visible:true}]}]};
  const state=api.evaluateDocument(tree,[{at:1,type:'duplicate',id:'g',newId:'g2'}],1);
  assert.ok(api.findLayer(state.layers,'g2/child'));assert.equal(api.panelRows(state.layers).find(r=>r.layer.id==='child').effectiveVisible,false);
  assert.throws(()=>api.evaluateDocument(tree,[{at:1,type:'duplicate',id:'g',newId:'g'}],1),/Duplicate/);
});
test('palette contact uses the actual displayed row',()=>{
  const layout={x:100,y:200,w:300,h:300,border:3,title:30,options:40,row:50,eye:40};
  point(api.layerEyePoint(initial,'a',layout),{x:123,y:348});
  const reordered=api.evaluateDocument(initial,[{at:1,type:'reorder',id:'a',toIndex:1}],1);
  point(api.layerEyePoint(reordered,'a',layout),{x:123,y:298});
});
test('evaluation is seek-safe and returns detached state',()=>{
  const edits=[{at:10,type:'update',id:'a',patch:{visible:false}}];
  api.evaluateDocument(initial,edits,20).layers[0].name='external mutation';
  assert.deepEqual(api.evaluateDocument(initial,edits,0),initial);assert.equal(api.evaluateDocument(initial,edits,20).layers[0].name,'A');
});
test('locked and free dimensions use the intended axis',()=>{
  assert.deepEqual(api.resizeDimensions({w:200,h:100},{w:400,h:300},true),{w:400,h:200});
  assert.deepEqual(api.resizeDimensions({w:200,h:100},{h:300},true),{w:600,h:300});
  assert.deepEqual(api.resizeDimensions({w:200,h:100},{w:400,h:300},false),{w:400,h:300});
  for(let f=0;f<40;f++){
    const {box}=api.cornerDrag(f,{from:{x:0,y:0,w:200,h:100,rotation:17},toSize:{w:400,h:300},start:5,end:25,lockAspect:true});
    near(box.w/box.h,2);
  }
});
test('aspect presets and custom proportions resolve pixel sizes',()=>{
  assert.deepEqual(api.sizeForRatio('9:16'),{w:1080,h:1920});
  assert.deepEqual(api.sizeForRatio('1:1'),{w:1080,h:1080});
  assert.deepEqual(api.sizeForRatio('16:9',1920),{w:1920,h:1080});
  assert.deepEqual(api.sizeForRatio({w:2,h:3},800),{w:800,h:1200});
});
test('fitted document stays inside the fixed workspace',()=>{
  for(const ratio of Object.keys(api.aspectPresets)){
    const result=api.fitDocument(api.sizeForRatio(ratio),{w:800,h:1200},40);
    near(result.box.x+result.box.w/2,400);near(result.box.y+result.box.h/2,600);
    assert.ok(result.box.x>=40-1e-8&&result.box.y>=40-1e-8);
    assert.ok(result.box.w<=720+1e-8&&result.box.h<=1120+1e-8);
  }
});
test('content fit distinguishes keep-size, fit, fill and stretch',()=>{
  const source={w:800,h:600},target={w:600,h:1000};
  assert.deepEqual(api.contentFit(source,target,'preserve'),{x:-100,y:200,scaleX:1,scaleY:1});
  assert.deepEqual(api.contentFit(source,target,'contain'),{x:0,y:275,scaleX:.75,scaleY:.75});
  const fill=api.contentFit(source,target,'cover');near(fill.scaleX,5/3);near(fill.scaleY,5/3);near(fill.y,0);
  const stretch=api.contentFit(source,target,'stretch');near(stretch.scaleX,.75);near(stretch.scaleY,5/3);
  point(api.contentPoint({x:400,y:300},api.contentFit(source,target,'contain')),{x:300,y:500});
});
test('canvas size participates in Undo and Redo without modifying layers',()=>{
  const original={...initial,size:{w:720,h:1280}};
  const events=[{at:10,type:'resize-canvas',size:{w:1080,h:1080}},{at:20,type:'undo'},{at:30,type:'redo'}];
  assert.deepEqual(api.evaluateDocument(original,events,10).size,{w:1080,h:1080});
  assert.deepEqual(api.evaluateDocument(original,events,20).size,original.size);
  assert.deepEqual(api.evaluateDocument(original,events,30).size,{w:1080,h:1080});
  assert.deepEqual(api.evaluateDocument(original,events,30).layers,initial.layers);
});
test('invalid sizes and impossible canvas padding are rejected',()=>{
  assert.throws(()=>api.resizeDimensions({w:20,h:20},{w:0}),/positive/);
  assert.throws(()=>api.resizeDimensions({w:20,h:20},{h:NaN}),/positive/);
  assert.throws(()=>api.fitDocument({w:100,h:100},{w:50,h:80},30),/Padding/);
});
console.log(`paint-full toolkit: ${tests} behavior checks passed`);
