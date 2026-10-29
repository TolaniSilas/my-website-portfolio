export type ContentEntry = {
  id: string;
  kind: 'book';
  title: string;
  body: string;
  url: string;
  image: string;
  author: string;
  date: string;
  status: 'planned' | 'in-progress' | 'completed';
  position: number;
  published: boolean;
};
export function emptyEntry(): Omit<ContentEntry, 'id'> {
  return { kind: 'book', title: '', body: '', url: '', image: '', author: '', date: '', status: 'planned', position: 0, published: false };
}
export function safeUrl(value: string, image = false): string {
  if (image && /^\/[^/]/.test(value)) return value;
  try { const url = new URL(value); return ['http:', 'https:'].includes(url.protocol) ? value : ''; } catch { return ''; }
}