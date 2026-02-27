/**
 * Migrate GiveWP staging data → Fundació production tables
 *
 * Reads from:  fundacio_givewp_forms, fundacio_givewp_donors, fundacio_givewp_donations
 * Writes to:   fundacio_campaigns, fundacio_donors, fundacio_donations
 *
 * Usage: node scripts/migrate-givewp-to-fundacio.mjs
 *
 * Step 1: Run the printed SQL in the Supabase SQL Editor (schema changes)
 * Step 2: Re-run this script to migrate data
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// Load .env.local
const __dirname = dirname(fileURLToPath(import.meta.url));
const envFile = readFileSync(resolve(__dirname, '..', '.env.local'), 'utf-8');
for (const line of envFile.split('\n')) {
  const match = line.match(/^([^#=]+)=["']?(.+?)["']?$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const supabase = createClient(process.env.supabase_url, process.env.supabase_secret_key);

// --- Schema SQL (run in Supabase SQL Editor first) ---
const SCHEMA_SQL = `
-- 1. Create donors table
CREATE TABLE IF NOT EXISTS fundacio_donors (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  email TEXT UNIQUE,
  first_name TEXT,
  last_name TEXT,
  display_name TEXT,
  wp_donor_id BIGINT,
  total_donations INT DEFAULT 0,
  total_spent_cents BIGINT DEFAULT 0,
  first_donation_at TIMESTAMPTZ,
  last_donation_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add columns to fundacio_donations
ALTER TABLE fundacio_donations
  ADD COLUMN IF NOT EXISTS donor_id BIGINT REFERENCES fundacio_donors(id),
  ADD COLUMN IF NOT EXISTS gateway TEXT,
  ADD COLUMN IF NOT EXISTS transaction_id TEXT,
  ADD COLUMN IF NOT EXISTS wp_donation_id BIGINT,
  ADD COLUMN IF NOT EXISTS anonymous BOOLEAN DEFAULT FALSE;

-- 3. Add wp_form_id to fundacio_campaigns
ALTER TABLE fundacio_campaigns
  ADD COLUMN IF NOT EXISTS wp_form_id BIGINT;

-- 4. Indexes
CREATE INDEX IF NOT EXISTS idx_fundacio_donors_email ON fundacio_donors(email);
CREATE INDEX IF NOT EXISTS idx_fundacio_donations_donor ON fundacio_donations(donor_id);
CREATE INDEX IF NOT EXISTS idx_fundacio_donations_campaign ON fundacio_donations(campaign_id);

-- 5. Recreate campaign progress view (picks up new columns)
CREATE OR REPLACE VIEW fundacio_campaign_progress AS
SELECT c.*,
  COALESCE(SUM(d.amount_cents) FILTER (WHERE d.status = 'completed'), 0) AS raised_cents,
  CASE WHEN c.target_amount_cents > 0
    THEN ROUND(COALESCE(SUM(d.amount_cents) FILTER (WHERE d.status = 'completed'), 0)::numeric / c.target_amount_cents * 100, 1)
    ELSE 0
  END AS progress_percent
FROM fundacio_campaigns c
LEFT JOIN fundacio_donations d ON d.campaign_id = c.id
GROUP BY c.id;
`;

// --- Status mapping ---
function mapStatus(wpStatus) {
  if (!wpStatus) return 'completed';
  const s = wpStatus.toLowerCase().trim();
  if (s === 'publish' || s === 'complete' || s === 'completed' || s === 'abgeschlossen') return 'completed';
  if (s === 'pending') return 'pending';
  if (s === 'refunded') return 'refunded';
  if (s === 'failed' || s === 'cancelled' || s === 'abandoned') return 'failed';
  return 'completed';
}

// --- Check schema readiness ---
async function checkSchema() {
  // Check if fundacio_donors table exists
  const { error } = await supabase.from('fundacio_donors').select('id').limit(1);
  if (error) {
    console.log('Schema not ready. Run this SQL in the Supabase SQL Editor first:\n');
    console.log(SCHEMA_SQL);
    console.log('\nThen re-run this script.');
    process.exit(1);
  }
  console.log('  Schema OK.\n');
}

// --- Step 1: Migrate Donors ---
async function migrateDonors() {
  console.log('--- Migrating Donors ---');

  const { data: wpDonors, error } = await supabase
    .from('fundacio_givewp_donors')
    .select('*');

  if (error) {
    console.error('  Failed to read staging donors:', error.message);
    return;
  }

  console.log(`  Found ${wpDonors.length} GiveWP donors.`);
  let inserted = 0;
  let skipped = 0;

  for (const d of wpDonors) {
    if (!d.email) {
      console.log(`  Skipping donor ${d.wp_donor_id} — no email.`);
      skipped++;
      continue;
    }

    const row = {
      email: d.email.toLowerCase().trim(),
      first_name: d.first_name || null,
      last_name: d.last_name || null,
      display_name: d.display_name || null,
      wp_donor_id: d.wp_donor_id,
      total_donations: d.total_donations || 0,
      total_spent_cents: Math.round((d.total_spent || 0) * 100),
    };

    const { error: upsertErr } = await supabase
      .from('fundacio_donors')
      .upsert(row, { onConflict: 'email' });

    if (upsertErr) {
      console.error(`  Error upserting donor ${d.email}:`, upsertErr.message);
    } else {
      inserted++;
    }
  }

  console.log(`  Donors migrated: ${inserted} upserted, ${skipped} skipped.\n`);
}

// --- Step 2: Migrate Campaigns (Forms) ---
async function migrateCampaigns() {
  console.log('--- Migrating Campaigns (from GiveWP Forms) ---');

  const { data: wpForms, error } = await supabase
    .from('fundacio_givewp_forms')
    .select('*');

  if (error) {
    console.error('  Failed to read staging forms:', error.message);
    return;
  }

  console.log(`  Found ${wpForms.length} GiveWP forms.`);
  let inserted = 0;
  let skipped = 0;

  for (const f of wpForms) {
    // Check if slug already exists
    const { data: existing } = await supabase
      .from('fundacio_campaigns')
      .select('id')
      .eq('slug', f.slug)
      .maybeSingle();

    if (existing) {
      // Update wp_form_id on existing campaign
      await supabase
        .from('fundacio_campaigns')
        .update({ wp_form_id: f.id })
        .eq('id', existing.id);
      console.log(`  Slug "${f.slug}" exists (id=${existing.id}), linked wp_form_id=${f.id}.`);
      skipped++;
      continue;
    }

    const row = {
      slug: f.slug,
      name_de: f.title,
      name_en: f.title,
      name_es: f.title,
      description_de: f.content || null,
      description_en: null,
      description_es: null,
      target_amount_cents: 0,
      active: f.status === 'publish',
      wp_form_id: f.id,
      created_at: f.created_at || new Date().toISOString(),
    };

    const { error: insertErr } = await supabase
      .from('fundacio_campaigns')
      .insert(row);

    if (insertErr) {
      console.error(`  Error inserting campaign "${f.slug}":`, insertErr.message);
    } else {
      inserted++;
    }
  }

  console.log(`  Campaigns migrated: ${inserted} inserted, ${skipped} existing linked.\n`);
}

// --- Step 3: Migrate Donations ---
async function migrateDonations() {
  console.log('--- Migrating Donations ---');

  // Load lookup maps
  const { data: donors } = await supabase
    .from('fundacio_donors')
    .select('id, email, wp_donor_id');
  const donorByWpId = new Map(donors?.map(d => [d.wp_donor_id, d]) || []);

  const { data: campaigns } = await supabase
    .from('fundacio_campaigns')
    .select('id, wp_form_id');
  const campaignByWpFormId = new Map(campaigns?.filter(c => c.wp_form_id).map(c => [c.wp_form_id, c.id]) || []);

  // Load WP donor emails for lookup (donor_id in staging references wp_donor_id)
  const { data: wpDonors } = await supabase
    .from('fundacio_givewp_donors')
    .select('wp_donor_id, email');
  const wpDonorEmailById = new Map(wpDonors?.map(d => [d.wp_donor_id, d.email?.toLowerCase().trim()]) || []);

  const { data: wpDonations, error } = await supabase
    .from('fundacio_givewp_donations')
    .select('*');

  if (error) {
    console.error('  Failed to read staging donations:', error.message);
    return;
  }

  console.log(`  Found ${wpDonations.length} GiveWP donations.`);
  let inserted = 0;
  let skipped = 0;

  for (const d of wpDonations) {
    // Check if already migrated
    const { data: existing } = await supabase
      .from('fundacio_donations')
      .select('id')
      .eq('wp_donation_id', d.wp_donation_id)
      .maybeSingle();

    if (existing) {
      skipped++;
      continue;
    }

    // Resolve donor_id: staging donor_id → wp_donor_id → email → fundacio_donors.id
    let donorId = null;
    if (d.donor_id) {
      const donor = donorByWpId.get(d.donor_id);
      if (donor) donorId = donor.id;
    }

    // Resolve campaign_id via wp_form_id
    let campaignId = null;
    if (d.form_id) {
      campaignId = campaignByWpFormId.get(d.form_id) || null;
    }

    const row = {
      amount_cents: Math.round((d.amount || 0) * 100),
      currency: (d.currency || 'EUR').toLowerCase(),
      donor_name: null,
      donor_email: null,
      status: mapStatus(d.status),
      campaign_id: campaignId,
      donor_id: donorId,
      gateway: d.gateway || null,
      transaction_id: d.transaction_id || null,
      wp_donation_id: d.wp_donation_id,
      anonymous: d.anonymous || false,
      created_at: d.date || new Date().toISOString(),
    };

    // Fill donor_name/email from wp donor data
    if (d.donor_id) {
      const email = wpDonorEmailById.get(d.donor_id);
      if (email) row.donor_email = email;
      const donor = donorByWpId.get(d.donor_id);
      if (donor) {
        // Get the full donor record for name
        const { data: fullDonor } = await supabase
          .from('fundacio_donors')
          .select('first_name, last_name, display_name')
          .eq('id', donor.id)
          .single();
        if (fullDonor) {
          row.donor_name = fullDonor.display_name
            || [fullDonor.first_name, fullDonor.last_name].filter(Boolean).join(' ')
            || null;
        }
      }
    }

    const { error: insertErr } = await supabase
      .from('fundacio_donations')
      .insert(row);

    if (insertErr) {
      console.error(`  Error inserting donation wp_id=${d.wp_donation_id}:`, insertErr.message);
    } else {
      inserted++;
    }
  }

  console.log(`  Donations migrated: ${inserted} inserted, ${skipped} already existed.\n`);
}

// --- Step 4: Update donor aggregates from actual donations ---
async function updateDonorAggregates() {
  console.log('--- Updating Donor Aggregates ---');

  const { data: donors } = await supabase
    .from('fundacio_donors')
    .select('id');

  if (!donors) return;

  let updated = 0;
  for (const donor of donors) {
    const { data: donations } = await supabase
      .from('fundacio_donations')
      .select('amount_cents, created_at')
      .eq('donor_id', donor.id)
      .eq('status', 'completed')
      .order('created_at', { ascending: true });

    if (!donations || donations.length === 0) continue;

    const totalCents = donations.reduce((sum, d) => sum + (d.amount_cents || 0), 0);
    const { error } = await supabase
      .from('fundacio_donors')
      .update({
        total_donations: donations.length,
        total_spent_cents: totalCents,
        first_donation_at: donations[0].created_at,
        last_donation_at: donations[donations.length - 1].created_at,
      })
      .eq('id', donor.id);

    if (!error) updated++;
  }

  console.log(`  Updated aggregates for ${updated} donors.\n`);
}

// --- Main ---
async function main() {
  console.log('=== GiveWP → Fundació Migration ===\n');

  await checkSchema();
  await migrateDonors();
  await migrateCampaigns();
  await migrateDonations();
  await updateDonorAggregates();

  console.log('=== Migration Complete ===');
}

main().catch(console.error);
