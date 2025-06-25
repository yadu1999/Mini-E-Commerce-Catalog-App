"use client"

import Link from "next/link"
import { Home, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
      <div className="text-center max-w-md mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-9xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            404
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto rounded-full mb-6" />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">Page Not Found</h2>
        <p className="text-gray-600 mb-8 leading-relaxed">
          Oops! The page you're looking for seems to have wandered off. Don't worry, let's get you back on track.
        </p>

        <div className="space-y-3">
          <Button
            asChild
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            <Link href="/">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Link>
          </Button>

          <Button asChild variant="outline" className="w-full">
            <Link href="/products">
              <Search className="w-4 h-4 mr-2" />
              Browse Products
            </Link>
          </Button>

          <Button variant="ghost" onClick={() => window.history.back()} className="w-full">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    </div>
  )
}
