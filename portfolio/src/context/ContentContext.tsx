"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getSupabase } from '../lib/supabase';
import { type ContentEntry } from '../lib/content-model';

const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
const ContentContext = createContext<{ entries: ContentEntry[]; configured: boolean; loading: boolean; error: boolean }>({ entries: [], configured, loading: configured, error: false });

export function ContentProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<ContentEntry[]>([]);
  const [loading, setLoading] = useState(configured);
  const [error, setError] = useState(false);
  useEffect(() => {
    if (!configured) return;
    let active = true;
    async function refresh() {
      try {
        const { data, error } = await getSupabase().from('portfolio_content').select('*').in('kind', ['book', 'plan']).eq('published', true).order('position').order('created_at');
        if (error) throw error;
        if (active) { setEntries(data ?? []); setError(false); }
      } catch { if (active) setError(true); }
      finally { if (active) setLoading(false); }
    }
    void refresh();
    window.addEventListener('focus', refresh);
    window.addEventListener('portfolio-content-changed', refresh);
    return () => { active = false; window.removeEventListener('focus', refresh); window.removeEventListener('portfolio-content-changed', refresh); };
  }, []);
  return <ContentContext.Provider value={{ entries, configured, loading, error }}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}

export function ContentStatus() {
  const { loading, error } = useContext(ContentContext);
  return loading || error ? <p role="status" className="page-shell pt-24 text-sm text-muted">{loading ? 'Loading content…' : 'Content is temporarily unavailable. Please refresh to try again.'}</p> : null;
}
