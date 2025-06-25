import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"

 
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/products`,
      lastModified: new Date(),
      changeFrequency: "hourly" as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/checkout`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.5,
    },
  ]


  const categories = [
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
  ]

  const categoryPages = categories.map((category) => ({
    url: `${baseUrl}/products?category=${category}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }))

  return [...staticPages, ...categoryPages]
}
