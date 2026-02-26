-- =============================================
-- Fundació Predator — Supabase Schema
-- Run this in the Supabase SQL Editor
-- =============================================

-- Blog Posts (multilingual)
CREATE TABLE IF NOT EXISTS blog_posts (
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

-- Donations (Stripe payment log)
CREATE TABLE IF NOT EXISTS donations (
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
CREATE TABLE IF NOT EXISTS contact_submissions (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name text NOT NULL,
  email text NOT NULL,
  message text NOT NULL,
  page text,
  created_at timestamptz DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published_at DESC) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_donations_created ON donations(created_at DESC);
