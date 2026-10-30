'use client';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { acceptRecoverySession } from '../../app/admin/recovery-actions';
import { recoveryFragment } from '../../lib/cms/password-recovery';

export default function RecoveryRedirect() {
  const handled = useRef(false);
  const [message, setMessage] = useState('');
  useEffect(() => {
    if (handled.current) return;
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    if (fragment.has('error_code') || fragment.get('type') === 'recovery') {
      handled.current = true;
      const tokens = recoveryFragment(window.location.hash);
      // Remove credentials immediately from the visible URL and history entry.
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
      if (!tokens) { window.location.replace('/admin/reset-password?error=invalid_link'); return; }
      setMessage('Verifying your password reset link…');
      const form = new FormData();
      form.set('access_token', tokens.accessToken);
      form.set('refresh_token', tokens.refreshToken);
      void acceptRecoverySession(form).then(result => {
        if (result.ok) window.location.replace('/admin/update-password');
        else setMessage(result.error);
      }).catch(() => setMessage('Could not verify the link. Please request a new password reset.'));
    }
  }, []);
  return message ? <div className="recovery-notice" role="status"><p>{message}</p><Link href="/admin/reset-password">Request another reset link</Link></div> : null;
}
