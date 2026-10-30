export const contentKinds = ['news', 'projects', 'articles', 'books'] as const;
export type ContentKind = typeof contentKinds[number];
export const contentLabels: Record<ContentKind, string> = { news: 'News', projects: 'Projects', articles: 'Writings', books: 'Books' };
export const contentTables: Record<ContentKind, string> = { news: 'portfolio_news', projects: 'portfolio_projects', articles: 'portfolio_articles', books: 'portfolio_books' };
export type RichSpan = { text: string; href?: string; bold?: boolean; italic?: boolean };
export type NewsBody = { version: 1; blocks: { type: 'paragraph'; children: RichSpan[] }[] };
export type RecordBase = { id: string; title: string; position: number; published: boolean; version: number; created_at: string; updated_at: string };
export type NewsRecord = RecordBase & { date_label: string; date_value: string; body: NewsBody };
export type ImageFields = { image_url: string; image_path: string };
export type ProjectRecord = RecordBase & ImageFields & { description: string; categories: ('Engineering' | 'Civic')[]; credit: string; date_label: string; link_url: string; code_url: string; demo_url: string };
export type ArticleRecord = RecordBase & ImageFields & { excerpt: string; date_value: string; reading_minutes: number; url: string };
export type BookRecord = RecordBase & ImageFields & { author: string; body: string; date_label: string; status: 'planned' | 'in-progress' | 'completed'; url: string };
export type ContentMap = { news: NewsRecord; projects: ProjectRecord; articles: ArticleRecord; books: BookRecord };
export type ContentRecord = ContentMap[ContentKind];
export type ActionResult<T = undefined> = { ok: true; data: T } | { ok: false; error: string };

export function isContentKind(value: unknown): value is ContentKind {
  return typeof value === 'string' && (contentKinds as readonly string[]).includes(value);
}
export function isUuid(value: unknown): value is string {
  return typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}
