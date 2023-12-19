import styled from "styled-components";
import theme from "@/config/theme";

interface DividerProps {
  top?: number;
  bottom?: number;
  color?: string;
  height?: number;
}

export const Divider = styled.div<DividerProps>(
  ({ top, bottom, color, height }) => ({
    backgroundColor: color || theme.palette.grey[500],
    marginTop: (top && theme.spacing(top)) || 15,
    marginBottom: (bottom && theme.spacing(bottom)) || 20,
    width: "100%",
    height: height || 1,
  })
);
