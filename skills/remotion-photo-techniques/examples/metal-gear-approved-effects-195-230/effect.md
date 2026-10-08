# Approved effect recipes

Canvas1280×720,60fps. Four independent overlays in project/src/Effects.tsx. Comparison original-left at2560×720.

- VergilTitle:195.300–197.700;144frames. Three-row complete title fromf8, fast entrance tillf12. Bottom italic caption enters separately throughf14. Hold untilf120, both go right byf132. Source-specific blue title RGBA plus isolated lower-caption artwork. Recovered moving background retains observed footage palette; attribution of that palette is uncertain, it is not separately recreated.
- PovRGB:216.400–217.500;66frames. Processingf8–53, hardcutf54. POV whole block arrives nearf8–12; lower complete text risesf10–16. Moving reconstructed luminance background receives independent warm/contrast and edge filter. Recovered tone is approximate, source-specific pixel captions separate artwork.
- RedHUD:219.200–220.800;96frames. Colorf9–81, brain full f13, indicatorsf14–24, central small label fromf50. Scene cutf82. Independent SVG boxes/connectors, source-specific transparent brain PNG, scanning lines and changing blurred red patches. Exact connector labels/shapes approximate. HUD original authorship uncertain; reusable observed interface treatment.
- PresidentCaption:228.000–230.000;120frames. PRESIDENT left entrancef10–15; full PRESIDENT BUMCRACK onf38 background cut; pink OSAMA rises/rightf64–73; dissolvef103–108. Extracted still text sprites and moving inpainted background. Inpaint hidden imagery approximate.

HUD v7: separate custom SVG glyph variants atf49/52/55/58/61/64/67/70/73/76/79, drawn from source-specific artwork, independently selected every3frames. Replace these variants for other content. Upper indicator x480,y400,340×35; lower rectangle x474,y438,337×28. Independent color-transfer filter uses sRGB gamma1.47, amplitudesR1.546/G.690/B.725, offsets .007/.008/.008 fitted from reconstructed moving luminance to source background. Six deterministic irregular vertical color fragments, blur5px,opacity.14. No source-effect video is used as recreated HUD.

Final HUD v10: channels/gamma interpolate f9–15, contrast1.25 brightness1.08; local multiply shadows #0003. Native color f9–10 retained; recovered grayscale f11–81; emblem full f13; nativecolor hardcutf82. Background red-light distribution and exact small labels differ from source; approved as transferable interface treatment.

Reuse: Effects.tsx exports each component with {frame,duration}. Rename media paths or expose them as props for new footage; replace caption sprites and SVG glyph variants for new text. Normalize positions by1280/720 for other canvases. Native gameplay camera and palette are demo material, not claimed editorial animation.
