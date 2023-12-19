import { CSSObject, DefaultTheme } from "styled-components";

export interface BaseInputProps {
  label?: string;
  errors?: string[];
  width?: string | number;
}

export const createBaseStyles = ({
  theme,
  size,
  width = "100%",
}: {
  theme: DefaultTheme;
  size: number;
  width?: string | number;
}): CSSObject => ({
  marginBottom: 20,
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
