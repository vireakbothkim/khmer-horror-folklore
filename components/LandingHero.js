"use client";

import collection from "../collection.config.js";
import { useLanguage } from "./LanguageProvider";
import LandingTitle from "./LandingTitle";
import LandingPhoto from "./LandingPhoto";

// Landing page hero. Placeholder copy from the design is used for the small
// labels and the English description; the owner will replace it.
const labels = {
  en: {
    description:
      "Cambodian living archive of a diverse pantheon of horrorific entities rooted in ancient animism and Buddhist traditions.",
    lead: "An index of the strange and",
    kickerLeft: ["Are we", "truly alone?"],
    kickerRight: ["Fall", "2026"],
    view: ["View the", "archive"],
  },
  kh: {
    description: "បណ្ណសារដែលប្រមូលផ្តុំនូវអមនុស្សគួរឱ្យខ្លាចជាច្រើន មានឫសគល់ចេញពីជំនឿលើវិញ្ញាណបុរាណ និងប្រពៃណីព្រះពុទ្ធសាសនា។",
    lead: "បញ្ជីនៃរឿងចម្លែក និង",
    kickerLeft: ["តេីយេីងពិតជា", "នៅម្នាក់ឯងមែនទេ?"],
    kickerRight: ["ឆមាសទី ២", "២០២៦"],
    view: ["មើលបណ្ណសារ"],
  },
};

export default function LandingHero() {
  const { lang } = useLanguage();
  const isKhmer = lang === "kh";
  const t = labels[lang] || labels.en;

  return (
    <section className="mx-auto grid w-full min-h-[70vh] max-w-[1280px] flex-1 grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col justify-between gap-12 px-6 py-10 lg:py-14">
        <div className="flex justify-between gap-6 font-mono text-xs uppercase leading-relaxed tracking-[0.2em] text-text-primary">
          <p className="m-0">
            {t.kickerLeft.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </p>
          <p className="m-0 text-right">
            {t.kickerRight.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
          </p>
        </div>
        <div>
          {t.lead && (
            <p
              lang={isKhmer ? "km" : "en"}
              className={`m-0 mb-2 text-2xl italic text-text-secondary ${isKhmer ? "font-khmer not-italic" : ""}`}
              style={isKhmer ? undefined : { fontFamily: "var(--font-garamond), serif" }}
            >
              {t.lead}
            </p>
          )}
          <LandingTitle />
        </div>
        <div className="flex items-end justify-between gap-8">
          <p
            lang={isKhmer ? "km" : "en"}
            className="m-0 max-w-[380px] text-base leading-relaxed text-text-secondary"
          >
            {t.description}
          </p>
          <a
            href="/archive"
            lang={isKhmer ? "km" : "en"}
            className="flex w-44 shrink-0 items-center justify-between bg-accent px-6 py-5 font-mono text-sm uppercase leading-tight tracking-[0.2em] text-text-primary transition-colors hover:bg-accent-hover"
          >
            <span>
              {t.view.map((line) => (
                <span key={line} className="block">{line}</span>
              ))}
            </span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
      <LandingPhoto />
    </section>
  );
}
