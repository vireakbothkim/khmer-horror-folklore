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
      <select
        id="my-entries-status-filter"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ color, borderColor: color }}
        className="h-11 cursor-pointer rounded border bg-bg px-4 font-mono text-sm uppercase tracking-[0.05em] transition-colors"
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
    </div>
  );
}
