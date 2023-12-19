import { useEffect } from "react";
import { Feature } from "@/types/model";
import ol_source_Vector from "ol/source/Vector";
import ol_layer_Vector from "ol/layer/Vector";
import ol_format_GeoJSON from "ol/format/GeoJSON";
import { useMapContext } from "./useMapContext";
import useZoomToExtent from "./useZoomToExtent";
import { mapStyle } from "./styles";
import { Feature as OlFeature } from "ol";

const FeatureLoader = ({ feature }: { feature?: Feature }) => {
  const map = useMapContext();
  const zoomToExtent = useZoomToExtent();

  useEffect(() => {
    const format = new ol_format_GeoJSON();
    const f =
      feature?.geom &&
      (format.readFeature({
        type: "Feature",
        geometry: feature?.geom,
      }) as OlFeature);

    const vectorLayer = new ol_layer_Vector({
      source: new ol_source_Vector({
        features: f ? [f] : [],
      }),
      style: mapStyle,
      visible: true,
    });

    const source = vectorLayer.getSource();
    if (source) zoomToExtent(source.getExtent());

    map.addLayer(vectorLayer);

    return () => {
      map.removeLayer(vectorLayer);
    };
  }, [feature?.geom, zoomToExtent, map]);

  return null;
};

export default FeatureLoader;
