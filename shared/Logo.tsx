import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  showText?: boolean
}

export default function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <img
        src="/favicon.png"
        alt="Lunara"
        className="h-12 w-15 rounded-lg object-contain"
      />
      {showText && (
        <span className="text-2xl font-bold tracking-tight leading-none">
          Lunara
        </span>
      )}
    </div>
  )
}