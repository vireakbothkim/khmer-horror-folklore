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

  const styles = {
    wrap: {
      marginTop: 48,
      padding: 24,
      backgroundColor: "#1C222C",
      border: "1px solid #2E3644",
      borderRadius: 10,
    },
    label: {
      fontFamily: "'Courier New', monospace",
      fontSize: 12,
      color: "#97A1B3",
      margin: 0,
    },
    value: {
      fontSize: 16,
      margin: "6px 0 0",
      fontFamily: '"Noto Sans Khmer", "Khmer OS Siemreap", "Khmer OS Battambang", "Arial Unicode MS", sans-serif',
      lineHeight: 1.5,
    },
  };

  return (
    <div style={styles.wrap}>
      <p style={styles.label}>{t.title}</p>
      <p style={styles.value}>{entry.title}</p>
      {entry.khmerName && (
        <>
          <p style={styles.label}>{t.khmerName}</p>
          <p style={styles.value}>{entry.khmerName}</p>
        </>
      )}
      <p style={styles.label}>{t.appearance}</p>
      <p style={styles.value}>{entry.appearance}</p>
      <p style={styles.label}>{t.story}</p>
      <p style={styles.value}>{entry.story}</p>
      <p style={styles.label}>{t.source}</p>
      <p style={styles.value}>{entry.source}</p>
      <p style={styles.label}>{t.place}</p>
      <p style={styles.value}>{entry.place}</p>
      <p style={styles.label}>{t.media}</p>
      {entry.media ? (
        <img
          src={entry.media.src}
          alt="Entry media"
          style={{ maxWidth: "100%", height: "auto", marginTop: "6px" }}
        />
      ) : (
        <p style={styles.value}>"(media placeholder - to be added)"</p>
      )}
    </div>
  );
}