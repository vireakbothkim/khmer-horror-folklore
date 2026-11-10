# Khmer Horror Folklore

## What this is

Khmer Horror Folklore is a living archive of Cambodian ghosts, demons, and cursed spirits (khmoach, ahp, preta, arak, and others) rooted in animism and Buddhist tradition. Each entry describes a creature's appearance, its story, where it is said to be found, and who told it, in English and Khmer, with an optional photo. Anyone can browse and search published entries. Signed-in contributors submit their own entries, which wait for a reviewer before they go public. A reviewer either publishes an entry or returns it with a note explaining what to change. The archive is curated by KIM Vireakboth.

If a stranger asked what I built this semester: it's a bilingual, searchable archive of Khmer horror folklore where people add what their grandparents told them, and nothing goes public until a reviewer checks it.

## Who it's for

This archive is for Khmer speakers: elders, parents, grandparents, adults, teenagers, and anyone with a horror-creature story to share. Choices made for them:

- **Khmer as a full second language.** A language button in the header switches the whole site to Khmer, and the choice is remembered in the browser. Every entry has Khmer fields next to the English ones, and Khmer text is set in a Khmer font. The site opens in English by default.
- **Phone first.** On small screens the navigation moves behind a menu button, and entry cards and forms stack in one column.
- **Phone sign-up.** People can sign up with a phone number (for example 012 345 678, or an international number starting with +) instead of an email address.
- **Sources named on every entry.** Each entry has a Source field so the person who told the story can be credited, with their permission.
- **Small uploads.** Photos are capped at 5 MB, in JPEG, PNG, or WebP, to keep pages light.

## How it works

**Stack:** Next.js 15 (App Router) and React 19 for the site, Tailwind CSS v4 for styling, Supabase for accounts (Auth), the database (Postgres), and photo storage, and Vercel for hosting. JavaScript only.

**Tables and storage:**

- `profiles` (id, username, created_at). Created at sign-up. Usernames are unique, ignoring capitals and surrounding spaces. Publicly readable.
- `reviewers` (user_id). Row-level security is on with no policies, so nobody reads it directly. The `is_reviewer()` function checks it.
- `entries`. Bilingual title, appearance, story, source, and place fields; `media` (photo URL); `owner` (the contributor's user ID); `contributor` (the username, filled in from the owner's profile when the entry is first saved); `status`; `return_notes` and `returned_at`; `created_at`.
- Storage bucket `photos`. Public read, 5 MB limit, JPEG/PNG/WebP only. Uploads and deletes are allowed only inside the owner's own `user-id/` folder.

The full structure is recorded in `supabase/schema.sql`.

**Entry statuses:** `pending` (submitted, waiting), `published` (public), `returned` (sent back with a reviewer note).

```
pending --publish--> published
pending --return---> returned --owner edits and saves--> pending
published --owner edits and saves--> pending
```

**Who can do what (row-level security policies):**

| Who | Read entries | Insert | Update | Delete |
|---|---|---|---|---|
| Visitor (signed out) | Published only | No | No | No |
| Contributor (signed in) | Published, plus their own in any status | Their own, and only as `pending` | Their own. The result must be `pending`, unless the user is a reviewer | Their own only |
| Reviewer | All entries, in any status | As a contributor | Their own only. Publishing and returning go through `review_entry`, not direct updates | Their own only |

**Database functions:**

- `review_entry(entry_id, decision, notes)`: the review gate (see Section 4).
- `get_return_notes(entry_id)`: returns a return note only to the entry's owner.
- `is_reviewer()`: true when the signed-in user is in `reviewers`.

**Triggers:** `on_auth_user_created` creates the profile at sign-up. `entries_set_contributor` fills in the contributor name when an entry is first saved.

## Security decisions

**The review gate.** Publishing and returning run through `review_entry`, a database function, and not through the browser alone. The function:

- returns false unless the caller is a reviewer (`is_reviewer()` checks the signed-in user ID);
- accepts only `published` or `returned` as a decision;
- changes only entries that are still `pending`, so a decision can't be overwritten;
- saves a return note only when the decision is `returned`.

Logged-out visitors cannot run `review_entry` or `get_return_notes` at all: their access was revoked in the database.

**Why it lives in the database.** Anything in the browser can be changed by the person using it. The Publish and Return buttons are shown only to reviewers, but hiding a button protects nothing: someone could call the same function directly. The protection is the check inside the function, and the row-level policies that stop contributors from changing `status` or `owner`.

**Decisions the brief left to me:**

