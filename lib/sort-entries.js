// Returns a new array of pending entries sorted by submission time.
// "oldest" puts the earliest submission first; "newest" reverses that.
// created_at is an ISO timestamp, so Date.parse gives a correct comparison.
export function sortByCreated(entries, order) {
  return [...entries].sort((a, b) => {
    const diff = Date.parse(a.created_at) - Date.parse(b.created_at);
    return order === "newest" ? -diff : diff;
  });
}
