"use client";

import { useLanguage } from "./LanguageProvider";

// Shared footer shown on every page. Text is the same credit line the
// homepage, login, and signup pages used before this footer moved here.
const text = {
  en: "Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall 2026.",
  kh: "បង្កើតឡើងសម្រាប់មុខវិជ្ជា ICT 340 — Vibe Coding នៅសាកលវិទ្យាល័យអាមេរិកាំងភ្នំពេញ (AUPP) សម្រាប់ឆមាសទី ២ ឆ្នាំ ២០២៦។",
};

export default function SiteFooter() {
  const { lang } = useLanguage();
  return (
    <footer className="mx-auto mt-10 max-w-[1280px] border-t border-border px-[var(--content-padding)] py-8 text-center text-sm leading-relaxed text-text-secondary">
      {text[lang] || text.en}
    </footer>
  );
}
