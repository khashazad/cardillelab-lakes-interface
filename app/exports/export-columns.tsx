"use client";
import { Button } from "@/components/ui/button";
import { ExportTask } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<ExportTask>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "status",
  },
  {
    accessorKey: "createdOn",
    header: "Start Date",
    cell: ({ row }) => {
      const startDate = new Date(row.original.createdOn);

      return <span>{startDate.toLocaleDateString("en-US")}</span>;
    },
  },
  {
    accessorKey: "file",
    header: "File",
    cell: ({ row }) => {
      return (
        <a
          href={`http://localhost:4000/download/${row.original._id}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="default">Download</Button>
        </a>
      );
    },
  },
];
