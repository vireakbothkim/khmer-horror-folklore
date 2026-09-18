"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-client";
import collection from "../../collection.config.js";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("en");

  const uiText = {
    en: {
      kicker: "KHMER LIVING ARCHIVE",
      title: "Log In",
      emailLabel: "EMAIL",
      passwordLabel: "PASSWORD",
      loginButton: "LOG IN",
      signupLink: "Don't have an account? Sign up",
      footer: "Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall 2026.",
      languageToggle: "ភាសាខ្មែរ",
    },
    kh: {
      kicker: "បណ្ណសាររស់របស់ខ្មែរ",
      title: "ចូលគណនី",
      emailLabel: "អ៊ីមែល",
      passwordLabel: "ពាក្យសម្ងាត់",
      loginButton: "ចូល",
      signupLink: "មិនទាន់មានគណនីទេ? ចុះឈ្មោះ",
      footer: "បង្កើតឡើងសម្រាប់មុខវិជ្ជា ICT 340 — Vibe Coding នៅសាកលវិទ្យាល័យអាមេរិកាំងភ្នំពេញ (AUPP) សម្រាប់ឆមាសទី ២ ឆ្នាំ ២០២៦។",
      languageToggle: "English",
    },
  };

  const t = uiText[lang];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError("Invalid email or password");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
return (
    <div style={{
      maxWidth: "720px",
      margin: "0 auto",
      padding: "80px 24px",
      backgroundColor: "#14181F",
      color: "#E8EDF2",
      minHeight: "100vh",
      fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        marginBottom: "16px",
      }}>
        <div>
          <p style={{
            fontFamily: "'Courier New', monospace",
            color: "#972514",
            fontSize: "14px",
            letterSpacing: "1px",
            margin: "0",
          }}>
            {t.kicker}
          </p>
          <h1 style={{
            fontSize: "48px",
            fontWeight: "700",
            margin: "16px 0 12px",
            lineHeight: "1.1",
          }}>
            {lang === "kh" ? collection.name_km : collection.name}
          </h1>
          <p style={{
            fontSize: "18px",
            color: "#97A1B3",
            lineHeight: "1.6",
            margin: "0",
          }}>
            {lang === "kh" ? collection.description_km : collection.description}
          </p>
        </div>
        <button
          onClick={() => setLang(lang === "en" ? "kh" : "en")}
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "12px",
            color: "#97A1B3",
            background: "none",
            border: "1px solid #2E3644",
            borderRadius: "4px",
            padding: "4px 8px",
            cursor: "pointer",
            marginTop: "4px",
          }}
        >
          {t.languageToggle}
        </button>
      </div>

      <div style={{
        marginTop: "48px",
        padding: "24px",
        backgroundColor: "#1C222C",
        border: "1px solid #2E3644",
        borderRadius: "10px",
      }}>
        <h2 style={{
          fontSize: "32px",
          fontWeight: "600",
          margin: "0 0 24px 0",
        }}>
          {t.title}
        </h2>

        {error && (
          <div style={{
            padding: "12px",
            backgroundColor: "#2E1C1C",
            border: "1px solid #972514",
            borderRadius: "8px",
            color: "#E8EDF2",
            marginBottom: "20px",
            fontSize: "14px",
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "24px" }}>
            <label style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "12px",
              color: "#97A1B3",
              display: "block",
              marginBottom: "8px",
            }}>
              {t.emailLabel}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: "12px 16px",
                fontSize: "16px",
                backgroundColor: "#14181F",
                border: "1px solid #2E3644",
                borderRadius: "8px",
                color: "#FFFFFF",
                width: "100%",
                boxSizing: "border-box",
              }}
              placeholder="you@example.com"
            />
          </div>

          <div style={{ marginBottom: "32px" }}>
            <label style={{
              fontFamily: "'Courier New', monospace",
              fontSize: "12px",
              color: "#97A1B3",
              display: "block",
              marginBottom: "8px",
            }}>
              {t.passwordLabel}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                padding: "12px 16px",
                fontSize: "16px",
                backgroundColor: "#14181F",
                border: "1px solid #2E3644",
                borderRadius: "8px",
                color: "#FFFFFF",
                width: "100%",
                boxSizing: "border-box",
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px 24px",
              fontSize: "16px",
              fontWeight: "600",
              backgroundColor: "#972514",
              color: "#FFFFFF",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              width: "100%",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "LOGGING IN..." : t.loginButton}
          </button>
        </form>

        <div style={{ marginTop: "24px", textAlign: "center" }}>
          <a
            href="/signup"
            style={{
              color: "#97A1B3",
              textDecoration: "none",
              fontSize: "14px",
            }}
          >
            {t.signupLink}
          </a>
        </div>
      </div>

      <footer style={{
        marginTop: "64px",
        paddingTop: "24px",
        borderTop: "1px solid #2E3644",
        fontSize: "13px",
        color: "#5A6373",
      }}>
        {t.footer}
      </footer>
    </div>
  );
}