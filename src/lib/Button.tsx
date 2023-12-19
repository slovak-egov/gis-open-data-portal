import styled, { CSSProperties } from "styled-components";
import theme from "@/config/theme";
import { ReactNode } from "react";
import { useTranslations } from "next-intl";
import { ButtonVariant, IconVariant, LinkArray } from "../types/types";
import { Font } from "./Font";
import { Icon } from "./Icon";
import { Link } from "./Link";
import { getTypographyStyles, touchEffects } from "./Styles";

interface ButtonProps {
  label?: string;
  variant?: ButtonVariant;
  children?: ReactNode | ReactNode[];
  startAdornment?: IconVariant;
  endAdornment?: IconVariant;
  isClicked?: boolean;
  onClick?: () => void;
  links?: LinkArray;
}

const getButtonStyles = (variant: ButtonVariant) => {
  const common: CSSProperties = {
    border: "none",
    cursor: "pointer",
    ...touchEffects,
  };

  const active: CSSProperties = {
    textDecoration: "none",
    color: theme.palette.text.dark,
    outline: "3px solid transparent",
    boxShadow: theme.shadows.underline,
  };

  if (variant === "text")
    return {
      ...common,
      ...getTypographyStyles("headingSmall"),
      background: "none",
      color: theme.palette.text.light,
      padding: 0,
      "& svg": {
        fill: theme.palette.text.dark,
      },
      "&:hover": {
        textDecoration: "underline",
      },
      "&:focus": {},
      "&:active": {
        ...active,
        backgroundColor: theme.palette.focus,
        "& svg": {
          fill: theme.palette.text.dark,
        },
      },
    };
  if (variant === "contrast")
    return {
      ...common,
      ...getTypographyStyles("headingSmall"),
      background: "none",
      color: theme.palette.text.light,
      padding: 0,
      "& svg": {
        fill: theme.palette.text.light,
      },
      "&:hover": {
        textDecoration: "underline",
      },
      "&:active": {
        ...active,
        backgroundColor: theme.palette.focus,
        "& svg": {
          fill: theme.palette.text.dark,
        },
      },
    };
  if (variant === "success")
    return {
      ...common,
      ...getTypographyStyles("headingMedium"),
      backgroundColor: theme.palette.success.main,
      color: theme.palette.text.light,
      padding: 12,
      "&:hover": {
        backgroundColor: theme.palette.success.hover,
      },
      "&:active": {
        ...active,
        backgroundColor: theme.palette.success.active,
        "& svg": {
          fill: theme.palette.text.dark,
        },
      },
      "& svg": {
        fill: theme.palette.text.light,
      },
    };
  if (variant === "navigation") {
    return {
      ...common,
      ...getTypographyStyles("captionMedium"),
      background: "none",
      display: "inline-block",
      textDecoration: "none",
      color: theme.palette.text.dark,
      padding: "12px 12px 12px 15px",
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
    };
  }
  if (variant === "search") {
    return {
      ...common,
      background: "none",
      backgroundColor: theme.palette.success.main,
      width: 44,
      height: 44,
      "&:hover": {
        backgroundColor: theme.palette.success.hover,
      },
      "&:active": {
        backgroundColor: theme.palette.focus,
        "& svg": {
          fill: theme.palette.text.dark,
        },
      },
      "& svg": {
        fill: theme.palette.text.light,
      },
    };
  }
  if (variant === "normal") {
    return {
      ...common,
      ...getTypographyStyles("headingMedium"),
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.text.light,
      padding: 12,
      "&:hover": {
        backgroundColor: theme.palette.grey[800],
      },
      "&:active": {
        ...active,
        backgroundColor: theme.palette.success.active,
        "& svg": {
          fill: theme.palette.text.dark,
        },
      },
      "& svg": {
        fill: theme.palette.text.light,
      },
    };
  }
};

const Base = styled.button<ButtonProps>(({ variant }) =>
  getButtonStyles(variant || "normal")
);

const Wrapper = styled.div({
  position: "relative",
  display: "inline-block",
  whiteSpace: "nowrap",
});

const Dropdown = styled.div({
  display: "flex",
  position: "absolute",
  flexDirection: "column",
  backgroundColor: theme.palette.grey[100],
  alignItems: "flex-end",
  padding: "15px",
  zIndex: 1,
  left: "auto",
  right: 0,
  top: "49px",
  gap: "12px",
});

export const Button = ({
  label,
  variant,
  children,
  startAdornment,
  endAdornment,
  isClicked,
  onClick,
  links,
}: ButtonProps) => {
  const t = useTranslations();

  if (variant === "navigation") {
    return (
      <Wrapper>
        <Base
          className={Font.className}
          variant="navigation"
          onClick={onClick}
          isClicked={isClicked}
        >
          {label && t(label)}
          <Icon variant="dropdown" isClicked={isClicked || false} />
          {isClicked && (
            <Dropdown>
              {links?.map((link, index) => (
                <Link key={index} to={link.to} color="dark">
                  {t(link.label)}
                </Link>
              ))}
            </Dropdown>
          )}
        </Base>
      </Wrapper>
    );
  }
  if (variant === "search") {
    return (
      <Base variant="search" onClick={onClick}>
        <Icon variant="search" />
      </Base>
    );
  }
  return (
    <Base className={Font.className} variant={variant} onClick={onClick}>
      {startAdornment && <Icon variant={startAdornment} />}
      {(label && t(label)) || children}
      {(endAdornment === "dropdown" && (
        <Icon variant="dropdown" isClicked={isClicked || false} />
      )) ||
        (endAdornment && <Icon variant={endAdornment} />)}
    </Base>
  );
};
