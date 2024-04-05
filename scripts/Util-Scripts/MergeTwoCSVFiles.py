import pandas as pd
import os

CHUNK_SIZE = 50000
csv_file_list = [os.path.abspath("D:/Lansat8-Fishnet1.csv"), os.path.abspath("D:/Lansat8-Fishnet2.csv")]
output_file = "D:/Landsat8 - Fishnet 1 & 2 (60m).csv"

first_one = True
for csv_file_name in csv_file_list:
    if (
        not first_one
    ):  # if it is not the first csv file then skip the header row (row 0) of that file
        skip_row = [0]
    else:
        skip_row = []

    chunk_container = pd.read_csv(
        csv_file_name, chunksize=CHUNK_SIZE, skiprows=skip_row
    )
    for chunk in chunk_container:
        chunk.to_csv(output_file, mode="a", index=False)
    first_one = False
