import { gql } from "@apollo/client";

export const FEATURE_CLASS_QUERY_FRAGMENT = `
  featureClass(id: $id) {
    id
    code
    name
    datasetUpdatedAt
  }
`;

export const FEATURE_CLASS_QUERY = gql`
  query featureClass($id: String!) {
    ${FEATURE_CLASS_QUERY_FRAGMENT}
  }
`;

export const FEATURE_CLASSES_QUERY = gql`
  query featureClasses($take: Int, $skip: Int, $name: String) {
    featureClasses(take: $take, skip: $skip, name: $name) {
      data {
        id
        name
        description
        code
        createdAt
        updatedAt
        icon
        style
        geometryType
        datasetUpdatedAt
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
