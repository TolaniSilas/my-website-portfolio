// Run with Node >= 22.18: node --experimental-strip-types scripts/generate-cms-seed.mjs
// Data files are migration input only; public pages read the database.
import { writeFile } from 'node:fs/promises';
import { news } from '../src/data/news.ts';
import { projects } from '../src/data/projects.ts';
import { posts } from '../src/data/articles.ts';
import { validateContent } from '../src/lib/cms/model.ts';

const quote = value => "'" + String(value).replaceAll("'", "''") + "'";
function sqlValue(value) {
  if (value === null) return 'null';
  if (typeof value === 'boolean') return value ? 'true' : 'false';
  if (typeof value === 'number') return String(value);
  if (Array.isArray(value)) return 'array[' + value.map(quote).join(',') + ']::text[]';
  if (typeof value === 'object') return quote(JSON.stringify(value)) + '::jsonb';
  return quote(value);
}
const statements = ['-- Generated from existing portfolio content. Apply AFTER migration 005.', '-- Re-running preserves existing edits; matching seed keys are never overwritten.', 'begin;'];
function add(kind, key, input) {
  const values = { seed_key: key, ...validateContent(kind, input) };
  statements.push(`insert into public.portfolio_${kind} (${Object.keys(values).join(', ')}) values (${Object.values(values).map(sqlValue).join(', ')}) on conflict (seed_key) do nothing;`);
}
news.forEach((entry, i) => {
  const children = [{ text: entry.text }];
  for (const part of entry.parts ?? []) children.push(typeof part === 'string' ? { text: part } : { text: part.label + ' ↗', href: part.url });
  if (entry.link) children.push({ text: entry.link.label + ' ↗', href: entry.link.url });
  if (entry.after) children.push({ text: entry.after });
  add('news', `news-${entry.id}`, { title: children.map(span => span.text).join('').slice(0, 300), position: i, published: true, date_label: entry.date, date_value: entry.dateTime, body: { version: 1, blocks: [{ type: 'paragraph', children }] } });
});
projects.forEach((entry, i) => add('projects', `project-${entry.id}`, {
  title: entry.title, position: i, published: true, description: entry.description, categories: entry.categories, credit: entry.credit ?? 'Silas Osunba', date_label: '', image_url: entry.image, image_path: '', link_url: entry.link,
  code_url: new URL(entry.link).hostname === 'github.com' ? entry.link : '', demo_url: new URL(entry.link).hostname === 'github.com' || entry.categories.includes('Civic') ? '' : entry.link,
}));
posts.forEach((entry, i) => add('articles', `article-${entry.id}`, { title: entry.title, position: i, published: true, image_url: entry.image, image_path: '', excerpt: entry.excerpt, date_value: entry.dateTime, reading_minutes: entry.readingMinutes, url: entry.slug }));
statements.push('commit;', '');
await writeFile(new URL('../supabase/006_initial_content.sql', import.meta.url), statements.join('\n'));
console.log(`Generated migration content: ${news.length} news, ${projects.length} projects, ${posts.length} articles. Existing books are copied by migration 005.`);
