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
npm run type-check           # tsc --noEmit
```

`eslint.config.mjs` mirrors the user's URUQ AI config (`C:\Users\johnv\Desktop\uruq-ai\eslint.config.js` and its `package.json`), adapted only where Next.js requires it; Bookshelf may go beyond it (`eslint-plugin-perfectionist`). Read that config before changing lint or format tooling, never rebuild it from the summary in `docs/conventions.md`. Never edit anything in the URUQ AI project, not even to keep the two in sync.

**Before adding MUI, Formik/Yup or Redux Toolkit/RTK Query**, read [docs/library-conventions.md](docs/library-conventions.md) and follow its section for that library.

`next.config.ts` enables `cacheComponents` and `partialPrefetching`.

## Git

When asked for a commit message, only suggest it: never run `git commit` or create a branch. The user commits on `main` themselves. Messages are short and imperative (`Create home page UI`).

## Open Library API

- Website: https://openlibrary.org
- API docs: https://openlibrary.org/developers/api
- Covers API: https://openlibrary.org/dev/docs/api/covers

Cover images come from `covers.openlibrary.org`, which is allowed in `images.remotePatterns`.

## Architecture

- `src/app/components/`: Header and Footer (rendered by `layout.tsx`) and the home page sections (rendered by `page.tsx`).
- `src/components/`: Typography, Button.
- `src/constants/`: `ROUTES` (only `home` so far).
- `src/services/`: Open Library API calls.

## Design

Light theme only: there is no dark mode, so never use `dark:` variants.

- **Colors:** `white` #ffffff (cards, inputs), `black` #1f1b16 (text), `primary` #7a2e2e / `secondary` #5e2222 (buttons, links, hover), `error` #b3261e, `success` #2f6b4f, `beige` #faf7f2 (page), `gray` #6b6259 (secondary text), `gray-light` #e7e0d6 (borders), `gold` #c08a3e (decorations only, too light for text).
- **Font:** Inter.
- **Typography variants:** `h1|h2|h3|h4|body|subtitle|caption` → 48/36/28/22/16/14/12px.
- **Button variants:** `primary` (filled), `outlined` (white with a border), `text` (no background until hover). Default size `h-[36px] px-[16px] text-body`, on one line (`whitespace-nowrap`).
- **Shadows:** `shadow-raised` for cards, tiles and filled buttons; `shadow-cover` for book covers.
- **Text spacing scale:**
  - `4px`: a title and its own description or value (fact name → line, stat value → label, card title → description), and between links in a compact link list (footer).
  - `12px`: a heading → its content, and between paragraphs or list items.
  - `24px`: text → its button, and between side-by-side columns.
  - `32px`: between page sections.
- **z-index order:** `z-1` raised genre-tile cover (GenreTile), `z-2` sticky header (Header), `z-3` skip link (`layout.tsx`, above the header).
