import csv
import os
import re
import time

import Constants.Constants as ct

# from multiprocessing import Process
from Mongo.MongoAdapter import MongoDriver
from Services.LoggerService import LoggerService as Logger


def insertImageProperties(filepath):
    imgids = set()
    uniquerows = []

    with open(filepath, "r") as csvfile:
        reader = csv.reader(csvfile)
        # skipping header row
        next(reader)

        for row in reader:
            row.pop()

            cloudcover = row.pop(14)
            cloudcoverland = row.pop(14)

            imgid = row[18]
            imageproperties = [
                row.pop(15),
                row.pop(15),
                row.pop(15),
                imgid,
                row.pop(16),
                row.pop(16),
                row.pop(16),
                cloudcover,
                cloudcoverland,
            ]

            if imgid in imgids:
                continue
            imgids.add(imgid)
            uniquerows.append(
                {
                    "img_id": imageproperties[3],
                    "id_doy": imageproperties[0],
                    "img_date": imageproperties[1],
                    "img_day": imageproperties[2],
                    "img_month": imageproperties[4],
                    "img_sat": imageproperties[5],
                    "img_year": imageproperties[6],
                    "cloud_cover": imageproperties[7],
                    "cloud_cover_land": imageproperties[8],
                }
            )

    try:
        MongoDriver.insertDocuments("l8_image_properties", uniquerows)
    except Exception as error:
        Logger.log_error(error)


def insertDataToCollection(filePath, fishID, buffer):
    Logger.log_info("Started processing fishID{} - Buffer {}m ".format(fishID, buffer))

    rows = []

    # print(filePath)
    with open(filePath, "r") as file:
        startTime = time.time()
        Logger.log_info("Procesing file: " + filePath)
        reader = csv.reader(file)
        next(reader)  # skip header

        for row in reader:
            row.pop()
            cloudCover = row.pop(14)
            cloudCoverLand = row.pop(14)
            imageProperties = [
                row.pop(15),
                row.pop(15),
                row.pop(15),
                row[15],
                row.pop(16),
                row.pop(16),
                row.pop(16),
                cloudCover,
                cloudCoverLand,
            ]

            qaPixel = float(row.pop(3))
            # print(qaPixel)
            row.insert(2, str(int(float(row.pop(2)))))

            if qaPixel.is_integer():
                if str(int(qaPixel)) in ct.QA_PIXEL_VALUES:
                    row.insert(3, str(qaPixel))
                else:
                    row.insert(3, "0")
            else:
                row.insert(3, "0")

            band1 = "sr_band1_{}_m".format(buffer)
            band2 = "sr_band2_{}_m".format(buffer)
            band3 = "sr_band3_{}_m".format(buffer)
            band4 = "sr_band4_{}_m".format(buffer)
            band5 = "sr_band5_{}_m".format(buffer)
            band6 = "sr_band6_{}_m".format(buffer)
            band7 = "sr_band7_{}_m".format(buffer)
            qaAerosol = "sr_qa_aerosol_{}_m".format(buffer)
            stBand10 = "st_band10_{}_m".format(buffer)

            rows.append(
                {
                    "system_index": row[0],
                    "buffer_size": row[1],
                    "hydrolak_id": row[2],
                    "qa_pixel": float(row[3]),
                    "qa_radsat": float(row[4]),
                    band1: float(row[5]),
                    band2: float(row[6]),
                    band3: float(row[7]),
                    band4: float(row[8]),
                    band5: float(row[9]),
                    band6: float(row[10]),
                    band7: float(row[11]),
                    qaAerosol: float(row[12]),
                    stBand10: float(row[13]),
                    "fish_id": int(float(fishID)),
                    "img_id": row[15],
                }
            )

        collectionName = "l8_fish_id{}_{}m".format(fishID, buffer)

        try:
            MongoDriver.dropCollectionIfExists(collectionName)
            MongoDriver.insertDocuments(collectionName, rows)
            totalTime = time.time() - startTime
            Logger.log_info(
                "Data inserted in :" + time.strftime("%H:%M:%S", time.gmtime(totalTime))
            )
        except Exception as error:
            Logger.log_error(error)


def processAssets(dataset):
    with open(ct.PATH_ASSETS_INSERT_DB) as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=",")

        for asset in csv_reader:
            if len(asset) != 0:
                assetID = asset[0]

                processAsset(assetID)


# Parses the data for a single asset (fishId) and inserts it to the database
def processAsset(fishID):
    print("processing assest{}".format(fishID))

    folderPath = ct.PATH_DB_Assets_FOLDER + "/Landsat8 - Fishnet 2/fish_ID{0}".format(
        fishID
    )
    allFiles = os.listdir(folderPath)

    insertImageProperties(os.path.join(folderPath, allFiles[0]))

    for b in ct.BUFFERS:
        for f in allFiles:
            s = "[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.[a-zA-Z0-9]+\.{0}m\.csv".format(
                b
            )
            regex = re.compile(s)
            if regex.match(f):
                splitFileName = f.split(".")
                fishID = splitFileName[2].split("D")[1]
                filePath = os.path.join(folderPath, f)

                insertDataToCollection(filePath, fishID, b)


def generateLookupTable():
    # list of fishnet lookup objects that will be inserted to the database collection
    fishetNetLookups = []

    try:
        with open(ct.PATH_ASSETS_ALL) as csv_file:
            csv_reader = csv.reader(csv_file, delimiter=",")

            for asset in csv_reader:
                if len(asset) != 0:
                    assetID = asset[0]

                    pathToAssetFile = (
                        ct.PATH_ASSETS_FISHNET2 + r"/fish_ID{}.csv".format(assetID)
                    )

                    with open(pathToAssetFile, "r") as file:
                        reader = csv.reader(file)
                        next(reader)  # skip header

                        for row in reader:
                            fishetNetLookups.append(
                                {
                                    "hylak_id": int(float(row[0])),
                                    "fish_id": int(float(assetID)),
                                    "longitude": float(row[1]),
                                    "latitude": float(row[2]),
                                }
                            )

        MongoDriver.insertDocuments("fishnet-lookup", fishetNetLookups)

        Logger.log_info("Inserted all fishnet lookup data")

    except Exception as error:
        Logger.log_error(error)
