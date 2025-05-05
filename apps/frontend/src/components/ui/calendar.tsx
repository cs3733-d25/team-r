import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import {DayPicker, DayPickerSingleProps} from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

type CalendarProps = Omit<DayPickerSingleProps, "mode"> & {
    className?: string,
}
//add prop for onSelect and selected
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
    onSelect,
    selected,
  ...props
}: CalendarProps) {
  return (
      <DayPicker
          onSelect={onSelect}
          selected={selected}
          mode="single"
          showOutsideDays={showOutsideDays}
          className={cn("p-3 bg-primary rounded-xl shadow-md", className)}
          classNames={{
              months: "flex flex-col sm:flex-row gap-2",
              month: "flex flex-col gap-4",
              caption: "flex justify-center pt-1 relative items-center w-full text-primary-foreground",
              caption_label: "text-sm font-medium",
              nav: "flex items-center gap-1",
              nav_button: cn(
                  buttonVariants({ variant: "outline" }),
                  "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
              ),
              nav_button_previous: "absolute left-1 text-primary-foreground",
              nav_button_next: "absolute right-1 text-primary-foreground ",
              table: "w-full border-collapse space-x-1",
              head_row: "flex",
              head_cell:
                  "text-primary-foreground w-8 font-normal text-[0.8rem]  bg-secondary",
              row: "flex w-full mt-2 ",
              cell: cn(
                  "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
                  "[&:has([aria-selected])]:rounded-md"
              ),
              day: cn(
                  buttonVariants({ variant: "ghost" }),
                  "size-8 p-0 font-normal aria-selected:opacity-100"
              ),
              day_range_start:
                  "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
              day_range_end:
                  "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
              day_selected:
                  "bg-secondary text-secondary-foreground hover:bg-secondary hover:text-secondary-foreground focus:bg-secondary focus:text-primary-foreground",
              day_today: "bg-secondary text-primary-foreground",
              day_outside:
                  "day-outside text-muted-foreground aria-selected:text-muted-foreground",
              day_disabled: "text-muted-foreground opacity-50",
              day_range_middle:
                  "aria-selected:bg-accent aria-selected:text-accent-foreground",
              day_hidden: "invisible",
              ...classNames,
          }}
          components={{
              IconLeft: ({ className, ...props }) => (
                  <ChevronLeft className={cn("size-4", className)} {...props} />
              ),
              IconRight: ({ className, ...props }) => (
                  <ChevronRight className={cn("size-4", className)} {...props} />
              ),
          }}
          {...props}
      />
  )
}

export { Calendar }
