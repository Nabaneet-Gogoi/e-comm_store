'use client'

import { useState, useEffect } from 'react'
import { loadStripe } from '@stripe/stripe-js'
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { ChevronLeft, Lock, AlertCircle } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { ShippingAddress } from '@/app/checkout/page'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

interface PaymentFormProps {
  onComplete: (data: { paymentIntentId: string; clientSecret: string }) => void
  onBack: () => void
  shippingAddress: ShippingAddress
  totalAmount: number
}

interface PaymentElementFormProps {
  clientSecret: string
  onComplete: (data: { paymentIntentId: string; clientSecret: string }) => void
  onBack: () => void
  totalAmount: number
}

function PaymentElementForm({ onComplete, onBack, totalAmount }: PaymentElementFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setErrorMessage('')

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/checkout/success`,
      },
      redirect: 'if_required', // Don't redirect, handle in the component
    })

    if (error) {
      setErrorMessage(error.message || 'An unexpected error occurred.')
      setIsLoading(false)
    } else if (paymentIntent && paymentIntent.status === 'succeeded') {
      // Payment successful
      onComplete({
        paymentIntentId: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2">
          <Lock className="w-5 h-5 text-blue-600" />
          <p className="text-sm text-blue-800 font-medium">
            Your payment information is secure and encrypted
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Payment Information</h3>
        <PaymentElement 
          options={{
            layout: 'tabs',
            paymentMethodOrder: ['card', 'apple_pay', 'google_pay']
          }}
        />
      </div>

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <p className="text-sm text-red-800">{errorMessage}</p>
          </div>
        </div>
      )}

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex justify-between items-center text-lg font-bold">
          <span>Total to be charged:</span>
          <span className="text-green-600">${totalAmount.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex justify-between pt-6 border-t border-gray-200">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="flex items-center space-x-2"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Shipping</span>
        </Button>

        <Button
          type="submit"
          disabled={!stripe || isLoading}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 flex items-center space-x-2"
        >
          <Lock className="w-4 h-4" />
          <span>
            {isLoading ? 'Processing...' : `Pay $${totalAmount.toFixed(2)}`}
          </span>
        </Button>
      </div>
    </form>
  )
}

export default function PaymentForm({ onComplete, onBack, shippingAddress, totalAmount }: PaymentFormProps) {
  const { items } = useCart()
  const [clientSecret, setClientSecret] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // Create Payment Intent when component mounts
    const createPaymentIntent = async () => {
      try {
        setIsLoading(true)
        setError('')

        const response = await fetch('/api/stripe/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            amount: totalAmount,
            shipping: shippingAddress,
            items: items,
            email: shippingAddress.email,
          }),
        })

        const data = await response.json()

        if (!response.ok) {
          throw new Error(data.error || 'Failed to create payment intent')
        }

        setClientSecret(data.clientSecret)
      } catch (err) {
        console.error('Error creating payment intent:', err)
        setError(err instanceof Error ? err.message : 'Failed to initialize payment')
      } finally {
        setIsLoading(false)
      }
    }

    createPaymentIntent()
  }, [totalAmount, shippingAddress, items])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing secure payment...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center space-x-2 mb-4">
          <AlertCircle className="w-6 h-6 text-red-600" />
          <h3 className="text-lg font-medium text-red-800">Payment Initialization Failed</h3>
        </div>
        <p className="text-red-700 mb-4">{error}</p>
        <div className="flex space-x-4">
          <Button
            onClick={onBack}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Shipping</span>
          </Button>
          <Button
            onClick={() => window.location.reload()}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  const options = {
    clientSecret,
    appearance: {
      theme: 'stripe' as const,
      variables: {
        colorPrimary: '#2563eb',
        colorBackground: '#ffffff',
        colorText: '#1f2937',
        colorDanger: '#ef4444',
        fontFamily: 'system-ui, sans-serif',
        spacingUnit: '4px',
        borderRadius: '6px',
      },
    },
  }

  return (
    <Elements options={options} stripe={stripePromise}>
      <PaymentElementForm
        clientSecret={clientSecret}
        onComplete={onComplete}
        onBack={onBack}
        totalAmount={totalAmount}
      />
    </Elements>
  )
} 