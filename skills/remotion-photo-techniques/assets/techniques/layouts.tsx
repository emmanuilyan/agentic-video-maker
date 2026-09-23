import {
  Card,
  Image,
  Surface,
  Scene,
  fill,
  mix,
  move,
  smooth,
  noise,
  clamp,
} from "./core";

export function PhotoGrid({ photos, f, w, h }: Scene) {
  const gap = w * 0.015,
    cw = (w - gap * 3) / 2,
    ch = (h - gap * 3) / 2;
  return (
    <>
      {photos.slice(0, 4).map((p, i) => {
        const k = move(f, i * 9, i * 9 + 28);
        return (
          <Card
            key={i}
            p={p}
            x={gap + (i % 2) * (cw + gap)}
            y={gap + Math.floor(i / 2) * (ch + gap) + (1 - k) * 60}
            w={cw}
            h={ch}
            opacity={k}
            scale={mix(0.9, 1, k)}
          />
        );
      })}
    </>
  );
}
export function GridZoom({ photos, f, w, h, accent }: Scene) {
  const gap = w * 0.013,
    cw = (w - gap * 3) / 2,
    ch = (h - gap * 3) / 2;
  // Select a real cell. Scale and translate the ENTIRE grid around its center.
  const zoom = smooth(f, 38, 78) * (1 - smooth(f, 119, 161));
  const s = mix(1, w / cw, zoom),
    cx = gap + cw + gap + cw / 2,
    cy = gap + ch / 2;
  // Interpolate translation from original center; avoids movement while at scale 1.
  return (
    <div
      style={{
        ...fill,
        transformOrigin: "0 0",
        transform: `translate(${(w / 2 - cx) * zoom - (s - 1) * cx}px,${(h / 2 - cy) * zoom - (s - 1) * cy}px) scale(${s})`,
      }}
    >
      {photos.slice(0, 4).map((p, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: gap + (i % 2) * (cw + gap),
            top: gap + Math.floor(i / 2) * (ch + gap),
            width: cw,
            height: ch,
            outline: i === 1 ? `${3 * (1 - zoom)}px solid ${accent}` : "none",
          }}
        >
          <Surface p={p} />
        </div>
      ))}
    </div>
  );
}
export function RollingColumns({ photos, f, w, h }: Scene) {
  const gap = w * 0.014,
    cw = (w - gap * 5) / 4,
    ch = cw * 0.63;
  const distance = (f / 179) * (ch + gap) * 2;
  return (
    <>
      {Array.from({ length: 4 }, (_, c) => (
        <div
          key={c}
          style={{
            position: "absolute",
            left: gap + c * (cw + gap),
            top: 0,
            width: cw,
            height: h,
            overflow: "hidden",
          }}
        >
          {Array.from({ length: 9 }, (_, r) => {
            const dir = c % 2 ? 1 : -1;
            const y = (r - 3) * (ch + gap) + dir * distance + c * ch * 0.31;
            return (
              <Card
                key={r}
                p={photos[(r + c) % photos.length]}
                x={0}
                y={y}
                w={cw}
                h={ch}
              />
            );
          })}
        </div>
      ))}
    </>
  );
}
export function CardStack({ photos, f, w, h }: Scene) {
  const cw = w * 0.67,
    ch = h * 0.78;
  return (
    <>
      {photos.slice(0, 4).map((p, i) => {
        const arrival = move(f, i * 30, i * 30 + 24);
        return (
          <Card
            key={i}
            p={p}
            x={(w - cw) / 2 + (i - 1.5) * 12 + (1 - arrival) * w * 0.8}
            y={(h - ch) / 2 + (i - 1.5) * 6 - (1 - arrival) * h * 0.4}
            w={cw}
            h={ch}
            rotate={(i % 2 ? 1 : -1) * (3 + i) + (1 - arrival) * 30}
            opacity={arrival}
            paper
          />
        );
      })}
    </>
  );
}
export function PhotoWall({ photos, f, w }: Scene) {
  const cw = w * 0.27,
    ch = cw * 0.58,
    gap = w * 0.013;
  const t = smooth(f, 0, 179),
    s = mix(1.18, 0.9, t);
  return (
    <div
      style={{
        ...fill,
        transform: `translate(${mix(-cw * 0.3, -cw * 0.7, t)}px,${mix(-ch * 0.1, -ch * 0.7, t)}px) scale(${s})`,
        transformOrigin: "center",
      }}
    >
      {Array.from({ length: 30 }, (_, i) => (
        <Card
          key={i}
          p={photos[(i + Math.floor(i / 6)) % photos.length]}
          x={(i % 6) * (cw + gap)}
          y={Math.floor(i / 6) * (ch + gap)}
          w={cw}
          h={ch}
          rotate={0}
        />
      ))}
    </div>
  );
}
export function CollageBuild({ photos, f, w, h }: Scene) {
  const slots = [
    [0.035, 0.065, 0.55, 0.59, -6],
    [0.53, 0.04, 0.43, 0.44, 7],
    [0.06, 0.58, 0.4, 0.38, 4],
    [0.52, 0.49, 0.43, 0.47, -5],
  ];
  return (
    <>
      {photos.slice(0, 4).map((p, i) => {
        const [x, y, ww, hh, r] = slots[i];
        const k = move(f, 8 + i * 29, 31 + i * 29);
        return (
          <Card
            key={i}
            p={p}
            x={w * x + (1 - k) * (i % 2 ? w : -w) * 0.7}
            y={h * y + (1 - k) * h * 0.4}
            w={w * ww}
            h={h * hh}
            rotate={r + (1 - k) * (i % 2 ? 35 : -35)}
            scale={mix(0.75, 1, k)}
            opacity={k}
          />
        );
      })}
    </>
  );
}
const torn =
  "polygon(1% 2%, 12% 0%, 23% 2%, 38% 0%, 49% 2%, 63% 0%, 76% 2%, 91% 0%, 99% 3%, 100% 17%, 98% 33%, 100% 47%, 98% 61%, 100% 79%, 98% 99%, 82% 97%, 65% 100%, 51% 98%, 37% 100%, 23% 98%, 7% 100%, 0% 96%, 2% 80%, 0% 63%, 2% 44%, 0% 25%)";
