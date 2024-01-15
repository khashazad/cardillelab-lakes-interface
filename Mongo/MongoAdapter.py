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
    def close_connection():
        if MongoDriver.client is not None:
            MongoDriver.client.close()

    @staticmethod
    def drop_collection_if_exists(collectionName):
        if MongoDriver.db is not None:
            if collectionName in MongoDriver.db.list_collection_names():
                MongoDriver.db[collectionName].drop()

    @staticmethod
    def find_one(collection_name, field, value):
        if MongoDriver.client is None:
            MongoDriver.initialize()

        if MongoDriver.db is not None:
            collection = MongoDriver.db[collection_name]
            if collection is not None:
                return collection.find_one({field: value})
            else:
                return None

    @staticmethod
    def insert_one(collection_name, document):
        if MongoDriver.client is None:
            MongoDriver.initialize()

        if MongoDriver.db is not None:
            collection = MongoDriver.db[collection_name]
            try:
                insert_result = collection.insert_one(document)
                return insert_result.inserted_id
            except TypeError:
                Logger.log_error(
                    "TypeError occured when inserting documents to collection."
                )

    @staticmethod
    def insert_many(collection_name, documents):
        if MongoDriver.client is None:
            MongoDriver.initialize()

        if MongoDriver.db is not None:
            MongoDriver.drop_collection_if_exists(collection_name)

            collection = MongoDriver.db[collection_name]
            if collection is not None:
                try:
                    collection.insert_many(documents)
                except TypeError:
                    Logger.log_error(
                        "TypeError occured when inserting documents to collection."
                    )
