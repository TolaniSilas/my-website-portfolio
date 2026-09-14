import type { Metadata } from 'next';
import CollectionPage from '../../views/CollectionPage';
export const metadata: Metadata = { title: 'List66' };
export default function Page() { return <CollectionPage kind="plan" />; }
