import theme from "@/config/theme";
import { TypographyType } from "@/types/types";
import { CSSProperties, CSSObject, DefaultTheme } from "styled-components";

export const touchEffects: CSSProperties = {
  WebkitTapHighlightColor: "rgba(0,0,0,0)",
  WebkitTouchCallout: "none",
  WebkitUserSelect: "none",
  KhtmlUserSelect: "none",
  MozUserSelect: "none",
  msUserSelect: "none",
  userSelect: "none",
  outline: "none",
};

export const getTypographyStyles = (variant: TypographyType): CSSProperties => {
  return {
    fontSize: theme.typography[variant].fontSize,
    lineHeight: theme.typography[variant].lineHeight,
    fontWeight: theme.typography[variant].fontWeight,
  };
};

export const getInputStyles = ({
  theme,
  size,
  width = "100%",
}: {
  theme: DefaultTheme;
  size: number;
  width?: string | number;
}): CSSObject => ({
  marginBottom: theme.spacing(5),
  border: `2px solid ${theme.palette.text.dark}`,
  fontSize: theme.typography.body.fontSize,
  "&:focus": {
    borderWidth: 4,
    outline: `3px solid ${theme.palette.focus}`,
    outlineOffset: 0,
    paddingLeft: "6px",
  },
  height: size ? size : "44px",
  width,
  borderRadius: 0,
  padding: theme.spacing(2),
  "::-webkit-outer-spin-button": {
    margin: 0,
    WebkitAppearance: "none",
    mozAppearance: "none",
    appearance: "none",
  },
  "::-webkit-inner-spin-button": {
    margin: 0,
    WebkitAppearance: "none",
    mozAppearance: "none",
    appearance: "none",
  },
  marginRight: 0,
});
