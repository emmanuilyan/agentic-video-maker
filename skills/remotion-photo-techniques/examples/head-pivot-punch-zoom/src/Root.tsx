import React from 'react';
import {Composition, staticFile} from 'remotion';
import {HeadPivotPunchZoom} from '../../../assets/techniques/head-pivot-punch-zoom';

export const Root: React.FC = () => <Composition id="HeadPivotPunchZoom"
  component={HeadPivotPunchZoom} defaultProps={{imageSrc: staticFile('demo-subject.svg'), text: 'Спиз%или'}}
  width={1080} height={1920} fps={30} durationInFrames={105}/>;
