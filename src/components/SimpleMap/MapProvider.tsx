import React, { useMemo } from "react";
import { register } from "ol/proj/proj4";
import proj4 from "proj4";
import { Map, View } from "ol";
import { transform } from "ol/proj";
import OSM from "ol/source/OSM";
import TileLayer from "ol/layer/Tile";
import WMTS from "ol/source/WMTS";
import WMTSTileGrid from "ol/tilegrid/WMTS";
import { Proj } from "@/types/enums";

export const MapContext = React.createContext<Map>(new Map({}));

const ORTOPHOTO = {
  id: "ortofotomapa",
  title: "Ortofotomapa SR",
  url: "https://zbgisws.skgeodesy.sk/zbgis_ortofoto_wmts/service.svc/get?",
  type: "wmts",
  visible: true,
  opacity: 1,
  displayInLayerSwitcher: false,
  params: {
    LAYER: "WMS_zbgis_ortofoto_wmts",
    STYLE: "default",
    FORMAT: "image/jpgpng",
    PROJECTION: Proj.EPSG5514,
    EXTENT: [
      -591611.4, -1335062.0399000011, -165136.79999999853, -1132397.3999999985,
    ],
    TILEMATRIXSET: "default028mm",
    TILEORIGIN: [-33699800, 33699800],
    RESOLUTIONS: [
      1219.1550401578854, 609.5775200790822, 304.7887656216908,
      152.39438001991013, 76.19719000967594, 38.09867036762606,
      19.049297502418984, 9.524648751349053, 4.762324375674527,
      2.3811621879768246, 1.1905810937092904, 0.5952905469942061,
      0.29764527349710307,
    ],
    TILEMATRIXIDS: [
      "0",
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
    ],
  },
  zIndex: 1,
};

const customProjections = [
  {
    code: Proj.EPSG5514,
    def: "+proj=krovak +lat_0=49.5 +lon_0=24.83333333333333 +alpha=30.28813972222222 +k=0.9999 +x_0=0 +y_0=0 +ellps=bessel +towgs84=485.021,169.465,483.839,7.786342,4.397554,4.102655,0 +units=m +no_defs",
  },
];

customProjections.forEach((proj) => proj4.defs(proj.code, proj.def));

type Props = {
  children: any;
};

const MapProvider = ({ children }: Props) => {
  register(proj4);

  const map = useMemo(() => {
    // const olLayer = new TileLayer({
    //   source: new OSM(),
    // });

    const olLayer = new TileLayer({
      source: new WMTS({
        crossOrigin: "anonymous",
        url: ORTOPHOTO.url,
        layer: ORTOPHOTO.params.LAYER,
        matrixSet: ORTOPHOTO.params.TILEMATRIXSET,
        format: ORTOPHOTO.params.FORMAT,
        projection: ORTOPHOTO.params.PROJECTION,
        tileGrid: new WMTSTileGrid({
          origin: ORTOPHOTO.params.TILEORIGIN,
          resolutions: ORTOPHOTO.params.RESOLUTIONS,
          matrixIds: ORTOPHOTO.params.TILEMATRIXIDS,
          extent: ORTOPHOTO.params.EXTENT,
        }),
        style: ORTOPHOTO.params.STYLE,
        wrapX: false,
      }),
    });

    const view = new View({
      projection: Proj.EPSG5514,
      center: transform([19.6, 48.6], Proj.EPSG4326, Proj.EPSG5514),
      maxZoom: 20,
      minZoom: 0,
      zoom: 8,
    });
    const map = new Map({
      controls: [],
      layers: [olLayer],
      view,
    });

    return map;
  }, []);

  return <MapContext.Provider value={map}>{children}</MapContext.Provider>;
};

export default MapProvider;
