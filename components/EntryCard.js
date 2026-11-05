import styles from "./EntryCard.module.css";
import EntryField from "./EntryField";

export default function EntryCard({ entry, isLoading = false, error = null, lang = "en" }) {
  if (isLoading) {
    return <div>Loading entry...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // UI text for labels based on language
  const uiText = {
    en: {
      appearance: "APPEARANCE",
      story: "STORY",
      source: "SOURCE",
      place: (title) => `Places that ${title || ""} is usually found`,
      contributor: "CONTRIBUTOR",
      media: "MEDIA",
    },
    kh: {
      appearance: "រូបរាង",
      story: "រឿងរ៉ាវ",
      source: "ប្រភព",
      place: (title) => `កន្លែងដែល${title || ""}រស់នៅ`,
      contributor: "អ្នករួមចំណែក",
      media: "មេឌៀ",
    },
  };

  const t = uiText[lang];
  return (
    <div className={styles.wrap}>
      <p className={styles.title}>{entry.title}</p>
      <EntryField label={t.appearance} variant="long">{entry.appearance}</EntryField>
      <EntryField label={t.source}>{entry.source}</EntryField>
      <EntryField label={t.place(entry.title)}>{entry.place}</EntryField>
      {entry.contributor && (
        <EntryField label={t.contributor}>{entry.contributor}</EntryField>
      )}
      <EntryField label={t.story} variant="long">{entry.story}</EntryField>
      <EntryField label={t.media} variant="media">
        {entry.media ? (
          <img
            src={entry.media}
            alt={entry.title || "Entry media"}
            className={styles.media}
          />
        ) : (
          <p className={styles.shortValue}>(media placeholder - to be added)</p>
        )}
      </EntryField>
    </div>
  );
}