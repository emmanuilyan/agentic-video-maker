import React from 'react';
import {Composition} from 'remotion';
import {NewspaperComparison} from './scene';

export const Root: React.FC = () => <Composition id="NewspaperComparison" component={NewspaperComparison} width={360} height={640} fps={30} durationInFrames={135}/>;
