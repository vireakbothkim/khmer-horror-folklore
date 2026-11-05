// Shared loading spinner for every page. Colors come from the site palette:
// a dark border track (--color-border) with a red arc (--color-accent).
// Pass a label to show text under the ring; leave it out for a ring only.
// motion-safe: stops the spin for users who ask for reduced motion.
export default function Spinner({ label = "" }) {
  return (
    <div
      role="status"
      aria-label={label || "Loading"}
      className="flex flex-col items-center gap-3"
    >
      <span
        aria-hidden="true"
        className="size-8 rounded-full border-2 border-border border-t-accent motion-safe:animate-spin"
      />
      {label && (
        <span className="font-mono text-xs uppercase tracking-[0.05em] text-text-secondary [font-variant-caps:small-caps]">
          {label}
        </span>
      )}
    </div>
  );
}
