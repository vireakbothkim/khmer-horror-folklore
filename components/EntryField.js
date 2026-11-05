import styles from "./EntryCard.module.css";

// One labeled field on the entry page.
// variant "short" = single-line value, "long" = paragraph (full width),
// "media" = image block (full width).
export default function EntryField({ label, children, variant = "short" }) {
  const wide = variant === "long" || variant === "media";
  const valueClass =
    variant === "long" ? styles.longValue : variant === "media" ? "" : styles.shortValue;

  return (
    <div className={`${styles.field} ${wide ? styles.fieldWide : ""}`}>
      <p className={styles.label}>{label}</p>
      <div className={valueClass}>{children}</div>
    </div>
  );
}
