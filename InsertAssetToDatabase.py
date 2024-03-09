import Services.DatabaseService as dbs
from Constants.Constants import Datasets as Dataset

if __name__ == "__main__":
    dbs.process_assets(Dataset.LANDSAT8)
