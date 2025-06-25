"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface SearchParams {
  page?: string
  category?: string
  sortBy?: string
  minPrice?: string
  maxPrice?: string
  search?: string
  rating?: string
  brand?: string
}

interface PaginationProps {
  currentPage: number
  totalPages: number
  searchParams: SearchParams
}

export default function Pagination({ currentPage, totalPages, searchParams }: PaginationProps) {
  const router = useRouter()

  const createPageURL = (page: number) => {
    const params = new URLSearchParams()

    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && key !== "page") {
        params.set(key, value)
      }
    })

    if (page > 1) {
      params.set("page", page.toString())
    }

    return `/products?${params.toString()}`
  }

  const getVisiblePages = () => {
    const delta = 2
    const range = []
    const rangeWithDots = []

    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i)
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...")
    } else {
      rangeWithDots.push(1)
    }

    rangeWithDots.push(...range)

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages)
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages)
    }

    return rangeWithDots
  }

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push(createPageURL(currentPage - 1))}
        disabled={currentPage <= 1}
      >
        <ChevronLeft className="w-4 h-4" />
        Previous
      </Button>

      <div className="flex items-center gap-1">
        {getVisiblePages().map((page, index) => (
          <div key={index}>
            {page === "..." ? (
              <span className="px-3 py-2 text-gray-500">...</span>
            ) : (
              <Button
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => router.push(createPageURL(page as number))}
              >
                {page}
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push(createPageURL(currentPage + 1))}
        disabled={currentPage >= totalPages}
      >
        Next
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  )
}
