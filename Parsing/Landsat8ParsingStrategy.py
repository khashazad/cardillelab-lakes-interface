from Parsing.ParsingStrategy import ParsingStrategy

from Constants.Constants import QA_PIXEL_VALUES as VALID_QA_PIXEL_VALUES


class Landsat8ParsingStrategy(ParsingStrategy):
    def extract_image_record(self, observation):
        return {
            "img_id": observation[20],
            "img_doy": observation[17],
            "img_date": observation[18],
            "img_day": observation[19],
            "img_month": observation[21],
            "img_year": observation[23],
            "cloud_cover": observation[14],
            "cloud_cover_land": observation[15],
        }

    def __validate_qa_pixel(self, observation):
        overvation_qa_pixel = float(observation[3])

        if not (
            overvation_qa_pixel.is_integer()
            and str(int(overvation_qa_pixel)) in VALID_QA_PIXEL_VALUES
        ):
            return "0"
        else:
            return overvation_qa_pixel

    def extract_record(self, observation):
        return {
            "system_index": observation[0],
            "hylak_id": int(observation[2]),
            "qa_pixel": int(self.__validate_qa_pixel(observation)),
            "qa_radsat": float(observation[4]),
            "sr_band1": float(observation[5]),
            "sr_band2": float(observation[6]),
            "sr_band3": float(observation[7]),
            "sr_band4": float(observation[8]),
            "sr_band5": float(observation[9]),
            "sr_band6": float(observation[10]),
            "sr_band7": float(observation[11]),
            "sr_qa_aerosol": float(observation[12]),
            "st_band10": float(observation[13]),
        }
