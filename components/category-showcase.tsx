"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Filter, Grid3X3 } from "lucide-react"
import { categoryGroups } from "@/lib/utils"


export default function CategoryShowcase() {
  const [selectedGroup, setSelectedGroup] = useState(0)

  return (
    <div className="space-y-8">
     
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center">
            <Grid3X3 className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
            Explore Categories
          </h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our organized collection of products across different categories. Find exactly what you're looking
          for with our intuitive category system.
        </p>
      </div>

     
      <div className="flex flex-wrap justify-center gap-3">
        {categoryGroups.map((group, index) => (
          <Button
            key={index}
            variant={selectedGroup === index ? "default" : "outline"}
            onClick={() => setSelectedGroup(index)}
            className={`transition-all duration-300 ${
              selectedGroup === index
                ? `bg-gradient-to-r ${group.color} text-white border-0 shadow-lg`
                : "hover:shadow-md"
            }`}
          >
            {group.title}
          </Button>
        ))}
      </div>

    
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-bold text-gray-900">{categoryGroups[selectedGroup]?.title}</h3>
          <p className="text-gray-600">{categoryGroups[selectedGroup]?.description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categoryGroups[selectedGroup]?.categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <Link key={category.name} href={`/products?category=${category.name}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer bg-gradient-to-br from-white to-gray-50 border-0 shadow-md hover:-translate-y-2">
                  <CardContent className="p-6 text-center space-y-4 relative overflow-hidden">
                 
                    <div className="absolute inset-0 opacity-5">
                      <div className={`w-full h-full bg-gradient-to-br ${categoryGroups[selectedGroup]?.color}`} />
                    </div>

                 
                    <div
                      className={`relative w-16 h-16 mx-auto bg-gradient-to-br ${categoryGroups[selectedGroup]?.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>

                  
                    <div className="relative space-y-2">
                      <h4 className="font-bold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                        {category.label}
                      </h4>
                      <div className="flex items-center justify-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {category.count} Products
                        </Badge>
                      </div>
                    </div>

                   
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

     
      <div className="text-center">
        <Link href="/categories">
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Filter className="w-5 h-5 mr-2" />
            View All Categories
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
