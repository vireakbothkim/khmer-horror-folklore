"use client";

import collection from "../collection.config.js";
import { useLanguage } from "./LanguageProvider";

// Big hero title. English: first line is the name with "Horror" in red,
// and the last word sits below in italic. Khmer: the full name on one line,
// with "ខ្មោច" (ghost) in red. The name comes from collection.config.js.
const KEYWORD = { en: "Horror", kh: "ខ្មោច" };

// Wraps the keyword in a red span inside the given text.
function highlight(text, keyword) {
  const parts = text.split(keyword);
  if (parts.length === 1) return text;
  return (
    <>
      {parts[0]}
      <span className="text-accent">{keyword}</span>
      {parts.slice(1).join(keyword)}
    </>
  );
}

export default function LandingTitle() {
  const { lang } = useLanguage();
  const isKhmer = lang === "kh";
  const title = isKhmer ? collection.name_km : collection.name;

  const words = title.split(" ");
  const lastWord = words.length > 1 ? words.pop() : null;
  const firstLine = words.join(" ");

  return (
    <h1
      lang={isKhmer ? "km" : "en"}
      className={`m-0 text-6xl leading-[0.85] tracking-[-0.02em] text-text-primary md:text-8xl ${
        isKhmer ? "font-khmer" : ""
      }`}
      style={
        isKhmer
          ? undefined
          : { fontFamily: "var(--font-garamond), serif", fontWeight: 300 }
      }
    >
      {isKhmer ? (
        highlight(title, KEYWORD.kh)
      ) : (
        <>
          <span className="block">{highlight(firstLine || title, KEYWORD.en)}</span>
          {lastWord && (
            <span className="block ml-[12%] italic md:ml-[18%]">{lastWord}</span>
          )}
        </>
      )}
    </h1>
  );
}
