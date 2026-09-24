import { FormulaRgbPortrait } from "./FormulaRgbPortrait";
import { useCurrentFrame } from "remotion";

export const FormulaRgbPortraitDemo: React.FC = () => {
  const frame = useCurrentFrame();
  return <FormulaRgbPortrait frame={frame} image="paired-portraits.svg" focusX={0.24} focusY={0.28} />;
};
