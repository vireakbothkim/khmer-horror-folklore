export default function EntryCard({ entry, isLoading = false, error = null }) {
  if (isLoading) {
    return <div>Loading entry...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

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
      <p style={styles.label}>TITLE</p>
      <p style={styles.value}>{entry.title}</p>
      <p style={styles.label}>KHMER NAME</p>
      <p style={styles.value}>{entry.khmerName}</p>
      <p style={styles.label}>STORY</p>
      <p style={styles.value}>{entry.story}</p>
      <p style={styles.label}>SOURCE</p>
      <p style={styles.value}>{entry.source}</p>
      <p style={styles.label}>PLACE</p>
      <p style={styles.value}>{entry.place}</p>
      <p style={styles.label}>DATE</p>
      <p style={styles.value}>{entry.date}</p>
      <p style={styles.label}>MEDIA</p>
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