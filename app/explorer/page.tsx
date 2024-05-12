"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FetchLakeData } from "../actions";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import ButtonLoadingSpinner from "@/components/ui/button-loading-spinner";
import { cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TLakeSchema, lakeSchema } from "@/lib/validation-schemas";
import { Bands, Buffers, LandsatObservation, Years } from "@/lib/types";

export default function ExplorerPage() {
  const [observations, setObservations] = useState<LandsatObservation[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const form = useForm<TLakeSchema>({
    resolver: zodResolver(lakeSchema),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = form;

  const onSubmit = async (data: TLakeSchema) => {
    setLoading(true);
    try {
      const result = await FetchLakeData(data.lakeId, data.year);

      if (result.length == 0) {
        setError("No observations found for the specified lake");
        return;
      }

      setObservations(result as unknown as LandsatObservation[]);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="m-8 flex flex-col gap-8 pt-10">
      <div className="mx-8 flex flex-col jusitfy-start items-center py-4 gap-16">
        <Form {...form}>
          <form
            className="flex gap-[4rem] items-center"
            onSubmit={handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="lakeId"
              render={({ field }) => (
                <FormItem className="flex flex-grow-1 items-center gap-4 ">
                  <FormLabel>Lake</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Id of the lake"
                      className="flex-auto w-24"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel>Year</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="flex-auto w-24">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Years.map((year) => (
                        <SelectItem key={year} value={String(year)}>
                          {year.toString()}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="band"
              render={({ field }) => (
                <FormItem className="flex items-center gap-4">
                  <FormLabel>Band</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="flex-auto w-[10rem]">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Bands.map((band) => (
                        <SelectItem key={band.id} value={band.id}>
                          {band.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              disabled={loading}
              type="submit"
              className={cn(
                `bg-secondary text-secondary w-full transform rounded-lg px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 focus:outline-none focus:ring focus:ring-opacity-50 ${
                  loading ? "cursor-not-allowed opacity-50" : ""
                }`,
                "bg-gray-900 text-white outline-none transition-all hover:scale-105 hover:bg-gray-950 focus:scale-110 active:scale-105 ",
              )}
            >
              {loading ? (
                <ButtonLoadingSpinner loadingText={"loading"} />
              ) : (
                <span>Show Observations</span>
              )}
            </Button>
          </form>
        </Form>

        {error && (
          <div className="font-bold text-3xl flex justify-center items-center mb-8">
            {error}
          </div>
        )}

        {observations.length != 0 && (
          <div className="h-[500px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                width={500}
                height={300}
                data={observations}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="image.month" />
                <YAxis />
                <Tooltip />
                <Legend />
                {Buffers.map((buffer) => [
                  <Line
                    type="monotone"
                    dataKey={`${getValues("band")}.${buffer.id}`}
                    stroke={buffer.color}
                    activeDot={{ r: 8 }}
                  />,
                ])}
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Card>
  );
}
