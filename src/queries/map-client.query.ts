import { gql } from "@apollo/client";

export const MAP_CLIENT_FEATURES_QUERY = gql`
  query mapFeatures(
    $featureClasses: [FeatureClassRequest!]!
    $scale: Float
    $projection: String
    $intersect: String!
  ) {
    featuresForMap(
      featureClasses: $featureClasses
      projection: $projection
      intersect: $intersect
      scale: $scale
    ) {
      clusters {
        id
        count
        geom
        featureClassId
      }
      features {
        id
        code
        geom
        customData {
          field {
            name
            alias
          }
          value
        }
        featureClass {
          id
          name
          code
        }
      }
    }
  }
`;

export const MAP_CLIENT_FEATURE_CLASSES_QUERY = gql`
  query {
    mapFeatureClasses {
      id
      name
      style
      geometryType
      fields {
        id
        name
        alias
      }
    }
  }
`;