- **What a returned entry says.** The reviewer writes a note in English, Khmer, or both. Only the owner sees it, on the entry page and on My Entries. Visitors never see it.
- **Can reviewers take down published entries?** No. The review function only acts on `pending` entries, and there is no unpublish path. A published entry comes down only when its owner deletes it. When an owner edits a published entry, it goes back to `pending` and waits for review again. This is deliberate: any change to a published entry gets a second look before it is public again.
- **What a contributor sees of their own pending entries.** My Entries lists all of the owner's entries in every status, with a status badge, and search covers them. Public search covers only published entries.

**Known limits (for a class project):**

- Phone-number accounts are not verified, and email confirmation is off. Both were approved for this course.
- The entry page still reads the entry's `owner` ID to decide whether to show Edit and Delete. The archive list no longer requests it.
- Photo type checks run in the browser. The storage bucket enforces the type and size limits on the server.
- If a photo can't be removed from storage, the entry is still deleted and the failure is logged in the browser console only.
- The contributor name is set when an entry is first saved. The app doesn't let anyone change it, but the database doesn't block a direct edit to that one column.
- Deleting an account is blocked while it still owns entries, because the entries must be removed first.
- Signup error messages are generic, but Supabase's own responses may still differ for an existing email.

## AI use

Tools: Cline in VS Code, with the following models.

| Model | Task | What it wrote | Verdict |
|---|---|---|---|
| anthropic/claude-haiku-5.5 | [ ] | [ ] | [ ] |
| deepseek/deepseek-v3.2 | [ ] | [ ] | [ ] |
| openrouter/free | [ ] | [ ] | [ ] |

**What I kept and what I rewrote:** [ ]

**How I checked the work:** [ ]. Describe at least: the build (`npm run build`) after each change, reading each diff before committing, the Supabase SQL checks, and the two-account test with the date it was run.

## Sources and credits

Fill in one row per entry. Each entry needs a credited source. Write "a [role] in [place] who asked not to be named" if someone prefers anonymity.

| # | Entry title (English) | Source (name, relation, or community) | Place | Photo credit (photographer, artist, or where it came from) | Permission (yes / anonymous) |
|---|---|---|---|---|---|
| 1 | [ ] | [ ] | [ ] | [ ] | [ ] |
| 2 | [ ] | [ ] | [ ] | [ ] | [ ] |
| 3 | [ ] | [ ] | [ ] | [ ] | [ ] |
| 4 | [ ] | [ ] | [ ] | [ ] | [ ] |
| 5 | [ ] | [ ] | [ ] | [ ] | [ ] |
| 6 | [ ] | [ ] | [ ] | [ ] | [ ] |
| 7 | [ ] | [ ] | [ ] | [ ] | [ ] |
| 8 | [ ] | [ ] | [ ] | [ ] | [ ] |

## Running it locally

```bash
git clone https://github.com/vireakbothkim/khmer-horror-folklore.git
cd khmer-horror-folklore
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000.

**Database setup:** create a Supabase project, then run `supabase/schema.sql` once in its SQL editor. Set the minimum password length to 8 under the Auth settings.

**Environment variables** (set them in `.env.local`, never commit that file):

- `NEXT_PUBLIC_SUPABASE_URL`: your Supabase project URL.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: your Supabase publishable key. This key is public by design; it is meant to ship to the browser. Access is controlled by the row-level policies in Section 3, not by keeping this key secret.

`.env.local` is listed in `.gitignore`, so it stays out of the repository. `.env.example` lists the variable names with placeholder values.

## Submission checklist

- Live URL loads logged out and shows published entries only: [yes / no], [URL]
- A stranger cannot publish their own entry through the page or the console: yes, tested [date]
- Logged out, the API returns nothing pending or returned: yes, tested [date]
- Contributors can edit and delete only their own entries: yes. Enforced by row-level policies (Section 3) and an owner filter on every delete in the code.
- No secrets anywhere in the repo history: [yes / partly], checked with [method]
- At least eight real entries, each with a credited source: [yes], [count]
- Khmer renders on every screen a user meets, including the queue: [yes / no]
- Works at phone width: [yes], tested on [device or browser width]
- No test entries, lorem ipsum, or TODO comments in shipped pages: [yes / no]
- No console errors on the main pages: [yes / no]
- jesseorndorff is a collaborator on this repo: [yes / no]
- Supabase project restored and awake on [date]
- Demo video link opens in a private window: [yes / no], [link]
- Reflection pasted in the Canvas submission: [yes / no]
- Posted in the Show Your Archive discussion: [yes / no]
- Q&A slot booked for [date and time]
