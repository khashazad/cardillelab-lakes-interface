"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TExportSchema, exportSchema } from "@/lib/validation-schemas";
import { Bands, Buffers, Fishnets, Years } from "@/lib/types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { Separator } from "@/components/ui/separator";
import MultiOptionExportSetting from "./multi-option-export-setting";
import { useRouter } from "next/navigation";

export default function ExportPage() {
  const router = useRouter();

  const form = useForm<TExportSchema>({
    resolver: zodResolver(exportSchema),
    defaultValues: {
      bands: Bands.map((b) => b.id),
      fishnets: Fishnets.map((f) => f.id),
      years: Years,
      buffers: ["60"],
    },
  });

  async function onSubmit(data: TExportSchema) {
    const { buffers, fishnets, years, cloudCoverThreshold, ...config } = data;
    try {
      await axios.post("http://localhost:4000/exports", {
        fishnets: fishnets.map((f) => Number(f)),
        years: years.map((y) => Number(y)),
        buffers: buffers.map((b) => Number(b)),
        cloudCoverThreshold: Number(cloudCoverThreshold),
        ...config,
      });
      router.push("/exports/list");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="m-4  p-4">
      <CardTitle className="text-4xl text-center font-semibold my-2">
        Export Interface
      </CardTitle>

      <CardContent className="pt-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-between">
              <div className="flex justify-start gap-8 grow">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="w-1/4">
                      <FormLabel className="text-base">Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                      <FormDescription>
                        Give a name to this export
                      </FormDescription>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="cloudCoverThreshold"
                  render={({ field }) => (
                    <FormItem className="w-1/4">
                      <FormLabel className="text-base">
                        Cloud Cover Threshold
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          onChange={(event) =>
                            field.onChange(+event.target.value)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col justify-center">
                <Button type="submit">Generate File</Button>
              </div>
            </div>
            <div className="flex justify-evenly border-black border-solid border-[1px] p-4 rounded-sm h-full grow basis-2/3">
              <MultiOptionExportSetting
                title="Bands"
                name="bands"
                form={form}
                options={Bands.map((b) => {
                  return { id: b.id, name: b.name };
                })}
              />
              <Separator orientation="vertical" />
              <MultiOptionExportSetting
                title="Years"
                name="years"
                form={form}
                options={Years.map((x) => {
                  return { id: x, name: x };
                })}
              />

              <Separator orientation="vertical" />
              <MultiOptionExportSetting
                title="Buffers"
                name="buffers"
                form={form}
                options={Buffers.map((x) => {
                  return { id: x.id, name: `${x.id} m` };
                })}
              />

              <Separator orientation="vertical" />
              <MultiOptionExportSetting
                title="Fishnets"
                name="fishnets"
                form={form}
                options={Fishnets}
              />
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
