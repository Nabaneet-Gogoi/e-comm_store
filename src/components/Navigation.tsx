'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'
import { ShoppingCart } from 'lucide-react'

export default function Navigation() {
  const { totalItems } = useCart()
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-800">
            E-Commerce Store
          </Link>
          
          <div className="flex space-x-6">
            <Link 
              href="/products" 
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Products
            </Link>
            <Link 
              href="/categories" 
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Categories
            </Link>
            <Link 
              href="/brands" 
              className="text-gray-600 hover:text-gray-900 font-medium"
            >
              Brands
            </Link>
            <Link 
              href="/cart" 
              className="text-gray-600 hover:text-gray-900 font-medium relative flex items-center"
            >
              <ShoppingCart className="w-5 h-5 mr-1" />
              <span className="hidden sm:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>
            <Link 
              href="/studio" 
              className="text-blue-600 hover:text-blue-800 font-medium text-sm"
            >
              CMS
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 