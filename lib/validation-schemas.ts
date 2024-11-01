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
    .max(100, "Value cannot exceed 100")
    .optional(),
  bands: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one band",
  }),
  buffers: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one buffer",
  }),
  fishnets: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one fishnet",
  }),
  years: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one year",
  }),
});

export type TExportSchema = TypeOf<typeof exportSchema>;

export const lakeSchema = z.object({
  lakeId: z.string(),
  year: z.string(),
  band: z.string(),
});

export type TLakeSchema = TypeOf<typeof lakeSchema>;
