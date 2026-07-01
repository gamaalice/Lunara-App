import type { LucideIcon } from "lucide-react"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface EmptyStateProps {
  icon: LucideIcon
  title: string
  description: string
  actionLabel?: string
  onAction?: () => void
}

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 text-center sm:py-20">
      <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-muted sm:h-20 sm:w-20">
        <Icon className="h-8 w-8 text-muted-foreground sm:h-10 sm:w-10" />
      </div>

      <h3 className="text-xl font-semibold leading-tight text-foreground sm:text-2xl">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-base leading-relaxed text-muted-foreground">
        {description}
      </p>

      {actionLabel && onAction && (
        <Button onClick={onAction} className="mt-6 h-11 w-full gap-2 text-base sm:w-auto">
          <Plus className="h-5 w-5" />
          {actionLabel}
        </Button>
      )}
    </div>
  )
}