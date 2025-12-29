import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface WhiteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
}

const WhiteButton = ({ children, className, ...props }: WhiteButtonProps) => {
  return (
    <Button
      variant="outline"
      className={cn(
        "w-[127px] h-[48px] rounded-[999px] border border-brown-400 bg-white text-brown-600 text-body-1 pt-[12px] pr-[40px] pb-[12px] pl-[40px]",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

export default WhiteButton;