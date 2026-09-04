"use client";

import { useState } from "react";
import collection from "../collection.config.js";
import EntryCard from "../components/EntryCard";
// Import all entries from the data file
import entries from "../data/entries.js";

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "80px 24px",
  },
  kicker: {
    fontFamily: "'Courier New', monospace",
    color: "#972514",
    fontSize: 14,
    letterSpacing: 1,
  },
  title: {
    fontSize: 48,
    fontWeight: 700,
    margin: "16px 0 12px",
    lineHeight: 1.1,
  },
  description: {
    fontSize: 18,
    color: "#97A1B3",
    lineHeight: 1.6,
    margin: 0,
  },
  card: {
    marginTop: 48,
    padding: 24,
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 10,
  },
  cardLabel: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#97A1B3",
    margin: 0,
  },
  cardValue: {
    fontSize: 16,
    margin: "6px 0 0",
  },
  entryCard: {
    marginTop: 48,
    padding: 24,
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 10,
  },
  entryCardLabel: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#97A1B3",
    margin: 0,
  },
  entryCardValue: {
    fontSize: 16,
    margin: "6px 0 0",
  },
  count: {
    fontFamily: "'Courier New', monospace",
    fontSize: 14,
    color: "#2EE6A8",
    marginTop: 48,
  },
  footer: {
    marginTop: 64,
    paddingTop: 24,
    borderTop: "1px solid #2E3644",
    fontSize: 13,
    color: "#5A6373",
  },
  searchBox: {
    marginTop: 48,
    padding: "12px 16px",
    fontSize: 16,
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 8,
    color: "#FFFFFF",
    width: "100%",
    boxSizing: "border-box",
  },
  searchLabel: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#97A1B3",
    marginBottom: 8,
  },
  noResults: {
    marginTop: 48,
    padding: 24,
    backgroundColor: "#1C222C",
    border: "1px solid #2E3644",
    borderRadius: 10,
    textAlign: "center",
    color: "#97A1B3",
    fontSize: 16,
  },
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to filter entries based on search query
  const filterEntries = (query) => {
    const trimmedQuery = query.trim();
    
    if (!trimmedQuery) {
      return entries; // Show all entries when query is empty
    }

    return entries.filter((entry) => {
      // Check if query matches any of the searchable fields
      // Search in: English title, Khmer title, English appearance, English story
      const searchableFields = [
        entry.title?.toLowerCase() || "",
        entry.khmerName || "",
        entry.appearance?.toLowerCase() || "",
        entry.story?.toLowerCase() || ""
      ];

      return searchableFields.some((field) => {
        // For English fields (title, appearance, story), do case-insensitive search
        // For Khmer field (khmerName), do direct substring match
        if (field === entry.khmerName) {
          // Khmer text - direct substring match
          return field.includes(trimmedQuery);
        } else {
          // English text - case-insensitive match
          return field.includes(trimmedQuery.toLowerCase());
        }
      });
    });
  };

  // Get filtered entries based on current search query
  const filteredEntries = filterEntries(searchQuery);

  return (
    <main style={styles.wrap}>
      <p style={styles.kicker}>KHMER LIVING ARCHIVE</p>
      <h1 style={styles.title}>{collection.name}</h1>
      <p style={styles.description}>{collection.description}</p>

      <div style={styles.card}>
        <p style={styles.cardLabel}>CURATED BY</p>
        <p style={styles.cardValue}>{collection.curator}</p>
      </div>
      <div style={styles.card}>
        <p style={styles.cardLabel}>SOURCE</p>
        <p style={styles.cardValue}>{collection.source}</p>
      </div>
      <div style={styles.card}>
        <p style={styles.cardLabel}>PROVINCE</p>
        <p style={styles.cardValue}>{collection.province}</p>
      </div>

      {/* Search box */}
      <div style={{ marginTop: 48 }}>
        <p style={styles.searchLabel}>SEARCH ENTRIES</p>
        <input
          type="text"
          placeholder="Search by title (English or Khmer) or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={styles.searchBox}
        />
      </div>

      {/* Dynamic count based on filtered entries array length */}
      <p style={styles.count}>
        {searchQuery.trim() 
          ? `found ${filteredEntries.length} of ${entries.length} entries` 
          : `entries in the archive: ${entries.length}`}
      </p>

      {/* Render filtered entries dynamically */}
      {filteredEntries.length > 0 ? (
        filteredEntries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} />
        ))
      ) : searchQuery.trim() ? (
        <div style={styles.noResults}>
          No results found for "{searchQuery}"
        </div>
      ) : (
        // This case shouldn't happen since entries should always exist
        <div style={styles.noResults}>
          No entries found
        </div>
      )}

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026. This archive is under construction all semester. Come back in
        December.
      </footer>
    </main>
  );
}