import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase-server.js";
import ReviewList from "../../components/ReviewList.js";

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
    const { data, error } = await supabase.rpc('is_reviewer');
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
      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", textAlign: "center" }}>
        <div style={{ 
          marginBottom: "32px",
          padding: "24px",
          backgroundColor: "transparent",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          color: "var(--color-text-primary)"
        }}>
          <p style={{ marginBottom: "16px", fontSize: "var(--text-base)" }}>
            This page is for reviewers only.
          </p>
        </div>
        <a
          href="/"
          style={{
            padding: "10px 20px",
            backgroundColor: "transparent",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            color: "var(--color-text-secondary)",
            textDecoration: "none",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            display: "inline-block"
          }}
        >
          Back to Archive
        </a>
      </div>
    );
  }

  // 3. Fetch pending entries
  let entries = [];
  let errorMessage = null;
  
  try {
    const { data, error } = await supabase
      .from('entries')
      .select('id, title_en, title_km, appearance_en, appearance_km, story_en, story_km, source_en, source_km, place_en, place_km, media, contributor, created_at')
      .eq('status', 'pending')
      .order('created_at', { ascending: true });

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
      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", textAlign: "center" }}>
        <div style={{ 
          marginBottom: "32px",
          padding: "24px",
          backgroundColor: "transparent",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          color: "var(--color-text-primary)"
        }}>
          <p style={{ marginBottom: "8px", fontSize: "var(--text-base)" }}>
            Couldn't load the queue. Please reload the page.
          </p>
        </div>
        <a
          href="/"
          style={{
            padding: "10px 20px",
            backgroundColor: "transparent",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            color: "var(--color-text-secondary)",
            textDecoration: "none",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            display: "inline-block"
          }}
        >
          Back to Archive
        </a>
      </div>
    );
  }

  // 5. Empty queue message
  if (entries.length === 0) {
    return (
      <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px", textAlign: "center" }}>
        <div style={{ 
          marginBottom: "32px",
          padding: "24px",
          backgroundColor: "transparent",
          border: "1px solid var(--color-border)",
          borderRadius: "var(--radius-md)",
          color: "var(--color-text-primary)"
        }}>
          <p style={{ marginBottom: "8px", fontSize: "var(--text-base)" }}>
            Nothing is waiting for review.
          </p>
        </div>
        <a
          href="/"
          style={{
            padding: "10px 20px",
            backgroundColor: "transparent",
            border: "1px solid var(--color-border)",
            borderRadius: "var(--radius-md)",
            color: "var(--color-text-secondary)",
            textDecoration: "none",
            fontFamily: "var(--font-mono)",
            fontSize: "var(--text-sm)",
            display: "inline-block"
          }}
        >
          Back to Archive
        </a>
      </div>
    );
  }

  // 4. Pass entries to ReviewList component
  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "20px" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ 
          fontFamily: "var(--font-display)", 
          fontSize: "var(--text-3xl)",
          fontWeight: 700,
          marginBottom: "8px"
        }}>
          Review Queue
        </h1>
        <p style={{ 
          color: "var(--color-text-secondary)",
          fontSize: "var(--text-sm)",
          fontFamily: "var(--font-mono)",
          marginTop: "16px"
        }}>
          {entries.length} {entries.length === 1 ? 'entry' : 'entries'} waiting for review
        </p>
      </div>

      <ReviewList entries={entries} />
    </div>
  );
}