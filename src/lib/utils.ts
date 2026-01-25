import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * รวม class ของ Tailwind โดยตัดค่าที่ทับกันออก
 * ใช้เมื่อมี conditional classes หรือต่อจาก className จาก props
 * @example cn("px-4", isActive && "bg-blue-500", className)
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

