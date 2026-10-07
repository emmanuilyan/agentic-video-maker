import React from 'react';
import {Composition,Sequence} from 'remotion';
import {VerticalChapelSlit,SkeletonFireCallout,CyberpunkNeonTitle,FromSoftwareQuote} from './Effects';
const ChapelNeonSequence: React.FC=()=> <><Sequence from={0} durationInFrames={51}><VerticalChapelSlit/></Sequence><Sequence from={51} durationInFrames={48}><SkeletonFireCallout/></Sequence><Sequence from={99} durationInFrames={96}><CyberpunkNeonTitle/></Sequence></>;
export const Root: React.FC=()=> <><Composition id="MAXOR_CHAPEL_SKELETON_NEON_SEQUENCE" component={ChapelNeonSequence} width={1280} height={720} fps={60} durationInFrames={195}/><Composition id="MAXOR_FROM_SOFTWARE_QUOTE" component={FromSoftwareQuote} width={1280} height={720} fps={60} durationInFrames={51}/></>;
