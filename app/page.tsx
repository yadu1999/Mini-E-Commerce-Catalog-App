import type { Metadata } from "next"
import { Suspense } from "react"
import HeroSection from "@/components/hero-section"
import TrendingProducts from "@/components/trending-products"
import { ProductCardSkeleton } from "@/components/product-card"
import LoadingSpinner from "@/components/loading-spinner"
import CategoryLinks from "@/components/category-links"

export const metadata: Metadata = {
  title: "Home - Premium Online Shopping Experience",
  description:
    "Welcome to Mini E-Commerce Catalog App Premium! Discover trending products, browse categories, and enjoy the best online shopping experience with free shipping on orders over $50.",
  keywords: ["home", "trending products", "categories", "online shopping", "ecommerce"],
  openGraph: {
    title: "Mini E-Commerce Catalog App Premium - Home",
    description: "Discover trending products and browse categories at Mini E-Commerce Catalog App Premium",
    url: "/",
    images: [
      {
        url: "/og-home.jpg",
        width: 1200,
        height: 630,
        alt: "Mini E-Commerce Catalog App Premium Homepage",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      <section className="py-16 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore our carefully curated categories to find exactly what you're looking for
          </p>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <CategoryLinks />
        </Suspense>
      </section>

      <section className="py-16 px-4 max-w-7xl mx-auto bg-gradient-to-br from-blue-50 to-purple-50 rounded-3xl mx-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Trending Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Discover the most popular products loved by our customers</p>
        </div>
        <Suspense
          fallback={
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <ProductCardSkeleton />
                </div>
              ))}
            </div>
          }
        >
          <TrendingProducts />
        </Suspense>
      </section>
    </div>
  )
}
