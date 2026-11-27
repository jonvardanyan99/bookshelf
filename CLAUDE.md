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

**Stale dev cache:** when a change appears in `npm run build` output but not in `npm run dev`, even after restarting it (seen with a `globals.css` rule missing from the dev CSS), Turbopack's persistent dev cache in `.next/dev` is serving an old compile. Stop the dev server, delete `.next/dev` and start it again.

For heavy testing (`docs/conventions.md`), serve the build on port 3100 with `DATABASE_URL` pointing at a temp file outside the repo and a throwaway `SESSION_SECRET`. Create the temp database from `drizzle-kit export` applied through `@libsql/client`, so nothing can push to `local.db`; override `OPEN_LIBRARY_URL` to point at a local stub. Without JavaScript a failed form returns a fragment with no form or error text (apparently from partial prerendering, and `useActionState`'s `permalink` doesn't help), so test form errors and refills in the browser request format (`Next-Action` header, `encodeReply`).

## Git

When asked for a commit message, only suggest it: never run `git commit` or create a branch. The user commits on `main` themselves. Messages are short and imperative, and the verb follows the history: `Create` for a new page (`Create book page`), `Add` for a feature or piece added to existing code (`Add security headers`), `Update` for a commit that changes only docs (`Update conventions`), and the verb that names the change otherwise (`Replace`, `Move`, `Rename`). Split staged work into commits by change, each with the docs that describe it, and check `git log` for how earlier commits grouped the same kind of change.

When asked to help commit the changed files, reply with only `git add` and `git commit -m` commands, one block per commit, and run nothing yourself: no staging, patches, `git apply`, `git add -p` or test runs on in-between states. Plain `git add` stages whole files, so a file holding several changes goes whole into the last commit that needs it. Keep them plain, even when files are already staged: `git add <files>` then `git commit -m "…"`, never paths or flags after `git commit` (`-- <paths>`, `--only`). Quote paths with square brackets (`"src/app/books/[bookId]/…"`), which Bash and zsh would otherwise read as a wildcard.

## Claude Code hooks

`.claude/settings.json` runs the scripts in `.claude/hooks/` (Node, linted like the rest of the repo). They enforce the rules below and in `docs/conventions.md` that lint can't check, so a new rule of that kind may belong here too. Change them only with their rule.

- `guard-commands`: denies `git commit`, creating a branch, bypassing Husky and shell commands that mention `.env.local`; asks before `db:push`, deleting `local.db` and git commands that discard uncommitted work.
- `guard-files`: denies reading or writing `.env.local`, and writing generated files, the URUQ AI project or secrets in `.env`.
- `guard-code-rules`: denies new text in `src/` that breaks a styling or component rule (`dark:`, arbitrary shadows, bare `button`/`p`/`span`, `next/link`, hardcoded `href`s, hex colors and similar).
- `after-edit`: runs Prettier on the edited file, records it for `verify-on-stop`, and reminds Claude to run `db:push` when `src/db/schema.ts` changes.
- `verify-on-stop`: when a turn edited code, runs `tsc` and ESLint on the edited files and sends failures back to Claude once per round of edits. When it lets the turn end, it shows a Windows notification (`notify.mjs`) with the first line of Claude's last message. Stop hooks run in parallel, so a separate notify hook would fire before a failed check sends Claude back to work.

The guards catch mistakes and aren't a security boundary: edits made through shell commands skip all but `guard-commands`.

## Open Library API

- Website: https://openlibrary.org
- API docs: https://openlibrary.org/developers/api
- Covers API: https://openlibrary.org/dev/docs/api/covers

Cover images come from `covers.openlibrary.org`, which is allowed in `images.remotePatterns`.

Vocabulary (`docs/conventions.md`, **One vocabulary per layer**): `src/services/openLibrary/` uses Open Library's words, and everything else uses Bookshelf's: **book** for its work (and a search `doc`), **genre** for its subject where users browse by it (the footer, About) and **topic** for a book's own subjects (the book page's Topics), **reading log** for its bookshelves. `Genre.coversSubject` holds the Open Library subject whose books a genre tile shows as covers.

## Architecture

