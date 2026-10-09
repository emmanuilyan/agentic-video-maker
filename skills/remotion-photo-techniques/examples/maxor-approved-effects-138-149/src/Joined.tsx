import React from 'react';
import {Sequence} from 'remotion';
import {Spectre,Anime,Escape,Bracelet} from './Effects';
// Keep the approved renders' held states at each handoff; do not restart their overlap entrance.
export const SpectreBloodborne:React.FC=()=> <><Sequence durationInFrames={84}><Spectre/></Sequence><Sequence from={84} durationInFrames={54}><Sequence from={-14} durationInFrames={68}><Anime/></Sequence></Sequence></>;
export const EscapeBracelet:React.FC=()=> <><Sequence durationInFrames={80}><Escape/></Sequence><Sequence from={80} durationInFrames={59}><Sequence from={-18} durationInFrames={77}><Bracelet/></Sequence></Sequence></>;
