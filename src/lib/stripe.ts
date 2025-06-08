import { loadStripe } from '@stripe/stripe-js'

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render.
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

export const formatAmountForStripe = (amount: number): number => {
  // Stripe expects amounts in cents for USD
  return Math.round(amount * 100)
} 