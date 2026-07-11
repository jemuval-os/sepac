-- ============================================================
-- SEPAC — Supabase schema
-- Run this once in: Supabase Dashboard -> SQL Editor -> New query -> Run
-- ============================================================

create extension if not exists "pgcrypto";

-- ------------------------------------------------------------
-- PROFILES (extends Supabase auth.users)
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  name text not null,
  graduation_year int,
  years_studied text,
  phone text,
  bio text,
  avatar_url text,
  school_photo_url text,
  role text not null default 'member' check (role in ('member','moderator','admin','super_admin')),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- Helper: is the current logged-in user an admin/super_admin?
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role in ('admin','super_admin') and approved = true
  );
$$;

-- Auto-create a profile row whenever someone signs up via Supabase Auth.
-- The first-ever account with this email becomes super_admin automatically —
-- change the email below to whichever address should be the site owner.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, name, graduation_year, years_studied, phone, bio, avatar_url, school_photo_url, role, approved)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    nullif(new.raw_user_meta_data->>'graduation_year','')::int,
    new.raw_user_meta_data->>'years_studied',
    new.raw_user_meta_data->>'phone',
    new.raw_user_meta_data->>'bio',
    new.raw_user_meta_data->>'avatar_url',
    new.raw_user_meta_data->>'school_photo_url',
    case when new.email = 'jemuvalos@gmail.com' then 'super_admin' else 'member' end,
    true
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ------------------------------------------------------------
-- POSTS / COMMENTS / LIKES
-- ------------------------------------------------------------
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  content text not null,
  author_id uuid references public.profiles(id),
  author_name text,
  author_avatar text,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  category text not null check (category in ('News','Events','Devotional','Announcement')),
  image_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade,
  author_id uuid references public.profiles(id),
  author_name text,
  author_avatar text,
  content text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.likes (
  post_id uuid references public.posts(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  primary key (post_id, user_id)
);

-- ------------------------------------------------------------
-- EVENTS
-- ------------------------------------------------------------
create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  date timestamptz,
  location text,
  image_url text,
  rsvps uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- GALLERY
-- ------------------------------------------------------------
create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  uploader_id uuid references public.profiles(id),
  uploader_name text,
  event_tag text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- PRAYER REQUESTS
-- ------------------------------------------------------------
create table if not exists public.prayer_requests (
  id uuid primary key default gen_random_uuid(),
  content text not null,
  author_id uuid references public.profiles(id),
  author_name text,
  author_avatar text,
  visibility text not null default 'public' check (visibility in ('public','private')),
  praying_users uuid[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.prayer_comments (
  id uuid primary key default gen_random_uuid(),
  prayer_id uuid references public.prayer_requests(id) on delete cascade,
  author_id uuid references public.profiles(id),
  author_name text,
  author_avatar text,
  content text not null,
  created_at timestamptz not null default now()
);

-- ------------------------------------------------------------
-- ANNOUNCEMENTS / ADVERTISEMENTS / SITE SETTINGS
-- ------------------------------------------------------------
create table if not exists public.announcements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  body text not null,
  sent_by text,
  created_at timestamptz not null default now()
);

create table if not exists public.advertisements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  image_url text,
  link text,
  created_at timestamptz not null default now()
);

create table if not exists public.site_settings (
  id int primary key default 1,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);
insert into public.site_settings (id, data) values (1, '{
  "historyTitle_en": "Our History",
  "historyTitle_rw": "Amateka Yacu",
  "historyText1_en": "SEPAC was founded to unite alumni of ES Saint Esprit around faith, fellowship, and service.",
  "historyText1_rw": "SEPAC yashinzwe kugira ngo ihuze abanyeshuri ba ES Saint Esprit mu kwizera, ubumwe n''\''umurimo.",
  "historyText2_en": "",
  "historyText2_rw": "",
  "missionTitle_en": "Our Mission",
  "missionTitle_rw": "Intego Yacu",
  "missionText_en": "To strengthen the bond between alumni through unity, faith, fellowship, and service.",
  "missionText_rw": "Gushimangira umubano hagati y''\''abanyeshuri binyuze mu bumwe, kwizera, ubumwe n''\''umurimo.",
  "visionTitle_en": "Our Vision",
  "visionTitle_rw": "Icyerekezo Cyacu",
  "visionText_en": "A thriving, connected community rooted in Christian values.",
  "visionText_rw": "Umuryango unyuranye kandi uhuriweho, ushingiye ku mahame ya gikristo.",
  "leadershipTeam": [],
  "contacts": {
    "email": "sepacnyanza@gmail.com",
    "phones": ["+250 796 409 467", "+250 786 047 305", "+250 796 379 882"],
    "address_en": "ES Saint Esprit, Nyanza, Rwanda",
    "address_rw": "ES Saint Esprit, Nyanza, u Rwanda"
  }
}'::jsonb) on conflict (id) do nothing;

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================
alter table public.profiles enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.likes enable row level security;
alter table public.events enable row level security;
alter table public.gallery_items enable row level security;
alter table public.prayer_requests enable row level security;
alter table public.prayer_comments enable row level security;
alter table public.announcements enable row level security;
alter table public.advertisements enable row level security;
alter table public.site_settings enable row level security;

-- Profiles: everyone can view the member directory; users edit their own row;
-- admins can edit any row (needed for approving members / changing roles).
create policy "profiles_select_all" on public.profiles for select using (true);
create policy "profiles_update_own" on public.profiles for update using (auth.uid() = id);
create policy "profiles_update_admin" on public.profiles for update using (public.is_admin());
create policy "profiles_delete_admin" on public.profiles for delete using (public.is_admin());

-- Posts: approved posts are public; authors see their own pending/rejected posts; admins see all.
create policy "posts_select" on public.posts for select using (
  status = 'approved' or author_id = auth.uid() or public.is_admin()
);
create policy "posts_insert_own" on public.posts for insert with check (auth.uid() = author_id);
create policy "posts_update_admin" on public.posts for update using (public.is_admin());
create policy "posts_delete_admin" on public.posts for delete using (public.is_admin());

-- Comments: readable by anyone; only the comment author can insert as themselves.
create policy "comments_select" on public.comments for select using (true);
create policy "comments_insert_own" on public.comments for insert with check (auth.uid() = author_id);
create policy "comments_delete_admin" on public.comments for delete using (public.is_admin() or auth.uid() = author_id);

-- Likes: readable by anyone; users toggle their own like only.
create policy "likes_select" on public.likes for select using (true);
create policy "likes_insert_own" on public.likes for insert with check (auth.uid() = user_id);
create policy "likes_delete_own" on public.likes for delete using (auth.uid() = user_id);

-- Events: public read; admin-managed.
create policy "events_select" on public.events for select using (true);
create policy "events_insert_admin" on public.events for insert with check (public.is_admin());
create policy "events_update" on public.events for update using (public.is_admin() or auth.uid() is not null);
create policy "events_delete_admin" on public.events for delete using (public.is_admin());

-- Gallery: approved photos public; uploader sees their own pending ones; admins see all.
create policy "gallery_select" on public.gallery_items for select using (
  approved = true or uploader_id = auth.uid() or public.is_admin()
);
create policy "gallery_insert_own" on public.gallery_items for insert with check (auth.uid() = uploader_id);
create policy "gallery_update_admin" on public.gallery_items for update using (public.is_admin());
create policy "gallery_delete_admin" on public.gallery_items for delete using (public.is_admin() or uploader_id = auth.uid());

-- Prayer requests: public ones visible to all; private ones visible to author + admin.
create policy "prayers_select" on public.prayer_requests for select using (
  visibility = 'public' or author_id = auth.uid() or public.is_admin()
);
create policy "prayers_insert_own" on public.prayer_requests for insert with check (auth.uid() = author_id);
create policy "prayers_update" on public.prayer_requests for update using (auth.uid() is not null);
create policy "prayers_delete_admin" on public.prayer_requests for delete using (public.is_admin() or auth.uid() = author_id);

create policy "prayer_comments_select" on public.prayer_comments for select using (true);
create policy "prayer_comments_insert_own" on public.prayer_comments for insert with check (auth.uid() = author_id);
create policy "prayer_comments_delete_admin" on public.prayer_comments for delete using (public.is_admin() or auth.uid() = author_id);

-- Announcements: public read; admin write.
create policy "announcements_select" on public.announcements for select using (true);
create policy "announcements_insert_admin" on public.announcements for insert with check (public.is_admin());
create policy "announcements_delete_admin" on public.announcements for delete using (public.is_admin());

-- Advertisements: public read; admin write/delete.
create policy "ads_select" on public.advertisements for select using (true);
create policy "ads_insert_admin" on public.advertisements for insert with check (public.is_admin());
create policy "ads_delete_admin" on public.advertisements for delete using (public.is_admin());

-- Site settings: public read; admin write.
create policy "settings_select" on public.site_settings for select using (true);
create policy "settings_update_admin" on public.site_settings for update using (public.is_admin());

-- ============================================================
-- STORAGE (profile photos, post/event/gallery images)
-- ============================================================
insert into storage.buckets (id, name, public)
values ('sepac-uploads', 'sepac-uploads', true)
on conflict (id) do nothing;

create policy "sepac_uploads_public_read"
  on storage.objects for select
  using (bucket_id = 'sepac-uploads');

create policy "sepac_uploads_authenticated_write"
  on storage.objects for insert
  with check (bucket_id = 'sepac-uploads' and auth.role() = 'authenticated');

-- ============================================================
-- REALTIME
-- ============================================================
alter publication supabase_realtime add table
  public.profiles, public.posts, public.comments, public.likes,
  public.events, public.gallery_items, public.prayer_requests,
  public.prayer_comments, public.announcements, public.advertisements,
  public.site_settings;
