'use client'

import { useState } from 'react'
import { useCart } from '@/lib/cart-context'
import { Package, CreditCard, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ShippingForm from '@/components/checkout/ShippingForm'
import PaymentForm from '@/components/checkout/PaymentForm'
import OrderReview from '@/components/checkout/OrderReview'
import CheckoutErrorBoundary from '@/components/checkout/CheckoutErrorBoundary'
import Link from 'next/link'

export interface ShippingAddress {
  firstName: string
  lastName: string
  email: string
  phone: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
}

export interface CheckoutData {
  shipping: ShippingAddress | null
  paymentIntentId?: string
  clientSecret?: string
}

const steps = [
  { id: 'shipping', title: 'Shipping', icon: Package },
  { id: 'payment', title: 'Payment', icon: CreditCard },
  { id: 'review', title: 'Review', icon: CheckCircle },
]

export default function CheckoutPage() {
  const { items, totalPrice } = useCart()
  const [currentStep, setCurrentStep] = useState(0)
  const [checkoutData, setCheckoutData] = useState<CheckoutData>({
    shipping: null,
  })

  // Redirect if cart is empty
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">
            Add some items to your cart before proceeding to checkout.
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

  const handleStepComplete = (stepData: unknown) => {
    if (currentStep === 0) {
      // Shipping step completed
      setCheckoutData(prev => ({ ...prev, shipping: stepData as ShippingAddress }))
      setCurrentStep(1)
    } else if (currentStep === 1) {
      // Payment step completed
      const paymentData = stepData as { paymentIntentId: string; clientSecret: string }
      setCheckoutData(prev => ({ 
        ...prev, 
        paymentIntentId: paymentData.paymentIntentId,
        clientSecret: paymentData.clientSecret 
      }))
      setCurrentStep(2)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentStepData = steps[currentStep]

  return (
    <CheckoutErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === currentStep
                const isCompleted = index < currentStep
                
                return (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                      isCompleted 
                        ? 'bg-green-600 border-green-600 text-white' 
                        : isActive 
                          ? 'bg-blue-600 border-blue-600 text-white' 
                          : 'bg-white border-gray-300 text-gray-400'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="ml-3">
                      <div className={`text-sm font-medium ${
                        isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                    {index < steps.length - 1 && (
                      <div className={`flex-1 h-0.5 mx-4 ${
                        isCompleted ? 'bg-green-600' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Step Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {currentStepData.title}
                </h2>
                
                {currentStep === 0 && (
                  <ShippingForm 
                    onComplete={handleStepComplete}
                    initialData={checkoutData.shipping}
                  />
                )}
                
                {currentStep === 1 && (
                  <PaymentForm 
                    onComplete={handleStepComplete}
                    onBack={handleBack}
                    shippingAddress={checkoutData.shipping!}
                    totalAmount={totalPrice}
                  />
                )}
                
                {currentStep === 2 && (
                  <OrderReview 
                    checkoutData={checkoutData}
                    onBack={handleBack}
                  />
                )}
              </div>
            </div>

            {/* Right Column - Order Summary */}
            <div>
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={`${item.id}-${JSON.stringify(item.variant)}`} className="flex items-start space-x-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        {item.variant && (
                          <p className="text-xs text-gray-500">{item.variant.name}</p>
                        )}
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                      </div>
                      <span className="text-sm font-medium text-gray-900">
                        ${item.totalPrice.toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <hr className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
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
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-green-600">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>

                {/* Security Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-sm font-medium text-gray-900 mb-2">Secure Checkout</div>
                    <div className="flex justify-center space-x-4 text-xs text-gray-600">
                      <span>🔒 SSL Secured</span>
                      <span>💳 Stripe</span>
                      <span>✓ PCI Compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </CheckoutErrorBoundary>
  )
} 