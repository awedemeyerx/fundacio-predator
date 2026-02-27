/**
 * Import/sync GiveWP CSV export into fundacio_donors + fundacio_donations
 *
 * Usage: node scripts/import-givewp-csv.mjs <path-to-csv>
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const envFile = readFileSync(resolve(__dirname, '..', '.env.local'), 'utf-8');
for (const line of envFile.split('\n')) {
  const match = line.match(/^([^#=]+)=["']?(.+?)["']?$/);
  if (match) process.env[match[1].trim()] = match[2].trim();
}

const supabase = createClient(process.env.supabase_url, process.env.supabase_secret_key);

// --- CSV column → field mapping ---
function parseAmount(str) {
  // "10,00" or "1.000,00" → number
  return parseFloat(str.replace(/\./g, '').replace(',', '.')) || 0;
}

function parseDate(dateStr, timeStr) {
  // "21. February 2024" "14:55" → ISO string
  const months = {
    January: '01', February: '02', March: '03', April: '04',
    May: '05', June: '06', July: '07', August: '08',
    September: '09', October: '10', November: '11', December: '12',
  };
  const m = dateStr.match(/(\d+)\.\s+(\w+)\s+(\d{4})/);
  if (!m) return null;
  const day = m[1].padStart(2, '0');
  const month = months[m[2]];
  if (!month) return null;
  return `${m[3]}-${month}-${day}T${timeStr || '00:00'}:00Z`;
}

function mapStatus(s) {
  if (s === 'Abgeschlossen') return 'completed';
  if (s === 'Fehlgeschlagen') return 'failed';
  if (s === 'Ausstehend') return 'pending';
  return 'completed';
}

function mapGateway(g) {
  if (g === 'stripe_payment_element') return 'stripe';
  if (g === 'paypal-commerce') return 'paypal';
  if (g === 'manual') return 'manual';
  return g;
}

// --- Campaign mapping: GiveWP form_id → fundacio campaign_id ---
// From DB: campaign 1 = christmas tree, campaign 4 = Spende, campaign 7 = Help us Help Others
const FORM_TO_CAMPAIGN = {
  1518: 7,  // Help us Help Others
  1589: 4,  // Spende
  2698: 1,  // christmas tree 2025 (new form, same campaign)
};

// Simple CSV parser that handles quoted fields with newlines
function parseCSV(text) {
  const rows = [];
  let headers = null;
  let current = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (inQuotes) {
      if (ch === '"' && text[i + 1] === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        current.push(field);
        field = '';
      } else if (ch === '\n' || ch === '\r') {
        if (ch === '\r' && text[i + 1] === '\n') i++;
        current.push(field);
        field = '';
        if (!headers) {
          headers = current;
        } else if (current.length === headers.length) {
          const obj = {};
          headers.forEach((h, idx) => obj[h] = current[idx] || '');
          rows.push(obj);
        }
        current = [];
      } else {
        field += ch;
      }
    }
  }
  // Last row
  if (field || current.length > 0) {
    current.push(field);
    if (headers && current.length === headers.length) {
      const obj = {};
      headers.forEach((h, idx) => obj[h] = current[idx] || '');
      rows.push(obj);
    }
  }
  return rows;
}

async function main() {
  const csvPath = process.argv[2];
  if (!csvPath) {
    console.error('Usage: node scripts/import-givewp-csv.mjs <path-to-csv>');
    process.exit(1);
  }

  const csvContent = readFileSync(csvPath, 'utf-8');
  const records = parseCSV(csvContent);

  console.log(`=== Parsed ${records.length} rows from CSV ===\n`);

  // Load existing donors + donations from DB
  const { data: dbDonors } = await supabase.from('fundacio_donors').select('id, email, wp_donor_id');
  const donorByEmail = new Map(dbDonors?.map(d => [d.email?.toLowerCase(), d]) || []);

  const { data: dbDonations } = await supabase.from('fundacio_donations').select('id, wp_donation_id, status');
  const donationByWpId = new Map(dbDonations?.filter(d => d.wp_donation_id).map(d => [d.wp_donation_id, d]) || []);

  let donorsInserted = 0;
  let donationsInserted = 0;
  let donationsUpdated = 0;

  for (const row of records) {
    const wpDonationId = parseInt(row['Spenden-ID']);
    const email = row['E-Mail-Adresse']?.toLowerCase().trim();
    const firstName = row['Vorname']?.trim() || null;
    const lastName = row['Nachname']?.trim() || null;
    const company = row['Name des Unternehmens']?.trim() || null;
    const amount = parseAmount(row['Spenden-Gesamtsumme']);
    const amountCents = Math.round(amount * 100);
    const status = mapStatus(row['Spendenstatus']);
    const gateway = mapGateway(row['Zahlungs-Gateway']);
    const formId = parseInt(row['Formular-ID']);
    const campaignId = FORM_TO_CAMPAIGN[formId] || null;
    const createdAt = parseDate(row['Spendendatum'], row['Spenden-Zeit']);
    const wpDonorId = parseInt(row['Spender-ID']);
    const displayName = [firstName, lastName].filter(Boolean).join(' ') || null;

    if (!email) {
      console.log(`  Skip donation ${wpDonationId} — no email`);
      continue;
    }

    // --- Upsert donor ---
    let donor = donorByEmail.get(email);
    if (!donor) {
      const { data: newDonor, error } = await supabase
        .from('fundacio_donors')
        .upsert({
          email,
          first_name: firstName,
          last_name: lastName,
          display_name: displayName,
          wp_donor_id: wpDonorId,
        }, { onConflict: 'email' })
        .select('id, email')
        .single();

      if (error) {
        console.error(`  Error upserting donor ${email}:`, error.message);
        continue;
      }
      donor = newDonor;
      donorByEmail.set(email, donor);
      donorsInserted++;
      console.log(`  + Donor: ${displayName} (${email})`);
    }

    // --- Check existing donation ---
    const existingDonation = donationByWpId.get(wpDonationId);
    if (existingDonation) {
      // Update status if it changed (e.g. completed → failed)
      if (existingDonation.status !== status) {
        const { error } = await supabase
          .from('fundacio_donations')
          .update({ status })
          .eq('id', existingDonation.id);
        if (!error) {
          donationsUpdated++;
          console.log(`  ~ Donation ${wpDonationId}: ${existingDonation.status} → ${status}`);
        }
      }
      continue;
    }

    // --- Insert new donation ---
    const donationRow = {
      amount_cents: amountCents,
      currency: 'eur',
      donor_name: displayName,
      donor_email: email,
      donor_id: donor.id,
      campaign_id: campaignId,
      status,
      gateway,
      wp_donation_id: wpDonationId,
      created_at: createdAt,
    };

    const { error: insertErr } = await supabase
      .from('fundacio_donations')
      .insert(donationRow);

    if (insertErr) {
      console.error(`  Error inserting donation ${wpDonationId}:`, insertErr.message);
    } else {
      donationsInserted++;
      console.log(`  + Donation ${wpDonationId}: ${displayName} ${amount}€ (${status})`);
    }
  }

  console.log(`\n--- Summary ---`);
  console.log(`  Donors inserted: ${donorsInserted}`);
  console.log(`  Donations inserted: ${donationsInserted}`);
  console.log(`  Donations updated: ${donationsUpdated}`);

  // --- Update donor aggregates ---
  console.log('\n--- Updating donor aggregates ---');
  const { data: allDonors } = await supabase.from('fundacio_donors').select('id');
  let aggregatesUpdated = 0;

  for (const d of (allDonors || [])) {
    const { data: donations } = await supabase
      .from('fundacio_donations')
      .select('amount_cents, created_at')
      .eq('donor_id', d.id)
      .eq('status', 'completed')
      .order('created_at', { ascending: true });

    if (!donations || donations.length === 0) {
      await supabase.from('fundacio_donors').update({
        total_donations: 0,
        total_spent_cents: 0,
        first_donation_at: null,
        last_donation_at: null,
      }).eq('id', d.id);
      continue;
    }

    const totalCents = donations.reduce((s, dd) => s + (dd.amount_cents || 0), 0);
    await supabase.from('fundacio_donors').update({
      total_donations: donations.length,
      total_spent_cents: totalCents,
      first_donation_at: donations[0].created_at,
      last_donation_at: donations[donations.length - 1].created_at,
    }).eq('id', d.id);
    aggregatesUpdated++;
  }

  console.log(`  Aggregates updated for ${aggregatesUpdated} donors`);
  console.log('\n=== Import Complete ===');
}

main().catch(console.error);
