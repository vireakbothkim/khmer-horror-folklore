// Sort dropdown for /review: oldest first or newest first. Same look as the
// status filter on /my-entries, but with the neutral text color.
export default function SortFilter({ label, value, onChange, options }) {
  return (
    <div className="flex items-center gap-3">
      <label
        htmlFor="review-sort-filter"
        className="font-mono text-xs uppercase tracking-[0.05em] text-text-secondary [font-variant-caps:small-caps]"
      >
        {label}
      </label>
      <select
        id="review-sort-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 cursor-pointer rounded border border-border bg-bg px-4 font-mono text-sm uppercase tracking-[0.05em] text-text-primary transition-colors hover:border-accent"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value} style={{ backgroundColor: "#0B0B0D" }}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
