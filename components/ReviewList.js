"use client";

import { useState } from "react";
import { createClient } from "../lib/supabase-client.js";
import ReturnNotesModal from "./ReturnNotesModal.js";

export default function ReviewList({ entries: initialEntries }) {
  const [entries, setEntries] = useState(initialEntries);
  const [loadingIds, setLoadingIds] = useState(new Set());
  const [errorIds, setErrorIds] = useState(new Set());
  const [returningId, setReturningId] = useState(null);

  const handleReview = async (entryId, decision, notes = null) => {
    if (decision === 'published') {
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
      const supabase = createClient();
      const { data, error } = await supabase.rpc('review_entry', {
        entry_id: entryId,
        decision: decision,
        notes: notes
      });

      if (error) {
        console.error(`Error reviewing entry ${entryId}:`, error);
        setErrorIds(prev => new Set([...prev, entryId]));
      } else if (data === true) {
        setEntries(prev => prev.filter(entry => entry.id !== entryId));
      } else {
        console.error(`Review function returned false for entry ${entryId}`);
        setErrorIds(prev => new Set([...prev, entryId]));
      }
    } catch (err) {
      console.error(`Exception reviewing entry ${entryId}:`, err);
      setErrorIds(prev => new Set([...prev, entryId]));
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
    handleReview(entryId, 'returned', notes);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (entries.length === 0) {
    return (
      <div style={{
        padding: "24px",
        backgroundColor: "transparent",
        border: "1px solid var(--color-border)",
        borderRadius: "var(--radius-md)",
        color: "var(--color-text-primary)",
        textAlign: "center"
      }}>
        <p style={{ marginBottom: "8px", fontSize: "var(--text-base)" }}>
          Nothing is waiting for review.
        </p>
        <a
          href="/"
          style={{
            padding: "10px 20px",
            backgroundColor: "transparent",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            color: "var(--color-text-secondary)",
            textDecoration: "none",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            display: "inline-block"
          }}
        >
          Back to Archive
        </a>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      <p style={{
        color: "var(--color-text-secondary)",
        fontSize: "var(--text-sm)",
        fontFamily: "var(--font-mono)",
        margin: 0
      }}>
        {entries.length} {entries.length === 1 ? 'entry' : 'entries'} waiting for review
      </p>
      {entries.map((entry) => {
        const isLoading = loadingIds.has(entry.id);
        const hasError = errorIds.has(entry.id);

        return (
          <div
            key={entry.id}
            style={{
              padding: "24px",
              backgroundColor: "transparent",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              color: "var(--color-text-primary)"
            }}
          >
            <div style={{ marginBottom: "24px" }}>
              <h2 style={{
                fontFamily: "var(--font-display)",
                fontSize: "var(--text-xl)",
                fontWeight: 700,
                marginBottom: "8px"
              }}>
                {entry.title_en || "Untitled"}
              </h2>
              {entry.title_km && (
                <p style={{
                  fontSize: "var(--text-base)",
                  color: "var(--color-text-secondary)",
                  marginBottom: "16px"
                }}>
                  {entry.title_km}
                </p>
              )}
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3 style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--color-accent)",
                textTransform: "uppercase",
                fontVariantCaps: "small-caps",
                letterSpacing: "0.05em",
                marginBottom: "8px"
              }}>
                Appearance
              </h3>
              <div style={{ whiteSpace: "pre-wrap", fontSize: "var(--text-base)", lineHeight: "1.6" }}>
                {entry.appearance_en || "No description"}
              </div>
              {entry.appearance_km && (
                <div style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "var(--text-base)",
                  lineHeight: "1.6",
                  color: "var(--color-text-secondary)",
                  marginTop: "8px"
                }}>
                  {entry.appearance_km}
                </div>
              )}
            </div>

            {/* Story section */}
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--color-accent)",
                textTransform: "uppercase",
                fontVariantCaps: "small-caps",
                letterSpacing: "0.05em",
                marginBottom: "8px"
              }}>
                Story
              </h3>
              <div style={{ whiteSpace: "pre-wrap", fontSize: "var(--text-base)", lineHeight: "1.6" }}>
                {entry.story_en || "No story provided"}
              </div>
              {entry.story_km && (
                <div style={{
                  whiteSpace: "pre-wrap",
                  fontSize: "var(--text-base)",
                  lineHeight: "1.6",
                  color: "var(--color-text-secondary)",
                  marginTop: "8px"
                }}>
                  {entry.story_km}
                </div>
              )}
            </div>

            {/* Source and Place */}
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--color-accent)",
                textTransform: "uppercase",
                fontVariantCaps: "small-caps",
                letterSpacing: "0.05em",
                marginBottom: "8px"
              }}>
                Source & Place
              </h3>
              <div style={{ fontSize: "var(--text-base)", lineHeight: "1.6", marginBottom: "8px" }}>
                <strong>Source:</strong> {entry.source_en || "Unknown"}
              </div>
              {entry.source_km && (
                <div style={{
                  fontSize: "var(--text-base)",
                  lineHeight: "1.6",
                  color: "var(--color-text-secondary)",
                  marginBottom: "8px"
                }}>
                  <strong>Source (Khmer):</strong> {entry.source_km}
                </div>
              )}
              <div style={{ fontSize: "var(--text-base)", lineHeight: "1.6", marginBottom: "8px" }}>
                <strong>Place:</strong> {entry.place_en || "Unknown"}
              </div>
              {entry.place_km && (
                <div style={{
                  fontSize: "var(--text-base)",
                  lineHeight: "1.6",
                  color: "var(--color-text-secondary)"
                }}>
                  <strong>Place (Khmer):</strong> {entry.place_km}
                </div>
              )}
            </div>

            {/* Photo */}
            <div style={{ marginBottom: "20px" }}>
              <h3 style={{
                fontFamily: "var(--font-mono)",
                fontSize: "var(--text-xs)",
                color: "var(--color-accent)",
                textTransform: "uppercase",
                fontVariantCaps: "small-caps",
                letterSpacing: "0.05em",
                marginBottom: "8px"
              }}>
                Photo
              </h3>
              {entry.media ? (
                <img 
                  src={entry.media} 
                  alt={entry.title_en || "Entry photo"}
                  style={{
                    maxWidth: "100%",
                    maxHeight: "300px",
                    borderRadius: "var(--radius-sm)",
                    objectFit: "contain"
                  }}
                />
              ) : (
                <div style={{
                  padding: "16px",
                  backgroundColor: "transparent",
                  border: "1px dashed var(--color-border)",
                  borderRadius: "var(--radius-sm)",
                  textAlign: "center",
                  color: "var(--color-text-secondary)"
                }}>
                  No photo
                </div>
              )}
            </div>

            {/* Contributor and Date */}
            <div style={{ marginBottom: "24px" }}>
              <div style={{ fontSize: "var(--text-base)", lineHeight: "1.6", marginBottom: "8px" }}>
                <strong>Submitted:</strong> {formatDate(entry.created_at)}
              </div>
              {entry.contributor && entry.contributor.trim() !== "" && (
                <div style={{ fontSize: "var(--text-base)", lineHeight: "1.6" }}>
                  <strong>Contributor:</strong> {entry.contributor}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
              <button
                onClick={() => handleReview(entry.id, 'published')}
                disabled={isLoading}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "var(--color-accent)",
                  border: "none",
                  borderRadius: "var(--radius-md)",
                  color: "white",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-sm)",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? "Processing..." : "Publish"}
              </button>
              <button
                onClick={() => setReturningId(entry.id)}
                disabled={isLoading}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "transparent",
                  border: "1px solid var(--color-border)",
                  borderRadius: "var(--radius-md)",
                  color: "var(--color-text-secondary)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "var(--text-sm)",
                  cursor: isLoading ? "not-allowed" : "pointer",
                  opacity: isLoading ? 0.7 : 1
                }}
              >
                {isLoading ? "Processing..." : "Return for changes"}
              </button>
              {hasError && (
                <div style={{
                  fontSize: "var(--text-sm)",
                  color: "var(--color-text-secondary)",
                  marginLeft: "12px",
                  fontFamily: "var(--font-mono)"
                }}>
                  That didn&apos;t go through. Someone may have already reviewed this entry. Refresh the list and try again.
                </div>
              )}
            </div>
          </div>
        );
      })}

      {returningId && (
        <ReturnNotesModal
          onSubmit={handleReturnSubmit}
          onCancel={() => setReturningId(null)}
        />
      )}
    </div>
  );
}