import type { Metadata } from 'next';
import LoginForm from '../../../components/admin/LoginForm';
export const metadata: Metadata = { title: 'Owner sign in', robots: { index: false, follow: false } };
export const dynamic = 'force-dynamic';
export default function LoginPage() { return <div className="page-shell page-intro pb-20"><h1 className="page-title mb-6">Owner sign in</h1><LoginForm /></div>; }
