import React from 'react';
import {Composition} from 'remotion';
import {SkyrimTitle,SpeedDisclaimer,JapanMapCallout,EasternEuropeScale,RGBBlockGlitch,MargitFrameTitle} from './Effects';
export const Root:React.FC=()=> <>
  <Composition id="01-skyrim-title" component={SkyrimTitle} width={1280} height={720} fps={60} durationInFrames={60}/>
  <Composition id="02-speed-disclaimer-wipe" component={SpeedDisclaimer} width={1280} height={720} fps={60} durationInFrames={66}/>
  <Composition id="03-japan-map-callout" component={JapanMapCallout} width={1280} height={720} fps={60} durationInFrames={72}/>
  <Composition id="04-eastern-europe-scale" component={EasternEuropeScale} width={1280} height={720} fps={60} durationInFrames={150}/>
  <Composition id="05-rgb-block-glitch" component={RGBBlockGlitch} width={1280} height={720} fps={60} durationInFrames={120}/>
  <Composition id="06-margit-frame-title" component={MargitFrameTitle} width={1280} height={720} fps={60} durationInFrames={60}/>
</>;
