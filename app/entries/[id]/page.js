"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "../../../lib/supabase-client";
import EntryCard from "../../../components/EntryCard";
import collection from "../../../collection.config.js";
import StatusBox from "../../../components/StatusBox";
import { useLanguage } from "../../../components/LanguageProvider";

export default function EntryPage() {
  const router = useRouter();
  const [entry, setEntry] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();
  const [error, setError] = useState("");
  
  const params = useParams();
  const entryId = params?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        
        // Fetch user
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        // Fetch entry
        const { data, error } = await supabase
          .from('entries')
          .select('id, owner, status, created_at, contributor, media, title_en, title_km, appearance_en, appearance_km, story_en, story_km, source_en, source_km, place_en, place_km')
          .eq('id', entryId)
          .single();
        
        if (error) {
          console.error("Error fetching entry:", error);
          setError("Entry not found");
        } else {
          setEntry(data);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load entry");
      } finally {
        setLoading(false);
      }
    };
    
    if (entryId) {
      fetchData();
    }
  }, [entryId]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this entry? This action cannot be undone.")) {
      return;
    }
    
    try {
      const supabase = createClient();
      
      // Delete the entry
      const { error: deleteError } = await supabase
        .from('entries')
        .delete()
        .eq('id', entryId);
      
      if (deleteError) {
        console.error("Delete error:", deleteError);
        alert("Failed to delete entry. Please try again.");
        return;
      }
      
      // Verify deletion
      const { data: verifyData, error: verifyError } = await supabase
        .from('entries')
        .select('id')
        .eq('id', entryId);
      
      if (verifyError) {
        console.error("Verify error:", verifyError);
      }
      
      if (!verifyData || verifyData.length === 0) {
        // Successfully deleted
        alert("Entry deleted successfully!");
        router.push("/");
      } else {
        // Entry still exists - deletion failed
        console.error("Delete verification failed: entry still exists");
        alert("That change wasn't saved. Please try again.");
      }
    } catch (err) {
      console.error("Error during delete:", err);
      alert("An unexpected error occurred. Please try again.");
    }
  };

  const isOwner = user && entry && user.id === entry.owner;

  // Transform entry data based on selected language
  const transformedEntry = entry ? (lang === "en" ? {
    id: entry.id,
    title: entry.title_en,
    khmerName: entry.title_km,
    appearance: entry.appearance_en,
    story: entry.story_en,
    source: entry.source_en,
    place: entry.place_en,
    contributor: entry.contributor,
    media: entry.media
  } : {
    id: entry.id,
    title: entry.title_km,
    khmerName: entry.title_en,
    appearance: entry.appearance_km,
    story: entry.story_km,
    source: entry.source_km,
    place: entry.place_km,
    contributor: entry.contributor,
    media: entry.media
  }) : null;

  if (loading) {
    return (
      <main className="mx-auto max-w-[800px] px-5 pb-10">
        <StatusBox>Loading entry...</StatusBox>
      </main>
    );
  }

  if (error || !entry) {
    return (
      <main className="mx-auto max-w-[800px] px-5 pb-10">
        <StatusBox>
          <h1 className="mb-5 text-2xl">Entry Not Found</h1>
          <p className="mb-5">{error || "The entry you're looking for doesn't exist."}</p>
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer rounded bg-accent px-5 py-2.5 text-text-primary hover:bg-accent-hover"
          >
            Back to Archive
          </button>
        </StatusBox>
      </main>
    );
  }

  return (
    <div style={{
      maxWidth: "800px",
      margin: "0 auto",
      padding: "40px 20px",
      color: "#FFFFFF",
      fontFamily: "var(--font-sans)"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "40px"
      }}>
        <h1 style={{
          fontSize: "24px",
          margin: 0,
          fontWeight: "normal"
        }}>
          {collection.name}
        </h1>
        
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <button
            onClick={() => router.push("/")}
            onMouseEnter={(e) => {
              // hover effect
              e.currentTarget.style.backgroundColor = "#9B2232";
              e.currentTarget.style.borderColor = "#9B2232";
              e.currentTarget.style.color = "#EDE6D9";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.borderColor = "#2E3644";
              e.currentTarget.style.color = "#97A1B3";
            }}
            style={{
              padding: "12px 8px",
              backgroundColor: "transparent",
              border: "1px solid #2E3644",
              borderRadius: "4px",
              color: "#97A1B3",
              cursor: "pointer",
              fontFamily: "var(--font-sans)",
              fontSize: "12px"
            }}
          >
            Back to Archive
          </button>
        </div>
      </div>
      
      {/* Owner actions */}
      {isOwner && (
        <div style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #2E3644",
          borderRadius: "4px",
          backgroundColor: "#14181F"
        }}>
          <h2 style={{
            fontSize: "14px",
            margin: "0 0 15px 0",
            color: "#97A1B3",
            textTransform: "uppercase"
          }}>
            Entry Management
          </h2>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              onClick={() => router.push(`/entries/${entryId}/edit`)}
              style={{
                padding: "10px 20px",
                backgroundColor: "#2E3644",
                border: "none",
                borderRadius: "4px",
                color: "#FFFFFF",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontSize: "12px"
              }}
            >
              Edit Entry
            </button>
            <button
              onClick={handleDelete}
              style={{
                padding: "10px 20px",
                backgroundColor: "#972514",
                border: "none",
                borderRadius: "4px",
                color: "#FFFFFF",
                cursor: "pointer",
                fontFamily: "var(--font-sans)",
                fontSize: "12px"
              }}
            >
              Delete Entry
            </button>
          </div>
        </div>
      )}
      
      {/* Pending notice for owner */}
      {isOwner && entry.status === 'pending' && (
        <div style={{
          marginBottom: "30px",
          padding: "16px 20px",
          border: "1px solid #2E3644",
          borderRadius: "4px",
          backgroundColor: "#14181F",
          color: "#97A1B3",
          fontSize: "12px"
        }}>
          This entry is waiting for review. It will go live once a reviewer approves it.
        </div>
      )}

      {/* Entry display */}
      {transformedEntry && <EntryCard entry={transformedEntry} lang={lang} />}
      
      <div style={{
        marginTop: "40px",
        paddingTop: "20px",
        borderTop: "1px solid #2E3644",
        color: "#5A6373",
        fontSize: "12px"
      }}>
        <p>Entry ID: {entry.id}</p>
        {entry.owner && <p>Owner ID: {entry.owner}</p>}
        {entry.created_at && <p>Created: {new Date(entry.created_at).toLocaleDateString()}</p>}
      </div>
    </div>
  );
}