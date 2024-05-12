export const Bands = [
  {
    id: "sr_band1",
    name: "Band 1 (ultra blue, coastal aerosol) surface reflectance",
  },
  {
    id: "sr_band2",
    name: "Band 2 (blue) surface reflectance",
  },
  {
    id: "sr_band3",
    name: "Band 3 (green) surface reflectance",
  },
  {
    id: "sr_band4",
    name: "Band 4 (red) surface reflectance",
  },
  {
    id: "sr_band5",
    name: "Band 5 (near infrared) surface reflectance",
  },
  {
    id: "sr_band6",
    name: "Band 6 (shortwave infrared 1) surface reflectance",
  },
  {
    id: "sr_band7",
    name: "Band 7 (shortwave infrared 2) surface reflectance",
  },
  {
    id: "st_band10",
    name: "Band 10 surface temperature.",
  },
  {
    id: "qa_pixel",
    name: "Pixel quality",
  },
  {
    id: "qa_radsat",
    name: "Radiometric saturation",
  },
];

type Band = {
  [key: string]: number;
};

export type Image = {
  id: string;
  doy: number;
  date: string;
  day: number;
  month: number;
  year: number;
  cloud_cover: number;
  cloud_cover_land: number;
};

export type LandsatObservation = {
  _id: string;
  hylak_id: number;
  qa_pixel: Band;
  qa_radsat: Band;
  sr_band1: Band;
  sr_band2: Band;
  sr_band3: Band;
  sr_band4: Band;
  sr_band5: Band;
  sr_band6: Band;
  sr_band7: Band;
  sr_qa_aerosol: Band;
  st_band10: Band;
  image: Image;
};

export const Buffers = [
  {
    id: "1",
    color: "#87CEEB",
  },
  {
    id: "10",
    color: "#DC143C",
  },
  {
    id: "15",
    color: "#228B22",
  },
  {
    id: "30",
    color: "#FFD700",
  },
  {
    id: "40",
    color: "#7851A9",
  },
  {
    id: "60",
    color: "#CC5500",
  },
  {
    id: "90",
    color: "#008080",
  },
  {
    id: "100",
    color: "#FF00FF",
  },
  {
    id: "125",
    color: "#708090",
  },

  {
    id: "250",
    color: "#40E0D0",
  },
];

export const Years = [
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
  "2024",
];

export const Fishnets = [
  {
    id: "1",
    name: "Fishnet 1",
  },
  {
    id: "2",
    name: "Fishnet 2",
  },
  {
    id: "3",
    name: "Fishnet 3",
  },
];
