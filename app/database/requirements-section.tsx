import Link from "next/link";
import CompassPic from "@/public/compass.png";
import Image from "next/image";

export default async function RequirementsSection() {
  return (
    <section className="flex flex-col space-y-8 p-20">
      <h1
        className="flex justify-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
        id="Introduction"
      >
        Requirements
      </h1>
      <p className="text-gray-800">
        In order to access the database, a software named MongoDB Compass must
        be installed. This tool allows us to view, edit and filter the database
        collections.
      </p>
      <p>
        Follow this{" "}
        <Link
          className="text-xl"
          href="https://www.mongodb.com/try/download/shell"
        >
          link
        </Link>{" "}
        to install Compass:
      </p>
      <Image src={CompassPic} alt="compass download page" />
    </section>
  );
}
