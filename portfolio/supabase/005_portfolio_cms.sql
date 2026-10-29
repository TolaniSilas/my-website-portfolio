-- Run once in Supabase SQL Editor; compatible with an existing Books database.
-- No credentials or owner account IDs belong in this file.
begin;
create table if not exists public.portfolio_owner (
  singleton boolean primary key default true check (singleton),
  user_id uuid not null unique references auth.users(id) on delete cascade
);
alter table public.portfolio_owner enable row level security;
revoke all on public.portfolio_owner from anon, authenticated;
grant select on public.portfolio_owner to authenticated;
drop policy if exists "Owner can verify own membership" on public.portfolio_owner;
create policy "Owner can verify own membership" on public.portfolio_owner for select to authenticated
using (user_id = (select auth.uid()));

create or replace function public.portfolio_is_owner() returns boolean
language sql stable security definer set search_path = '' as $$
  select exists (select 1 from public.portfolio_owner where user_id = (select auth.uid()));
$$;
revoke all on function public.portfolio_is_owner() from public;
grant execute on function public.portfolio_is_owner() to anon, authenticated;

create or replace function public.portfolio_valid_news_body(doc jsonb) returns boolean
language plpgsql immutable set search_path = '' as $$
declare block jsonb; span jsonb; total integer := 0;
begin
  if doc->>'version' is distinct from '1' or jsonb_typeof(doc->'blocks') is distinct from 'array' then return false; end if;
  if jsonb_array_length(doc->'blocks') not between 1 and 20 then return false; end if;
  for block in select * from jsonb_array_elements(doc->'blocks') loop
    if block->>'type' is distinct from 'paragraph' or jsonb_typeof(block->'children') is distinct from 'array' then return false; end if;
    if jsonb_array_length(block->'children') not between 1 and 100 then return false; end if;
    for span in select * from jsonb_array_elements(block->'children') loop
      if jsonb_typeof(span) <> 'object' or jsonb_typeof(span->'text') is distinct from 'string' then return false; end if;
      if exists (select 1 from jsonb_object_keys(span) k where k not in ('text','href','bold','italic')) then return false; end if;
      if length(span->>'text') > 5000 then return false; end if;
      total := total + length(trim(span->>'text'));
      if span ? 'href' and (jsonb_typeof(span->'href') <> 'string' or span->>'href' !~ '^https://[^[:space:]]+$' or length(span->>'href') > 2048) then return false; end if;
      if span ? 'bold' and jsonb_typeof(span->'bold') <> 'boolean' then return false; end if;
      if span ? 'italic' and jsonb_typeof(span->'italic') <> 'boolean' then return false; end if;
    end loop;
  end loop;
  return total between 1 and 20000;
exception when others then return false;
end;
$$;

create or replace function public.portfolio_touch_content() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at := now();
  new.version := old.version + 1;
  return new;
end;
$$;

create table if not exists public.portfolio_news (
  id uuid primary key default gen_random_uuid(),
  seed_key text unique,
  title text not null check (length(trim(title)) between 1 and 300),
  published boolean not null default false,
  position integer not null default 0 check (position between -1000000 and 1000000),
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  date_label text not null check (length(trim(date_label)) between 1 and 80),
  date_value text not null check (date_value ~ '^[0-9]{4}(-[0-9]{2}(-[0-9]{2})?)?$'),
  body jsonb not null check (public.portfolio_valid_news_body(body))
);
alter table public.portfolio_news enable row level security;
revoke all on public.portfolio_news from anon, authenticated;
grant select on public.portfolio_news to anon;
grant select, insert, update, delete on public.portfolio_news to authenticated;
drop policy if exists "Published or owner reads" on public.portfolio_news;
create policy "Published or owner reads" on public.portfolio_news for select to anon, authenticated using (published or (select public.portfolio_is_owner()));
drop policy if exists "Owner creates" on public.portfolio_news;
create policy "Owner creates" on public.portfolio_news for insert to authenticated with check ((select public.portfolio_is_owner()));
drop policy if exists "Owner edits" on public.portfolio_news;
create policy "Owner edits" on public.portfolio_news for update to authenticated using ((select public.portfolio_is_owner())) with check ((select public.portfolio_is_owner()));
drop policy if exists "Owner removes" on public.portfolio_news;
create policy "Owner removes" on public.portfolio_news for delete to authenticated using ((select public.portfolio_is_owner()));
create index if not exists portfolio_news_public_order on public.portfolio_news (position, created_at desc) where published;
drop trigger if exists touch_content on public.portfolio_news;
create trigger touch_content before update on public.portfolio_news for each row execute function public.portfolio_touch_content();

