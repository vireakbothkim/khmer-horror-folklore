import SortFilter from "./SortFilter";

// Row above the review cards: how many entries are waiting, and the sort order.
export default function ReviewToolbar({ count, sortOrder, onSortChange }) {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="m-0 font-mono text-xs uppercase tracking-[0.05em] text-text-secondary [font-variant-caps:small-caps]">
        {count} {count === 1 ? "entry" : "entries"} waiting for review
      </p>
      <SortFilter
        label="Sort by"
        value={sortOrder}
        onChange={onSortChange}
        options={[
          { value: "oldest", label: "Oldest first" },
          { value: "newest", label: "Newest first" },
        ]}
      />
    </div>
  );
}
