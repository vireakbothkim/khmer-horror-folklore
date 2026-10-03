"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-client";
import collection from "../../collection.config.js";
import styles from "../auth.module.css";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [lang, setLang] = useState("en");

  const uiText = {
    en: {
      kicker: "KHMER LIVING ARCHIVE",
      title: "Sign Up",
      emailLabel: "EMAIL",
      passwordLabel: "PASSWORD",
      confirmPasswordLabel: "CONFIRM PASSWORD",
      signupButton: "SIGN UP",
      loginLink: "Already have an account? Log in",
      footer: "Built in ICT 340 — Vibe Coding, American University of Phnom Penh, Fall 2026.",
      languageToggle: "ភាសាខ្មែរ",
      passwordMismatch: "Passwords do not match",
      signupSuccess: "Account created! Redirecting to login...",
    },
    kh: {
      kicker: "បណ្ណសាររស់របស់ខ្មែរ",
      title: "ចុះឈ្មោះ",
      emailLabel: "អ៊ីមែល",
      passwordLabel: "ពាក្យសម្ងាត់",
      confirmPasswordLabel: "បញ្ជាក់ពាក្យសម្ងាត់",
      signupButton: "ចុះឈ្មោះ",
      loginLink: "មានគណនីរួចហើយ? ចូល",
      footer: "បង្កើតឡើងសម្រាប់មុខវិជ្ជា ICT 340 — Vibe Coding នៅសាកលវិទ្យាល័យអាមេរិកាំងភ្នំពេញ (AUPP) សម្រាប់ឆមាសទី ២ ឆ្នាំ ២០២៦។",
      languageToggle: "English",
      passwordMismatch: "ពាក្យសម្ងាត់មិនត្រូវគ្នា",
      signupSuccess: "បានបង្កើតគណនីហើយ! កំពុងបញ្ជូនទៅការចូល...",
    },
  };

  const t = uiText[lang];
  const collectionName = lang === "kh" ? collection.name_km : collection.name;

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");
    
    if (password !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }
    
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setError("Could not create account. Please try again.");
      } else {
        setError(t.signupSuccess);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      setError("Could not create account. Please try again.");
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
          <div className={error.includes("Invalid") || error.includes("Could not") || error === t.passwordMismatch ? styles.errorMessage : styles.successMessage}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} className={styles.form}>
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
            <p className={styles.helperText}>
              Must be at least 6 characters
            </p>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>
              {t.confirmPasswordLabel}
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
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
            {loading ? "CREATING ACCOUNT..." : t.signupButton}
          </button>
        </form>

        <div className={styles.linkContainer}>
          <a
            href="/login"
            className={styles.link}
          >
            {t.loginLink}
          </a>
        </div>
      </div>

      <footer className={styles.footer}>
        {t.footer}
      </footer>
    </div>
  );
}