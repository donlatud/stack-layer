import { cn } from "../../lib/utils";

export interface EmptyMessageProps {
  /** ข้อความแสดงเมื่อไม่มีข้อมูล */
  message: string;
  /** class สำหรับ styling — ใช้ต่าง theme ได้ */
  className?: string;
  /** แท็กที่ใช้ render (default: p) */
  as?: "p" | "span" | "div";
}

/**
 * แสดงข้อความ Empty state ร่วมกันทั้งแอป
 * รับ optional className และ optional icon/action ได้
 */
export function EmptyMessage({
  message,
  className,
  as: Tag = "p",
}: EmptyMessageProps) {
  return <Tag className={cn(className)}>{message}</Tag>;
}
