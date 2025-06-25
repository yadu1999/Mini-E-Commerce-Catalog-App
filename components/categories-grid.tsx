import type React from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Laptop,
  Sparkles,
  Home,
  Shirt,
  Watch,
  Car,
  ShoppingBag,
  Glasses,
  Lightbulb,
  Bike,
  Gem,
  UtensilsCrossed,
  Sofa,
  Crown,
  TrendingUp,
  Star,
} from "lucide-react"
import { categories } from "@/lib/utils"

export interface Category {
  id: string
  name: string
  label: string
  description: string
  icon: React.ComponentType<any>
  count: number
  color: string
  gradient: string
  featured?: boolean
  trending?: boolean
}

// const categories: Category[] = [
//   {
//     id: "smartphones",
//     name: "smartphones",
//     label: "Smartphones",
//     description: "Latest mobile phones and accessories",
//     icon: Smartphone,
//     count: 194,
//     color: "text-blue-600",
//     gradient: "from-blue-500 to-cyan-500",
//     featured: true,
//     trending: true,
//   },
//   {
//     id: "laptops",
//     name: "laptops",
//     label: "Laptops",
//     description: "High-performance computers and notebooks",
//     icon: Laptop,
//     count: 114,
//     color: "text-purple-600",
//     gradient: "from-purple-500 to-pink-500",
//     featured: true,
//   },
//   {
//     id: "fragrances",
//     name: "fragrances",
//     label: "Fragrances",
//     description: "Premium perfumes and colognes",
//     icon: Sparkles,
//     count: 25,
//     color: "text-pink-600",
//     gradient: "from-pink-500 to-rose-500",
//   },
//   {
//     id: "skincare",
//     name: "skincare",
//     label: "Skincare",
//     description: "Beauty and skincare essentials",
//     icon: Sparkles,
//     count: 30,
//     color: "text-rose-600",
//     gradient: "from-rose-500 to-pink-500",
//     trending: true,
//   },
//   {
//     id: "groceries",
//     name: "groceries",
//     label: "Groceries",
//     description: "Fresh food and daily essentials",
//     icon: UtensilsCrossed,
//     count: 25,
//     color: "text-green-600",
//     gradient: "from-green-500 to-emerald-500",
//   },
//   {
//     id: "home-decoration",
//     name: "home-decoration",
//     label: "Home Decoration",
//     description: "Beautiful decor for your living space",
//     icon: Home,
//     count: 30,
//     color: "text-orange-600",
//     gradient: "from-orange-500 to-red-500",
//     featured: true,
//   },
//   {
//     id: "furniture",
//     name: "furniture",
//     label: "Furniture",
//     description: "Stylish furniture for every room",
//     icon: Sofa,
//     count: 25,
//     color: "text-amber-600",
//     gradient: "from-amber-500 to-orange-500",
//   },
//   {
//     id: "tops",
//     name: "tops",
//     label: "Tops & T-Shirts",
//     description: "Trendy tops and casual wear",
//     icon: Shirt,
//     count: 40,
//     color: "text-indigo-600",
//     gradient: "from-indigo-500 to-blue-500",
//   },
//   {
//     id: "womens-dresses",
//     name: "womens-dresses",
//     label: "Women's Dresses",
//     description: "Elegant dresses for every occasion",
//     icon: Crown,
//     count: 20,
//     color: "text-purple-600",
//     gradient: "from-purple-500 to-violet-500",
//     trending: true,
//   },
//   {
//     id: "womens-shoes",
//     name: "womens-shoes",
//     label: "Women's Shoes",
//     description: "Stylish footwear collection",
//     icon: ShoppingBag,
//     count: 40,
//     color: "text-pink-600",
//     gradient: "from-pink-500 to-purple-500",
//   },
//   {
//     id: "mens-shirts",
//     name: "mens-shirts",
//     label: "Men's Shirts",
//     description: "Professional and casual shirts",
//     icon: Shirt,
//     count: 20,
//     color: "text-slate-600",
//     gradient: "from-slate-500 to-gray-500",
//   },
//   {
//     id: "mens-shoes",
//     name: "mens-shoes",
//     label: "Men's Shoes",
//     description: "Quality footwear for men",
//     icon: ShoppingBag,
//     count: 40,
//     color: "text-gray-600",
//     gradient: "from-gray-500 to-slate-500",
//   },
//   {
//     id: "mens-watches",
//     name: "mens-watches",
//     label: "Men's Watches",
//     description: "Luxury and sport timepieces",
//     icon: Watch,
//     count: 20,
//     color: "text-blue-600",
//     gradient: "from-blue-500 to-indigo-500",
//   },
//   {
//     id: "womens-watches",
//     name: "womens-watches",
//     label: "Women's Watches",
//     description: "Elegant timepieces for women",
//     icon: Watch,
//     count: 20,
//     color: "text-rose-600",
//     gradient: "from-rose-500 to-pink-500",
//   },
//   {
//     id: "womens-bags",
//     name: "womens-bags",
//     label: "Women's Bags",
//     description: "Handbags, purses, and accessories",
//     icon: ShoppingBag,
//     count: 30,
//     color: "text-violet-600",
//     gradient: "from-violet-500 to-purple-500",
//     featured: true,
//   },
//   {
//     id: "womens-jewellery",
//     name: "womens-jewellery",
//     label: "Women's Jewelry",
//     description: "Beautiful jewelry and accessories",
//     icon: Gem,
//     count: 30,
//     color: "text-yellow-600",
//     gradient: "from-yellow-500 to-amber-500",
//   },
//   {
//     id: "sunglasses",
//     name: "sunglasses",
//     label: "Sunglasses",
//     description: "Stylish eyewear and protection",
//     icon: Glasses,
//     count: 20,
//     color: "text-teal-600",
//     gradient: "from-teal-500 to-cyan-500",
//   },
//   {
//     id: "automotive",
//     name: "automotive",
//     label: "Automotive",
//     description: "Car accessories and parts",
//     icon: Car,
//     count: 25,
//     color: "text-red-600",
//     gradient: "from-red-500 to-orange-500",
//   },
//   {
//     id: "motorcycle",
//     name: "motorcycle",
//     label: "Motorcycle",
//     description: "Bike accessories and gear",
//     icon: Bike,
//     count: 25,
//     color: "text-orange-600",
//     gradient: "from-orange-500 to-yellow-500",
//   },
//   {
//     id: "lighting",
//     name: "lighting",
//     label: "Lighting",
//     description: "Modern lighting solutions",
//     icon: Lightbulb,
//     count: 20,
//     color: "text-yellow-600",
//     gradient: "from-yellow-500 to-orange-500",
//   },
// ]

