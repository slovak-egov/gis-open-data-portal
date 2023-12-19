import useApolloQuery from "@/core/apolloClient";
import { MAP_CLIENT_FEATURES_QUERY } from "@/queries/map-client.query";
import { Identifier } from "@/types/model";

interface Props {
  intersect: string;
  projection: string;
  featureClasses: { id: Identifier }[];
}

const useMapGetFeatures = ({
  intersect,
  projection,
  featureClasses,
}: Props) => {
  const result = useApolloQuery({
    query: MAP_CLIENT_FEATURES_QUERY,
    options: {
      variables: {
        intersect,
        projection,
        featureClasses,
      },
    },
    findOne: true,
  });

  return result;
};

export default useMapGetFeatures;
