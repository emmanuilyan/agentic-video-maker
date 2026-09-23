import React from 'react';
import {AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {Audio} from '@remotion/media';
import skins from './data/skins.json';
import {camera, landings, landingCues, video} from './timeline';
import {clamp, poseAt} from './engine';
import {Captions} from './Captions';
import {StoryWorld} from './Story';

type Theme = keyof typeof skins;
const texture = (path: string) => `url("${staticFile(path)}")`;
const worldScreenY = (worldY: number, cameraY: number) => video.floorScreenY - worldY + cameraY;
const themeAt = (frame: number) => video.themeChanges.filter(change => change.frame <= frame).at(-1)!.theme as Theme;

const Environment: React.FC<{theme: Theme; cameraY: number; opacity?:number}> = ({theme, cameraY, opacity=1}) => {
  const skin = skins[theme];
  return <AbsoluteFill style={{opacity}}>
    <AbsoluteFill style={{backgroundColor:skin.paper}}/>
    <AbsoluteFill style={{backgroundImage:texture(skin.paperTile), backgroundSize:'512px 512px',
      backgroundPositionY:cameraY * 0.16, opacity:theme === 'garden' ? 0.48 : 0.19}}/>
    <div style={{position:'absolute', width:850, height:850, top:460, left:90, borderRadius:'50%',
      background:`radial-gradient(circle, ${skin.wash}dd 0%, ${skin.wash}00 69%)`}}/>
    {Array.from({length:Math.max(18,Math.ceil((camera.at(-1) ?? 0)*0.45/320)+9)}, (_, i) => {
      const lane = i % 3;
      const y = 1520 - i * 320 + cameraY * (lane === 2 ? 0.23 : 0.45);
      if (y < -650 || y > 1960) return null;
      const width = lane === 2 ? 380 : lane === 1 ? 230 : 100;
      return <Img key={i} src={staticFile(skin.decor[lane])}
        style={{position:'absolute', width, left:i % 2 === 0 ? -45 : 860,
          top:y, opacity:lane === 2 ? 0.16 : 0.48, rotate:`${lane === 0 ? (i % 2 ? 18 : -20) : 0}deg`}}/>;
    })}
  </AbsoluteFill>;
};

export const DoodleJump: React.FC = () => {
  const frame = useCurrentFrame();
  const pose = poseAt(frame, landings, video);
  const cameraY = camera[frame];
  const currentChange = video.themeChanges.filter(c => c.frame <= frame).at(-1)!;
  const changeIndex = video.themeChanges.indexOf(currentChange);
  const theme = currentChange.theme as Theme;
  const previousTheme = video.themeChanges[Math.max(0, changeIndex - 1)].theme as Theme;
  const skin = skins[theme];
  const blend = changeIndex === 0 ? 1 : clamp((frame - currentChange.frame) / 20);
  const scale = video.heroWidth / skin.hero.width;
  const heroY = worldScreenY(pose.y, cameraY);
  const endFrame = landings[landings.length - 1].frame;
  return <AbsoluteFill style={{background:skin.paper, fontFamily:'Arial, sans-serif', overflow:'hidden'}}>
    <Environment theme={previousTheme} cameraY={cameraY}/>
    <Environment theme={theme} cameraY={cameraY} opacity={blend}/>
    <svg width={1080} height={1920} style={{position:'absolute', opacity:0.12}}>
      <line x1={110} y1={80} x2={110} y2={1510} stroke={skin.ink} strokeWidth={2} strokeDasharray="5 13"/>
      {Array.from({length:11},(_,i)=><line key={i} x1={102} y1={100+i*140} x2={118} y2={100+i*140} stroke={skin.ink} strokeWidth={3}/>)}
    </svg>
    <div style={{position:'absolute',inset:0,clipPath:`inset(${video.worldTop}px 0px ${video.height-video.worldBottom}px 0px)`}}>
    {landings.map((platform, index) => {
      const y = worldScreenY(platform.y, cameraY);
      if(y < video.worldTop-100 || y > video.worldBottom+100) return null;
      const platformSkin = skins[themeAt(platform.frame)];
      const platformScale = platform.width / platformSkin.platform.width;
      const contactAge = frame - platform.frame;
      const impact = index && contactAge >= 0 && contactAge < 10 ? Math.sin((contactAge + 1) / 11 * Math.PI) : 0;
      return <React.Fragment key={platform.id}>
        <div style={{position:'absolute', left:platform.x-platform.width/2, top:y-platformSkin.platform.surfaceY*platformScale,
          width:platform.width, height:platformSkin.platform.height*platformScale}}>
          <Img src={staticFile(platformSkin.platform.src)} style={{width:'100%',height:'100%'}}/>
        </div>
        {impact > 0 && <svg width={180} height={80} style={{position:'absolute',left:platform.x-90,top:y-60,opacity:1-contactAge/10}}>
          {[-1,1].map(dir=><path key={dir} d={`M ${90+dir*48} 38 l ${dir*(20+impact*8)} -16 M ${90+dir*56} 52 l ${dir*(18+impact*8)} 1`}
            fill="none" stroke={skin.accent} strokeWidth={4} strokeLinecap="round"/>)}
        </svg>}
      </React.Fragment>;
    })}
    <StoryWorld frame={frame} cameraY={cameraY} ink={skin.ink} accent={skin.accent}/>
    <div style={{position:'absolute',left:pose.x, top:heroY, rotate:`${pose.rotation}deg`,
      scale:`${1+pose.squash*0.10} ${1-pose.squash*0.10}`}}>
      <Img src={staticFile(skin.hero.src)} style={{position:'absolute', width:video.heroWidth,
        height:skin.hero.height*scale, left:-skin.hero.anchorX*scale, top:-skin.hero.anchorY*scale}}/>
    </div>
    </div>
    {(video.title || video.eyebrow) && <div style={{position:'absolute',left:90,right:150,top:105,color:skin.ink}}>
      <div style={{fontSize:23,letterSpacing:4,fontWeight:600,opacity:0.6}}>{video.eyebrow}</div>
      <div style={{fontSize:68,letterSpacing:-2,fontWeight:800,lineHeight:1.08,marginTop:20}}>{video.title}</div>
      {video.title && <div style={{height:4,width:82,background:skin.accent,marginTop:28,rotate:'-2deg'}}/>}
    </div>}
    {frame >= endFrame && <div style={{position:'absolute', top:heroY-340,left:pose.x-60,
      fontSize:70,color:skin.accent,opacity:clamp((frame-endFrame)/10)}}>✦</div>}
    <Captions ink={skin.ink} accent={skin.accent}/>
    {video.footer && <div style={{position:'absolute',left:90,right:150,bottom:100,fontSize:20,letterSpacing:3,color:skin.ink,opacity:0.5}}>{video.footer}</div>}
    {video.narration && <Audio src={staticFile(video.narration)} volume={video.narrationVolume}/>}
    {video.sfx && landingCues.map(cue=><Sequence key={cue.id} name={`Landing ${cue.id}`} from={cue.frame} durationInFrames={6} layout="none">
      <Audio src={staticFile(video.sfx)} volume={video.sfxVolume}/>
    </Sequence>)}
  </AbsoluteFill>;
};
