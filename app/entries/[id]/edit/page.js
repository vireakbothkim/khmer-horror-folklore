"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "../../../../lib/supabase-client";
import StatusBox from "../../../../components/StatusBox";
import Spinner from "../../../../components/Spinner";
import AuthSubmitButton from "../../../../components/AuthSubmitButton";
import EntryFieldCards from "../../../../components/EntryFieldCards";
import PhotoField from "../../../../components/PhotoField";
import BackToArchiveLink from "../../../../components/BackToArchiveLink";

export default function EditEntryPage() {
  const router = useRouter();
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
  const [existingPhoto, setExistingPhoto] = useState(null);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  
  const params = useParams();
  const entryId = params?.id;

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (fieldErrors[field]) {
      setFieldErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supabase = createClient();
        
        // Fetch user
        const { data: { user } } = await supabase.auth.getUser();
        setUser(user);
        
        if (!user) {
          router.push("/login");
          return;
        }
        
        // Fetch entry
        const { data, error } = await supabase
          .from('entries')
          .select('id, owner, status, created_at, contributor, media, title_en, title_km, appearance_en, appearance_km, story_en, story_km, source_en, source_km, place_en, place_km')
          .eq('id', entryId)
          .single();
        
        if (error) {
          console.error("Error fetching entry:", error);
          setError("Entry not found");
          return;
        }
        
        // Check if user owns the entry
        if (data.owner !== user.id) {
          setError("You don't have permission to edit this entry");
          return;
        }
        
        // Set form data from existing entry
        setFormData({
          title_en: data.title_en || "",
          title_km: data.title_km || "",
          appearance_en: data.appearance_en || "",
          appearance_km: data.appearance_km || "",
          story_en: data.story_en || "",
          story_km: data.story_km || "",
          source_en: data.source_en || "",
          source_km: data.source_km || "",
          place_en: data.place_en || "",
          place_km: data.place_km || ""
        });
        
        if (data.media) {
          setExistingPhoto(data.media);
        }
        
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load entry");
      } finally {
        setLoading(false);
      }
    };
    
    if (entryId) {
      fetchData();
    }
  }, [entryId, router]);

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
      setError("Please fix the errors below");
      return;
    }
    
    setSubmitting(true);
    
    try {
      const supabase = createClient();
      let mediaUrl = existingPhoto; // Keep existing photo by default
      
      // Upload new photo if provided
      if (photo) {
        const fileExt = photo.name.split('.').pop();
        const fileName = `${user.id}/${crypto.randomUUID()}.${fileExt}`;
        const bucketName = 'photos';
        
        const { error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(fileName, photo);
        
        if (uploadError) {
          console.error("Upload error:", uploadError);
          throw new Error("Failed to upload photo");
        }
        
        const { data: urlData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(fileName);
        
        mediaUrl = urlData.publicUrl;
      }
      
      // Check if user is a reviewer
      const { data: isReviewerData, error: reviewerError } = await supabase
        .rpc('is_reviewer');
      
      const isReviewer = !reviewerError && isReviewerData === true;
      
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
        media: mediaUrl
      };
      
      // If user is not a reviewer, set status to pending
      if (!isReviewer) {
        entryData.status = 'pending';
      }
      
      // Update the entry with .select() to verify the update
      const { data: updatedData, error: updateError } = await supabase
        .from('entries')
        .update(entryData)
        .eq('id', entryId)
        .select('id');
      
      if (updateError) {
        console.error("Update error:", updateError);
        throw new Error("Failed to update entry");
      }
      
      // Check if update actually succeeded (RLS might block it)
      if (!updatedData || updatedData.length === 0) {
        // Update was blocked (e.g., by RLS) or entry doesn't exist
        console.error("Update blocked or entry not found after update:", updatedData);
        alert("That change wasn't saved. Please try again.");
      } else {
        // Successfully updated
        alert(
          isReviewer
            ? "Entry updated successfully!"
            : "Your changes were saved. This entry is waiting for review again and will go live once a reviewer approves it."
        );
        router.push(`/entries/${entryId}`);
      }
      
    } catch (err) {
      console.error("Error during update:", err);
      setError("An error occurred while updating the entry. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="mx-auto w-full max-w-[1280px] px-[var(--content-padding)] pb-10">
        <StatusBox><Spinner label="Loading..." /></StatusBox>
      </main>
    );
  }

  if (error) {
    return (
      <div style={{
        width: "100%",
        maxWidth: "1280px",
        margin: "0 auto",
        padding: "40px var(--content-padding)",
        color: "#FFFFFF",
        fontFamily: "var(--font-sans)"
      }}>
        <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Error</h1>
        <p style={{ marginBottom: "20px" }}>{error}</p>
        <BackToArchiveLink />
      </div>
    );
  }

  return (
    <div style={{
      width: "100%",
      maxWidth: "1280px",
      margin: "0 auto",
      padding: "40px var(--content-padding)",
      color: "#FFFFFF",
      fontFamily: "var(--font-sans)"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "40px"
      }}>
        <h1 style={{
          fontSize: "24px",
          margin: 0,
          fontWeight: "normal"
        }}>
          Edit Entry
        </h1>
        
        <button
          onClick={() => router.push(`/entries/${entryId}`)}
          style={{
            padding: "8px 16px",
            backgroundColor: "transparent",
            border: "1px solid #2E3644",
            borderRadius: "4px",
            color: "#97A1B3",
            cursor: "pointer",
            fontFamily: "var(--font-sans)",
            fontSize: "12px"
          }}
        >
          Cancel
        </button>
      </div>
      
      {error && (
        <div style={{
          padding: "15px",
          backgroundColor: "#972514",
          borderRadius: "4px",
          marginBottom: "20px",
          color: "#FFFFFF"
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <EntryFieldCards formData={formData} fieldErrors={fieldErrors} onChange={handleInputChange} />

        <PhotoField
          hint="JPG, PNG, or WebP. Max 5MB. Leave empty to keep current photo."
          onChange={handleFileChange}
        >
          {existingPhoto && !photo && (
            <div className="mt-6">
              <p className="mb-2 text-xs text-text-secondary">Current photo:</p>
              <img
                src={existingPhoto}
                alt="Current entry photo"
                className="mx-auto h-auto max-h-48 w-auto max-w-full"
              />
            </div>
          )}
        </PhotoField>

        <div className="mx-auto max-w-[480px]">
          <AuthSubmitButton label={submitting ? "Updating..." : "Update Entry"} disabled={submitting} />
          <button
            type="button"
            onClick={() => router.push(`/entries/${entryId}`)}
            disabled={submitting}
            className="mt-6 w-full cursor-pointer border-0 bg-transparent py-3 font-mono text-xs uppercase tracking-[0.2em] text-text-secondary transition-colors hover:text-accent disabled:cursor-not-allowed disabled:opacity-70"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
