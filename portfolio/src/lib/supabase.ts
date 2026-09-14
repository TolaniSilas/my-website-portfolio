import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | undefined;

// Create one shared client when a feature first needs Supabase.
// The public portfolio can still load before local setup is complete.
export function getSupabase(): SupabaseClient {
  if (client) return client;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || !publishableKey) {
    throw new Error("Set the Supabase URL and publishable key in portfolio/.env.local, then restart Next.js.");
  }

  // This module runs in the browser, so a secret key must never be used here.
  if (!publishableKey.startsWith("sb_publishable_")) {
    throw new Error("Use a Supabase publishable key (sb_publishable_), not a secret or service-role key.");
  }

  client = createClient(url, publishableKey);
  return client;
}