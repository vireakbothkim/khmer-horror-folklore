// Owner-only panel at the top of an entry that was returned for changes.
// It shows the reviewer's note, plus the date it was returned.
export default function ReturnNoteNotice({ note, returnedAt }) {
  const dateText = returnedAt ? new Date(returnedAt).toLocaleDateString() : "";

  return (
    <div className="mb-8 rounded-md border border-[rgb(239,68,68)] bg-[rgba(239,68,68,0.1)] p-5">
      <p className="m-0 font-mono text-xs font-bold uppercase tracking-[0.1em] text-[rgb(239,68,68)] [font-variant-caps:small-caps]">
        Returned for changes{dateText ? ` · ${dateText}` : ""}
      </p>
      <p className="m-0 mt-3 whitespace-pre-wrap text-base leading-relaxed text-text-primary [overflow-wrap:anywhere]">
        {note}
      </p>
    </div>
  );
}
