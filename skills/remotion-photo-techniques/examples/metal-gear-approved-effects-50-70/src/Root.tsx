import React from 'react';
import {AbsoluteFill, Composition, useCurrentFrame} from 'remotion';
import {Comparison, type EffectProps} from './Comparison';
import {ArticleCollage, FallingPhoto, GuitarRock, SoftMeme} from './Effects';

const effects: Array<{
  id: string;
  frames: number;
  source: string;
  interval: string;
  component: React.FC<EffectProps>;
}> = [
  {id: 'MG_GUITAR_ROCK_TITLE', frames: 69, source: 'guitar-source.mp4', interval: '50.750–51.900', component: GuitarRock},
  {id: 'MG_TOONTOWN_ARTICLE_COLLAGE', frames: 94, source: 'article-source.mp4', interval: '52.967–54.533', component: ArticleCollage},
  {id: 'MG_FALLING_ABOVE_40', frames: 95, source: 'falling-source.mp4', interval: '55.533–57.117', component: FallingPhoto},
  {id: 'MG_OVAL_MEME_CAPTIONS', frames: 55, source: 'meme-source.mp4', interval: '68.967–69.883', component: SoftMeme},
];

export const Root: React.FC = () => <>
  {effects.map(({id, frames, source, interval, component: Effect}) => {
    const Standalone: React.FC = () => {
      const frame = useCurrentFrame();
      return <AbsoluteFill><Effect frame={frame} duration={frames}/></AbsoluteFill>;
    };
    const Review: React.FC = () => <Comparison source={source} label={interval} duration={frames} effect={Effect}/>;
    return <React.Fragment key={id}>
      <Composition id={id.replace(/_/g, '-')} component={Standalone} width={1280} height={720} fps={60} durationInFrames={frames}/>
      <Composition id={`${id.replace(/_/g, '-')}-REVIEW`} component={Review} width={2560} height={720} fps={60} durationInFrames={frames}/>
    </React.Fragment>;
  })}
</>;
