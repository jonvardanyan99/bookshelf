@AGENTS.md

# Bookshelf

Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4 website for browsing books, built on the [Open Library](https://openlibrary.org) open API.

## Commands

```bash
npm run dev                  # Next dev server (Turbopack)
npm run build / start        # Production build / serve it
npm run lint / lint:fix      # ESLint
npm run format / format:fix  # Prettier on src/
npm run type-check           # tsc --noEmit
```

Verify changes with `npm run type-check` and `npm run lint`.

Git hooks (Husky): pre-commit runs lint-staged (`eslint --fix` on staged TS, `prettier --write` on CSS/JSON/MD) plus `type-check`; pre-push runs `lint`, `format` and `type-check`. CI (`.github/workflows/ci.yml`) runs the same three. Never bypass with `--no-verify`.

**Before adding MUI, Formik/Yup or Redux Toolkit/RTK Query**, read [docs/library-conventions.md](docs/library-conventions.md) and follow its section for that library.

`next.config.ts` enables `cacheComponents` and `partialPrefetching`. Read the matching guide in `node_modules/next/dist/docs/` before relying on caching, data fetching or routing behaviour.

## Open Library API

- Website: https://openlibrary.org
- API docs: https://openlibrary.org/developers/api
- Covers API: https://openlibrary.org/dev/docs/api/covers

Only call endpoints that exist in these docs. Remote images (cover images on `covers.openlibrary.org`) must be allowed in `images.remotePatterns` in `next.config.ts` before `next/image` can load them.

## Architecture

```
src/
├── app/          # App Router: layout.tsx, page.tsx, globals.css (Tailwind + theme tokens)
└── components/   # Shared UI (Typography)
```

Components nest under their owner: `Page/components/Child/components/Grandchild/index.tsx`. Promote to `src/components/` only when shared across pages.

- **Imports:** always the `@/…` alias (→ `src/`) instead of long relative paths. Use `import type` for types.

## Code conventions

ESLint is extremely strict (`js.configs.all`, `strictTypeChecked`, `react.configs.all` on top of `eslint-config-next`). Rules that shape the code most:

- **`sort-keys`** — object literal keys and JSX props are alphabetical (this is why code looks sorted); `perfectionist` does the same for interfaces, object types and destructured props. Opt out per file only where order matters (`/* eslint-disable sort-keys */`).
- **`import/no-default-export`** — named exports only, except Next.js route files (`page`, `layout`, `template`, `loading`, `error`, `global-error`, `not-found`, `default`) and `*.config` files, which Next requires to default-export. Imports auto-sorted by `simple-import-sort`.
- `max-lines` 350 per file/function — split components rather than disabling.
- `react/forbid-component-props: style` — no `style` prop on components; use Tailwind classes.
- `react/jsx-no-bind` — only arrow functions inline; prefer `useCallback` handlers.
- Interfaces, not `type`, for object shapes (API types, Props); `type` for unions/derived types.
- Unused vars/args must be prefixed `_`.
- Prettier: 100 cols, single quotes, tailwind class sorting. It runs inside ESLint (`prettier/prettier`), so formatting issues fail `npm run lint` and `lint:fix` fixes them.

### Component idiom

Nearly every component is a private `Component` wrapped in `memo` and exported by name:

```tsx
interface Props {
  onClose: () => void;
}

const Component: React.FC<Props> = ({ onClose }) => { ... };

export const MyModal = memo(Component);
```

Route files (`page.tsx`, `layout.tsx`) are the exception: they default-export a function as Next.js expects.

- Modal visibility lives in the parent: `const [xModalVisible, setXModalVisible] = useState(false)` with `showXModal` / `hideXModal` callbacks.
- Multi-step flows = separate modals per step, wired with `onNextClick` / `onBackClick` from the parent.
- Prefer a named boolean (`const hasResults = …`) over complex inline JSX conditions; inline single-use expressions and single-use class strings; use a `*_CLASS_NAME` constant only when reused in the file.
- Use concise `map((x) => (<…/>))` unless logic precedes the return.
- Reuse types via indexed access (`SearchResponse['docs']`) rather than new aliases.
- Verify exported names (constants, helpers, response shapes) before using them — don't guess.

## Styling

Tailwind v4 — config lives in `src/app/globals.css` (`@theme`), no tailwind.config. Light theme only: there is no dark mode, so never use `dark:` variants.

- **Colors:** `white` #ffffff (cards, inputs), `black` #1f1b16 (text), `primary` #7a2e2e / `secondary` #5e2222 (buttons, links, hover), `error` #b3261e, `success` #2f6b4f, `beige` #faf7f2 (page), `gray` #6b6259 (secondary text), `gray-light` #e7e0d6 (borders), `gold` #c08a3e (decorations only, too light for text). Tailwind's default palette still exists, but prefer these tokens.
- **Font:** Inter from `next/font`, applied once via `inter.className` on `<html>` in `layout.tsx` — never set a font family on components. Typography makes headings bold.
- **Typography:** use `<Typography variant="h1|h2|h3|h4|body|subtitle|caption">` from `@/components/Typography` — it renders the matching element and `text-<variant>` utility (48/36/28/22/16/14/12px, px sizes with line heights). Use these tokens instead of arbitrary font sizes.
- Check tokens before using arbitrary values; add a token when a value is semantic or repeated 3+ times.
- Arbitrary pixel values are the norm for spacing and sizes (`mb-[24px]`, `p-[24px_32px]`, `size-[18px]`). No negative spacing values.
- Conditional classes via `clsx`, imported by name: `import { clsx } from 'clsx'`.
- Elements:
  - Landmarks: `<main>` (one per page), `<header>`, `<nav>` (`aria-label` when there is more than one), `<footer>`, `<aside>` (sidebars like filters), `<search>` (wraps a search form).
  - Always the real element when it does something or gives structure: `button`, `a`/`Link`, `form`/`label`/`input`/`select`/`textarea`, `fieldset`/`legend`, `h1`–`h6` in order (one `h1` per page), `ul`/`ol`/`li`, `img` with `alt`, `table`/`th` (data only), `dialog`, `details`/`summary`. Optional: `time`, `blockquote`, `figure`/`figcaption`.
  - `div` for anything that only groups or lays out content — no `<section>` or `<article>`.
- Lists of facts → semantic `<ul className="mb-[24px] pl-[24px]">` / `<li className="mb-[12px]">` (no margin on last `li`). Simple stacked text → per-element margins, not a flex+gap wrapper.
- Layout with flex/grid; absolute positioning only for overlays/floating decorations, with a comment saying why.

## Implementing designs

- Match the design exactly (size, spacing, colors, type, radius, shadows); never guess values.
- Icons: use the real exported SVG (kebab-case file name) rendered with `next/image` or `<img alt="…" />`. Never placeholders, emoji, or icon libraries (lucide, react-icons).
- Keep new pieces visually consistent with sibling components (same widths, spacing, scrollbars).
