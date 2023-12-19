import { NextApiRequest, NextApiResponse } from "next";
import { PORTAL_MOCK } from "./mockdata/portal";
import { FEATURE_CLASES_MOCK } from "./mockdata/feature-class";
import { FEATURE_CLASS_DATASET_MOCK } from "./mockdata/feature-class-dataset";
import { FEATURES_MOCK, FEATURES_WITH_GEOM_MOCK } from "./mockdata/features";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.body.operationName === "featureClasses") {
    return res.status(200).json({
      data: {
        portal: PORTAL_MOCK,
        featureClasses: FEATURE_CLASES_MOCK,
      },
    });
  }
  if (req.body.operationName === "features") {
    return res.status(200).json({
      data: {
        portal: PORTAL_MOCK,
        features: FEATURES_MOCK,
      },
    });
  }
  if (req.body.operationName === "mapFeatures") {
    return res.status(200).json({
      data: {
        featuresForMap: {
          portal: PORTAL_MOCK,
          features: FEATURES_WITH_GEOM_MOCK,
        },
      },
    });
  }
  if (req.body.operationName === "feature") {
    return res.status(200).json({
      data: {
        portal: PORTAL_MOCK,
        feature: FEATURES_WITH_GEOM_MOCK[0],
      },
    });
  }
  if (req.body.operationName === "featureClassDataset") {
    return res.status(200).json({
      data: {
        portal: PORTAL_MOCK,
        featureClass: FEATURE_CLASES_MOCK.data[0],
        featureClassDataset: FEATURE_CLASS_DATASET_MOCK,
      },
    });
  } else {
    return res.status(200).json({
      data: {
        portal: PORTAL_MOCK,
      },
    });
  }
}