export function safeUrl(value: string, image = false): string {
  if (image && /^\/(?!\/)[a-zA-Z0-9/_ .%-]+$/.test(value)) return value;
  try { const url = new URL(value); return url.protocol === 'https:' && !url.username && !url.password ? url.href : ''; } catch { return ''; }
}
export function imageFor(record: ImageFields): string {
  return record.image_path ? `/media/${record.image_path.split('/').map(encodeURIComponent).join('/')}` : safeUrl(record.image_url, true);
}
export function blankNewsBody(): NewsBody { return { version: 1, blocks: [{ type: 'paragraph', children: [{ text: '' }] }] }; }
function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('Invalid content.');
  return value as Record<string, unknown>;
}
function text(value: unknown, label: string, max: number, required = false): string {
  if (typeof value !== 'string' || value.length > max || (required && !value.trim())) throw new Error(`${label}${required ? ' is required and' : ''} must be at most ${max} characters.`);
  return value.trim();
}
function integer(value: unknown, label: string, min: number, max: number): number {
  if (typeof value !== 'number' || !Number.isSafeInteger(value) || value < min || value > max) throw new Error(`${label} must be a whole number between ${min} and ${max}.`);
  return value;
}
function link(value: unknown, label: string, required = false, image = false): string {
  const raw = text(value, label, 2048, required);
  if (!raw) return '';
  const safe = safeUrl(raw, image);
  if (!safe) throw new Error(`${label} must use HTTPS${image ? ' or a local /images/ path' : ''}.`);
  if (image && safe.startsWith('/') && !safe.startsWith('/images/')) throw new Error('Local images must be inside /images/.');
  return safe;
}
export function validateDate(value: unknown, required = true, full = false): string {
  const raw = text(value, 'Date', 10, required);
  if (!raw && !required) return '';
  if (!(full ? /^\d{4}-\d{2}-\d{2}$/ : /^\d{4}(?:-\d{2}(?:-\d{2})?)?$/).test(raw)) throw new Error('Use YYYY, YYYY-MM, or YYYY-MM-DD for the date.');
  const [year, month = '01', day = '01'] = raw.split('-');
  const date = new Date(`${year}-${month}-${day}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== `${year}-${month}-${day}`) throw new Error('Enter a real calendar date.');
  return raw;
}
export function validateNewsBody(value: unknown): NewsBody {
  const doc = object(value);
  if (doc.version !== 1 || !Array.isArray(doc.blocks) || doc.blocks.length < 1 || doc.blocks.length > 20) throw new Error('News needs 1–20 paragraphs.');
  let count = 0;
  const blocks = doc.blocks.map(raw => {
    const block = object(raw);
    if (block.type !== 'paragraph' || !Array.isArray(block.children) || block.children.length < 1 || block.children.length > 100) throw new Error('Invalid news paragraph.');
    const children = block.children.map(rawSpan => {
      const span = object(rawSpan);
      if (Object.keys(span).some(key => !['text', 'href', 'bold', 'italic'].includes(key))) throw new Error('Unsupported news formatting.');
      if (typeof span.text !== 'string' || span.text.length > 5000) throw new Error('News text is too long.');
      count += span.text.length;
      const result: RichSpan = { text: span.text };
      if (span.href !== undefined) result.href = link(span.href, 'News link', true);
      for (const key of ['bold', 'italic'] as const) {
        if (span[key] !== undefined && typeof span[key] !== 'boolean') throw new Error('Invalid formatting.');
        if (span[key] === true) result[key] = true;
      }
      return result;
    });
    return { type: 'paragraph' as const, children };
  });
  if (count > 20000 || !blocks.some(block => block.children.some(span => span.text.trim()))) throw new Error('News needs some text, with a maximum of 20,000 characters.');
  return { version: 1, blocks };
}
export function validateContent(kind: ContentKind, input: unknown): Record<string, unknown> {
  const raw = object(input);
  if (typeof raw.published !== 'boolean') throw new Error('Choose draft or published.');
  const base: Record<string, unknown> = { title: text(raw.title, 'Title', 300, true), position: integer(raw.position, 'Display order', -1000000, 1000000), published: raw.published };
  if (kind === 'news') return { ...base, date_label: text(raw.date_label, 'Display date', 80, true), date_value: validateDate(raw.date_value), body: validateNewsBody(raw.body) };
  const imagePath = text(raw.image_path, 'Uploaded image path', 300);
  if (imagePath && !/^[0-9a-f-]{36}\/[0-9a-f-]{36}\.(png|jpg|webp|gif)$/.test(imagePath)) throw new Error('Invalid uploaded image path.');
  const images = { image_url: link(raw.image_url, 'Image', false, true), image_path: imagePath };
  if (imagePath && images.image_url) throw new Error('Choose an uploaded image or an image URL, not both.');
  if (kind !== 'books' && raw.published && !imagePath && !images.image_url) throw new Error('Add an image before publishing.');
  if (kind === 'projects') {
    if (!Array.isArray(raw.categories) || !raw.categories.length || raw.categories.length > 2 || raw.categories.some(cat => !['Engineering', 'Civic'].includes(String(cat)))) throw new Error('Choose Engineering or Civic.');
    return { ...base, ...images, description: text(raw.description, 'Description', 20000, true), categories: [...new Set(raw.categories)], credit: text(raw.credit, 'Contributors', 500), date_label: text(raw.date_label, 'Project dates', 80), link_url: link(raw.link_url, 'Project link', true), code_url: link(raw.code_url, 'Code link'), demo_url: link(raw.demo_url, 'Demo link') };
  }
  if (kind === 'articles') {
    const url = link(raw.url, 'Medium URL', true);
    const host = new URL(url).hostname;
    if (host !== 'medium.com' && !host.endsWith('.medium.com')) throw new Error('Writings must link to Medium.');
    return { ...base, ...images, excerpt: text(raw.excerpt, 'Excerpt', 5000, true), date_value: validateDate(raw.date_value, true, true), reading_minutes: integer(raw.reading_minutes, 'Reading time', 1, 300), url };
  }
  if (!['planned', 'in-progress', 'completed'].includes(String(raw.status))) throw new Error('Choose a reading status.');
  return { ...base, ...images, author: text(raw.author, 'Author', 300), body: text(raw.body, 'Book notes', 30000), date_label: text(raw.date_label, 'Reading date', 80), status: raw.status, url: link(raw.url, 'Book link') };
}
export function emptyDraft(kind: ContentKind): Record<string, unknown> {
  const common = { title: '', position: 0, published: false, image_url: '', image_path: '' };
  if (kind === 'news') return { ...common, date_label: '', date_value: '', body: blankNewsBody() };
  if (kind === 'projects') return { ...common, description: '', categories: ['Engineering'], credit: 'Silas Osunba', date_label: '', link_url: '', code_url: '', demo_url: '' };
  if (kind === 'articles') return { ...common, excerpt: '', date_value: '', reading_minutes: 12, url: '' };
  return { ...common, author: '', body: '', date_label: '', status: 'planned', url: '' };
}
export const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
export function imageType(bytes: Uint8Array): { mime: string; extension: string } | null {
  if (bytes.length >= 8 && [137,80,78,71,13,10,26,10].every((value, i) => bytes[i] === value)) return { mime: 'image/png', extension: 'png' };
  if (bytes.length >= 3 && bytes[0] === 255 && bytes[1] === 216 && bytes[2] === 255) return { mime: 'image/jpeg', extension: 'jpg' };
  const magic = new TextDecoder().decode(bytes.slice(0, 12));
  if (magic.startsWith('GIF87a') || magic.startsWith('GIF89a')) return { mime: 'image/gif', extension: 'gif' };
  if (magic.startsWith('RIFF') && magic.slice(8, 12) === 'WEBP') return { mime: 'image/webp', extension: 'webp' };
  return null;
}
