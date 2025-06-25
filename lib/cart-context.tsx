"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect } from "react"

interface CartItem {
  id: number
  title: string
  price: number
  discountPercentage: number
  thumbnail: string
  quantity: number
  stock: number
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Omit<CartItem, "quantity"> }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  getDiscountedPrice: (price: number, discount: number) => number
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: Math.min(item.quantity + 1, item.stock) } : item,
        )
        return calculateTotals({ ...state, items: updatedItems })
      }

      const newItem = { ...action.payload, quantity: 1 }
      return calculateTotals({ ...state, items: [...state.items, newItem] })
    }

    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload)
      return calculateTotals({ ...state, items: updatedItems })
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Math.max(0, Math.min(action.payload.quantity, item.stock)) }
            : item,
        )
        .filter((item) => item.quantity > 0)

      return calculateTotals({ ...state, items: updatedItems })
    }

    case "CLEAR_CART":
      return { items: [], total: 0, itemCount: 0 }

    case "LOAD_CART":
      return calculateTotals({ ...state, items: action.payload })

    default:
      return state
  }
}

function calculateTotals(state: CartState): CartState {
  const total = state.items.reduce((sum, item) => {
    const discountedPrice = (item?.price || 0) * (1 - (item?.discountPercentage || 0) / 100)
    return sum + discountedPrice * (item?.quantity || 0)
  }, 0)

  const itemCount = state.items.reduce((sum, item) => sum + (item?.quantity || 0), 0)

  return { ...state, total, itemCount }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  })


  useEffect(() => {
    try {
      const savedCart = localStorage?.getItem("cart")
      if (savedCart) {
        const cartItems = JSON.parse(savedCart)
        dispatch({ type: "LOAD_CART", payload: cartItems })
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error)
    }
  }, [])


  useEffect(() => {
    try {
      localStorage?.setItem("cart", JSON.stringify(state.items))
    } catch (error) {
      console.error("Error saving cart to localStorage:", error)
    }
  }, [state.items])

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    dispatch({ type: "ADD_ITEM", payload: item })
  }

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" })
  }

  const getDiscountedPrice = (price: number, discount: number) => {
    return (price || 0) * (1 - (discount || 0) / 100)
  }

  return (
    <CartContext.Provider
      value={{
        state,
        dispatch,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getDiscountedPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