export function PaperCollage({ photos, f, w, h, seed }: Scene) {
  const slots = [
    [0.06, 0.03, 0.48, 0.49, -7],
    [0.52, 0.06, 0.43, 0.46, 6],
    [0.065, 0.53, 0.43, 0.43, 5],
    [0.49, 0.52, 0.45, 0.45, -5],
  ];
  return (
    <>
      <div
        style={{
          ...fill,
          background: "#c9bea8",
          backgroundImage:
            "repeating-linear-gradient(5deg,transparent,transparent 3px,#44361909 4px)",
        }}
      />
      {Array.from({ length: 16 }, (_, i) => (
        <div
          key={i}
          style={{
            position: "absolute",
            left: noise(seed, i) * w,
            top: noise(seed, i + 30) * h,
            width: 50 + noise(seed, i + 60) * 160,
            height: 1,
            background: "#71604522",
            rotate: `${noise(seed, i + 80) * 60}deg`,
          }}
        />
      ))}
      {photos.slice(0, 4).map((p, i) => {
        const [x, y, ww, hh, r] = slots[i],
          k = move(f, i * 29 + 5, i * 29 + 26);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: x * w,
              top: y * h + (1 - k) * h,
              width: ww * w,
              height: hh * h,
              rotate: `${r + (1 - k) * 25}deg`,
              opacity: k,
              filter: "drop-shadow(3px 10px 7px #40311d55)",
            }}
          >
            <div
              style={{
                ...fill,
                background: "#eee8d9",
                clipPath: torn,
                padding: 12,
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  ...fill,
                  inset: 12,
                  width: "calc(100% - 24px)",
                  height: "calc(100% - 24px)",
                  overflow: "hidden",
                }}
              >
                <Image p={p} />
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                left: "37%",
                top: -8,
                width: "29%",
                height: 27,
                rotate: `${-r + 4}deg`,
                background: "#e0c481b5",
                boxShadow: "0 1px 1px #65512b33",
              }}
            />
          </div>
        );
      })}
    </>
  );
}
export function Parallax({ photos, f, w, h }: Scene) {
  const camera = Math.sin((f / 179) * Math.PI * 2 - Math.PI / 2);
  const slots = [
    [0.02, 0.04, 0.52, 0.48, 0.16, -5],
    [0.49, 0.03, 0.45, 0.45, 0.35, 5],
    [0.08, 0.52, 0.4, 0.43, 0.58, 3],
    [0.47, 0.49, 0.48, 0.46, 1, -3],
  ];
  return (
    <>
      <div
        style={{
          ...fill,
          background: "radial-gradient(ellipse at 45% 40%,#343831,#111410 70%)",
          transform: `scale(1.2) translateX(${camera * 5}px)`,
        }}
      />
      {photos.slice(0, 4).map((p, i) => {
        const [x, y, ww, hh, d, r] = slots[i];
        return (
          <Card
            key={i}
            p={p}
            x={w * x + camera * w * 0.065 * d}
            y={h * y + Math.cos((f / 179) * Math.PI * 2) * h * 0.018 * d}
            w={w * ww}
            h={h * hh}
            rotate={r + camera * d * 1.8}
            scale={1 + d * 0.025}
            style={{
              boxShadow: `${-camera * 20 * d}px ${15 + 20 * d}px 45px #0009`,
            }}
          />
        );
      })}
    </>
  );
}
export function CameraFlythrough({ photos, f, w, h }: Scene) {
  const travel = (f / 179) * 3350;
  const focal = w * 0.72;
  // Explicit perspective projection. Camera passes the planes; they leave the frustum.
  const planes = photos
    .slice(0, 4)
    .map((p, i) => ({ p, i, z: 1400 + i * 820 - travel }))
    .filter((a) => a.z > 75)
    .sort((a, b) => b.z - a.z);
  return (
    <>
      <div
        style={{
          ...fill,
          background: "radial-gradient(ellipse at center,#33382d,#060906 74%)",
        }}
      />
      {Array.from({ length: 18 }, (_, i) => {
        const z = 400 + i * 270 - (travel % 270),
          s = focal / z;
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: w / 2 - w * 0.55 * s,
              top: h / 2 - h * 0.7 * s,
              width: w * 1.1 * s,
              height: h * 1.4 * s,
              border: "1px solid #dddfc514",
              boxSizing: "border-box",
            }}
          />
        );
      })}
      {planes.map(({ p, i, z }) => {
        const s = focal / z;
        const x = (i % 2 ? 1 : -1) * w * 0.28;
        const y = ((i % 3) - 1) * h * 0.08;
        const ww = w * 0.63 * s,
          hh = h * 0.67 * s;
        return (
          <Card
            key={i}
            p={p}
            x={w / 2 + x * s - ww / 2}
            y={h / 2 + y * s - hh / 2}
            w={ww}
            h={hh}
            rotate={(i % 2 ? 1 : -1) * 3}
            opacity={clamp((z - 75) / 140)}
            style={{
              border: "3px solid #d3d6c9",
              transform: `perspective(${focal}px) rotateY(${(i % 2 ? 1 : -1) * 17}deg)`,
            }}
          />
        );
      })}
    </>
  );
}
