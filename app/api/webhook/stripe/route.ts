import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

let stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  }
  return stripe;
}

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', errorMessage);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status === 'paid') {
      const metadata = session.metadata || {};

      // Log donation to Supabase
      if (supabaseAdmin) {
        try {
          await supabaseAdmin.from('donations').insert({
            stripe_session_id: session.id,
            amount_cents: session.amount_total || 0,
            currency: session.currency || 'eur',
            donor_name: session.customer_details?.name || null,
            donor_email: session.customer_details?.email || null,
            project: metadata.project !== 'general' ? metadata.project : null,
            status: 'completed',
          });
          console.log('Donation logged to Supabase:', session.id);
        } catch (dbError) {
          console.error('Failed to log donation:', dbError);
        }
      }

      // Send confirmation email via Brevo
      const donorEmail = session.customer_details?.email;
      if (donorEmail && process.env.BREVO_API_KEY) {
        try {
          const { sendDonationConfirmation } = await import('@/lib/email');
          await sendDonationConfirmation({
            email: donorEmail,
            name: session.customer_details?.name || '',
            amount: (session.amount_total || 0) / 100,
            project: metadata.project,
            lang: (metadata.lang as 'de' | 'en' | 'es') || 'de',
          });
          console.log('Confirmation email sent to:', donorEmail);
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
