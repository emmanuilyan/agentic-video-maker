import { ReactNode, useLayoutEffect, useMemo, useEffect } from "react";
import { ThreeCanvas } from "@remotion/three";
import { useLoader, useThree } from "@react-three/fiber";
import {
  TextureLoader,
  Texture,
  SRGBColorSpace,
  PlaneGeometry,
  CatmullRomCurve3,
  Vector3,
} from "three";
import { Scene, Photo } from "./core";
import {
  SpatialId,
  Vec3,
  CameraState,
  cameraFor,
  frozenClock,
  explodeProgress,
  portalOpening,
  step,
} from "./spatial-state";

function CameraRig({ state }: { state: CameraState }) {
  const { camera } = useThree();
  useLayoutEffect(() => {
    camera.position.set(...state.position);
    camera.up.set(...(state.up ?? [0, 1, 0]));
    camera.lookAt(...state.target);
    camera.rotateZ(state.roll);
    camera.updateMatrixWorld();
  }, [camera, state]);
  return null;
}
type PlaneProps = {
  photo: Photo;
  texture: Texture;
  position?: Vec3;
  rotation?: Vec3;
  width?: number;
  framed?: boolean;
  opacity?: number;
};
function PhotoPlane({
  photo,
  texture,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  width = 5,
  framed = true,
  opacity = 1,
}: PlaneProps) {
  const height = (width * photo.height) / photo.width;
  return (
    <group position={position} rotation={rotation}>
      {framed && (
        <mesh>
          <boxGeometry args={[width + 0.1, height + 0.1, 0.075]} />
          <meshStandardMaterial
            color="#8a947e"
            metalness={0.45}
            roughness={0.43}
          />
        </mesh>
      )}
      <mesh position={[0, 0, 0.043]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          transparent={opacity < 1}
          opacity={opacity}
        />
      </mesh>
      <mesh position={[0, 0, -0.043]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width, height]} />
        <meshBasicMaterial
          map={texture}
          toneMapped={false}
          transparent={opacity < 1}
          opacity={opacity}
        />
      </mesh>
    </group>
  );
}
function Bar({
  position,
  size,
  color = "#728957",
}: {
  position: Vec3;
  size: Vec3;
  color?: string;
}) {
  return (
    <mesh position={position}>
      <boxGeometry args={size} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}
function Floor({ y = -3.7 }: { y?: number }) {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, y, -18]}>
        <planeGeometry args={[180, 180]} />
        <meshStandardMaterial
          color="#11171a"
          roughness={0.8}
          metalness={0.15}
        />
      </mesh>
      <gridHelper
        args={[180, 90, "#344c44", "#202d2b"]}
        position={[0, y + 0.012, -18]}
      />
    </>
  );
}
function Flight({ s, textures }: { s: Scene; textures: Texture[] }) {
  return (
    <>
      <Floor />
      {s.photos.map((p, i) => (
        <PhotoPlane
          key={i}
          photo={p}
          texture={textures[i]}
          position={[(i % 2 ? 1 : -1) * 3.75, 0.25 + (i % 2) * 0.35, -i * 9]}
          rotation={[0, (i % 2 ? -1 : 1) * 0.19, (i % 2 ? 1 : -1) * 0.035]}
          width={5.6}
        />
      ))}
      {Array.from({ length: 11 }, (_, i) => (
        <group key={i} position={[0, 0, 6 - i * 4]}>
          <Bar position={[-7, 0, 0]} size={[0.025, 9, 0.025]} />
          <Bar position={[7, 0, 0]} size={[0.025, 9, 0.025]} />
          <Bar
            position={[0, -3.66, 0]}
            size={[14, 0.02, 0.025]}
            color="#485748"
          />
        </group>
      ))}
    </>
  );
}
function Orbit({ s, textures }: { s: Scene; textures: Texture[] }) {
  return (
    <>
      <Floor y={-2.8} />
      {s.photos.map((p, i) => {
        const a = (i * Math.PI) / 2;
        return (
          <group key={i}>
            <PhotoPlane
              photo={p}
              texture={textures[i]}
              position={[Math.sin(a) * 4.4, 0.25, Math.cos(a) * 4.4]}
              rotation={[0, a, 0]}
              width={5.5}
            />
            <Bar
              position={[Math.sin(a) * 4.4, -2.77, Math.cos(a) * 4.4]}
              size={[0.12, 0.025, 0.12]}
              color="#d8ed78"
            />
          </group>
        );
      })}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.77, 0]}>
        <torusGeometry args={[4.4, 0.025, 8, 120]} />
        <meshBasicMaterial color="#718b59" />
      </mesh>
    </>
  );
}
function Tunnel({ s, textures }: { s: Scene; textures: Texture[] }) {
  return (
    <>
      {Array.from({ length: 16 }, (_, k) => {
        const z = 12 - k * 5;
        return (
          <group key={k}>
            <PhotoPlane
              photo={s.photos[k % 4]}
              texture={textures[k % 4]}
              position={[-4.25, 0, z]}
              rotation={[0, Math.PI / 2, 0]}
              width={4.9}
            />
            <PhotoPlane
              photo={s.photos[(k + 1) % 4]}
              texture={textures[(k + 1) % 4]}
              position={[4.25, 0, z]}
              rotation={[0, -Math.PI / 2, 0]}
              width={4.9}
            />
            <PhotoPlane
              photo={s.photos[(k + 2) % 4]}
              texture={textures[(k + 2) % 4]}
              position={[0, 2.95, z]}
              rotation={[Math.PI / 2, 0, 0]}
              width={8.4}
            />
            <PhotoPlane
              photo={s.photos[(k + 3) % 4]}
              texture={textures[(k + 3) % 4]}
              position={[0, -2.95, z]}
              rotation={[-Math.PI / 2, 0, 0]}
              width={8.4}
            />
            <Bar position={[-4.28, 0, z + 2.5]} size={[0.035, 6, 0.035]} />
            <Bar position={[4.28, 0, z + 2.5]} size={[0.035, 6, 0.035]} />
            <Bar position={[0, 2.98, z + 2.5]} size={[8.6, 0.035, 0.035]} />
            <Bar position={[0, -2.98, z + 2.5]} size={[8.6, 0.035, 0.035]} />
          </group>
        );
      })}
    </>
  );
}
function Spiral({ s, textures }: { s: Scene; textures: Texture[] }) {
  const curve = useMemo(
    () =>
      new CatmullRomCurve3(
        Array.from({ length: 100 }, (_, i) => {
          const a = (i / 99) * 8 - 0.8;
          return new Vector3(
            Math.sin(a) * 5,
            -3 + (i / 99) * 20,
            Math.cos(a) * 5,
          );
        }),
      ),
    [],
  );
  return (
    <>
      <Floor y={-4} />
      <mesh>
        <tubeGeometry args={[curve, 150, 0.028, 6, false]} />
        <meshBasicMaterial color="#9da770" />
      </mesh>
      {s.photos.map((p, i) => {
        const a = i * 1.7;
        return (
          <PhotoPlane
            key={i}
            photo={p}
            texture={textures[i]}
            position={[Math.sin(a) * 5, i * 4, Math.cos(a) * 5]}
            rotation={[0, a, -0.04]}
            width={6}
          />
        );
      })}
    </>
  );
}
function Dive({ s, textures }: { s: Scene; textures: Texture[] }) {
  return (
    <>
      {Array.from({ length: 13 }, (_, i) => {
        const y = 12 - i * 4;
        return (
          <group key={i}>
            <Bar position={[-7, y, 0]} size={[0.035, 0.035, 10]} />
            <Bar position={[7, y, 0]} size={[0.035, 0.035, 10]} />
            <Bar position={[0, y, -5]} size={[14, 0.035, 0.035]} />
            <Bar position={[0, y, 5]} size={[14, 0.035, 0.035]} />
          </group>
        );
      })}
      {s.photos.map((p, i) => (
        <PhotoPlane
          key={i}
          photo={p}
          texture={textures[i]}
          position={[(i % 2 ? 1 : -1) * 3.5, -i * 8, 0]}
          rotation={[-Math.PI / 2, 0, i * 0.075]}
          width={6.2}
        />
      ))}
    </>
  );
}
function Frozen({ s, textures }: { s: Scene; textures: Texture[] }) {
  const c = frozenClock(s.f),
    radius = 0.22 + c * 0.78;
  const positions: Vec3[] = [
    [-3.8, 1.85, 0.9],
    [3.7, 1.8, -1.2],
    [-3.3, -1.85, -0.8],
    [3.5, -1.75, 1.3],
  ];
  return (
    <>
      <Floor y={-4.5} />
      {s.photos.map((p, i) => (
        <PhotoPlane
          key={i}
          photo={p}
          texture={textures[i]}
          position={positions[i].map((v) => v * radius) as Vec3}
          rotation={[
            ((i % 2) - 0.5) * 0.12 * c,
            (i % 2 ? -0.15 : 0.19) * c,
            ((i % 3) - 1) * 0.08 * c,
          ]}
          width={4.7}
        />
      ))}
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[
              Math.sin(a) * 6 * radius,
              Math.cos(a) * 3.4 * radius,
              Math.sin(a * 2) * 3 * radius,
            ]}
          >
            <sphereGeometry args={[0.035, 8, 8]} />
            <meshBasicMaterial color="#d8ed78" />
          </mesh>
        );
      })}
    </>
  );
}
// Each fragment owns UV geometry. Shared source textures are never cropped or mutated.
function PhotoRect({
  texture,
  wholeW,
  wholeH,
  rect,
  position,
  rotation = [0, 0, 0],
  opacity = 1,
}: {
  texture: Texture;
  wholeW: number;
  wholeH: number;
  rect: [number, number, number, number];
  position: Vec3;
  rotation?: Vec3;
  opacity?: number;
}) {
  const [x, y, rw, rh] = rect;
  const geometry = useMemo(() => {
    const g = new PlaneGeometry(rw, rh);
    const uv = g.attributes.uv;
    for (let i = 0; i < uv.count; i++)
      uv.setXY(
        i,
        (x + uv.getX(i) * rw) / wholeW,
        1 - (y + (1 - uv.getY(i)) * rh) / wholeH,
      );
    uv.needsUpdate = true;
    return g;
  }, [x, y, rw, rh, wholeW, wholeH]);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <mesh position={position} rotation={rotation} geometry={geometry}>
      <meshBasicMaterial
        map={texture}
        toneMapped={false}
        transparent={opacity < 1}
        opacity={opacity}
        side={2}
      />
    </mesh>
  );
}
function Exploded({ s, textures }: { s: Scene; textures: Texture[] }) {
  const i = Math.min(3, Math.floor(s.f / 45)),
    next = (i + 1) % 4,
    p = explodeProgress(s.f % 45),
    photo = s.photos[i],
    ww = 14,
    hh = (ww * photo.height) / photo.width,
    cols = 6,
    rows = 4;
  return (
    <>
      <PhotoPlane
        photo={s.photos[next]}
        texture={textures[next]}
        position={[0, 0, -12]}
        width={14}
      />
      {Array.from({ length: cols * rows }, (_, k) => {
        const col = k % cols,
          row = Math.floor(k / cols),
          cw = ww / cols,
          ch = hh / rows,
          bx = (col + 0.5) * cw - ww / 2,
          by = hh / 2 - (row + 0.5) * ch,
          spread = step(p, 0, 0.78);
        return (
          <PhotoRect
            key={`${i}-${k}`}
            texture={textures[i]}
            wholeW={ww}
            wholeH={hh}
            rect={[col * cw, row * ch, cw + 0.002, ch + 0.002]}
            position={[
              bx + Math.sign(bx) * (2.8 + Math.sin(k * 5.13) ** 2 * 4) * spread,
              by + Math.sign(by) * (1.9 + Math.cos(k * 3.9) ** 2 * 3) * spread,
              Math.sin(k * 2.7) * 3.5 * spread,
            ]}
            rotation={[
              Math.sin(k * 3) * 0.7 * spread,
              Math.cos(k * 5) * 0.7 * spread,
              Math.sin(k) * 0.25 * spread,
            ]}
            opacity={1 - step(p, 0.85, 1)}
          />
        );
      })}
    </>
  );
}
function PortalWall({
  photo,
  texture,
  z,
  opening,
}: {
  photo: Photo;
  texture: Texture;
  z: number;
  opening: number;
}) {
  const ww = 23,
    hh = (ww * photo.height) / photo.width,
    hw = 5 * opening,
    hhole = 7.6 * opening,
    l = (ww - hw) / 2,
    top = (hh - hhole) / 2;
  const rects: [number, number, number, number][] = [
    [0, 0, l, hh],
    [l + hw, 0, l, hh],
    [l, 0, hw, top],
    [l, top + hhole, hw, top],
  ];
  return (
    <group position={[0, 0, z]}>
      {opening < 0.001 ? (
        <PhotoPlane photo={photo} texture={texture} width={ww} />
      ) : (
        <>
          {rects
            .filter((r) => r[2] > 0.001 && r[3] > 0.001)
            .map((r, i) => (
              <PhotoRect
                key={i}
                texture={texture}
                wholeW={ww}
                wholeH={hh}
                rect={r}
                position={[
                  r[0] + r[2] / 2 - ww / 2,
                  hh / 2 - r[1] - r[3] / 2,
                  0,
                ]}
              />
            ))}
          <Bar
            position={[-hw / 2, 0, 0.07]}
            size={[0.065, hhole, 0.07]}
            color="#cee57b"
          />
          <Bar
            position={[hw / 2, 0, 0.07]}
            size={[0.065, hhole, 0.07]}
            color="#cee57b"
          />
          <Bar
            position={[0, hhole / 2, 0.07]}
            size={[hw, 0.065, 0.07]}
            color="#cee57b"
          />
          <Bar
            position={[0, -hhole / 2, 0.07]}
            size={[hw, 0.065, 0.07]}
            color="#cee57b"
          />
        </>
      )}
    </group>
  );
}
function Portals({ s, textures }: { s: Scene; textures: Texture[] }) {
  const camera = cameraFor("PORTAL_ROOMS", s.f);
  return (
    <>
      <Floor y={-4.2} />
      {s.photos.map((photo, i) => (
        <PortalWall
          key={i}
          photo={photo}
          texture={textures[i]}
          z={-i * 12}
          opening={i === 3 ? 0 : portalOpening(camera.position[2] + i * 12)}
        />
      ))}
      {Array.from({ length: 10 }, (_, i) => (
        <group key={i}>
          <Bar position={[-6, 0, 10 - i * 6]} size={[0.035, 9, 0.035]} />
          <Bar position={[6, 0, 10 - i * 6]} size={[0.035, 9, 0.035]} />
          <Bar position={[0, 4.4, 10 - i * 6]} size={[12, 0.035, 0.035]} />
        </group>
      ))}
    </>
  );
}
const worlds: Record<
  SpatialId,
  (props: { s: Scene; textures: Texture[] }) => ReactNode
