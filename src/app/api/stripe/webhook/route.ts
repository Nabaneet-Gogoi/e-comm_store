import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-05-28.basil',
})

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature')!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, signature, endpointSecret)
  } catch (err) {
    console.error('⚠️  Webhook signature verification failed.', err)
    return NextResponse.json(
      { error: 'Webhook signature verification failed' },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'payment_intent.succeeded': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('💰 Payment received!', paymentIntent.id)
      
      // Update your order management system here
      // For example:
      // await updateOrderStatus(paymentIntent.metadata.orderId, 'paid')
      // await sendOrderConfirmationEmail(paymentIntent.receipt_email, paymentIntent.metadata)
      
      break
    }
    
    case 'payment_intent.payment_failed': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('❌ Payment failed:', paymentIntent.id)
      
      // Handle failed payment
      // await updateOrderStatus(paymentIntent.metadata.orderId, 'failed')
      // await sendPaymentFailedEmail(paymentIntent.receipt_email)
      
      break
    }
    
    case 'payment_intent.processing': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('🔄 Payment processing:', paymentIntent.id)
      
      // Update order status to processing
      // await updateOrderStatus(paymentIntent.metadata.orderId, 'processing')
      
      break
    }
    
    case 'payment_intent.requires_action': {
      const paymentIntent = event.data.object as Stripe.PaymentIntent
      console.log('⚡ Payment requires action:', paymentIntent.id)
      
      // Handle payments that require additional authentication
      // This is usually handled client-side, but you might want to log it
      
      break
    }
    
    default:
      console.log(`🤷‍♀️ Unhandled event type: ${event.type}`)
  }

  return NextResponse.json({ received: true })
}

// Disable body parsing for webhooks
export const dynamic = 'force-dynamic' 