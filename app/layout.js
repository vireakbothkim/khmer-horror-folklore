import collection from "../collection.config.js";

export const metadata = {
  title: `${collection.name} — Khmer Living Archive`,
  description: collection.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          margin: 0,
          backgroundColor: "#0B0B0D",
          color: "#EDE6D9",
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          minHeight: "100vh",
          lineHeight: 1.6,
        }}
      >
        <style>{`
          :root {
            /* Color palette */
            --color-bg: #0B0B0D;
            --color-text-primary: #EDE6D9;
            --color-text-secondary: #8A8A90;
            --color-accent: #9B2232;
            --color-border: #2A2A2E;
            
            /* Typography */
            --font-display: 'Playfair Display', serif;
            --font-mono: 'Space Mono', monospace;
            --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            
            /* Spacing scale */
            --space-xs: 0.25rem;   /* 4px */
            --space-sm: 0.5rem;    /* 8px */
            --space-md: 1rem;      /* 16px */
            --space-lg: 1.5rem;    /* 24px */
            --space-xl: 2rem;      /* 32px */
            --space-2xl: 3rem;     /* 48px */
            --space-3xl: 4rem;     /* 64px */
            --space-4xl: 5rem;     /* 80px */
            
            /* Border radius */
            --radius-sm: 2px;
            --radius-md: 4px;
            --radius-lg: 8px;
            --radius-xl: 12px;
            
            /* Typography scale */
            --text-xs: 0.75rem;   /* 12px */
            --text-sm: 0.875rem;  /* 14px */
            --text-base: 1rem;     /* 16px */
            --text-lg: 1.125rem;  /* 18px */
            --text-xl: 1.25rem;   /* 20px */
            --text-2xl: 1.5rem;    /* 24px */
            --text-3xl: 1.875rem; /* 30px */
            --text-4xl: 2.25rem;  /* 36px */
            --text-5xl: 3rem;     /* 48px */
            --text-6xl: 3.75rem;  /* 60px */
            
            /* Layout */
            --container-width: 720px;
            --content-padding: 1.5rem;
          }
          
          body {
            background-color: var(--color-bg);
            color: var(--color-text-primary);
            font-family: var(--font-sans);
            line-height: 1.6;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
          }
          
          /* Typography enhancements */
          h1, h2, h3, h4, h5, h6 {
            font-family: var(--font-display);
            font-weight: 700;
            letter-spacing: -0.02em;
            line-height: 1.1;
            margin-top: 0;
          }
          
          /* Small caps styling for monospace elements */
          .small-caps {
            font-family: var(--font-mono);
            font-variant-caps: small-caps;
            letter-spacing: 0.05em;
            text-transform: uppercase;
          }
          
          /* Selection color */
          ::selection {
            background-color: var(--color-accent);
            color: var(--color-text-primary);
          }
          
          /* Scrollbar styling */
          ::-webkit-scrollbar {
            width: 8px;
          }
          
          ::-webkit-scrollbar-track {
            background: var(--color-bg);
          }
          
          ::-webkit-scrollbar-thumb {
            background: var(--color-border);
            border-radius: var(--radius-md);
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: var(--color-accent);
          }
          
          /* Focus outlines */
          :focus {
            outline: 2px solid var(--color-accent);
            outline-offset: 2px;
          }
          
          /* Link styling */
          a {
            color: var(--color-text-primary);
            text-decoration: none;
            transition: color 0.2s ease;
          }
          
          a:hover {
            color: var(--color-accent);
          }
        `}</style>
        {children}
      </body>
    </html>
  );
}
