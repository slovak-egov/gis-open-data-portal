import { gql } from "@apollo/client";

export const MAP_CONFIG_QUERY = gql`
  query {
    mapConfigs {
      id
      code
      title
      generated
    }
  }
`;

export const MAP_CODE_QUERY = gql`
  query mapConfig($code: String!) {
    mapConfig(code: $code) {
      id
      code
      title
      generated
    }
  }
`;
