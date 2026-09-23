import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { Scene, Photo, Technique, fill, clamp } from "./core";
import * as L from "./layouts";
import * as E from "./effects";
import * as S from "./spatial";
export { YellowTextHighlight } from "./text-highlight";
export type { YellowTextHighlightProps } from "./text-highlight";
export { IDS } from "./core";
export type { Photo, Technique } from "./core";
const components: Record<Technique, React.FC<Scene>> = {
  PHOTO_GRID: L.PhotoGrid,
  GRID_ZOOM: L.GridZoom,
  ROLLING_COLUMNS: L.RollingColumns,
  CARD_STACK: L.CardStack,
  PHOTO_WALL: L.PhotoWall,
  COLLAGE_BUILD: L.CollageBuild,
  WHIP_PAN: E.WhipPan,
  ZOOM_THROUGH: E.ZoomThrough,
  MATCH_POSITION: E.MatchPosition,
  FREEZE_FRAME: E.FreezeFrame,
  CLONE_TRAIL: E.CloneTrail,
  TEXT_PUSH: E.TextPush,
  TEXT_REVEAL: E.TextReveal,
  TEXT_HIGHLIGHT: E.TextHighlight,
  MASK_REVEAL: E.MaskReveal,
  FLASH_CUT: E.FlashCut,
  IMPACT_SHAKE: E.ImpactShake,
  RGB_SPLIT: E.RgbSplit,
  PIXEL_DISSOLVE: E.PixelDissolve,
  PAPER_COLLAGE: L.PaperCollage,
  PARALLAX: L.Parallax,
  CAMERA_FLYTHROUGH: L.CameraFlythrough,
  SLALOM_FLYTHROUGH: S.SlalomFlythrough,
  ORBIT_GALLERY: S.OrbitGallery,
  PHOTO_TUNNEL: S.PhotoTunnel,
  SPIRAL_FLIGHT: S.SpiralFlight,
  DEPTH_DIVE: S.DepthDive,
  FROZEN_ORBIT: S.FrozenOrbit,
  EXPLODED_PHOTO: S.ExplodedPhoto,
  PORTAL_ROOMS: S.PortalRooms,
};
export type PhotoTechniqueProps = {
  technique: Technique;
  photos: Photo[];
  width?: number;
  height?: number;
  durationInFrames?: number;
  frame?: number;
  text?: string;
  accent?: string;
  seed?: string;
  intensity?: number;
};
export function PhotoTechnique({
  technique,
  photos,
  width,
  height,
  durationInFrames,
  frame,
  text = technique === "TEXT_HIGHLIGHT"
    ? "ЖЁЛТЫЙ МАРКЕР\nЗА ТЕКСТОМ"
    : "СМОТРИ БЛИЖЕ",
  accent = technique === "TEXT_HIGHLIGHT" ? "#E9D642" : "#d8ed78",
  seed = "photo-techniques-v1",
  intensity = 1,
}: PhotoTechniqueProps) {
  const current = useCurrentFrame(),
    config = useVideoConfig();
  if (photos.length !== 4)
    throw new Error(
      "PhotoTechnique requires exactly four photos. For other counts, adapt the chosen layout explicitly.",
    );
  const length = durationInFrames ?? config.durationInFrames;
  if (length < 2) throw new Error("durationInFrames must be at least 2.");
  const f = clamp((frame ?? current) / (length - 1)) * 179,
    Component = components[technique];
  if (!Component) throw new Error(`Unknown photo technique: ${technique}`);
  return (
    <div
      style={{
        ...fill,
        width: width ?? config.width,
        height: height ?? config.height,
        overflow: "hidden",
        background: "#10120e",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <Component
        photos={photos}
        f={f}
        w={width ?? config.width}
        h={height ?? config.height}
        text={text}
        accent={accent}
        seed={seed}
        intensity={clamp(intensity, 0, 2)}
      />
    </div>
  );
}
