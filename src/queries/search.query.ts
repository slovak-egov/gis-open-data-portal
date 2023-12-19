import { gql } from "@apollo/client";

export const SEARCH_QUERY = gql`
  query search($search: String!, $limit: Int, $skip: Int) {
    search(search: $search, take: $limit, skip: $skip) {
      pageInfo {
        total
        count
        pages
      }
      data {
        code
        id
        geom
        featureClass {
          id
          name
          icon
          geometryType
        }
        customData {
          id
          value
          field {
            id
            name
            alias
            label
          }
        }
      }
    }
  }
`;
