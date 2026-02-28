-- Link-in-Bio table
CREATE TABLE IF NOT EXISTS link_in_bio (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title_en text NOT NULL DEFAULT '',
  title_de text NOT NULL DEFAULT '',
  title_es text NOT NULL DEFAULT '',
  url text NOT NULL,
  icon text DEFAULT NULL,
  sort_order int NOT NULL DEFAULT 0,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE link_in_bio ENABLE ROW LEVEL SECURITY;

-- Public can read active links (for the /link page)
CREATE POLICY "Public read active links" ON link_in_bio
  FOR SELECT USING (active = true);
