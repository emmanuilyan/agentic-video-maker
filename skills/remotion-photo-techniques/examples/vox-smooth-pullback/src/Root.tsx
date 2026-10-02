import React from 'react';
import {Composition, staticFile} from 'remotion';
import {VoxSmoothPullback} from '../../../assets/techniques/vox-smooth-pullback';

export const Root: React.FC = () => <Composition
  id="VoxSmoothPullback"
  component={VoxSmoothPullback}
  defaultProps={{imageSrc: staticFile('full.png')}}
  width={360}
  height={640}
  fps={24}
  durationInFrames={72}
/>;
