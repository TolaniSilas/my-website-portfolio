export const dynamic = 'force-dynamic';
import type { Metadata } from 'next';
import CollectionPage from '../../views/CollectionPage';
export const metadata: Metadata = { title: 'Books' };
export default function Page() { return <CollectionPage />; }
