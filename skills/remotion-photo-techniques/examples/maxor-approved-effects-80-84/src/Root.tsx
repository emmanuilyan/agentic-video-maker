import React from 'react';
import {Composition} from 'remotion';
import {ComicPresentation,DiagonalHandWipe,VerticalChapelSlit} from './Effects';

export const Root: React.FC = () => <>
  <Composition id="01-comic-presentation" component={ComicPresentation} width={1280} height={720} fps={60} durationInFrames={93}/>
  <Composition id="02-diagonal-hand-wipe" component={DiagonalHandWipe} width={1280} height={720} fps={60} durationInFrames={120}/>
  <Composition id="03-vertical-chapel-slit" component={VerticalChapelSlit} width={1280} height={720} fps={60} durationInFrames={66}/>
</>;
