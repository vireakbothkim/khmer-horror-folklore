import { useEffect, useRef, useState } from "react";

// ☰ button that opens a dropdown on phones. On sm+ screens the button is
// hidden and the panel shows as a normal row of links and buttons.
export default function MobileMenu({ children, label }) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    if (!open) return;

    const handleKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };

    const handleOutside = (e) => {
      const inside =
        buttonRef.current?.contains(e.target) ||
        panelRef.current?.contains(e.target);
      if (!inside) setOpen(false);
    };

    document.addEventListener("keydown", handleKey);
    document.addEventListener("mousedown", handleOutside);
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.removeEventListener("mousedown", handleOutside);
    };
  }, [open]);

  // Close after a link or button inside the panel is chosen
  const handlePanelClick = (e) => {
    if (e.target.closest("a, button")) setOpen(false);
  };

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="site-menu-panel"
        aria-label={label}
        className="sm:hidden flex h-9 w-11 cursor-pointer items-center justify-center rounded border border-border bg-transparent font-mono text-base text-text-primary hover:border-accent hover:text-accent"
      >
        ☰
      </button>
      <div
        id="site-menu-panel"
        ref={panelRef}
        onClick={handlePanelClick}
        className={`${open ? "flex" : "hidden"} absolute top-full right-0 z-50 mt-2 min-w-[220px] flex-col gap-2 rounded-md border border-border bg-[var(--color-bg)] p-4 sm:static sm:mt-0 sm:flex sm:min-w-0 sm:flex-row sm:flex-wrap sm:items-start sm:gap-2 sm:border-0 sm:bg-transparent sm:p-0`}
      >
        {children}
      </div>
    </>
  );
}
