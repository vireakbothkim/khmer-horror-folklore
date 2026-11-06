// Centred photo input in the same underline style as the text fields.
// label is the heading above the input (defaults to "Photo"). lang sets the
// language of the label and hint ("km" for Khmer). hint is the helper line
// under the input. children appear below it (for example, the current photo
// on the edit page).
export default function PhotoField({ id = "photo", label = "Photo", lang = "en", hint, onChange, children }) {
  // Khmer script looks smaller than Latin at the same size, so it gets one step up.
  const textSize = lang === "km" ? "text-lg" : "text-base";

  return (
    <div className="mx-auto mt-12 mb-8 w-full max-w-[480px] text-center">
      <label htmlFor={id} lang={lang} className={`mb-2 block font-mono ${textSize} uppercase tracking-[0.2em] text-text-primary`}>
        {label}
      </label>
      <input
        id={id}
        type="file"
        accept=".jpg,.jpeg,.png,.webp"
        onChange={onChange}
        className="w-full border-0 border-b border-border bg-transparent py-3 text-base text-text-primary transition-colors focus:border-accent file:mr-4 file:border file:border-border file:bg-transparent file:px-4 file:py-2 file:font-mono file:text-base file:uppercase file:tracking-[0.2em] file:text-text-primary hover:file:border-accent hover:file:text-accent"
      />
      <p lang={lang} className={`mt-2 ${textSize} text-text-primary`}>{hint}</p>
      {children}
    </div>
  );
}
