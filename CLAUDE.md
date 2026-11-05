@AGENTS.md
@docs/conventions.md

# Bookshelf

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 website for browsing books, built on the [Open Library](https://openlibrary.org) open API.

openlibrary.org is the model for pages, sections and content, but Bookshelf is its own website, not a clone:

- It uses our tokens (below), our logo (`icon.svg` + the "Bookshelf" wordmark) and icon. "Open Library" brand copy becomes "Bookshelf", and Internet Archive–specific parts (IA logo, Donate, language lists) are dropped.
- Take what's on the page and roughly how it's laid out from Open Library, never its CSS (their `flex: 2`/`flex: 1`, `min-width`s, `min-height` fallbacks): write the simplest classes that produce it.
- Design comes first; functionality (search, menus, navigation) is wired up later.

## Commands

```bash
npm run dev                  # Next dev server (Turbopack)
npm run build / start        # Production build / serve it
npm run lint / lint:fix      # ESLint
npm run format / format:fix  # Prettier on src/
npm run type-check           # next typegen && tsc --noEmit
npm run db:push              # Apply src/db/schema.ts to the database (drizzle-kit push)
```

`eslint.config.mjs` mirrors the user's URUQ AI config (`C:\Users\johnv\Desktop\uruq-ai\eslint.config.js` and its `package.json`), adapted only where Next.js requires it; Bookshelf may go beyond it (`eslint-plugin-perfectionist`). Read that config before changing lint or format tooling, never rebuild it from the summary in `docs/conventions.md`. Never edit anything in the URUQ AI project, not even to keep the two in sync.

**Before adding MUI, Formik/Yup or Redux Toolkit/RTK Query**, read [docs/library-conventions.md](docs/library-conventions.md) and follow its section for that library.

`next.config.ts` enables `cacheComponents` and `partialPrefetching`.

For heavy testing (`docs/conventions.md`), serve the build on port 3100 with `DATABASE_URL` pointing at a temp file outside the repo and a throwaway `SESSION_SECRET`. Create the temp database from `drizzle-kit export` applied through `@libsql/client`, so nothing can push to `local.db`; override `OPEN_LIBRARY_URL` to point at a local stub. Without JavaScript a failed form returns a fragment with no form or error text (apparently from partial prerendering, and `useActionState`'s `permalink` doesn't help), so test form errors and refills in the browser request format (`Next-Action` header, `encodeReply`).

## Git

When asked for a commit message, only suggest it: never run `git commit` or create a branch. The user commits on `main` themselves. Messages are short and imperative (`Create home page UI`).

## Claude Code hooks

`.claude/settings.json` runs the scripts in `.claude/hooks/` (Node, linted like the rest of the repo). They enforce the rules below and in `docs/conventions.md` that lint can't check, so a new rule of that kind may belong here too. Change them only with their rule.

- `guard-commands`: denies `git commit`, creating a branch, bypassing Husky and shell commands that mention `.env.local`; asks before `db:push`, deleting `local.db` and git commands that discard uncommitted work.
- `guard-files`: denies reading or writing `.env.local`, and writing generated files, the URUQ AI project or secrets in `.env`.
- `guard-code-rules`: denies new text in `src/` that breaks a styling or component rule (`dark:`, arbitrary shadows, bare `button`/`p`/`span`, `next/link`, hardcoded `href`s, hex colors and similar).
- `after-edit`: runs Prettier on the edited file, records it for `verify-on-stop`, and reminds Claude to run `db:push` when `src/db/schema.ts` changes.
- `verify-on-stop`: when a turn edited code, runs `tsc` and ESLint on the edited files and sends failures back to Claude once per round of edits.

The guards catch mistakes and aren't a security boundary: edits made through shell commands skip all but `guard-commands`.

## Open Library API

- Website: https://openlibrary.org
- API docs: https://openlibrary.org/developers/api
- Covers API: https://openlibrary.org/dev/docs/api/covers

Cover images come from `covers.openlibrary.org`, which is allowed in `images.remotePatterns`.

## Architecture

- `src/app/components/`: Header and Footer (rendered by `layout.tsx`) and the home page sections (rendered by `page.tsx`).
- `src/app/error.tsx`: fallback for a failed page or Server Action, inside the shared layout.
- `src/app/account/`: Log In (`login`) and Sign Up (`create`) pages, modeled on Open Library's `/account/login` and `/account/create`. The header's `Account` shows Log In / Sign Up links or the screen name with Log Out.
- `src/actions/`: `auth.ts` (`signUp`, `logIn`, `logOut` Server Actions).
- `src/lib/`: server-only code. `session.ts` (JWT in an httpOnly `session` cookie via `jose`, 7 days), `dal.ts` (`getCurrentUser`, `getUser`), `password.ts` (`node:crypto` scrypt), `rateLimit.ts` (in-memory, per email: 10 log in attempts per 15 minutes, so it holds only with a single server process).
- `src/utils/`: `formSchemas.ts` (Zod schemas, `ERROR_MESSAGES`), `forms.ts` (`parseForm`: reads and validates a form for an action).
- `src/db/`: Drizzle ORM on SQLite via `@libsql/client`; one `users` table, where `screenNameKey` (the lowercased screen name) makes screen names unique regardless of case. The database file is `local.db` (gitignored).
- `src/proxy.ts`: on a GET of the account pages, redirects a logged-in user to home and clears a session cookie whose user no longer exists.
- `src/components/`: Typography, Button, Link, TextField.
- `src/constants/`: `ROUTES` (`home`, `logIn`, `signUp`), `SESSION_COOKIE` (`cookies.ts`) and `PASSWORD_FIELD` (`formFields.ts`, the password field's name in schemas and inputs).
- `src/types/`: `models.ts` (`ParsedForm`, the result of `parseForm`), `formValues.ts` (form state types) and `env.d.ts` (types `DATABASE_URL` and `SESSION_SECRET` as strings; they are always set, so the code reads them without checks).
- `src/services/`: Open Library API calls. `openLibrary/index.ts` (`fetchOpenLibrary`) is an Axios instance with the base URL from `OPEN_LIBRARY_URL`, the `User-Agent` header and a 10-second timeout; Axios throws on a failed response. Endpoints are grouped by domain: `openLibrary/subjects/` (`getSubject`, with `types.ts`) and `openLibrary/covers/` (`getCoverUrl`). `getSubject` turns a failure into empty `works` cached for minutes, so an Open Library outage neither fails the build nor sticks.

Open Library's API has no account endpoints, so accounts live in our own database. `.env` (committed) holds `OPEN_LIBRARY_URL=https://openlibrary.org`; `.env.local` (gitignored) holds `DATABASE_URL=file:local.db` and `SESSION_SECRET` (`openssl rand -base64 32`).

## Design

Light theme only: there is no dark mode, so never use `dark:` variants.

- **Colors:** `white` #ffffff (cards, inputs), `black` #1f1b16 (text), `primary` #7a2e2e / `secondary` #5e2222 (buttons, links, hover), `error` #b3261e, `success` #2f6b4f, `beige` #faf7f2 (page), `gray` #6b6259 (secondary text), `gray-light` #e7e0d6 (borders), `gold` #c08a3e (decorations only, too light for text).
- **Font:** Inter.
- **Typography variants:** `h1|h2|h3|h4|body|subtitle|caption` → 48/36/28/22/16/14/12px.
- **Button variants:** `primary` (filled), `outlined` (white with a border), `text` (no background until hover). Default size `h-[36px] px-[16px] text-body`, on one line (`whitespace-nowrap`).
- **Link variants:** `inline` (underlined primary text), `plain` (no look: the logo), `primary` and `text` (the same look as Button's).
- **Shadows:** `shadow-raised` for cards, tiles and filled buttons; `shadow-cover` for book covers.
- **Text spacing scale:**
  - `4px`: a title and its own description or value (fact name → line, stat value → label, card title → description), and between links in a compact link list (footer).
  - `12px`: a heading → its content, and between paragraphs or list items.
  - `24px`: text → its button, and between side-by-side columns.
  - `32px`: between page sections.
- **z-index order:** `z-1` raised genre-tile cover (GenreTile), `z-2` sticky header (Header), `z-3` skip link (`layout.tsx`, above the header).
