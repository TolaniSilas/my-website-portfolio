import type { Metadata } from 'next';
import LoginForm from '../../../components/admin/LoginForm';
export const metadata: Metadata = { title: 'Owner sign in', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';
export default function LoginPage() {
  return <div className="page-shell flex min-h-[85dvh] items-center justify-center pt-28 pb-12">
    <section className="w-full max-w-xl" aria-labelledby="login-heading">
      <h1 id="login-heading" className="page-title mb-6 text-center">Owner sign in</h1>
      <LoginForm />
    </section>
  </div>;
}
