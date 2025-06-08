'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, CheckCircle, Package, MapPin, CreditCard, AlertCircle } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { CheckoutData } from '@/app/checkout/page'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { urlFor } from '@/sanity/lib/client'

interface OrderReviewProps {
  checkoutData: CheckoutData
  onBack: () => void
}

export default function OrderReview({ checkoutData, onBack }: OrderReviewProps) {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const [isPlacing, setIsPlacing] = useState(false)
  const [error, setError] = useState<string>('')

  const handlePlaceOrder = async () => {
    setIsPlacing(true)
    setError('')

    try {
      // Simulate order placement (you can integrate with your order management system here)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Clear the cart after successful order
      clearCart()
      
      // Redirect to success page
      router.push(`/checkout/success?payment_intent=${checkoutData.paymentIntentId}`)
    } catch (err) {
      console.error('Error placing order:', err)
      setError('Failed to place order. Please try again.')
      setIsPlacing(false)
    }
  }

  if (!checkoutData.shipping) {
    return (
      <div className="text-center py-8">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600">Missing shipping information</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Order Items */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <Package className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900">Order Items</h3>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4 space-y-4">
          {items.map((item) => (
            <div key={`${item.id}-${JSON.stringify(item.variant)}`} className="flex items-center space-x-4 bg-white rounded-lg p-4">
              {/* Product Image */}
              <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
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
                    <Package className="w-6 h-6 text-gray-400" />
                  </div>
                )}
              </div>
              
              {/* Product Details */}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-gray-900">{item.name}</h4>
                {item.variant && (
                  <p className="text-xs text-gray-500">{item.variant.name}</p>
                )}
                <p className="text-sm text-gray-600">
                  ${item.price.toFixed(2)} × {item.quantity}
                </p>
              </div>
              
              <div className="text-sm font-medium text-gray-900">
                ${item.totalPrice.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Information */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900">Shipping Address</h3>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900">
                {checkoutData.shipping.firstName} {checkoutData.shipping.lastName}
              </h4>
              <p className="text-sm text-gray-600">{checkoutData.shipping.email}</p>
              <p className="text-sm text-gray-600">{checkoutData.shipping.phone}</p>
            </div>
            <div>
              <p className="text-sm text-gray-900">{checkoutData.shipping.address1}</p>
              {checkoutData.shipping.address2 && (
                <p className="text-sm text-gray-900">{checkoutData.shipping.address2}</p>
              )}
              <p className="text-sm text-gray-900">
                {checkoutData.shipping.city}, {checkoutData.shipping.state} {checkoutData.shipping.postalCode}
              </p>
              <p className="text-sm text-gray-900">{checkoutData.shipping.country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div>
        <div className="flex items-center space-x-2 mb-4">
          <CreditCard className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-medium text-gray-900">Payment</h3>
        </div>
        
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-gray-900">Payment Authorized</span>
            </div>
            <span className="text-sm text-gray-600">
              Payment ID: {checkoutData.paymentIntentId?.slice(-8)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-2">
            Your payment method has been authorized and will be charged when you place the order.
          </p>
        </div>
      </div>

      {/* Order Total */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Order Summary</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal ({items.length} items)</span>
            <span className="font-medium">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-green-600">Free</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Tax</span>
            <span className="font-medium">$0.00</span>
          </div>
          <hr className="my-2" />
          <div className="flex justify-between text-xl font-bold">
            <span>Total</span>
            <span className="text-blue-600">${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          disabled={isPlacing}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Payment</span>
        </Button>

        <Button
          onClick={handlePlaceOrder}
          disabled={isPlacing}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 flex items-center space-x-2"
        >
          {isPlacing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Placing Order...</span>
            </>
          ) : (
            <>
              <CheckCircle className="w-4 h-4" />
              <span>Place Order</span>
            </>
          )}
        </Button>
      </div>

      {/* Order Policies */}
      <div className="bg-gray-50 rounded-lg p-4 text-xs text-gray-600">
        <p className="mb-2">
          By placing this order, you agree to our{' '}
          <a href="/terms" className="text-blue-600 hover:underline">Terms of Service</a>{' '}
          and{' '}
          <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>.
        </p>
        <p>
          Your payment will be processed securely through Stripe. 
          You will receive an email confirmation once your order is placed.
        </p>
      </div>
    </div>
  )
} 