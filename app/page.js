import collection from "../collection.config.js";
import EntryCard from "../components/EntryCard";
import krasueImg from "../components/krasue.jpg";
import bananaTreeGhostImg from "../components/banana_tree_ghost.png";

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
};

export default function Home() {
  const entry1 = {
    title: "Ahp(Krasue)",
    khmerName: "អាប",
    story: "Ahp(Krasue) is a bodyless woman flying entity with all the human organs attached to the head. The entity appears to have sharp eyes, glowing, flickering red light from the heart, and long hair flying with the late night wind. In urban legends, Ahp seeks blood like a vampire. They desire farm animal organs, especially chickens, blood of newly delivered human newborn, and any types of organs.",
    source: "Urban Legend, ",
    place: "Mostly Urban, Farmland, Animal Farm, Maternity Hospital",
    media: krasueImg,
  };

  const entry2 = {
    title: "Banana Tree Ghost",
    khmerName: "ខ្មោចដេីមចេកជ្វា",
    story: "Banana Tree Ghost is a restless ghost that lives strictly on the banana tree. In rural areas, it is forbidden to plant a banana tree right next to the window of your house as the leaf of the banana tree could grow and attached to the house, providing a path for the banana tree ghost to go in and haunt those who lives inside.",
    source: "Grandparents, friends, urban legend",
    place: "Mostly Urban, Farmland,",
    media: bananaTreeGhostImg,
  };

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

      <p style={styles.count}>entries in the archive: 2</p>

      <EntryCard entry={entry1} />
      <EntryCard entry={entry2} />

      <footer style={styles.footer}>
        Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall
        2026. This archive is under construction all semester. Come back in
        December.
      </footer>
    </main>
  );
}