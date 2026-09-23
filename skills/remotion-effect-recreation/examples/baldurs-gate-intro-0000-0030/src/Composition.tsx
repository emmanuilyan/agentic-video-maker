import { AbsoluteFill, useCurrentFrame } from "remotion";
import {
  FantasyBackdrop,
  FlashZoom,
  GradientLowerThird,
  GlitchIntertitle,
  ImpactCaption,
  InkFrame,
  MathOverlay,
  MemeInsertCard,
  OrangeImpactTitle,
  PictureInPicture,
  Portrait,
  StackedSerifTitle,
  TwoLineCaption,
  UnderlinedSerifTitle,
  WarningCard,
  type FantasyScene,
} from "./effects";

const FPS = 30;

/** Decorative original stand-in for a game's built-in HUD. */
const GameHud: React.FC<{ frame: number }> = ({ frame }) => (
  <AbsoluteFill
    style={{
      pointerEvents: "none",
      color: "#d9cdae",
      fontFamily: "Georgia, serif",
    }}
  >
    <div
      style={{
        position: "absolute",
        right: 29,
        top: 28,
        width: 115,
        height: 115,
        borderRadius: "50%",
        border: "7px ridge #ad8e63",
        background:
          "radial-gradient(circle,#8b7656 0%,#3c4136 35%,#292c2b 70%)",
        boxShadow: "0 5px 12px #0008",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 54,
          top: 55,
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "#efcf9e",
        }}
      />
    </div>
    <div
      style={{
        position: "absolute",
        left: 18,
        top: 172,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
    >
      {["✦", "✣", "✧", "✛"].map((symbol, index) => (
        <div
          key={index}
          style={{
            width: 43,
            height: 43,
            border: "2px solid #98866d",
            background: "#1b2026dc",
            display: "grid",
            placeItems: "center",
            fontSize: 23,
            color: ["#a5d5cc", "#dba79e", "#c0b5e0", "#dfcd97"][index],
          }}
        >
          {symbol}
        </div>
      ))}
    </div>
    <div
      style={{
        position: "absolute",
        left: 185,
        bottom: 19,
        width: 884,
        height: 75,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 5,
        background: "linear-gradient(#333239d9,#11151ade)",
        border: "3px ridge #957e60",
        boxShadow: "0 3px 16px #000a",
      }}
    >
      {Array.from({ length: 19 }, (_, index) => (
        <div
          key={index}
          style={{
            width: 36,
            height: 42,
            border: "1px solid #826d56",
            background: `radial-gradient(circle at 40% 38%,${["#74c7ca", "#d9975f", "#b788cc", "#cf6c6c"][index % 4]},#25232c 75%)`,
            opacity: 0.75 + Math.sin(frame / 8 + index) * 0.1,
          }}
        />
      ))}
    </div>
  </AbsoluteFill>
);

const ExplosionVisual: React.FC<{ frame: number }> = ({ frame }) => {
  const size = 80 + Math.min(frame, 24) * 29;
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        style={{
          position: "absolute",
          left: 610 - size / 2,
          top: 330 - size / 2,
          width: size,
          height: size,
          borderRadius: "50%",
          background:
            "radial-gradient(circle,#fffdf2 0%,#fff1b0 13%,#ffb865 31%,#e46a36 49%,#582229aa 70%,transparent 74%)",
          filter: `blur(${Math.max(0, 12 - frame / 2)}px)`,
          mixBlendMode: "screen",
        }}
      />
      {Array.from({ length: 42 }, (_, index) => {
        const angle = index * 2.39996;
        const distance = Math.min(frame, 25) * (8 + (index % 5) * 3);
        return (
          <div
            key={index}
            style={{
              position: "absolute",
              left: 620 + Math.cos(angle) * distance,
              top: 340 + Math.sin(angle) * distance,
              width: 7 + (index % 6),
              height: 16 + (index % 22),
              background: index % 3 === 0 ? "#fff5d2" : "#ef7d48",
              transform: `rotate(${angle}rad)`,
              opacity: Math.max(0, 1 - frame / 42),
              boxShadow: "0 0 10px #f9ba6a",
            }}
          />
        );
      })}
    </AbsoluteFill>
  );
};

const Shot: React.FC<{ scene: FantasyScene; frame: number; hud?: boolean }> = ({
  scene,
  frame,
  hud = true,
}) => (
  <AbsoluteFill>
    <FantasyBackdrop scene={scene} frame={frame} />
    {hud ? <GameHud frame={frame} /> : null}
  </AbsoluteFill>
);

/** The source is 60 fps; this 30 fps reel preserves approximate edit timings. */
export const IntroEffectsReel: React.FC = () => {
  const frame = useCurrentFrame();
  const seconds = frame / FPS;
  let content: React.ReactNode;

  if (seconds < 2.9) {
    content = (
      <>
        <Shot scene="ruins" frame={frame} hud={false} />
        <WarningCard frame={frame} />
      </>
    );
  } else if (seconds < 4.25) {
    const local = frame - 87;
    content = (
      <>
        <Shot scene="knight" frame={frame} hud={false} />
        <StackedSerifTitle frame={local} lines={["FANTASY", "CHAOS", "III"]} />
      </>
    );
  } else if (seconds < 8.6) {
    const scene: FantasyScene =
      seconds < 5.75
        ? "knight"
        : seconds < 6.58
          ? "city"
          : seconds < 7.12
            ? "forest"
            : "battle";
    const characterInsert = seconds >= 6.58 && seconds < 7.12;
    const base = characterInsert ? (
      <>
        <Shot scene="forest" frame={frame} hud={false} />
        <div
          style={{
            position: "absolute",
            left: 441,
            top: 43,
            width: 420,
            height: 570,
            overflow: "hidden",
            borderRadius: "36% 36% 0 0",
          }}
        >
          <Portrait tint="#d3b2ab" />
        </div>
        <div
          style={{
            position: "absolute",
            right: 25,
            top: 35,
            width: 265,
            height: 493,
            border: "5px ridge #927751",
            background: "linear-gradient(#1e2120ee,#151a20ef)",
            color: "#d6caad",
            fontFamily: "Georgia, serif",
            textAlign: "center",
            fontSize: 20,
            padding: 15,
            boxSizing: "border-box",
            lineHeight: 1.7,
          }}
        >
          ◆ HERO ◆<br />
          Level 1 Mage
          <br />
          <br />
          STR&nbsp; DEX&nbsp; CON
          <br />
          12&nbsp;&nbsp; 17&nbsp;&nbsp; 14
          <br />
          <br />
          Abilities
          <br />✣ &nbsp; ✦ &nbsp; ✧<br />
          <br />
          Proficiencies
          <br />
          Arcana • History
        </div>
        {seconds >= 6.68 ? <PictureInPicture frame={frame - 200} /> : null}
      </>
    ) : (
      <Shot scene={scene} frame={frame} hud={seconds >= 5.75} />
    );
    content = (
      <>
        {seconds >= 8.42 ? (
          <FlashZoom frame={frame - 253} strength={0.68}>
            {base}
          </FlashZoom>
        ) : (
          base
        )}
        {seconds >= 8.0 ? (
          <ImpactCaption frame={frame - 240} text="NICE SHOT" />
        ) : null}
      </>
    );
  } else if (seconds < 11.6) {
    const scene = seconds < 9.5 ? "battle" : "forest";
    content = (
      <>
        <Shot scene={scene} frame={frame} hud={seconds < 9.5} />
        {seconds >= 10.75 ? (
          <>
            <div
              style={{
                position: "absolute",
                left: 390,
                top: 106,
                width: 420,
                height: 490,
                overflow: "hidden",
                borderRadius: 30,
                opacity: 0.84,
              }}
            >
              <Portrait tint="#e9c4a2" />
            </div>
            <MathOverlay frame={frame - 322} />
          </>
        ) : null}
      </>
    );
  } else if (seconds < 13.2) {
    content = <Shot scene={seconds < 12.5 ? "forest" : "city"} frame={frame} />;
  } else if (seconds < 14.73) {
    const cardIndex = seconds < 13.72 ? 0 : seconds < 14.02 ? 1 : 2;
    const labels = ["WILD CARD", "ARCANE HERO", "GNOME WIZARD"];
    const starts = [396, 412, 421];
    content = (
      <>
        <Shot scene={cardIndex === 1 ? "forest" : "knight"} frame={frame} />
        <MemeInsertCard
          frame={frame - starts[cardIndex]}
          label={labels[cardIndex]}
        />
      </>
    );
  } else if (seconds < 15.53) {
    content = (
      <>
        <Shot
          scene={frame < 451 ? "forest" : "city"}
          frame={frame}
          hud={false}
        />
        <UnderlinedSerifTitle frame={frame - 442} text="A Chaotic Adventure" />
      </>
    );
  } else if (seconds < 16.43) {
    content = (
      <GlitchIntertitle
        frame={frame - 466}
        top="I LACK FOOTAGE"
        bottom="HERE'S MY TIMELINE INSTEAD"
      >
        <Shot scene="forest" frame={frame} hud={false} />
      </GlitchIntertitle>
    );
  } else if (seconds < 17.2) {
    content = <Shot scene="knight" frame={frame} hud={false} />;
  } else if (seconds < 18.2) {
    const local = frame - 516;
    const base = <Shot scene="battle" frame={frame} />;
    content = (
      <>
        <FlashZoom frame={local} start={17} strength={0.76}>
          {base}
        </FlashZoom>
        <TwoLineCaption
          frame={local}
          top="WE ARE GOING TO"
          bottom="WIN THIS FIGHT"
        />
      </>
    );
  } else if (seconds < 19.75) {
    content = <Shot scene="forest" frame={frame} hud={false} />;
  } else if (seconds < 20.9) {
    const local = frame - 592;
    content = (
      <>
        <FlashZoom frame={local} start={13} strength={0.9}>
          <Shot scene="battle" frame={frame} />
        </FlashZoom>
        <GradientLowerThird
          frame={local}
          text={local < 14 ? "THE QUEST" : "THE QUEST EXPERIENCE"}
        />
      </>
    );
  } else if (seconds < 25.7) {
    const cut = Math.floor((seconds - 20.9) / 0.68);
    const scene: FantasyScene =
      cut % 3 === 0 ? "city" : cut % 3 === 1 ? "battle" : "ruins";
    const flashAge = (frame - 627) % 66;
    const base = <Shot scene={scene} frame={frame} />;
    content = (
      <>
        {flashAge < 11 && seconds > 22 ? (
          <FlashZoom frame={flashAge} strength={0.56}>
            {base}
          </FlashZoom>
        ) : (
          base
        )}
        {seconds < 21.75 || seconds >= 26.4 ? <InkFrame /> : null}
      </>
    );
  } else if (seconds < 26.43) {
    const local = frame - 771;
    content = (
      <>
        <FlashZoom frame={local} start={0} strength={0.75}>
          <Shot scene="city" frame={frame} />
        </FlashZoom>
        <ExplosionVisual frame={local} />
        <OrangeImpactTitle frame={local} top="MY SPELL IS" bottom="SPICY" />
      </>
    );
  } else if (seconds < 28) {
    content = (
      <>
        <Shot scene="city" frame={frame} hud={false} />
        <InkFrame />
      </>
    );
  } else if (seconds < 29.1) {
    const local = frame - 840;
    content = (
      <>
        <Shot scene="city" frame={frame} hud={false} />
        <ExplosionVisual frame={local} />
      </>
    );
  } else {
    const local = frame - 873;
    content = (
      <FlashZoom frame={local} strength={1.2}>
        <Shot scene="forest" frame={frame} hud={false} />
        {seconds >= 29.82 ? (
          <div
            style={{
              position: "absolute",
              left: 415,
              top: 90,
              width: 450,
              height: 620,
              overflow: "hidden",
              filter: "blur(5px)",
            }}
          >
            <Portrait tint="#d9a78f" />
          </div>
        ) : null}
      </FlashZoom>
    );
  }

  return (
    <AbsoluteFill style={{ background: "#050508" }}>{content}</AbsoluteFill>
  );
};
