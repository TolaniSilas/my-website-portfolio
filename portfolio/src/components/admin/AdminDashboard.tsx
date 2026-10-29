'use client';

import { useEffect, useState, type FormEvent } from 'react';
import { deleteContent, saveContent, signOut, uploadImage } from '../../app/admin/actions';
import { contentKinds, contentLabels, emptyDraft, imageFor, MAX_IMAGE_BYTES, validateContent, type ArticleRecord, type BookRecord, type ContentKind, type ContentRecord, type NewsBody, type NewsRecord, type ProjectRecord } from '../../lib/cms/model';
import { ArticleList, BookList, NewsList, ProjectList } from '../content/ContentLists';
import NewsEditor from './NewsEditor';

type Draft = Record<string, unknown>;
function Preview({ kind, record }: { kind: ContentKind; record: ContentRecord }) {
  if (kind === 'news') return <div className="home-news"><NewsList entries={[record as NewsRecord]} /></div>;
  if (kind === 'projects') return <ProjectList entries={[record as ProjectRecord]} />;
  if (kind === 'articles') return <ArticleList entries={[record as ArticleRecord]} />;
  return <BookList entries={[record as BookRecord]} />;
}
export default function AdminDashboard({ initialRecords, setupError }: { initialRecords: Record<ContentKind, ContentRecord[]>; setupError: boolean }) {
  const [records, setRecords] = useState(initialRecords);
  const [kind, setKind] = useState<ContentKind>('news');
  const [draft, setDraft] = useState<Draft>(emptyDraft('news'));
  const [dirty, setDirty] = useState(false);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState<ContentRecord | null>(null);
  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => { event.preventDefault(); };
    window.addEventListener('beforeunload', warn);
    return () => window.removeEventListener('beforeunload', warn);
  }, [dirty]);
  function change(patch: Draft) { setDraft(previous => ({ ...previous, ...patch })); setDirty(true); setPreview(null); }
  function canDiscard() { return !dirty || window.confirm('Discard your unsaved changes?'); }
  function select(next: ContentKind, record?: ContentRecord) {
    if (!canDiscard()) return;
    setKind(next); setDraft(record ? { ...record } : emptyDraft(next)); setDirty(false); setPreview(null); setMessage('');
  }
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setBusy(true); setMessage('');
    try {
      const result = await saveContent(kind, draft);
      if (!result.ok) { setMessage(result.error); return; }
      const saved = result.data;
      setRecords(previous => ({ ...previous, [kind]: [...previous[kind].filter(entry => entry.id !== saved.id), saved].sort((a, b) => a.position - b.position || b.created_at.localeCompare(a.created_at)) }));
      setDraft({ ...saved }); setDirty(false); setPreview(null); setMessage(saved.published ? 'Saved and published. The public page has been refreshed.' : 'Draft saved. Only you can see it.');
    } catch { setMessage('The connection was interrupted. Your edits are still in the form.'); }
    finally { setBusy(false); }
  }
  async function remove(record: ContentRecord) {
    if (!window.confirm(`Delete “${record.title}”? This cannot be undone.`)) return;
    setBusy(true); setMessage('');
    try {
      const result = await deleteContent(kind, record.id, record.version);
      if (!result.ok) { setMessage(result.error); return; }
      setRecords(previous => ({ ...previous, [kind]: previous[kind].filter(entry => entry.id !== record.id) }));
      if (draft.id === record.id) { setDraft(emptyDraft(kind)); setDirty(false); setPreview(null); }
      setMessage('Entry deleted.');
    } catch { setMessage('Could not delete. Please check the connection.'); }
    finally { setBusy(false); }
  }
  async function upload(file?: File) {
    if (!file) return;
    if (file.size > MAX_IMAGE_BYTES) { setMessage('Choose an image up to 5 MB.'); return; }
    setBusy(true); setMessage('Uploading image…');
    try {
      const form = new FormData(); form.set('image', file);
      const result = await uploadImage(form);
      if (!result.ok) { setMessage(result.error); return; }
      change({ image_path: result.data.path, image_url: '' }); setMessage('Image uploaded privately. Save the entry to attach it.');
    } catch { setMessage('Upload interrupted. Please try again.'); }
    finally { setBusy(false); }
  }
  const field = (name: string, label: string, options: { type?: string; required?: boolean; max?: number } = {}) => <label className="admin-field">{label}<input type={options.type ?? 'text'} value={String(draft[name] ?? '')} required={options.required} maxLength={options.max ?? 2048} onChange={e => change({ [name]: e.target.value })} /></label>;
  const area = (name: string, label: string, max: number) => <label className="admin-field">{label}<textarea rows={5} value={String(draft[name] ?? '')} maxLength={max} onChange={e => change({ [name]: e.target.value })} /></label>;
  const selectedImage = imageFor({ image_path: String(draft.image_path ?? ''), image_url: String(draft.image_url ?? '') });
  return <div className="admin-page page-shell">
    <header className="admin-toolbar mb-6"><div><h1 className="page-title">Your portfolio</h1><p className="admin-help">Create, preview, and publish your updates.</p></div><form action={signOut} onSubmit={event => { if (!canDiscard()) event.preventDefault(); }}><button className="btn-secondary" disabled={busy}>Sign out</button></form></header>
    {setupError && <p role="alert" className="admin-message">Database setup is incomplete or unavailable. Apply migration 005_portfolio_cms.sql, then reload. Editing is disabled until all four tables can be read.</p>}
    <nav className="admin-sections" aria-label="Content sections">{contentKinds.map(section => <button type="button" key={section} aria-pressed={kind === section} disabled={busy} onClick={() => select(section)}>{contentLabels[section]} <span>{records[section].length}</span></button>)}</nav>
    {message && <p role="status" className="admin-message">{message}</p>}
    <div className="admin-workspace">
      <section className="admin-entry-list"><div className="admin-toolbar"><h2 className="content-title">{contentLabels[kind]}</h2><button className="btn-secondary" type="button" disabled={busy || setupError} onClick={() => select(kind)}>New entry</button></div>
        {!records[kind].length && <p className="admin-help mt-4">No entries yet. Create a draft to get started.</p>}
        <ul>{records[kind].map(record => <li key={record.id} className={draft.id === record.id ? 'selected' : ''}><span className="admin-help">{record.published ? 'Published' : 'Draft'} · Order {record.position}</span><h3>{record.title}</h3><div className="admin-toolbar"><button type="button" disabled={busy || setupError} onClick={() => select(kind, record)}>Edit</button><button type="button" disabled={busy || setupError} onClick={() => remove(record)}>Delete</button></div></li>)}</ul>
      </section>
      <form onSubmit={save} className="admin-editor"><fieldset disabled={busy || setupError}>
        <legend className="content-title mb-5">{draft.id ? 'Edit' : 'New'} {contentLabels[kind].toLowerCase()} entry</legend>
        {field('title', kind === 'news' ? 'Internal title (for your dashboard)' : 'Title', { required: true, max: 300 })}
        {kind === 'news' && <>{field('date_label', 'Display date (e.g. Oct 2026)', { required: true, max: 80 })}{field('date_value', 'Sort/reference date (YYYY, YYYY-MM, or YYYY-MM-DD)', { required: true, max: 10 })}<NewsEditor value={draft.body as NewsBody} onChange={body => change({ body })} /></>}
        {kind === 'projects' && <>{area('description', 'Project description', 20000)}<fieldset className="admin-categories"><legend>Category</legend>{['Engineering', 'Civic'].map(category => <label key={category}><input type="checkbox" checked={(draft.categories as string[]).includes(category)} onChange={e => change({ categories: e.target.checked ? [...draft.categories as string[], category] : (draft.categories as string[]).filter(value => value !== category) })} /> {category}</label>)}</fieldset>{field('credit', 'Contributors / credit', { max: 500 })}{field('date_label', 'Project dates (optional)', { max: 80 })}{field('link_url', 'Main project link', { required: true, type: 'url' })}{field('code_url', 'Code link (optional)', { type: 'url' })}{field('demo_url', 'Demo link (optional)', { type: 'url' })}</>}
        {kind === 'articles' && <>{area('excerpt', 'Article excerpt', 5000)}{field('date_value', 'Publication date', { type: 'date', required: true })}<label className="admin-field">Reading time (minutes)<input type="number" min={1} max={300} value={Number(draft.reading_minutes)} required onChange={e => change({ reading_minutes: Number(e.target.value) })} /></label>{field('url', 'Medium article URL', { type: 'url', required: true })}</>}
        {kind === 'books' && <>{field('author', 'Author', { max: 300 })}{area('body', 'Notes / thoughts', 30000)}{field('date_label', 'Reading date (optional)', { max: 80 })}{field('url', 'Book link (optional)', { type: 'url' })}<label className="admin-field">Reading status<select value={String(draft.status)} onChange={e => change({ status: e.target.value })}><option value="planned">Want to read</option><option value="in-progress">Reading</option><option value="completed">Completed</option></select></label></>}
        {kind !== 'news' && <fieldset className="admin-image"><legend>Image</legend><label className="admin-field">Upload PNG, JPEG, WebP, or GIF (up to 5 MB)<input type="file" accept="image/png,image/jpeg,image/webp,image/gif" onChange={e => { void upload(e.target.files?.[0]); e.target.value = ''; }} /></label>{!draft.image_path && field('image_url', 'Or use an HTTPS image URL / existing /images/ path')}{selectedImage && <><img src={selectedImage} alt="Selected cover" className="admin-image-preview" /><button type="button" className="btn-secondary" onClick={() => change({ image_path: '', image_url: '' })}>Remove from entry</button></>}<p className="admin-help">Uploads are private until attached to a published entry.</p></fieldset>}
        <label className="admin-field">Display order (lower numbers first)<input type="number" min={-1000000} max={1000000} step={1} value={Number(draft.position)} required onChange={e => change({ position: Number(e.target.value) })} /></label>
        <label className="admin-publish"><input type="checkbox" checked={Boolean(draft.published)} onChange={e => change({ published: e.target.checked })} /> Published — visible to everyone</label>
        <div className="admin-toolbar"><button className="btn-primary">{busy ? 'Working…' : draft.published ? 'Save and publish' : 'Save draft'}</button><button type="button" className="btn-secondary" onClick={() => { try { const values = validateContent(kind, draft); setPreview({ ...values, id: String(draft.id ?? 'preview') } as ContentRecord); setMessage(''); } catch (error) { setMessage(error instanceof Error ? error.message : 'Check your fields.'); } }}>Preview</button></div>
      </fieldset></form>
    </div>
    {preview && <section className="admin-preview"><div className="admin-toolbar"><h2 className="content-title">Preview · only visible to you</h2><button type="button" className="btn-secondary" onClick={() => setPreview(null)}>Close preview</button></div><Preview kind={kind} record={preview} /></section>}
  </div>;
}
