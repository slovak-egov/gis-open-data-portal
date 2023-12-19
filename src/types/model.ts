/* eslint-disable @typescript-eslint/no-explicit-any */
import { Geometry, GeometryType } from "gm-base";
import { FieldType, GeomType } from "./enums";

export type Identifier = string;

export interface CustomField {
  id: Identifier;
  name: string;
  alias: string;
  enabled: boolean;
  shown: boolean;
  filterable: boolean;
  type: FieldType;
  label: boolean;
  featureClass: FeatureClass;
  private?: boolean;
  defaultValue?: string;
  constraints?: Constraints;
  datagridVisibility: boolean;
  order?: number;
}

export interface Constraints {
  min?: number;
  max?: number;
  required?: boolean;
  values?: [{ attr: string; value: any }];
  resource?: {
    name: string;
    valueColumn: string;
    labelColumn: string;
  };
}

export interface ClusterFeature {
  id: number;
  geom: Geometry;
  count: number;
  featureClassId: string;
}

export interface CustomData {
  id: Identifier;
  value: string;
  field: CustomField;
}

export interface FeatureClassSettings {
  maxScale?: number;
  minScale?: number;
}

export interface FeatureClass {
  id: Identifier;
  code: string;
  name: string;
  geometryType: GeomType;
  description?: string;
  style: any;
  fields: CustomField[];
  shared: boolean;
  opendata: boolean;
  icon: string;
  features: Feature[];
  settings?: FeatureClassSettings;
  updatedAt: string;
  datasetUpdatedAt: string;
}

export interface Feature {
  id: Identifier;
  code: string;
  description: string | null;
  revisionDate: Date;
  featureClass: FeatureClass;
  geom: GeometryType;
  customData?: CustomData[];
  area?: number;
  length?: number;
}

export interface Portal {
  id: Identifier;
  key: string;
  data: {
    type: string;
    value: any;
  };
}

export interface Sitemap {
  changefreq: string;
  priority: string;
  loc: string;
  lastmod: string;
}

export interface Dataset {
  id: Identifier;
  name: string;
  createdAt: string;
  updatedAt: string;
}
