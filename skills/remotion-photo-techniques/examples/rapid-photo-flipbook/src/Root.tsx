import {Composition} from 'remotion';
import {PhotoFlipbookReview} from './Demo';

export const Root = () => (
  <Composition
    id="PhotoFlipbookReview"
    component={PhotoFlipbookReview}
    fps={24}
    width={1280}
    height={720}
    durationInFrames={48}
  />
);
