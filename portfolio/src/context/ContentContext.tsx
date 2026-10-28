"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getSupabase } from '../lib/supabase';
import { type ContentEntry } from '../lib/content-model';

const configured = Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY);
const ContentContext = createContext<{ entries: ContentEntry[]; configured: boolean; loading: boolean; error: boolean; retry: () => void }>({ entries: [], configured, loading: configured, error: false, retry: () => {} });

export function ContentProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<ContentEntry[]>([]);
  const [loading, setLoading] = useState(configured);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const retry = () => {
    if (!configured) return;
    setLoading(true);
    setError(false);
    setAttempt(previous => previous + 1);
  };
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
  }, [attempt]);
  return <ContentContext.Provider value={{ entries, configured, loading, error, retry }}>{children}</ContentContext.Provider>;
}

export function useContent() {
  return useContext(ContentContext);
}

export function ContentStatus({ kind, hasItems }: { kind: 'book' | 'plan'; hasItems: boolean }) {
  const { loading, error, retry } = useContext(ContentContext);
  const collection = kind === 'book' ? 'books' : 'list';
  if (hasItems) return error ? <div className="collection-notice"><p role="status">Showing the last loaded {collection}. Updates couldn’t load.</p><button type="button" onClick={retry} disabled={loading}>{loading ? 'Trying again…' : 'Try again'}</button></div> : null;
  if (loading) return <div className="collection-loading" role="status"><span className="text-sm text-muted dark:text-muted-dark">Loading {collection}…</span><div className="collection-skeletons" aria-hidden="true"><div /><div /></div></div>;
  return <div className="collection-empty">
    <div role="status">
      <h2>{error ? `Couldn’t load ${kind === 'book' ? 'the bookshelf' : 'this list'}` : kind === 'book' ? 'The bookshelf is on its way' : 'More to come'}</h2>
      <p>{error ? 'Give it another try in a moment.' : kind === 'book' ? 'I’ll share my reads and notes here soon.' : 'I’ll share the things I’m planning and exploring here soon.'}</p>
    </div>
    {error && <button type="button" onClick={retry}>Try again <span aria-hidden="true">↻</span></button>}
  </div>;
}