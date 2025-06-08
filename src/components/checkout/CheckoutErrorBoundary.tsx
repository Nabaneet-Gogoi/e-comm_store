'use client'

import React from 'react'
import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Props {
  children: React.ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class CheckoutErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Checkout Error Boundary caught an error:', error, errorInfo)
    
    // You could send this to your error reporting service
    // reportError(error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="max-w-md w-full mx-auto px-4">
            <div className="bg-white rounded-lg shadow-sm border p-8 text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              
              <h1 className="text-2xl font-bold text-gray-900 mb-4">
                Something went wrong
              </h1>
              
              <p className="text-gray-600 mb-6">
                We encountered an unexpected error during checkout. 
                Your payment information is secure and has not been processed.
              </p>
              
              <div className="space-y-3">
                <Button
                  onClick={() => this.setState({ hasError: false })}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Try Again</span>
                </Button>
                
                <Link href="/cart" className="w-full block">
                  <Button variant="outline" className="w-full flex items-center justify-center space-x-2">
                    <ArrowLeft className="w-4 h-4" />
                    <span>Return to Cart</span>
                  </Button>
                </Link>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  If this problem persists, please contact our support team.
                </p>
                <Link href="/support" className="text-xs text-blue-600 hover:underline">
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default CheckoutErrorBoundary 