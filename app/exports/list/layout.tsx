"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RefreshCcw } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ExportsPage({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col items-center gap-y-8 relative">
        <Link href="/exports/new">
          <Button className="absolute right-4 top-4 ">Create New Export</Button>
        </Link>
        <Button
          variant="secondary"
          onClick={() => {
            router.refresh();
          }}
        >
          <RefreshCcw />
        </Button>
        <div className="flex flex-col justify-center items-center mt-20 w-2/3 text-center">
          {children}
        </div>
      </div>
    </>
  );
}
