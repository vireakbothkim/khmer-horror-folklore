// Status dropdown for /my-entries. The select's border and text take the
// color of the chosen status, and each option is tinted the same way.
// Colors match the status badges on MyEntryCard.
const statusColors = {
  all: "#EDE6D9",
  pending: "rgb(234, 179, 8)",
  published: "rgb(34, 197, 94)",
  returned: "rgb(239, 68, 68)",
};

export default function StatusFilter({ label, value, onChange, options, langTag = "en" }) {
  const color = statusColors[value] || statusColors.all;

  return (
    <div lang={langTag} className="flex items-center gap-3">
      <label
        htmlFor="my-entries-status-filter"
        className="font-mono text-xs uppercase tracking-[0.05em] text-text-secondary [font-variant-caps:small-caps]"
      >
        {label}
      </label>
      {/* appearance-none stops Safari from drawing its own select box, which
          would otherwise hide our border and background. The chevron is drawn
          here instead, so it still shows on every browser. */}
      <div className="relative">
        <select
          id="my-entries-status-filter"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          style={{ color, borderColor: color }}
          className="h-11 cursor-pointer appearance-none rounded border bg-bg py-0 pl-4 pr-10 font-mono text-sm uppercase tracking-[0.05em] transition-colors"
        >
          {options.map((option) => (
            <option
              key={option.value}
              value={option.value}
              style={{ color: statusColors[option.value], backgroundColor: "#0B0B0D" }}
            >
              {option.label}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          viewBox="0 0 12 8"
          className="pointer-events-none absolute right-4 top-1/2 h-2 w-3 -translate-y-1/2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          style={{ color }}
        >
          <path d="M1 1.5 6 6.5 11 1.5" />
        </svg>
      </div>
    </div>
  );
}
