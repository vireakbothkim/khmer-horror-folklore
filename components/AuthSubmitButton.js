// Full-width red submit button with an arrow, used on login and signup.
// The arrow is an inline SVG, so no icon package is needed.
export default function AuthSubmitButton({ label, disabled = false }) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className="mt-4 flex w-full cursor-pointer items-center justify-between border-0 bg-accent px-6 py-4 font-sans text-sm uppercase tracking-[0.2em] text-text-primary transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
    >
      <span>{label}</span>
      <svg
        aria-hidden="true"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </button>
  );
}
