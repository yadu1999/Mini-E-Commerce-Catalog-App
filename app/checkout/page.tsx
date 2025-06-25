"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CreditCard, Truck, Shield, ArrowLeft, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/lib/cart-context"
import { toast } from "@/hooks/use-toast"
import AnimatedCounter from "@/components/animated-counter"

export default function CheckoutPage() {
  const { state, clearCart, getDiscountedPrice } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderComplete, setOrderComplete] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  const subtotal = state.total
  const shipping = subtotal > 50 ? 0 : 9.99
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

   
    await new Promise((resolve) => setTimeout(resolve, 3000))

    setOrderComplete(true)
    clearCart()
    setIsProcessing(false)

    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
    })


    setTimeout(() => {
      router.push("/")
    }, 3000)
  }

  if (state.items.length === 0 && !orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">Add some products to proceed with checkout</p>
          <Button onClick={() => router.push("/products")}>Continue Shopping</Button>
        </div>
      </div>
    )
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Order Complete!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your purchase. Your order has been successfully placed and you'll receive a confirmation email
            shortly.
          </p>
          <div className="space-y-3">
            <Button onClick={() => router.push("/")} className="w-full">
              Continue Shopping
            </Button>
            <Button variant="outline" onClick={() => router.push("/orders")} className="w-full">
              View Orders
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        required
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        required
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      required
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        required
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>

                      <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
  <SelectTrigger>
    <SelectValue placeholder="Select State" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="AP">Andhra Pradesh</SelectItem>
    <SelectItem value="AR">Arunachal Pradesh</SelectItem>
    <SelectItem value="AS">Assam</SelectItem>
    <SelectItem value="BR">Bihar</SelectItem>
    <SelectItem value="CG">Chhattisgarh</SelectItem>
    <SelectItem value="GA">Goa</SelectItem>
    <SelectItem value="GJ">Gujarat</SelectItem>
    <SelectItem value="HR">Haryana</SelectItem>
    <SelectItem value="HP">Himachal Pradesh</SelectItem>
    <SelectItem value="JH">Jharkhand</SelectItem>
    <SelectItem value="KA">Karnataka</SelectItem>
    <SelectItem value="KL">Kerala</SelectItem>
    <SelectItem value="MP">Madhya Pradesh</SelectItem>
    <SelectItem value="MH">Maharashtra</SelectItem>
    <SelectItem value="MN">Manipur</SelectItem>
    <SelectItem value="ML">Meghalaya</SelectItem>
    <SelectItem value="MZ">Mizoram</SelectItem>
    <SelectItem value="NL">Nagaland</SelectItem>
    <SelectItem value="OD">Odisha</SelectItem>
    <SelectItem value="PB">Punjab</SelectItem>
    <SelectItem value="RJ">Rajasthan</SelectItem>
    <SelectItem value="SK">Sikkim</SelectItem>
    <SelectItem value="TN">Tamil Nadu</SelectItem>
    <SelectItem value="TS">Telangana</SelectItem>
    <SelectItem value="TR">Tripura</SelectItem>
    <SelectItem value="UP">Uttar Pradesh</SelectItem>
    <SelectItem value="UK">Uttarakhand</SelectItem>
    <SelectItem value="WB">West Bengal</SelectItem>

    <SelectItem value="AN">Andaman and Nicobar Islands</SelectItem>
    <SelectItem value="CH">Chandigarh</SelectItem>
    <SelectItem value="DN">Dadra and Nagar Haveli and Daman and Diu</SelectItem>
    <SelectItem value="DL">Delhi</SelectItem>
    <SelectItem value="JK">Jammu and Kashmir</SelectItem>
    <SelectItem value="LA">Ladakh</SelectItem>
    <SelectItem value="LD">Lakshadweep</SelectItem>
    <SelectItem value="PY">Puducherry</SelectItem>
  </SelectContent>
</Select>

                      {/* <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          <SelectItem value="FL">Florida</SelectItem>
                        </SelectContent>
                      </Select> */}
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input
                      id="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      required
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    />
                  </div>

                  <div>
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input
                      id="nameOnCard"
                      required
                      value={formData.nameOnCard}
                      onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input
                        id="expiryDate"
                        placeholder="MM/YY"
                        required
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="cvv">CVV</Label>
                      <Input
                        id="cvv"
                        placeholder="123"
                        required
                        value={formData.cvv}
                        onChange={(e) => handleInputChange("cvv", e.target.value)}
                      />
                    </div>
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Processing...
                      </>
                    ) : (
                      `Complete Order - $${total.toFixed(2)}`
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

        
            <div className="flex items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Secure Payment</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Free Shipping Over $50</span>
              </div>
            </div>
          </div>

    
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {state.items.map((item) => {
                    const discountedPrice = getDiscountedPrice(item.price, item.discountPercentage)
                    return (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={item.thumbnail || "/placeholder.svg"}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 line-clamp-2">{item.title}</h4>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-sm text-gray-600">Qty: {item.quantity}</span>
                            <div className="text-right">
                              <div className="font-semibold">${(discountedPrice * item.quantity).toFixed(2)}</div>
                              {item.discountPercentage > 0 && (
                                <div className="text-sm text-gray-500 line-through">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-blue-600">
                      $<AnimatedCounter value={total} />
                    </span>
                  </div>
                </div>

                {shipping === 0 && (
                  <Badge variant="secondary" className="w-full justify-center mt-4">
                    🎉 You saved ${(9.99).toFixed(2)} on shipping!
                  </Badge>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
