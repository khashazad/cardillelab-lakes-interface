"use server";

import clientPromise from "@/lib/mongodb";
import axios from "axios";
import getEnvVaribale from "@/lib/get-env-variable";

export async function FetchLakeDataAsync(lakeId: string, year: string) {
  try {
    const client = await clientPromise;
    const db = client.db(getEnvVaribale("lakes"));
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

export async function createExportTaskAsync(payload: any) {
  await axios.post(`${getEnvVaribale("API_URI")}/exports`, payload);
}

export async function fetchExportTasksAsync() {
  try {
    const response = await axios.get(`${getEnvVaribale("API_URI")}/exports`);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
    return [];
  }
}

export async function deleteExportTaskAsync(id: string) {
  try {
    const response = await axios.delete(
      `${getEnvVaribale("API_URI")}/exports/${id}`,
    );
  } catch (e) {
    console.log(e);
  }
}
