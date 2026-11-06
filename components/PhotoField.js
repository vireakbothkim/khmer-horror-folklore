// Centred photo input in the same underline style as the text fields.
// hint is the helper line under the input. children appear below it (for example,
// the current photo on the edit page).
export default function PhotoField({ id = "photo", hint, onChange, children }) {
  return (
    <div className="mx-auto mt-12 mb-8 w-full max-w-[480px] text-center">
      <label htmlFor={id} className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
        Photo
      </label>
      <input
        id={id}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={onChange}
        className="w-full border-0 border-b border-border bg-transparent py-3 text-sm text-text-secondary transition-colors focus:border-accent file:mr-4 file:border file:border-border file:bg-transparent file:px-4 file:py-2 file:font-mono file:text-xs file:uppercase file:tracking-[0.2em] file:text-text-primary hover:file:border-accent hover:file:text-accent"
      />
      <p className="mt-2 text-xs text-text-secondary">{hint}</p>
      {children}
    </div>
  );
}
