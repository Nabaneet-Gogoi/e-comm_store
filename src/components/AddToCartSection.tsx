'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/lib/cart-context'
import { Minus, Plus, ShoppingCart, Check, Heart } from 'lucide-react'
import { Product, ProductVariant } from '@/types/product'

interface AddToCartSectionProps {
  product: Product
  variants?: ProductVariant[]
}

export default function AddToCartSection({ product, variants }: AddToCartSectionProps) {
  const { addItem } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [selectedVariant, setSelectedVariant] = useState(variants?.[0] || null)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [isFavorited, setIsFavorited] = useState(false)

  const currentPrice = selectedVariant?.price || product.price
  const currentStock = selectedVariant?.stock || 100 // Default stock if not specified

  const handleQuantityChange = (change: number) => {
    const newQuantity = quantity + change
    if (newQuantity >= 1 && newQuantity <= currentStock) {
      setQuantity(newQuantity)
    }
  }

  const handleQuantityInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 1
    if (value >= 1 && value <= currentStock) {
      setQuantity(value)
    }
  }

  const addToCart = async () => {
    setIsAddingToCart(true)
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 800))
      
      // Add item using cart context
      addItem({
        id: product._id,
        name: product.name,
        slug: product.slug.current,
        price: currentPrice,
        quantity: quantity,
        variant: selectedVariant,
        image: product.images?.[0]
      })
      
      // Show success state
      setAddedToCart(true)
      setTimeout(() => setAddedToCart(false), 3000)
      
    } catch (error) {
      console.error('Error adding to cart:', error)
    } finally {
      setIsAddingToCart(false)
    }
  }

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited)
    // In a real app, this would sync with user's favorites
  }

  return (
    <div className="space-y-6">
      {/* Variant Selection */}
      {variants && variants.length > 1 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">Select Option</h3>
          <div className="grid gap-3">
            {variants.map((variant: ProductVariant) => (
              <button
                key={variant.name}
                onClick={() => setSelectedVariant(variant)}
                className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                  selectedVariant?.name === variant.name
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium text-gray-900">{variant.name}</div>
                    {variant.type && (
                      <div className="text-sm text-gray-500">{variant.type}</div>
                    )}
                  </div>
                  <div className="text-right">
                    {variant.price !== product.price && (
                      <div className="font-bold text-green-600">${variant.price}</div>
                    )}
                    <div className="text-sm text-gray-500">
                      Stock: {variant.stock}
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Display */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-700">Unit Price:</span>
          <span className="text-2xl font-bold text-green-600">${currentPrice}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-700">Total ({quantity} item{quantity > 1 ? 's' : ''}):</span>
          <span className="text-2xl font-bold text-gray-900">${(currentPrice * quantity).toFixed(2)}</span>
        </div>
      </div>

      {/* Quantity Selector */}
      <div>
        <label className="block text-lg font-semibold text-gray-900 mb-3">
          Quantity
        </label>
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg w-full sm:w-auto">
            <button
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
              className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4" />
            </button>
            
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityInput}
              min="1"
              max={currentStock}
              className="w-16 text-center border-none outline-none font-semibold"
            />
            
            <button
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= currentStock}
              className="p-3 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
          
          <div className="text-sm text-gray-500 text-center sm:text-left">
            {currentStock} available
          </div>
        </div>
      </div>

      {/* Add to Cart Button */}
      <div className="space-y-3">
        <Button
          onClick={addToCart}
          disabled={isAddingToCart || addedToCart}
          className={`w-full py-4 text-lg font-semibold transition-all duration-200 ${
            addedToCart
              ? 'bg-green-600 hover:bg-green-700'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isAddingToCart ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Adding to Cart...</span>
            </div>
          ) : addedToCart ? (
            <div className="flex items-center justify-center space-x-2">
              <Check className="w-5 h-5" />
              <span>Added to Cart!</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <ShoppingCart className="w-5 h-5" />
              <span>Add to Cart</span>
            </div>
          )}
        </Button>

        {/* Secondary Actions */}
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <Button
            variant="outline"
            onClick={toggleFavorite}
            className={`w-full sm:flex-1 py-3 transition-colors ${
              isFavorited
                ? 'border-red-300 text-red-600 hover:bg-red-50'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-current' : ''}`} />
            <span className="hidden sm:inline">{isFavorited ? 'Favorited' : 'Add to Favorites'}</span>
            <span className="sm:hidden">{isFavorited ? 'Favorited' : 'Favorite'}</span>
          </Button>
          
          <Button
            variant="outline"
            className="w-full sm:flex-1 py-3 border-gray-300 text-gray-700 hover:bg-gray-50"
          >
            Buy Now
          </Button>
        </div>
      </div>

      {/* Shipping & Return Info */}
      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-3 text-sm">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-700">Free shipping on orders over $50</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-700">Ships within 1-2 business days</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-gray-700">30-day return policy</span>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900 mb-2">Secure Shopping</div>
          <div className="flex justify-center space-x-4 text-xs text-gray-600">
            <span>🔒 SSL Secured</span>
            <span>✓ Safe Checkout</span>
            <span>📦 Fast Delivery</span>
          </div>
        </div>
      </div>
    </div>
  )
} 