import { gql } from "@apollo/client";
import { PORTAL_QUERY_FRAGMENT } from "./portal.query";

export const HOME_QUERY = gql`
  query featureClasses($take: Int, $skip: Int, $name: String) {
    ${PORTAL_QUERY_FRAGMENT}
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
