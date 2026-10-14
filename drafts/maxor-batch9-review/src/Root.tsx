import React from 'react';
import {Composition} from 'remotion';
import {ComicPresentation,DiagonalHandWipe,VerticalChapelSlit,SkeletonFireCallout,CyberpunkNeonTitle,FromSoftwareQuote} from './Effects';

export const Root: React.FC = () => <>
  <Composition id="01-comic-presentation" component={ComicPresentation} width={1280} height={720} fps={60} durationInFrames={93}/>
  <Composition id="02-diagonal-hand-wipe" component={DiagonalHandWipe} width={1280} height={720} fps={60} durationInFrames={120}/>
  <Composition id="03-vertical-chapel-slit" component={VerticalChapelSlit} width={1280} height={720} fps={60} durationInFrames={66}/>
  <Composition id="04-skeleton-fire-callout" component={SkeletonFireCallout} width={1280} height={720} fps={60} durationInFrames={69}/>
  <Composition id="05-cyberpunk-neon-title" component={CyberpunkNeonTitle} width={1280} height={720} fps={60} durationInFrames={96}/>
  <Composition id="06-from-software-quote" component={FromSoftwareQuote} width={1280} height={720} fps={60} durationInFrames={51}/>
</>;
