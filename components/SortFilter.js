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
      {/* appearance-none stops Safari from drawing its own select box, which
          would otherwise hide our border and background. The chevron is drawn
          here instead, so it still shows on every browser. */}
      <div className="relative">
        <select
          id="review-sort-filter"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-11 cursor-pointer appearance-none rounded border border-border bg-bg py-0 pl-4 pr-10 font-mono text-sm uppercase tracking-[0.05em] text-text-primary transition-colors hover:border-accent"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} style={{ backgroundColor: "#0B0B0D" }}>
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 8"
          className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2 text-text-primary"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path d="M1 1.5 6 6.5 11 1.5" />
        </svg>
      </div>
    </div>
  );
}
