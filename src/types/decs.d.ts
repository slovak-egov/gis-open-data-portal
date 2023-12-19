import "gm-base";
import { GmStyleRule as GmStyleRuleDefault } from "gm-base";

declare module "gm-base" {
  type MapEventType = `${MapEvent}`;
  interface GmStyleRule extends GmStyleRuleDefault {
    id?: string;
    optimalization?: {
      limit?: number;
    };
    clustering?: {
      enabled?: boolean;
      distance?: number;
      point?: {
        color?: string;
        src?: string;
      };
      stroke?: {
        color?: string;
        width?: number;
      };
    };
  }
}
