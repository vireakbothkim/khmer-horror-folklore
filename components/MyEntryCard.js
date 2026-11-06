// One contributor entry as a card: image, status badge, title, reviewer
// feedback (when returned), and View / Edit actions.
// Labels come from the page so the translations live in one place.
const badgeStyles = {
  published: "bg-[rgba(34,197,94,0.1)] text-[rgb(34,197,94)]",
  returned: "bg-[rgba(239,68,68,0.1)] text-[rgb(239,68,68)]",
  pending: "bg-[rgba(234,179,8,0.1)] text-[rgb(234,179,8)]",
};

const actionClass =
  "inline-flex items-center border border-border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] text-text-secondary transition-colors hover:border-accent hover:text-accent";

export default function MyEntryCard({ entry, lang, statusLabel, labels }) {
  const isKhmer = lang === "kh";
  const langTag = isKhmer ? "km" : "en";
  const title = isKhmer ? entry.title_km || entry.title_en : entry.title_en;
  const badge = badgeStyles[entry.status] || badgeStyles.pending;
  const createdDate = entry.created_at ? new Date(entry.created_at).toLocaleDateString() : "";
  const returnedDate = entry.returned_at ? new Date(entry.returned_at).toLocaleDateString() : "";

  return (
    <article className="flex flex-col overflow-hidden rounded-md border border-border bg-bg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-border">
        {entry.media ? (
          <img src={entry.media} alt={title} className="size-full object-cover" />
        ) : (
          <div className="flex size-full items-center justify-center font-mono text-xs uppercase tracking-[0.05em] text-text-secondary [font-variant-caps:small-caps]">
            {labels.noImage}
          </div>
        )}
        <span className={`absolute left-3 top-3 rounded px-2 py-1 font-mono text-xs ${badge}`}>
          {statusLabel}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div>
          <h3
            lang={langTag}
            className={`m-0 text-xl font-bold leading-snug text-text-primary ${isKhmer ? "font-khmer" : "font-display"}`}
          >
            {title}
          </h3>
          {createdDate && (
            <p className="mt-1 font-mono text-xs text-text-secondary">{createdDate}</p>
          )}
        </div>

        {entry.status === "returned" && entry.return_notes && (
          <div className="whitespace-pre-wrap border-l-[3px] border-[rgb(239,68,68)] bg-[rgba(239,68,68,0.05)] p-3 text-sm leading-relaxed text-text-primary">
            <p className="m-0 mb-1 font-mono text-xs text-text-secondary">
              {labels.feedback}
              {returnedDate ? ` · ${returnedDate}` : ""}
            </p>
            {entry.return_notes}
          </div>
        )}

        <div className="mt-auto flex gap-2 pt-2">
          <a href={`/entries/${entry.id}`} className={actionClass}>
            {labels.view}
          </a>
          {entry.status !== "published" && (
            <a href={`/entries/${entry.id}/edit`} className={actionClass}>
              {labels.edit}
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
