import "styled-components";
import {
  Breakpoints,
  Layout,
  Palette,
  ScreenSizes,
  Shadows,
  Spacing,
  Typography,
} from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    layout: Layout;
    palette: Palette;
    typography: Typography;
    spacing: Spacing;
    breakpoints: Breakpoints;
    screenSizes: ScreenSizes;
    shadows: Shadows;
  }
}
