import { AbsoluteFill, Img, interpolate, staticFile } from "remotion";

export type EditorNameplateProps = {
  frame: number;
  /** Three full-frame stills. Each contains the interface, left insert, character, and title. */
  scenes: readonly [string, string, string];
  previousScene?: string;
  switchFrames?: readonly [number, number];
  transitionFrames?: number;
  leadFrames?: number;
  introStartFrame?: number;
  initialSettleFrame?: number;
  zoomFrames?: number;
  zoomScale?: number;
  focusX?: number;
  focusY?: number;
};

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/**
 * The insert and nameplate lead each character change. After the new state
 * settles, its whole screenshot pushes toward the character and stays close.
 */
export const EditorNameplate: React.FC<EditorNameplateProps> = ({
  frame,
  scenes,
  previousScene,
  switchFrames = [27, 51],
  transitionFrames = 6,
  leadFrames = 4,
  introStartFrame = 2,
  initialSettleFrame = 14,
  zoomFrames = 3,
  zoomScale = 1.1,
  focusX = 0.57,
  focusY = 0.38,
}) => {
  const [firstSwitch, secondSwitch] = switchFrames;
  const introFrame = previousScene ? introStartFrame : 0;
  const firstEnd = firstSwitch + transitionFrames;
  const secondEnd = secondSwitch + transitionFrames;
  const firstLead = firstSwitch - leadFrames;
  const secondLead = secondSwitch - leadFrames;

  const transition = (start: number) =>
    interpolate(frame, [start, start + transitionFrames / 2, start + transitionFrames], [0, 0.55, 1], clamp);
  const firstSwap = transition(firstSwitch);
  const secondSwap = transition(secondSwitch);
  const weights: [number, number, number] =
    frame < introFrame ? [0, 0, 0]
    : frame < firstSwitch ? [1, 0, 0]
    : frame < firstEnd ? [1 - firstSwap, firstSwap, 0]
    : frame < secondSwitch ? [0, 1, 0]
    : frame < secondEnd ? [0, 1 - secondSwap, secondSwap]
    : [0, 0, 1];

  const introY = interpolate(frame, [introFrame, introFrame + 6, initialSettleFrame], [24, -3, 0], clamp);
  const introScale = interpolate(frame, [introFrame, introFrame + 6, initialSettleFrame], [0.97, 1.01, 1], clamp);
  const introBlur = interpolate(frame, [introFrame, introFrame + 6, initialSettleFrame], [4, 1, 0], clamp);
  const transitionBlur = Math.max(
    interpolate(frame, [firstSwitch, firstSwitch + transitionFrames / 2, firstEnd], [0, 3, 0], clamp),
    interpolate(frame, [secondSwitch, secondSwitch + transitionFrames / 2, secondEnd], [0, 3, 0], clamp),
  );
  const zoomStarts = [initialSettleFrame, firstEnd, secondEnd];
  const cameraScale = (index: number) => {
    const age = Math.max(0, frame - zoomStarts[index]);
    return interpolate(age, [0, zoomFrames], [1, zoomScale], clamp);
  };
  const earlyIndex = frame < secondLead ? 1 : 2;
  const earlyOpacity = earlyIndex === 1
    ? interpolate(frame, [firstLead, firstSwitch], [0, 1], clamp)
    : interpolate(frame, [secondLead, secondSwitch], [0, 1], clamp);
  const transformOrigin = `${focusX * 100}% ${focusY * 100}%`;

  return (
    <AbsoluteFill style={{ overflow: "hidden", background: "#070a10" }}>
      {previousScene && (
        <Img
          src={staticFile(previousScene)}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: 1 - interpolate(frame, [0, introFrame], [0, 1], clamp) }}
        />
      )}
      {scenes.map((scene, index) => (
        <Img
          key={scene}
          src={staticFile(scene)}
          style={{
            position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
            opacity: weights[index],
            filter: `blur(${introBlur + transitionBlur}px)`,
            translate: `0px ${introY}px`,
            scale: introScale * cameraScale(index),
            transformOrigin,
          }}
        />
      ))}
      <Img
        src={staticFile(scenes[earlyIndex])}
        style={{
          position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover",
          opacity: earlyOpacity,
          clipPath: "polygon(0 0, 34% 0, 34% 70%, 100% 70%, 100% 100%, 0 100%)",
          filter: `blur(${(1 - earlyOpacity) * 2}px)`,
          translate: `0px ${introY}px`,
          scale: introScale * cameraScale(earlyIndex),
          transformOrigin,
        }}
      />
    </AbsoluteFill>
  );
};
