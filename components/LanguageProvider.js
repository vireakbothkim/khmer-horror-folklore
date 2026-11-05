"use client";

import { createContext, useContext, useEffect, useState } from "react";

const STORAGE_KEY = "khmer-archive-lang";
const LanguageContext = createContext({ lang: "en", toggleLang: () => {} });

// Shares one language choice ("en" or "kh") across every page and
// remembers it in the browser after a reload.
export function LanguageProvider({ children }) {
  const [lang, setLang] = useState("en");

  // Read the saved choice after mount, so the server and the first browser
  // render match (both start in English).
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === "en" || saved === "kh") setLang(saved);
    } catch (err) {
      // Storage can be blocked (for example, private browsing). Stay in English.
    }
  }, []);

  const toggleLang = () => {
    const next = lang === "en" ? "kh" : "en";
    setLang(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch (err) {
      // If storage is blocked, the choice still works for this page visit.
    }
  };

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
