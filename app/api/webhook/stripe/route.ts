import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

let stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET!);
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
          // Resolve campaign_id from slug if provided
          let campaignId = null;
          if (metadata.campaign) {
            const { data: campaignData } = await supabaseAdmin
              .from('fundacio_campaigns')
              .select('id')
              .eq('slug', metadata.campaign)
              .single();
            if (campaignData) campaignId = campaignData.id;
          }

          // Upsert donor profile
          let donorId = null;
          const donorEmail = session.customer_details?.email;
          const donorName = session.customer_details?.name || '';
          const nameParts = donorName.split(' ');
          const firstName = nameParts[0] || null;
          const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : null;

          if (donorEmail) {
            const { data: donor } = await supabaseAdmin
              .from('fundacio_donors')
              .upsert({
                email: donorEmail.toLowerCase().trim(),
                first_name: firstName,
                last_name: lastName,
                display_name: donorName || null,
              }, { onConflict: 'email' })
              .select('id')
              .single();

            if (donor) donorId = donor.id;
          }

          // Insert donation
          await supabaseAdmin.from('fundacio_donations').insert({
            stripe_session_id: session.id,
            amount_cents: session.amount_total || 0,
            currency: session.currency || 'eur',
            donor_name: donorName || null,
            donor_email: donorEmail || null,
            donor_id: donorId,
            project: metadata.project !== 'general' ? metadata.project : null,
            campaign_id: campaignId,
            gateway: 'stripe',
            status: 'completed',
          });

          // Update donor aggregates
          if (donorId) {
            const { data: stats } = await supabaseAdmin
              .from('fundacio_donations')
              .select('amount_cents, created_at')
              .eq('donor_id', donorId)
              .eq('status', 'completed')
              .order('created_at', { ascending: true });

            if (stats && stats.length > 0) {
              const totalCents = stats.reduce((sum, d) => sum + (d.amount_cents || 0), 0);
              await supabaseAdmin
                .from('fundacio_donors')
                .update({
                  total_donations: stats.length,
                  total_spent_cents: totalCents,
                  first_donation_at: stats[0].created_at,
                  last_donation_at: stats[stats.length - 1].created_at,
                })
                .eq('id', donorId);
            }
          }

          console.log('Donation logged to Supabase:', session.id);
        } catch (dbError) {
          console.error('Failed to log donation:', dbError);
        }
      }

      // Send confirmation email via Brevo
      const confirmEmail = session.customer_details?.email;
      if (confirmEmail && process.env.BREVO_API_KEY) {
        try {
          const { sendDonationConfirmation } = await import('@/lib/email');
          await sendDonationConfirmation({
            email: confirmEmail,
            name: session.customer_details?.name || '',
            amount: (session.amount_total || 0) / 100,
            project: metadata.project,
            lang: (metadata.lang as 'de' | 'en' | 'es') || 'de',
            sessionId: session.id,
          });
          console.log('Confirmation email sent to:', confirmEmail);
        } catch (emailError) {
          console.error('Failed to send confirmation email:', emailError);
        }
      }
    }
  }

  return NextResponse.json({ received: true });
}
