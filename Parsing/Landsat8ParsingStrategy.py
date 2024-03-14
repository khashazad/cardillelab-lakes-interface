from Parsing.ParsingStrategy import ParsingStrategy

from Constants.Constants import QA_PIXEL_VALUES as VALID_QA_PIXEL_VALUES


class Landsat8ParsingStrategy(ParsingStrategy):
    def extract_image_record(self, observation):
        return {
            "id": observation[20],
            "doy": int(observation[17]),
            "date": observation[18],
            "day": int(observation[19]),
            "month": int(observation[21]),
            "year": int(observation[23]),
            "cloud_cover": float(observation[14]),
            "cloud_cover_land": float(observation[15]),
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
            # "system_index": observation[0],
            "hylak_id": int(float(observation[2])),
            "qa_pixel": int(self.__validate_qa_pixel(observation)),
            "qa_radsat": round(float(observation[4]), 4),
            "sr_band1": round(float(observation[5]), 4),
            "sr_band2": round(float(observation[6]), 4),
            "sr_band3": round(float(observation[7]), 4),
            "sr_band4": round(float(observation[8]), 4),
            "sr_band5": round(float(observation[9]), 4),
            "sr_band6": round(float(observation[10]), 4),
            "sr_band7": round(float(observation[11]), 4),
            "sr_qa_aerosol": round(float(observation[12]), 4),
            "st_band10": round(float(observation[13]), 4),
        }
