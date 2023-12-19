import { useEffect, useMemo } from "react";
import { useMapContext } from "./useMapContext";
import useMapGetFeatures from "./useMapGetFeatures";
import useMapIntesection from "./useMapIntesection";
import useZoomToExtent from "./useZoomToExtent";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Feature, Identifier } from "@/types/model";
import { Feature as OlFeature } from "ol";
import GeoJSON from "ol/format/GeoJSON";
import { mapStyle } from "./styles";
import { Proj } from "@/types/enums";

const Loader = ({
  intersect,
  vectorLayer,
  first,
  featureClasses,
}: {
  intersect: string;
  first: boolean;
  vectorLayer: VectorLayer<VectorSource>;
  featureClasses: { id: Identifier }[];
}) => {
  const zoomToExtent = useZoomToExtent();

  const { data } = useMapGetFeatures({
    intersect,
    projection: Proj.EPSG5514,
    featureClasses,
  });

  const features = useMemo(() => {
    const ftrs = (data?.featuresForMap?.features || [])
      .filter((x: Feature) => x.geom)
      .map((feature: Feature) => {
        return {
          id: feature.id,
          type: "Feature",
          geometry: feature.geom,
          properties: {},
        };
      });
    const format = new GeoJSON();

    const f = format.readFeatures({
      type: "FeatureCollection",
      features: ftrs,
    });

    return f as OlFeature[];
  }, [data?.featuresForMap?.features]);

  useEffect(() => {
    if (!features.length) return;
    vectorLayer.getSource()?.clear();
    vectorLayer.getSource()?.addFeatures(features);
    if (first) {
      const source = vectorLayer.getSource();
      const extent = source?.getExtent();
      if (extent && extent[0] !== Infinity) zoomToExtent(extent);
    }
  }, [features, first, zoomToExtent, vectorLayer]);

  return null;
};

const FeatureClassLoader = ({
  featureClassId,
}: {
  featureClassId: Identifier;
}) => {
  const { intersect, first } = useMapIntesection();
  const map = useMapContext();
  const source = useMemo(() => new VectorSource(), []);

  const vectorLayer = useMemo(
    () =>
      new VectorLayer({
        source,
        visible: true,
        style: mapStyle,
      }),
    [source]
  );

  useEffect(() => {
    map.addLayer(vectorLayer);
    return () => {
      map.removeLayer(vectorLayer);
    };
  }, [map, vectorLayer]);

  return (
    <>
      {intersect && (
        <Loader
          vectorLayer={vectorLayer}
          first={first}
          intersect={intersect}
          featureClasses={[{ id: featureClassId }]}
        />
      )}
    </>
  );
};

export default FeatureClassLoader;
