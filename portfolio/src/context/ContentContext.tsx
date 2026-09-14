"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { getSupabase } from '../lib/supabase';
import { safeUrl, type ContentEntry } from '../lib/content-model';
import { projects as localProjects } from '../data/projects';
import { posts as localPosts } from '../data/blog';
import { publications as localPublications } from '../data/publications';
import type { Project, BlogPost, Publication } from '../types/content';

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
        const { data, error } = await getSupabase().from('portfolio_content').select('*').eq('published', true).order('position').order('created_at');
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
  const state = useContext(ContentContext);
  const projects: Project[] = state.configured ? state.entries.filter(e => e.kind === 'project').map(e => ({ id: e.id, title: e.title, description: e.body, link: safeUrl(e.url), image: safeUrl(e.image, true) || '/images/identity-image.png', categories: e.categories as Project['categories'] })) : localProjects;
  const posts: BlogPost[] = state.configured ? state.entries.filter(e => e.kind === 'article').map(e => ({ id: e.id, title: e.title, excerpt: e.body, date: e.date, slug: safeUrl(e.url) })) : localPosts;
  const publications: Publication[] = state.configured ? state.entries.filter(e => e.kind === 'publication').map(e => ({ citation: e.body || e.title, link: safeUrl(e.url) })) : localPublications;
  return { ...state, projects, posts, publications };
}

export function ContentStatus() {
  const { loading, error } = useContext(ContentContext);
  return loading || error ? <p role="status" className="page-shell pt-24 text-sm text-muted">{loading ? 'Loading content…' : 'Content is temporarily unavailable. Please refresh to try again.'}</p> : null;
}
