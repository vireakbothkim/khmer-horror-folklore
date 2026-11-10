-- Khmer Horror Folklore: database schema
--
-- Recorded from the live Supabase project's structure (tables, constraints,
-- functions, triggers, policies, and the photos bucket). It holds no data and
-- no keys. Intended for a FRESH Supabase project: run it once in the SQL editor.
-- Untested as a single script; if it fails partway, fix the failing statement
-- and rerun from there.

-- =========================================================
-- Tables
-- =========================================================

create table public.profiles (
  id uuid not null,
  username text not null,
  created_at timestamptz not null default now(),
  constraint profiles_pkey primary key (id),
  constraint profiles_id_fkey foreign key (id) references auth.users (id) on delete cascade,
  constraint profiles_username_check check (
    char_length(trim(both from username)) >= 3
    and char_length(trim(both from username)) <= 30
  )
);

-- Usernames are unique, ignoring capitals and surrounding spaces.
create unique index profiles_username_unique
  on public.profiles (lower(trim(both from username)));

create table public.reviewers (
  user_id uuid not null,
  constraint reviewers_pkey primary key (user_id),
  constraint reviewers_user_id_fkey foreign key (user_id) references auth.users (id)
);

create table public.entries (
  id uuid not null default gen_random_uuid(),
  created_at timestamptz not null default now(),
  owner uuid not null,
  title_en text not null,
  title_km text,
  contributor text,
  appearance_en text,
  appearance_km text,
  story_en text not null,
  story_km text,
  source_en text not null,
  source_km text,
  place_en text not null,
  place_km text,
  media text,
  status text not null default 'pending',
  return_notes text,
  returned_at timestamptz,
  constraint entries_pkey primary key (id),
  constraint entries_owner_fkey foreign key (owner) references auth.users (id),
  constraint entries_status_check check (status = any (array['pending'::text, 'published'::text, 'returned'::text])),
  constraint title_en_length_check check (char_length(trim(both from title_en)) between 3 and 50),
  constraint title_km_length_check check (title_km is null or char_length(trim(both from title_km)) between 3 and 100),
  constraint appearance_en_length_check check (appearance_en is null or char_length(trim(both from appearance_en)) between 10 and 500),
  constraint appearance_km_length_check check (appearance_km is null or char_length(trim(both from appearance_km)) between 10 and 1000),
  constraint story_en_length_check check (char_length(trim(both from story_en)) between 50 and 1000),
  constraint story_km_length_check check (story_km is null or char_length(trim(both from story_km)) between 75 and 2000),
  constraint source_en_length_check check (char_length(trim(both from source_en)) between 5 and 200),
  constraint source_km_length_check check (source_km is null or char_length(trim(both from source_km)) between 10 and 500),
  constraint place_en_length_check check (char_length(trim(both from place_en)) between 5 and 200),
  constraint place_km_length_check check (place_km is null or char_length(trim(both from place_km)) between 5 and 500)
);

-- =========================================================
-- Row-level security
-- =========================================================

alter table public.profiles enable row level security;
alter table public.reviewers enable row level security;
alter table public.entries enable row level security;

-- reviewers has no policies on purpose: nobody reads or writes it directly.
-- is_reviewer() reads it because it is SECURITY DEFINER.

create policy "anyone can read profiles"
  on public.profiles for select
  to public
  using (true);

create policy "anyone can read published entries"
  on public.entries for select
  to public
  using (
    status = 'published'
    or (select auth.uid()) = owner
    or (select public.is_reviewer())
  );

create policy "owners add their own entries"
  on public.entries for insert
  to authenticated
  with check (
    (select auth.uid()) = owner
    and status = 'pending'
  );

create policy "owners edit their own entries"
  on public.entries for update
  to authenticated
  using ((select auth.uid()) = owner)
  with check (
    (select auth.uid()) = owner
    and (status = 'pending' or (select public.is_reviewer()))
  );

create policy "owners delete their own entries"
  on public.entries for delete
  to authenticated
  using (auth.uid() = owner);

-- =========================================================
-- Functions
-- =========================================================

-- Creates the profile when someone signs up.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, username)
  values (new.id, trim(new.raw_user_meta_data->>'username'));
  return new;
end;
$$;

-- Copies the owner's username into contributor. Runs on INSERT only.
create or replace function public.set_entry_contributor()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.contributor := (select username from public.profiles where id = new.owner);
  return new;
end;
$$;

create or replace function public.is_reviewer()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.reviewers where user_id = (select auth.uid()));
$$;

-- The review gate. Only reviewers can publish or return a pending entry.
create or replace function public.review_entry(entry_id uuid, decision text, notes text default null)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_reviewer() then return false; end if;
  if decision not in ('published', 'returned') then return false; end if;
  update public.entries
  set status = decision,
      return_notes = case when decision = 'returned' then notes else return_notes end,
      returned_at = case when decision = 'returned' then now() else returned_at end
  where id = entry_id and status = 'pending';
  return found;
end;
$$;

-- Returns the return note to the entry's owner only.
create or replace function public.get_return_notes(entry_id uuid)
returns table(return_notes text, returned_at timestamptz)
language sql
stable
security definer
set search_path = ''
as $$
  select e.return_notes, e.returned_at
  from public.entries e
  where e.id = get_return_notes.entry_id
    and e.owner = (select auth.uid());
$$;

-- Logged-out visitors must not run the review gate or the note reader.
revoke execute on function public.review_entry(uuid, text, text) from public, anon;
revoke execute on function public.get_return_notes(uuid) from public, anon;
grant execute on function public.review_entry(uuid, text, text) to authenticated;
grant execute on function public.get_return_notes(uuid) to authenticated;

-- =========================================================
-- Triggers
-- =========================================================

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create trigger entries_set_contributor
  before insert on public.entries
  for each row execute function public.set_entry_contributor();

-- =========================================================
-- Photo storage
-- =========================================================

-- Public bucket: photos are shown by URL. JPEG, PNG, and WebP only, up to 5 MB.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos', 'photos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

-- Users can upload and delete only inside their own user-id folder.
create policy "contributors upload into their own folder"
  on storage.objects for insert
  to authenticated
  with check (
    bucket_id = 'photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create policy "contributors delete their own photos"
  on storage.objects for delete
  to authenticated
  using (
    bucket_id = 'photos'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );
