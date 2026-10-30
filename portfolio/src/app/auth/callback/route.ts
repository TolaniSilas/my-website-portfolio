import { NextResponse, type NextRequest } from 'next/server';
import { requireOwner, sessionClient } from '../../../lib/supabase/server';

export async function GET(request: NextRequest) {
  let target = '/admin/reset-password?error=invalid_link';
  const code = request.nextUrl.searchParams.get('code');
  const tokenHash = request.nextUrl.searchParams.get('token_hash');
  try {
    const client = await sessionClient();
    const result = code ? await client.auth.exchangeCodeForSession(code)
      : tokenHash && request.nextUrl.searchParams.get('type') === 'recovery' ? await client.auth.verifyOtp({ token_hash: tokenHash, type: 'recovery' }) : null;
    if (result && !result.error) {
      try { await requireOwner(); target = '/admin/update-password'; }
      catch { await client.auth.signOut({ scope: 'local' }); }
    }
  } catch { /* Expired/mismatched links return to the recovery form. */ }
  const response = NextResponse.redirect(new URL(target, request.url));
  response.headers.set('Cache-Control', 'private, no-store');
  response.headers.set('Referrer-Policy', 'no-referrer');
  return response;
}
