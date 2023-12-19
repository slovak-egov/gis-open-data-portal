import { Feature, Identifier } from "@/types/model";
import { OlMap } from "./OlMap";
import FeatureLoader from "./FeatureLoader";
import MapProvider from "./MapProvider";
import FeatureClassLoader from "./FeatureClassLoader";

const SimpleMapComponent = ({
  feature,
  featureClassId,
}: {
  feature?: Feature;
  featureClassId?: Identifier;
}) => {
  return (
    <MapProvider>
      <OlMap>
        <>
          {feature && <FeatureLoader feature={feature} />}
          {featureClassId && (
            <FeatureClassLoader featureClassId={featureClassId} />
          )}
        </>
      </OlMap>
    </MapProvider>
  );
};

export default SimpleMapComponent;
