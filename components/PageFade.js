"use client";

import { usePathname } from "next/navigation";

// Wraps every page. The key is the current path, so React remounts this
// div on each route change and the page-fade-up animation plays again.
export default function PageFade({ children }) {
  const pathname = usePathname();

  return (
    <div key={pathname} className="page-fade flex w-full flex-1 flex-col">
      {children}
    </div>
  );
}
