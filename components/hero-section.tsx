"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Search, Sparkles, ShoppingBag, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [debouncedQuery, setDebouncedQuery] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (debouncedQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(debouncedQuery)}`)
    }
  }

  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      
      <div className="absolute inset-0 overflow-hidden">
        <Sparkles className="absolute top-20 left-1/4 w-6 h-6 text-white/30 animate-bounce delay-300" />
        <ShoppingBag className="absolute top-40 right-1/4 w-8 h-8 text-white/20 animate-bounce delay-700" />
        <Zap className="absolute bottom-32 left-1/3 w-5 h-5 text-white/25 animate-bounce delay-1000" />
      </div>

      <div
        className={`relative z-10 max-w-4xl mx-auto text-center px-4 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="mb-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Discover
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent animate-pulse">
              Amazing Products
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
            Find everything you need in our curated collection of quality products
            <br />
            <span className="text-lg text-white/70">✨ Free shipping on orders over $50</span>
          </p>
        </div>

        <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-6 h-6 group-focus-within:text-blue-500 transition-colors" />
            <Input
              type="text"
              placeholder="Search for products, brands, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-32 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-2xl shadow-2xl focus:shadow-3xl transition-all duration-300 focus:scale-105"
            />
            <Button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 rounded-xl px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Search
            </Button>
          </div>
        </form>

        <div className="flex flex-wrap justify-center gap-4 text-white/80">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Premium Quality</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <Zap className="w-4 h-4" />
            <span className="text-sm font-medium">Fast Delivery</span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
            <ShoppingBag className="w-4 h-4" />
            <span className="text-sm font-medium">Best Prices</span>
          </div>
        </div>
      </div>

     
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
