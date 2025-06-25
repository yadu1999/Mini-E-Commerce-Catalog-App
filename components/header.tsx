"use client"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Search, Menu, X, User, Heart, Grid3X3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import CartSidebar from "./cart-sidebar"
import SearchModal from "./search-modal"
import AnimatedCounter from "./animated-counter"

export default function Header() {
  const { state } = useCart()
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
          
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            >
              Mini E-Commerce Catalog App
            </Link>

            
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium relative group"
              >
                Home
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 group-hover:w-full" />
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium relative group"
              >
                Products
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 group-hover:w-full" />
              </Link>
              <Link
                href="/categories"
                className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium relative group flex items-center gap-1"
              >
                <Grid3X3 className="w-4 h-4" />
                Categories
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-200 group-hover:w-full" />
              </Link>
            </nav>

          
            <div className="flex items-center gap-2">
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className="relative hover:bg-blue-50 hover:text-blue-600 transition-colors duration-200"
              >
                <Search className="w-5 h-5" />
              </Button>

              
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
              >
                <Heart className="w-5 h-5" />
              </Button>

         
              <CartSidebar>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                >
                  <ShoppingCart className="w-5 h-5" />
                  {state.itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs animate-pulse">
                      <AnimatedCounter value={state.itemCount} />
                    </Badge>
                  )}
                </Button>
              </CartSidebar>

           
              <Button
                variant="ghost"
                size="icon"
                className="hidden sm:flex hover:bg-purple-50 hover:text-purple-600 transition-colors duration-200"
              >
                <User className="w-5 h-5" />
              </Button>

            
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

        
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4 animate-in slide-in-from-top-2 duration-200">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/products"
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Products
                </Link>
                <Link
                  href="/categories"
                  className="text-gray-700 hover:text-blue-600 transition-colors duration-200 font-medium flex items-center gap-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Grid3X3 className="w-4 h-4" />
                  Categories
                </Link>
                <Button
                  variant="ghost"
                  className="justify-start p-0 h-auto font-medium text-gray-700 hover:text-purple-600"
                >
                  <User className="w-4 h-4 mr-2" />
                  Account
                </Button>
              </nav>
            </div>
          )}
        </div>
      </header>

      
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  )
}
