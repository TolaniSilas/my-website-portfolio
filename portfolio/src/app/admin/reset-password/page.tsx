import type { Metadata } from 'next';
import { ResetPasswordForm } from '../../../components/admin/PasswordForms';
export const metadata: Metadata = { title: 'Reset password', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';
export default async function ResetPasswordPage({ searchParams }: { searchParams: Promise<{ error?: string }> }) {
  const params = await searchParams;
  return <div className="page-shell flex min-h-[85dvh] items-center justify-center pt-28 pb-12"><section className="w-full max-w-xl"><h1 className="page-title mb-6 text-center">Reset your password</h1><ResetPasswordForm invalidLink={params.error === 'invalid_link'} /></section></div>;
}
