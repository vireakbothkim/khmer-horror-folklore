"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../lib/supabase-client";

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        const supabase = createClient();
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error("Error getting session:", error);
          router.push("/login");
          return;
        }

        if (session) {
          // Successfully authenticated, redirect to home
          router.push("/");
          router.refresh();
        } else {
          // No session, redirect to login
          router.push("/login");
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        router.push("/login");
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#14181F",
        color: "#E8EDF2",
        fontFamily:
          "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      }}
    >
      <div
        style={{
          textAlign: "center",
          padding: "40px",
          backgroundColor: "#1C222C",
          border: "1px solid #2E3644",
          borderRadius: "10px",
        }}
      >
        <h2
          style={{
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "16px",
          }}
        >
          Verifying your email...
        </h2>
        <p style={{ color: "#97A1B3" }}>
          Please wait while we confirm your email address.
        </p>
      </div>
    </div>
  );
}