import { TypeOf, z } from "zod";

export const exportSchema = z.object({
  name: z.string({
    required_error: "You have to provide a name for this export",
  }),
  bands: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one band",
  }),
});

export type TExportSchema = TypeOf<typeof exportSchema>;
