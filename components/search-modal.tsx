"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Search, X, Loader2 } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface Product {
  id: number
  title: string
  price: number
  discountPercentage: number
  thumbnail: string
  category: string
}

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [recentSearches, setRecentSearches] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  useEffect(() => {
    try {
      const saved = localStorage?.getItem("recentSearches")
      if (saved) {
        setRecentSearches(JSON.parse(saved))
      }
    } catch (error) {
      console.error("Error loading recent searches:", error)
    }
  }, [])

  useEffect(() => {
    const searchProducts = async () => {
      if (query.length < 2) {
        setResults([])
        return
      }

      setIsLoading(true)
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dummyjson.com"
        const response = await fetch(`${baseUrl}/products/search?q=${encodeURIComponent(query)}&limit=8`, {
          cache: "no-store",
          next: { revalidate: 0 },
        })

        if (!response.ok) {
          console.warn(`[search-modal] API returned ${response.status} ${response.statusText}`)
          setResults([])
          return
        }

        const data = await response.json()
        setResults(data?.products || [])
      } catch (error) {
        console.error("Search error:", error)
        setResults([])
      } finally {
        setIsLoading(false)
      }
    }

    const debounceTimer = setTimeout(searchProducts, 300)
    return () => clearTimeout(debounceTimer)
  }, [query])

  const handleSearch = (searchQuery: string) => {
    if (searchQuery?.trim()) {
      const newRecentSearches = [searchQuery, ...recentSearches.filter((s) => s !== searchQuery)].slice(0, 5)
      setRecentSearches(newRecentSearches)

      try {
        localStorage?.setItem("recentSearches", JSON.stringify(newRecentSearches))
      } catch (error) {
        console.error("Error saving recent searches:", error)
      }

      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      onClose()
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && query?.trim()) {
      handleSearch(query)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="sr-only">Search Products</DialogTitle>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              ref={inputRef}
              type="text"
              placeholder="Search for products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="pl-10 pr-10 py-3 text-lg border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </DialogHeader>

        <div className="px-6 pb-6 overflow-y-auto">
          {query.length < 2 && recentSearches.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Searches</h3>
              <div className="flex flex-wrap gap-2">
                {recentSearches.map((search, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-gray-200 transition-colors"
                    onClick={() => handleSearch(search)}
                  >
                    {search}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {isLoading && (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Searching...</span>
            </div>
          )}

          {query.length >= 2 && !isLoading && results.length === 0 && (
            <div className="text-center py-8 text-gray-500">No products found for "{query}"</div>
          )}

          {results.length > 0 && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Search Results</h3>
              {results.map((product) => {
                const discountedPrice = (product?.price || 0) * (1 - (product?.discountPercentage || 0) / 100)
                return (
                  <Link
                    key={product?.id || Math.random()}
                    href={`/products/${product?.id || 0}`}
                    onClick={onClose}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                      <Image
                        src={product?.thumbnail || "/placeholder.svg?height=48&width=48"}
                        alt={product?.title || "Product"}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="48px"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                        {product?.title || "Product"}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-semibold text-gray-900">${discountedPrice.toFixed(2)}</span>
                        {(product?.discountPercentage || 0) > 0 && (
                          <span className="text-sm text-gray-500 line-through">
                            ${(product?.price || 0).toFixed(2)}
                          </span>
                        )}
                        <Badge variant="secondary" className="text-xs">
                          {product?.category || "Product"}
                        </Badge>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
