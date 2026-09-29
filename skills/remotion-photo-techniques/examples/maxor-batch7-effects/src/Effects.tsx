import React from 'react';
import {AbsoluteFill, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';

const clamp={extrapolateLeft:'clamp' as const,extrapolateRight:'clamp' as const};
const ramp=(f:number,a:number,b:number)=>interpolate(f,[a,b],[0,1],clamp);
const plate=(name:string,style:React.CSSProperties={})=><Img src={staticFile(name)} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'cover',...style}}/>;

// 01 — one large title whose letters dissolve at slightly different moments.
// The fill is allowed to blend with the footage; it has no synthetic light/glow pass.
export const SkyrimTitle:React.FC=()=>{
  const f=useCurrentFrame(), enter=ramp(f,0,9), scene=ramp(f,36,45), letters=[...'SKYRIM'];
  return <AbsoluteFill style={{overflow:'hidden',background:'#08090c'}}>
    {plate('plate-skyrim.jpg',{opacity:1-scene,filter:'brightness(.68) saturate(.78)'})}
    {plate('plate-speed.jpg',{opacity:scene,filter:'brightness(.7) saturate(.82)'})}
    <AbsoluteFill style={{background:'linear-gradient(90deg,rgba(5,8,13,.2),transparent 45%,rgba(5,8,13,.25))'}}/>
    <div style={{position:'absolute',left:0,right:0,top:280,textAlign:'center',whiteSpace:'nowrap',fontFamily:'Georgia,serif',fontWeight:500,fontSize:236,letterSpacing:13,transform:`scale(${.91+.09*enter})`}}>
      {letters.map((ch,i)=>{const localOut=1-ramp(f,35+i*.55,43+i*.55);return <span key={i} style={{display:'inline-block',color:'rgba(238,240,245,.8)',opacity:enter*localOut*.72,mixBlendMode:'screen',WebkitTextStroke:'1px rgba(225,230,240,.3)',textShadow:'0 2px 3px #090a0d'}}>{ch}</span>})}
    </div>
    <div style={{position:'absolute',left:0,right:0,top:198,textAlign:'center',whiteSpace:'nowrap',fontFamily:'Georgia,serif',fontSize:61,letterSpacing:.2,color:'rgba(241,239,226,.84)',opacity:enter*(1-ramp(f,42,52))*.88,mixBlendMode:'screen',textShadow:'0 1px 2px #10131a'}}>The Elder Scrolls V</div>
  </AbsoluteFill>;
};

// 02 — caption is lavender/blue with a dark violet edge and compact shadow.
export const SpeedDisclaimer:React.FC=()=>{
  const f=useCurrentFrame(), p=ramp(f,21,48), captionIn=ramp(f,12,16), captionDrift=ramp(f,16,34), fade=1-ramp(f,40,49), x=-1500+p*1680, threshold=1-ramp(f,42,51), next=ramp(f,49,54);
  return <AbsoluteFill style={{overflow:'hidden',background:'#0b0d10'}}>{plate('plate-speed.jpg',{filter:'brightness(.72) contrast(1.12)',opacity:1-next})}{plate('plate-speed-next.jpg',{filter:'brightness(.76) contrast(1.08)',opacity:next})}{plate('plate-speed.jpg',{filter:`grayscale(1) contrast(${1+threshold*8}) brightness(${.82+threshold*.42})`,clipPath:`inset(0 ${100-p*100}% 0 0)`,opacity:threshold})}
    <div style={{position:'absolute',inset:0,background:'#07090c',mixBlendMode:'multiply',opacity:threshold*.5}}/>
    <div style={{position:'absolute',top:-30,bottom:-30,left:x-220,width:1480,background:'linear-gradient(90deg,transparent,#fff 43%,#f4f5f2 57%,transparent)',transform:'skewX(-22deg)',mixBlendMode:'screen',opacity:(1-ramp(f,45,54))*.98}}/>
    <div style={{position:'absolute',top:104,left:0,right:0,textAlign:'center',fontFamily:'Arial,sans-serif',fontWeight:700,fontSize:59,color:'#aaaefa',letterSpacing:.1,WebkitTextStroke:'1.25px #34315f',textShadow:'0 2px 2px #11101f,1px 2px 1px #25234e',opacity:fade*captionIn,transform:`translateX(${-54-captionDrift*140}px)`}}>This footage isn’t sped up.</div>
  </AbsoluteFill>;
};

