"use client";

import { useEffect, useState } from "react";
import { createClient } from "./supabase-client";

// Tracks the signed-in user and reviewer status for the whole site.
// Re-checks on every auth change, so the header updates after login or logout.
export function useCurrentUser() {
  const [user, setUser] = useState(null);
  const [isReviewer, setIsReviewer] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    const loadUser = async () => {
      try {
        const { data: { user: currentUser }, error } = await supabase.auth.getUser();

        // A missing session is normal when logged out, so it isn't logged as an error
        if (error || !currentUser) {
          setUser(null);
          setIsReviewer(false);
          return;
        }

        setUser(currentUser);
        const { data, error: reviewerError } = await supabase.rpc("is_reviewer");
        if (reviewerError) {
          console.error("Error checking reviewer status:", reviewerError);
        }
        setIsReviewer(!reviewerError && data === true);
      } catch (err) {
        console.error("Error fetching user:", err);
        setUser(null);
        setIsReviewer(false);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      loadUser();
    });

    return () => subscription.unsubscribe();
  }, []);

  return { user, isReviewer, loading };
}
