begin;
-- Membership is managed only through the SQL editor, never from the website.
create table public.portfolio_owner (
  singleton boolean primary key default true check (singleton),
  user_id uuid not null unique references auth.users(id) on delete cascade
);
alter table public.portfolio_owner enable row level security;
revoke all on public.portfolio_owner from anon, authenticated;
grant select on public.portfolio_owner to authenticated;
create policy "Owner can verify own membership" on public.portfolio_owner
  for select to authenticated using (user_id = (select auth.uid()));

create table public.portfolio_content (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('project','article','publication','book','plan','about','intro')),
  title text not null check (length(trim(title)) between 1 and 300),
  body text not null default '',
  url text not null default '' check (url = '' or url ~ '^https?://'),
  image text not null default '' check (image = '' or image ~ '^https?://' or image ~ '^/[^/]'),
  author text not null default '',
  date text not null default '',
  status text not null default 'planned' check (status in ('planned','in-progress','completed')),
  categories text[] not null default '{}',
  position integer not null default 0,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
create unique index one_intro on public.portfolio_content(kind) where kind = 'intro';
alter table public.portfolio_content enable row level security;
revoke all on public.portfolio_content from anon, authenticated;
grant select on public.portfolio_content to anon;
grant select, insert, update, delete on public.portfolio_content to authenticated;
create policy "Published content is public" on public.portfolio_content
  for select to anon, authenticated using (published);
create policy "Owner reads drafts" on public.portfolio_content
  for select to authenticated using (exists (select 1 from public.portfolio_owner where user_id = (select auth.uid())));
create policy "Owner inserts" on public.portfolio_content
  for insert to authenticated with check (exists (select 1 from public.portfolio_owner where user_id = (select auth.uid())));
create policy "Owner updates" on public.portfolio_content
  for update to authenticated using (exists (select 1 from public.portfolio_owner where user_id = (select auth.uid())))
  with check (exists (select 1 from public.portfolio_owner where user_id = (select auth.uid())));
create policy "Owner deletes" on public.portfolio_content
  for delete to authenticated using (exists (select 1 from public.portfolio_owner where user_id = (select auth.uid())));
commit;