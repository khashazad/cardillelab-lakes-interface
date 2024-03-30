"use client";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FetchLakeData } from "../actions";
import { FormEvent, useEffect, useState } from "react";
import { LandsatObservation } from "@/types";
import { lakeSchema, TLakeSchema } from "@/validation";
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
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import Link from "next/link";

const YEARS = [
  2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024,
];

const BUFFERS = [
  {
    buffer: 1,
    color: "#87CEEB",
  },
  {
    buffer: 10,
    color: "#DC143C",
  },
  {
    buffer: 15,
    color: "#228B22",
  },
  {
    buffer: 30,
    color: "#FFD700",
  },
  {
    buffer: 40,
    color: "#7851A9",
  },
  {
    buffer: 60,
    color: "#CC5500",
  },
  {
    buffer: 90,
    color: "#008080",
  },
  {
    buffer: 100,
    color: "#FF00FF",
  },
  {
    buffer: 125,
    color: "#708090",
  },

  {
    buffer: 250,
    color: "#40E0D0",
  },
];

const BANDS = [
  {
    title: "Band 1 (ultra blue, coastal aerosol) surface reflectance",
    key: "sr_band1",
  },
  {
    title: "Band 2 (blue) surface reflectance	1",
    key: "sr_band2",
  },
  {
    title: "Band Band 3 (green) surface reflectance",
    key: "sr_band3",
  },
  {
    title: "Band 4 (red) surface reflectance",
    key: "sr_band4",
  },
  {
    title: "Band 5 (near infrared) surface reflectance",
    key: "sr_band5",
  },
  {
    title: "Band 6 (shortwave infrared 1) surface reflectance",
    key: "sr_band6",
  },
  {
    title: "Band 7 (shortwave infrared 2) surface reflectance",
    key: "sr_band7",
  },
  {
    title: "Band 10 surface temperature.",
    key: "st_band10",
  },
  {
    title: "Pixel quality",
    key: "qa_pixel",
  },
  {
    title: "Radiometric saturation",
    key: "qa_radsat",
  },
];

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
                      {YEARS.map((year) => (
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
                      {BANDS.map((band) => (
                        <SelectItem key={band.key} value={band.key}>
                          {band.title}
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
                {BUFFERS.map((buffer) => [
                  <Line
                    type="monotone"
                    dataKey={`${getValues("band")}.${buffer.buffer}`}
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
