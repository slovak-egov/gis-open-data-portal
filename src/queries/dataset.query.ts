import { gql } from "@apollo/client";
import { PORTAL_QUERY_FRAGMENT } from "./portal.query";
import { FEATURE_CLASS_QUERY_FRAGMENT } from "./feature-class.query";

export const DATASET_QUERY = gql`
  query featureClassDataset($id: String!) {
    ${PORTAL_QUERY_FRAGMENT}
    ${FEATURE_CLASS_QUERY_FRAGMENT}
    featureClassDataset(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
