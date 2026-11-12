"use client";

import { useLanguage } from "./LanguageProvider";

// Previous and next buttons at the bottom of an entry, on the left and right.
// Same button look as BackToArchiveLink. The labels follow the site-wide language toggle.
const labels = {
  en: { previous: "← Previous entry", next: "Next entry →" },
  kh: { previous: "← ធាតុមុន", next: "ធាតុបន្ទាប់ →" },
};

const buttonClass =
  "inline-flex items-center bg-accent px-6 py-4 font-mono text-sm uppercase tracking-[0.2em] text-text-primary transition-colors hover:bg-accent-hover";

export default function EntryPager({ prevId, nextId }) {
  const { lang } = useLanguage();
  const t = labels[lang] || labels.en;
  const langTag = lang === "kh" ? "km" : "en";

  return (
    <nav aria-label="Entry navigation" className="mt-10 mb-12 flex items-center justify-between gap-4">
      <a href={`/entries/${prevId}`} lang={langTag} className={buttonClass}>
        {t.previous}
      </a>
      <a href={`/entries/${nextId}`} lang={langTag} className={buttonClass}>
        {t.next}
      </a>
    </nav>
  );
}
