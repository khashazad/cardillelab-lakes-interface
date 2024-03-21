import csv
from Mongo.MongoAdapter import MongoDriver
import concurrent.futures


def get_collection_count(collection_name):
    count = MongoDriver.get_document_count(collection_name)
    print("Collection: {} has {} documents.".format(collection_name, count))
    return [collection_name, count]


def generate_report():
    collections = MongoDriver.get_collection_names()

    if collections is not None:
        with open("collections_report.csv", mode="w", newline="") as file:
            writer = csv.writer(file)
            # header row
            writer.writerow(["Collection Name", "Document Count"])

            with concurrent.futures.ProcessPoolExecutor(max_workers=50) as executor:
                collection_record_counts = list(
                    executor.map(get_collection_count, collections)
                )

            writer.writerows(collection_record_counts)

        print("CSV report generated successfully.")


if __name__ == "__main__":
    generate_report()
