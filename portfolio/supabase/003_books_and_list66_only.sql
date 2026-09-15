-- For projects that already ran the original broader schema.
-- Preserve existing rows, but exclude other kinds from browser read/write access.
begin;
create policy "Only books and plans are managed online"
on public.portfolio_content as restrictive
for all to anon, authenticated
using (kind in ('book', 'plan'))
with check (kind in ('book', 'plan'));
commit;