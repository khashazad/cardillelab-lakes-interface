import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { columns } from "./export-columns";

export default async function ExportsPage() {
  const exports = await (await fetch("http://localhost:4000/exports")).json();

  return (
    <>
      <div className="flex flex-col items-center gap-y-8 absolute">
        <Button className="relative right-4 top-4 ">Create New Export</Button>
        <div className="flex justify-center items-center w-1/2">
          <DataTable columns={columns} data={exports} />
        </div>
      </div>
    </>
  );
}
