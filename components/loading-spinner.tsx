import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "small" | "medium" | "large"
  className?: string
}

export default function LoadingSpinner({ size = "medium", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-8 h-8",
    large: "w-12 h-12",
  }

  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className={cn("animate-spin rounded-full border-2 border-gray-300 border-t-blue-600", sizeClasses[size])} />
    </div>
  )
}
