"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-client";
import collection from "../../collection.config.js";
import styles from "../auth.module.css";

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
  const collectionName = lang === "kh" ? collection.name_km : collection.name;

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
    <div className={styles.wrap}>
      <div className={styles.headerRow}>
        <div>
          <p className={styles.kicker}>{t.kicker}</p>
          <h1 className={styles.title}>{collectionName}</h1>
        </div>
        <button
          onClick={() => setLang(lang === "en" ? "kh" : "en")}
          className={styles.languageToggle}
        >
          {t.languageToggle}
        </button>
      </div>

      <div>
        <h2 className={styles.title} style={{ fontSize: "var(--text-3xl)", marginBottom: "var(--space-xl)" }}>
          {t.title}
        </h2>

        {error && (
          <div className={error.includes("Invalid") ? styles.errorMessage : styles.successMessage}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className={styles.form}>
          <div className={styles.formGroup}>
            <label className={styles.label}>
              {t.emailLabel}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className={styles.input}
              placeholder="you@example.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              {t.passwordLabel}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={styles.input}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={styles.submitButton}
          >
            {loading ? "LOGGING IN..." : t.loginButton}
          </button>
        </form>

        <div className={styles.linkContainer}>
          <a
            href="/signup"
            className={styles.link}
          >
            {t.signupLink}
          </a>
        </div>
      </div>

      <footer className={styles.footer}>
        {t.footer}
      </footer>
    </div>
  );
}