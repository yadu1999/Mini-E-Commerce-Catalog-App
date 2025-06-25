import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Smartphone,
  Laptop,
  Sparkles,
  Home,
  Watch,
  Car,
  ShoppingBag,
  Sofa,
  Star,
  TrendingUp,
  ArrowRight,
} from "lucide-react"
import { categories1 } from "@/lib/utils"



export default function CategoryLinks() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories1?.map((category, index) => {
          const IconComponent = category.icon
          return (
            <Link key={category.name} href={`/products?category=${category.name}`}>
              <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-gray-50 border-0 shadow-md hover:-translate-y-1">
                <CardContent className="p-6 text-center relative overflow-hidden">
                 
                  <div className="absolute inset-0 opacity-5">
                    <div className={`w-full h-full bg-gradient-to-br ${category.gradient}`} />
                  </div>

                 
                  <div
                    className={`relative w-12 h-12 mx-auto bg-gradient-to-br ${category.gradient} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300 mb-3`}
                  >
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>

                 
                  <h3 className="font-semibold text-sm text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                    {category.label}
                  </h3>

                
                  {(category.popular || category.trending) && (
                    <div className="flex justify-center">
                      {category.popular && (
                        <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white border-0 text-xs">
                          <Star className="w-2 h-2 mr-1" />
                          Popular
                        </Badge>
                      )}
                      {category.trending && (
                        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0 text-xs">
                          <TrendingUp className="w-2 h-2 mr-1" />
                          Hot
                        </Badge>
                      )}
                    </div>
                  )}

               
                  <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowRight className="w-3 h-3 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

     
      <div className="text-center">
        <Link
          href="/categories"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors group"
        >
          View All Categories
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  )
}
