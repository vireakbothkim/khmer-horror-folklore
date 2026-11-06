// Owner-only controls on the entry page: a title and Edit/Delete buttons.
// No box or background, so it floats above the entry card.
// Button styles match the site header nav, so the page feels consistent.
// The title is a <p>, not an <h2>: the global h1-h6 rule in layout.js is
// unlayered and would override the mono font class.
const editClass =
  "cursor-pointer whitespace-nowrap rounded border border-border px-3 py-1 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:border-accent hover:text-accent sm:px-5 sm:py-2.5 sm:text-sm";
const deleteClass =
  "cursor-pointer whitespace-nowrap rounded border border-accent bg-accent px-3 py-1 font-mono text-xs uppercase tracking-wider text-text-primary transition-colors hover:border-accent-hover hover:bg-accent-hover sm:px-5 sm:py-2.5 sm:text-sm";

export default function OwnerActions({ onEdit, onDelete }) {
  return (
    <section className="mb-6">
      <p className="mb-4 font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
        Entry Management
      </p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onEdit} className={editClass}>
          Edit Entry
        </button>
        <button type="button" onClick={onDelete} className={deleteClass}>
          Delete Entry
        </button>
      </div>
    </section>
  );
}
