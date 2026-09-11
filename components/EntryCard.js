import styles from "./EntryCard.module.css";

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
      title: "TITLE",
      khmerName: "KHMER NAME",
      appearance: "APPEARANCE",
      story: "STORY",
      source: "SOURCE",
      place: "PLACE",
      media: "MEDIA",
    },
    kh: {
      title: "ចំណងជើង",
      khmerName: "ឈ្មោះខ្មែរ",
      appearance: "រូបរាង",
      story: "រឿងរ៉ាវ",
      source: "ប្រភព",
      place: "ទីកន្លែង",
      media: "មេឌៀ",
    },
  };

  const t = uiText[lang];
  return (
    <div className={styles.wrap}>
      <p className={styles.label}>{t.title}</p>
      <p className={styles.value}>{entry.title}</p>
      {entry.khmerName && (
        <>
          <p className={styles.label}>{t.khmerName}</p>
          <p className={styles.value}>{entry.khmerName}</p>
        </>
      )}
      <p className={styles.label}>{t.appearance}</p>
      <p className={styles.value}>{entry.appearance}</p>
      <p className={styles.label}>{t.story}</p>
      <p className={styles.value}>{entry.story}</p>
      <p className={styles.label}>{t.source}</p>
      <p className={styles.value}>{entry.source}</p>
      <p className={styles.label}>{t.place}</p>
      <p className={styles.value}>{entry.place}</p>
      <p className={styles.label}>{t.media}</p>
      {entry.media ? (
        <img
          src={entry.media.src}
          alt="Entry media"
          style={{ maxWidth: "100%", height: "auto", marginTop: "6px" }}
        />
      ) : (
        <p className={styles.value}>"(media placeholder - to be added)"</p>
      )}
    </div>
  );
}