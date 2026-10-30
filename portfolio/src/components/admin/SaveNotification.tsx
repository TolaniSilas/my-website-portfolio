'use client';

import { FaCheckCircle, FaExclamationCircle, FaSpinner, FaTimes } from 'react-icons/fa';

export type SaveNotice = {
  status: 'saving' | 'success' | 'error';
  title: string;
  description: string;
};

export default function SaveNotification({ notice, onDismiss }: { notice: SaveNotice; onDismiss: () => void }) {
  const Icon = notice.status === 'saving' ? FaSpinner : notice.status === 'success' ? FaCheckCircle : FaExclamationCircle;
  return <div className={`admin-save-notice admin-save-notice-${notice.status}`} role={notice.status === 'error' ? 'alert' : 'status'} aria-atomic="true">
    <Icon className="admin-save-notice-icon" aria-hidden="true" />
    <div className="admin-save-notice-text"><p className="admin-save-notice-title">{notice.title}</p><p>{notice.description}</p></div>
    {notice.status !== 'saving' && <button type="button" aria-label="Dismiss save notification" onClick={onDismiss}><FaTimes aria-hidden="true" /></button>}
  </div>;
}