create table if not exists public.portfolio_projects (
  id uuid primary key default gen_random_uuid(),
  seed_key text unique,
  title text not null check (length(trim(title)) between 1 and 300),
  published boolean not null default false,
  position integer not null default 0 check (position between -1000000 and 1000000),
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  image_url text not null default '' check (image_url = '' or image_url ~ '^https://' or image_url ~ '^/images/'),
  image_path text not null default '' check (image_path = '' or image_path ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}\.(png|jpg|webp|gif)$'),
  check (image_path = '' or image_url = ''),
  check (not published or image_path <> '' or image_url <> ''),
  description text not null check (length(trim(description)) between 1 and 20000),
  categories text[] not null check (cardinality(categories) between 1 and 2 and categories <@ array['Engineering','Civic']::text[]),
  credit text not null default '' check (length(credit) <= 500),
  date_label text not null default '' check (length(date_label) <= 80),
  link_url text not null check (link_url ~ '^https://'),
  code_url text not null default '' check (code_url = '' or code_url ~ '^https://'),
  demo_url text not null default '' check (demo_url = '' or demo_url ~ '^https://')
);
alter table public.portfolio_projects enable row level security;
revoke all on public.portfolio_projects from anon, authenticated;
grant select on public.portfolio_projects to anon;
grant select, insert, update, delete on public.portfolio_projects to authenticated;
drop policy if exists "Published or owner reads" on public.portfolio_projects;
create policy "Published or owner reads" on public.portfolio_projects for select to anon, authenticated using (published or (select public.portfolio_is_owner()));
drop policy if exists "Owner creates" on public.portfolio_projects;
create policy "Owner creates" on public.portfolio_projects for insert to authenticated with check ((select public.portfolio_is_owner()));
drop policy if exists "Owner edits" on public.portfolio_projects;
create policy "Owner edits" on public.portfolio_projects for update to authenticated using ((select public.portfolio_is_owner())) with check ((select public.portfolio_is_owner()));
drop policy if exists "Owner removes" on public.portfolio_projects;
create policy "Owner removes" on public.portfolio_projects for delete to authenticated using ((select public.portfolio_is_owner()));
create index if not exists portfolio_projects_public_order on public.portfolio_projects (position, created_at desc) where published;
drop trigger if exists touch_content on public.portfolio_projects;
create trigger touch_content before update on public.portfolio_projects for each row execute function public.portfolio_touch_content();

create table if not exists public.portfolio_articles (
  id uuid primary key default gen_random_uuid(),
  seed_key text unique,
  title text not null check (length(trim(title)) between 1 and 300),
  published boolean not null default false,
  position integer not null default 0 check (position between -1000000 and 1000000),
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  image_url text not null default '' check (image_url = '' or image_url ~ '^https://' or image_url ~ '^/images/'),
  image_path text not null default '' check (image_path = '' or image_path ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}\.(png|jpg|webp|gif)$'),
  check (image_path = '' or image_url = ''),
  check (not published or image_path <> '' or image_url <> ''),
  excerpt text not null check (length(trim(excerpt)) between 1 and 5000),
  date_value date not null,
  reading_minutes integer not null check (reading_minutes between 1 and 300),
  url text not null check (url ~ '^https://([a-zA-Z0-9-]+\.)*medium\.com(/|$)')
);
alter table public.portfolio_articles enable row level security;
revoke all on public.portfolio_articles from anon, authenticated;
grant select on public.portfolio_articles to anon;
grant select, insert, update, delete on public.portfolio_articles to authenticated;
drop policy if exists "Published or owner reads" on public.portfolio_articles;
create policy "Published or owner reads" on public.portfolio_articles for select to anon, authenticated using (published or (select public.portfolio_is_owner()));
drop policy if exists "Owner creates" on public.portfolio_articles;
create policy "Owner creates" on public.portfolio_articles for insert to authenticated with check ((select public.portfolio_is_owner()));
drop policy if exists "Owner edits" on public.portfolio_articles;
create policy "Owner edits" on public.portfolio_articles for update to authenticated using ((select public.portfolio_is_owner())) with check ((select public.portfolio_is_owner()));
drop policy if exists "Owner removes" on public.portfolio_articles;
create policy "Owner removes" on public.portfolio_articles for delete to authenticated using ((select public.portfolio_is_owner()));
create index if not exists portfolio_articles_public_order on public.portfolio_articles (position, created_at desc) where published;
drop trigger if exists touch_content on public.portfolio_articles;
create trigger touch_content before update on public.portfolio_articles for each row execute function public.portfolio_touch_content();

