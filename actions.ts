"use server";

export async function downloadExportFile(file: string) {
  const response = await fetch("http://localhost:4000/download", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ file }),
  });
}
