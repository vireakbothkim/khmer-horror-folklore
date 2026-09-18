import { createClient } from "./supabase-server";

// Utility function to get current user from server
export async function getCurrentUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error) {
    console.error("Error getting current user:", error);
    return null;
  }
  
  return user;
}

// Utility function to get session from server
export async function getSession() {
  const supabase = await createClient();
  const { data: { session }, error } = await supabase.auth.getSession();
  
  if (error) {
    console.error("Error getting session:", error);
    return null;
  }
  
  return session;
}

// Utility function to sign out
export async function signOut() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  
  if (error) {
    console.error("Error signing out:", error);
    return { error: error.message };
  }
  
  return { success: true };
}