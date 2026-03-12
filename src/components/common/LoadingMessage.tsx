import { MESSAGE_LOADING } from "../../constants/messages";
import { cn } from "../../lib/utils";

export interface LoadingMessageProps {
  /** ข้อความแสดง (default: "Loading...") */
  message?: string;
  /** class สำหรับ styling — ใช้ต่าง theme ได้ */
  className?: string;
  /** แท็กที่ใช้ render (default: p) */
  as?: "p" | "span" | "div";
}

/**
 * แสดงข้อความ Loading ร่วมกันทั้งแอป
 * รับ optional className เพื่อปรับ theme ตามบริบท
 */
export function LoadingMessage({
  message = MESSAGE_LOADING,
  className = "text-body-1 text-brown-400",
  as: Tag = "p",
}: LoadingMessageProps) {
  return (
    <Tag className={cn(className)} role="status">
      {message}
    </Tag>
  );
}
