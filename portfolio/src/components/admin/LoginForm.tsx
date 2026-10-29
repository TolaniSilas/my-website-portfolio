'use client';
import { useActionState } from 'react';
import { signIn } from '../../app/admin/actions';
export default function LoginForm() {
  const [state, action, pending] = useActionState(signIn, { error: '' });
  return <form action={action} className="card-surface max-w-md space-y-5 p-6">
    <p className="text-sm text-muted dark:text-muted-dark">Sign in to manage your portfolio.</p>
    <label className="admin-field">Email<input name="email" type="email" autoComplete="username" required /></label>
    <label className="admin-field">Password<input name="password" type="password" autoComplete="current-password" required /></label>
    {state.error && <p role="alert" className="text-sm">{state.error}</p>}
    <button className="btn-primary" disabled={pending}>{pending ? 'Signing in…' : 'Sign in'}</button>
  </form>;
}
