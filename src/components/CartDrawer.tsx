'use client'

import React, { useEffect } from 'react'
import { useCart } from '@/lib/cart-context'
import { X, Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/client'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart()

  // Handle escape key press
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className={`fixed right-0 top-0 h-full bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } w-full max-w-md`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5 text-gray-700" />
            <h2 className="text-lg font-semibold text-gray-900">
              Shopping Cart ({totalItems})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            // Empty Cart State
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <ShoppingCart className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-6">Add some items to get started!</p>
              <Button onClick={onClose} className="w-full">
                Continue Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map((item) => (
                  <div key={`${item.id}-${JSON.stringify(item.variant)}`} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg">
                                         {/* Product Image */}
                     <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                       {item.image ? (
                         <Image
                           src={urlFor(item.image).width(64).height(64).url()}
                           alt={item.name}
                           width={64}
                           height={64}
                           className="w-full h-full object-cover"
                         />
                       ) : (
                         <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                           <ShoppingCart className="w-6 h-6 text-gray-400" />
                         </div>
                       )}
                     </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h4>
                      {item.variant && (
                        <p className="text-xs text-gray-500 mt-1">
                          {item.variant.name}
                        </p>
                      )}
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm font-semibold text-green-600">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">
                          Total: ${item.totalPrice.toFixed(2)}
                        </span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-gray-300 rounded-md">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                            className="p-1 hover:bg-gray-100 transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 py-1 text-sm font-medium border-x border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                            className="p-1 hover:bg-gray-100 transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id, item.variant)}
                          className="p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-4 space-y-4">
                {/* Total */}
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <Link href="/checkout" onClick={onClose}>
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3">
                      Proceed to Checkout
                    </Button>
                  </Link>
                  <div className="flex space-x-2">
                    <Link href="/cart" onClick={onClose} className="flex-1">
                      <Button variant="outline" className="w-full">
                        View Full Cart
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      onClick={clearCart}
                      className="px-4 text-red-600 border-red-200 hover:bg-red-50"
                    >
                      Clear
                    </Button>
                  </div>
                </div>

                {/* Continue Shopping */}
                <Button
                  variant="ghost"
                  onClick={onClose}
                  className="w-full text-gray-600 hover:text-gray-900"
                >
                  Continue Shopping
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
} 