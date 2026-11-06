// One labeled field on the contribute form, in the underline style used on login and signup.
// multiline = textarea; otherwise a single-line input. Pass lang="km" for Khmer fields
// so the Khmer font applies. A non-empty error turns the underline red and shows the message.
export default function ContributeField({
  id,
  label,
  value,
  onChange,
  placeholder,
  error = "",
  multiline = false,
  rows = 4,
  lang = "en",
}) {
  const fieldClass = `w-full rounded-none border-0 border-b bg-transparent px-0 py-3 font-sans text-base leading-relaxed text-text-primary transition-colors placeholder:text-text-secondary/60 focus:border-accent ${
    error ? "border-accent" : "border-border"
  }`;

  return (
    <div className="mb-8">
      <label htmlFor={id} className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={id}
          rows={rows}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          lang={lang}
          className={`${fieldClass} resize-y`}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          lang={lang}
          className={fieldClass}
        />
      )}
      {error && <p className="mt-2 text-xs text-accent-text">{error}</p>}
    </div>
  );
}
