"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../lib/supabase-client";

export default function ContributePage() {
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
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

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
      
      router.push("/");
      
    } catch (err) {
      setError("Submission failed. Please try again.");
      console.error("Submission error:", err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;
  }

  if (!user) {
    return (
      <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
        <h1>Contribute</h1>
        <p>You must be logged in to contribute.</p>
        <div style={{ marginTop: "20px" }}>
          <a href="/login" style={{ marginRight: "10px", color: "#972514" }}>Log In</a>
          <a href="/signup" style={{ color: "#972514" }}>Sign Up</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "600px", margin: "40px auto", padding: "20px" }}>
      <h1>Contribute an Entry</h1>
      
      {error && (
        <div style={{ 
          padding: "10px", 
          backgroundColor: "#2E1C1C", 
          color: "#E8EDF2",
          marginBottom: "20px",
          borderRadius: "4px"
        }}>
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        {[
          { field: "title_en", label: "Title (English) *", type: "text", placeholder: "Entry title (3-50 characters)" },
          { field: "title_km", label: "Title (Khmer)", type: "text", placeholder: "ចំណងជើងខ្មែរ (៣-១០០ តួអក្សរ)" },
          { field: "appearance_en", label: "Appearance (English)", type: "textarea", rows: 4, placeholder: "Describe appearance (10-500 characters if provided)" },
          { field: "appearance_km", label: "Appearance (Khmer)", type: "textarea", rows: 4, placeholder: "ពណ៌នារូបរាង (១០-១០០០ តួអក្សរ ប្រសិនបើផ្តល់ឱ្យ)" },
          { field: "story_en", label: "Story (English) *", type: "textarea", rows: 6, placeholder: "Tell the story (50-1000 characters)" },
          { field: "story_km", label: "Story (Khmer)", type: "textarea", rows: 6, placeholder: "និទានរឿង (៧៥-២០០០ តួអក្សរ ប្រសិនបើផ្តល់ឱ្យ)" },
          { field: "source_en", label: "Source (English) *", type: "text", placeholder: "Source information (5-200 characters)" },
          { field: "source_km", label: "Source (Khmer)", type: "text", placeholder: "ប្រភពព័ត៌មាន (១០-៥០០ តួអក្សរ ប្រសិនបើផ្តល់ឱ្យ)" },
          { field: "place_en", label: "Place (English) *", type: "text", placeholder: "Location information (5-200 characters)" },
          { field: "place_km", label: "Place (Khmer)", type: "text", placeholder: "ទីកន្លែង (៥-៥០០ តួអក្សរ ប្រសិនបើផ្តល់ឱ្យ)" }
        ].map(({ field, label, type, placeholder, rows = 4 }) => (
          <div key={field} style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "5px" }}>{label}</label>
            {type === "textarea" ? (
              <textarea
                value={formData[field]}
                onChange={handleInputChange(field)}
                rows={rows}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: `1px solid ${fieldErrors[field] ? "#972514" : "#2E3644"}`,
                  borderRadius: "4px",
                  backgroundColor: "#14181F",
                  color: "#FFFFFF"
                }}
                placeholder={placeholder}
              />
            ) : (
              <input
                type="text"
                value={formData[field]}
                onChange={handleInputChange(field)}
                style={{
                  width: "100%",
                  padding: "10px",
                  border: `1px solid ${fieldErrors[field] ? "#972514" : "#2E3644"}`,
                  borderRadius: "4px",
                  backgroundColor: "#14181F",
                  color: "#FFFFFF"
                }}
                placeholder={placeholder}
              />
            )}
            {fieldErrors[field] && (
              <p style={{ color: "#972514", fontSize: "12px", marginTop: "5px" }}>
                {fieldErrors[field]}
              </p>
            )}
          </div>
        ))}
        
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "5px" }}>Photo</label>
          <input
            type="file"
            accept=".jpg,.jpeg,.png,.webp"
            onChange={handleFileChange}
            style={{
              width: "100%",
              padding: "10px",
              border: "1px solid #2E3644",
              borderRadius: "4px",
              backgroundColor: "#14181F",
              color: "#FFFFFF"
            }}
          />
          <small style={{ color: "#5A6373", display: "block", marginTop: "5px" }}>
            Optional. JPG, PNG, or WebP. Max 5MB.
          </small>
        </div>
        
        <div style={{ display: "flex", gap: "10px", marginTop: "30px" }}>
          <button
            type="button"
            onClick={() => router.push("/")}
            disabled={submitting}
            style={{
              padding: "10px 20px",
              backgroundColor: "transparent",
              border: "1px solid #2E3644",
              borderRadius: "4px",
              color: "#97A1B3",
              cursor: "pointer"
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={submitting}
            style={{
              padding: "10px 20px",
              backgroundColor: "#972514",
              border: "none",
              borderRadius: "4px",
              color: "#FFFFFF",
              cursor: "pointer"
            }}
          >
            {submitting ? "Submitting..." : "Submit Entry"}
          </button>
        </div>
      </form>
    </div>
  );
}