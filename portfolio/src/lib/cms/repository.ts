import 'server-only';
import { unstable_cache } from 'next/cache';
import { publicClient } from '../supabase/server';
import { contentTables, type ContentKind, type ContentMap } from './model';

export type ContentResult<K extends ContentKind> = { entries: ContentMap[K][]; unavailable: boolean };
export async function getPublicContent<K extends ContentKind>(kind: K): Promise<ContentResult<K>> {
  try {
    const entries = await unstable_cache(async () => {
      const { data, error } = await publicClient().from(contentTables[kind]).select('*').eq('published', true).order('position').order('created_at', { ascending: false }).abortSignal(AbortSignal.timeout(8000)).retry(false);
      if (error) throw new Error(error.code || 'content_unavailable');
      return data as ContentMap[K][];
    }, ['portfolio-cms-v1', kind, process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'unconfigured'], { tags: [`portfolio-${kind}`], revalidate: 300 })();
    return { entries, unavailable: false };
  } catch {
    // Fail closed: never replace database records with static seed data or expose drafts.
    console.error(`Published ${kind} could not be loaded. Check Supabase connectivity and migration 005.`);
    return { entries: [], unavailable: true };
  }
}
