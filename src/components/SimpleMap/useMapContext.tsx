import { useContext } from "react";
import { MapContext } from "./MapProvider";

export const useMapContext = () => useContext(MapContext);
