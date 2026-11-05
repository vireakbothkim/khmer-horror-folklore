// Nav links shown in the site header. Logged-out and logged-in lists differ.
// Used inside MobileMenu, so on phones they open from the ☰ button.
const linkClass =
  "whitespace-nowrap rounded border border-border px-3 py-1 font-mono text-xs uppercase tracking-wider text-text-secondary transition-colors hover:border-accent hover:text-accent";
const solidClass =
  "whitespace-nowrap cursor-pointer rounded border border-accent bg-accent px-3 py-1 font-mono text-xs uppercase tracking-wider text-text-primary transition-colors hover:border-accent-hover hover:bg-accent-hover";

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
      <span
        title={user.email}
        className="max-w-[150px] truncate px-2 py-1 font-mono text-xs text-text-secondary"
      >
        {user.email}
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
