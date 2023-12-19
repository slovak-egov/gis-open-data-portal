import styled from "styled-components";
import theme from "@/config/theme";
import dynamic from "next/dynamic";
import { Feature } from "@/types/model";

interface MapProps {
  height?: number;
}

const MAP_OVERVIEW_HEIGHT = 400;

const Base = styled.div<MapProps>(({ height }) => ({
  width: "100%",
  height: height,
  position: "relative",
  border: `2px solid ${theme.palette.text.dark}`,
  backgroundColor: theme.palette.grey[400],
}));

const MapComponentDynamic = dynamic(
  () => import("./SimpleMap/SimpleMapComponent"),
  {
    ssr: false,
  }
);

export const OverviewMap = ({ feature }: { feature?: Feature }) => {
  return (
    <Base height={MAP_OVERVIEW_HEIGHT}>
      <MapComponentDynamic feature={feature} />
    </Base>
  );
};
