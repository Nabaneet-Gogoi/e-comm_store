'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import { ProductVariant, ProductImage } from '@/types/product'

interface CartItem {
  id: string
  name: string
  slug: string
  price: number
  quantity: number
  variant?: ProductVariant
  image?: ProductImage
  totalPrice: number
}

interface CartContextType {
  items: CartItem[]
  totalItems: number
  totalPrice: number
  isDrawerOpen: boolean
  addItem: (item: Omit<CartItem, 'totalPrice'>) => void
  removeItem: (id: string, variant?: ProductVariant) => void
  updateQuantity: (id: string, quantity: number, variant?: ProductVariant) => void
  clearCart: () => void
  openDrawer: () => void
  closeDrawer: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
  }, [])

  // Save cart to localStorage when items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
    window.dispatchEvent(new CustomEvent('cartUpdated'))
  }, [items])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.totalPrice, 0)

  const addItem = (newItem: Omit<CartItem, 'totalPrice'>) => {
    setItems(currentItems => {
      const existingItemIndex = currentItems.findIndex(
        item => item.id === newItem.id && 
                 JSON.stringify(item.variant) === JSON.stringify(newItem.variant)
      )

      if (existingItemIndex > -1) {
        // Update existing item
        const updatedItems = [...currentItems]
        updatedItems[existingItemIndex].quantity += newItem.quantity
        updatedItems[existingItemIndex].totalPrice = 
          updatedItems[existingItemIndex].quantity * updatedItems[existingItemIndex].price
        return updatedItems
      } else {
        // Add new item
        return [...currentItems, {
          ...newItem,
          totalPrice: newItem.price * newItem.quantity
        }]
      }
    })
    
    // Auto-open drawer when item is added
    setIsDrawerOpen(true)
  }

  const removeItem = (id: string, variant?: ProductVariant) => {
    setItems(currentItems => 
      currentItems.filter(item => 
        !(item.id === id && JSON.stringify(item.variant) === JSON.stringify(variant))
      )
    )
  }

  const updateQuantity = (id: string, quantity: number, variant?: ProductVariant) => {
    if (quantity <= 0) {
      removeItem(id, variant)
      return
    }

    setItems(currentItems =>
      currentItems.map(item => {
        if (item.id === id && JSON.stringify(item.variant) === JSON.stringify(variant)) {
          return {
            ...item,
            quantity,
            totalPrice: item.price * quantity
          }
        }
        return item
      })
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const openDrawer = () => {
    setIsDrawerOpen(true)
  }

  const closeDrawer = () => {
    setIsDrawerOpen(false)
  }

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalPrice,
      isDrawerOpen,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      openDrawer,
      closeDrawer
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 