import React from 'react';
import {Composition} from 'remotion';
import {VoxFormulaBoard} from '../../../assets/techniques/vox-formula-board';
export const Root: React.FC=()=> <Composition id="VoxFormulaBoard" component={VoxFormulaBoard} width={540} height={960} fps={24} durationInFrames={44}/>;
