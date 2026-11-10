"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-client";
import { toAuthCredentials } from "../../lib/parse-identifier";
import { isValidUsername } from "../../lib/validate-username";
import styles from "../auth.module.css";
import { useLanguage } from "../../components/LanguageProvider";
import AuthShell from "../../components/AuthShell";
import AuthField from "../../components/AuthField";
import AuthSubmitButton from "../../components/AuthSubmitButton";

export default function SignupPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { lang } = useLanguage();

  const uiText = {
    en: {
      kicker: "JOIN THE ARCHIVE",
      heading: "Become a keeper.",
      intro: "Create an account to contribute your own stories and keep your entries in one place.",
      identifierLabel: "EMAIL OR PHONE",
      identifierPlaceholder: "you@example.com or 012 345 678",
      usernameLabel: "USERNAME",
      usernameHelper: "3-30 characters: lowercase letters, numbers, and _ only",
      invalidUsername: "Username must be 3-30 characters: lowercase letters, numbers, and _ only",
      passwordLabel: "PASSWORD",
      passwordHelper: "Must be at least 8 characters",
      passwordTooShort: "Password must be at least 8 characters",
      signupFailed: "Couldn't create your account. Please check your details and try again.",
      confirmPasswordLabel: "CONFIRM PASSWORD",
      signupButton: "SIGN UP",
      creatingAccount: "CREATING ACCOUNT...",
      loginPrompt: "Already among us?",
      loginLink: "Log in",
      passwordMismatch: "Passwords do not match",
      invalidIdentifier: "Enter a valid email or phone number",
      signupSuccess: "Account created! Redirecting to login...",
      quote: "Every story begins with someone willing to tell it.",
    },
    kh: {
      kicker: "ចូលរួមក្នុងបណ្ណសារ",
      heading: "ក្លាយជាអ្នករក្សា។",
      intro: "បង្កើតគណនីដើម្បីចូលរួមចែករំលែករឿងរបស់អ្នក និងរក្សាធាតុរបស់អ្នកនៅកន្លែងតែមួយ។",
      identifierLabel: "អ៊ីមែល ឬលេខទូរសព្ទ",
      identifierPlaceholder: "you@example.com ឬ 012 345 678",
      usernameLabel: "ឈ្មោះអ្នកប្រើ",
      usernameHelper: "3-30 តួអក្សរ៖ អក្សរតូចអង់គ្លេស លេខ និង _ ប៉ុណ្ណោះ",
      invalidUsername: "ឈ្មោះអ្នកប្រើត្រូវមាន 3-30 តួអក្សរ៖ អក្សរតូចអង់គ្លេស លេខ និង _ ប៉ុណ្ណោះ",
      passwordLabel: "ពាក្យសម្ងាត់",
      passwordHelper: "ត្រូវមានយ៉ាងតិច 8 តួអក្សរ",
      passwordTooShort: "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងតិច 8 តួអក្សរ",
      signupFailed: "មិនអាចបង្កើតគណនីបានទេ។ សូមពិនិត្យព័ត៌មានរបស់អ្នកឡើងវិញ ហើយព្យាយាមម្តងទៀត។",
      confirmPasswordLabel: "បញ្ជាក់ពាក្យសម្ងាត់",
      signupButton: "ចុះឈ្មោះ",
      creatingAccount: "កំពុងបង្កើតគណនី...",
      loginPrompt: "មានគណនីរួចហើយ?",
      loginLink: "ចូល",
      passwordMismatch: "ពាក្យសម្ងាត់មិនត្រូវគ្នា",
      invalidIdentifier: "សូមបញ្ចូលអ៊ីមែល ឬលេខទូរសព្ទឲ្យបានត្រឹមត្រូវ",
      signupSuccess: "បានបង្កើតគណនីហើយ! កំពុងបញ្ជូនទៅការចូល...",
      quote: "រឿងគ្រប់រឿងចាប់ផ្តើមពីនរណាម្នាក់ដែលចង់ប្រាប់វា។",
    },
  };

  const t = uiText[lang];
  const isKhmer = lang === "kh";

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    // Trim and validate username
    const trimmedUsername = username.trim();
    if (!isValidUsername(trimmedUsername)) {
      setError(t.invalidUsername);
      return;
    }

    if (password !== confirmPassword) {
      setError(t.passwordMismatch);
      return;
    }

    if (password.length < 8) {
      setError(t.passwordTooShort);
      return;
    }

    const credentials = toAuthCredentials(identifier);
    if (!credentials) {
      setError(t.invalidIdentifier);
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signUp({
        email: credentials.email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            username: trimmedUsername,
            phone: credentials.phone,
          },
        },
      });

      if (error) {
        console.error("Signup error:", error);
        setError(t.signupFailed);
      } else {
        setError(t.signupSuccess);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Signup exception:", err);
      setError(t.signupFailed);
    } finally {
      setLoading(false);
    }
  };

  const isSuccess = error === t.signupSuccess;

  return (
    <AuthShell quote={t.quote} lang={isKhmer ? "km" : "en"}>
      <p className={styles.kicker}>{t.kicker}</p>
      <h1 className={styles.heading} lang={isKhmer ? "km" : "en"}>
        {t.heading}
      </h1>
      <p className="mb-12 text-base leading-relaxed text-text-secondary" lang={isKhmer ? "km" : "en"}>
        {t.intro}
      </p>

      {error && <div className={isSuccess ? styles.successMessage : styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSignup}>
        <AuthField
          id="identifier"
          label={t.identifierLabel}
          type="text"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder={t.identifierPlaceholder}
          required
        />
        <AuthField
          id="username"
          label={t.usernameLabel}
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="yourusername"
          helperText={t.usernameHelper}
          required
        />
        <AuthField
          id="password"
          label={t.passwordLabel}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
          helperText={t.passwordHelper}
          required
        />
        <AuthField
          id="confirmPassword"
          label={t.confirmPasswordLabel}
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
        <AuthSubmitButton label={loading ? t.creatingAccount : t.signupButton} disabled={loading} />
      </form>

      <p className="mt-10 text-sm text-text-secondary" lang={isKhmer ? "km" : "en"}>
        {t.loginPrompt}{" "}
        <a href="/login" className={styles.inlineLink}>
          {t.loginLink}
        </a>
      </p>
    </AuthShell>
  );
}
