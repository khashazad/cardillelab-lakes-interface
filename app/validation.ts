import { object, string, number, TypeOf } from "zod";

export const lakeSchema = object({
  Id: string(),
});

export type TLakeSchema = TypeOf<typeof lakeSchema>;
