import styled from "styled-components";
import theme from "@/config/theme";
import NextLink from "next/link";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { BaseColor, LinkVariant } from "@/types/types";
import { touchEffects } from "./Styles";

interface LinkProps {
  to?: string;
  label?: string;
  target?: string;
  variant?: LinkVariant;
  children?: ReactNode;
  color?: BaseColor;
  legacyBehavior?: boolean;
}

const Base = styled(NextLink)<LinkProps>(({ color }) => ({
  ...touchEffects,
  textDecoration: "underline",
  textDecorationThickness: "max(1px, .0625rem)",
  textUnderlineOffset: "0.1em",
  display: "inline",
  alignItems: "center",
  cursor: "pointer",
  color:
    color === "light"
      ? theme.palette.text.light
      : color === "dark"
      ? theme.palette.text.dark
      : color === "grey"
      ? theme.palette.grey[600]
      : theme.palette.link.main,
  "&:hover": {
    textDecorationThickness: "max(3px, .1875rem, .12em)",
    textDecorationSkip: "none",
    textDecorationSkipInk: "none",
    WebkitTextDecorationSkip: "none",
    WebKitTextDecorationSkipInk: "none",
  },
}));

const Invisible = styled(NextLink)<LinkProps>(() => ({
  ...touchEffects,
  textDecoration: "none",
  cursor: "pointer",
  color: "inherit",
  "&:visited": {
    color: "inherit",
  },
}));

const Title = styled(NextLink)<LinkProps>(() => ({
  ...touchEffects,
  textDecoration: "none",
  cursor: "pointer",
  color: "inherit",
  "&:active": {
    textDecoration: "underline",
    textDecorationThickness: "max(3px, .1875rem, .12em)",
    textUnderlineOffset: "0.4em",
    boxShadow: theme.shadows.underline,
  },
  "&:visited": {
    color: "inherit",
  },
}));

const Navigation = styled(NextLink)<LinkProps>(() => ({
  ...touchEffects,
  border: "none",
  cursor: "pointer",
  background: "none",
  fontSize: theme.typography.captionMedium.fontSize,
  lineHeight: theme.typography.captionMedium.lineHeight,
  fontWeight: theme.typography.captionMedium.fontWeight,
  textDecoration: "none",
  color: theme.palette.text.dark,
  padding: "12px 15px 12px 15px",
  "&:hover": {
    backgroundColor: theme.palette.grey[100],
  },
  "&:active": {
    backgroundColor: theme.palette.focus,
    outline: "3px solid transparent",
    boxShadow: theme.shadows.underline,
  },
  "& svg": {
    fill: theme.palette.text.dark,
  },
}));

export const Link = ({
  to,
  label,
  color,
  target,
  variant,
  children,
  legacyBehavior,
}: LinkProps) => {
  const t = useTranslations();
  if (variant === "invisible")
    return (
      <Invisible
        href={to || "#"}
        color={color}
        target={target}
        legacyBehavior={legacyBehavior}
      >
        {(label && t(label)) || children}
      </Invisible>
    );
  if (variant === "title")
    return (
      <Title
        href={to || "#"}
        color={color}
        target={target}
        legacyBehavior={legacyBehavior}
      >
        {(label && t(label)) || children}
      </Title>
    );
  if (variant === "navigation")
    return (
      <Navigation
        href={to || "#"}
        target={target}
        legacyBehavior={legacyBehavior}
      >
        {(label && t(label)) || children}
      </Navigation>
    );
  return (
    <Base
      href={to || "#"}
      color={color}
      target={target}
      legacyBehavior={legacyBehavior}
    >
      {(label && t(label)) || children}
    </Base>
  );
};
