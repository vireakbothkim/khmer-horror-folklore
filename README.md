# Khmer Horror Folklore

## What this is

Khmer Horror Folklore is a living archive of Cambodian ghosts, demons, and cursed spirits (khmoach, ahp, preta, arak, and others) rooted in animism and Buddhist tradition. Each entry describes a creature's appearance, its story, where it is said to be found, and who told it, in English and Khmer, with an optional photo. Anyone can browse and search published entries. Signed-in contributors submit their own entries, which wait for a reviewer before they go public. A reviewer either publishes an entry or returns it with a note explaining what to change. The archive is curated by Kim Vireakboth.

It's a bilingual, searchable archive of Khmer horror folklore where people add what their grandparents told them, and nothing goes public until a reviewer checks it.

## Who it's for

This archive is mainly for Khmer speakers: elders, parents, grandparents, adults, teenagers, and anyone with a horror-creature story to share. It is also for non-Khmer speakers who want to learn about Khmer folklore. Every entry is bilingual, so English readers can follow along. Choices made for them:

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
| anthropic/claude-haiku-5.5 | Redesign (Tailwind v4) and security hardening | The Tailwind v4 redesign and the security strengthening. | Kept. Nothing rejected. |
| deepseek/deepseek-v3.2 | Most of the website's functionality | Most of the core features, including the My Entries page. | Kept most of its code and rejected several parts. Sometimes reported a successful build while syntax errors were still in the code, so the errors had to be fixed in a new task. Sometimes stopped mid-build and needed "continue". A landing page was rejected because the result was poor. |
| openrouter/free | First orientation: "go through this project and tell me what it's about" (the default model when Cline was first used) | Explanation only. No code. | Used to understand the project. No code kept. |

**What I kept and what I rewrote:** I kept most of DeepSeek's code and rejected several parts, including a landing page whose result was poor. I kept Claude's redesign and security code without rejecting anything. Because DeepSeek sometimes reported a successful build with syntax errors, I did not trust its build reports without checking the code myself.

**How I checked the work:** Cline ran `npm run build` after each change. I read each diff before accepting or rejecting it. After every AI-built change, I ran `npm run dev` and tested the whole website, not just the new feature, to confirm that existing pages, designs, and functions still worked. I also ran the Supabase SQL checks and a two-account test, using a reviewer account and a contributor account. The contributor could not see another contributor's pending entries, and could not edit published entries that belonged to someone else. These checks confirmed that the row-level security rules worked for each role. This mattered most with DeepSeek, which sometimes reported a successful build even when the code had syntax errors.

## Sources and credits

| # | Entry title (English) | Source (name, relation, or community) | Photo credit (photographer, artist, or where it came from) | Permission (yes / anonymous) |
|---|---|---|---|---|
| 1 | Ahp/Krasue | Novels, Khmer Literatures, Grandparents, Local traditional healers, and Regional urban legends | Xavier Romero-Frias, CC BY-SA 3.0, https://commons.wikimedia.org/wiki/File:XRF-krasue.jpg | yes |
| 2 | Banana Tree Ghost / Kmoch Derm Jek Chvea | Friends, Rural Elders, Novels, Khmer Literature, Popular Medias, Teachers | Screenshot from a YouTube video by pron saymen, https://www.youtube.com/watch?v=EN1Khw-8RBE | yes |
| 3 | Khmer Elves / Mrenh Kongveal | Pre-Buddhist animist ancestor belief, Agricultural folklore, and Generations of farmer narratives | Facebook photo album, photographer unknown, https://www.facebook.com/100063706085583/albums/477662677700598/ | yes |
| 4 | Preay | Oral storytelling by parents, grandparents, teachers, friends, novels, khmer literature and popular media tales. | Photo by Matthew Meyer, https://yokai.com/onryou/ | yes |
| 5 | Sudden Death Ghost / Kmoch Tay Horng | Workplace legends, Ancestral family stories, and Modern urban ghost tales | Photo by Saul Vazquez, https://www.cnn.com/2016/07/14/us/spirit-leaving-body-photo-trnd | yes |
| 6 | Preta / Pret / Hungry Ghost | Buddhist scripture (Tripitaka), Theravada monastic teachings, and traditional Pchum Ben ceremonies. | Photo by SSE Design Lab, https://www.facebook.com/ssedesignlab/posts/122118926942443651/ | yes |
| 7 | Ancient Guardian / Neak Ta | Early Khmer ancestor Neak Ta belief, Village community customs, and historical land traditions | Image from a Viator tour listing, photographer unknown, https://www.viator.com/tours/Siem-Reap/4-Day-Siem-Reap-and-Battambang-Tour/d5480-90717P32 | yes |
| 8 | Arak / Arak Khmer | Popular belief, Arak Musical Act and Unique Khmer folklore | Screenshot from a YouTube video by pron saymen, https://youtu.be/fp3cy-3E6MM | yes |

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