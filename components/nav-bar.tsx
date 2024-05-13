"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="database"
          className={cn(
            "text-muted-foreground transition-colors hover:text-foreground",
            pathname?.includes("database")
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        >
          Database
        </Link>
        <Link
          href="explorer"
          className={cn(
            "text-muted-foreground transition-colors hover:text-foreground",
            pathname?.includes("explorer")
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        >
          Observation Explorer
        </Link>
        <Link
          href="exports"
          className={cn(
            "text-muted-foreground transition-colors hover:text-foreground",
            pathname?.includes("export")
              ? "text-foreground"
              : "text-muted-foreground",
          )}
        >
          Export Data
        </Link>
      </nav>
    </header>
  );
}
