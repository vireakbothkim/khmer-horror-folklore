"use client";

import { useState } from "react";
import { reviewEntry } from "../lib/review-entry.js";
import ReturnNotesModal from "./ReturnNotesModal.js";
import ReviewEntryCard from "./ReviewEntryCard";
import StatusBox from "./StatusBox";
import BackToArchiveLink from "./BackToArchiveLink";
import ReviewToolbar from "./ReviewToolbar";
import { sortByCreated } from "../lib/sort-entries.js";
import { matchesSearch } from "../lib/search-entries.js";

// The live review list. Publishing or returning an entry removes its card
// right away. Review logic (confirm, RPC call, error handling) is unchanged.
export default function ReviewList({ entries: initialEntries }) {
  const [entries, setEntries] = useState(initialEntries);
  const [loadingIds, setLoadingIds] = useState(new Set());
  const [errorIds, setErrorIds] = useState(new Set());
  const [returningId, setReturningId] = useState(null);
  const [sortOrder, setSortOrder] = useState("oldest");
  const [searchQuery, setSearchQuery] = useState("");

  const handleReview = async (entryId, decision, notes = null) => {
    if (decision === "published") {
      const confirmed = window.confirm(
        "Publish this entry? It becomes public."
      );
      if (!confirmed) return;
    }

    setLoadingIds(prev => new Set([...prev, entryId]));
    setErrorIds(prev => {
      const newSet = new Set(prev);
      newSet.delete(entryId);
      return newSet;
    });

    try {
      const saved = await reviewEntry(entryId, decision, notes);
      if (saved) {
        setEntries(prev => prev.filter(entry => entry.id !== entryId));
      } else {
        setErrorIds(prev => new Set([...prev, entryId]));
      }
    } finally {
      setLoadingIds(prev => {
        const newSet = new Set(prev);
        newSet.delete(entryId);
        return newSet;
      });
    }
  };

  const handleReturnSubmit = (notes) => {
    const entryId = returningId;
    setReturningId(null);
    handleReview(entryId, "returned", notes);
  };

  const visibleEntries = sortByCreated(entries, sortOrder).filter((entry) =>
    matchesSearch(entry, searchQuery)
  );

  if (entries.length === 0) {
    return (
      <>
        <StatusBox>
          <p className="mb-0">Nothing is waiting for review.</p>
        </StatusBox>
        <div className="mt-8">
          <BackToArchiveLink />
        </div>
      </>
    );
  }

  return (
    <>
      <ReviewToolbar
        count={entries.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        sortOrder={sortOrder}
        onSortChange={setSortOrder}
      />
      {visibleEntries.length === 0 ? (
        <StatusBox className="mt-6">
          <p className="mb-0">No entries match your search.</p>
        </StatusBox>
      ) : (
        <div className="mt-6 flex flex-col gap-6">
          {visibleEntries.map((entry) => (
            <ReviewEntryCard
              key={entry.id}
              entry={entry}
              isLoading={loadingIds.has(entry.id)}
              hasError={errorIds.has(entry.id)}
              onPublish={() => handleReview(entry.id, "published")}
              onReturn={() => setReturningId(entry.id)}
            />
          ))}
        </div>
      )}

      {returningId && (
        <ReturnNotesModal
          onSubmit={handleReturnSubmit}
          onCancel={() => setReturningId(null)}
        />
      )}
    </>
  );
}
