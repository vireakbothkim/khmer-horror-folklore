// Returns the ids of the entries before and after currentId in orderedIds.
// orderedIds is in archive order (newest first, as on /archive).
// Previous and next wrap around: before the first entry is the last one,
// and after the last entry is the first one.
// Returns null when the entry is not in the list or there is nothing to move between.
export function getNeighborIds(orderedIds, currentId) {
  const index = orderedIds.indexOf(String(currentId));
  if (index === -1 || orderedIds.length < 2) {
    return null;
  }

  const lastIndex = orderedIds.length - 1;
  return {
    prevId: orderedIds[index === 0 ? lastIndex : index - 1],
    nextId: orderedIds[index === lastIndex ? 0 : index + 1],
  };
}
