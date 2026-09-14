# Books and List66 admin setup

Only Books and List66 use Supabase. The homepage, biography, projects, articles, publications, navigation, and images stay in repository files. Supabase requests are scoped to `/books`, `/list66`, and `/admin`.

## Configure

Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` in `portfolio/.env.local`. Restart the dev server. Never use a secret or service-role key in browser configuration.

## Database setup

For a new database, run `001_content.sql` once in the Supabase SQL Editor. No seed is needed. If you already ran the previous broader schema, run `003_books_and_list66_only.sql` once instead. It restricts browser access to books and plans without deleting old rows. Do not rerun the initial migration against existing tables.

The owner membership table allows one owner. Visitors can read published books and plans. Only the designated owner can read drafts and insert, update, or delete entries. Public sign-in alone grants no editing access.

## Owner account

Create and confirm your email/password user under Authentication > Users, and disable new user sign-ups. Copy the user UUID into this SQL:

```sql
insert into public.portfolio_owner (singleton, user_id)
values (true, 'REPLACE-WITH-YOUR-AUTH-USER-UUID');
```

Skip this insert if your owner is already assigned. This account is separate from your Supabase dashboard login.

## Editing

Visit `/admin`, sign in, and choose Books or List66. Add, edit, delete, reorder, or publish entries. Draft rows are private; notes inside a published row are public. Books accept an image URL or a path such as `/images/book-cover.jpg`; put local image files in `portfolio/public/images/`. File uploads are not implemented.

Verify a private draft is absent in a signed-out browser, publish it and refresh the collection page, then unpublish it and verify it disappears. Confirm a second authenticated account cannot edit or read drafts. `tests.sql` provides transaction-based RLS checks for a test Supabase database; it has not been run on your hosted database.

Database content loads in the browser and refreshes on window focus. Other public pages work without Supabase. Password recovery is managed in the Supabase dashboard for now. No database changes are applied automatically by these source files.

## Local content

- `src/views/HomePage.tsx`: your name, role, mission, and homepage text.
- `src/views/AboutPage.tsx`: biography.
- `src/data/projects.ts`: projects.
- `src/data/blog.ts`: articles.
- `src/data/publications.ts`: publications.
- `src/assets/images/` and `public/images/`: local images.
