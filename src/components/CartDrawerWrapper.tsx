'use client'

import { useCart } from '@/lib/cart-context'
import CartDrawer from './CartDrawer'

export default function CartDrawerWrapper() {
  const { isDrawerOpen, closeDrawer } = useCart()
  
  return (
    <CartDrawer 
      isOpen={isDrawerOpen} 
      onClose={closeDrawer} 
    />
  )
} 