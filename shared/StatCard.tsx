import type { LucideIcon } from "lucide-react"
import { TrendingUp, TrendingDown } from "lucide-react"
import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  icon: LucideIcon
  subtitle?: string
  trend?: "up" | "down"
  delay?: number
}

export default function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
  trend,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.08 }}
      className="min-w-0"
    >
      <Card className="h-full border border-border/60 p-5 sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-base font-medium leading-snug text-muted-foreground">
              {title}
            </p>

            <p className="mt-2 truncate text-2xl font-bold leading-tight text-foreground sm:text-3xl">
              {value}
            </p>

            {subtitle && (
              <p
                className={cn(
                  "mt-2 flex items-center gap-1 text-sm font-medium leading-snug",
                  trend === "up"
                    ? "text-green-600"
                    : trend === "down"
                      ? "text-destructive"
                      : "text-muted-foreground",
                )}
              >
                {trend === "up" && <TrendingUp className="h-4 w-4 shrink-0" />}
                {trend === "down" && <TrendingDown className="h-4 w-4 shrink-0" />}
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 sm:h-12 sm:w-12">
            <Icon className="h-5 w-5 text-primary sm:h-6 sm:w-6" />
          </div>
        </div>
      </Card>
    </motion.div>
  )
}