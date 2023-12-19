import { Proj } from "@/types/enums";

export const FEATURES_MOCK = {
  data: [
    {
      id: "15cb8cb7-c4a1-4c23-89ba-f4bbfe4f3b6c",
      code: "code1",
      customData: [
        {
          value: "Objekt 1",
          field: {
            label: true,
          },
        },
      ],
      featureClass: {
        id: "35cb82b7-c4a1-4c23-89ba-f4bbfe4f3b6c",
        name: "Otvoreny dataset 1",
        code: "otvoreny-dataset-1",
      },
    },
    {
      id: "25cb8cb7-c4a1-4c23-89ba-f4bbfe4f3b6c",
      code: "code2",
      customData: [
        {
          value: "Objekt 2",
          field: {
            label: true,
          },
        },
      ],
      featureClass: {
        id: "351b8cb7-c4a1-4c23-89ba-f4bbfe4f3b6c",
        name: "Otvoreny dataset 1",
        code: "otvoreny-dataset-1",
      },
    },
    {
      id: "35c08cb7-c4a1-4c23-89ba-f4bbfe4f3b6c",
      code: "code2",
      customData: [
        {
          value: "Objekt 3",
          field: {
            label: true,
          },
        },
      ],
      featureClass: {
        id: "12cb8cb7-c4a1-4c23-89ba-f4bbfe4f3b6c",
        name: "Otvoreny dataset 1",
        code: "otvoreny-dataset-1",
      },
    },
  ],
  pageInfo: {
    total: 3,
    hasNextPage: false,
    hasPrevPage: false,
    count: 3,
  },
};

export const FEATURES_WITH_GEOM_MOCK = [
  {
    id: "0711a21a-2fa4-4d1d-af9a-f491b83c869c",
    code: "21",
    geom: {
      type: "Point",
      crs: {
        type: "name",
        properties: {
          name: Proj.EPSG5514,
        },
      },
      coordinates: [-515334.396941415, -1219242.937981361, 0],
    },
    area: 0,
    length: 0,
    createdAt: "2023-12-15T15:43:08.794Z",
    updatedAt: "2023-12-15T15:43:08.794Z",
    customData: [],
    featureClass: {
      id: "35cb8cb7-c4a1-4c23-89ba-f4bbfe4f3b6c",
      name: "Testovacia",
      description: null,
      code: "testovacia-vrstva-2",
      shared: true,
      opendata: true,
      geometryType: "Point",
      style: [],
      icon: null,
      order: null,
      createdAt: "2023-12-13T08:15:16.471Z",
      updatedAt: "2023-12-15T15:43:56.505Z",
      settings: {
        appendScaleToTitle: true,
        minScale: null,
        maxScale: null,
      },
      datasetUpdatedAt: "2023-12-15T16:43:57.163Z",
    },
  },
  {
    id: "0bdef363-3cfa-4835-871c-7c7ca646756c",
    code: "24",
    geom: {
      type: "Point",
      crs: {
        type: "name",
        properties: {
          name: Proj.EPSG5514,
        },
      },
      coordinates: [-515315.910358703, -1219285.335159265, 0],
    },
    area: 0,
    length: 0,
    createdAt: "2023-12-15T15:43:40.998Z",
    updatedAt: "2023-12-15T15:43:40.998Z",
    customData: [],
    featureClass: {
      id: "35cb8cb7-c4a1-4c23-89ba-f4bbfe4f3b6c",
      name: "Testovacia",
      description: null,
      code: "testovacia-vrstva-2",
      shared: true,
      opendata: true,
      geometryType: "Point",
      style: [],
      icon: null,
      order: null,
      createdAt: "2023-12-13T08:15:16.471Z",
      updatedAt: "2023-12-15T15:43:56.505Z",
      settings: {
        appendScaleToTitle: true,
        minScale: null,
        maxScale: null,
      },
      datasetUpdatedAt: "2023-12-15T16:43:57.163Z",
    },
  },
  {
    id: "0d1ac87c-a6eb-4d8e-ab30-be0052b93481",
    code: "20",
    geom: {
      type: "Point",
      crs: {
        type: "name",
        properties: {
          name: Proj.EPSG5514,
        },
      },
      coordinates: [-515422.928608125, -1219224.288988858, 0],
    },
    area: 0,
    length: 0,
    createdAt: "2023-12-15T15:43:07.728Z",
    updatedAt: "2023-12-15T15:43:07.728Z",
    customData: [],
    featureClass: {
      id: "35cb8cb7-c4a1-4c23-89ba-f4bbfe4f3b6c",
      name: "Testovacia",
      description: null,
      code: "testovacia-vrstva-2",
      shared: true,
      opendata: true,
      geometryType: "Point",
      style: [],
      icon: null,
      order: null,
      createdAt: "2023-12-13T08:15:16.471Z",
      updatedAt: "2023-12-15T15:43:56.505Z",
      settings: {
        appendScaleToTitle: true,
        minScale: null,
        maxScale: null,
      },
      datasetUpdatedAt: "2023-12-15T16:43:57.163Z",
    },
  },
];
