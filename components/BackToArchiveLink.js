"use client";

import { useLanguage } from "./LanguageProvider";

// Shared "Back to Archive" link used on every page that needs a way home.
// Filled red button, same look everywhere. It follows the site-wide
// language toggle, so the label is translated on every page.
// Pass destination="my-entries" to send the visitor back to /my-entries instead.
const destinations = {
  archive: {
    href: "/archive",
    labels: {
      en: "Back to Archive",
      kh: "ត្រឡប់ទៅបណ្ណសារវិញ",
    },
  },
  "my-entries": {
    href: "/my-entries",
    labels: {
      en: "Back to My Entries",
      kh: "ត្រឡប់ទៅធាតុរបស់ខ្ញុំវិញ",
    },
  },
};

export default function BackToArchiveLink({ destination = "archive" }) {
  const { lang } = useLanguage();
  const isKhmer = lang === "kh";
  const target = destinations[destination] || destinations.archive;

  return (
    <a
      href={target.href}
      lang={isKhmer ? "km" : "en"}
      className="inline-flex items-center bg-accent px-6 py-4 font-mono text-sm uppercase tracking-[0.2em] text-text-primary transition-colors hover:bg-accent-hover"
    >
      {target.labels[lang] || target.labels.en}
    </a>
  );
}
