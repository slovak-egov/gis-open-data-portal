import { NextApiRequest, NextApiResponse } from "next";
import { FEATURES_WITH_GEOM_MOCK } from "./mockdata/features";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  {
    return res.status(200).json({
      data: FEATURES_WITH_GEOM_MOCK,
    });
  }
}
