import type {CSSProperties} from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

export type PhotoPanel = {
  src: string;
  /** Width of this panel in output-frame widths. */
  width: number;
  objectPosition?: string;
};

export type CameraKey = {
  frame: number;
  /** Left edge of the virtual camera in output-frame widths. */
  x: number;
};

export type LateralPhotoPanProps = {
  photos: readonly PhotoPanel[];
  cameraKeys: readonly CameraKey[];
  /** Width of a dark divider at each panel junction, in output-frame widths. */
  seamWidth?: number;
  seamColor?: string;
  background?: string;
};

// Monotone cubic interpolation keeps the virtual camera moving in one direction
// while making its speed continuous across measured points.
const cameraAt = (frame: number, keys: readonly CameraKey[]): number => {
  if (frame <= keys[0].frame) return keys[0].x;
  if (frame >= keys[keys.length - 1].frame) return keys[keys.length - 1].x;

  const slopes = keys.slice(0, -1).map((key, i) =>
    (keys[i + 1].x - key.x) / (keys[i + 1].frame - key.frame),
  );
  const tangent = (i: number): number => {
    if (i === 0) return slopes[0];
    if (i === keys.length - 1) return slopes[slopes.length - 1];
    const a = slopes[i - 1];
    const b = slopes[i];
    if (a <= 0 || b <= 0) return 0;
    const h0 = keys[i].frame - keys[i - 1].frame;
    const h1 = keys[i + 1].frame - keys[i].frame;
    const w0 = 2 * h1 + h0;
    const w1 = h1 + 2 * h0;
    return (w0 + w1) / (w0 / a + w1 / b);
  };

  const i = keys.findIndex((key, index) => index < keys.length - 1 && frame < keys[index + 1].frame);
  const left = keys[i];
  const right = keys[i + 1];
  const duration = right.frame - left.frame;
  const t = (frame - left.frame) / duration;
  const t2 = t * t;
  const t3 = t2 * t;
  return (2 * t3 - 3 * t2 + 1) * left.x
    + (t3 - 2 * t2 + t) * duration * tangent(i)
    + (-2 * t3 + 3 * t2) * right.x
    + (t3 - t2) * duration * tangent(i + 1);
};

export const LateralPhotoPan = ({
  photos,
  cameraKeys,
  seamWidth = 0.012,
  seamColor = '#59382b',
  background = '#231d18',
}: LateralPhotoPanProps) => {
  const frame = useCurrentFrame();
  const {width, height} = useVideoConfig();
  if (photos.length < 2 || cameraKeys.length < 2) {
    throw new Error('LateralPhotoPan needs at least two photos and two camera keys.');
  }
  const cameraX = cameraAt(frame, cameraKeys) * width;
  let panelX = 0;
  return (
    <AbsoluteFill style={{overflow: 'hidden', background}}>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          transform: `translate3d(${-cameraX}px, 0, 0)`,
          willChange: 'transform',
        }}
      >
        {photos.map((photo, index) => {
          const left = panelX;
          const panelWidth = photo.width * width;
          panelX += panelWidth;
          const imageStyle: CSSProperties = {
            position: 'absolute',
            left,
            top: 0,
            width: panelWidth,
            height,
            objectFit: 'cover',
            objectPosition: photo.objectPosition ?? 'center',
          };
          return (
            <div key={`${photo.src}-${index}`}>
              <Img src={staticFile(photo.src)} style={imageStyle} />
              {index > 0 && seamWidth > 0 ? (
                <div style={{
                  position: 'absolute', left: left - seamWidth * width / 2,
                  top: 0, width: seamWidth * width, height,
                  background: seamColor, boxShadow: '0 0 12px #0005',
                }} />
              ) : null}
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
