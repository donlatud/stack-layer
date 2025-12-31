import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BlackButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const BlackButton = ({ children, className, ...props }: BlackButtonProps) => {
  return (
    <Button
      className={cn(
        "w-[141px] h-[48px] rounded-[999px] bg-brown-600 pt-[12px] pr-[40px] pb-[12px] pl-[40px] text-body-1 text-white cursor-pointer transition-all duration-300 hover:bg-brown-700 hover:shadow-lg hover:shadow-brown-600/40 hover:scale-105 hover:-translate-y-0.5 active:scale-100 active:translate-y-0 active:shadow-md",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

export default BlackButton;

