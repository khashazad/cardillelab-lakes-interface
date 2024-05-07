import { TypeOf, z } from "zod";

export const exportSchema = z.object({
  name: z.string({
    required_error: "You have to provide a name for this export",
  }),
  cloudCoverThreshold: z
    .number()
    .int()
    .positive()
    .min(0, "Value cannot be negative")
    .max(100, "Value cannot exceed 100"),
  bands: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one band",
  }),
});

export type TExportSchema = TypeOf<typeof exportSchema>;

export const lakeSchema = z.object({
  lakeId: z.string(),
  year: z.string(),
});

export type TLakeSchema = TypeOf<typeof lakeSchema>;
