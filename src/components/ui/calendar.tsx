import * as React from "react"
import { cn } from "@/lib/utils"

interface CalendarProps {
  mode?: "single" | "multiple" | "range"
  selected?: Date | Date[] | undefined
  onSelect?: (date: Date | undefined) => void
  initialFocus?: boolean
  className?: string
}

const Calendar = React.forwardRef<HTMLDivElement, CalendarProps>(
  ({ mode = "single", selected, onSelect, initialFocus = false, className }, ref) => {
    const [currentDate, setCurrentDate] = React.useState(new Date())
    
    const getDaysInMonth = (date: Date) => {
      const year = date.getFullYear()
      const month = date.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const daysInMonth = lastDay.getDate()
      const startingDayOfWeek = firstDay.getDay()
      
      return { daysInMonth, startingDayOfWeek }
    }
    
    const isSelected = (date: Date) => {
      if (!selected) return false
      if (Array.isArray(selected)) {
        return selected.some(d => d.toDateString() === date.toDateString())
      }
      return selected.toDateString() === date.toDateString()
    }
    
    const handleDateClick = (date: Date) => {
      onSelect?.(date)
    }
    
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate)
    
    const days = []
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />)
    }
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
      days.push(
        <button
          key={day}
          onClick={() => handleDateClick(date)}
          className={cn(
            "p-2 text-sm rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500",
            isSelected(date) && "bg-blue-500 text-white hover:bg-blue-600"
          )}
        >
          {day}
        </button>
      )
    }
    
    const goToPreviousMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))
    }
    
    const goToNextMonth = () => {
      setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    }
    
    return (
      <div
        ref={ref}
        className={cn("p-3", className)}
        tabIndex={initialFocus ? 0 : undefined}
      >
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={goToPreviousMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h2 className="text-sm font-semibold">
            {currentDate.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' })}
          </h2>
          <button
            onClick={goToNextMonth}
            className="p-1 hover:bg-gray-100 rounded"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-500 mb-2">
          <div>Dom</div>
          <div>Lun</div>
          <div>Mar</div>
          <div>Mié</div>
          <div>Jue</div>
          <div>Vie</div>
          <div>Sáb</div>
        </div>
        
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    )
  }
)
Calendar.displayName = "Calendar"

export { Calendar } 