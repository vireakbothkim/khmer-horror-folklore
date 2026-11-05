"use client";

import { useState, useEffect } from "react";
import collection from "../collection.config.js";
import EntrySearch from "../components/EntrySearch";
import styles from "./page.module.css";
import { createClient } from "../lib/supabase-client";
import { useLanguage } from "../components/LanguageProvider";

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
  const { lang } = useLanguage();
  const [entries, setEntries] = useState([]); // All entries from Supabase
  const [entriesLoading, setEntriesLoading] = useState(true);

  // Fetch entries from Supabase
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const supabase = createClient();
        const { data, error } = await supabase
          .from('entries')
          .select('id, owner, status, created_at, contributor, media, title_en, title_km, appearance_en, appearance_km, story_en, story_km, source_en, source_km, place_en, place_km')
          .eq('status', 'published')
          .order('created_at', { ascending: false });

        if (error) {
          console.error("Error fetching entries:", error);
          setEntries([]);
        } else {
          setEntries(data || []);
        }
      } catch (err) {
        console.error("Error fetching entries:", err);
        setEntries([]);
      } finally {
        setEntriesLoading(false);
      }
    };

    fetchEntries();
  }, []);

  // Map Supabase entries to English and Khmer arrays for compatibility with existing components
  // Create English entries array from Supabase data
  const entriesEn = entries.map(entry => ({
    id: entry.id,
    title: entry.title_en,
    khmerName: entry.title_km,
    appearance: entry.appearance_en,
    story: entry.story_en,
    source: entry.source_en,
    place: entry.place_en,
    media: entry.media,
    contributor: entry.contributor
  }));

  // Create Khmer entries array from Supabase data
  const entriesKh = entries.map(entry => ({
    id: entry.id,
    title: entry.title_km,
    khmerName: entry.title_en,
    appearance: entry.appearance_km,
    story: entry.story_km,
    source: entry.source_km,
    place: entry.place_km,
    media: entry.media,
    contributor: entry.contributor
  }));

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
        entry.source?.toLowerCase() || "",
        entry.place?.toLowerCase() || "",
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
        entry.source || "", // Khmer source
        entry.place || "", // Khmer place
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
  const collectionCurator = lang === "kh" ? collection.curator_km : collection.curator;
  const collectionSource = lang === "kh" ? collection.source_km : collection.source;
  const collectionProvince = lang === "kh" ? collection.province_km : collection.province;
  
  // Get total entries count for current language
  const totalEntries = lang === "en" ? entriesEn.length : entriesKh.length;

  return (
    <main className={styles.wrap}>
      <div className={styles.metadataGrid}>
        <div className={styles.metadataItem}>
          <p className={styles.metadataLabel}>{t.curatedBy}</p>
          <p className={styles.metadataValue}>{collectionCurator}</p>
        </div>
        <div className={styles.metadataItem}>
          <p className={styles.metadataLabel}>{t.source}</p>
          <p className={styles.metadataValue}>{collectionSource}</p>
        </div>
        <div className={styles.metadataItem}>
          <p className={styles.metadataLabel}>{t.province}</p>
          <p className={styles.metadataValue}>{collectionProvince}</p>
        </div>
      </div>

      {/* Search box */}
      <EntrySearch
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onClear={() => setSearchQuery("")}
        labelText={t.searchEntries}
        placeholderText={t.searchPlaceholder}
      />

      {/* Dynamic count based on filtered entries array length */}
      {!entriesLoading && entries.length > 0 && (
        <p className={styles.count}>
          {searchQuery.trim() 
            ? t.countFound(filteredEntries.length, totalEntries)
            : t.countTotal(totalEntries)}
        </p>
      )}

      {/* Render filtered entries dynamically */}
      {entriesLoading ? (
        <div className={styles.noResults}>
          Loading entries...
        </div>
      ) : entries.length === 0 ? (
        <div className={styles.noResults}>
          No entries found in the archive.
        </div>
      ) : filteredEntries.length > 0 ? (
        <div className={`${styles.entriesGrid} grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4`}>
          {filteredEntries.map((entry) => (
            <a key={entry.id} href={`/entries/${entry.id}`} className={styles.entryItem}>
              <div className={styles.entryImageContainer}>
                {entry.media ? (
                  <img 
                    src={entry.media} 
                    alt={entry.title}
                    className={styles.entryImage}
                  />
                ) : (
                  <div style={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "var(--color-border)",
                    color: "var(--color-text-secondary)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "var(--text-xs)",
                    textTransform: "uppercase",
                    fontVariantCaps: "small-caps",
                    letterSpacing: "0.05em"
                  }}>
                    No Image
                  </div>
                )}
              </div>
              <h3 className={styles.entryTitle}>{entry.title}</h3>
              {entry.khmerName && (
                <p className={styles.entrySubtitle}>{entry.khmerName}</p>
              )}
            </a>
          ))}
        </div>
      ) : searchQuery.trim() ? (
        <div className={styles.noResults}>
          {t.noResults(searchQuery)}
        </div>
      ) : (
        // This case shouldn't happen since entries should always exist when loaded
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