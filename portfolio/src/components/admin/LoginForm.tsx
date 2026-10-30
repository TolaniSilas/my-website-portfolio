'use client';
import { useActionState } from 'react';
import Link from 'next/link';
import { signIn } from '../../app/admin/actions';
export default function LoginForm() {
  const [state, action, pending] = useActionState(signIn, { error: '' });
  return <form action={action} className="card-surface w-full space-y-6 p-6 sm:p-10">
    <p className="text-sm text-muted dark:text-muted-dark">Sign in to manage your portfolio.</p>
    <label className="admin-field">Email<input name="email" type="email" autoComplete="username" required /></label>
    <label className="admin-field">Password<input name="password" type="password" autoComplete="current-password" required /></label>
    {state.error && <p role="alert" className="text-sm">{state.error}</p>}
    <button className="btn-primary" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
    <p className="text-sm"><Link href="/admin/reset-password" className="text-link">Forgot your password?</Link></p>
  </form>;
}