> = {
  SLALOM_FLYTHROUGH: Flight,
  ORBIT_GALLERY: Orbit,
  PHOTO_TUNNEL: Tunnel,
  SPIRAL_FLIGHT: Spiral,
  DEPTH_DIVE: Dive,
  FROZEN_ORBIT: Frozen,
  EXPLODED_PHOTO: Exploded,
  PORTAL_ROOMS: Portals,
};
function World({ s, kind }: { s: Scene; kind: SpatialId }) {
  const loaded = useLoader(
    TextureLoader,
    s.photos.map((p) => p.src),
  );
  const textures = useMemo(
    () =>
      loaded.map((t) => {
        t.colorSpace = SRGBColorSpace;
        t.anisotropy = 4;
        return t;
      }),
    [loaded],
  );
  const Component = worlds[kind];
  return (
    <>
      <color attach="background" args={["#090e12"]} />
      <fog attach="fog" args={["#090e12", 22, 105]} />
      <ambientLight intensity={1.25} />
      <directionalLight position={[3, 8, 10]} intensity={2} />
      <pointLight position={[-8, 3, 2]} color="#aacfaa" intensity={70} />
      <CameraRig state={cameraFor(kind, s.f)} />
      <Component s={s} textures={textures} />
    </>
  );
}
export function Spatial({ s, kind }: { s: Scene; kind: SpatialId }) {
  const camera = cameraFor(kind, s.f);
  return (
    <>
      <ThreeCanvas
        width={s.w}
        height={s.h}
        dpr={1}
        flat
        camera={{
          position: camera.position,
          fov: camera.fov,
          near: 0.07,
          far: 170,
        }}
        gl={{ antialias: true, preserveDrawingBuffer: true }}
      >
        <World s={s} kind={kind} />
      </ThreeCanvas>
      {kind === "FROZEN_ORBIT" && s.f >= 43 && s.f <= 130 && (
        <div
          style={{
            position: "absolute",
            top: 25,
            left: 28,
            color: "#d8ed78",
            background: "#0b101bcc",
            padding: "10px 15px",
            fontSize: 22,
            letterSpacing: 2,
          }}
        >
          Ⅱ ВРЕМЯ СТОИТ · КАМЕРА ДВИЖЕТСЯ
        </div>
      )}
    </>
  );
}
export const SlalomFlythrough = (s: Scene) => (
  <Spatial s={s} kind="SLALOM_FLYTHROUGH" />
);
export const OrbitGallery = (s: Scene) => (
  <Spatial s={s} kind="ORBIT_GALLERY" />
);
export const PhotoTunnel = (s: Scene) => <Spatial s={s} kind="PHOTO_TUNNEL" />;
export const SpiralFlight = (s: Scene) => (
  <Spatial s={s} kind="SPIRAL_FLIGHT" />
);
export const DepthDive = (s: Scene) => <Spatial s={s} kind="DEPTH_DIVE" />;
export const FrozenOrbit = (s: Scene) => <Spatial s={s} kind="FROZEN_ORBIT" />;
export const ExplodedPhoto = (s: Scene) => (
  <Spatial s={s} kind="EXPLODED_PHOTO" />
);
export const PortalRooms = (s: Scene) => <Spatial s={s} kind="PORTAL_ROOMS" />;
