import 'server-only';
import { createServerClient } from '@supabase/ssr';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { sessionCookieOptions, supabaseConfig } from './config';

export async function sessionClient() {
  const { url, key } = supabaseConfig();
  const store = await cookies();
  return createServerClient(url, key, {
    cookieOptions: sessionCookieOptions,
    cookies: {
      getAll: () => store.getAll(),
      setAll: values => {
        try { values.forEach(({ name, value, options }) => store.set(name, value, { ...options, ...sessionCookieOptions })); }
        catch { /* Server Components cannot set cookies; the auth proxy refreshes them. */ }
      },
    },
  });
}
// Public reads never inherit the owner's cookies, so drafts cannot enter a public cache.
export function publicClient() {
  const { url, key } = supabaseConfig();
  return createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false }, global: { fetch: (input, init) => fetch(input, { ...init, cache: 'no-store', signal: init?.signal ?? AbortSignal.timeout(10000) }) } });
}
export async function requireOwner() {
  const client = await sessionClient();
  const { data: { user }, error } = await client.auth.getUser();
  if (error || !user) throw new Error('Please sign in to manage your portfolio.');
  const { data, error: ownerError } = await client.from('portfolio_owner').select('user_id').eq('user_id', user.id).maybeSingle();
  if (ownerError || !data) throw new Error('This account does not have owner access.');
  return { client, user };
}