// 03 — source-derived picture inserts hard-pop in; the callout is a Japan map silhouette.
export const JapanMapCallout:React.FC=()=>{
  const frame=useCurrentFrame(), f=frame-11, mapOn=f>=2, panelOn=f>=17, sceneCut=frame>=56, calloutOut=sceneCut?0:1;
  return <AbsoluteFill style={{overflow:'hidden'}}>{plate('plate-japan.jpg',{filter:'brightness(.68) saturate(.82)',opacity:1-(sceneCut?1:0)})}{plate('plate-europe.jpg',{filter:'brightness(.76) saturate(.9)',opacity:sceneCut?1:0})}<AbsoluteFill style={{background:'rgba(4,7,11,.2)',opacity:calloutOut}}/>
    {panelOn&&<Img src={staticFile('japan-anime-panel-clean.png')} style={{position:'absolute',left:105,top:273,width:640,height:390,objectFit:'fill',boxShadow:'0 8px 18px #0009',opacity:calloutOut}}/>}
    {panelOn&&<Img src={staticFile('japan-map-inset.png')} style={{position:'absolute',right:0,bottom:0,width:440,height:245,objectFit:'fill',opacity:calloutOut}}/>}
    <div style={{position:'absolute',top:32,left:52,zIndex:5,fontFamily:'Arial,sans-serif',fontSize:172,fontWeight:900,color:'#ed101c',letterSpacing:1,WebkitTextStroke:'3px #211014',paintOrder:'stroke fill',textShadow:'4px 6px 1px #10090b,0 0 4px #10090b',opacity:mapOn?calloutOut:0}}>日本語</div>
    {mapOn&&<Img src={staticFile('japan-map-overlay-v2.png')} style={{position:'absolute',inset:0,width:'100%',height:'100%',objectFit:'fill',zIndex:20,opacity:calloutOut}}/>}
  </AbsoluteFill>;
};

// 04 — centered type-on copy; the final word waits for the map expansion peak.
export const EasternEuropeScale:React.FC=()=>{
  const f=useCurrentFrame(), title=ramp(f,0,11), titleOut=1-ramp(f,43,51), overlay=ramp(f,43,54), expand=ramp(f,60,78), phrase=ramp(f,82,98), than=ramp(f,100,108), africa=ramp(f,108,120), scaleTag=ramp(f,126,138), lands=ramp(f,82,98), out=1-ramp(f,140,150);
  const mapW=360+920*expand, mapH=205+515*expand, mapTop=18*(1-expand), mapRight=24*(1-expand);
  const first='slightly larger'; const chars=Math.floor(phrase*first.length);
  return <AbsoluteFill style={{overflow:'hidden',background:'#10131a'}}>{plate('plate-europe.jpg',{filter:'brightness(.68) saturate(.84)'})}
    <div style={{position:'absolute',left:0,right:0,top:238,textAlign:'center',fontFamily:'Georgia,serif',fontSize:61,fontWeight:700,letterSpacing:4,color:'#f4f2e9',textShadow:'0 2px 8px #000',opacity:title*titleOut*out,transform:`translateY(${(1-title)*28}px)`}}>EASTERN EUROPE</div>
    <div style={{position:'absolute',left:'22%',right:'22%',top:319,height:3,background:'#f5f3eb',transform:`scaleX(${title})`,transformOrigin:'center',opacity:title*titleOut*out}}/>
    <Img src={staticFile('europe-map-card.jpg')} style={{position:'absolute',top:mapTop,right:mapRight,width:mapW,height:mapH,objectFit:'cover',opacity:overlay,border:'2px solid rgba(225,222,204,.7)',boxShadow:'0 4px 20px #0009'}}/>
    {/* Geographic regions use the same map texture rather than floating opaque stickers. */}
    <div style={{position:'absolute',left:4,top:225,width:480,height:298,opacity:lands,backgroundImage:'linear-gradient(rgba(22,111,226,.62),rgba(17,77,198,.62))',mixBlendMode:'color',maskImage:`url(${staticFile('us-continent.svg')})`,WebkitMaskImage:`url(${staticFile('us-continent.svg')})`,maskSize:'100% 100%',WebkitMaskSize:'100% 100%',maskRepeat:'no-repeat',WebkitMaskRepeat:'no-repeat',filter:'contrast(1.18)'}}/>
    <div style={{position:'absolute',left:405,top:88,width:470,height:548,opacity:lands,backgroundImage:'linear-gradient(rgba(230,58,72,.67),rgba(193,24,47,.67))',mixBlendMode:'color',maskImage:`url(${staticFile('africa-continent.svg')})`,WebkitMaskImage:`url(${staticFile('africa-continent.svg')})`,maskSize:'100% 100%',WebkitMaskSize:'100% 100%',maskRepeat:'no-repeat',WebkitMaskRepeat:'no-repeat',filter:'contrast(1.22)'}}/>
    <div style={{position:'absolute',right:4,top:225,width:480,height:298,opacity:lands,backgroundImage:'linear-gradient(rgba(76,101,224,.62),rgba(67,55,188,.62))',mixBlendMode:'color',maskImage:`url(${staticFile('us-continent.svg')})`,WebkitMaskImage:`url(${staticFile('us-continent.svg')})`,maskSize:'100% 100%',WebkitMaskSize:'100% 100%',maskRepeat:'no-repeat',WebkitMaskRepeat:'no-repeat',filter:'contrast(1.18)'}}/>
    <div style={{position:'absolute',left:0,right:0,top:'50%',transform:'translateY(-50%)',display:'flex',flexDirection:'column',alignItems:'center',gap:14,opacity:out}}>
      <div style={{width:'100%',textAlign:'center',fontFamily:'Georgia,serif',fontWeight:700,fontSize:58,lineHeight:1.02,color:'#fff',textShadow:'0 3px 8px #000,0 0 10px #111'}}>{first.slice(0,chars)}</div>
      <div style={{width:'100%',textAlign:'center',fontFamily:'Georgia,serif',fontWeight:700,fontSize:62,color:'#fff',textShadow:'0 3px 8px #000'}}><span style={{opacity:than}}>than</span><span style={{opacity:africa,marginLeft:12}}>Africa</span></div>
      <div style={{width:'100%',textAlign:'center',fontFamily:'Georgia,serif',fontSize:54,fontWeight:700,color:'#fff',textShadow:'0 2px 7px #000,0 0 5px #111',opacity:scaleTag}}>(to scale)</div>
    </div>
  </AbsoluteFill>;
};

