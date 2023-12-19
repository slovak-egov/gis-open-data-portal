import styled from "styled-components";
import { GridProps } from "@/types/props";
import { ScreenSize } from "@/types/theme";

interface Props extends GridProps {
  xs?: GridProps;
  sm?: GridProps;
  md?: GridProps;
  lg?: GridProps;
  xl?: GridProps;
}

export const Grid = styled.div<Props>(
  ({ theme, xs, sm, md, lg, xl, ...rest }) => {
    const getCssProps = (props: GridProps) => {
      const {
        h,
        w = "100%",
        p,
        pr,
        pl,
        pb,
        backgroundColor,
        pt,
        m,
        mb,
        mt,
        ml,
        mr,
        justifyContent = "start",
        justifyItems = "stretch",
        columnGap,
        rowGap,
        display,
        cols,
        rows,
        alignItems,
        gap = 4,
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
        display: display ? display : "grid",
        gridTemplateColumns: cols,
        gridTemplateRows: rows,
        justifyContent,
        rowGap: theme.spacing(rowGap !== undefined ? rowGap : gap),
        columnGap: theme.spacing(columnGap !== undefined ? columnGap : gap),
        justifyItems,
        alignItems: alignItems ? alignItems : "self-start",
        ...restProps,
      };
    };

    const getProps = (size?: ScreenSize, props?: GridProps) => {
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
