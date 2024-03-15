from Constants.Constants import Datasets, Collections

from Mongo.MongoAdapter import MongoDriver
from Parsing.Landsat8ParsingStrategy import Landsat8ParsingStrategy
from Services.LoggerService import LoggerService as Logger

import csv
import os
import re

from multiprocessing import Process

# Configuration
COLLECTION = Collections.Collection1
DATASET = Datasets.LANDSAT8
BUFFERS = [60]

# Paths
PATH_DB_Assets_FOLDER = os.path.abspath("G:/")

PATH_ASSETS_INSERT_DB = (
    os.path.join(os.path.realpath(__file__),r"../Assets/assetsToInsert.csv")
)


def get_record_parser():
    if DATASET == Datasets.LANDSAT8:
        return Landsat8ParsingStrategy()
    else:
        return Landsat8ParsingStrategy()

def generate_collection_name(asset_id: str, buffer: str):
    return "c{}_{}_{}_{}m".format(get_collection_id(), get_dataset_id(), asset_id, buffer)

def get_collection_id():
    if COLLECTION == Collections.Collection1:
        return "1"
    if COLLECTION == Collections.Collection2:
        return "2"
    if COLLECTION == Collections.Collection2:
        return "3"
    return ""

def get_dataset_id():
    if DATASET == Datasets.LANDSAT8:
        return "l8"
    if DATASET == Datasets.SENTINEL2:
        return "s2"
    return ""

def get_assets_folder_dataset_prefix():
    if DATASET == Datasets.LANDSAT8:
        return "Landsat8"
    if DATASET == Datasets.SENTINEL2:
        return "Sentinel2"
    return ""

def get_assets_folder_path():
    return "{} - Fishnet {}".format(get_assets_folder_dataset_prefix(), get_collection_id())


def get_asset_file_regex(buffer):
    if(COLLECTION == Collections.Collection1 or COLLECTION == Collections.Collection3):
        return r"[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.{0}m.csv".format(buffer)
    if(COLLECTION == Collections.Collection2):
        return r"[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.{0}m.csv".format(buffer)

def process_data(filePath, asset_id, buffer):
    records = []

    record_collection_name = generate_collection_name(asset_id, buffer)

    parsing_strategy = get_record_parser()

    with open(filePath, "r") as file:
        Logger.log_info("Procesing file: " + filePath)

        reader = csv.reader(file)
        next(reader)  # skip header


        for observation in reader:
            if(len(observation) != 0):
                image_record = parsing_strategy.extract_image_record(observation)
                record = parsing_strategy.extract_record(observation)
                record["image"] = image_record;
                records.append(record)
            
        try:
            MongoDriver.insert_many_reset_collection(record_collection_name, records)
        except Exception as error:
            Logger.log_error(error)


def get_asset_id_from_file_name(file_name):
    split_file_name = file_name.split(".")

    if(COLLECTION == Collections.Collection1 or COLLECTION == Collections.Collection3):
        return split_file_name[1].split("D")[1]
    else:
        return split_file_name[2].split("D")[1]

# Parses the data for a single asset and inserts it to the database
def process_asset(asset_id):
    Logger.log_info("Processing assest {}".format(asset_id))

    folder_path = os.path.join(PATH_DB_Assets_FOLDER, get_assets_folder_path(), "fish_ID{}".format(asset_id) )

    all_files = os.listdir(folder_path)

    processes = []

    for buffer in BUFFERS:
        for file in all_files:
            s = get_asset_file_regex(buffer)

            regex = re.compile(s)
            if regex.match(file):
                asset_id = get_asset_id_from_file_name(file)
                file_path = os.path.join(folder_path, file)

                process = Process(target=process_data, args=(file_path, asset_id, buffer))

                processes.append(process)
                process.start()

                # process_data(dataset, file_path, asset_id, buffer)
            
    for p in processes:
        p.join()

def process_assets():
    with open(PATH_ASSETS_INSERT_DB) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")
        for asset in csv_reader:
            if len(asset) != 0:
                asset_id = asset[0]

                process_asset(asset_id)



if __name__ == "__main__":
    process_assets()
