'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { FaTimes } from 'react-icons/fa';

export default function EntryEditorDialog({ title, busy, onClose, children }: {
  title: string;
  busy: boolean;
  onClose: () => void;
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog?.showModal();
    headingRef.current?.focus();
    return () => {
      dialog?.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  return <dialog ref={dialogRef} className="entry-editor-dialog" aria-labelledby="entry-editor-title" onCancel={event => { event.preventDefault(); if (!busy) onClose(); }}>
    <header className="entry-editor-dialog-header">
      <div><h2 ref={headingRef} tabIndex={-1} id="entry-editor-title" className="content-title">{title}</h2><p className="admin-help">Edit the details, preview your entry, then save a draft or publish.</p></div>
      <button type="button" className="btn-secondary" disabled={busy} onClick={onClose}><FaTimes aria-hidden="true" />Close</button>
    </header>
    {children}
  </dialog>;
}
