-- Existing databases only: stop exposing retired content kinds through the API.
-- Retain historical rows; this migration does not delete any content.
begin;
drop policy if exists "Only books are managed online" on public.portfolio_content;
create policy "Only books are managed online"
on public.portfolio_content as restrictive
for all to anon, authenticated
using (kind = 'book')
with check (kind = 'book');
commit;
