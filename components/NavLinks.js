// Nav links shown in the site header. Logged-out and logged-in lists differ.
// Used inside MobileMenu, so on phones they open from the ☰ button.
// sm: classes only apply from 640px up (laptop row). Phones keep the base sizes.
const linkClass =
  "whitespace-nowrap rounded border border-border px-3 py-1 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:border-accent hover:text-accent sm:px-5 sm:py-2.5 sm:text-sm";
// Logged-in label: same box and sizes as the buttons, but not clickable.
const userClass =
  "max-w-[260px] truncate rounded border border-border px-3 py-1 font-mono text-xs tracking-wider text-text-primary sm:px-5 sm:py-2.5 sm:text-sm";
const solidClass =
  "whitespace-nowrap cursor-pointer rounded border border-accent bg-accent px-3 py-1 font-mono text-xs uppercase tracking-wider text-text-primary transition-colors hover:border-accent-hover hover:bg-accent-hover sm:px-5 sm:py-2.5 sm:text-sm";

export default function NavLinks({ lang, user, isReviewer, onLogout }) {
  const t = (en, kh) => (lang === "en" ? en : kh);

  if (!user) {
    return (
      <>
        <a href="/login" className={linkClass}>{t("LOG IN", "ចូល")}</a>
        <a href="/contribute" className={linkClass}>{t("CONTRIBUTE", "ចូលរួម")}</a>
        <a href="/signup" className={solidClass}>{t("SIGN UP", "ចុះឈ្មោះ")}</a>
      </>
    );
  }

  return (
    <>
      <span title={user.email} className={userClass}>
        {`${t("Logging in as:", "កំពុងចូលជា៖")} ${user.email}`}
      </span>
      <a href="/contribute" className={linkClass}>{t("CONTRIBUTE", "ចូលរួម")}</a>
      <a href="/my-entries" className={linkClass}>{t("MY ENTRIES", "ធាតុរបស់ខ្ញុំ")}</a>
      {isReviewer && (
        <a href="/review" className={linkClass}>{t("REVIEW", "ពិនិត្យ")}</a>
      )}
      <button type="button" onClick={onLogout} className={solidClass}>
        {t("LOGOUT", "ចាកចេញ")}
      </button>
    </>
  );
}
