import styles from "../app/page.module.css";

export default function EntrySearch({ 
  value, 
  onChange, 
  onClear, 
  labelText, 
  placeholderText 
}) {
  return (
    <div className={styles.searchContainer}>
      <p className={styles.searchLabel}>{labelText}</p>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder={placeholderText}
          value={value}
          onChange={onChange}
          className={styles.searchBox}
        />
        {value && (
          <button
            className={styles.clearButton}
            onClick={onClear}
            aria-label="Clear search"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}