import { SearchResultProps } from "./props";

export type IconVariant = "dropdown" | "scroll.up" | "search" | "document";
export type LogoVariant = "header" | "icon" | "footer" | "default";
export type LinkVariant = "default" | "invisible" | "title" | "navigation";
export type ThemeColor = "primary" | "secondary";
export type BaseColor = "default" | "light" | "dark" | "grey";
export type LinkArray = { label: string; to: string }[];

export type TypographyVariant =
  | "heading.xl"
  | "heading.large"
  | "heading.medium"
  | "heading.small"
  | "body"
  | "body.lead"
  | "body.small"
  | "caption.xl"
  | "caption.large"
  | "caption.medium";

export type TypographyType =
  | "headingXL"
  | "headingLarge"
  | "headingMedium"
  | "headingSmall"
  | "body"
  | "bodyLead"
  | "bodySmall"
  | "captionXL"
  | "captionLarge"
  | "captionMedium";

export type ButtonVariant =
  | "text"
  | "contrast"
  | "navigation"
  | "normal"
  | "success"
  | "warning"
  | "error"
  | "search";

export type SearchEndpointType = "search" | "dataset" | "open-api";

export type SearchResultsState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; results: SearchResultProps[]; count: number };

export type PortalType = {
  key: string;
  id: string;
  data: {
    type: string;
    value: string;
  };
};

export type CustomDataType = {
  id: string;
  value: string;
  field: {
    id: string;
    alias: string;
    type: string;
  };
};

export interface StyleDefinition {
  stroke?: {
    width: number;
    color: string;
  };
  fill?: {
    color: string;
  };
  point?: {
    radius: number;
    icon?: "marker";
    color?: string;
    src?: string;
    displacement?: Array<number>;
  };
  text?: {
    text?: string;
    column?: string;
    fillColor?: string;
    font?: string;
    overflow?: boolean;
    width?: number;
    strokeColor?: string;
    offsetX?: number;
    offsetY?: number;
  };
  zIndex?: number;
}
