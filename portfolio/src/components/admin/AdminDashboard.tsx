"use client";

import { useEffect, useState, type FormEvent } from 'react';
import type { User } from '@supabase/supabase-js';
import { getSupabase } from '../../lib/supabase';
import { emptyEntry, kinds, labels, safeUrl, type ContentEntry, type ContentKind } from '../../lib/content-model';

type Draft = Omit<ContentEntry, 'id'> & { id?: string };
export default function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [checking, setChecking] = useState(true);
  const [owner, setOwner] = useState(false);
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [entries, setEntries] = useState<ContentEntry[]>([]);
  const [kind, setKind] = useState<ContentKind>('book');
  const [draft, setDraft] = useState<Draft>(emptyEntry('book'));

  useEffect(() => {
    try {
      const client = getSupabase();
      const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
        setUser(session?.user ?? null);
        setOwner(false);
        setEntries([]);
        setChecking(Boolean(session?.user));
      });
      return () => subscription.unsubscribe();
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Unable to configure login.'); setChecking(false); }
  }, []);

  useEffect(() => {
    if (!user) return;
    let active = true;
    async function verify() {
      try {
        const client = getSupabase();
        const { data: verified, error: authError } = await client.auth.getUser();
        if (authError || !verified.user) throw new Error('Please sign in again.');
        const { data, error } = await client.from('portfolio_owner').select('user_id').eq('user_id', verified.user.id).maybeSingle();
        if (error) {
          const reason = error.code === 'PGRST205' || error.code === '42P01'
            ? 'The portfolio_owner table was not found. Check that 001_content.sql was applied to the project configured in .env.local.'
            : error.code === '42501'
              ? 'The database denied access to portfolio_owner. Check the SELECT grant and owner verification policy from 001_content.sql.'
              : error.message;
          throw new Error(`Owner verification failed${error.code ? ` (${error.code})` : ''}: ${reason}`);
        }
        if (!data) throw new Error('This account does not have owner access.');
        const result = await client.from('portfolio_content').select('*').in('kind', ['book', 'plan']).order('position').order('created_at');
        if (result.error) throw result.error;
        if (active) { setOwner(true); setEntries(result.data ?? []); setMessage(''); }
      } catch (error) { if (active) setMessage(error instanceof Error ? error.message : 'Access verification failed.'); }
      finally { if (active) setChecking(false); }
    }
    void verify();
    return () => { active = false; };
  }, [user]);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage('');
    const form = new FormData(event.currentTarget);
    try {
      const { error } = await getSupabase().auth.signInWithPassword({ email: String(form.get('email')).trim(), password: String(form.get('password')) });
      if (error) throw error;
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Sign-in failed.'); }
    finally { setBusy(false); }
  }
  async function signOut() {
    setBusy(true);
    try { const { error } = await getSupabase().auth.signOut(); if (error) throw error; setDraft(emptyEntry(kind)); }
    catch { setMessage('Could not sign out. Please try again.'); }
    finally { setBusy(false); }
  }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const { id, ...values } = draft;
      if (!values.title.trim()) throw new Error('Enter a title.');
      if (values.url && !safeUrl(values.url)) throw new Error('Links must start with https:// or http://.');
      if (values.image && !safeUrl(values.image, true)) throw new Error('Use an HTTPS image URL or a local /images/ path.');
      const query = id ? getSupabase().from('portfolio_content').update(values).eq('id', id) : getSupabase().from('portfolio_content').insert(values);
      const { data, error } = await query.select().single();
      if (error) throw error;
      setEntries(previous => [...previous.filter(e => e.id !== data.id), data].sort((a, b) => a.position - b.position));
      setDraft(emptyEntry(kind)); setMessage(values.published ? 'Saved and published.' : 'Draft saved. Only you can see it.');
      window.dispatchEvent(new Event('portfolio-content-changed'));
    } catch (error) { setMessage(error instanceof Error ? error.message : 'Save failed. Your changes are still in the form.'); }
    finally { setBusy(false); }
  }
  async function remove(entry: ContentEntry) {
    if (!window.confirm(`Delete “${entry.title}”? This cannot be undone.`)) return;
    setBusy(true);
    try {
      const { error } = await getSupabase().from('portfolio_content').delete().eq('id', entry.id).select().single();
      if (error) throw error;
      setEntries(previous => previous.filter(e => e.id !== entry.id));
      if (draft.id === entry.id) setDraft(emptyEntry(kind));
      setMessage('Entry deleted.'); window.dispatchEvent(new Event('portfolio-content-changed'));
    } catch { setMessage('Delete failed. Please try again.'); }
    finally { setBusy(false); }
  }
  const field = (name: 'title' | 'url' | 'image' | 'author' | 'date', label: string, required = false) => <label className="admin-field">{label}<input value={draft[name]} required={required} maxLength={name === 'title' ? 300 : undefined} onChange={e => setDraft({ ...draft, [name]: e.target.value })} /></label>;

  return <div className="page-shell page-intro pb-20">
    <div className="section-heading"><h1 className="section-title">Admin</h1>{user && <button className="btn-secondary" disabled={busy} onClick={signOut}>Sign out</button>}</div>
    {message && <p role="status" className="mb-6 rounded-md border border-line p-4">{message}</p>}
    {checking ? <p role="status">Checking access…</p> : !user ? <form onSubmit={login} className="card-surface max-w-md space-y-5 p-8">
      <h2 className="font-display text-2xl">Sign in</h2>
      <label className="admin-field">Email<input name="email" type="email" autoComplete="username" required /></label>
      <label className="admin-field">Password<input name="password" type="password" autoComplete="current-password" required /></label>
      <button className="btn-primary" disabled={busy}>{busy ? 'Signing in…' : 'Sign in'}</button>
    </form> : owner && <>
      <div className="mb-8 flex flex-wrap gap-3">{kinds.map(k => <button key={k} className={kind === k ? 'btn-primary' : 'btn-secondary'} aria-pressed={kind === k} disabled={busy} onClick={() => { if (window.confirm('Switch section? Unsaved form changes will be discarded.')) { setKind(k); setDraft(emptyEntry(k)); } }}>{labels[k]}</button>)}</div>
      <div className="grid items-start gap-8 lg:grid-cols-2">
        <form onSubmit={save} className="card-surface space-y-5 p-6">
          <fieldset disabled={busy} className="space-y-5">
            <legend className="mb-5 font-display text-2xl">{draft.id ? 'Edit' : 'Add'} — {labels[kind]}</legend>
            {field('title', 'Title', true)}
            <label className="admin-field">{'Description / notes'}<textarea rows={8} value={draft.body} onChange={e => setDraft({ ...draft, body: e.target.value })} /></label>
            {kind === 'book' && field('url', 'Link', false)}
            {kind === 'book' && field('image', 'Image URL or /images/ path')}
            {kind === 'book' && field('author', 'Author')}
            {['book','article','plan'].includes(kind) && field('date', 'Date (e.g. September 2026)')}
            {['book','plan'].includes(kind) && <label className="admin-field">Status<select value={draft.status} onChange={e => setDraft({ ...draft, status: e.target.value as Draft['status'] })}><option value="planned">{kind === 'book' ? 'Want to read' : 'Planned'}</option><option value="in-progress">{kind === 'book' ? 'Reading' : 'In progress'}</option><option value="completed">Completed</option></select></label>}
            <label className="admin-field">Display order (lowest first)<input type="number" step="1" required value={draft.position} onChange={e => setDraft({ ...draft, position: Number(e.target.value) })} /></label>
            <label className="flex items-center gap-3"><input type="checkbox" checked={draft.published} onChange={e => setDraft({ ...draft, published: e.target.checked })} />Publish on the website</label>
            <div className="flex gap-3"><button className="btn-primary">{busy ? 'Saving…' : 'Save entry'}</button><button type="button" className="btn-secondary" onClick={() => setDraft(emptyEntry(kind))}>Clear form</button></div>
          </fieldset>
        </form>
        <div className="space-y-4"><h2 className="font-display text-2xl">Entries</h2>{entries.filter(e => e.kind === kind).length === 0 && <p>Add your first entry using the form.</p>}{entries.filter(e => e.kind === kind).map(entry => <article key={entry.id} className="card-surface p-5"><p className="text-sm text-muted">{entry.published ? 'Published' : 'Private draft'} · Order {entry.position}</p><h3 className="my-3 text-xl">{entry.title}</h3><div className="flex gap-3"><button disabled={busy} className="btn-secondary" onClick={() => setDraft(entry)}>Edit</button><button disabled={busy} className="btn-secondary" onClick={() => remove(entry)}>Delete</button></div></article>)}</div>
      </div>
    </>}
  </div>;
}
