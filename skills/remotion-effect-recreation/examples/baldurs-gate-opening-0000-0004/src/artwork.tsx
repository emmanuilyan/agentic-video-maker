import { AbsoluteFill } from "remotion";

export type FantasyScene = "ruins" | "knight" | "forest" | "battle" | "city";

const sceneColors: Record<FantasyScene, [string, string, string]> = {
  ruins: ["#071a20", "#126f69", "#69edbd"],
  knight: ["#220b2d", "#d84186", "#ffb9d6"],
  forest: ["#102623", "#48765f", "#b8db9a"],
  battle: ["#161126", "#614096", "#e7c6ff"],
  city: ["#261b1d", "#896555", "#f7b47c"],
};

/** Original vector stand-in. Replace with licensed game or live-action footage. */
export const FantasyBackdrop: React.FC<{
  scene: FantasyScene;
  frame: number;
}> = ({ scene, frame }) => {
  const [dark, mid, glow] = sceneColors[scene];
  const drift = Math.sin(frame / 45) * 11;
  return (
    <AbsoluteFill
      style={{
        overflow: "hidden",
        background: `radial-gradient(ellipse at 72% 32%, ${mid} 0%, ${dark} 63%, #07080e 100%)`,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1280 720"
        preserveAspectRatio="xMidYMid slice"
        style={{
          position: "absolute",
          transform: `translateX(${drift}px) scale(1.03)`,
        }}
      >
        <defs>
          <radialGradient id={`sun-${scene}`}>
            <stop stopColor={glow} stopOpacity=".8" />
            <stop offset="1" stopColor={glow} stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`figure-${scene}`} x2="0" y2="1">
            <stop stopColor={glow} stopOpacity=".88" />
            <stop offset=".2" stopColor={mid} />
            <stop offset="1" stopColor="#10101b" />
          </linearGradient>
        </defs>
        <circle cx="905" cy="192" r="300" fill={`url(#sun-${scene})`} />
        <path
          d="M0 520 130 397 209 453 322 322 500 475 655 339 795 483 1030 320 1280 456 1280 720 0 720Z"
          fill="#0d1320"
          opacity=".63"
        />
        <path
          d="M0 603 189 509 388 576 598 474 746 556 943 463 1120 575 1280 505 1280 720 0 720Z"
          fill="#0b0c13"
          opacity=".78"
        />
        {scene === "city" || scene === "ruins" ? (
          <g fill="#11131b" stroke={glow} strokeOpacity=".22" strokeWidth="3">
            <path d="M38 498V291l45-23v230Zm166 0V158l48-21v361Zm93 0V247l39-20v271Zm650 0V204l51-25v319Zm150 0V115l42-17v400Zm93 0V280l42-19v237Z" />
            <path d="M166 169 227 85l60 84ZM1058 125l61-92 60 92Z" />
          </g>
        ) : null}
        {scene === "forest" ? (
          <g stroke="#0c1c1b" strokeWidth="37" fill="none" opacity=".9">
            <path d="M96 720Q270 350 186-20M1190 720Q1041 359 1134-20M360 720Q322 457 449 121" />
            <path
              d="M180 205Q471 42 734 169M1110 194Q840 23 603 151"
              strokeWidth="82"
            />
          </g>
        ) : null}
        {scene === "knight" || scene === "battle" ? (
          <g transform="translate(620 95)">
            <path
              d="M-198 566Q-218 309-148 221L-88 171 83 171 165 229Q231 339 213 566Z"
              fill={`url(#figure-${scene})`}
              stroke={glow}
              strokeOpacity=".45"
              strokeWidth="8"
            />
            <path
              d="M-99 197Q-132 89-56 34L70 39Q132 107 93 196Z"
              fill="#292332"
              stroke={glow}
              strokeWidth="7"
            />
            <path
              d="M-79 62-139-28l69 33M78 64 152-34 91 9"
              fill="none"
              stroke={glow}
              strokeWidth="15"
              strokeLinecap="round"
            />
            <path
              d="M-136 263-21 376 126 255M-70 204 0 477 72 204"
              fill="none"
              stroke={glow}
              strokeOpacity=".54"
              strokeWidth="10"
            />
            <path d="M-49 129h26m71 0h26" stroke={glow} strokeWidth="7" />
          </g>
        ) : null}
        {scene === "battle" ? (
          <g stroke={glow} strokeWidth="5" opacity=".6">
            <path d="M75 700 440 120M1050 700 850 77M258 620 1010 300" />
            <circle
              cx="928"
              cy="389"
              r="87"
              fill={`url(#sun-${scene})`}
              stroke="none"
            />
          </g>
        ) : null}
      </svg>
      <AbsoluteFill
        style={{
          background:
            "linear-gradient(0deg, rgba(4,4,8,.72), transparent 45%, rgba(0,0,0,.13))",
        }}
      />
    </AbsoluteFill>
  );
};

export const Portrait: React.FC<{ tint?: string }> = ({ tint = "#b8d4d8" }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 300 325"
    preserveAspectRatio="xMidYMid slice"
  >
    <defs>
      <linearGradient id="portrait-background" x2=".85" y2="1">
        <stop stopColor="#8ba9af" />
        <stop offset="1" stopColor="#151b2c" />
      </linearGradient>
      <linearGradient id="portrait-cloak" x2="1" y2="1">
        <stop stopColor="#91355e" />
        <stop offset="1" stopColor="#241c38" />
      </linearGradient>
    </defs>
    <rect width="300" height="325" fill="url(#portrait-background)" />
    <circle cx="219" cy="60" r="86" fill={tint} opacity=".22" />
    <path
      d="M-20 325Q1 241 109 230L169 230Q292 239 321 325Z"
      fill="url(#portrait-cloak)"
      stroke="#ddc79c"
      strokeWidth="6"
    />
    <path d="M119 210h67v66l-33 26-34-26Z" fill="#b6a9a4" />
    <path
      d="M81 91q-12-67 76-74 77 7 65 82l-12 105q-25 43-59 47-40-3-61-48Z"
      fill="#c8c5bd"
      stroke="#6b6873"
      strokeWidth="4"
    />
    <path
      d="M88 119 54 102 89 146M214 119l33-18-34 45"
      fill="#c8c5bd"
      stroke="#6b6873"
      strokeWidth="4"
    />
    <path
      d="M87 120Q76 25 159 13q74 5 63 110-21-48-61-58-36 30-74 55Z"
      fill="#e9e8e0"
      stroke="#939da2"
      strokeWidth="5"
    />
    <path
      d="M109 154q20-8 35 1m25 0q18-9 33 1"
      stroke="#272838"
      strokeWidth="6"
      fill="none"
    />
    <path
      d="M150 156q-9 34-2 41h15"
      stroke="#847d80"
      strokeWidth="4"
      fill="none"
    />
    <path
      d="M131 215q25 10 51-2"
      stroke="#7d676a"
      strokeWidth="4"
      fill="none"
    />
  </svg>
);
