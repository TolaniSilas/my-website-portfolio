'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function ContentPreview({ children, onClose }: { children: ReactNode; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog?.showModal();
    closeRef.current?.focus();
    return () => {
      dialog?.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  return <dialog ref={dialogRef} className="admin-preview-dialog" aria-labelledby="preview-title" aria-describedby="preview-description" onCancel={event => { event.preventDefault(); onClose(); }}>
    <div className="admin-preview-dialog-header">
      <div><h2 id="preview-title" className="content-title">Content preview</h2><p id="preview-description" className="admin-help">Only visible to you. Previewing does not save or publish your changes.</p></div>
      <button ref={closeRef} type="button" className="btn-secondary" onClick={onClose}><FaTimes aria-hidden="true" />Close preview</button>
    </div>
    <div className="admin-preview-dialog-content">{children}</div>
  </dialog>;
}
