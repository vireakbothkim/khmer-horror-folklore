import { useLanguage } from "./LanguageProvider";

// Right-hand photo of the landing page, with the record caption and "01" marker.
// The caption text is placeholder copy from the design; the owner will edit it.
const captions = {
  en: ["A record of words ", "passed down."],
  kh: ["កំណត់ត្រានៃរឿង", "ដែលប្រាប់តជំនាន់។"],
};

export default function LandingPhoto() {
  const { lang } = useLanguage();
  const isKhmer = lang === "kh";
  const [first, second] = captions[lang] || captions.en;

  return (
    <div className="relative min-h-[320px] border-t border-border lg:min-h-0 lg:border-l lg:border-t-0">
      <img
        src="/images/boku_hotel.jpeg"
        alt="An old white wooden house covered in ivy, lit faintly at night"
        className="absolute inset-0 h-full w-full object-cover opacity-60 grayscale"
      />
      <div className="absolute inset-0 bg-linear-to-r from-bg/80 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 p-8">
        <div
          lang={isKhmer ? "km" : "en"}
          className="font-mono text-sm uppercase leading-loose tracking-[0.2em] text-text-primary"
        >
          <p className="m-0">{first}</p>
          <p className="m-0">{second}</p>
        </div>
        <span
          aria-hidden="true"
          className="text-6xl leading-none text-text-primary"
          style={{ fontFamily: "var(--font-garamond), serif", fontWeight: 300 }}
        >
          𓉸
        </span>
      </div>
    </div>
  );
}
