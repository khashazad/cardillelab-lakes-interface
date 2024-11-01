import SingleConditioFilterPic from "@/public/filter-single-condition.jpeg";
import MultiConditionFilterPic from "@/public/filer-multiple-condition.jpeg";
import RangeFitlerPic from "@/public/filter-range.jpeg";
import ExportResultPic from "@/public/query-export.png";
import LakeLookupPic from "@/public/find-lake-asset.jpeg";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";

export default async function QueriesSection() {
  return (
    <section className="flex min-h-screen flex-col space-y-8 p-20">
      <h1
        className="flex justify-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
        id="Introduction"
      >
        Common Queries
      </h1>
      <div className="text-xl space-y-4">
        <Separator />
        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-center m-4">
            Finding which aset a specific lake belongs to
          </h2>
          <p>
            <span className="font-bold">Filter:</span>
            {` { "hylake_id": "lake Id" }`}
          </p>
          <div className="flex justify-center mt-8">
            <Image width={800} src={LakeLookupPic} alt="find lake by id" />
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-center m-4">
            Searching for observations satisfying a specific condition
          </h2>
          <p>
            <span className="font-bold">Filter:</span>
            {` { "property": { "operator": "value" } }`}
          </p>
          <div className="border-black border-2 p-2">
            <b>Other equality operators:</b>
            <ul className="ml-6 mt-2">
              <li>
                {" "}
                <strong>{"$lt"}</strong>: less than{" "}
              </li>
              <li>
                {" "}
                <strong>{"$lte"}</strong>: less than or equal{" "}
              </li>
              <li>
                {" "}
                <strong>{"$eq"}</strong>: equal{" "}
              </li>
              <li>
                {" "}
                <strong>{"$ne"}</strong>: not equal{" "}
              </li>
              <li>
                {" "}
                <strong>{"$gte"}</strong>: greater than or equal{" "}
              </li>
            </ul>
          </div>
          <div className="flex justify-center mt-8">
            <Image
              width={800}
              src={SingleConditioFilterPic}
              alt="filter single condition"
            />
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-center m-6">
            Searching for observations satisfying multiple conditions
          </h2>
          <p>
            <span className="font-bold">Filter:</span>
            {` { $and: [ { "property": { “operator”: “value” } } , {"property2":  {“operator2”: “value2”} }] } }`}
          </p>
          <div className="flex justify-center mt-8">
            <Image
              width={800}
              src={MultiConditionFilterPic}
              alt="filter multiple condition"
            />
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-center m-6">
            Searching for observations satisfying multiple conditions
          </h2>
          <p>
            <span className="font-bold">Filter:</span>
            {` { "property": { "operator": "value" , "operator2": "value2"} }`}
          </p>
          <div className="flex justify-center mt-8">
            <Image width={800} src={RangeFitlerPic} alt="filter range" />
          </div>
        </div>

        <Separator />

        <div className="flex flex-col gap-4">
          <h2 className="font-bold text-center m-6">Exporting query results</h2>
          <p>
            Exporting query results can be done by click on{" "}
            <strong>Export Data</strong> → <strong>Export query Results</strong>
          </p>
          <div className="flex justify-center mt-8">
            <Image width={800} src={ExportResultPic} alt="filter range" />
          </div>
        </div>
      </div>
    </section>
  );
}
