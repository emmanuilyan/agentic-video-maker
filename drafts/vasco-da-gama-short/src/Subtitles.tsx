import {createTikTokStyleCaptions, type Caption} from '@remotion/captions';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import captionData from './captions.json';

const captions: Caption[] = captionData;
const {pages} = createTikTokStyleCaptions({
  captions,
  combineTokensWithinMilliseconds: 900,
});

export function Subtitles() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ms = frame / fps * 1000;
  const page = pages.find((item, index) =>
    ms >= item.startMs && ms < Math.min(
      pages[index + 1]?.startMs ?? 27000,
      Math.max(...item.tokens.map(token => token.toMs)) + 120,
    ),
  );
  if (!page) return null;

  return (
    <div style={{
      position: 'absolute', left: 65, right: 95, bottom: 285,
      textAlign: 'center', fontFamily: 'Arial, sans-serif',
      fontSize: 62, fontWeight: 900, lineHeight: 1.14,
      textTransform: 'uppercase', whiteSpace: 'pre-wrap',
      color: '#fff', WebkitTextStroke: '5px #17100b',
      paintOrder: 'stroke fill', textShadow: '0 5px 12px #000',
    }}>
      {page.tokens.map((token, index) => (
        <span key={index} style={{color:
          ms >= token.fromMs && ms < token.toMs ? '#ffe258' : '#fff',
        }}>{token.text}</span>
      ))}
    </div>
  );
}
