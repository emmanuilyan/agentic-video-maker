import React from 'react';
import type {Caption} from '@remotion/captions';
import {useCurrentFrame} from 'remotion';
import {video, words} from './timeline';

export function pagesFromWords(captions: Caption[]): Caption[][] {
  const pages: Caption[][] = [];
  let page: Caption[] = [];
  captions.forEach((word, index) => {
    if (page.length && (page.length >= 7 || word.startMs - page[0].startMs > 2600)) {
      pages.push(page); page = [];
    }
    page.push(word);
    if (word.pageBreakAfter || index === captions.length - 1) {pages.push(page); page = [];}
  });
  return pages;
}
const pages = pagesFromWords(words);

export const Captions: React.FC<{ink: string; accent: string}> = ({ink, accent}) => {
  const time = useCurrentFrame() / video.fps * 1000;
  const page = pages.find((p, i) => time >= p[0].startMs && time <
    (video.captionPersistence === 'until-next'
      ? (pages[i + 1]?.[0].startMs ?? video.durationInFrames / video.fps * 1000)
      : p[p.length - 1].endMs));
  return <div style={{position:'absolute', left:90, right:150, top:1585, height:190,
    display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center',
    borderTop:`2px solid ${ink}35`, color:ink}}>
    <div style={{fontSize:58, lineHeight:1.23, fontWeight:700, whiteSpace:'pre-wrap'}}>
      {page?.map((word, i) => <span key={i} style={{color:time >= word.startMs && time < word.endMs ? accent : ink}}>{word.text}</span>)}
    </div>
  </div>;
};
