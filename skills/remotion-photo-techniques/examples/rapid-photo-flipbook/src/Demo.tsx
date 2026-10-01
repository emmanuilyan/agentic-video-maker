import {AbsoluteFill, Img, Sequence, staticFile, useCurrentFrame} from 'remotion';
import {PhotoFlipbook, type FlipbookPhoto} from './PhotoFlipbook';

const pictureNumbers = Array.from({length: 22}, (_, i) => 17 + i * 2);
const sourceFrame = (n: number) => staticFile(`photos/seq${String(n).padStart(2, '0')}.jpg`);
const photos: FlipbookPhoto[] = pictureNumbers.map((_, i) => ({
  src: sourceFrame(4 + i * 2),
  frameSources: [sourceFrame(4 + i * 2), sourceFrame(5 + i * 2)],
}));

// The first four frames are the preceding edit, retained so the comparison
// covers the user's exact 1:57–1:59 interval. The reusable flipbook starts at 4.
function Prelude() {
  const frame = useCurrentFrame();
  return <Img src={sourceFrame(frame)}
    style={{width: '100%', height: '100%', objectFit: 'cover'}} />;
}

export function PhotoFlipbookReview() {
  return (
    <AbsoluteFill style={{background: '#101010'}}>
      <Sequence from={0} durationInFrames={4}>
        <Prelude />
      </Sequence>
      <Sequence from={4} durationInFrames={44}>
        <PhotoFlipbook photos={photos} durationInFrames={44} defaultHoldFrames={2} />
      </Sequence>
    </AbsoluteFill>
  );
}
