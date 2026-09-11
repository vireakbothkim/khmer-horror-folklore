"use client";

import { useState } from "react";
import collection from "../collection.config.js";
import EntryCard from "../components/EntryCard";
// Import all entries from the data file
import { entriesEn, entriesKh } from "../data/entries.js";
import styles from "./page.module.css";

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
    <main className={styles.wrap}>
      <div className={styles.headerRow}>
        <div>
          <p className={styles.kicker}>{t.kicker}</p>
          <h1 className={styles.title}>{collectionName}</h1>
          <p className={styles.description}>{collectionDescription}</p>
        </div>
        <button
          className={styles.languageToggle}
          onClick={() => setLang(lang === "en" ? "kh" : "en")}
        >
          {t.languageToggle}
        </button>
      </div>

      <div className={styles.card}>
        <p className={styles.cardLabel}>{t.curatedBy}</p>
        <p className={styles.cardValue}>{collectionCurator}</p>
      </div>
      <div className={styles.card}>
        <p className={styles.cardLabel}>{t.source}</p>
        <p className={styles.cardValue}>{collectionSource}</p>
      </div>
      <div className={styles.card}>
        <p className={styles.cardLabel}>{t.province}</p>
        <p className={styles.cardValue}>{collectionProvince}</p>
      </div>

      {/* Search box */}
      <div className={styles.searchContainer}>
        <p className={styles.searchLabel}>{t.searchEntries}</p>
        <div style={{ position: "relative" }}>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchBox}
          />
          {searchQuery && (
            <button
              className={styles.clearButton}
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Dynamic count based on filtered entries array length */}
      <p className={styles.count}>
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
        <div className={styles.noResults}>
          {t.noResults(searchQuery)}
        </div>
      ) : (
        // This case shouldn't happen since entries should always exist
        <div className={styles.noResults}>
          {t.noEntries}
        </div>
      )}

      <footer className={styles.footer}>
        {t.footer}
      </footer>
    </main>
  );
}