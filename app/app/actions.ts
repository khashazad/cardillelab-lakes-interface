"use server";

import clientPromise from "@/lib/mongodb";

export async function FetchLakeData(lakeId: string, year: string) {
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
