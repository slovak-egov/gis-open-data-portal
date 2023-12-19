import styled from "styled-components";
import theme from "@/config/theme";
import { LogoVariant } from "@/types/types";
import { Link } from "@/lib/Link";
import Image from "next/image";

interface Props {
  variant?: LogoVariant;
}

const getLogoStyles = (variant: LogoVariant) => {
  if (variant === "header") {
    return {
      width: 44,
      height: 44,
    };
  }
  if (variant === "footer") {
    return {
      width: 220,
      height: 70,
    };
  }
  if (variant === "default") {
    return {
      width: 300,
      height: 80,
      backgroundColor: theme.palette.grey[300],
    };
  }
};

const Base = styled.div<Props>(({ variant }) =>
  getLogoStyles(variant || "default")
);

export const Logo = ({ variant, src }: Props & { src: string }) => {
  return (
    <Link variant="invisible" to="/">
      <Base variant={variant}>
        {src && (
          <Image
            src={src}
            alt="logo"
            width={100}
            height={100}
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
          />
        )}
      </Base>
    </Link>
  );
};
