"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Plus, Minus, ShoppingBag, Trash2 } from "lucide-react"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import AnimatedCounter from "./animated-counter"

interface CartSidebarProps {
  children: React.ReactNode
}

export default function CartSidebar({ children }: CartSidebarProps) {
  const { state, updateQuantity, removeFromCart, getDiscountedPrice } = useCart()
  const [isOpen, setIsOpen] = useState(false)

  const handleCheckout = () => {
    setIsOpen(false)
    
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Shopping Cart ({state.itemCount})
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {state.items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-4">Add some products to get started</p>
                <Button onClick={() => setIsOpen(false)}>Continue Shopping</Button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {state.items.map((item) => {
                    const discountedPrice = getDiscountedPrice(item.price, item.discountPercentage)
                    return (
                      <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white flex-shrink-0">
                          <Image
                            src={item.thumbnail || "/placeholder.svg?height=64&width=64"}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-gray-900 truncate">{item.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-semibold text-gray-900">${discountedPrice.toFixed(2)}</span>
                            {item.discountPercentage > 0 && (
                              <span className="text-sm text-gray-500 line-through">${item.price.toFixed(2)}</span>
                            )}
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="w-8 h-8 p-0"
                              >
                                <Minus className="w-3 h-3" />
                              </Button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                disabled={item.quantity >= item.stock}
                                className="w-8 h-8 p-0"
                              >
                                <Plus className="w-3 h-3" />
                              </Button>
                            </div>

                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="border-t pt-4 space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-blue-600">
                    $<AnimatedCounter value={state.total} />
                  </span>
                </div>

                <div className="space-y-2">
                  <Button className="w-full" size="lg" onClick={handleCheckout} asChild>
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
