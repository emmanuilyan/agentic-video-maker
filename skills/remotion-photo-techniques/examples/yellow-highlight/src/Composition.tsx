import { AbsoluteFill, Composition } from "remotion";
import { YellowTextHighlight } from "./YellowTextHighlight";

/** Frame zero matches 13.5 seconds in the reference video. */
const REFERENCE_START_SECONDS = 13.5;
const FPS = 24;

const Demo: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        background:
          "linear-gradient(135deg, #c5cbce 0%, #b9bec2 43%, #a8adb1 100%)",
        fontFamily: "Arial, Helvetica, sans-serif",
        color: "#222426",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 185,
          top: 232,
          fontSize: 41,
          fontWeight: 600,
          lineHeight: "49px",
          whiteSpace: "nowrap",
        }}
      >
        Synovial fluid
      </div>

      <YellowTextHighlight
        lines={['"synovial" partially derives', "from ovum, Latin for egg"]}
        style={{ position: "absolute", left: 134, top: 286 }}
        width={306}
        lineHeight={27}
        fontSize={25}
        highlightColor="#E9D642"
        startFrame={Math.round((14.125 - REFERENCE_START_SECONDS) * FPS)}
        staggerFrames={6}
        revealFrames={19}
      />
    </AbsoluteFill>
  );
};

export const MyComposition: React.FC = () => (
  <Composition
    id="YellowTextHighlight"
    component={Demo}
    fps={FPS}
    durationInFrames={48}
    width={1280}
    height={720}
  />
);
