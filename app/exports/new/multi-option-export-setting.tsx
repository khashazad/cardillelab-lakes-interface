import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { TExportSchema } from "@/lib/validation-schemas";
import React from "react";
import { UseFormReturn } from "react-hook-form";

type MultiOptionExportSettingProps = {
  title: string;
  name: keyof TExportSchema;
  options: { id: string; name: string }[];
  form: UseFormReturn<TExportSchema, any, undefined>;
};

export default function MultiOptionExportSetting({
  title,
  name,
  options,
  form,
}: MultiOptionExportSettingProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={() => (
        <FormItem className="flex flex-col flex-nowrap justify-between">
          <div>
            <div className="mb-6 text-center space-y-2 basis-1/8">
              <FormLabel className="text-xl font-medium">{title}</FormLabel>
              <Separator orientation="horizontal" />
            </div>
            <div className="flex flex-col gap-y-2 wrap mb-4">
              {options.map((value) => (
                <FormField
                  key={value.id}
                  control={form.control}
                  name={name}
                  render={({ field }: { field: any }) => {
                    return (
                      <FormItem
                        key={value.id}
                        className="flex flex-row items-start space-x-3 space-y-0"
                      >
                        <FormControl>
                          <Checkbox
                            checked={field.value?.includes(value.id)}
                            onCheckedChange={(checked) => {
                              return checked
                                ? field.onChange([...field.value, value.id])
                                : field.onChange(
                                    field.value?.filter(
                                      (val: string) => val !== value.id,
                                    ),
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="font-normal">
                          {value.name}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </div>
          </div>
          <div className="flex gap-x-2 w-full mt-16">
            <Button
              className="grow"
              type="button"
              onClick={() =>
                form.setValue(
                  name,
                  options.map((x) => x.id),
                )
              }
            >
              Select All
            </Button>
            <Button
              className="grow"
              type="button"
              variant="secondary"
              onClick={() => form.setValue(name, [options[0].id])}
            >
              Reset
            </Button>
          </div>
        </FormItem>
      )}
    />
  );
}
