"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, Heart, Eye, Zap } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { toast } from "@/hooks/use-toast"

interface Product {
  id: number
  title: string
  price: number
  discountPercentage: number
  rating: number
  thumbnail: string
  category: string
  stock?: number
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, getDiscountedPrice } = useCart()
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const discountedPrice = getDiscountedPrice(product?.price || 0, product?.discountPercentage || 0)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    addToCart({
      id: product?.id || 0,
      title: product?.title || "",
      price: product?.price || 0,
      discountPercentage: product?.discountPercentage || 0,
      thumbnail: product?.thumbnail || "",
      stock: product?.stock || 10,
    })

    toast({
      title: "Added to cart!",
      description: `${product?.title || "Item"} has been added to your cart.`,
    })
  }

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toast({
      title: "Quick View",
      description: "Quick view feature coming soon!",
    })
  }

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsLiked(!isLiked)
    toast({
      title: isLiked ? "Removed from wishlist" : "Added to wishlist",
      description: `${product?.title || "Item"} ${isLiked ? "removed from" : "added to"} your wishlist.`,
    })
  }

  return (
    <Link href={`/products/${product?.id || 0}`}>
      <Card
        className="group relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <CardContent className="p-0">
          
          <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
            <Image
              src={product?.thumbnail || "/placeholder.svg?height=400&width=400"}
              alt={product?.title || "Product"}
              fill
              className={`object-cover transition-all duration-500 ${
                isHovered ? "scale-110" : "scale-100"
              } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onLoad={() => setImageLoaded(true)}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

          
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
            )}

        
            {(product?.discountPercentage || 0) > 0 && (
              <Badge className="absolute top-3 left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg animate-pulse">
                <Zap className="w-3 h-3 mr-1" />
                {Math.round(product?.discountPercentage || 0)}% OFF
              </Badge>
            )}

           
            <div
              className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
                isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"
              }`}
            >
              <Button
                size="sm"
                variant="secondary"
                className="w-10 h-10 rounded-full p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                onClick={handleLike}
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${isLiked ? "fill-red-500 text-red-500" : "text-gray-600"}`}
                />
              </Button>
              <Button
                size="sm"
                variant="secondary"
                className="w-10 h-10 rounded-full p-0 bg-white/90 backdrop-blur-sm hover:bg-white shadow-lg"
                onClick={handleQuickView}
              >
                <Eye className="w-4 h-4 text-gray-600" />
              </Button>
            </div>

      
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            />

           
            <div
              className={`absolute bottom-4 left-4 right-4 transition-all duration-300 ${
                isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
            >
              <Button
                onClick={handleAddToCart}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg"
                size="sm"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
            </div>
          </div>

          
          <div className="p-4 space-y-3">
            <Badge
              variant="secondary"
              className="text-xs bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0"
            >
              {product?.category || "Product"}
            </Badge>

            <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200 leading-tight">
              {product?.title || "Product"}
            </h3>

           
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 transition-colors ${
                      i < Math.floor(product?.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600 font-medium">({product?.rating || 0})</span>
            </div>

            
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ${discountedPrice.toFixed(2)}
              </span>
              {(product?.discountPercentage || 0) > 0 && (
                <span className="text-sm text-gray-500 line-through">${(product?.price || 0).toFixed(2)}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="aspect-square bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
        <div className="p-4 space-y-3">
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-16" />
          <div className="h-4 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-3/4" />
          <div className="h-3 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-1/2" />
          <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded w-1/3" />
        </div>
      </CardContent>
    </Card>
  )
}
