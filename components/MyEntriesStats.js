// Four-cell summary strip for /my-entries: total, waiting, published, returned.
// Cells are separated by 1px lines (gap over a border-colored background).
export default function MyEntriesStats({ items, langTag = "en" }) {
  return (
    <dl
      lang={langTag}
      className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-md border border-border bg-border lg:grid-cols-4"
    >
      {items.map((item) => (
        <div key={item.label} className="bg-bg p-5">
          <dt className="font-mono text-xs uppercase tracking-[0.05em] text-text-secondary [font-variant-caps:small-caps]">
            {item.label}
          </dt>
          <dd className="m-0 mt-2 font-display text-4xl font-bold leading-none text-text-primary">
            {item.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
