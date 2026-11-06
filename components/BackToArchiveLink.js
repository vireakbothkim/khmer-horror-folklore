"use client";

import { useLanguage } from "./LanguageProvider";

// Shared "Back to Archive" link used on every page that needs a way home.
// Filled red button, same look everywhere. It follows the site-wide
// language toggle, so the label is translated on every page.
const labels = {
  en: "Back to Archive",
  kh: "ត្រឡប់ទៅបណ្ណសារវិញ",
};

export default function BackToArchiveLink() {
  const { lang } = useLanguage();
  const isKhmer = lang === "kh";

  return (
    <a
      href="/archive"
      lang={isKhmer ? "km" : "en"}
      className="inline-flex items-center bg-accent px-6 py-4 font-mono text-sm uppercase tracking-[0.2em] text-text-primary transition-colors hover:bg-accent-hover"
    >
      {labels[lang] || labels.en}
    </a>
  );
}
