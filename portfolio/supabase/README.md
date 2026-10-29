# Portfolio content management

News, Projects, Articles, and Books live in separate Supabase tables. Public pages render on the Next.js server; the browser does not query Supabase. About's selected projects use the same published project records. The homepage biography, About story, research publications, documents, and visual design remain repository-managed.

## Hosting

Deploy `portfolio/` to a host that runs Next.js (for example your existing Vercel project). Build with `npm run build` and run with `npm start` when self-hosting. GitHub Pages and `output: 'export'` cannot run authentication, Server Actions, or SSR. The repository workflow validates changes; it does not deploy a static export.

## Environment

Set these on the Next.js server and in `portfolio/.env.local` for local development:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_REPLACE_ME
```

No service-role key, database password, or secret key is required by this application. Only a publishable key is accepted. Sessions use Secure (production), HttpOnly, SameSite=Lax cookies. The browser sends forms and Server Actions to the Next.js server. The proxy refreshes sessions only for admin and media requests. Every read of the dashboard and every write/upload independently verifies the user with Supabase Auth and checks their exact ID against `portfolio_owner`.

## Database installation / migration

Back up your existing database before applying schema changes. In the Supabase SQL Editor:

1. Run `005_portfolio_cms.sql`. It is self-contained for a fresh project and also supports databases created by migrations 001–004. It creates four tables, private image storage, owner policies, version triggers, and supporting indexes. Existing Books rows are copied with their IDs, notes, reading states, order, and publication status. The old `portfolio_content` table is retained but API grants are revoked to prevent split writes.
2. Run `006_initial_content.sql`. It imports the current 19 News entries, 8 Projects, and 1 Medium article. Matching seed keys are never overwritten. This is initial migration content, not a public-page fallback. Do not re-run it to update content after you begin managing entries; a deleted seeded entry could be re-created.
3. If you already have a row in `portfolio_owner`, keep it. Otherwise create your email/password account under Authentication → Users, confirm it, and register its UUID:

```sql
insert into public.portfolio_owner (singleton, user_id)
values (true, 'YOUR_AUTH_USER_UUID');
```

The table permits exactly one owner. The application cannot add or change owners. No role hierarchy or visitor accounts are implemented. Under Authentication settings, disable new-user sign-ups. Enable MFA on your owner account through your Supabase setup if required; the application currently uses password sign-in.

Migration 005 never deletes legacy data. External HTTP image/book links from legacy records are cleared because the site accepts HTTPS links. Existing valid HTTPS links and local `/images/` paths are preserved. The migration enforces the editor's field limits, so exceptionally long legacy book notes (>30,000 characters) must be addressed before migration. SQL files are not applied automatically; this checkout has no management/database credentials.

## Owner workflow

Open `/admin` and sign in at `/admin/login`. Choose News, Projects, Articles, or Books.

- Save as a draft or publish. Uncheck Published and save to unpublish.
- Use Display order to reorder entries (lower numbers appear first).
- News uses paragraphs of text/link segments, with optional bold and italics. It is stored as validated versioned JSON and rendered as React elements, never raw HTML.
- Articles store the title, excerpt, date, cover, reading time, and Medium URL; full article authoring remains on Medium.
- Upload a PNG, JPEG, WebP, or GIF up to 5 MB, or use an existing HTTPS image URL / `/images/` path. Uploaded media bytes and MIME types are checked on the server. SVG and HTML uploads are rejected.
- Preview uses the same list components as the public pages. Entries require valid fields before previewing; drafts can omit project/article covers until publication.
- Edits remain in the form after a failed save. A version check prevents overwriting a record changed in another tab. Reload the dashboard and select the latest record after a conflict.
- Deletion requires confirmation. Deleting an entry does not delete its image, which may be shared by another entry. Unattached uploads remain private. You can remove unused objects through the Supabase Storage dashboard.

New content appears without code changes or a deployment. Successful writes expire the relevant server cache and refresh the affected routes, including About when a project changes. Public lists also revalidate every five minutes if a change is made directly in Supabase. Cached queries use an anonymous client, never your owner session. Failed queries show a small unavailable state and are not replaced with old static content.

## Images and privacy

`portfolio-media` is a private bucket. Only the owner can upload and remove files within their UUID folder. Storage policies allow public reads only for objects referenced by published entries; owner reads also allow draft previews. `/media/...` proxies downloads on the server using the requesting session and the same RLS rules, with `private, no-store` headers. Image preview URLs contain object paths rather than long-lived signed tokens. Unpublishing removes anonymous access through this route. Previously downloaded images cannot be recalled.

Images entered as external URLs or existing files under `public/images/` are inherently public and should not contain confidential draft material. Use uploads for private draft covers.

## Tests

```sh
npm test
npm run typecheck
npm run lint
npm run build
```

The test suite checks content validation, migration preservation/idempotency, and PostgreSQL RLS with owner/non-owner/anonymous identities. The embedded PostgreSQL tests emulate the Supabase Auth/Storage schemas; they do not test the hosted Supabase Auth and Storage HTTP services. Before launch, verify real owner login, rejected non-owner access, draft privacy, image upload, publication, unpublication, and cross-tab version conflicts in a staging Supabase project.

Generate the initial SQL from the retained migration data files only when preparing a new initial migration:

```sh
npm run seed:generate
```
