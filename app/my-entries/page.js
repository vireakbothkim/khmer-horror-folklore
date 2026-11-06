"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-client";
import { useLanguage } from "../../components/LanguageProvider";
import StatusBox from "../../components/StatusBox";
import Spinner from "../../components/Spinner";
import BackToArchiveLink from "../../components/BackToArchiveLink";

export default function MyEntriesPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState("");

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
      pageTitle: "My Entries",
      noEntries: "You haven't submitted any entries yet.",
      contribute: "Contribute an entry",
      title: "Title",
      status: "Status",
      actions: "Actions",
      view: "View",
      edit: "Edit",
      langToggle: "ភាសាខ្មែរ"
    },
    kh: {
      pageTitle: "ធាតុរបស់ខ្ញុំ",
      noEntries: "អ្នកមិនទាន់បានដាក់ស្នើធាតុណាមួយទេ។",
      contribute: "ចូលរួមធាតុ",
      title: "ចំណងជើង",
      status: "ស្ថានភាព",
      actions: "សកម្មភាព",
      view: "មើល",
      edit: "កែសម្រួល",
      langToggle: "English"
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

  if (loading) {
    return (
      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", textAlign: "center" }}>
        <Spinner label="Loading..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
        <h1>Error</h1>
        <p>{error}</p>
        <BackToArchiveLink />
      </div>
    );
  }

  const t = uiText[lang];
  const statusT = statusText[lang];

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <h1 style={{ margin: 0, fontSize: "24px" }}>{t.pageTitle}</h1>
      </div>

      {entries.length === 0 ? (
        <StatusBox className="mt-0">
          <p style={{ marginBottom: "20px" }}>{t.noEntries}</p>
          <a 
            href="/contribute" 
            style={{ 
              padding: "10px 20px", 
              backgroundColor: "var(--color-accent)", 
              color: "white", 
              textDecoration: "none", 
              borderRadius: "4px" 
            }}
          >
            {t.contribute}
          </a>
        </StatusBox>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontFamily: "var(--font-mono)", fontSize: "var(--text-sm)" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--color-border)" }}>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "normal", color: "var(--color-text-secondary)" }}>
                  {t.title}
                </th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "normal", color: "var(--color-text-secondary)" }}>
                  {t.status}
                </th>
                <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: "normal", color: "var(--color-text-secondary)" }}>
                  {t.actions}
                </th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "16px" }}>
                    <div style={{ fontWeight: "500" }}>
                      {lang === "en" ? entry.title_en : entry.title_km || entry.title_en}
                    </div>
                    {entry.status === 'returned' && entry.return_notes && (
                      <div style={{
                        marginTop: "12px",
                        padding: "12px",
                        borderLeft: "3px solid rgb(239, 68, 68)",
                        backgroundColor: "rgba(239, 68, 68, 0.05)",
                        whiteSpace: "pre-wrap",
                        fontSize: "var(--text-sm)",
                        lineHeight: 1.5
                      }}>
                        <div style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "var(--text-xs)",
                          color: "var(--color-text-secondary)",
                          marginBottom: "6px"
                        }}>
                          Reviewer feedback{entry.returned_at ? ` · ${new Date(entry.returned_at).toLocaleDateString()}` : ""}
                        </div>
                        {entry.return_notes}
                      </div>
                    )}
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{
                      display: "inline-block",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      backgroundColor: entry.status === 'published' ? 'rgba(34, 197, 94, 0.1)' : 
                                     entry.status === 'returned' ? 'rgba(239, 68, 68, 0.1)' : 
                                     'rgba(234, 179, 8, 0.1)',
                      color: entry.status === 'published' ? 'rgb(34, 197, 94)' : 
                            entry.status === 'returned' ? 'rgb(239, 68, 68)' : 
                            'rgb(234, 179, 8)',
                      fontSize: "var(--text-xs)",
                      fontFamily: "var(--font-mono)"
                    }}>
                      {statusT[entry.status] || entry.status}
                    </div>
                  </td>
                  <td style={{ padding: "16px" }}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <a
                        href={`/entries/${entry.id}`}
                        style={{
                          padding: "6px 12px",
                          backgroundColor: "transparent",
                          border: "1px solid var(--color-border)",
                          borderRadius: "4px",
                          color: "var(--color-text-secondary)",
                          textDecoration: "none",
                          fontSize: "var(--text-xs)"
                        }}
                      >
                        {t.view}
                      </a>
                      {entry.status !== 'published' && (
                        <a
                          href={`/entries/${entry.id}/edit`}
                          style={{
                            padding: "6px 12px",
                            backgroundColor: "transparent",
                            border: "1px solid var(--color-border)",
                            borderRadius: "4px",
                            color: "var(--color-text-secondary)",
                            textDecoration: "none",
                            fontSize: "var(--text-xs)"
                          }}
                        >
                          {t.edit}
                        </a>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div style={{ marginTop: "40px" }}>
        <BackToArchiveLink />
      </div>
    </div>
  );
}
