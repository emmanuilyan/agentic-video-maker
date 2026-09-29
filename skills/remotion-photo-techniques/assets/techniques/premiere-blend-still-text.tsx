import {useEffect, useRef} from 'react';
import {cancelRender, continueRender, delayRender, useVideoConfig} from 'remotion';
import {compositePremierePixel, type PremiereBlendMode, type Rgb} from './blend-modes';

export type PremiereBlendStillTextProps = {
  /** Image URL for this Remotion frame; pass a frame-sequence path for moving footage. */
  backgroundSrc: string;
  text: string;
  mode: PremiereBlendMode;
  fillColor?: string;
  opacity?: number;
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  letterSpacing?: number;
  baselineY?: number;
  filter?: string;
};

const colorToRgb = (hex: string): Rgb => {
  if (!/^#[0-9a-fA-F]{6}$/.test(hex)) {
    throw new Error('fillColor must be a six-digit hex color, for example #c4c7d7');
  }
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as Rgb;
};

/** CPU compositor for modes unavailable in CSS. Renders a full background image plus text. */
export const PremiereBlendStillText: React.FC<PremiereBlendStillTextProps> = ({
  backgroundSrc,
  text,
  mode,
  fillColor = '#c4c7d7',
  opacity = 0.66,
  fontFamily = 'Georgia, Times New Roman, serif',
  fontSize = 274,
  fontWeight = 400,
  letterSpacing = 0,
  baselineY,
  filter = 'none',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const {width, height} = useVideoConfig();

  useEffect(() => {
    const handle = delayRender('PremiereBlendStillText');
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
      try {
        const canvas = canvasRef.current;
        const ctx = canvas?.getContext('2d', {willReadFrequently: true});
        if (!canvas || !ctx) throw new Error('Canvas 2D context unavailable');

        const cover = Math.max(width / image.naturalWidth, height / image.naturalHeight);
        const imageWidth = image.naturalWidth * cover;
        const imageHeight = image.naturalHeight * cover;
        ctx.filter = filter;
        ctx.drawImage(image, (width - imageWidth) / 2, (height - imageHeight) / 2, imageWidth, imageHeight);
        ctx.filter = 'none';
        const result = ctx.getImageData(0, 0, width, height);

        const mask = document.createElement('canvas');
        mask.width = width;
        mask.height = height;
        const maskCtx = mask.getContext('2d', {willReadFrequently: true});
        if (!maskCtx) throw new Error('Text-mask canvas unavailable');
        maskCtx.fillStyle = '#fff';
        maskCtx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
        maskCtx.textAlign = 'center';
        maskCtx.textBaseline = 'alphabetic';
        if ('letterSpacing' in maskCtx) maskCtx.letterSpacing = `${letterSpacing}px`;
        maskCtx.fillText(text, width / 2, baselineY ?? height * 0.85);
        const alpha = maskCtx.getImageData(0, 0, width, height).data;
        const fill = colorToRgb(fillColor);
        const pixels = result.data;

        for (let p = 0; p < pixels.length; p += 4) {
          if (alpha[p + 3] === 0) continue;
          const x = (p / 4) % width;
          const y = Math.floor(p / 4 / width);
          const background: Rgb = [pixels[p] / 255, pixels[p + 1] / 255, pixels[p + 2] / 255];
          const mixed = compositePremierePixel(mode, background, fill, opacity, alpha[p + 3] / 255, x, y);
          for (let channel = 0; channel < 3; channel++) pixels[p + channel] = Math.round(255 * mixed[channel]);
        }
        ctx.putImageData(result, 0, 0);
        continueRender(handle);
      } catch (error) {
        cancelRender(error);
      }
    };
    image.onerror = () => cancelRender(new Error(`Cannot load background image: ${backgroundSrc}`));
    image.src = backgroundSrc;
    return () => {
      image.onload = null;
      image.onerror = null;
    };
  }, [backgroundSrc, baselineY, fillColor, filter, fontFamily, fontSize, fontWeight, height, letterSpacing, mode, opacity, text, width]);

  return <canvas ref={canvasRef} width={width} height={height} style={{width, height, display: 'block'}} />;
};
