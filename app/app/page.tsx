import Link from "next/link";
import Image from "next/image";
import MongoDBPic from "@/public/MongoDB.png";
import CollectionNamePic from "@/public/collection-name.png";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-20">
      <section className="space-y-8">
        <h1
          className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
          id="Introduction"
        >
          Introduction
        </h1>
        <p className="text-gray-800">
          The database technology used to store the data is{" "}
          <Link
            className="mx-2 text-xl text-blue"
            href="https://www.mongodb.com/docs/"
            target="_blank"
          >
            MongoDB
          </Link>
          which is a flexible, scalable and performant non-relational database.
          It stores the data in a format similar to JSON which makes viewing and
          processing the data more efficient.
        </p>
        <h3 className="text-xl font-bold">Relevant Terminologies</h3>
        <ul>
          <li>
            <strong>Document</strong>: Basic unit of data (similar to JSON
            objects) consisting of field-value pairs
          </li>
          <li>
            <strong>Collection</strong>: A group of documents. It is equivalent
            to a table in a relational database system.
          </li>
        </ul>
        <Image src={MongoDBPic} alt="mongodb logo" className="h-[400px]" />
        <div className="space-y-8">
          <h2 className="font-bold text-2xl">Database Model</h2>
          <p>
            In the database model, lakes are spatially organized into categories
            known as <b>"assets"</b>.These assets are further aggregated into
            larger units referred to as <b>"collections"</b>. The following
            naming convention is used to name the database collections:
          </p>

          <div className="font-bold text-2xl flex justify-center">
            [collection(c1/c2/c3)]_[satellite(l8/s2)]_[asset ID]_[buffer]m
          </div>

          <div className="flex flex-col gap-8 items-center">
            <p>
              As an example, the following collection stores the data
              corresponding to asset <b>117</b> from <b>asset collection 1</b>{" "}
              aggregated using a <b>60m</b> radius buffer{" "}
            </p>
            <Image src={CollectionNamePic} alt="sample collection name" />
          </div>
        </div>
      </section>
    </main>
  );
}
