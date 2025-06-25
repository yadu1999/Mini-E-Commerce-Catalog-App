import ProductCard from "@/components/product-card"
import Pagination from "@/components/pagination"
import { Filter } from "lucide-react"

interface Product {
  id: number
  title: string
  price: number
  discountPercentage: number
  rating: number
  thumbnail: string
  category: string
  brand: string
  stock: number
}

interface ProductsResponse {
  products: Product[]
  total: number
  skip: number
  limit: number
}

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

async function getProducts(searchParams: SearchParams): Promise<ProductsResponse> {
  const page = Number.parseInt(searchParams?.page || "1")
  const limit = 12
  const skip = (page - 1) * limit

  const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dummyjson.com"
  let url = `${baseUrl}/products?limit=${limit}&skip=${skip}`

 
  if (searchParams?.search) {
    url = `${baseUrl}/products/search?q=${encodeURIComponent(searchParams.search)}&limit=${limit}&skip=${skip}`
  }

 
  if (searchParams?.category && !searchParams?.search) {
    url = `${baseUrl}/products/category/${searchParams.category}?limit=${limit}&skip=${skip}`
  }

  try {
    const res = await fetch(url, {
      next: { revalidate: 300 }, 
    })

    if (!res.ok) {
      console.warn(`API returned ${res.status} ${res.statusText}`)
      return {
        products: [],
        total: 0,
        skip: 0,
        limit: 12,
      }
    }

    const data = await res.json()
    let products = data?.products || []


    if (searchParams?.minPrice || searchParams?.maxPrice) {
      const minPrice = Number.parseFloat(searchParams?.minPrice || "0")
      const maxPrice = Number.parseFloat(searchParams?.maxPrice || "999999")
      products = products.filter((p: Product) => {
        const discountedPrice = p?.price * (1 - (p?.discountPercentage || 0) / 100)
        return discountedPrice >= minPrice && discountedPrice <= maxPrice
      })
    }

 
    if (searchParams?.rating) {
      const minRating = Number.parseFloat(searchParams.rating)
      products = products.filter((p: Product) => (p?.rating || 0) >= minRating)
    }

   
    if (searchParams?.brand) {
      const brandQuery = searchParams.brand.toLowerCase()
      products = products.filter(
        (p: Product) => p?.brand?.toLowerCase()?.includes(brandQuery) || p?.title?.toLowerCase()?.includes(brandQuery),
      )
    }

   
    if (searchParams?.sortBy) {
      switch (searchParams.sortBy) {
        case "price-asc":
          products.sort((a: Product, b: Product) => {
            const aPrice = (a?.price || 0) * (1 - (a?.discountPercentage || 0) / 100)
            const bPrice = (b?.price || 0) * (1 - (b?.discountPercentage || 0) / 100)
            return aPrice - bPrice
          })
          break
        case "price-desc":
          products.sort((a: Product, b: Product) => {
            const aPrice = (a?.price || 0) * (1 - (a?.discountPercentage || 0) / 100)
            const bPrice = (b?.price || 0) * (1 - (b?.discountPercentage || 0) / 100)
            return bPrice - aPrice
          })
          break
        case "name-asc":
          products.sort((a: Product, b: Product) => (a?.title || "").localeCompare(b?.title || ""))
          break
        case "name-desc":
          products.sort((a: Product, b: Product) => (b?.title || "").localeCompare(a?.title || ""))
          break
        case "rating-desc":
          products.sort((a: Product, b: Product) => (b?.rating || 0) - (a?.rating || 0))
          break
        case "newest":
          products.sort((a: Product, b: Product) => (b?.id || 0) - (a?.id || 0))
          break
      }
    }

    return {
      products,
      total: data?.total || products.length,
      skip: data?.skip || 0,
      limit: data?.limit || limit,
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    return {
      products: [],
      total: 0,
      skip: 0,
      limit: 12,
    }
  }
}

interface ProductsGridProps {
  searchParams: SearchParams
}

export default async function ProductsGrid({ searchParams }: ProductsGridProps) {
  const data = await getProducts(searchParams)
  const currentPage = Number.parseInt(searchParams?.page || "1")
  const totalPages = Math.ceil(data.total / 12)

  if (data.products.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Filter className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600 mb-6">
            Try adjusting your filters or search terms to find what you're looking for.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <p className="text-sm text-gray-600">
          Showing {data.skip + 1}-{Math.min(data.skip + data.products.length, data.total)} of {data.total} products
        </p>

      
        <div className="flex flex-wrap gap-2">
          {searchParams?.search && (
            <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded">Search: "{searchParams.search}"</span>
          )}
          {searchParams?.category && (
            <span className="text-sm bg-purple-100 text-purple-700 px-2 py-1 rounded">
              Category: {searchParams.category}
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {data.products.map((product, index) => (
          <div
            key={product?.id || index}
            className="animate-in fade-in slide-in-from-bottom-4 duration-500"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} searchParams={searchParams} />}
    </div>
  )
}
