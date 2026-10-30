'use client';
import { useActionState } from 'react';
import Link from 'next/link';
import { changePassword, requestPasswordReset } from '../../app/admin/recovery-actions';

export function ResetPasswordForm({ invalidLink }: { invalidLink: boolean }) {
  const [state, action, pending] = useActionState(requestPasswordReset, { error: '', message: '' });
  return <form action={action} className="card-surface w-full space-y-6 p-6 sm:p-10">
    <p className="text-sm text-muted dark:text-muted-dark">Enter your owner account email. We’ll send a link to set a new password.</p>
    {invalidLink && <p role="alert" className="text-sm">That link is invalid, expired, or already used. Request a fresh link below.</p>}
    <label className="admin-field">Email<input type="email" name="email" required autoComplete="username" maxLength={320} /></label>
    {state.error && <p role="alert" className="text-sm">{state.error}</p>}
    {state.message && <p role="status" className="text-sm">{state.message}</p>}
    <button className="btn-primary" disabled={pending}>{pending ? 'Requesting link…' : 'Send reset link'}</button>
    <p className="text-sm"><Link className="text-link" href="/admin/login">Back to sign in</Link></p>
  </form>;
}
export function UpdatePasswordForm() {
  const [state, action, pending] = useActionState(changePassword, { error: '' });
  return <form action={action} className="card-surface w-full space-y-6 p-6 sm:p-10">
    <p className="text-sm text-muted dark:text-muted-dark">Choose a new password with at least 12 characters. You’ll sign in again after saving.</p>
    <label className="admin-field">New password<input type="password" name="password" required minLength={12} maxLength={128} autoComplete="new-password" /></label>
    <label className="admin-field">Confirm new password<input type="password" name="confirmation" required minLength={12} maxLength={128} autoComplete="new-password" /></label>
    {state.error && <p role="alert" className="text-sm">{state.error}</p>}
    <button className="btn-primary" disabled={pending}>{pending ? 'Updating password…' : 'Save new password'}</button>
  </form>;
}