// 05 — chunky copies, glyph-confined RGB jitter and a color-burn background pass.
export const RGBBlockGlitch:React.FC=()=>{
  const f=useCurrentFrame(), cut=ramp(f,78,86), flash=Math.max(0,1-Math.abs(f-107)/4), fade=1-ramp(f,75,83), glitchIn=ramp(f,0,6), duplicate=ramp(f,22,34)*(1-ramp(f,69,81)), glyph=ramp(f,29,40)*(1-ramp(f,70,81)), bgZoom=ramp(f,40,76), blockPhase=ramp(f,0,4)*(1-ramp(f,20,27)), stripePhase=1-ramp(f,12,23);
  const strips=Array.from({length:25},(_,i)=>{const left=315+i*28, pulse=Math.max(0,1-Math.abs(((f*2+i*5)%26)-13)/13);return {i,left,pulse,top:55+(i*97)%430,width:21+(i%4)*7,height:155+(i*59)%300};});
  const tiles=Array.from({length:195},(_,i)=>({i,left:185+(i*59)%800,top:55+(i*43)%650,width:40+(i*23)%102,height:32+(i*37)%120,dx:((i*13+f*4)%43)-21,dy:((i*19+f*3)%37)-18}));
  const runes=[...'ᚱᚦᚷᚱᚦᚷᚱᚦ'];
  return <AbsoluteFill style={{overflow:'hidden',background:'#08090d'}}>{plate('glitch-pre.jpg',{opacity:1-cut,filter:`brightness(${.72+glitchIn*.55}) saturate(${1+bgZoom*.45+flash*1.6}) contrast(${1.8+bgZoom*.18+flash*.45}) hue-rotate(${bgZoom*7+flash*20}deg)`,transform:`translateX(${(f<80?0:-(f-80)*28)+Math.sin(f*2)*flash*14}px) scale(${1.04+bgZoom*.2+flash*.07}) skewX(${Math.sin(f*3)*flash*2}deg)`})}{plate('glitch-next.jpg',{opacity:cut,clipPath:'inset(3%)',filter:`brightness(.88) saturate(${1.05+bgZoom*.4+flash*1.6}) contrast(${1.1+bgZoom*.16+flash*.6}) hue-rotate(${bgZoom*7+flash*20}deg)`,transform:`translateX(${(1-cut)*90+Math.sin(f*2)*flash*14}px) scale(${1.08+bgZoom*.16+flash*.07}) skewX(${Math.sin(f*3)*flash*2}deg)`})}
    {tiles.map(t=><div key={t.i} style={{position:'absolute',left:t.left,top:t.top,width:t.width,height:t.height,overflow:'hidden',opacity:blockPhase*(.55+(t.i%5)*.09),mixBlendMode:t.i%3?'screen':'lighten',background:['#07efff','#f5ffff','#ed1ac7'][t.i%3],transform:`translate(${t.dx}px,${t.dy}px)`}}><Img src={staticFile('glitch-pre.jpg')} style={{position:'absolute',left:-t.left+t.dx,top:-t.top+t.dy,width:1280,height:720,objectFit:'cover',mixBlendMode:'screen',filter:t.i%2?'grayscale(1) contrast(4) brightness(2.2) sepia(1) hue-rotate(145deg)':'grayscale(1) contrast(5) brightness(2.4) sepia(1) hue-rotate(180deg)'}}/></div>)}
    <AbsoluteFill style={{position:'absolute',inset:0,overflow:'hidden',opacity:duplicate*.96,mixBlendMode:'screen',clipPath:'polygon(53% 0,100% 0,100% 100%,60% 100%,55% 76%,52% 56%,49% 35%)'}}>{plate('plate-glitch-b.jpg',{transform:'translateX(155px) scale(1.65)',filter:'grayscale(1) contrast(1.25) brightness(5.5) sepia(1) hue-rotate(285deg)'})}</AbsoluteFill>
    <AbsoluteFill style={{position:'absolute',inset:0,overflow:'hidden',opacity:duplicate*.72,mixBlendMode:'screen',clipPath:'polygon(0 48%,42% 48%,48% 61%,46% 100%,0 100%)'}}>{plate('plate-glitch-b.jpg',{transform:'translateX(-145px) scale(1.05)',filter:'grayscale(1) contrast(1.2) brightness(4.2) sepia(1) hue-rotate(145deg)'})}</AbsoluteFill>
    <AbsoluteFill style={{background:'linear-gradient(110deg,rgba(13,154,178,.82) 0%,rgba(106,37,100,.72) 48%,rgba(214,56,31,.82) 100%)',mixBlendMode:'color-burn',opacity:.56*glyph}}/>
    <AbsoluteFill style={{background:'linear-gradient(115deg,rgba(8,187,208,.33),transparent 42%,rgba(231,39,104,.3) 74%,rgba(223,65,31,.24))',mixBlendMode:'color',opacity:.54*glyph}}/>
    <AbsoluteFill style={{background:'linear-gradient(108deg,rgba(0,154,190,.32),rgba(97,30,112,.25) 48%,rgba(214,43,39,.38))',mixBlendMode:'color-burn',opacity:bgZoom*.62}}/>
    <AbsoluteFill style={{background:'linear-gradient(110deg,rgba(0,154,190,.25),rgba(97,30,112,.18) 48%,rgba(214,43,39,.28))',mixBlendMode:'color',opacity:bgZoom*.45}}/>
    <div style={{position:'absolute',left:0,right:0,top:'32%',display:'flex',justifyContent:'center',gap:9,opacity:glyph*fade*.62,fontFamily:'Georgia,serif',fontSize:112,fontWeight:900,letterSpacing:18}}>{runes.map((ch,i)=>{const jitter=(Math.sin(f*2.9+i*7.7)>.45?Math.sin(f*4+i)*11:0);const pulse=(Math.sin(f*1.7+i*11)>0.84);return <span key={i} style={{position:'relative',display:'inline-block',color:'#f7f6ec',transform:`translate(${jitter}px,${pulse?Math.sin(f*6+i)*5:0}px) skewX(${pulse?Math.cos(f+i)*13:0}deg)`,textShadow:`${pulse?7:3}px 0 #ed20cb,${pulse?-7:-3}px 0 #14eaff,0 0 8px #fff`,clipPath:pulse?'inset(0 0 0 0)':'none'}}>{ch}{pulse&&<span style={{position:'absolute',inset:0,color:'#08edff',transform:`translateX(${Math.sin(f*9+i)*9}px)`,clipPath:`inset(${20+(i*13)%50}% 0 ${15+(i*7)%35}% 0)`}}>{ch}</span>}</span>})}</div>
    <AbsoluteFill style={{background:'linear-gradient(112deg,rgba(0,228,255,.7) 0%,rgba(0,206,249,.45) 28%,rgba(239,26,154,.55) 63%,rgba(255,61,33,.72) 100%)',mixBlendMode:'color-dodge',opacity:flash*.78}}/>
    <AbsoluteFill style={{background:'radial-gradient(ellipse at 50% 48%,transparent 12%,rgba(9,241,255,.78) 15%,transparent 22%,rgba(245,27,224,.72) 28%,transparent 36%,rgba(20,233,255,.42) 43%,transparent 50%)',mixBlendMode:'screen',opacity:flash*.7,transform:`scale(${.6+flash*1.2})`}}/>
    {strips.map(s=><React.Fragment key={s.i}><div style={{position:'absolute',left:s.left,top:s.top,width:s.width,height:s.height,overflow:'hidden',opacity:s.pulse*fade*glitchIn*stripePhase,mixBlendMode:'screen',transform:`translateX(${(s.i%3-1)*12}px)`}}><Img src={staticFile('glitch-pre.jpg')} style={{position:'absolute',left:-s.left+(s.i%3-1)*18,top:-s.top,width:1280,height:720,objectFit:'cover',filter:`grayscale(1) contrast(3.5) brightness(3) sepia(1) hue-rotate(${s.i%2?145:180}deg)`}}/></div></React.Fragment>)}
    <AbsoluteFill style={{background:'#eefcff',mixBlendMode:'screen',opacity:flash*.68}}/>
  </AbsoluteFill>;
};

