import type {Caption} from '@remotion/captions';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import hookData from './intro-hook.json';

const hooks: Caption[] = hookData;

export function IntroHook() {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const ms = frame / fps * 1000;
  const hook = hooks.find(item => ms >= item.startMs && ms < item.endMs);
  if (!hook) return null;
  return (
    <div style={{
      position: 'absolute', left: 70, right: 90, top: 115,
      padding: '24px 28px', borderRadius: 22,
      backgroundColor: 'rgba(14, 10, 7, 0.76)',
      textAlign: 'center', fontFamily: 'Arial, Apple Color Emoji, sans-serif',
      fontSize: 78, fontWeight: 800, lineHeight: 1.12,
      whiteSpace: 'pre-wrap', color: '#fff',
      textShadow: '0 3px 8px rgba(0,0,0,0.9)',
      opacity: interpolate(frame, [99, 105], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
    }}>{hook.text}</div>
  );
}
