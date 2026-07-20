-- ============================================================
-- Run this in Supabase Dashboard -> SQL Editor on your EXISTING
-- SEPAC project. It updates the signup trigger so BOTH emails
-- become super_admin automatically going forward.
-- ============================================================

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
    case
      when lower(new.email) in ('jemuvalos@gmail.com', 'ian.mugisha011@gmail.com') then 'super_admin'
      else 'member'
    end,
    true
  );
  return new;
end;
$$;

-- ------------------------------------------------------------
-- If ian.mugisha011@gmail.com ALREADY registered before this
-- migration (so is stuck as a regular member), run this too to
-- promote the existing account instead of waiting for a new signup:
-- ------------------------------------------------------------
update public.profiles
set role = 'super_admin', approved = true
where lower(email) = 'ian.mugisha011@gmail.com';
