import type { Metadata } from "next"
import { Suspense } from "react"
import ProductsGrid from "@/components/products-grid"
import FilterPanel from "@/components/filter-panel"
import MobileFilterSheet from "@/components/mobile-filter-sheet"
import { ProductCardSkeleton } from "@/components/product-card"
import { SlidersHorizontal, Grid3X3 } from "lucide-react"

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

interface ProductsPageProps {
  searchParams: Promise<SearchParams>
}

export async function generateMetadata({ searchParams }: ProductsPageProps): Promise<Metadata> {
  const params = await searchParams
  const { category, search, page } = params

  let title = "All Products"
  let description = "Browse our complete collection of premium products with advanced filtering options."

  if (search) {
    title = `Search Results for "${search}"`
    description = `Find products matching "${search}" in our extensive catalog. Filter by price, category, rating and more.`
  } else if (category) {
    const categoryName = category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase()) || ""
    title = `${categoryName} Products`
    description = `Shop the best ${categoryName.toLowerCase()} products with competitive prices and fast shipping.`
  }

  if (page && Number.parseInt(page) > 1) {
    title += ` - Page ${page}`
  }

  return {
    title,
    description,
    keywords: [
      "products",
      "online shopping",
      "ecommerce",
      category || "all categories",
      search || "search",
      "filter",
      "sort",
      "premium quality",
    ],
    openGraph: {
      title: `${title} | Mini E-Commerce Catalog App Premium`,
      description,
      url: `/products${search ? `?search=${search}` : category ? `?category=${category}` : ""}`,
      images: [
        {
          url: "/og-products.jpg",
          width: 1200,
          height: 630,
          alt: `${title} - Mini E-Commerce Catalog App Premium`,
        },
      ],
    },
    alternates: {
      canonical: `/products${search ? `?search=${search}` : category ? `?category=${category}` : ""}`,
    },
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
    
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {params?.search
                  ? `Search: "${params.search}"`
                  : params?.category
                    ? params.category?.replace("-", " ")?.replace(/\b\w/g, (l) => l.toUpperCase())
                    : "All Products"}
              </h1>
              <p className="text-gray-600 mt-2">
                {params?.search
                  ? `Find products matching "${params.search}"`
                  : "Discover our amazing collection of products"}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <MobileFilterSheet />
              <div className="hidden lg:flex items-center gap-2 text-sm text-gray-600">
                <Grid3X3 className="w-4 h-4" />
                <span>Grid View</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
         
          <aside className="hidden lg:block lg:w-80 flex-shrink-0">
            <div className="sticky top-24 space-y-6">
              <div className="flex items-center gap-2 mb-4">
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>
              <FilterPanel />
            </div>
          </aside>

         
          <main className="flex-1 min-w-0">
            <Suspense
              fallback={
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 animate-pulse rounded w-48" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div
                        key={i}
                        className="animate-in fade-in slide-in-from-bottom-4 duration-500"
                        style={{ animationDelay: `${i * 50}ms` }}
                      >
                        <ProductCardSkeleton />
                      </div>
                    ))}
                  </div>
                </div>
              }
            >
              <ProductsGrid searchParams={params} />
            </Suspense>
          </main>
        </div>
      </div>
    </div>
  )
}
