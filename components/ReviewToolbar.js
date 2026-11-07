import EntrySearch from "./EntrySearch";
import SortFilter from "./SortFilter";

// Row above the review cards: how many entries are waiting, then search and sort
// on the same line.
export default function ReviewToolbar({
  count,
  searchQuery,
  onSearchChange,
  sortOrder,
  onSortChange,
}) {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="m-0 font-mono text-xs uppercase tracking-[0.05em] text-text-secondary [font-variant-caps:small-caps]">
        {count} {count === 1 ? "entry" : "entries"} waiting for review
      </p>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <div className="w-full sm:w-80">
          <EntrySearch
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onClear={() => onSearchChange("")}
            labelText="Search entries"
            placeholderText="Search by title or description..."
          />
        </div>
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
    </div>
  );
}
