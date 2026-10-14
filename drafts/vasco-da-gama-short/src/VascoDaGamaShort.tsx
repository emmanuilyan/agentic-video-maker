import {Audio} from '@remotion/media';
import {AbsoluteFill, Easing, Img, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {ShortformTransition, type ShortformTransitionId} from './shortform-transitions';
import {Subtitles} from './Subtitles';
import {IntroHook} from './IntroHook';

// Each cut is centered on the first spoken word assigned to the incoming image.
const cuts = [105, 144, 208, 273, 341, 425, 752] as const;
const ends = [...cuts, 810];
const starts = [0, ...cuts];

const transitions: {
  id: ShortformTransitionId;
  frames: number;
  direction?: 'left' | 'right';
  coverColor?: string;
}[] = [
  {id: 'SWIPE_PUSH', frames: 12, direction: 'left'},
  {id: 'ZOOM_PUNCH', frames: 10},
  {id: 'SWIPE_PUSH', frames: 10, direction: 'right'},
  {id: 'COVER_SWIPE', frames: 12, direction: 'left', coverColor: '#d49d62'},
  {id: 'FLASH_BEAT', frames: 8},
  {id: 'ZOOM_PUNCH', frames: 10},
  {id: 'SPIN_BLUR', frames: 12, direction: 'right'},
];

const motion = [
  {s0: 1.035, s1: 1.075, x0: 0, x1: -24, y0: 12, y1: -18},
  {s0: 1.04, s1: 1.08, x0: 10, x1: -25, y0: 8, y1: -15},
  {s0: 1.035, s1: 1.085, x0: -8, x1: 22, y0: 10, y1: -20},
  {s0: 1.04, s1: 1.075, x0: 10, x1: -19, y0: 5, y1: -19},
  {s0: 1.035, s1: 1.08, x0: 7, x1: -20, y0: 9, y1: -15},
  {s0: 1.04, s1: 1.085, x0: -5, x1: 20, y0: 12, y1: -24},
  {s0: 1.035, s1: 1.08, x0: 0, x1: -10, y0: 4, y1: -10},
  {s0: 1.035, s1: 1.075, x0: 8, x1: -20, y0: 8, y1: -18},
] as const;

const clamp = (value: number) => Math.max(0, Math.min(1, value));

function PhotoScene({index, frame}: {index: number; frame: number}) {
  const start = starts[index];
  const end = ends[index];
  const progress = clamp((frame - start) / Math.max(1, end - start));
  const {s0, s1, x0, x1, y0, y1} = motion[index];

  let scale = interpolate(progress, [0, 1], [s0, s1]);
  let x = interpolate(progress, [0, 1], [x0, x1]);
  let y = interpolate(progress, [0, 1], [y0, y1]);

  if (index === 0) {
    const timing = {easing: Easing.bezier(0.4, 0, 0.2, 1), extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
    scale = interpolate(frame, [0, 15, 51, 105], [2.1, 2.15, 1, 1.09], timing);
    x = interpolate(frame, [0, 15, 51, 105], [230, 240, 0, -10], timing);
    y = interpolate(frame, [0, 15, 51, 105], [850, 880, 0, -15], timing);
  }

  if (index === 2) {
    // Reaction on «вдруг резко», then travel to Vasco on his spoken name.
    scale = interpolate(progress, [0, 0.3, 0.7, 1], [1.035, 1.5, 1.8, 1.85]);
    x = interpolate(progress, [0, 0.3, 0.7, 1], [-8, -220, 180, 190]);
    y = interpolate(progress, [0, 0.3, 0.7, 1], [10, 280, 640, 670]);
  }

  // Continue the face-to-face camera travel on the subsequent five images.
  const facePaths: Record<number, {p: number[]; s: number[]; x: number[]; y: number[]}> = {
    3: {p: [0, 0.3, 0.72, 1], s: [1.04, 2.3, 2.3, 2.35], x: [10, 500, -600, -620], y: [5, 850, 780, 810]},
    4: {p: [0, 0.3, 0.75, 1], s: [1.035, 2.5, 2.5, 2.55], x: [7, -130, 700, 720], y: [9, 930, 900, 930]},
    5: {p: [0, 0.3, 0.72, 1], s: [1.04, 2.4, 2.4, 2.45], x: [-5, 450, -550, -570], y: [12, 900, 580, 610]},
    6: {p: [0, 0.2, 0.45, 0.78, 1], s: [1.035, 2.3, 2.5, 3.3, 1.35], x: [0, -100, -600, 600, 0], y: [4, 480, 880, 2100, 220]},
    7: {p: [0, 0.3, 0.75, 1], s: [1.035, 2.3, 2.5, 2.55], x: [8, 650, -500, -520], y: [8, 1100, 800, 830]},
  };
  const path = facePaths[index];
  if (path) {
    scale = interpolate(progress, path.p, path.s);
    x = interpolate(progress, path.p, path.x);
    y = interpolate(progress, path.p, path.y);
  }

  return (
    <AbsoluteFill style={{overflow: 'hidden', backgroundColor: '#10151a'}}>
      <Img
        src={staticFile(`photos/${String(index + 1).padStart(2, '0')}.png`)}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
          transformOrigin: 'center center',
        }}
      />
    </AbsoluteFill>
  );
}

export function VascoDaGamaShort() {
  const frame = useCurrentFrame();
  const transitionIndex = cuts.findIndex((cut, index) => {
    const {frames} = transitions[index];
    const start = cut - Math.floor(frames / 2);
    return frame >= start && frame < start + frames;
  });

  const imageIndex = cuts.findIndex((cut) => frame < cut);
  const currentIndex = imageIndex === -1 ? 7 : imageIndex;

  return (
    <AbsoluteFill style={{backgroundColor: '#10151a'}}>
      {transitionIndex >= 0 ? (
        <ShortformTransition
          transition={transitions[transitionIndex].id}
          durationInFrames={transitions[transitionIndex].frames}
          frame={frame - cuts[transitionIndex] + Math.floor(transitions[transitionIndex].frames / 2)}
          direction={transitions[transitionIndex].direction}
          coverColor={transitions[transitionIndex].coverColor}
          seed={`vasco-${transitionIndex}`}
          from={<PhotoScene index={transitionIndex} frame={frame} />}
          to={<PhotoScene index={transitionIndex + 1} frame={frame} />}
        />
      ) : (
        <PhotoScene index={currentIndex} frame={frame} />
      )}
      <Audio src={staticFile('mixed-audio.m4a')} />
      <Subtitles />
      <IntroHook />
    </AbsoluteFill>
  );
}
