import { ReactElement, useEffect, useRef } from "react";
import { useMapContext } from "./useMapContext";
import styled from "styled-components";

const MapContainer = styled("div")(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
}));

export const OlMap = ({ children }: { children: ReactElement }) => {
  const map = useMapContext();
  const mapElement = useRef(null);

  useEffect(() => {
    map.setTarget(mapElement?.current || undefined);

    return () => {
      map.setTarget(undefined);
    };
  }, [map]);

  return <MapContainer ref={mapElement}>{children}</MapContainer>;
};
