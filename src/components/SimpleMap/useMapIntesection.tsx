import { useCallback, useEffect, useState } from "react";
import ol_format_WKT from "ol/format/WKT";
import { MapEvent } from "ol";
import { fromExtent } from "ol/geom/Polygon";
import { useMapContext } from "./useMapContext";
import { Proj } from "@/types/enums";

const useMapIntesection = () => {
  const [intersect, setIntersect] = useState<string | undefined>();
  const [first, setFirst] = useState(true);
  const map = useMapContext();

  const handleChangeIntersect = useCallback(
    (evt: MapEvent) => {
      const evtMap = evt.target;
      const extent = evtMap.getView().calculateExtent();

      const wktFormat = new ol_format_WKT();
      const wkt = wktFormat.writeGeometry(fromExtent(extent), {
        dataProjection: Proj.EPSG5514,
        featureProjection: Proj.EPSG5514,
      });
      setIntersect(wkt);
      if (first && intersect) setFirst(false);
    },
    [setIntersect, first, intersect]
  );

  useEffect(() => {
    map.on("moveend", handleChangeIntersect);
    return () => {
      map.un("moveend", handleChangeIntersect);
    };
  }, [handleChangeIntersect, map]);

  return { intersect, first };
};

export default useMapIntesection;
