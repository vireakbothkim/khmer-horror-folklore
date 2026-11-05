"use client";

import { useState } from "react";

export default function ReturnNotesModal({ onSubmit, onCancel }) {
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!notes.trim()) {
      setError("Please write a note explaining what needs to change.");
      return;
    }
    onSubmit(notes.trim());
  };

  return (
    <div style={{
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: "var(--color-bg)",
        padding: "32px",
        borderRadius: "var(--radius-md)",
        maxWidth: "600px",
        width: "90%",
        border: "1px solid var(--color-border)"
      }}>
        <h2 style={{
          fontFamily: "var(--font-display)",
          fontSize: "var(--text-xl)",
          marginBottom: "16px",
          color: "var(--color-text-primary)"
        }}>
          Return for changes
        </h2>
        <p style={{
          color: "var(--color-text-secondary)",
          fontSize: "var(--text-sm)",
          marginBottom: "16px"
        }}>
          Explain what the contributor needs to change. You can write in English, Khmer, or both.
        </p>
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            if (error) setError("");
          }}
          placeholder="Write your note here..."
          style={{
            width: "100%",
            minHeight: "140px",
            padding: "12px",
            backgroundColor: "transparent",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-sm)",
            color: "var(--color-text-primary)",
            fontFamily: "var(--font-sans)",
            fontSize: "var(--text-base)",
            resize: "vertical"
          }}
        />
        {error && (
          <p style={{
            marginTop: "8px",
            color: "var(--color-accent)",
            fontSize: "var(--text-sm)"
          }}>
            {error}
          </p>
        )}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "24px" }}>
          <button
            onClick={onCancel}
            style={{
              padding: "10px 20px",
              backgroundColor: "transparent",
              border: "1px solid var(--color-border)",
              borderRadius: "var(--radius-md)",
              color: "var(--color-text-secondary)",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-sm)",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            style={{
              padding: "10px 20px",
              backgroundColor: "var(--color-accent)",
              border: "none",
              borderRadius: "var(--radius-md)",
              color: "white",
              fontFamily: "var(--font-mono)",
              fontSize: "var(--text-sm)",
              cursor: "pointer"
            }}
          >
            Submit Return
          </button>
        </div>
      </div>
    </div>
  );
}
