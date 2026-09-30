import {useMemo} from 'react';
import {ThreeCanvas} from '@remotion/three';
import {useLoader} from '@react-three/fiber';
import {SRGBColorSpace, TextureLoader} from 'three';
import {useCurrentFrame, useVideoConfig} from 'remotion';

export type LensWarpProps = {
  src: string;
  durationInFrames: number;
  frame?: number;
  intensity?: number;
  center?: [number, number];
};

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uImage;
  uniform float uRadius;
  uniform float uStrength;
  uniform float uAspect;
  uniform vec2 uCenter;
  varying vec2 vUv;

  void main() {
    vec2 delta = vUv - uCenter;
    vec2 metric = vec2(delta.x * uAspect, delta.y);
    float r = length(metric);
    if (r > uRadius) {
      gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
      return;
    }
    float q = clamp(r / uRadius, 0.0, 1.0);
    float smallLens = 1.0 - smoothstep(0.46, 0.65, uRadius);
    float spherical = asin(min(q, 0.9999)) / max(q, 0.0001) / 1.57079632679;
    float sampleRadius = mix(1.0, spherical * mix(1.0, 1.35, smallLens), uStrength);
    vec2 fullUv = uCenter + delta * sampleRadius;
    vec2 ballUv = uCenter + metric * (0.5 / uRadius) * mix(1.0, spherical, uStrength);
    vec2 sampleUv = clamp(mix(fullUv, ballUv, smallLens), 0.0, 1.0);
    vec4 color = texture2D(uImage, sampleUv);
    color.rgb *= 1.0 - 0.19 * uStrength * q * q;
    float rim = (smoothstep(0.985, 0.995, q) - smoothstep(0.995, 1.0, q)) * smallLens;
    color.rgb += vec3(rim * 0.13);
    gl_FragColor = vec4(color.rgb, 1.0);
  }
`;

const clamp = (v: number) => Math.max(0, Math.min(1, v));
const smooth = (v: number) => {
  const p = clamp(v);
  return p * p * (3 - 2 * p);
};
const mix = (a: number, b: number, p: number) => a + (b - a) * p;

const segment = (frame: number, a: number, b: number, from: number, to: number) =>
  mix(from, to, smooth((frame - a) / (b - a)));

export function lensState(frame: number, durationInFrames: number) {
  const f = clamp(frame / Math.max(1, durationInFrames - 1)) * 89;
  if (f < 31) return {radius: 0.34, strength: 0.92};
  if (f < 39) return {
    radius: segment(f, 31, 39, 0.34, 0.64),
    strength: segment(f, 31, 39, 0.92, 0.95),
  };
  if (f < 65) return {radius: 0.64, strength: 0.95};
  return {
    radius: segment(f, 65, 89, 0.64, 1.15),
    strength: segment(f, 65, 89, 0.95, 0),
  };
}

const Plane = ({src, radius, strength, aspect, center}: {
  src: string;
  radius: number;
  strength: number;
  aspect: number;
  center: [number, number];
}) => {
  const texture = useLoader(TextureLoader, src);
  texture.colorSpace = SRGBColorSpace;
  const uniforms = useMemo(() => ({
    uImage: {value: texture},
    uRadius: {value: radius},
    uStrength: {value: strength},
    uAspect: {value: aspect},
    uCenter: {value: center},
  }), [texture, radius, strength, aspect, center]);
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} depthTest={false} depthWrite={false} />
    </mesh>
  );
};

export const LensWarp = ({src, durationInFrames, frame, intensity = 1, center = [0.5, 0.5]}: LensWarpProps) => {
  const current = useCurrentFrame();
  const {width, height} = useVideoConfig();
  if (!Number.isInteger(durationInFrames) || durationInFrames < 2) throw new Error('durationInFrames must be at least 2');
  const state = lensState(frame ?? current, durationInFrames);
  return (
    <ThreeCanvas width={width} height={height} dpr={1} flat gl={{antialias: true, preserveDrawingBuffer: true}}>
      <Plane src={src} radius={state.radius} strength={state.strength * intensity} aspect={width / height} center={center} />
    </ThreeCanvas>
  );
};
