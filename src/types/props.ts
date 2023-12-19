import {
  CSSPosition,
  CSSFlexDirection,
  CSSFlexWrap,
  CSSTextAling,
  CSSOverflowMap,
  CSSWhiteSpace,
} from "./css";

export interface BoxProps {
  h?: number | string;
  w?: number | string;
  p?: number | string;
  pr?: number | string;
  lineHeight?: number;
  gap?: number;
  minWidth?: number | string;
  minHeight?: number | string;
  maxWidth?: number | string;
  maxHeight?: number | string;
  pl?: number | string;
  pb?: number | string;
  backgroundColor?: string;
  pt?: number | string;
  display?: string;
  justifyContent?: string;
  m?: number | string;
  position?: CSSPosition;
  mb?: number | string;
  mt?: number | string;
  ml?: number | string;
  mr?: number | string;
  alignItems?: string;
  alignSelf?: string;
  flex?: string | number;
  flexBasis?: string;
  flexShrink?: number | string;
  flexDirection?: CSSFlexDirection;
  flexWrap?: CSSFlexWrap;
  textAlign?: CSSTextAling;
  border?: string;
  borderColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  borderStyle?: string;
  borderTop?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRight?: string;
  transform?: string;
  overflow?: string;
  overflowWrap?: CSSOverflowMap;
  whiteSpace?: CSSWhiteSpace;
}

export interface GridProps extends BoxProps {
  cols?: string;
  rows?: string;
  gap?: number;
  justifyContent?: string;
  justifyItems?: string;
  columnGap?: number;
  rowGap?: number;
}

export interface CellProps extends BoxProps {
  colSpan?: number;
  rowSpan?: number;
  visibility?: "visible" | "collapse" | "hidden";
  display?: string;
  alignSelf?: string;
}

export interface InputProps {
  label?: string;
  errors?: string[];
  width?: string | number;
}

export interface SearchResultProps {
  id: number;
  type: string;
  title: string;
  description: string;
  icon: string;
  link: string;
  created_at: string;
  updated_at: string;
}

export interface PaginationsProps {
  total: number;
  limit: number;
  skip: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}
