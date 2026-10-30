'use client';

import { useEffect, useRef } from 'react';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';

export default function ConfirmationDialog({ title, busy, error, onCancel, onConfirm, intent = 'delete' }: {
  intent?: 'delete' | 'discard';
  title: string;
  busy: boolean;
  error: string;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const discarding = intent === 'discard';
  const dialogRef = useRef<HTMLDialogElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    dialog?.showModal();
    cancelRef.current?.focus();
    return () => {
      dialog?.close();
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus();
    };
  }, []);

  return <dialog
    ref={dialogRef}
    className="delete-confirmation"
    role="alertdialog"
    aria-labelledby="delete-title"
    aria-describedby="delete-description delete-entry"
    aria-busy={busy}
    onCancel={event => { event.preventDefault(); if (!busy) onCancel(); }}
  >
    <div className="delete-confirmation-icon">{discarding ? <FaRegEdit aria-hidden="true" /> : <FaRegTrashAlt aria-hidden="true" />}</div>
    <h2 id="delete-title">{discarding ? 'Discard unsaved changes?' : 'Delete this entry?'}</h2>
    <p id="delete-description">{discarding ? 'Your latest edits have not been saved. Keep editing to save them, or discard them to continue.' : 'This will permanently remove the entry from your portfolio. This action cannot be undone.'}</p>
    <p id="delete-entry" className="delete-confirmation-entry">{title}</p>
    {error && <p role="alert" className="delete-confirmation-error">{error}</p>}
    <div className="delete-confirmation-actions">
      <button ref={cancelRef} type="button" className="btn-secondary" disabled={busy} onClick={onCancel}>{discarding ? 'Keep editing' : 'Cancel'}</button>
      <button type="button" className="delete-confirmation-submit" disabled={busy} onClick={onConfirm}>{busy ? (discarding ? 'Continuing…' : 'Deleting…') : (discarding ? 'Discard changes' : 'Delete entry')}</button>
    </div>
    <span className="sr-only" role="status">{busy ? 'Please wait.' : ''}</span>
  </dialog>;
}
