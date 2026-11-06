// Supabase Auth signs every user in with an email and a password.
// Phone numbers are turned into a generated email, so no SMS or phone
// provider is needed. The real phone number is saved in user_metadata.
const PHONE_EMAIL_DOMAIN = "phone.khmer-archive.example";

// Turns what the user typed into the email Supabase Auth expects.
// Returns { email, phone }: phone is null for email input, and holds the
// normalized number (e.g. +85512345678) for phone input.
// Returns null when the input is neither a valid email nor a valid phone number.
export function toAuthCredentials(input) {
  const value = input.trim();

  if (value.includes("@")) {
    return { email: value, phone: null };
  }

  // Ignore spaces, dashes, and brackets people type in phone numbers
  const digits = value.replace(/[\s\-()]/g, "");

  // Local format: 0 followed by 8 or 9 digits, e.g. 012 345 678
  if (/^0\d{8,9}$/.test(digits)) {
    const phone = `+855${digits.slice(1)}`;
    return { email: phoneToEmail(phone), phone };
  }

  // International format: + then 8 to 15 digits, e.g. +855 12 345 678
  if (/^\+\d{8,15}$/.test(digits)) {
    return { email: phoneToEmail(digits), phone: digits };
  }

  return null;
}

// "+85512345678" -> "85512345678@phone.khmer-archive.example"
function phoneToEmail(phone) {
  return `${phone.slice(1)}@${PHONE_EMAIL_DOMAIN}`;
}
