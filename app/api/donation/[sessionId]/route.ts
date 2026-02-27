import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(
  _request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'DB not configured' }, { status: 500 });
  }

  const { data: donation, error } = await supabaseAdmin
    .from('fundacio_donations')
    .select('id, amount_cents, currency, project, donor_id, donor_name, donor_email')
    .eq('stripe_session_id', params.sessionId)
    .single();

  if (error || !donation) {
    return NextResponse.json({ error: 'Donation not found' }, { status: 404 });
  }

  let donor = null;
  if (donation.donor_id) {
    const { data } = await supabaseAdmin
      .from('fundacio_donors')
      .select('id, first_name, last_name, email, company, tax_id, address_line1, address_city, address_postal_code, address_country, newsletter_optin')
      .eq('id', donation.donor_id)
      .single();
    donor = data;
  }

  return NextResponse.json({
    donation: {
      amount_cents: donation.amount_cents,
      currency: donation.currency,
      project: donation.project,
    },
    donor: donor || {
      first_name: donation.donor_name?.split(' ')[0] || '',
      last_name: donation.donor_name?.split(' ').slice(1).join(' ') || '',
      email: donation.donor_email || '',
    },
  });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  if (!supabaseAdmin) {
    return NextResponse.json({ error: 'DB not configured' }, { status: 500 });
  }

  const { data: donation } = await supabaseAdmin
    .from('fundacio_donations')
    .select('donor_id')
    .eq('stripe_session_id', params.sessionId)
    .single();

  if (!donation?.donor_id) {
    return NextResponse.json({ error: 'Donation not found' }, { status: 404 });
  }

  const body = await request.json();
  const updates: Record<string, unknown> = {};

  if (body.first_name !== undefined) updates.first_name = body.first_name;
  if (body.last_name !== undefined) updates.last_name = body.last_name;
  if (body.company !== undefined) updates.company = body.company;
  if (body.tax_id !== undefined) updates.tax_id = body.tax_id;
  if (body.address_line1 !== undefined) updates.address_line1 = body.address_line1;
  if (body.address_city !== undefined) updates.address_city = body.address_city;
  if (body.address_postal_code !== undefined) updates.address_postal_code = body.address_postal_code;
  if (body.address_country !== undefined) updates.address_country = body.address_country;
  if (body.newsletter_optin !== undefined) updates.newsletter_optin = body.newsletter_optin;

  if (body.first_name && body.last_name) {
    updates.display_name = `${body.first_name} ${body.last_name}`;
  }

  const { error } = await supabaseAdmin
    .from('fundacio_donors')
    .update(updates)
    .eq('id', donation.donor_id);

  if (error) {
    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
