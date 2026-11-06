import ContributeField from "./ContributeField";

// One card on the entry form: a header line, then its five fields.
// On desktop the card spans six grid rows (header + five fields) and uses subgrid,
// so its rows line up with the card beside it. className places it in its column.
export default function EntryFieldCard({ title, lang, fields, formData, fieldErrors, onChange, className = "" }) {
  return (
    <div className={`grid rounded-md border border-border p-6 md:row-span-6 md:grid-rows-subgrid md:p-8 ${className}`}>
      <p
        lang={lang}
        className="mb-6 border-b border-border pb-4 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent-text [font-variant-caps:small-caps]"
      >
        {title}
      </p>
      {fields.map(({ field, label, placeholder, multiline, rows }) => (
        <ContributeField
          key={field}
          id={field}
          label={label}
          value={formData[field]}
          onChange={onChange(field)}
          placeholder={placeholder}
          multiline={multiline}
          rows={rows}
          error={fieldErrors[field]}
          lang={field.endsWith("_km") ? "km" : "en"}
        />
      ))}
    </div>
  );
}
