"use server";

import clientPromise from "@/lib/mongodb";

export async function FetchLakeData(lakeId: string) {
  try {
    const client = await clientPromise;
    const db = client.db("Lakes");
    const lake = await db
      .collection("lookup")
      .findOne({ hylak_id: Number(lakeId) });

    if (!lake) return [];

    const { collection: asset_collection, asset_id } = lake;

    const collection = `c${asset_collection}_l8_${asset_id}`;

    const observations = await db
      .collection(collection)
      .find({ hylak_id: Number(lakeId) })
      .toArray();

    return observations;
  } catch (e) {
    throw new Error("An error occured while fetching lakes data");
  }
}
