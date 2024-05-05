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