- `src/app/components/`: Header, Footer, Toaster and ActionToast (rendered by `layout.tsx`; Toaster configures sonner's `Toaster`: unstyled toasts with our tokens, a type icon from `src/assets/icons/`, a Dismiss button, 5 seconds, and ActionToast reads the toast cookie an action set before redirecting and renders ServerToast, which shows the toast and deletes that cookie) and the home page sections (rendered by `page.tsx`: WelcomeCards, BrowseStacks, Community, About).
- Browse the stacks: the open genre lives in the URL (`/?stack=<slug>`, Featured when missing or unknown), and the genre tiles are links. `page.tsx` passes its `searchParams` promise unawaited to BrowseStacks, whose heading stays in the static shell; GenreBrowser, inside `<Suspense>`, is the only component that awaits it, and passes plain props: the open genre's slug to GenreTiles (`activeSlug`) and the open genre to GenreShelf. The shelf (a trending row and one row per subgenre, each a Search API query defined in `GENRES`) streams in inside its own `<Suspense>`.
- `src/app/error.tsx`: fallback for a page that can't render, inside the shared layout. Failed Server Actions show a toast instead.
- `src/app/not-found.tsx`: the 404 page for unmatched URLs and `notFound()` calls, inside the shared layout.
- `src/app/account/`: Log In (`login`) and Sign Up (`create`) pages, modeled on Open Library's `/account/login` and `/account/create`. The header's `Account` shows Log In / Sign Up links or the screen name with Log Out.
- `src/app/books/[bookId]/`: the book page, modeled on Open Library's work page; every BookCard links to it. `page.tsx` passes its `params` promise to BookDetails inside `<Suspense>`. Both its `generateMetadata` (the book's title) and BookDetails get the book through `getBookOrExit` (`src/lib/books.ts`), so the tab title and the page always agree: it calls `notFound()` for an id that isn't `OL…W` (checked before any fetch, so an invalid id is never sent to Open Library), one Open Library doesn't know and a deleted book, redirects a merged book (`/type/redirect`) to its `location` (a 404 when that isn't another book's id), and returns the book, or `null` when Open Library didn't answer. `notFound()` has to run in `generateMetadata` too: one thrown only by the streamed BookDetails leaves the site's default title on the 404. BookDetails renders the cover, title, first publish date, description and topics (one pill each, without duplicates). The description (6 lines) and the topics (3 rows) collapse inside ExpandablePreview, a client component that fades the clipped bottom and shows its Read more / Show all toggle only while the content overflows (measured with a `ResizeObserver`, so it follows the window width), and expands when focus enters the hidden part; without JavaScript the preview stays collapsed. Its ReactMarkdown child renders the description: it wraps `react-markdown` for text Open Library sends as Markdown or HTML (some imported descriptions are HTML, such as The Mayor of Casterbridge's), and stays generic so it can move to `src/components/` once another field (an author's bio) needs it. `remark-breaks` keeps each single line break, since plain-text descriptions rely on them, and `remark-gfm` (`singleTilde: false`, so "~1900" isn't struck through) turns bare URLs into links. HTML goes through `rehype-raw` and `rehype-sanitize` (GitHub's schema: no scripts, styles, event handlers or `javascript:` links), which prefixes every `id` with `user-content-` so a description can't take over the page's own ids; `remark-rehype`'s own prefix is off so footnote ids aren't prefixed twice, and `#` links get the same prefix to keep pointing at them. Only the elements in `ALLOWED_ELEMENTS` render, and anything else is unwrapped to its text. A link to an Open Library book goes to our book page, any other relative link to Open Library, and one whose address can't be parsed (or a bare `#`) shows as plain text instead of failing the page. An image shows its alt text, and headings and code blocks become paragraphs, since the text sits under the caller's own heading. A caller's `components`, `rehypePlugins` and `remarkPlugins` are added to these. AuthorNames and BookStats (ratings, with RatingStars showing the average as five stars rounded to the nearest half, and reading-log counts) fetch their own data in their own `<Suspense>`. The page streams, so a 404 there is sent with status 200 and `noindex`, as Next does for `notFound()` after streaming starts.
- `src/actions/`: `auth.ts` (`signUp`, `logIn`, `logOut` Server Actions).
- `src/lib/`: server-only code. `session.ts` (JWT in an httpOnly `session` cookie via `jose`, 7 days), `dal.ts` (`getCurrentUser`, `getUser`), `password.ts` (`node:crypto` scrypt), `rateLimit.ts` (in-memory, so it holds only with a single server process: on Vercel each function instance keeps its own counts. 10 log in attempts per email and 30 per IP per 15 minutes, 10 sign up attempts per IP per hour; a successful log in resets only the email's count. The IP is the last `x-forwarded-for` entry, which only a proxy in front of the app makes trustworthy, as Vercel does: without one a client can set it, and only the per-email limit still holds), `toast.ts` (`setRedirectToast`: the toast cookie an action sets before redirecting), `books.ts` (`getBookOrExit`: the book page's shared lookup, above).
- `src/utils/`: `formSchemas.ts` (Zod schemas, `ERROR_MESSAGES`), `forms.ts` (`parseForm`: reads and validates a form for an action), `cookies.ts` (client-only `deleteCookie`), `bookRecords.ts` (pure helpers for Open Library's book ids and records, beside the fetching `lib/books.ts`: `getBookId`, `/works/OL…W` → `OL…W`; `isBookId`; and `isBook`, `isMergedBook`, type guards for `getWork`'s three record kinds, a book, a merged book's redirect and a deleted book, which TypeScript can't narrow by their nested `type.key`).
- `src/db/`: Drizzle ORM on SQLite via `@libsql/client`; one `users` table, where `screenNameKey` (the lowercased screen name) makes screen names unique regardless of case. The database file is `local.db` (gitignored).
- `src/proxy.ts`: on a GET of the account pages, redirects a logged-in user to home and clears a session cookie whose user no longer exists.
- `src/components/`: Typography, Button, Link, TextField, Loader, BookCover (a book's cover at a `size`, or a placeholder when the book has none: a crossed-out image icon, plus "No cover" except at `small`; BookCard, BookDetails and GenreCovers), EmptyData (the gray "Nothing here yet." a fetched list or field shows when it comes back empty, such as a book's Description or Topics), ServerToast (a client component a Server Component renders to show a toast with the `message` and `type` it passes, and to delete the `cookieToDelete` cookie when given), FormActionBoundary (wraps every form: a `catchError` boundary that turns a rejected action, such as a lost connection, into an error toast and remounts the form empty).
- `src/constants/`: `ROUTES` (`home`, `logIn`, `signUp`, and `book(bookId)`), `GENRES` (`genres.ts`: the Browse the stacks genres and their subgenres), `SESSION_COOKIE` and `TOAST_COOKIE` (`cookies.ts`), `TOAST_SUCCESS_MESSAGES` and `TOAST_ERROR_MESSAGES` (`toasts.ts`: the success messages for actions that redirect, a list of `{ message, name }` whose names are the `ToastName` the toast cookie holds, and every error toast, keyed by name: `unexpected`, shared by actions and FormActionBoundary, `connectionLost`, FormActionBoundary's offline error, `openLibraryUnavailable`, the Open Library outage, and `bookDetailsUnavailable`, the same outage when only part of the book page is missing) and `PASSWORD_FIELD` (`formFields.ts`, the password field's name in schemas and inputs).
- `src/hooks/`: `useFormAction.ts` (`useActionState` on the Server Action itself, so forms work without JavaScript, plus an effect that shows the `toastError` it returns).
- `src/types/`: `models.ts` (`ParsedForm`, the result of `parseForm`; `OpenLibraryResult`, the result of `fetchOpenLibrary`; `ToastType`; `CoverSize`, Open Library's cover image sizes, used by `getCoverUrl` and BookCover; `Genre` (with `coversSubject`) and its `Subgenre`, the shapes of `GENRES`), `formValues.ts` (form state types, with `toastError` in the shared `FormState`) and `env.d.ts` (types `DATABASE_URL`, `OPEN_LIBRARY_URL` and `SESSION_SECRET` as strings; they are always set, so the code reads them without checks).
- `src/services/`: Open Library API calls. `openLibrary/index.ts` (`fetchOpenLibrary`) calls native `fetch` with the base URL from `OPEN_LIBRARY_URL`, the `User-Agent` header and a 10-second timeout, and always returns `{ data, status }`. Endpoints are grouped by domain: `openLibrary/subjects/` (`getSubject`, with `types.ts`), `openLibrary/search/` (`searchWorks`: the Search API, English works with full text, 20 per row, `trending` by default), `openLibrary/works/` (`getWork`, `getWorkRatings`, `getWorkBookshelves`, by `workId`), `openLibrary/authors/` (`getAuthor`, by the author's `key`) and `openLibrary/covers/` (`getCoverUrl`). Open Library answers an unknown work or author with a 404, and everything else it can't find (unrated works, whose `average` is `null`, empty shelves, unknown subjects, searches with no match) with a 200 and zeros or empty lists. `fetchOpenLibrary` returns `{ data, status: 200 }` for a success, cached for days, and `{ data: null, status }` for an error status (404, 503…) or `{ data: null, status: null }` when Open Library didn't answer (timeout, network, a body that isn't JSON), cached for minutes so a later record or a recovery shows up on its own and an outage never fails the build. Response types describe only the success body. `getBookOrExit` calls `notFound()` for `status === 404` and AuthorNames skips a 404 author; everywhere else `!data` is the outage: each GenreCovers, BookList and BookDetails (which fetch their own data, and render only the toast when it fails) show `TOAST_ERROR_MESSAGES.openLibraryUnavailable` for it through `ServerToast`, and AuthorNames and BookStats, whose page still shows the book, show `bookDetailsUnavailable`; ServerToast uses the message as the toast `id`, so they show one toast.

Open Library's API has no account endpoints, so accounts live in our own database. `.env` (committed) holds `OPEN_LIBRARY_URL=https://openlibrary.org`; `.env.local` (gitignored) holds `DATABASE_URL=file:local.db` and `SESSION_SECRET` (`openssl rand -base64 32`). Production's values are set in Vercel (see **Hosting**).

## Hosting

Vercel deploys every push to `main` of the GitHub repo (GitHub Pages can't host the app: it serves only static files, and the app needs Server Actions, cookies, the proxy and a database). The production database is Turso (hosted libSQL), since a SQLite file doesn't persist on Vercel. Vercel's environment variables hold `DATABASE_URL` (`libsql://<database>.turso.io?authToken=<token>`: `@libsql/client` reads the token from the URL, so the code needs no separate variable) and its own `SESSION_SECRET`; `OPEN_LIBRARY_URL` comes from the committed `.env`. Keep Vercel's function region next to the Turso database. A schema change reaches production by running `npm run db:push` with the Turso `DATABASE_URL` set in the shell, which takes priority over `.env.local`.

## Design

Light theme only: there is no dark mode, so never use `dark:` variants.

- **Colors:** `white` #ffffff (cards, inputs), `black` #1f1b16 (text), `primary` #7a2e2e / `secondary` #5e2222 (buttons, links, hover), `error` #b3261e, `success` #2f6b4f, `beige` #faf7f2 (page), `gray` #6b6259 (secondary text), `gray-light` #e7e0d6 (borders), `gold` #c08a3e (decorations only, too light for text).
- **Font:** Inter.
- **Typography variants:** `h1|h2|h3|h4|body|subtitle|caption` → 48/36/28/22/16/14/12px.
- **Button variants:** `primary` (filled), `outlined` (white with a border), `text` (no background until hover, so it goes on a background lighter than `gray-light`). Default size `h-[36px] px-[16px] text-body`, on one line (`whitespace-nowrap`).
- **Link variants:** `inline` (underlined primary text), `plain` (no look: the logo), `outlined`, `primary` and `text` (the same look as Button's). `outlined` shows a selected look (primary border, beige background) when the link has `aria-current` (the open genre tile).
- **Icons:** Lucide SVG files in `src/assets/icons/` (no icon package), with the stroke set to a token color in the file (`primary` on cards, `gold` on decorative fact icons, `white` on primary buttons; `gold` and `gray-light` fills on the rating stars), since `next/image` can't pass `currentColor`.
- **Shadows:** `shadow-raised` for cards, tiles, filled buttons and the header; `shadow-lifted` for hovered tiles and filled buttons, and for toasts; `shadow-cover` for book covers and `shadow-cover-lifted` for a hovered one. The lifted shadows have a negative spread so the scroll rows' padding doesn't clip them.
- **Book hover:** BookCard's cover rises 4px with `shadow-cover-lifted` and its title turns `primary`.
- **Fade in:** `animate-fade-in` (200ms, opacity only) on content that streams in: the book rows and the book page.
- **Scrollbars:** `scrollbar-thin` (a `@utility` in `globals.css`: a thin `gray` thumb on a transparent track) on every horizontal scroll row (`overflow-x-auto`): the welcome cards, the genre tiles and the book rows. Each row's padding is `p-[4px_4px_12px_4px]`: 4px of room for its items' shadows, focus outline (2px, 2px away) and hover lift, and 12px at the bottom so the scrollbar sits clear of the items. The page's own scrollbar stays native.
- **Header offset:** `scroll-mt-header-offset` (77px: the sticky header's 65px plus the 12px gap below it) on every element a link jumps to (`#id`), so it stops below the header. Update it whenever the header's height changes.
- **Layout widths:** `max-w-standalone-page` (400px) for standalone pages, whose content is one short block (a form or a message): Log In, Sign Up, the error and not found pages.
- **Text spacing scale:**
  - `4px`: a title and its own description or value (fact name → line, stat value → label, card title → description), and between links in a compact link list (footer).
  - `12px`: a heading → its content, and between paragraphs or list items.
  - `24px`: text → its button, and between side-by-side columns.
  - `32px`: between page sections.
- **z-index order:** `z-1` raised genre-tile cover (GenreCovers), `z-2` sticky header (Header), `z-3` skip link (`layout.tsx`, above the header), `z-4` toasts (Toaster).
