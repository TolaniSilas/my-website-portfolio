# Admin setup, one step at a time

The public site reads published rows from `portfolio_content`. `/admin` signs in with Supabase Auth and lets the owner edit these rows. The database enforces access using row-level security (RLS); the UI's owner check alone is not the security boundary. This browser-auth implementation works with both normal Next.js and static exports. It does not use server cookies or protect future server endpoints: those will need their own authentication if added.

## 1. Configure the application

In `portfolio/.env.local`, set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` from your project's Connect panel. Restart `npm run dev`. Never put a secret or service-role key here. This replaces the old VITE_ names.

## 2. Create the schema

In your Supabase project's SQL Editor, run `001_content.sql` once. It creates:

- `portfolio_owner`: exactly one allowed owner, managed through SQL only.
- `portfolio_content`: projects, articles, publications, books, plans, biography sections, and a single homepage introduction.
- RLS policies: visitors see published rows; only the owner sees drafts and can insert, update, or delete. Merely signing in does not grant editing access.

Then run `002_seed.sql` once to import your existing public content. It deliberately does not invent books or List66 entries. Do not rerun the seed after deleting or renaming entries: it can recreate them.

## 3. Create your website login

In Authentication > Users, create your user with your email and a strong password. This is separate from your Supabase dashboard account. Make sure the user is confirmed. Disable new user sign-ups in the project's authentication settings; the website has no registration form.

Copy that user's UUID (not the project ID) into this SQL and run it:

```sql
insert into public.portfolio_owner (singleton, user_id)
values (true, 'REPLACE-WITH-YOUR-AUTH-USER-UUID');
```

The primary key permits only one owner. Do not add an `is_admin` value in user-editable metadata; that is not used for authorization.

## 4. Try the editor

Open `/admin`, sign in, and create a book with Publish unchecked. It should appear only in admin. Publish it and open `/books` in a signed-out/private browser to verify it appears. Edit it, unpublish it, and verify it disappears after refreshing. Repeat for `/list66`.

Projects, articles, publications, homepage introduction, and biography all use the same workflow. For the introduction, edit the seeded entry (there can be only one). Display order controls the lists; the first two projects appear on the homepage and the first five in the footer. Article entries link to the full article URL; they are not a rich-text article hosting system. Images currently use URLs or existing `/images/` paths, not file uploads.

Draft means the entire row is private. Notes inside a published row are public too. There is no public sign-up or password-reset form yet; account recovery is managed through the Supabase dashboard for now.

Public pages fetch after loading, and refresh on window focus or after an admin save. Without configuration, existing local content is shown. With configuration, the database is authoritative: an empty or unavailable database does not restore deleted local entries. Public database content is currently client-rendered, not included in the initial HTML for SEO.

## 5. Verify database security

`tests.sql` is a transaction-based integration test for a local/test Supabase database after running the migration. It creates temporary auth identities and rolls everything back. It verifies anonymous and non-owner restrictions as well as owner access. Run it in a test database SQL Editor or with psql. Do not claim security verification until it passes against your Supabase database.

Before production, also test manually that a second authenticated account cannot edit, read drafts, or change the owner membership. Database errors must leave the editor form intact.

## What remains external

These files do not apply themselves to your hosted project. Run the migration, seed, and owner setup there. Put the NEXT_PUBLIC_ variables into your deployment settings when ready. Local lint, types, and builds do not prove live authentication or RLS works.
