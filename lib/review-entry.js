import { createClient } from "./supabase-client.js";

// Calls the review_entry database function. Returns true only when the
// review was saved. Errors are logged here and reported as false.
export async function reviewEntry(entryId, decision, notes = null) {
  try {
    const supabase = createClient();
    const { data, error } = await supabase.rpc("review_entry", {
      entry_id: entryId,
      decision: decision,
      notes: notes
    });

    if (error) {
      console.error(`Error reviewing entry ${entryId}:`, error);
      return false;
    }
    if (data !== true) {
      console.error(`Review function returned false for entry ${entryId}`);
      return false;
    }
    return true;
  } catch (err) {
    console.error(`Exception reviewing entry ${entryId}:`, err);
    return false;
  }
}
