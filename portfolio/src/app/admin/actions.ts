'use server';

import { revalidatePath, updateTag } from 'next/cache';
import { redirect } from 'next/navigation';
import { requireOwner, sessionClient } from '../../lib/supabase/server';
import { contentTables, imageType, isContentKind, isUuid, MAX_IMAGE_BYTES, validateContent, type ActionResult, type ContentKind, type ContentRecord } from '../../lib/cms/model';

function invalidate(kind: ContentKind) {
  updateTag(`portfolio-${kind}`);
  const paths = kind === 'news' ? ['/'] : kind === 'projects' ? ['/projects', '/about'] : [`/${kind}`];
  paths.forEach(path => revalidatePath(path));
  revalidatePath('/admin');
}
function failure(error: unknown): { ok: false; error: string } {
  return { ok: false, error: error instanceof Error ? error.message : 'The request failed. Your edits are still available.' };
}
export async function signIn(_previous: { error: string }, form: FormData) {
  try {
    const email = String(form.get('email') ?? '').trim();
    const password = String(form.get('password') ?? '');
    if (!email || !password || email.length > 320 || password.length > 1000) return { error: 'Enter your email and password.' };
    const client = await sessionClient();
    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) return { error: 'Sign-in failed. Check your credentials and try again.' };
    try { await requireOwner(); } catch { await client.auth.signOut(); return { error: 'This account does not have owner access.' }; }
  } catch { return { error: 'Sign-in is unavailable. Check the Supabase configuration and connection.' }; }
  redirect('/admin');
}
export async function signOut() {
  const client = await sessionClient();
  await client.auth.signOut();
  redirect('/admin/login');
}
export async function saveContent(kind: ContentKind, input: unknown): Promise<ActionResult<ContentRecord>> {
  try {
    const { client, user } = await requireOwner();
    if (!isContentKind(kind)) throw new Error('Unknown content section.');
    const raw = input as Record<string, unknown>;
    const values = validateContent(kind, input);
    if (values.image_path && !String(values.image_path).startsWith(`${user.id}/`)) throw new Error('You can only attach your own uploads.');
    let query;
    if (raw.id !== undefined) {
      if (!isUuid(raw.id) || !Number.isSafeInteger(raw.version) || Number(raw.version) < 1) throw new Error('Invalid record version. Reload this entry.');
      query = client.from(contentTables[kind]).update(values).eq('id', raw.id).eq('version', raw.version);
    } else query = client.from(contentTables[kind]).insert(values);
    const { data, error } = await query.select().maybeSingle();
    if (error) throw new Error('Could not save. Check your connection and database setup; your edits have been kept.');
    if (!data) throw new Error('This entry changed in another tab or was deleted. Reload it before saving again.');
    invalidate(kind);
    return { ok: true, data: data as ContentRecord };
  } catch (error) { return failure(error); }
}
export async function deleteContent(kind: ContentKind, id: string, version: number): Promise<ActionResult> {
  try {
    const { client } = await requireOwner();
    if (!isContentKind(kind) || !isUuid(id) || !Number.isSafeInteger(version)) throw new Error('Invalid entry.');
    const { data, error } = await client.from(contentTables[kind]).delete().eq('id', id).eq('version', version).select('id').maybeSingle();
    if (error) throw new Error('Could not delete this entry. Please try again.');
    if (!data) throw new Error('This entry changed in another tab or was deleted. Reload the list.');
    invalidate(kind);
    return { ok: true, data: undefined };
  } catch (error) { return failure(error); }
}
export async function uploadImage(form: FormData): Promise<ActionResult<{ path: string }>> {
  try {
    const { client, user } = await requireOwner();
    const file = form.get('image');
    if (!(file instanceof File) || file.size === 0 || file.size > MAX_IMAGE_BYTES) throw new Error('Choose a PNG, JPEG, WebP, or GIF up to 5 MB.');
    const bytes = new Uint8Array(await file.arrayBuffer());
    const type = imageType(bytes);
    if (!type || file.type !== type.mime) throw new Error('The image contents must match its PNG, JPEG, WebP, or GIF file type.');
    const path = `${user.id}/${crypto.randomUUID()}.${type.extension}`;
    const { error } = await client.storage.from('portfolio-media').upload(path, bytes, { contentType: type.mime, upsert: false, cacheControl: '0' });
    if (error) throw new Error('Image upload failed. Check the storage policies and connection.');
    return { ok: true, data: { path } };
  } catch (error) { return failure(error); }
}
