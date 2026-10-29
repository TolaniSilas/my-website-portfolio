import test from 'node:test';
import assert from 'node:assert/strict';
import { blankNewsBody, emptyDraft, imageFor, imageType, isContentKind, isUuid, safeUrl, validateContent, validateDate, validateNewsBody } from '../src/lib/cms/model.ts';

const news = () => ({ ...emptyDraft('news'), title: 'Update', date_label: 'Oct 2026', date_value: '2026-10', body: { version: 1, blocks: [{ type: 'paragraph', children: [{ text: 'Read ' }, { text: 'QueryMate', href: 'https://github.com/TolaniSilas/Query-Mate', bold: true }, { text: ' at Cafe Cursor.' }] }] } });
test('news preserves inline links, formatting, and spaces without accepting HTML nodes', () => {
  const result = validateContent('news', news());
  assert.equal(result.body.blocks[0].children[0].text, 'Read ');
  assert.equal(result.body.blocks[0].children[1].bold, true);
  const invalid = news(); invalid.body.blocks[0].children[0].html = '<script />';
  assert.throws(() => validateContent('news', invalid), /Unsupported/);
});
test('news rejects unsafe link protocols, credential-bearing URLs, and oversized bodies', () => {
  for (const href of ['javascript:alert(1)', 'data:text/html,test', '//evil.test', 'http://example.com', 'https://user:pass@example.com']) {
    const input = news(); input.body.blocks[0].children[1].href = href;
    assert.throws(() => validateContent('news', input));
  }
  assert.throws(() => validateNewsBody(blankNewsBody()), /needs some text/);
  assert.throws(() => validateNewsBody({ version: 1, blocks: Array(21).fill({ type: 'paragraph', children: [{ text: 'Hi' }] }) }));
});
test('calendar validation supports precise and partial dates without silently rolling over invalid days', () => {
  for (const date of ['2026', '2026-10', '2024-02-29']) assert.equal(validateDate(date), date);
  for (const date of ['2026-02-29', '2026-13', 'Oct 2026', '2026-04-31']) assert.throws(() => validateDate(date));
  assert.throws(() => validateDate('2026-10', true, true));
});
test('content save allowlists fields and excludes client-controlled identity/version metadata', () => {
  const result = validateContent('news', { ...news(), id: 'spoof', version: 500, created_at: 'spoof', seed_key: 'spoof', role: 'admin' });
  for (const key of ['id', 'version', 'created_at', 'seed_key', 'role']) assert.equal(key in result, false);
  assert.throws(() => validateContent('news', { ...news(), position: 1.3 }));
  assert.throws(() => validateContent('news', { ...news(), published: 'true' }));
});
test('article listings require Medium URLs and a positive integer reading time', () => {
  const article = { ...emptyDraft('articles'), title: 'LLMs', excerpt: 'An introduction', date_value: '2024-08-20', url: 'https://medium.com/@silas/article' };
  assert.equal(validateContent('articles', article).reading_minutes, 12);
  for (const url of ['https://medium.com.evil.test/article', 'https://example.com', 'javascript:alert(1)']) assert.throws(() => validateContent('articles', { ...article, url }));
  for (const reading_minutes of [0, -1, 1.5, 301]) assert.throws(() => validateContent('articles', { ...article, reading_minutes }));
});
test('projects enforce valid categories and require a cover before publishing', () => {
  const project = { ...emptyDraft('projects'), title: 'Project', description: 'Details', link_url: 'https://github.com/silas/project' };
  assert.equal(validateContent('projects', project).published, false);
  assert.throws(() => validateContent('projects', { ...project, categories: ['Unknown'] }));
  assert.throws(() => validateContent('projects', { ...project, published: true }), /image/);
  assert.equal(validateContent('projects', { ...project, published: true, image_url: '/images/cv-image.png' }).published, true);
});
test('legacy books can remain published without a cover and validate reading states', () => {
  const book = { ...emptyDraft('books'), title: 'A book', published: true };
  assert.equal(validateContent('books', book).published, true);
  assert.throws(() => validateContent('books', { ...book, status: 'private' }));
});
test('uploaded media paths cannot escape the private image route', () => {
  const path = '00000000-0000-4000-8000-000000000001/00000000-0000-4000-8000-000000000002.png';
  assert.equal(imageFor({ image_path: path, image_url: '' }), `/media/${path}`);
  assert.throws(() => validateContent('books', { ...emptyDraft('books'), title: 'Book', image_path: '../secret.svg' }));
  assert.equal(safeUrl('//evil.test/image.png', true), '');
  assert.equal(isContentKind('owners'), false);
  assert.equal(isUuid('1 or true'), false);
});
test('upload MIME detection uses bytes and excludes SVG/HTML', () => {
  assert.deepEqual(imageType(new Uint8Array([137,80,78,71,13,10,26,10])), { mime: 'image/png', extension: 'png' });
  assert.equal(imageType(new TextEncoder().encode('<svg onload="alert(1)">')), null);
  assert.equal(imageType(new TextEncoder().encode('<html>')), null);
});
