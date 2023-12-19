import { Extent } from "ol/extent";
import { SimpleGeometry } from "ol/geom";
import { useCallback } from "react";
import { useMapContext } from "./useMapContext";

const useZoomToExtent = () => {
  const map = useMapContext();

  const zoomToExtent = useCallback(
    (extent: Extent | SimpleGeometry) => {
      const mapView = map.getView();
      const size: any = map.getSize();
      mapView.fit(extent, size);
      const actualZoom = mapView.getZoom() || 0;
      mapView.setZoom(actualZoom - 2 || 0);
    },
    [map]
  );

  return zoomToExtent;
};

export default useZoomToExtent;
