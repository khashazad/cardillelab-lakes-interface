import NewConnectionPic from "@/public/new-connection.png";
import ConnectionStringPic from "@/public/connection-string.jpeg";
import MainPagePic from "@/public/main-page.jpeg";

import Image from "next/image";
import { Separator } from "@/components/ui/separator";

export default async function ConnectionSection() {
  return (
    <section className="flex min-h-screen flex-col space-y-8 p-20">
      <h1
        className="flex justify-center text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl"
        id="Introduction"
      >
        Connection To Database
      </h1>
      <div className="text-xl space-y-8">
        <Separator />
        <div className="flex flex-col gap-4">
          <h2>
            1. Open Compass and click on <b>New Connection</b> on the top left
          </h2>
          <div className="flex justify-center mt-6 w-3/4">
            <Image
              width={800}
              src={NewConnectionPic}
              alt="compass new connection"
            />
          </div>
        </div>

        <Separator />
        <div className="flex flex-col gap-4">
          <h2>
            2. Click on <b>Edit Connection String </b> and then enter the
            following connection string in the input field:
            <p className="mt-4 font-bold">
              {
                '"mongodb://lakesviewer:QfcekxUORNoF1YDI3jPelQgIHUytUe3D+ELFJPa8FfR7vP4yWBe7mWd545hsr4o0@206.12.90.121:27017/"'
              }
            </p>
          </h2>

          <div className="flex justify-center mt-6 w-3/4">
            <Image
              width={800}
              src={ConnectionStringPic}
              alt="compass connection string"
            />
          </div>
        </div>

        <Separator />
        <div className="flex flex-col gap-4">
          <h2>
            3. Click on <b> Connect </b> and you should see the following page
          </h2>
          <div className="flex justify-center mt-6 w-3/4">
            <Image width={800} src={MainPagePic} alt="compass main page" />
          </div>
        </div>
      </div>
    </section>
  );
}
