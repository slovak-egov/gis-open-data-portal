import { ScreenSize } from "@/types/theme";
import { DefaultTheme } from "styled-components";

const white = "#fff";
const black = "#000";
const focus = "#ffdf0f";
const spacingFactor = 4;
const maxWidth = 1366;

const screenSizes = {
  xs: 500,
  sm: 768,
  md: 1026,
  lg: 1560,
  xl: 2000,
};

const primary = {
  main: "#545454",
  dark: "#2b2b2b",
  light: "#808080",
};

const secondary = {
  main: "#003078",
  dark: "#3b34cb",
  light: "#af8eff",
};

const text = {
  light: white,
  dark: "#0b0c0c",
};

const link = {
  main: "#0065b3",
  hover: "#003078",
  active: "#4c2C92",
};

const success = {
  main: "#00703c",
  hover: "#204e2e",
  active: focus,
};

const warning = {
  main: "#ff3333",
  hover: "",
  active: focus,
};

const error = {
  main: "#d0190f",
  hover: "#9e1912",
  active: focus,
};

const shadows = {
  none: "none",
  underline: "0 0 #ffdf0f, 0 4px #0b0c0c",
};

const getSpacing = (spacing?: number) => {
  if (spacing === undefined) return;
  return spacing * spacingFactor;
};

/**
 * THEME DEFINITION
 */
const theme: DefaultTheme = {
  layout: {
    maxWidth,
  },
  screenSizes,
  breakpoints: {
    up: (b: ScreenSize) => {
      return `@media only screen and (min-width: ${screenSizes[b]}px)`;
    },
    down: (b: ScreenSize) => {
      return `@media only screen and (max-width: ${screenSizes[b] - 1}px)`;
    },
  },
  palette: {
    primary,
    secondary,
    text,
    link,
    success,
    warning,
    error,
    focus,
    white,
    black,
    grey: {
      50: "#fafafa",
      100: "#f3f2f1",
      200: "#eeeeee",
      300: "#e0e0e0",
      400: "#dee0e2",
      500: "#9e9e9e",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
      A100: "#d5d5d5",
      A200: "#aaaaaa",
      A400: "#303030",
      A700: "#616161",
      AL400: "rgba(189, 189, 189, 0.6)",
    },
  },
  typography: {
    headingXL: {
      fontSize: "3rem",
      lineHeight: 1.3,
      paddingBottom: 10,
    },
    headingLarge: {
      fontSize: "1.5rem",
    },
    headingMedium: {
      fontSize: "1.3rem",
      lineHeight: 1,
      fontWeight: 700,
    },
    headingSmall: {
      fontSize: "1rem",
      fontWeight: 700,
      paddingTop: 10,
      paddingBottom: 10,
    },
    body: {
      fontSize: "1rem",
    },
    bodySmall: {
      fontSize: "0.8rem",
    },
    bodyLead: {
      fontSize: "1.2rem",
    },
    captionXL: {
      fontSize: "1.5rem",
    },
    captionLarge: {
      fontSize: "1.3rem",
    },
    captionMedium: {
      fontSize: "1.1rem",
    },
  },
  shadows,
  spacing: getSpacing,
};

export default theme;