export default function CategoriesGrid() {
  const featuredCategories = categories.filter((cat) => cat.featured)
  const regularCategories = categories.filter((cat) => !cat.featured)

  return (
    <div className="space-y-12">
    
      {featuredCategories.length > 0 && (
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
              <Star className="w-4 h-4 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Featured Categories</h2>
            <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0">Popular</Badge>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredCategories.map((category, index) => (
              <CategoryCard key={category.id} category={category} index={index} featured />
            ))}
          </div>
        </section>
      )}

     
      <section>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-4 h-4 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">All Categories</h2>
          <Badge variant="secondary" className="bg-gray-100 text-gray-700">
            {categories.length} Categories
          </Badge>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {regularCategories.map((category, index) => (
            <CategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </section>
    </div>
  )
}

interface CategoryCardProps {
  category: Category
  index: number
  featured?: boolean
}

function CategoryCard({ category, index, featured = false }: CategoryCardProps) {
  const IconComponent = category.icon

  return (
    <Link href={`/products?category=${category.name}`}>
      <Card
        className={`group relative overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 bg-gradient-to-br from-white to-gray-50 border-0 shadow-lg ${
          featured ? "ring-2 ring-yellow-200 shadow-yellow-100" : ""
        }`}
        style={{
          animationDelay: `${index * 100}ms`,
        }}
      >
        <CardContent className="p-0">
         
          <div className="absolute inset-0 opacity-5">
            <div className={`w-full h-full bg-gradient-to-br ${category.gradient}`} />
          </div>

       
          <div className="relative p-6 space-y-4">
          
            <div className="flex items-start justify-between">
              <div
                className={`w-14 h-14 bg-gradient-to-br ${category.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
              >
                <IconComponent className="w-7 h-7 text-white" />
              </div>
              <div className="flex flex-col gap-2">
                {featured && (
                  <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-xs animate-pulse">
                    <Star className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
                {category.trending && (
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    Trending
                  </Badge>
                )}
              </div>
            </div>

            
            <div className="space-y-2">
              <h3
                className={`text-xl font-bold ${category.color} group-hover:text-gray-900 transition-colors duration-300`}
              >
                {category.label}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                {category.description}
              </p>
            </div>

         
            <div className="flex items-center justify-between pt-2 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${category.gradient}`} />
                <span className="text-sm font-medium text-gray-700">{category.count} Products</span>
              </div>
              <div className="text-xs text-gray-500 group-hover:text-gray-600 transition-colors">Shop Now →</div>
            </div>
          </div>

         
          <div
            className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
          />
        </CardContent>
      </Card>
    </Link>
  )
}
