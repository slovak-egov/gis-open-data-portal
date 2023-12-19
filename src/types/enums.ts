export enum FieldType {
  BOOLEAN = "boolean",
  FLOAT = "float",
  DATE = "date",
  OPTIONS = "options",
  TEXT = "text",
  RELATION = "relation",
}

export enum GeomType {
  Point = "Point",
  LineString = "LineString",
  Polygon = "Polygon",
  MultiPoint = "MultiPoint",
  MultiPolygon = "MultiPolygon",
  MultiLineString = "MultiLineString",
}

export enum Proj {
  EPSG4326 = "EPSG:4326",
  EPSG5514 = "EPSG:5514",
}
