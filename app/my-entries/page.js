"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-client";
import { useLanguage } from "../../components/LanguageProvider";
import StatusBox from "../../components/StatusBox";
import Spinner from "../../components/Spinner";
import BackToArchiveLink from "../../components/BackToArchiveLink";
import MyEntriesStats from "../../components/MyEntriesStats";
import MyEntryCard from "../../components/MyEntryCard";
import StatusFilter from "../../components/StatusFilter";

export default function MyEntriesPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Status translations
  const statusText = {
    en: {
      pending: "Waiting for review",
      published: "Published",
      returned: "Returned for changes"
    },
    kh: {
      pending: "កំពុងរង់ចាំការពិនិត្យ",
      published: "បានផ្សព្វផ្សាយ",
      returned: "ត្រូវបានបញ្ជូនត្រឡប់វិញដើម្បីកែប្រែ"
    }
  };

  // UI text translations
  const uiText = {
    en: {
      kicker: "CONTRIBUTOR DASHBOARD",
      pageTitle: "My Entries",
      noEntries: "You haven't submitted any entries yet.",
      contribute: "Contribute an entry",
      total: "Total",
      waiting: "Waiting",
      published: "Published",
      returned: "Returned",
      noImage: "No Image",
      feedback: "Reviewer feedback",
      view: "View",
      edit: "Edit",
      loading: "Loading...",
      errorTitle: "Error",
      errorMessage: "Failed to load entries",
      filterLabel: "Filter by status",
      allStatuses: "All statuses",
      noMatch: "No entries with this status."
    },
    kh: {
      kicker: "ផ្ទាំងអ្នករួមចំណែក",
      pageTitle: "ធាតុរបស់ខ្ញុំ",
      noEntries: "អ្នកមិនទាន់បានដាក់ស្នើធាតុណាមួយទេ។",
      contribute: "ចូលរួមធាតុ",
      total: "សរុប",
      waiting: "កំពុងរង់ចាំ",
      published: "បានផ្សព្វផ្សាយ",
      returned: "ត្រឡប់វិញ",
      noImage: "គ្មានរូបភាព",
      feedback: "មតិយោបល់ពីអ្នកពិនិត្យ",
      view: "មើល",
      edit: "កែសម្រួល",
      loading: "កំពុងផ្ទុក...",
      errorTitle: "កំហុស",
      errorMessage: "បរាជ័យក្នុងការផ្ទុកធាតុ",
      filterLabel: "ត្រងតាមស្ថានភាព",
      allStatuses: "ស្ថានភាពទាំងអស់",
      noMatch: "គ្មានធាតុដែលមានស្ថានភាពនេះទេ។"
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        setUser(user);

        const { data, error } = await supabase
          .from('entries')
          .select('id, owner, status, created_at, contributor, media, title_en, title_km, appearance_en, appearance_km, story_en, story_km, source_en, source_km, place_en, place_km')
          .eq('owner', user.id)
          .order('created_at', { ascending: false });

        if (error) throw error;
        // Notes are not readable directly; the owner-only function returns them
        const withNotes = await Promise.all(
          (data || []).map(async (entry) => {
            if (entry.status !== 'returned') return entry;
            const { data: noteRows, error: noteError } = await supabase.rpc('get_return_notes', { entry_id: entry.id });
            if (noteError) console.error("Error loading return notes:", noteError);
            const note = noteRows?.[0];
            return {
              ...entry,
              return_notes: note?.return_notes ?? null,
              returned_at: note?.returned_at ?? null
            };
          })
        );
        setEntries(withNotes);
      } catch (err) {
        console.error("Error:", err);
        setError("Failed to load entries");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const t = uiText[lang];
  const statusT = statusText[lang];
  const langTag = lang === "kh" ? "km" : "en";

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-[1280px] items-center justify-center px-6">
        <Spinner label={t.loading} />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto max-w-[1280px] px-6 py-12">
        <h1 className="font-display text-4xl font-bold text-text-primary">{t.errorTitle}</h1>
        <p className="mt-4 text-text-secondary">{t.errorMessage}</p>
        <div className="mt-8">
          <BackToArchiveLink />
        </div>
      </main>
    );
  }

  const countBy = (status) => entries.filter((entry) => entry.status === status).length;
  const stats = [
    { label: t.total, value: entries.length },
    { label: t.waiting, value: countBy("pending") },
    { label: t.published, value: countBy("published") },
    { label: t.returned, value: countBy("returned") }
  ];

  // Cards shown after the status filter. Stats above always use all entries.
  const visibleEntries =
    statusFilter === "all" ? entries : entries.filter((entry) => entry.status === statusFilter);

  return (
    <main className="mx-auto max-w-[1280px] px-6 pb-16 pt-10">
      <header className="flex flex-col gap-6 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
        <div className="min-w-0">
          <p className="m-0 font-mono text-xs font-bold uppercase tracking-[2px] text-accent-text [font-variant-caps:small-caps]">
            {t.kicker}
          </p>
          <h1
            lang={langTag}
            className={`mb-0 mt-2 text-4xl font-bold leading-tight text-text-primary sm:text-5xl ${lang === "kh" ? "font-khmer" : "font-display"}`}
          >
            {t.pageTitle}
          </h1>
        </div>
        <a
          href="/contribute"
          className="inline-flex shrink-0 items-center bg-accent px-6 py-4 font-mono text-sm uppercase tracking-[0.2em] text-text-primary transition-colors hover:bg-accent-hover"
        >
          {t.contribute}
        </a>
      </header>

      {entries.length === 0 ? (
        <StatusBox className="mt-10">
          <p lang={langTag} className="mb-0">{t.noEntries}</p>
        </StatusBox>
      ) : (
        <>
          <MyEntriesStats items={stats} langTag={langTag} />

          <div className="mt-10 flex justify-end">
            <StatusFilter
              label={t.filterLabel}
              value={statusFilter}
              onChange={setStatusFilter}
              langTag={langTag}
              options={[
                { value: "all", label: t.allStatuses },
                { value: "pending", label: statusT.pending },
                { value: "published", label: statusT.published },
                { value: "returned", label: statusT.returned }
              ]}
            />
          </div>

          {visibleEntries.length === 0 ? (
            <StatusBox className="mt-6">
              <p lang={langTag} className="mb-0">{t.noMatch}</p>
            </StatusBox>
          ) : (
            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
              {visibleEntries.map((entry) => (
                <MyEntryCard
                  key={entry.id}
                  entry={entry}
                  lang={lang}
                  statusLabel={statusT[entry.status] || entry.status}
                  labels={{
                    noImage: t.noImage,
                    feedback: t.feedback,
                    view: t.view,
                    edit: t.edit
                  }}
                />
              ))}
            </div>
          )}
        </>
      )}

      <div className="mt-12">
        <BackToArchiveLink />
      </div>
    </main>
  );
}
