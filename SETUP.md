# SEPAC — Supabase + Netlify Setup

This version replaces the old Express server with real Supabase (auth + database +
storage + realtime). It's now a pure static site — perfect for Netlify.

## 1. Create/open your Supabase project
Go to supabase.com/dashboard → your SEPAC project.

## 2. Run the database schema
- Open **SQL Editor → New query**
- Paste the entire contents of `supabase-schema.sql` (in this folder)
- Click **Run**

This creates all tables (profiles, posts, events, gallery, prayer requests, etc.),
security rules, an image storage bucket, and a trigger that auto-creates a profile
whenever someone signs up.

**Important:** `supabase-schema.sql`'s `handle_new_user()` trigger already lists two
emails (`jemuvalos@gmail.com` and `ian.mugisha011@gmail.com`) that automatically
become `super_admin` on signup. Edit that list in the SQL file — and the matching
`SUPER_ADMIN_EMAILS` constant in `AuthModal.tsx` and `AdminDashboard.tsx` — if you
ever need to add/remove a super admin email. Anyone else who registers starts as a
`member`.

## 3. Get your API keys
Project Settings → API:
- **Project URL**
- **anon public** key

## 4. Set environment variables
**Local dev:** copy `.env.example` to `.env` and fill in the two values above.

**Netlify:** Site settings → Environment variables → add:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

(These must have the `VITE_` prefix or Vite won't expose them to the browser.)

## 5. Push to GitHub, then deploy on Netlify
- Build command: `npm run build`
- Publish directory: `dist`
(`netlify.toml` in this folder already sets these, plus SPA routing, automatically.)

## 6. Confirm email settings (optional but recommended)
Supabase Auth → Providers → Email. By default Supabase requires email confirmation
before login works. You can use the confirmation email template you already set up,
or turn confirmation off for faster testing under Auth → Settings.

## What changed from the old version
- No more `server.ts` / Express / `database.json` — deleted, no longer needed.
- Login/register now use real Supabase Auth (`supabase.auth.signInWithPassword` /
  `signUp`) with actual passwords, not the old mock-password flow.
- All data (members, posts, events, gallery, prayers, announcements, ads, site
  settings) now lives in Postgres tables, defined in `supabase-schema.sql`.
- Live updates use Supabase Realtime instead of the old Server-Sent Events endpoint.
- Image uploads go to a public Supabase Storage bucket (`sepac-uploads`) instead of
  a local `/uploads` folder.
