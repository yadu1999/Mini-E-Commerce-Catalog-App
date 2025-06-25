"use client"

import { AlertCircle, RefreshCw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ErrorMessageProps {
  title?: string
  message?: string
  onRetry?: () => void
  showRetry?: boolean
}

export default function ErrorMessage({
  title = "Something went wrong",
  message = "We encountered an error while loading this content. Please try again.",
  onRetry,
  showRetry = true,
}: ErrorMessageProps) {
  return (
    <Card className="max-w-md mx-auto">
      <CardContent className="p-8 text-center">
        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 mb-6">{message}</p>
        {showRetry && onRetry && (
          <Button onClick={onRetry} variant="outline" className="gap-2">
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
        )}
      </CardContent>
    </Card>
  )
}
