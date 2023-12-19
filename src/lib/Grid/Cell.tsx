import styled from "styled-components";
import { CellProps } from "@/types/props";
import { ScreenSize } from "@/types/theme";

interface Props extends CellProps {
  xs?: CellProps;
  sm?: CellProps;
  md?: CellProps;
  lg?: CellProps;
  xl?: CellProps;
  inline?: boolean;
}

export const Cell = styled.div<Props>(
  ({ theme, xs, sm, md, lg, xl, ...rest }) => {
    const getCssProps = (props: CellProps) => {
      const {
        h,
        w,
        p,
        pr,
        gap,
        pl,
        colSpan,
        rowSpan,
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
        height: (typeof h === "number" && theme.spacing(h)) || h,
        width: (typeof w === "number" && theme.spacing(w)) || w,
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
        gridColumnStart: colSpan !== undefined ? `span ${colSpan}` : undefined,
        gridRowStart: rowSpan !== undefined ? `span ${rowSpan}` : undefined,
        alignSelf: props.alignSelf ? props.alignSelf : "start",
        ...restProps,
      };
    };

    const getProps = (size?: ScreenSize, props?: CellProps) => {
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
