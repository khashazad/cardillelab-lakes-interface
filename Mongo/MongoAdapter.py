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
                host="206.12.90.121",
                port= 27017,
                username="root",
                password="ORJ0Gcqo9cu0iG8Py6B2IYdZFBCyl7tQx4Iazr/VC6sYhrZIuXbvSkbM4J6Th0QO"
            )

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
    def insert_many_reset_collection(collection_name, documents):
        if MongoDriver.client is None:
            MongoDriver.initialize()

        if MongoDriver.db is not None:
            
            MongoDriver.drop_collection_if_exists(collection_name)

            Logger.log_info("Start batch insert to collection: " + collection_name)

            collection = MongoDriver.db[collection_name]
            if collection is not None:
                try:
                    collection.insert_many(documents)
                except TypeError:
                    Logger.log_error(
                        "TypeError occured when inserting documents to collection."
                    )

            Logger.log_info("Completed batch insert to collection:  " + collection_name)


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

