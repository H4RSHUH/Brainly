import type { ReactElement } from "react"
import { cn } from "../lib/utils"

export function SidebarItem({
  text, 
  icon, 
  active, 
  onClick
}: {
  text: string
  icon: ReactElement
  active?: boolean
  onClick?: () => void
}) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all duration-150 cursor-pointer",
        active 
          ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 font-semibold" 
          : "text-surface-600 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-850 dark:hover:text-surface-200"
      )}
    >
      <span className={cn(
        "flex items-center justify-center [&>svg]:w-[18px] [&>svg]:h-[18px]",
        active ? "text-amber-500 dark:text-amber-400" : "text-surface-400 dark:text-surface-500"
      )}>
        {icon} 
      </span>  
      <span className="truncate">{text}</span>
    </button>
  )
}