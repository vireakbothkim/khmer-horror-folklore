# Supabase Setup for Next.js 15 App Router

This project has been configured with Supabase for authentication and database operations using the `@supabase/ssr` pattern for Next.js 15 App Router.

## Installation

The following dependencies have been installed:
- `@supabase/supabase-js` - Core Supabase client library
- `@supabase/ssr` - Server-side rendering utilities for Next.js

## Configuration Files Created

### 1. **Environment Variables** (`.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=https://kvmoadulxtcxlntihayf.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_XqmIc-iIqbF6A2OuHyROxA_NjwS1nPW
```

### 2. **Client-Side Supabase Client** (`lib/supabase-client.js`)
- Creates a browser client for use in Client Components
- Uses `createBrowserClient` from `@supabase/ssr`
- Reads environment variables for configuration

### 3. **Server-Side Supabase Client** (`lib/supabase-server.js`)
- Creates a server client for use in Server Components and Server Actions
- Uses `createServerClient` from `@supabase/ssr`
- Handles cookies via `next/headers` for authentication

### 4. **Middleware** (`middleware.js`)
- Configures Supabase authentication middleware
- Refreshes expired sessions automatically
- Compatible with Next.js 15 cookies API
- Applied to all routes except static assets

### 5. **Utility Functions** (`lib/supabase-utils.js`)
- Helper functions for common operations:
  - `getCurrentUser()` - Get current authenticated user
  - `getSession()` - Get current session
  - `signOut()` - Sign out current user

### 6. **Environment Template** (`.env.example`)
- Template file documenting required environment variables
- Safe for committing to version control

## Usage Examples

### In a Client Component:
```javascript
"use client";
import { createClient } from "@/lib/supabase-client";

function MyClientComponent() {
  const supabase = createClient();
  // Use supabase for queries, auth, etc.
}
```

### In a Server Component:
```javascript
import { createClient } from "@/lib/supabase-server";

export default async function MyServerComponent() {
  const supabase = await createClient();
  const { data } = await supabase.from("table").select("*");
  // Render data
}
```

### Using Utility Functions:
```javascript
import { getCurrentUser } from "@/lib/supabase-utils";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) {
    // Redirect to login
  }
  // Render user profile
}
```

## Security Notes

1. **Never commit actual keys** to version control
2. **Environment variables** are loaded from `.env.local` (gitignored)
3. **Middleware** handles session refresh automatically
4. **Client-side keys** are publishable (safe for browser)
5. **Server-side operations** use secure cookie handling

## Next Steps

1. Set up database tables in your Supabase project
2. Create authentication pages (login, signup, etc.)
3. Implement protected routes using the utility functions
4. Add database operations for your application data

The setup is now ready for authentication and database integration with Supabase.