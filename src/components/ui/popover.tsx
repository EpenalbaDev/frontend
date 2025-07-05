import * as React from "react"
import { cn } from "@/lib/utils"

interface PopoverProps {
  children: React.ReactNode
  className?: string
}

const Popover = ({ children, className }: PopoverProps) => {
  return (
    <div className={cn("relative", className)}>
      {children}
    </div>
  )
}

interface PopoverTriggerProps {
  children: React.ReactNode
  asChild?: boolean
}

const PopoverTrigger = ({ children, asChild = false }: PopoverTriggerProps) => {
  return <>{children}</>
}

interface PopoverContentProps {
  children: React.ReactNode
  className?: string
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
  sideOffset?: number
}

const PopoverContent = React.forwardRef<HTMLDivElement, PopoverContentProps>(
  ({ children, className, align = "center", side = "bottom", sideOffset = 4 }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "z-50 w-72 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          className
        )}
        style={{
          marginTop: side === "bottom" ? sideOffset : undefined,
          marginBottom: side === "top" ? sideOffset : undefined,
          marginLeft: side === "right" ? sideOffset : undefined,
          marginRight: side === "left" ? sideOffset : undefined,
        }}
      >
        {children}
      </div>
    )
  }
)
PopoverContent.displayName = "PopoverContent"

export { Popover, PopoverTrigger, PopoverContent } 