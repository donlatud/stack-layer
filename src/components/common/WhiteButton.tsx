import * as React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface WhiteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

/**
 * ปุ่มแบบขอบ (outline) พื้นหลังขาว
 * ใช้กับ Button variant="outline"; รองรับ className และ props ปุ่มอื่นๆ
 */
const WhiteButton = ({ children, className, ...props }: WhiteButtonProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-[127px] h-[48px] rounded-[999px] border border-brown-400 bg-white text-brown-600 text-body-1 pt-[12px] pr-[40px] pb-[12px] pl-[40px] cursor-pointer transition-all duration-300 hover:bg-brown-50 hover:border-brown-500 hover:shadow-md hover:shadow-brown-300/30 hover:scale-105 hover:-translate-y-0.5 active:scale-100 active:translate-y-0 active:shadow-sm",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

export default WhiteButton;