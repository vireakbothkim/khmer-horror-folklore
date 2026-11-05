// Shared box for loading, empty, and "not found" states across the site.
// Same look as the homepage "no results" box. Pass the text as children.
export default function StatusBox({ children, className = "" }) {
  return (
    <div
      className={`mt-12 rounded-md border border-border p-8 text-center text-base leading-relaxed text-text-secondary ${className}`}
    >
      {children}
    </div>
  );
}
