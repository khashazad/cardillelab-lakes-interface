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
import { toast } from "@/components/ui/use-toast";
import { TExportSchema, exportSchema } from "@/lib/validation-schemas";
import { Bands } from "@/lib/types";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function ExportPage() {
  const form = useForm<TExportSchema>({
    resolver: zodResolver(exportSchema),
    defaultValues: {
      bands: Bands.map((b) => b.id),
    },
  });

  function onSubmit(data: TExportSchema) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Card className="m-4  p-4">
      <CardTitle className="text-4xl text-center font-semibold">
        Export Interface
      </CardTitle>

      <CardContent className="pt-4">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="w-1/4">
                  <div className="">
                    <FormLabel className="text-base">Name</FormLabel>
                    <FormDescription>
                      Give a name to this export
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
