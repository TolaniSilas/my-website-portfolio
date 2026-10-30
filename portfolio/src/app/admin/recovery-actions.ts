'use server';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import { requireOwner, sessionClient } from '../../lib/supabase/server';
import { recoveryOrigin, validateNewPassword } from '../../lib/cms/password-recovery';
import type { ActionResult } from '../../lib/cms/model';

export async function requestPasswordReset(_previous: { error: string; message: string }, form: FormData) {
  const email = String(form.get('email') ?? '').trim();
  if (!email || email.length > 320 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { error: 'Enter a valid email address.', message: '' };
  try {
    const requestHeaders = await headers();
    const origin = recoveryOrigin(requestHeaders.get('origin'), requestHeaders.get('x-forwarded-host') ?? requestHeaders.get('host'));
    const client = await sessionClient();
    const { error } = await client.auth.resetPasswordForEmail(email, { redirectTo: `${origin}/auth/callback` });
    if (error) return { error: 'Could not request a reset. Please wait a minute and try again.', message: '' };
    return { error: '', message: 'If this email has an account, a reset link has been sent. Open the newest email in this same browser to set a new password.' };
  } catch { return { error: 'Password recovery is unavailable. Check the connection and Supabase settings.', message: '' }; }
}
// Compatibility for dashboard-generated recovery links, which can carry tokens
// in a fragment. Tokens travel only in a same-origin POST, never URL parameters.
export async function acceptRecoverySession(form: FormData): Promise<ActionResult> {
  const accessToken = form.get('access_token');
  const refreshToken = form.get('refresh_token');
  if (typeof accessToken !== 'string' || !accessToken || accessToken.length > 8192 || typeof refreshToken !== 'string' || !refreshToken || refreshToken.length > 2048) return { ok: false, error: 'Invalid recovery link. Request a new one.' };
  try {
    const client = await sessionClient();
    const { error } = await client.auth.setSession({ access_token: accessToken, refresh_token: refreshToken });
    if (error) return { ok: false, error: 'The recovery link has expired or was already used. Request a new one.' };
    try { await requireOwner(); }
    catch { await client.auth.signOut({ scope: 'local' }); return { ok: false, error: 'This link is not for the portfolio owner account.' }; }
    return { ok: true, data: undefined };
  } catch { return { ok: false, error: 'Could not verify the recovery link. Please request a new one.' }; }
}
export async function changePassword(_previous: { error: string }, form: FormData) {
  try {
    const { client } = await requireOwner();
    const password = validateNewPassword(form.get('password'), form.get('confirmation'));
    const { error } = await client.auth.updateUser({ password });
    if (error) return { error: error.message };
    await client.auth.signOut({ scope: 'global' });
  } catch (error) { return { error: error instanceof Error ? error.message : 'Could not update the password. Request a new link and try again.' }; }
  redirect('/admin/login?password=updated');
}
