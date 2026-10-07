import React from 'react';
import {AbsoluteFill, Composition, useCurrentFrame} from 'remotion';
import {Comparison} from './Comparison';
import {TwitterBehindUI, ResolutionPunch, WatameSplit, PresidentPileup} from './Effects';
const effects = [
  {id: 'MG-LOGO-UI-BLEND', n: 72, src: 'twitter-source.mp4', label: '01:10.400–01:11.600', effect: TwitterBehindUI},
  {id: 'MG-SETTING-ARROW-ZOOM', n: 90, src: 'resolution-source.mp4', label: '01:40.500–01:42.000', effect: ResolutionPunch},
  {id: 'MG-MEME-STRIP-SQUASH', n: 114, src: 'watame-source.mp4', label: '01:47.400–01:49.300', effect: WatameSplit},
  {id: 'MG-GLITCH-PORTRAIT-PILEUP', n: 126, src: 'president-source.mp4', label: '01:52.700–01:54.800', effect: PresidentPileup},
 ];
export const Root: React.FC = () => <>{effects.map(p => {
  const Standalone: React.FC = () => {const frame = useCurrentFrame(); return <AbsoluteFill><p.effect frame={frame} duration={p.n}/></AbsoluteFill>;};
  return <React.Fragment key={p.id}><Composition id={p.id} component={Standalone} width={1280} height={720} fps={60} durationInFrames={p.n}/><Composition id={`${p.id}-REVIEW`} component={() => <Comparison source={p.src} label={p.label} duration={p.n} effect={p.effect}/>} width={2560} height={720} fps={60} durationInFrames={p.n}/></React.Fragment>;
} )}</>;
