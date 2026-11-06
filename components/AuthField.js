import styles from "../app/auth.module.css";

// One labeled input in the underline style used on login and signup.
// Pass helperText for a small hint under the field. All other props go to the input.
export default function AuthField({ id, label, helperText = "", ...inputProps }) {
  return (
    <div className="mb-8">
      <label htmlFor={id} className="mb-2 block font-mono text-xs uppercase tracking-[0.2em] text-text-secondary">
        {label}
      </label>
      <input
        id={id}
        {...inputProps}
        className={`${styles.authInput} w-full rounded-none border-0 border-b border-border bg-transparent px-0 py-3 font-sans text-base text-text-primary transition-colors placeholder:text-text-secondary/60 focus:border-accent`}
      />
      {helperText && <p className="mt-2 text-xs text-text-secondary">{helperText}</p>}
    </div>
  );
}
