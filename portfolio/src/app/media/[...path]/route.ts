import { sessionClient } from '../../../lib/supabase/server';

export const dynamic = 'force-dynamic';
export async function GET(_request: Request, { params }: { params: Promise<{ path: string[] }> }) {
  const { path } = await params;
  const key = path.join('/');
  const headers = { 'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff' };
  if (!/^[0-9a-f-]{36}\/[0-9a-f-]{36}\.(png|jpg|webp|gif)$/.test(key)) return new Response('Not found', { status: 404, headers });
  try {
    const client = await sessionClient();
    const { data, error } = await client.storage.from('portfolio-media').download(key);
    if (error || !data) return new Response('Not found', { status: 404, headers });
    return new Response(data, { headers: { ...headers, 'Content-Type': data.type, 'Content-Disposition': 'inline' } });
  } catch { return new Response('Image unavailable', { status: 503, headers }); }
}
