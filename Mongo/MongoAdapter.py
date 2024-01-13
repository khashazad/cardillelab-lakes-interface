from Services.LoggerService import LoggerService as Logger
from pymongo import MongoClient


class MongoDriver:
    client = None
    tunnel = None

    db = None

    @staticmethod
    def initialize():
        if MongoDriver.client is None:
            # Connecting to MongoDB
            MongoDriver.client = MongoClient(
                "localhost", 27017
            )  # connect to the forwarded port

            MongoDriver.db = MongoDriver.client["Lakes"]

    @staticmethod
    def closeConnection():
        if MongoDriver.client is not None:
            MongoDriver.client.close()

    @staticmethod
    def dropCollectionIfExists(collectionName):
        if MongoDriver.db:
            if collectionName in MongoDriver.db.list_collection_names():
                MongoDriver.db[collectionName].drop()

    @staticmethod
    def insertDocuments(collection_name, documents):
        if MongoDriver.client is None:
            MongoDriver.initialize()

        if MongoDriver.db is not None:
            collection = MongoDriver.db[collection_name]
            try:
                collection.insert_many(documents)
            except TypeError:
                Logger.log_error(
                    "TypeError occured when inserting documents to collection."
                )
