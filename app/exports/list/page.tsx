import { DataTable } from "@/components/data-table";
import { fetchExportTasksAsync } from "@/actions";
import { columns } from "./export-columns";

export default async function ExportsListPage() {
  const exportTasks = await fetchExportTasksAsync();

  return <DataTable columns={columns} data={exportTasks} />;
}
