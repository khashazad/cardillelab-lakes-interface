"use client";
import { Card } from "@/components/ui/card";
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

export default function ExplorerPage() {
  const [observations, setObservations] = useState<LandsatObservation[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLakeSchema>({
    resolver: zodResolver(lakeSchema),
  });

  const onSubmit = async (data: TLakeSchema) => {
    setLoading(true);
    try {
      const result = await FetchLakeData(data.Id);

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
        <form
          className="flex gap-[4rem] w-max items-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Label className="flex-auto w-[10rem]">Lake ID</Label>
          <Input {...register("Id")} type="number" />
          <Button
            disabled={loading}
            type="submit"
            className={cn(
              `bg-secondary text-secondary w-full transform rounded-lg px-6 py-3 text-sm font-medium tracking-wide transition-colors duration-300 focus:outline-none focus:ring focus:ring-opacity-50 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`,
              "bg-gray-900 text-white outline-none transition-all hover:scale-105 hover:bg-gray-950 focus:scale-110 active:scale-105 dark:bg-white dark:bg-opacity-10",
            )}
          >
            {loading ? (
              <ButtonLoadingSpinner loadingText={"loading"} />
            ) : (
              <span>View Data</span>
            )}
          </Button>
        </form>

        {error && <div></div>}

        {observations && (
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
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sr_band1.60"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="sr_band2.60" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </Card>
  );
}
