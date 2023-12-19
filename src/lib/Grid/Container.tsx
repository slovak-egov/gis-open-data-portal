import { ReactNode } from "react";
import { Grid } from "./Grid";

interface ContainerProps {
  children: ReactNode;
}

export const Container = ({ children }: ContainerProps) => {
  return (
    <Grid
      m="0 auto"
      w="966px"
      pl={0}
      pr={0}
      display={"inherit"}
      md={{ m: 0, w: "100%", pl: "30px", pr: "30px", display: "inherit" }}
      sm={{ m: 0, w: "100%", pl: "15px", pr: "15px", display: "inherit" }}
    >
      {children}
    </Grid>
  );
};
