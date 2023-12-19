import { gql } from "@apollo/client";
import { PORTAL_QUERY_FRAGMENT } from "./portal.query";

export const FEATURES_QUERY = gql`
  query features(
    $featureClassId: String!
    $limit: Int
    $skip: Int
    $code: String
  ) {
    features(
      featureClassId: $featureClassId
      take: $limit
      skip: $skip
      code: $code
    ) {
      data {
        id
        code
        customData {
          value
          field {
            label
          }
        }
        featureClass {
          id
          name
          code
        }
      }
      pageInfo {
        total
        hasNextPage
        hasPrevPage
        count
      }
    }
  }
`;

export const FEATURE_PAGE_QUERY = gql`
  query feature($id: String!) {
    ${PORTAL_QUERY_FRAGMENT}
    feature(id: $id) {
      id
      code
      geom
      customData {
        id
        value
        field {
          id
          alias
          type
        }
      }
      featureClass {
        id
        name
        code
        geometryType
        style
      }
    }
  }
`;
