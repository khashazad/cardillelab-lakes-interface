"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Bands } from "@/lib/types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";

export default function ExportPage() {
  const form = useForm<TExportSchema>({
    resolver: zodResolver(exportSchema),
    defaultValues: {
      bands: Bands.map((b) => b.id),
    },
  });

  async function onSubmit(data: TExportSchema) {
    try {
      console.log(data);
      await axios.post("http://localhost:4000/exports", data);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card className="m-4  p-4">
      <CardTitle className="text-4xl text-center font-semibold">
        Export Interface
      </CardTitle>

      <CardContent className="pt-16">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <div className="flex justify-start gap-8">
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
            <FormField
              control={form.control}
              name="bands"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">Bands</FormLabel>
                    <FormDescription>
                      Select the bands you want to export
                    </FormDescription>
                  </div>
                  {Bands.map((band: { id: string; name: string }) => (
                    <FormField
                      key={band.id}
                      control={form.control}
                      name="bands"
                      render={({ field }: { field: any }) => {
                        return (
                          <FormItem
                            key={band.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(band.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, band.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value: string) => value !== band.id,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {band.name}
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
