// Returns true when the entry's English or Khmer text contains the search query.
// An empty query matches every entry. Same fields and rules as /my-entries.
export function matchesSearch(entry, query) {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return true;
  return [
    entry.title_en, entry.title_km,
    entry.appearance_en, entry.appearance_km,
    entry.story_en, entry.story_km,
    entry.source_en, entry.source_km,
    entry.place_en, entry.place_km
  ].some((field) => (field || "").toLowerCase().includes(trimmed));
}
