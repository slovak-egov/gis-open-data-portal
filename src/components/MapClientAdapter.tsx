import styled from "styled-components";
import theme from "@/config/theme";
import dynamic from "next/dynamic";

interface MapProps {
  height?: number;
}

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

export const MapClient = ({ featureClassId }: { featureClassId?: string }) => {
  return (
    <Base height={600}>
      <MapComponentDynamic featureClassId={featureClassId} />
    </Base>
  );
};
