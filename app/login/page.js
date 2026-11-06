"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-client";
import { toAuthCredentials } from "../../lib/parse-identifier";
import styles from "../auth.module.css";
import { useLanguage } from "../../components/LanguageProvider";
import AuthShell from "../../components/AuthShell";
import AuthField from "../../components/AuthField";
import AuthSubmitButton from "../../components/AuthSubmitButton";

export default function LoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { lang } = useLanguage();

  const uiText = {
    en: {
      kicker: "RESTRICTED ACCESS",
      heading: "Enter the archive.",
      intro: "Sign in to submit new findings and keep track of the records that haunt you.",
      identifierLabel: "EMAIL OR PHONE",
      identifierPlaceholder: "you@example.com or 012 345 678",
      passwordLabel: "PASSWORD",
      passwordPlaceholder: "Your password",
      loginButton: "LOG IN",
      loggingIn: "LOGGING IN...",
      signupPrompt: "Not yet among us?",
      signupLink: "Create an account",
      quote: "Some doors only open for those who know where to look.",
    },
    kh: {
      kicker: "ការចូលប្រើប្រាស់មានកម្រិត",
      heading: "ចូលទៅក្នុងបណ្ណសារ។",
      intro: "ចូលគណនីដើម្បីដាក់បញ្ចូលការរកឃើញថ្មី និងតាមដានការរកឃើញដែលលងព្រលងអ្នក។",
      identifierLabel: "អ៊ីមែល ឬលេខទូរសព្ទ",
      identifierPlaceholder: "you@example.com ឬ 012 345 678",
      passwordLabel: "ពាក្យសម្ងាត់",
      passwordPlaceholder: "ពាក្យសម្ងាត់របស់អ្នក",
      loginButton: "ចូល",
      loggingIn: "កំពុងចូល...",
      signupPrompt: "មិនទាន់មានគណនីទេ?",
      signupLink: "បង្កើតគណនី",
      quote: "មានទ្វារមួយចំនួនដែលបើកតែសម្រាប់អ្នកដែលដឹងថាត្រូវមើលទីណា។",
    },
  };

  const t = uiText[lang];

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const supabase = createClient();
      const credentials = toAuthCredentials(identifier);
      if (!credentials) {
        setError("Invalid email or phone number");
        return;
      }

      const { error } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password,
      });

      if (error) {
        setError("Invalid email or phone number");
      } else {
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Invalid email or phone number");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthShell quote={t.quote} lang={lang === "kh" ? "km" : "en"}>
      <p className={styles.kicker}>{t.kicker}</p>
      <h1 className={styles.heading} lang={lang === "kh" ? "km" : "en"}>
        {t.heading}
      </h1>
      <p className="mb-12 text-base leading-relaxed text-text-secondary" lang={lang === "kh" ? "km" : "en"}>
        {t.intro}
      </p>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleLogin}>
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
          id="password"
          label={t.passwordLabel}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder={t.passwordPlaceholder}
          required
        />
        <AuthSubmitButton label={loading ? t.loggingIn : t.loginButton} disabled={loading} />
      </form>

      <p className="mt-10 text-sm text-text-secondary" lang={lang === "kh" ? "km" : "en"}>
        {t.signupPrompt}{" "}
        <a href="/signup" className={styles.inlineLink}>
          {t.signupLink}
        </a>
      </p>
    </AuthShell>
  );
}
