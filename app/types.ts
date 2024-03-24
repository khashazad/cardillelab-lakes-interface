type BandData = {
  [key: string]: number;
};

export type ImageData = {
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
  qa_pixel: BandData;
  qa_radsat: BandData;
  sr_band1: BandData;
  sr_band2: BandData;
  sr_band3: BandData;
  sr_band4: BandData;
  sr_band5: BandData;
  sr_band6: BandData;
  sr_band7: BandData;
  sr_qa_aerosol: BandData;
  st_band10: BandData;
  image: ImageData;
};
