'use client'

import { useCart } from '@/lib/cart-context'
import { Plus, Minus, ShoppingCart, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/sanity/lib/client'

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart()

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link href="/products">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Shopping Cart ({totalItems} item{totalItems !== 1 ? 's' : ''})
          </h1>
          <Button
            variant="outline"
            onClick={clearCart}
            className="text-red-600 border-red-200 hover:bg-red-50"
          >
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <div key={`${item.id}-${JSON.stringify(item.variant)}`} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    {item.image ? (
                      <Image
                        src={urlFor(item.image).width(96).height(96).url()}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <ShoppingCart className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          <Link href={`/products/${item.slug}`} className="hover:text-blue-600">
                            {item.name}
                          </Link>
                        </h3>
                        {item.variant && (
                          <p className="text-sm text-gray-500 mt-1">
                            {item.variant.name}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.variant)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center space-x-4">
                        <span className="text-lg font-semibold text-green-600">
                          ${item.price.toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500">each</span>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center border border-gray-300 rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-lg font-medium border-x border-gray-300">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                          className="p-2 hover:bg-gray-100 transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-200">
                      <span className="text-sm text-gray-600">Subtotal:</span>
                      <span className="text-lg font-bold text-gray-900">
                        ${item.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 rounded-lg p-6 sticky top-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Items ({totalItems}):</span>
                  <span className="font-medium">${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium text-green-600">Free</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Tax:</span>
                  <span className="font-medium">Calculated at checkout</span>
                </div>
                
                <hr className="border-gray-300" />
                
                <div className="flex justify-between items-center text-xl font-bold">
                  <span className="text-gray-900">Total:</span>
                  <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-8 space-y-4">
                <Link href="/checkout">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-lg">
                    Proceed to Checkout
                  </Button>
                </Link>
                
                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 pt-6 border-t border-gray-300">
                <div className="text-center">
                  <div className="text-sm font-medium text-gray-900 mb-2">Secure Checkout</div>
                  <div className="flex justify-center space-x-4 text-xs text-gray-600">
                    <span>🔒 SSL Secured</span>
                    <span>✓ Safe Payment</span>
                    <span>📦 Fast Shipping</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 