create table if not exists public.portfolio_books (
  id uuid primary key default gen_random_uuid(),
  seed_key text unique,
  title text not null check (length(trim(title)) between 1 and 300),
  published boolean not null default false,
  position integer not null default 0 check (position between -1000000 and 1000000),
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  image_url text not null default '' check (image_url = '' or image_url ~ '^https://' or image_url ~ '^/images/'),
  image_path text not null default '' check (image_path = '' or image_path ~ '^[0-9a-f-]{36}/[0-9a-f-]{36}\.(png|jpg|webp|gif)$'),
  check (image_path = '' or image_url = ''),
  author text not null default '' check (length(author) <= 300),
  body text not null default '' check (length(body) <= 30000),
  date_label text not null default '' check (length(date_label) <= 80),
  status text not null default 'planned' check (status in ('planned','in-progress','completed')),
  url text not null default '' check (url = '' or url ~ '^https://')
);
alter table public.portfolio_books enable row level security;
revoke all on public.portfolio_books from anon, authenticated;
grant select on public.portfolio_books to anon;
grant select, insert, update, delete on public.portfolio_books to authenticated;
drop policy if exists "Published or owner reads" on public.portfolio_books;
create policy "Published or owner reads" on public.portfolio_books for select to anon, authenticated using (published or (select public.portfolio_is_owner()));
drop policy if exists "Owner creates" on public.portfolio_books;
create policy "Owner creates" on public.portfolio_books for insert to authenticated with check ((select public.portfolio_is_owner()));
drop policy if exists "Owner edits" on public.portfolio_books;
create policy "Owner edits" on public.portfolio_books for update to authenticated using ((select public.portfolio_is_owner())) with check ((select public.portfolio_is_owner()));
drop policy if exists "Owner removes" on public.portfolio_books;
create policy "Owner removes" on public.portfolio_books for delete to authenticated using ((select public.portfolio_is_owner()));
create index if not exists portfolio_books_public_order on public.portfolio_books (position, created_at desc) where published;
drop trigger if exists touch_content on public.portfolio_books;
create trigger touch_content before update on public.portfolio_books for each row execute function public.portfolio_touch_content();

-- Move existing books without deleting the old table or changing record IDs.
do $$ begin
  if to_regclass('public.portfolio_content') is not null then
    insert into public.portfolio_books (id, seed_key, title, published, position, created_at, author, body, date_label, status, url, image_url)
    select id, 'legacy-book-' || id::text, title,
      published, position, created_at, author, body, date, status,
      case when url ~ '^https://' then url else '' end,
      case when image ~ '^https://' or image ~ '^/images/' then image else '' end
    from public.portfolio_content where kind = 'book'
    on conflict (id) do nothing;
    -- The new tables are the source of truth; prevent split writes to the old API.
    revoke all on public.portfolio_content from anon, authenticated;
  end if;
end $$;

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('portfolio-media', 'portfolio-media', false, 5242880, array['image/png','image/jpeg','image/webp','image/gif'])
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit, allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Portfolio published images or owner" on storage.objects;
create policy "Portfolio published images or owner" on storage.objects for select to anon, authenticated using (
  bucket_id = 'portfolio-media' and (
    ((select public.portfolio_is_owner()) and (storage.foldername(name))[1] = (select auth.uid())::text)
    or exists (select 1 from public.portfolio_projects where image_path = storage.objects.name and published)
    or exists (select 1 from public.portfolio_articles where image_path = storage.objects.name and published)
    or exists (select 1 from public.portfolio_books where image_path = storage.objects.name and published)
  )
);
drop policy if exists "Portfolio owner uploads" on storage.objects;
create policy "Portfolio owner uploads" on storage.objects for insert to authenticated with check (
  bucket_id = 'portfolio-media' and (select public.portfolio_is_owner()) and (storage.foldername(name))[1] = (select auth.uid())::text
);
drop policy if exists "Portfolio owner removes uploads" on storage.objects;
create policy "Portfolio owner removes uploads" on storage.objects for delete to authenticated using (
  bucket_id = 'portfolio-media' and (select public.portfolio_is_owner()) and (storage.foldername(name))[1] = (select auth.uid())::text
);
commit;
