import type { Metadata } from "next"
import { notFound } from "next/navigation"
import ProductDetailClient from "@/components/product-detail-client"

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

async function getProduct(id: string): Promise<Product | null> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || "https://dummyjson.com"
    const res = await fetch(`${baseUrl}/products/${id}`, {
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      return null
    }

    return res.json()
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    }
  }

  const discountedPrice = (product?.price || 0) * (1 - (product?.discountPercentage || 0) / 100)
  const savings = (product?.price || 0) - discountedPrice

  return {
    title: `${product?.title || "Product"} - ${product?.brand || "Mini E-Commerce Catalog App"}`,
    description: `${product?.description || ""} Buy ${product?.title || "this product"} by ${product?.brand || "Mini E-Commerce Catalog App"} for $${discountedPrice.toFixed(2)}${savings > 0 ? ` (Save $${savings.toFixed(2)})` : ""}. ${(product?.stock || 0) > 0 ? "In stock" : "Out of stock"}. Free shipping on orders over $50.`,
    keywords: [
      product?.title || "",
      product?.brand || "",
      product?.category || "",
      "buy online",
      "free shipping",
      "premium quality",
      `${product?.rating || 0} stars`,
      discountedPrice < (product?.price || 0) ? "on sale" : "best price",
    ].filter(Boolean),
    openGraph: {
      title: `${product?.title || "Product"} - ${product?.brand || "Mini E-Commerce Catalog App"}`,
      description: product?.description || "",
      url: `/products/${product?.id || id}`,
      type: "website", 
      images: [
        {
          url: product?.thumbnail || "/placeholder.svg?height=800&width=800",
          width: 800,
          height: 800,
          alt: product?.title || "Product",
        },
        ...(product?.images?.slice(0, 3)?.map((img) => ({
          url: img,
          width: 800,
          height: 800,
          alt: product?.title || "Product",
        })) || []),
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product?.title || "Product"} - ${product?.brand || "Mini E-Commerce Catalog App"}`,
      description: product?.description || "",
      images: [product?.thumbnail || "/placeholder.svg?height=800&width=800"],
    },
    alternates: {
      canonical: `/products/${product?.id || id}`,
    },
    other: {
      "product:price:amount": discountedPrice.toString(),
      "product:price:currency": "USD",
      "product:availability": (product?.stock || 0) > 0 ? "in stock" : "out of stock",
      "product:condition": "new",
      "product:brand": product?.brand || "",
      "product:category": product?.category || "",
      "product:rating": (product?.rating || 0).toString(),
    },
  }
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }


  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product?.title || "",
    description: product?.description || "",
    brand: {
      "@type": "Brand",
      name: product?.brand || "",
    },
    category: product?.category || "",
    image: [product?.thumbnail, ...(product?.images || [])].filter(Boolean),
    sku: (product?.id || 0).toString(),
    offers: {
      "@type": "Offer",
      price: ((product?.price || 0) * (1 - (product?.discountPercentage || 0) / 100)).toFixed(2),
      priceCurrency: "USD",
      availability: (product?.stock || 0) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "Mini E-Commerce Catalog App Premium",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product?.rating || 0,
      ratingCount: Math.floor(Math.random() * 1000) + 100,
      bestRating: 5,
      worstRating: 1,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ProductDetailClient product={product} />
    </>
  )
}
