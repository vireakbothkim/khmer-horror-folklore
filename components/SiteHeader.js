"use client";

import { useEffect, useState } from "react";
import collection from "../collection.config.js";
import { createClient } from "../lib/supabase-client";
import { useCurrentUser } from "../lib/use-current-user";
import { useLanguage } from "./LanguageProvider";
import MobileMenu from "./MobileMenu";
import NavLinks from "./NavLinks";

// Top bar shown on every page: archive name, language toggle, nav links,
// and the ☰ button on phones. The toggle sits next to ☰ so it's easy to find.
const KICKER_EN = "KHMER LIVING ARCHIVE";
const KICKER_KH = "បណ្ណសាររស់របស់ខ្មែរ";

export default function SiteHeader() {
  const { lang, toggleLang } = useLanguage();
  const { user, isReviewer, loading } = useCurrentUser();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error("Error signing out:", error);
      } else {
        window.location.href = "/";
      }
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  const brandName = lang === "kh" ? collection.name_km : collection.name;
  const kicker = lang === "kh" ? KICKER_KH : KICKER_EN;

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-bg backdrop-blur transition-colors ${
        scrolled ? "border-border" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1280px] items-start justify-between gap-4 px-6 py-4">
        <a href="/" className="min-w-0">
          <p className="m-0 font-mono text-xs font-bold uppercase tracking-[2px] text-accent [font-variant-caps:small-caps]">
            {kicker}
          </p>
          <span className="block pb-1 font-display text-2xl font-bold leading-snug text-text-primary sm:text-3xl">
            {brandName}
          </span>
        </a>
        <div className="relative flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={toggleLang}
            className="sm:order-last rounded border border-border px-3 py-1 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            {lang === "en" ? "ភាសាខ្មែរ" : "English"}
          </button>
          <MobileMenu label={lang === "en" ? "Open menu" : "បើកម៉ឺនុយ"}>
            {!loading && (
              <NavLinks
                lang={lang}
                user={user}
                isReviewer={isReviewer}
                onLogout={handleLogout}
              />
            )}
          </MobileMenu>
        </div>
      </div>
    </header>
  );
}
