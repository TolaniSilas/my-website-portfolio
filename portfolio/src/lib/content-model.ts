export const kinds = ['project', 'article', 'publication', 'book', 'plan', 'about', 'intro'] as const;
export type ContentKind = typeof kinds[number];
export type ContentEntry = {
  id: string;
  kind: ContentKind;
  title: string;
  body: string;
  url: string;
  image: string;
  author: string;
  date: string;
  status: 'planned' | 'in-progress' | 'completed';
  categories: string[];
  position: number;
  published: boolean;
};
export const labels: Record<ContentKind, string> = {
  project: 'Projects', article: 'Articles', publication: 'Publications', book: 'Books',
  plan: 'List66', about: 'Biography sections', intro: 'Homepage introduction',
};
export function emptyEntry(kind: ContentKind): Omit<ContentEntry, 'id'> {
  return { kind, title: '', body: '', url: '', image: '', author: '', date: '', status: 'planned', categories: [], position: 0, published: false };
}
export function safeUrl(value: string, image = false): string {
  if (image && /^\/[^/]/.test(value)) return value;
  try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) ? value : ''; } catch { return ''; }
}
