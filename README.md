# Fundació Predator

Website und Admin-System der Fundació Predator — einer gemeinnützigen Stiftung auf Mallorca, die Sozialprojekte für bedürftige Familien und Kinder unterstützt.

**Live:** [fundaciopredator.org](https://fundaciopredator.org)

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS mit Custom Design System (warm-white, charcoal, amber, gold, forest)
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe Checkout
- **Storage:** Vercel Blob (Bilder, Uploads)
- **Deployment:** Vercel (auto-deploy from `main`)
- **Email:** Brevo (Transaktions-E-Mails, Benachrichtigungen)

## Projektstruktur

```
app/
  [lang]/                   # i18n (de/en/es)
    page.tsx                # Homepage
    projekte/               # Projektübersicht + Detailseiten
    blog/[slug]/            # Blog mit ISR (revalidate=300)
    spenden/                # Spendenformular + Danke-Seite
    ueber-uns/              # Über uns
    kampagne/               # Dynamische Kampagnenseiten (DB)
    impressum/              # Rechtliches
    datenschutz/
  admin/                    # Admin-Panel (geschützt)
    dashboard/              # KPIs, Statistiken
    blog/                   # Blog-Editor (BlockNote WYSIWYG)
    links/                  # Link-in-Bio Verwaltung
    campaigns/              # Projekt-/Kampagnen-Verwaltung
    donations/              # Spendenübersicht
    donors/                 # Spenderliste mit Detailansicht
    contacts/               # Kontaktanfragen/Nachrichten
    users/                  # Benutzerverwaltung (Einladung per Magic Link)
    profile/                # Profilseite mit Google-Verknüpfung
  api/
    checkout/               # Stripe Checkout Session
    admin/                  # Admin API-Endpunkte
      blog/                 # CRUD + on-demand Revalidation
      links/                # Link-in-Bio CRUD
      donors/               # Spenderdaten
      donations/            # Spendendaten
      contacts/             # Kontaktanfragen
      users/                # Benutzerverwaltung + Einladungen
      upload/               # Vercel Blob Upload

components/
  layout/                   # Header, Footer, Navigation
  sections/                 # Homepage-Sektionen (Hero, ProjectsPreview, etc.)
  admin/                    # Admin-Komponenten (Sidebar, DataTable, BlogPostForm, etc.)
  ui/                       # Shared UI (FadeIn, StatsCard, etc.)

lib/
  supabase.ts               # Supabase Client
  blog.ts                   # Blog-Hilfsfunktionen
  admin-auth.ts             # Admin-Authentifizierung
  site.config.ts            # Projektkonfiguration
  hreflang.ts               # i18n URL-Helfer
  link-icons.tsx            # Link-in-Bio Icon-Set
```

## Projekte

Vier Sozialprojekte (hardcoded in `lib/site.config.ts` und `app/[lang]/projekte/[slug]/page.tsx`):

1. **EducaClowns** — Clown-Therapie für Kinder in Krankenhäusern
2. **Si Mallorca** — Sachspenden und Soforthilfe für bedürftige Familien
3. **Pollença** — Musikschule für benachteiligte Kinder
4. **SOS Mamás** — Unterstützung für alleinerziehende Mütter

## Admin-System

- **Rollen:** Admin (voller Zugriff) und Editor (Blog-Zugriff)
- **Auth:** Supabase Auth mit Magic Link + optionalem Google OAuth
- **Einladung:** Admin lädt per E-Mail ein → Magic Link → Dashboard
- **Blog-Editor:** BlockNote WYSIWYG mit Cover-Bild (Drag & Drop, Focal Point), Auto-Save, SEO-Autopilot (KI-gestützte Übersetzung + SEO-Generierung), Tags
- **Spenden:** Stripe-Integration mit Zuordnung zu Projekten, Spenderprofile mit Spendenhistorie

## Internationalisierung

Drei Sprachen: Deutsch (Standard), Englisch, Spanisch. URL-Struktur:
- `/` (DE), `/en/` (EN), `/es/` (ES)
- Blog-Slugs sind pro Sprache individuell

## Deployment

```bash
git push origin main    # Vercel deployt automatisch
```

Kein lokaler Dev-Server nötig — direkt auf main pushen und auf Vercel prüfen.

## Datenbank-Tabellen (Supabase)

- `fundacio_blog_posts` — Blog-Beiträge (trilingual)
- `fundacio_blog_comments` — Blog-Kommentare
- `fundacio_blog_likes` — Blog-Likes
- `fundacio_donations` — Stripe-Spenden
- `fundacio_donors` — Spenderprofile (aggregiert)
- `fundacio_contacts` — Kontaktanfragen
- `fundacio_admin_users` — Admin-Benutzer mit Rollen
- `fundacio_campaigns` — Kampagnen/Projekte (dynamisch)
- `link_in_bio` — Link-in-Bio Einträge

## Entwicklungshistorie

### Phase 1–2: Grundgerüst
- Next.js Setup mit i18n (DE/EN/ES), Design System, Core Pages

### Phase 3: Spenden + Kontakt
- Stripe Checkout, Kontaktformular mit E-Mail-Benachrichtigung, Cookie Consent

### Phase 4: Blog + Design
- WordPress-Import (9 Beiträge x 3 Sprachen), Blog-System mit Likes/Kommentaren, Vercel Blob für Bilder

### Phase 5: Admin-System
- Benutzerverwaltung mit Rollen (Admin/Editor)
- Google OAuth Login + Account-Verknüpfung
- Magic Link Einladungen via Brevo
- Blog-Editor: BlockNote WYSIWYG, Cover-Upload, Focal Point, Auto-Save
- SEO-Autopilot: KI-gestützte Keyword-Recherche + Übersetzung

### Phase 6: Spenderverwaltung + UI-Polish
- Spender-Dashboard mit Suchfunktion und Detailansicht
- Klickbare Spenden mit Modal (Stripe-Session, Spenderdetails)
- Animierte Statistik-Karten, Admin-UI-Verfeinerungen
- Link-in-Bio Feature mit Icon-Picker

### Phase 7: Projekte + Content
- Si Mallorca als 4. Projekt mit trilingualem Content
- Vercel Blob für Projektbilder (optimierte Auslieferung via next/image)
- Weihnachtsaktion-Galerie mit Verlinkung zum Blog
- Projektreihenfolge: EducaClowns → Si Mallorca → Pollença → SOS Mamás

### Bugfixes & Optimierungen
- Blog-Editor: Zeilenumbrüche bleiben beim Speichern erhalten (onChange-Guard)
- Link-Erstellung: Fehlerbehandlung + Auth-Checks + DB-Tabelle
- Blog-Cover: On-demand Revalidation bei Admin-Änderungen (statt nur ISR)
- Passwort-Reset: PKCE Code Exchange, Client-Side Callback
- Diverse Auth-Fixes: Invite-Links, Session-Sync, Email-Scanner-Schutz
