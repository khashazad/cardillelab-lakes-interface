import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatFileSize(bytes: number) {
  const MB = 1024 * 1024; // Number of bytes in 1 MB
  const GB = 1024 * MB; // Number of bytes in 1 GB

  if (bytes < GB) {
    return (bytes / MB).toFixed(2) + " MB";
  } else {
    return (bytes / GB).toFixed(2) + " GB";
  }
}
