"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Filter, X, SlidersHorizontal, Star } from "lucide-react"
import { categories2, ratingOptions, sortOptions } from "@/lib/utils"



export interface FilterPanelProps {
  isMobile?: boolean
  onClose?: () => void
}

export default function FilterPanel({ isMobile = false, onClose }: FilterPanelProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [filters, setFilters] = useState({
    category: searchParams?.get("category") || "",
    sortBy: searchParams?.get("sortBy") || "",
    minPrice: searchParams?.get("minPrice") || "",
    maxPrice: searchParams?.get("maxPrice") || "",
    rating: searchParams?.get("rating") || "",
    brand: searchParams?.get("brand") || "",
  })

  const [priceRange, setPriceRange] = useState([
    Number.parseInt(filters.minPrice) || 0,
    Number.parseInt(filters.maxPrice) || 2000,
  ])

  const [activeFilters, setActiveFilters] = useState<string[]>([])

  useEffect(() => {
    const active = []
    if (filters.category)
      active.push(`Category: ${categories2.find((c) => c.value === filters.category)?.label || filters.category}`)
    if (filters.sortBy && filters.sortBy !== "default")
      active.push(`Sort: ${sortOptions.find((s) => s.value === filters.sortBy)?.label || filters.sortBy}`)
    if (filters.minPrice || filters.maxPrice) active.push(`Price: $${priceRange[0]} - $${priceRange[1]}`)
    if (filters.rating) active.push(`Rating: ${filters.rating}+ Stars`)
    if (filters.brand) active.push(`Brand: ${filters.brand}`)
    setActiveFilters(active)
  }, [filters, priceRange])

  const updateURL = (newFilters: typeof filters) => {
    const params = new URLSearchParams(searchParams?.toString() || "")

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value && value !== "default") {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })

    
    params.delete("page")

    router.push(`/products?${params.toString()}`)
    if (isMobile && onClose) {
      onClose()
    }
  }

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    updateURL(newFilters)
  }

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values)
    const newFilters = {
      ...filters,
      minPrice: values[0]?.toString() || "0",
      maxPrice: values[1]?.toString() || "2000",
    }
    setFilters(newFilters)

 
    setTimeout(() => updateURL(newFilters), 500)
  }

  const clearFilters = () => {
    const newFilters = {
      category: "",
      sortBy: "",
      minPrice: "",
      maxPrice: "",
      rating: "",
      brand: "",
    }
    setFilters(newFilters)
    setPriceRange([0, 2000])
    router.push("/products")
    if (isMobile && onClose) {
      onClose()
    }
  }

  const removeFilter = (filterText: string) => {
    if (filterText.startsWith("Category:")) {
      handleFilterChange("category", "")
    } else if (filterText.startsWith("Sort:")) {
      handleFilterChange("sortBy", "")
    } else if (filterText.startsWith("Price:")) {
      handleFilterChange("minPrice", "")
      handleFilterChange("maxPrice", "")
      setPriceRange([0, 2000])
    } else if (filterText.startsWith("Rating:")) {
      handleFilterChange("rating", "")
    } else if (filterText.startsWith("Brand:")) {
      handleFilterChange("brand", "")
    }
  }

  return (
    <div className="space-y-6">
      
      {activeFilters.length > 0 && (
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Active Filters ({activeFilters.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="flex flex-wrap gap-2 mb-3">
              {activeFilters.map((filter, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-white/80 hover:bg-white cursor-pointer transition-colors group"
                  onClick={() => removeFilter(filter)}
                >
                  {filter}
                  <X className="w-3 h-3 ml-1 group-hover:text-red-500" />
                </Badge>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={clearFilters}
              className="w-full hover:bg-red-50 hover:text-red-600 hover:border-red-200"
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      )}

     
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100">
          <CardTitle className="text-sm flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Sort By
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Default" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

   
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
          <CardTitle className="text-sm">categories2</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <button
              onClick={() => handleFilterChange("category", "")}
              className={`w-full text-left p-2 rounded-lg transition-colors ${
                !filters.category ? "bg-blue-100 text-blue-700" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">All categories2</span>
                <span className="text-xs text-gray-500">All</span>
              </div>
            </button>
            {categories2.map((category) => (
              <button
                key={category.value}
                onClick={() => handleFilterChange("category", category.value)}
                className={`w-full text-left p-2 rounded-lg transition-colors ${
                  filters.category === category.value ? "bg-blue-100 text-blue-700" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm">{category.label}</span>
                  <span className="text-xs text-gray-500">({category.count})</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

    
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
          <CardTitle className="text-sm">Price Range</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-4">
          <div className="px-2">
            <Slider
              value={priceRange}
              onValueChange={handlePriceChange}
              max={2000}
              min={0}
              step={10}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>${priceRange[0] || 0}</span>
            <span>${priceRange[1] || 2000}</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label className="text-xs text-gray-500">Min Price</Label>
              <Input
                type="number"
                value={priceRange[0] || 0}
                onChange={(e) => handlePriceChange([Number.parseInt(e.target.value) || 0, priceRange[1] || 2000])}
                className="h-8 text-sm"
              />
            </div>
            <div>
              <Label className="text-xs text-gray-500">Max Price</Label>
              <Input
                type="number"
                value={priceRange[1] || 2000}
                onChange={(e) => handlePriceChange([priceRange[0] || 0, Number.parseInt(e.target.value) || 2000])}
                className="h-8 text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

   
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50">
          <CardTitle className="text-sm flex items-center gap-2">
            <Star className="w-4 h-4" />
            Customer Rating
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-2">
            <button
              onClick={() => handleFilterChange("rating", "")}
              className={`w-full text-left p-2 rounded-lg transition-colors ${
                !filters.rating ? "bg-yellow-100 text-yellow-700" : "hover:bg-gray-50"
              }`}
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">All Ratings</span>
                <span className="text-xs text-gray-500">All</span>
              </div>
            </button>
            {ratingOptions?.map((rating) => (
              <button
                key={rating.value}
                onClick={() => handleFilterChange("rating", rating.value)}
                className={`w-full text-left p-2 rounded-lg transition-colors ${
                  filters.rating === rating.value ? "bg-yellow-100 text-yellow-700" : "hover:bg-gray-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <div className="flex">
                      {Array.from({ length: Number.parseInt(rating.value) }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      {Array.from({ length: 5 - Number.parseInt(rating.value) }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 text-gray-300" />
                      ))}
                    </div>
                    <span className="text-sm ml-1">{rating.label}</span>
                  </div>
                  <span className="text-xs text-gray-500">({rating.count})</span>
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

 
      <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
          <CardTitle className="text-sm">Brand</CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <Input
            placeholder="Search brands..."
            value={filters.brand}
            onChange={(e) => handleFilterChange("brand", e.target.value)}
            className="w-full"
          />
        </CardContent>
      </Card>
    </div>
  )
}
