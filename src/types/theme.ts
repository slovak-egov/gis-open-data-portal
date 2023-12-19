import { CSSObject } from "styled-components";

type PaletteColor = {
  main: string;
  light?: string;
  dark?: string;
};

type TextColor = {
  light: string;
  dark: string;
};

type LinkColor = {
  main: string;
  hover: string;
  active: string;
};

export type GreyColor = {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  A100: string;
  A200: string;
  A400: string;
  A700: string;
  AL400: string;
};

export type Palette = {
  primary: PaletteColor;
  secondary: PaletteColor;
  text: TextColor;
  link: LinkColor;
  success: LinkColor;
  warning: LinkColor;
  error: LinkColor;
  focus: string;
  black: string;
  white: string;
  grey: GreyColor;
};

export type Typography = {
  headingXL: CSSObject;
  headingLarge: CSSObject;
  headingMedium: CSSObject;
  headingSmall: CSSObject;
  body: CSSObject;
  bodyLead: CSSObject;
  bodySmall: CSSObject;
  captionXL: CSSObject;
  captionLarge: CSSObject;
  captionMedium: CSSObject;
};

export type Spacing = (spacing: number) => number | undefined;

export type ScreenSize = "xs" | "sm" | "md" | "lg" | "xl";

export type ScreenSizes = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type Breakpoints = {
  up: (b: ScreenSize) => string;
  down: (b: ScreenSize) => string;
};

export type Shadows = {
  none: string;
  underline: string;
};
