"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "../../../lib/supabase-client";
import EntryCard from "../../../components/EntryCard";
import StatusBox from "../../../components/StatusBox";
import OwnerActions from "../../../components/OwnerActions";
import ReturnNoteNotice from "../../../components/ReturnNoteNotice";
import BackToArchiveLink from "../../../components/BackToArchiveLink";
import Spinner from "../../../components/Spinner";
import { useLanguage } from "../../../components/LanguageProvider";

export default function EntryPage() {
  const router = useRouter();
  const [entry, setEntry] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { lang } = useLanguage();
  const [error, setError] = useState("");
  const [returnNote, setReturnNote] = useState(null);
  
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
          // Notes are not readable directly; the owner-only function returns them.
          if (user && data.owner === user.id && data.status === 'returned') {
            const { data: noteRows, error: noteError } = await supabase.rpc('get_return_notes', { entry_id: entryId });
            if (noteError) {
              console.error("Error loading return notes:", noteError);
            } else if (noteRows?.[0]) {
              setReturnNote(noteRows[0]);
            }
          }
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
    appearance: entry.appearance_en,
    story: entry.story_en,
    source: entry.source_en,
    place: entry.place_en,
    contributor: entry.contributor,
    media: entry.media
  } : {
    id: entry.id,
    title: entry.title_km,
    appearance: entry.appearance_km,
    story: entry.story_km,
    source: entry.source_km,
    place: entry.place_km,
    contributor: entry.contributor,
    media: entry.media
  }) : null;

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-[1280px] px-[var(--content-padding)] pb-10">
        <StatusBox><Spinner label="Loading entry..." /></StatusBox>
      </main>
    );
  }

  if (error || !entry) {
    return (
      <main className="mx-auto w-full max-w-[1280px] px-[var(--content-padding)] pb-10">
        <StatusBox>
          <h1 className="mb-5 text-2xl">Entry Not Found</h1>
          <p className="mb-5">{error || "The entry you're looking for doesn't exist."}</p>
          <BackToArchiveLink />
        </StatusBox>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-[1280px] px-[var(--content-padding)] pb-0">
      <div className="mb-8">
        <BackToArchiveLink />
      </div>
      {/* Owner actions */}
      {isOwner && (
        <OwnerActions
          onEdit={() => router.push(`/entries/${entryId}/edit`)}
          onDelete={handleDelete}
          lang={lang}
        />
      )}
      
      {/* Pending notice for owner */}
      {isOwner && entry.status === 'pending' && (
        <div className="mb-8 rounded-md border border-[rgb(234,179,8)] bg-[rgba(234,179,8,0.1)] p-5 text-base leading-relaxed text-text-primary">
          This entry is waiting for review. It will go live once a reviewer approves it.
        </div>
      )}

      {/* Reviewer's note for owner */}
      {isOwner && entry.status === 'returned' && returnNote && (
        <ReturnNoteNotice note={returnNote.return_notes} returnedAt={returnNote.returned_at} />
      )}

      {/* Entry display */}
      {transformedEntry && <EntryCard entry={transformedEntry} lang={lang} />}
      
    </main>
  );
}