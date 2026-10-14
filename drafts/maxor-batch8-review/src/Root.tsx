import React from 'react';
import {Composition} from 'remotion';
import {DogDoing,GodFreed,PartOneCard,MadeByMaxor,KeyboardCollage,CharacterSmear} from './Effects';
export const Root:React.FC=()=> <>
  <Composition id="01-dog-doing-caption" component={DogDoing} width={1280} height={720} fps={60} durationInFrames={75}/>
  <Composition id="02-god-freed-frame" component={GodFreed} width={1280} height={720} fps={60} durationInFrames={51}/>
  <Composition id="03-part-one-title-card" component={PartOneCard} width={1280} height={720} fps={60} durationInFrames={198}/>
  <Composition id="04-made-by-maxor-logo" component={MadeByMaxor} width={1280} height={720} fps={60} durationInFrames={192}/>
  <Composition id="05-keyboard-collage-caption" component={KeyboardCollage} width={1280} height={720} fps={60} durationInFrames={180}/>
  <Composition id="06-character-smear-title" component={CharacterSmear} width={1280} height={720} fps={60} durationInFrames={126}/>
</>;
