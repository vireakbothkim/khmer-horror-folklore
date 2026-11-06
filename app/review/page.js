import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase-server.js";
import ReviewList from "../../components/ReviewList.js";
import BackToArchiveLink from "../../components/BackToArchiveLink";
import StatusBox from "../../components/StatusBox";

export const dynamic = "force-dynamic";

export default async function ReviewPage() {
  const supabase = await createClient();

  // 1. Check authentication
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/login");
  }

  // 2. Check reviewer status
  let isReviewer = false;
  try {
    const { data, error } = await supabase.rpc("is_reviewer");
    if (error) {
      console.error("Error checking reviewer status:", error);
    } else {
      isReviewer = data === true;
    }
  } catch (err) {
    console.error("Exception checking reviewer status:", err);
  }

  // If not reviewer, show access denied message
  if (!isReviewer) {
    return (
      <main className="mx-auto max-w-[800px] px-5 pb-10">
        <StatusBox>
          <p className="mb-0">This page is for reviewers only.</p>
        </StatusBox>
        <div className="mt-8">
          <BackToArchiveLink />
        </div>
      </main>
    );
  }

  // 3. Fetch pending entries
  let entries = [];
  let errorMessage = null;

  try {
    const { data, error } = await supabase
      .from("entries")
      .select("id, title_en, title_km, appearance_en, appearance_km, story_en, story_km, source_en, source_km, place_en, place_km, media, contributor, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    if (error) {
      console.error("Error fetching pending entries:", error);
      errorMessage = "Couldn't load the queue. Please reload the page.";
    } else {
      entries = data || [];
    }
  } catch (err) {
    console.error("Exception fetching pending entries:", err);
    errorMessage = "Couldn't load the queue. Please reload the page.";
  }

  // If there's an error fetching entries
  if (errorMessage) {
    return (
      <main className="mx-auto max-w-[800px] px-5 pb-10">
        <StatusBox>
          <p className="mb-0">{errorMessage}</p>
        </StatusBox>
        <div className="mt-8">
          <BackToArchiveLink />
        </div>
      </main>
    );
  }

  // 4. Empty queue message
  if (entries.length === 0) {
    return (
      <main className="mx-auto max-w-[800px] px-5 pb-10">
        <StatusBox>
          <p className="mb-0">Nothing is waiting for review.</p>
        </StatusBox>
        <div className="mt-8">
          <BackToArchiveLink />
        </div>
      </main>
    );
  }

  // 5. Pass entries to ReviewList component
  return (
    <main className="mx-auto max-w-[1280px] px-6 pb-16 pt-10">
      <div className="mb-8">
        <BackToArchiveLink />
      </div>
      <header className="border-b border-border pb-8">
        <p className="mb-2 font-mono text-xs font-bold uppercase tracking-[2px] text-accent-text [font-variant-caps:small-caps]">
          REVIEWER DASHBOARD
        </p>
        <h1 className="m-0 font-display text-4xl font-bold leading-tight text-text-primary sm:text-5xl">
          Review Queue
        </h1>
      </header>

      <ReviewList entries={entries} />
    </main>
  );
}
