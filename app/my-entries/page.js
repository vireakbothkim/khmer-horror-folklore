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
import EntrySearch from "../../components/EntrySearch";

export default function MyEntriesPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

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
      delete: "Delete",
      deleteConfirm: "Are you sure you want to delete this entry? This action cannot be undone.",
      deleteFailed: "Failed to delete entry. Please try again.",
      filterLabel: "Filter by status",
      allStatuses: "All statuses",
      noMatch: "No entries with this status.",
      searchEntries: "SEARCH ENTRIES",
      searchPlaceholder: "Search by title or description...",
      noResults: (query) => `No results found for "${query}"`
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
      delete: "លុប",
      deleteConfirm: "តើអ្នកច្បាស់ថាចង់លុបធាតុនេះឬ? សកម្មភាពនេះមិនអាចត្រឡប់វិញបានទេ។",
      deleteFailed: "បរាជ័យក្នុងការលុបធាតុ។ សូមព្យាយាមម្តងទៀត។",
      filterLabel: "ត្រងតាមស្ថានភាព",
      allStatuses: "ស្ថានភាពទាំងអស់",
      noMatch: "គ្មានធាតុដែលមានស្ថានភាពនេះទេ។",
      searchEntries: "ស្វែងរកធាតុ",
      searchPlaceholder: "ស្វែងរកតាមចំណងជើង ឬការពិពណ៌នា...",
      noResults: (query) => `គ្មានលទ្ធផលសម្រាប់ "${query}"`
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

  // Deletes one entry after confirming. Same checks as the entry page:
  // delete, then re-read the row to confirm it is gone before updating the list.
  const handleDelete = async (entry) => {
    if (!window.confirm(t.deleteConfirm)) return;

    try {
      const supabase = createClient();
      if (!user) return;
      const { error: deleteError } = await supabase
        .from('entries')
        .delete()
        .eq('id', entry.id)
        .eq('owner', user.id);

      if (deleteError) {
        console.error("Delete error:", deleteError);
        window.alert(t.deleteFailed);
        return;
      }

      const { data: verifyData } = await supabase
        .from('entries')
        .select('id')
        .eq('id', entry.id);

      if (verifyData && verifyData.length > 0) {
        console.error("Delete verification failed: entry still exists");
        window.alert(t.deleteFailed);
        return;
      }

      setEntries((prev) => prev.filter((item) => item.id !== entry.id));
    } catch (err) {
      console.error("Error during delete:", err);
      window.alert(t.deleteFailed);
    }
  };

  const langTag = lang === "kh" ? "km" : "en";

  if (loading) {
    return (
      <main className="mx-auto flex min-h-[60vh] w-full max-w-[1280px] items-center justify-center px-6">
        <Spinner label={t.loading} />
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto w-full max-w-[1280px] px-6 py-12">
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

  // Cards shown after the status filter and search. Stats above always use all entries.
  // Search checks both English and Khmer fields, the same as /archive.
  const query = searchQuery.trim().toLowerCase();
  const matchesSearch = (entry) =>
    !query ||
    [
      entry.title_en, entry.title_km,
      entry.appearance_en, entry.appearance_km,
      entry.story_en, entry.story_km,
      entry.source_en, entry.source_km,
      entry.place_en, entry.place_km
    ].some((field) => (field || "").toLowerCase().includes(query));
  const visibleEntries = entries
    .filter((entry) => statusFilter === "all" || entry.status === statusFilter)
    .filter(matchesSearch);

  return (
    <main className="mx-auto w-full max-w-[1280px] px-6 pb-16 pt-10">
      <div className="mb-8">
        <BackToArchiveLink />
      </div>
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

          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0 flex-1">
              <EntrySearch
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onClear={() => setSearchQuery("")}
                labelText={t.searchEntries}
                placeholderText={t.searchPlaceholder}
              />
            </div>
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
              <p lang={langTag} className="mb-0">{query ? t.noResults(searchQuery.trim()) : t.noMatch}</p>
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
                    edit: t.edit,
                    delete: t.delete
                  }}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </>
      )}

    </main>
  );
}
