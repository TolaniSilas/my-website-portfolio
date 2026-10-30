import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { requireOwner } from '../../../lib/supabase/server';
import { UpdatePasswordForm } from '../../../components/admin/PasswordForms';
export const metadata: Metadata = { title: 'Choose a new password', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';
export default async function UpdatePasswordPage() {
  const owner = await requireOwner().catch(() => null);
  if (!owner) redirect('/admin/reset-password?error=invalid_link');
  return <div className="page-shell flex min-h-[85dvh] items-center justify-center pt-28 pb-12"><section className="w-full max-w-xl"><h1 className="page-title mb-6 text-center">Choose a new password</h1><UpdatePasswordForm /></section></div>;
}
