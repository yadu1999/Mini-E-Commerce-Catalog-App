import type { Metadata } from "next"
import { Suspense } from "react"
import CategoriesGrid from "@/components/categories-grid"
import { Grid3X3, Tag } from "lucide-react"

export const metadata: Metadata = {
  title: "Shop by Categories - Find Your Perfect Products",
  description:
    "Browse our extensive collection of product categories. From electronics to fashion, home decor to beauty products - find exactly what you're looking for.",
  keywords: [
    "categories",
    "product categories",
    "shop by category",
    "electronics",
    "fashion",
    "home decor",
    "beauty",
    "automotive",
    "sports",
  ],
  openGraph: {
    title: "Shop by Categories | Mini E-Commerce Catalog App Premium",
    description: "Browse our extensive collection of product categories and find exactly what you're looking for.",
    url: "/categories",
    images: [
      {
        url: "/og-categories.jpg",
        width: 1200,
        height: 630,
        alt: "Shop by Categories - Mini E-Commerce Catalog App Premium",
      },
    ],
  },
  alternates: {
    canonical: "/categories",
  },
}

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
       
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
              <Tag className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              Shop by Categories
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our carefully curated categories to find exactly what you're looking for. From the latest tech
            gadgets to stylish fashion pieces, we have everything you need.
          </p>
          <div className="flex items-center justify-center gap-2 mt-6 text-sm text-gray-500">
            <Grid3X3 className="w-4 h-4" />
            <span>20+ Categories • 1000+ Products • Free Shipping</span>
          </div>
        </div>

        
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 20 }).map((_, i) => (
                <div
                  key={i}
                  className="aspect-[4/3] bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse rounded-2xl"
                />
              ))}
            </div>
          }
        >
          <CategoriesGrid />
        </Suspense>
      </div>
    </div>
  )
}
