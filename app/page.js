"use client";

import { useState } from "react";
import collection from "../collection.config.js";
import EntryCard from "../components/EntryCard";
// Import all entries from the data file
import { entriesEn, entriesKh } from "../data/entries.js";

const uiText = {
  en: {
    kicker: "KHMER LIVING ARCHIVE",
    curatedBy: "CURATED BY",
    source: "SOURCE",
    province: "PROVINCE",
    searchEntries: "SEARCH ENTRIES",
    searchPlaceholder: "Search by title (English or Khmer) or description...",
    countFound: (found, total) => `found ${found} of ${total} entries`,
    countTotal: (total) => `entries in the archive: ${total}`,
    noResults: (query) => `No results found for "${query}"`,
    noEntries: "No entries found",
    languageToggle: "ភាសាខ្មែរ", // Khmer text for toggle to switch to Khmer
    footer: "Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall 2026. This archive is under construction all semester. Come back in December.",
  },
  kh: {
    kicker: "បណ្ណសាររស់របស់ខ្មែរ",
    curatedBy: "ដោយ",
    source: "ប្រភព",
    province: "ខេត្ត",
    searchEntries: "ស្វែងរកធាតុ",
    searchPlaceholder: "ស្វែងរកតាមចំណងជើង (អង់គ្លេស ឬខ្មែរ) ឬការពិពណ៌នា...",
    countFound: (found, total) => `រកឃើញ ${found} នៃ ${total} ធាតុ`,
    countTotal: (total) => `ធាតុនៅក្នុងបណ្ណសារ៖ ${total}`,
    noResults: (query) => `គ្មានលទ្ធផលសម្រាប់ "${query}"`,
    noEntries: "គ្មានធាតុរកឃើញ",
    languageToggle: "English", // English text for toggle to switch to English
    footer: "បង្កើតឡើងសម្រាប់មុខវិជ្ជា ICT 340 — Vibe Coding នៅសាកលវិទ្យាល័យអាមេរិកាំងភ្នំពេញ (AUPP) សម្រាប់ឆមាសទី ២ ឆ្នាំ ២០២៦។ ឃ្លាំងឯកសារនេះកំពុងស្ថិតក្នុងដំណាក់កាលរៀបចំពេញមួយឆមាស។ សូមត្រឡប់មកវិញនៅខែធ្នូ។",
  },
};

const styles = {
  wrap: {
    maxWidth: 720,
    margin: "0 auto",
    padding: "80px 24px",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
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
  searchContainer: {
    marginTop: 48,
    position: "relative",
  },
  searchBox: {
    marginTop: 0,
    padding: "12px 16px",
    paddingRight: "40px", // Space for clear button
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
  clearButton: {
    position: "absolute",
    right: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#97A1B3",
    cursor: "pointer",
    fontSize: "16px",
    padding: "4px 8px",
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
  languageToggle: {
    fontFamily: "'Courier New', monospace",
    fontSize: 12,
    color: "#97A1B3",
    background: "none",
    border: "1px solid #2E3644",
    borderRadius: 4,
    padding: "4px 8px",
    cursor: "pointer",
    marginTop: 4,
  },
};

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [lang, setLang] = useState("en"); // "en" or "kh"

  // Function to filter entries based on search query
  const filterEntries = (query) => {
    const trimmedQuery = query.trim();
    
    if (!trimmedQuery) {
      // Return all entries for current language
      return lang === "en" ? entriesEn : entriesKh;
    }

    // Search in both English and Khmer arrays regardless of active language
    const matchingIds = new Set();
    
    // Search in English entries
    entriesEn.forEach((entry) => {
      const searchableFields = [
        entry.title?.toLowerCase() || "",
        entry.appearance?.toLowerCase() || "",
        entry.story?.toLowerCase() || "",
      ];
      
      if (searchableFields.some(field => field.includes(trimmedQuery.toLowerCase()))) {
        matchingIds.add(entry.id);
      }
    });
    
    // Search in Khmer entries
    entriesKh.forEach((entry) => {
      const searchableFields = [
        entry.title || "", // Khmer title
        entry.appearance || "", // Khmer appearance
        entry.story || "", // Khmer story
      ];
      
      if (searchableFields.some(field => field.includes(trimmedQuery))) {
        matchingIds.add(entry.id);
      }
    });
    
    // Return entries from current language array that match the found IDs
    const currentEntries = lang === "en" ? entriesEn : entriesKh;
    return currentEntries.filter(entry => matchingIds.has(entry.id));
  };

  // Get filtered entries based on current search query
  const filteredEntries = filterEntries(searchQuery);
  
  // Get current UI text
  const t = uiText[lang];
  
  // Get collection fields based on language
  const collectionName = lang === "kh" ? collection.name_km : collection.name;
  const collectionDescription = lang === "kh" ? collection.description_km : collection.description;
  const collectionCurator = lang === "kh" ? collection.curator_km : collection.curator;
  const collectionSource = lang === "kh" ? collection.source_km : collection.source;
  const collectionProvince = lang === "kh" ? collection.province_km : collection.province;
  
  // Get total entries count for current language
  const totalEntries = lang === "en" ? entriesEn.length : entriesKh.length;

  return (
    <main style={styles.wrap}>
      <div style={styles.headerRow}>
        <div>
          <p style={styles.kicker}>{t.kicker}</p>
          <h1 style={styles.title}>{collectionName}</h1>
          <p style={styles.description}>{collectionDescription}</p>
        </div>
        <button
          style={styles.languageToggle}
          onClick={() => setLang(lang === "en" ? "kh" : "en")}
        >
          {t.languageToggle}
        </button>
      </div>

      <div style={styles.card}>
        <p style={styles.cardLabel}>{t.curatedBy}</p>
        <p style={styles.cardValue}>{collectionCurator}</p>
      </div>
      <div style={styles.card}>
        <p style={styles.cardLabel}>{t.source}</p>
        <p style={styles.cardValue}>{collectionSource}</p>
      </div>
      <div style={styles.card}>
        <p style={styles.cardLabel}>{t.province}</p>
        <p style={styles.cardValue}>{collectionProvince}</p>
      </div>

      {/* Search box */}
      <div style={styles.searchContainer}>
        <p style={styles.searchLabel}>{t.searchEntries}</p>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={styles.searchBox}
          />
          {searchQuery && (
            <button
              style={styles.clearButton}
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Dynamic count based on filtered entries array length */}
      <p style={styles.count}>
        {searchQuery.trim() 
          ? t.countFound(filteredEntries.length, totalEntries)
          : t.countTotal(totalEntries)}
      </p>

      {/* Render filtered entries dynamically */}
      {filteredEntries.length > 0 ? (
        filteredEntries.map((entry) => (
          <EntryCard key={entry.id} entry={entry} lang={lang} />
        ))
      ) : searchQuery.trim() ? (
        <div style={styles.noResults}>
          {t.noResults(searchQuery)}
        </div>
      ) : (
        // This case shouldn't happen since entries should always exist
        <div style={styles.noResults}>
          {t.noEntries}
        </div>
      )}

      <footer style={styles.footer}>
        {t.footer}
      </footer>
    </main>
  );
}