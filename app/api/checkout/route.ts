import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

let stripe: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripe) {
    stripe = new Stripe(process.env.STRIPE_SECRET!);
  }
  return stripe;
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://fundaciopredator.org';

export async function POST(request: NextRequest) {
  try {
    const { amount, project, lang, campaign } = await request.json();

    if (!amount || amount < 1) {
      return NextResponse.json({ error: 'Invalid amount' }, { status: 400 });
    }

    const langKey = lang || 'de';
    const projectNames: Record<string, string> = {
      educaclowns: 'EducaClowns',
      'si-mallorca': 'Si Mallorca',
      pollenca: 'Pollença',
      'sos-mamas': 'SOS Mamás',
      blog: 'Blog',
    };
    const projectLabel = project ? projectNames[project] || project : null;

    const description = projectLabel
      ? `Spende für ${projectLabel}`
      : 'Allgemeine Spende / General Donation';

    const session = await getStripe().checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'eur',
            product_data: {
              name: 'Fundació Predator — Spende / Donation',
              description,
            },
            unit_amount: amount * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        type: 'donation',
        project: project || 'general',
        lang: langKey,
        ...(campaign ? { campaign } : {}),
      },
      success_url: `${BASE_URL}${langKey === 'de' ? '' : `/${langKey}`}/spenden/danke?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${BASE_URL}${langKey === 'de' ? '' : `/${langKey}`}/spenden?donation=cancelled`,
      locale: langKey === 'de' ? 'de' : langKey === 'es' ? 'es' : 'en',
      submit_type: 'donate',
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);

    if (error instanceof Stripe.errors.StripeError) {
      return NextResponse.json(
        { error: error.message },
        { status: error.statusCode || 500 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
