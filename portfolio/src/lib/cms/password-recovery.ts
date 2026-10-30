export function recoveryOrigin(origin: string | null, host: string | null): string {
  if (!origin || !host) throw new Error('Could not verify this request. Reload and try again.');
  const url = new URL(origin);
  if (url.host !== host || (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost', '127.0.0.1', '[::1]'].includes(url.hostname)))) throw new Error('Invalid recovery origin.');
  return url.origin;
}
export function validateNewPassword(password: unknown, confirmation: unknown): string {
  if (typeof password !== 'string' || password.length < 12 || password.length > 128) throw new Error('Use a password between 12 and 128 characters.');
  if (password !== confirmation) throw new Error('The passwords do not match.');
  return password;
}
export function recoveryFragment(hash: string): { accessToken: string; refreshToken: string } | null {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  if (params.get('type') !== 'recovery') return null;
  const accessToken = params.get('access_token') ?? '';
  const refreshToken = params.get('refresh_token') ?? '';
  if (!accessToken || accessToken.length > 8192 || !refreshToken || refreshToken.length > 2048) return null;
  return { accessToken, refreshToken };
}
