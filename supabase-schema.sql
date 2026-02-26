-- =============================================
-- Fundació Predator — Supabase Schema
-- Run this in the Supabase SQL Editor
-- =============================================

-- Blog Posts (multilingual)
CREATE TABLE IF NOT EXISTS fundacio_blog_posts (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug_de text UNIQUE NOT NULL,
  slug_en text UNIQUE NOT NULL,
  slug_es text UNIQUE NOT NULL,
  title_de text NOT NULL,
  title_en text NOT NULL,
  title_es text NOT NULL,
  content_de text,
  content_en text,
  content_es text,
  excerpt_de text,
  excerpt_en text,
  excerpt_es text,
  cover_image_url text,
  author text DEFAULT 'Fundació Predator',
  active boolean DEFAULT true,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Add created_by_email to blog posts for editor ownership
ALTER TABLE fundacio_blog_posts ADD COLUMN IF NOT EXISTS created_by_email text;

-- Donations (Stripe payment log)
CREATE TABLE IF NOT EXISTS fundacio_donations (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  stripe_session_id text UNIQUE,
  amount_cents integer NOT NULL,
  currency text DEFAULT 'eur',
  donor_name text,
  donor_email text,
  project text,
  status text DEFAULT 'completed',
  created_at timestamptz DEFAULT now()
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS fundacio_contact_submissions (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  page text,
  created_at timestamptz DEFAULT now()
);

-- Campaigns
CREATE TABLE IF NOT EXISTS fundacio_campaigns (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name_de text NOT NULL,
  name_en text NOT NULL,
  name_es text NOT NULL,
  description_de text,
  description_en text,
  description_es text,
  target_amount_cents integer NOT NULL,
  cover_image_url text,
  active boolean DEFAULT true,
  start_date date,
  end_date date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add campaign_id to donations
ALTER TABLE fundacio_donations ADD COLUMN IF NOT EXISTS campaign_id bigint REFERENCES fundacio_campaigns(id);

-- Campaign progress view
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

-- Admin Users (role-based access)
CREATE TABLE IF NOT EXISTS fundacio_admin_users (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  auth_uid uuid UNIQUE NOT NULL,
  email text UNIQUE NOT NULL,
  name text,
  avatar_url text,
  role text NOT NULL DEFAULT 'editor',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_fundacio_blog_posts_published ON fundacio_blog_posts(published_at DESC) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_fundacio_donations_created ON fundacio_donations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_fundacio_campaigns_active ON fundacio_campaigns(active) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_fundacio_admin_users_auth_uid ON fundacio_admin_users(auth_uid);
CREATE INDEX IF NOT EXISTS idx_fundacio_admin_users_email ON fundacio_admin_users(email);
