import { object, string, number, TypeOf } from "zod";

export const lakeSchema = object({
  lakeId: string(),
  year: string(),
});

export type TLakeSchema = TypeOf<typeof lakeSchema>;
