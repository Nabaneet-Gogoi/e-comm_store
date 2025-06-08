import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { formatAmountForStripe } from '@/lib/stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
})

export async function POST(request: NextRequest) {
  try {
    const { amount, shipping, items, email } = await request.json()

    // Validate required fields
    if (!amount || !shipping || !items || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate amount
    if (amount <= 0) {
      return NextResponse.json(
        { error: 'Invalid amount' },
        { status: 400 }
      )
    }

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: formatAmountForStripe(amount),
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
      receipt_email: email,
      shipping: {
        name: `${shipping.firstName} ${shipping.lastName}`,
        address: {
          line1: shipping.address1,
          line2: shipping.address2 || null,
          city: shipping.city,
          state: shipping.state,
          postal_code: shipping.postalCode,
          country: shipping.country,
        },
        phone: shipping.phone,
      },
      metadata: {
        orderItems: JSON.stringify(items.map((item: { id: string; name: string; quantity: number; price: number; variant?: { name?: string } }) => ({
          id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          variant: item.variant?.name || null,
        }))),
        customerEmail: email,
        orderTotal: amount.toString(),
      },
    }, {
      // Use idempotency key to prevent duplicate charges
      idempotencyKey: `checkout_${email}_${Date.now()}`,
    })

    return NextResponse.json({
      paymentIntentId: paymentIntent.id,
      clientSecret: paymentIntent.client_secret,
    })
  } catch (error) {
    console.error('Error creating payment intent:', error)
    
    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
} 