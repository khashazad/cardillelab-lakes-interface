"use client";
import { Button } from "@/components/ui/button";
import { ExportTask } from "@/lib/types";
import { ColumnDef, Row } from "@tanstack/react-table";

import { Progress } from "@/components/ui/progress";
import { cn, formatFileSize } from "@/lib/utils";
import { Trash2 } from "lucide-react";
import { deleteExportTaskAsync } from "@/actions";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LoadingSpinner } from "@/components/loading-spinner";

const DeleteExportComponent = ({ row }: { row: Row<ExportTask> }) => {
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  return (
    row.original.status == "Completed" &&
    (deleting ? (
      <LoadingSpinner />
    ) : (
      <Button
        type="button"
        onClick={async () => {
          setDeleting(true);
          await deleteExportTaskAsync(row.original._id);
          setDeleting(false);
          router.refresh();
        }}
      >
        <Trash2 />
      </Button>
    ))
  );
};

export const columns: ColumnDef<ExportTask>[] = [
  {
    accessorKey: "name",
    header: "Name",
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
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.original.status;

      const colors = {
        running: "blue",
        completed: "green",
        failed: "red",
      };

      let bgColor = colors.failed;

      if (status == "In Progress") bgColor = colors.running;
      if (status == "Completed") bgColor = colors.completed;

      return (
        <div
          className={cn(
            `px-3 py-2 font-semiboldi text-center font-lg border-black border-2 bg-red-500 rounded-sm`,
            status == "In Progress" ? "bg-blue-500" : "",
            status == "Completed" ? "bg-green-500" : "",
            status == "Failed" ? "bg-red-500" : "",
          )}
        >
          {status}
        </div>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Progress",
    cell: ({ row }) => {
      const exportTask = row.original;

      if (exportTask.progress) {
        return <Progress value={exportTask.progress || 0} />;
      }
    },
  },
  {
    accessorKey: "fileSize",
    header: "Size",
    cell: ({ row }) => {
      return (
        row.original.fileSize && (
          <span>{formatFileSize(row.original.fileSize)}</span>
        )
      );
    },
  },
  {
    accessorKey: "file",
    header: "File",
    cell: ({ row }) => {
      return (
        row.original.status == "Completed" && (
          <a
            href={`${process.env.API_URI}/download/${row.original._id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="default">Download</Button>
          </a>
        )
      );
    },
  },
  {
    id: "delete",
    cell: DeleteExportComponent,
  },
];
