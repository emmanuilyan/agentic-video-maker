import React from 'react';
import {Img, staticFile} from 'remotion';
import {beats, storyAssets, video, type StoryBeat} from './timeline';

type StoryAsset = {src: string; objectPosition?: string; credit?: string};
const assets = storyAssets as Record<string, StoryAsset>;
const storyBeats = beats as StoryBeat[];
const worldScreenY = (worldY: number, cameraY: number) => video.floorScreenY - worldY + cameraY;

export const StoryWorld: React.FC<{frame: number; cameraY: number; ink: string; accent: string}> = ({frame, cameraY, ink, accent}) => <>
  {storyBeats.filter(beat => frame >= beat.startFrame && frame < beat.endFrame).map(beat => {
    const asset = beat.asset ? assets[beat.asset] : undefined;
    const width = beat.width ?? 520;
    const left = (beat.worldX ?? 540) - width / 2;
    const top = worldScreenY(beat.worldY ?? 0, cameraY) - width * 0.68;
    return <div key={beat.id} style={{position:'absolute', left, top, width}}>
      {asset && <div style={{background:'#fff', border:`5px solid ${ink}`, borderRadius:24, overflow:'hidden', boxShadow:'0 18px 40px #0002'}}>
        <Img src={staticFile(asset.src)} style={{display:'block', width:'100%', height:Math.round(width * 0.62), objectFit:'cover', objectPosition:asset.objectPosition ?? '50% 50%'}}/>
      </div>}
      {(beat.date || beat.title) && <div style={{marginTop:14, color:ink, textAlign:'center', textShadow:'0 2px 0 #fff', lineHeight:1.05}}>
        {beat.date && <div style={{fontSize:25, fontWeight:800, letterSpacing:2, color:accent}}>{beat.date}</div>}
        {beat.title && <div style={{fontSize:34, fontWeight:850, marginTop:5}}>{beat.title}</div>}
      </div>}
    </div>;
  })}
</>;