// 06 — left-to-right type-on, arched headline and thin condensed subtitle.
export const MargitFrameTitle:React.FC=()=>{
  const f=useCurrentFrame(), frame=ramp(f,0,12), title=ramp(f,9,19), out=1-ramp(f,39,49), main=[...'MARGARET'], sub='THE FELL REFUND';
  return <AbsoluteFill style={{overflow:'hidden'}}>{plate('plate-margit.jpg',{filter:'grayscale(.35) brightness(1.08) contrast(1.1)',transform:'scale(1.08)'})}<AbsoluteFill style={{background:'rgba(5,7,10,.02)'}}/>
    <div style={{position:'absolute',inset:24,border:`8px solid rgba(224,236,184,${.76+.24*Math.sin(f*.6)})`,boxShadow:'0 0 20px #dce9b0, inset 0 0 14px #dce9b0',opacity:frame*out,transform:`scale(${.92+.08*frame})`}}/>
    <div style={{position:'absolute',left:50,top:'63%',height:150,display:'flex',alignItems:'center',whiteSpace:'nowrap',fontFamily:'Impact,Arial Black,sans-serif',fontSize:172,fontWeight:900,letterSpacing:3,filter:'drop-shadow(0 4px 2px #050509)'}}>
      {main.map((ch,i)=>{const on=ramp(f,9+i*1.35,11+i*1.35)*out;const y=-Math.sin((i/(main.length-1))*Math.PI)*17;const shown=i<Math.ceil(title*main.length);return <span key={i} style={{position:'relative',display:'inline-block',transform:`translateY(${y}px)`,opacity:shown?on:0,color:'#ffdf45',WebkitTextStroke:'1px #ffe650',textShadow:'6px 3px 0 #ed2486,10px 6px 2px #882354,0 0 4px #ffb4dc'}}>
        {ch}
      </span>})}
    </div>
    <div style={{position:'absolute',left:60,top:'85%',textAlign:'left',whiteSpace:'nowrap',fontFamily:'Arial Narrow,Roboto Condensed,Arial,sans-serif',fontSize:61,fontWeight:300,letterSpacing:5,color:'#e94bb4',WebkitTextStroke:'.6px #3a20aa',textShadow:'2px 2px 0 #243fbe',opacity:title*out,transform:`translateY(${(1-title)*-20}px)`}}>{sub}</div>
  </AbsoluteFill>;
};
