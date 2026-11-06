"use client";

import { useState } from "react";

// Dialog for "Return for changes". The reviewer's note is shown only to the
// contributor, on their My Entries page. Cancel closes it without saving.
const cancelClass =
  "inline-flex cursor-pointer items-center border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-text-secondary transition-colors hover:border-accent hover:text-accent";
const submitClass =
  "inline-flex cursor-pointer items-center border border-accent bg-accent px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-text-primary transition-colors hover:border-accent-hover hover:bg-accent-hover";

export default function ReturnNotesModal({ onSubmit, onCancel }) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!notes.trim()) {
      setError("Please write a note explaining what needs to change.");
      return;
    }
    onSubmit(notes.trim());
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="return-notes-title"
        className="w-full max-w-[600px] rounded-md border border-border bg-bg p-8"
      >
        <h2 id="return-notes-title" className="m-0 text-2xl font-bold text-text-primary">
          Return for changes
        </h2>
        <p className="mb-0 mt-3 text-sm leading-relaxed text-text-secondary">
          Explain what the contributor needs to change. You can write in English, Khmer, or both.
        </p>
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            if (error) setError("");
          }}
          placeholder="Write your note here..."
          className="mt-5 box-border min-h-[140px] w-full resize-y rounded-sm border border-border bg-transparent p-3 text-base text-text-primary"
        />
        {error && <p className="mb-0 mt-2 text-sm text-accent-text">{error}</p>}
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onCancel} className={cancelClass}>
            Cancel
          </button>
          <button type="button" onClick={handleSubmit} className={submitClass}>
            Submit Return
          </button>
        </div>
      </div>
    </div>
  );
}
