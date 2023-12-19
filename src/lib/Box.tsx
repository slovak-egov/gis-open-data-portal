import styled from "styled-components";
import { BoxProps } from "@/types/props";
import { ScreenSize } from "@/types/theme";

interface Props extends BoxProps {
  xs?: BoxProps;
  sm?: BoxProps;
  md?: BoxProps;
  lg?: BoxProps;
  xl?: BoxProps;
  top?: number;
}

export const Box = styled.div<Props>(
  ({ xs, xl, lg, md, sm, theme, ...rest }) => {
    const getCssProps = (props: BoxProps) => {
      const {
        h,
        w,
        p,
        pr,
        gap,
        pl,
        pb,
        backgroundColor,
        pt,
        m,
        mb,
        mt,
        ml,
        mr,
        ...restProps
      } = props;

      return {
        height: h,
        width: w,
        backgroundColor:
          backgroundColor === "primary" || backgroundColor === "secondary"
            ? theme.palette[backgroundColor].main
            : backgroundColor
            ? backgroundColor
            : "transparent",
        padding: typeof p === "number" ? theme.spacing(p) : p,
        paddingTop: typeof pt === "number" ? theme.spacing(pt) : pt,
        paddingBottom: typeof pb === "number" ? theme.spacing(pb) : pb,
        paddingRight: typeof pr === "number" ? theme.spacing(pr) : pr,
        paddingLeft: typeof pl === "number" ? theme.spacing(pl) : pl,
        margin: typeof m === "number" ? theme.spacing(m) : m,
        marginTop: typeof mt === "number" ? theme.spacing(mt) : mt,
        marginBottom: typeof mb === "number" ? theme.spacing(mb) : mb,
        marginRight: typeof mr === "number" ? theme.spacing(mr) : mr,
        marginLeft: typeof ml === "number" ? theme.spacing(ml) : ml,
        gap: gap && theme.spacing(gap),
        ...restProps,
      };
    };

    const getProps = (size?: ScreenSize, props?: BoxProps) => {
      if (!props || !size) return;

      const media = theme.breakpoints.down(size);

      return {
        [media]: getCssProps(props),
      };
    };

    return {
      ...getCssProps(rest),
      ...getProps("xl", xl),
      ...getProps("lg", lg),
      ...getProps("md", md),
      ...getProps("sm", sm),
      ...getProps("xs", xs),
    };
  }
);
