"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import {
  Star,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  ArrowLeft,
  Plus,
  Minus,
  Zap,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useCart } from "@/lib/cart-context"
import { toast } from "@/hooks/use-toast"
import AnimatedCounter from "@/components/animated-counter"
import LoadingSpinner from "@/components/loading-spinner"

interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  category: string
  thumbnail: string
  images: string[]
}

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [isLiked, setIsLiked] = useState(false)
  const [isZoomed, setIsZoomed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageLoadError, setImageLoadError] = useState<boolean[]>([])

  const { addToCart, getDiscountedPrice } = useCart()
  const router = useRouter()

  useEffect(() => {
    
    setImageLoadError(new Array(product?.images?.length || 1).fill(false))
  }, [product?.images?.length])

  const discountedPrice = getDiscountedPrice(product?.price || 0, product?.discountPercentage || 0)

  const handleAddToCart = async () => {
    setLoading(true)
    setError(null)

    try {
     
      if (Math.random() < 0.05) {
        throw new Error("Failed to add item to cart. Please try again.")
      }

      await new Promise((resolve) => setTimeout(resolve, 800))

      for (let i = 0; i < quantity; i++) {
        addToCart({
          id: product?.id || 0,
          title: product?.title || "",
          price: product?.price || 0,
          discountPercentage: product?.discountPercentage || 0,
          thumbnail: product?.thumbnail || "",
          stock: product?.stock || 0,
        })
      }

      toast({
        title: "Added to cart!",
        description: `${quantity} ${product?.title || "item"}${quantity > 1 ? "s" : ""} added to your cart.`,
      })
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unexpected error occurred"
      setError(errorMessage)
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleBuyNow = async () => {
    await handleAddToCart()
    if (!error) {
      router.push("/checkout")
    }
  }

  const handleShare = async () => {
    try {
      if (navigator?.share) {
        await navigator.share({
          title: product?.title || "",
          text: product?.description || "",
          url: window.location.href,
        })
      } else {
        await navigator?.clipboard?.writeText(window.location.href)
        toast({
          title: "Link copied!",
          description: "Product link has been copied to clipboard.",
        })
      }
    } catch (error) {
      toast({
        title: "Share failed",
        description: "Unable to share this product. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleImageError = (index: number) => {
    setImageLoadError((prev) => {
      const newState = [...prev]
      newState[index] = true
      return newState
    })
  }

  if (loading && !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="large" />
      </div>
    )
  }

  const images = product?.images || [product?.thumbnail].filter(Boolean)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-8">
      <div className="max-w-7xl mx-auto px-4">
     
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="mb-6 hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Button>

        
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
       
          <div className="space-y-4">
            <div
              className={`aspect-square relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 shadow-2xl transition-all duration-300 ${
                isZoomed ? "scale-105" : "scale-100"
              }`}
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
            >
              {imageLoadError[selectedImage] ? (
                <div className="w-full h-full flex items-center justify-center bg-gray-200">
                  <div className="text-center">
                    <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">Image not available</p>
                  </div>
                </div>
              ) : (
                <Image
                  src={images[selectedImage] || "/placeholder.svg?height=600&width=600"}
                  alt={product?.title || "Product"}
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-110"
                  priority
                  onError={() => handleImageError(selectedImage)}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              )}

              
              {(product?.discountPercentage || 0) > 0 && (
                <Badge className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 shadow-lg animate-pulse">
                  <Zap className="w-3 h-3 mr-1" />
                  {Math.round(product?.discountPercentage || 0)}% OFF
                </Badge>
              )}
            </div>

           
            <div className="grid grid-cols-4 gap-4">
              {images?.slice(0, 4)?.map((image, index) => (
                <div
                  key={index}
                  className={`aspect-square relative overflow-hidden rounded-xl bg-gray-100 cursor-pointer transition-all duration-300 ${
                    selectedImage === index
                      ? "ring-4 ring-blue-500 shadow-lg scale-105"
                      : "hover:shadow-md hover:scale-105"
                  }`}
                  onClick={() => setSelectedImage(index)}
                >
                  {imageLoadError[index] ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <AlertCircle className="w-6 h-6 text-gray-400" />
                    </div>
                  ) : (
                    <Image
                      src={image || "/placeholder.svg?height=100&width=100"}
                      alt={`${product?.title || "Product"} ${index + 1}`}
                      fill
                      className="object-cover"
                      onError={() => handleImageError(index)}
                      sizes="100px"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          
          <div className="space-y-6">
            <div>
              <Badge
                variant="secondary"
                className="mb-3 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border-0"
              >
                {product?.category || "Product"}
              </Badge>
              <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {product?.title || "Product"}
              </h1>
              <p className="text-xl text-gray-600 mb-4">{product?.brand || "Brand"}</p>

              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 transition-colors ${
                        i < Math.floor(product?.rating || 0) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-gray-700">({product?.rating || 0})</span>
                <span className="text-sm text-gray-500">• 1,234 reviews</span>
              </div>
            </div>

          
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    $<AnimatedCounter value={discountedPrice} />
                  </span>
                  {(product?.discountPercentage || 0) > 0 && (
                    <>
                      <span className="text-2xl text-gray-500 line-through">${product?.price || 0}</span>
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
                        Save ${((product?.price || 0) - discountedPrice).toFixed(2)}
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-sm text-gray-600">
                  {(product?.stock || 0) > 0 ? (
                    <span className="text-green-600 font-medium">✅ {product?.stock || 0} in stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">❌ Out of stock</span>
                  )}
                </p>
              </CardContent>
            </Card>

            
            <div className="flex items-center gap-4">
              <span className="font-medium text-gray-700">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-10 h-10 rounded-full"
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setQuantity(Math.min(product?.stock || 0, quantity + 1))}
                  disabled={quantity >= (product?.stock || 0)}
                  className="w-10 h-10 rounded-full"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

          
            <div className="space-y-4">
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                  disabled={(product?.stock || 0) === 0 || loading}
                  onClick={handleAddToCart}
                >
                  {loading ? (
                    <LoadingSpinner size="small" className="mr-2" />
                  ) : (
                    <ShoppingCart className="w-5 h-5 mr-2" />
                  )}
                  {loading ? "Adding..." : "Add to Cart"}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setIsLiked(!isLiked)}
                  className={`hover:scale-105 transition-all duration-300 ${
                    isLiked ? "bg-red-50 border-red-200 text-red-600" : ""
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleShare}
                  className="hover:scale-105 transition-all duration-300"
                >
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>

              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                disabled={(product?.stock || 0) === 0 || loading}
                onClick={handleBuyNow}
              >
                <Zap className="w-5 h-5 mr-2" />
                Buy Now
              </Button>
            </div>

           
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl">
                <Truck className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Free Shipping</p>
                  <p className="text-sm text-green-600">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                <Shield className="w-6 h-6 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-800">Secure Payment</p>
                  <p className="text-sm text-blue-600">100% protected</p>
                </div>
              </div>
            </div>

         
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-lg mb-3">Product Description</h3>
                <p className="text-gray-600 leading-relaxed">{product?.description || "No description available."}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
