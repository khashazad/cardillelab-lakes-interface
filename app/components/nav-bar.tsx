"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex px-2 h-14 items-center">
        <div className="mr-2 md:mr-4 flex">
          <nav className="flex items-center gap-4 text-sm">
            <Link
              href="/"
              className={cn(
                "navItem transition-all hover:text-foreground/80 hover:scale-105",
                pathname.includes("dashboard")
                  ? "text-foreground"
                  : "text-foreground/60",
              )}
            >
              About
            </Link>
            <Link
              href="/requirements"
              className={cn(
                "navItem transition-all hover:text-foreground/80 hover:scale-105",
                pathname.includes("requirements")
                  ? "text-foreground"
                  : "text-foreground/60",
              )}
            >
              Requirements
            </Link>
            <Link
              href="/connection"
              className={cn(
                "navItem transition-all hover:text-foreground/80 hover:scale-105",
                pathname.includes("connection")
                  ? "text-foreground"
                  : "text-foreground/60",
              )}
            >
              Connection
            </Link>
            <Link
              href="/queries"
              className={cn(
                "navItem transition-all hover:text-foreground/80 hover:scale-105",
                pathname.includes("queries")
                  ? "text-foreground"
                  : "text-foreground/60",
              )}
            >
              Common Queries
            </Link>

            <Link
              href="/explorer"
              className={cn(
                "navItem transition-all hover:text-foreground/80 hover:scale-105",
                pathname.includes("explorer")
                  ? "text-foreground"
                  : "text-foreground/60",
              )}
            >
              Observation Viewer
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
