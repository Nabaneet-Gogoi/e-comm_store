'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Package, Home, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CheckoutSuccessPage() {
  const searchParams = useSearchParams()
  const paymentIntentId = searchParams.get('payment_intent')
  const [orderNumber] = useState(() => 
    Math.random().toString(36).substr(2, 9).toUpperCase()
  )

  useEffect(() => {
    // You could verify the payment intent with Stripe here
    // or update your order management system
    if (paymentIntentId) {
      console.log('Payment Intent ID:', paymentIntentId)
    }
  }, [paymentIntentId])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Order Confirmed!
            </h1>
            <p className="text-gray-600 text-lg">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
          </div>

          {/* Order Details Card */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Order Number
                </h3>
                <p className="text-2xl font-bold text-gray-900">#{orderNumber}</p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Payment Status
                </h3>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="text-lg font-medium text-green-600">Paid</span>
                </div>
              </div>
            </div>

            {paymentIntentId && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
                  Transaction ID
                </h3>
                <p className="text-sm font-mono text-gray-600">{paymentIntentId}</p>
              </div>
            )}
          </div>

          {/* What's Next */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-blue-600">1</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Order Confirmation Email</h4>
                  <p className="text-sm text-gray-600">
                    You&apos;ll receive an email confirmation with your order details shortly.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-blue-600">2</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Order Processing</h4>
                  <p className="text-sm text-gray-600">
                    We&apos;ll start preparing your order for shipment within 1-2 business days.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sm font-medium text-blue-600">3</span>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Shipping Notification</h4>
                  <p className="text-sm text-gray-600">
                    Once shipped, you&apos;ll receive a tracking number to monitor your package.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link href="/dashboard" className="w-full">
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2">
                  <Package className="w-4 h-4" />
                  <span>Track Your Order</span>
                </Button>
              </Link>
              
              <Link href="/products" className="w-full">
                <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Continue Shopping</span>
                </Button>
              </Link>
            </div>
            
            <div className="text-center">
              <Link href="/" className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <Home className="w-4 h-4" />
                <span>Return to Home</span>
              </Link>
            </div>
          </div>

          {/* Customer Support */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Need help with your order?
            </p>
            <div className="space-x-4">
              <Link href="/support" className="text-sm text-blue-600 hover:text-blue-700 underline">
                Contact Support
              </Link>
              <Link href="/faq" className="text-sm text-blue-600 hover:text-blue-700 underline">
                View FAQ
              </Link>
            </div>
          </div>

          {/* Footer Note */}
          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <p className="text-xs text-gray-600 text-center">
              This order confirmation serves as your receipt. 
              Keep this information for your records.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 