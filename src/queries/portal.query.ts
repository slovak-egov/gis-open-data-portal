import { gql } from "@apollo/client";

export const PORTAL_QUERY_FRAGMENT = `
  portal {
    id
    key
    data
  }
`;

export const PORTAL_QUERY = gql`
  query {
    ${PORTAL_QUERY_FRAGMENT}
  }
`;
