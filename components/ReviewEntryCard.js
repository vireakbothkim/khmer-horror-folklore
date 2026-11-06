"use client";

import styles from "./EntryCard.module.css";
import EntryField from "./EntryField";
import { useLanguage } from "./LanguageProvider";

// One pending entry in the review queue. It uses the same layout as the entry
// page (EntryCard), so the field order and styling match. The site's language
// toggle picks English or Khmer text, the same as the entry page.
const publishClass =
  "inline-flex cursor-pointer items-center border border-accent bg-accent px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-text-primary transition-colors hover:border-accent-hover hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70";
const returnClass =
  "inline-flex cursor-pointer items-center border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-text-secondary transition-colors hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-70";

function formatDate(dateString) {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ReviewEntryCard({ entry, isLoading, hasError, onPublish, onReturn }) {
  const { lang } = useLanguage();
  const langTag = lang === "kh" ? "km" : "en";
  // Show the Khmer text when it exists; otherwise fall back to English.
  const pick = (en, km) => (lang === "kh" && km ? km : en);
  const hasContributor = Boolean(entry.contributor && entry.contributor.trim() !== "");

  return (
    <article className={styles.wrap}>
      <p lang={langTag} className={styles.title}>
        {pick(entry.title_en, entry.title_km) || "Untitled"}
      </p>

      <EntryField label="Submitted">{formatDate(entry.created_at)}</EntryField>
      {hasContributor && <EntryField label="Contributor">{entry.contributor}</EntryField>}
      <EntryField label="Appearance" variant="long">
        <span lang={langTag} className="whitespace-pre-wrap">
          {pick(entry.appearance_en, entry.appearance_km) || "No description"}
        </span>
      </EntryField>
      <EntryField label="Source">
        <span lang={langTag}>{pick(entry.source_en, entry.source_km) || "Unknown"}</span>
      </EntryField>
      <EntryField label="Place">
        <span lang={langTag}>{pick(entry.place_en, entry.place_km) || "Unknown"}</span>
      </EntryField>
      <EntryField label="Story" variant="long">
        <span lang={langTag} className="whitespace-pre-wrap">
          {pick(entry.story_en, entry.story_km) || "No story provided"}
        </span>
      </EntryField>
      <EntryField label="Media" variant="media">
        {entry.media ? (
          <img src={entry.media} alt={entry.title_en || "Entry photo"} className={styles.media} />
        ) : (
          <p className={styles.shortValue}>No photo</p>
        )}
      </EntryField>

      <div className="col-span-full flex flex-wrap items-center gap-3 pt-6">
        <button type="button" onClick={onPublish} disabled={isLoading} className={publishClass}>
          {isLoading ? "Processing..." : "Publish"}
        </button>
        <button type="button" onClick={onReturn} disabled={isLoading} className={returnClass}>
          {isLoading ? "Processing..." : "Return for changes"}
        </button>
      </div>
      {hasError && (
        <div
          role="alert"
          className="col-span-full mt-6 flex flex-col gap-2 rounded-md border border-accent bg-[rgba(155,34,50,0.15)] p-4"
        >
          <p className="m-0 font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-primary [font-variant-caps:small-caps]">
            Not saved
          </p>
          <p className="m-0 text-base leading-relaxed text-text-primary">
            That didn&apos;t go through. Someone may have already reviewed this entry. Refresh the list and try again.
          </p>
        </div>
      )}
    </article>
  );
}
