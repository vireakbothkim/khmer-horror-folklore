"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-client";
import StatusBox from "../../components/StatusBox";
import Spinner from "../../components/Spinner";
import EntryFieldCards from "../../components/EntryFieldCards";
import PhotoField from "../../components/PhotoField";
import AuthSubmitButton from "../../components/AuthSubmitButton";
import BackToArchiveLink from "../../components/BackToArchiveLink";
import styles from "../auth.module.css";
import { useLanguage } from "../../components/LanguageProvider";



export default function ContributePage() {
  const router = useRouter();
  const { lang } = useLanguage();

  const uiText = {
    en: {
      kicker: "CONTRIBUTE",
      heading: "Contribute an Entry.",
      intro: "You must be logged in to contribute.",
      logIn: "Log In",
      signUp: "Sign Up",
      note: "Fields marked * are required. Your entry appears in the archive once it has been reviewed and published.",
      photo: "Photo",
      photoHint: "Optional. JPG, PNG, or WebP. Max 5MB.",
      submit: "Submit Entry",
      submitting: "Submitting...",
      cancel: "Cancel",
    },
    kh: {
      kicker: "ការរួមចំណែក",
      heading: "ដាក់បញ្ចូលធាតុថ្មី។",
      intro: "ត្រូវចូលគណនីជាមុនសិន ដើម្បីដាក់បញ្ចូលធាតុថ្មីក្នុងបណ្ណសារ។",
      logIn: "ចូល",
      signUp: "បង្កើតគណនី",
      note: "សូមចំណាំ៖ ប្រអប់ដែលមានសញ្ញា * ត្រូវតែបំពេញ។ ធាតុរបស់អ្នកនឹងបង្ហាញក្នុងបណ្ណសារ បន្ទាប់ពីត្រូវបានពិនិត្យ និងផ្សព្វផ្សាយ។",
      photo: "រូបថត",
      photoHint: "ស្រេចតាមចិត្ត។ JPG, PNG, ឬ WebP។ ទំហំអតិបរមា 5MB។",
      submit: "ដាក់ស្នើធាតុ",
      submitting: "កំពុងដាក់ស្នើ...",
      cancel: "បោះបង់",
    },
  };
  const t = uiText[lang];
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title_en: "",
    title_km: "",
    appearance_en: "",
    appearance_km: "",
    story_en: "",
    story_km: "",
    source_en: "",
    source_km: "",
    place_en: "",
    place_km: ""
  });
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setLoading(false);
    };
    checkAuth();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Invalid file type. Use JPG, PNG, or WebP.");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      setError("File too large. Max 5MB.");
      return;
    }
    
    setPhoto(file);
    setError("");
  };

  const validateForm = () => {
    const errors = {};
    
    // Helper function
    const validateField = (field, value, required, min, max, message) => {
      const trimmed = value.trim();
      if (required && !trimmed) {
        errors[field] = "This field is required";
      } else if (trimmed && (trimmed.length < min || trimmed.length > max)) {
        errors[field] = message;
      }
    };
    
    // Validate all fields according to specs
    validateField("title_en", formData.title_en, true, 3, 50, "Must be 3-50 characters");
    validateField("title_km", formData.title_km, false, 3, 100, "Must be 3-100 characters if provided");
    validateField("appearance_en", formData.appearance_en, false, 10, 500, "Must be 10-500 characters if provided");
    validateField("appearance_km", formData.appearance_km, false, 10, 1000, "Must be 10-1000 characters if provided");
    validateField("story_en", formData.story_en, true, 50, 1000, "Must be 50-1000 characters");
    validateField("story_km", formData.story_km, false, 75, 2000, "Must be 75-2000 characters if provided");
    validateField("source_en", formData.source_en, true, 5, 200, "Must be 5-200 characters");
    validateField("source_km", formData.source_km, false, 10, 500, "Must be 10-500 characters if provided");
    validateField("place_en", formData.place_en, true, 5, 200, "Must be 5-200 characters");
    validateField("place_km", formData.place_km, false, 5, 500, "Must be 5-500 characters if provided");
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    if (!validateForm()) {
      setError("Please fix the errors in the form");
      return;
    }
    
    if (!user) {
      setError("You must be logged in");
      return;
    }
    
    setSubmitting(true);
    
    try {
      const supabase = createClient();
      
      let mediaUrl = null;
      
      // Upload photo only if provided
      if (photo) {
        const fileExt = photo.name.split('.').pop();
        const fileName = `${user.id}/${crypto.randomUUID()}.${fileExt}`;
        
        const { error: uploadError } = await supabase.storage
          .from('photos')
          .upload(fileName, photo);
        
        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw new Error("Failed to upload photo");
        }
        
        const { data: urlData } = supabase.storage
          .from('photos')
          .getPublicUrl(fileName);
        
        mediaUrl = urlData.publicUrl;
      }
      
      const entryData = {
        title_en: formData.title_en.trim(),
        title_km: formData.title_km.trim() || null,
        appearance_en: formData.appearance_en.trim() || null,
        appearance_km: formData.appearance_km.trim() || null,
        story_en: formData.story_en.trim(),
        story_km: formData.story_km.trim() || null,
        source_en: formData.source_en.trim(),
        source_km: formData.source_km.trim() || null,
        place_en: formData.place_en.trim(),
        place_km: formData.place_km.trim() || null,
        media: mediaUrl,
        owner: user.id
      };
      
      const { error: insertError } = await supabase
        .from('entries')
        .insert([entryData]);
      
      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error("Failed to save entry");
      }
      
      setSubmittedSuccess(true);
      
    } catch (err) {
      setError("Submission failed. Please try again.");
      console.error("Submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-[var(--container-width)] px-[var(--content-padding)] py-12">
        <StatusBox><Spinner label="Loading..." /></StatusBox>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="mx-auto max-w-[var(--container-width)] px-[var(--content-padding)] py-12 sm:py-16">
        <p className={styles.kicker} lang={lang === "kh" ? "km" : "en"}>{t.kicker}</p>
        <h1 className={styles.heading} lang={lang === "kh" ? "km" : "en"}>{t.heading}</h1>
        <p className="mb-12 text-base leading-relaxed text-text-secondary" lang={lang === "kh" ? "km" : "en"}>
          {t.intro}
        </p>
        <div className="flex flex-wrap gap-6 text-sm" lang={lang === "kh" ? "km" : "en"}>
          <a href="/login" className={styles.inlineLink}>{t.logIn}</a>
          <a href="/signup" className={styles.inlineLink}>{t.signUp}</a>
        </div>
      </main>
    );
  }

  if (submittedSuccess) {
    return (
      <main className="mx-auto max-w-[var(--container-width)] px-[var(--content-padding)] py-12 sm:py-16">
        <p className={styles.kicker}>CONTRIBUTE</p>
        <h1 className={styles.heading}>Contribute an Entry.</h1>
        <div className={styles.successMessage}>
          <p className="m-0 leading-relaxed">
            Thank you! Your entry was submitted and is waiting for review. It will appear
            in the archive once it is published. You can check its status any time on your My
            Entries page.
          </p>
          <p lang="km" className="mt-4 mb-0 leading-relaxed">
            សូមអរគុណ! ធាតុរបស់អ្នកត្រូវបានដាក់ស្នើហើយ និងកំពុងរង់ចាំការពិនិត្យ។ វានឹងបង្ហាញក្នុងបណ្ណសារ
            នៅពេលត្រូវបានផ្សព្វផ្សាយ។ អ្នកអាចពិនិត្យស្ថានភាពរបស់វាបានគ្រប់ពេលនៅទំព័រ "ធាតុរបស់ខ្ញុំ"។
          </p>
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <BackToArchiveLink />
          <a
            href="/my-entries"
            className="inline-flex items-center border border-border px-6 py-4 font-mono text-sm uppercase tracking-[0.2em] text-text-secondary transition-colors hover:border-accent hover:text-accent"
          >
            My Entries
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-[1280px] px-[var(--content-padding)] py-12 sm:py-16">
      <p className={styles.kicker} lang={lang === "kh" ? "km" : "en"}>{t.kicker}</p>
      <h1 className={styles.heading} lang={lang === "kh" ? "km" : "en"}>{t.heading}</h1>
      <p className="mb-12 text-base leading-relaxed text-text-secondary" lang={lang === "kh" ? "km" : "en"}>
        {t.note}
      </p>

      {error && <div className={styles.errorMessage}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <EntryFieldCards formData={formData} fieldErrors={fieldErrors} onChange={handleInputChange} />

        <PhotoField
          label={t.photo}
          lang={lang === "kh" ? "km" : "en"}
          hint={t.photoHint}
          onChange={handleFileChange}
        />

        <div className="mx-auto max-w-[480px]">
          <AuthSubmitButton
            label={submitting ? t.submitting : t.submit}
            disabled={submitting}
            lang={lang === "kh" ? "km" : "en"}
          />
          <button
            type="button"
            onClick={() => router.push("/")}
            disabled={submitting}
            lang={lang === "kh" ? "km" : "en"}
            className={`mt-6 w-full cursor-pointer border-0 bg-transparent py-3 font-mono uppercase tracking-[0.2em] text-text-primary transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-70 ${lang === "kh" ? "text-lg" : "text-base"}`}
          >
            {t.cancel}
          </button>
        </div>
      </form>
    </main>
  );
}
