"use server";

import clientPromise from "@/lib/mongodb";
import axios from "axios";

export async function FetchLakeDataAsync(lakeId: string, year: string) {
  try {
    const client = await clientPromise;
    const db = client.db("Lakes");
    const lake = await db
      .collection("lookup")
      .findOne({ hylak_id: Number(lakeId) });

    if (!lake) return [];

    const { collection: asset_collection, asset_id } = lake;

    const collection = `c${asset_collection}_l8_${asset_id}`;

    const query = { hylak_id: Number(lakeId), "image.year": Number(year) };

    const observations = await db
      .collection(collection)
      .find(query)
      .sort({ "image.month": 1, "image.doy": 1 })
      .toArray();

    return observations;
  } catch (e) {
    throw new Error("An error occured while fetching lakes data");
  }
}

export async function fetchExportTasksAsync() {
  try {
    const response = await axios.get("http://localhost:4000/exports");
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function deleteExportTaskAsync(id: string) {
  try {
    const response = await axios.delete(`http://localhost:4000/exports/${id}`);
  } catch (e) {
    console.log(e);
  }
}
