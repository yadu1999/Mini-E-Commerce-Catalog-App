import ProductCard from "@/components/product-card"

interface Product {
  id: number
  title: string
  price: number
  discountPercentage: number
  rating: number
  thumbnail: string
  category: string
}

async function getTrendingProducts(): Promise<Product[]> {
  try {
    const res = await fetch("https://dummyjson.com/products?limit=6&skip=0", {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      throw new Error("Failed to fetch products")
    }

    const data = await res.json()
    return data.products
  } catch (error) {
    console.error("Error fetching trending products:", error)
    return []
  }
}

export default async function TrendingProducts() {
  const products = await getTrendingProducts()

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No trending products available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
