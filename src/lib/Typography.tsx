import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { TypographyVariant, BaseColor } from "@/types/types";
import { CSSTextAling } from "@/types/css";
import styled, { useTheme } from "styled-components";

interface BaseProps {
  children?: string | string[] | ReactNode;
  variant?: TypographyVariant;
  label?: string;
}

const HeadingXL = styled.h1(({ theme }) => ({
  ...theme.typography.headingXL,
}));

const HeadingLarge = styled.h2(({ theme }) => ({
  ...theme.typography.headingLarge,
}));

const HeadingMedium = styled.h3(({ theme }) => ({
  ...theme.typography.headingMedium,
}));

const HeadingSmall = styled.h4(({ theme }) => ({
  ...theme.typography.headingSmall,
}));

const Body = styled.p(({ theme }) => ({
  ...theme.typography.body,
}));

const BodyLead = styled.p(({ theme }) => ({
  ...theme.typography.bodyLead,
}));

const BodySmall = styled.p(({ theme }) => ({
  ...theme.typography.bodySmall,
}));

const CaptionXL = styled.span(({ theme }) => ({
  ...theme.typography.captionXL,
}));
const CaptionLarge = styled.span(({ theme }) => ({
  ...theme.typography.captionLarge,
}));
const CaptionMedium = styled.span(({ theme }) => ({
  ...theme.typography.captionMedium,
}));

const Default = styled.span<BaseProps>(({ theme }) => theme.typography.body);

const TypographyBase = ({ variant, label, children, ...rest }: BaseProps) => {
  const t = useTranslations();

  if (variant === "heading.xl")
    return <HeadingXL {...rest}>{(label && t(label)) || children}</HeadingXL>;
  if (variant === "heading.large")
    return (
      <HeadingLarge {...rest}>{(label && t(label)) || children}</HeadingLarge>
    );
  if (variant === "heading.medium")
    return (
      <HeadingMedium {...rest}>{(label && t(label)) || children}</HeadingMedium>
    );
  if (variant === "heading.small")
    return (
      <HeadingSmall {...rest}>{(label && t(label)) || children}</HeadingSmall>
    );
  if (variant === "caption.xl")
    return <CaptionXL {...rest}>{(label && t(label)) || children}</CaptionXL>;
  if (variant === "caption.large")
    return (
      <CaptionLarge {...rest}>{(label && t(label)) || children}</CaptionLarge>
    );
  if (variant === "caption.medium")
    return (
      <CaptionMedium {...rest}>{(label && t(label)) || children}</CaptionMedium>
    );
  if (variant === "body")
    return <Body {...rest}>{(label && t(label)) || children}</Body>;
  if (variant === "body.lead")
    return <BodyLead {...rest}>{(label && t(label)) || children}</BodyLead>;
  if (variant === "body.small")
    return <BodySmall {...rest}>{(label && t(label)) || children}</BodySmall>;

  return <Default {...rest}>{(label && t(label)) || children}</Default>;
};

interface TypographyProps extends BaseProps {
  align?: CSSTextAling;
  margin?: number;
  bold?: boolean;
  color?: BaseColor;
  gutterBottom?: boolean;
  lineHeight?: number;
}

export const Typography = styled(TypographyBase)<TypographyProps>(
  ({ align = "inherit", color, margin, bold, lineHeight, gutterBottom }) => {
    const theme = useTheme();
    return {
      textAlign: align,
      lineHeight,
      color:
        color === "dark"
          ? theme.palette.text.dark
          : color === "light"
          ? theme.palette.text.light
          : color === "grey"
          ? theme.palette.grey[600]
          : theme.palette.text.dark,
      fontWeight: bold ? 600 : undefined,
      marginBottom: gutterBottom ? theme.spacing(2) : 0,
      margin: margin ? theme.spacing(margin) : 0,
      marginLeft: 0,
      whiteSpace: "pre-line",
    };
  }
);
