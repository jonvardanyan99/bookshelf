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

**Before adding MUI, Formik/Yup, Redux Toolkit/RTK Query or Husky**, read [docs/library-conventions.md](docs/library-conventions.md) and follow its section for that library.

`next.config.ts` enables `cacheComponents` and `partialPrefetching`. Read the matching guide in `node_modules/next/dist/docs/` before relying on caching, data fetching or routing behaviour.

## Open Library API

- Website: https://openlibrary.org
- API docs: https://openlibrary.org/developers/api
- Covers API: https://openlibrary.org/dev/docs/api/covers

Only call endpoints that exist in these docs. Remote images (cover images on `covers.openlibrary.org`) must be allowed in `images.remotePatterns` in `next.config.ts` before `next/image` can load them.

## Architecture

```
src/
└── app/          # App Router: layout.tsx, page.tsx, globals.css (Tailwind + theme tokens)
public/           # Static assets served from /
```

Components nest under their owner: `Page/components/Child/components/Grandchild/index.tsx`. Promote to `src/components/` only when shared across pages.

- **Imports:** always the `@/…` alias (→ `src/`) instead of long relative paths. Use `import type` for types.

## Code conventions

ESLint is extremely strict (`js.configs.all`, `strictTypeChecked`, `react.configs.all` on top of `eslint-config-next`). Rules that shape the code most:

- **`sort-keys`** — object literal keys and JSX props are alphabetical (this is why code looks sorted). Opt out per file only where order matters (`/* eslint-disable sort-keys */`).
- **`import/no-default-export`** — named exports only, except Next.js route files (`page`, `layout`, `template`, `loading`, `error`, `global-error`, `not-found`, `default`) and `*.config` files, which Next requires to default-export. Imports auto-sorted by `simple-import-sort`.
- `max-lines` 350 per file/function — split components rather than disabling.
- `react/forbid-component-props: style` — no `style` prop on components; use Tailwind classes.
- `react/jsx-no-bind` — only arrow functions inline; prefer `useCallback` handlers.
- Interfaces, not `type`, for object shapes (API types, Props); `type` for unions/derived types.
- Unused vars/args must be prefixed `_`.
- Prettier: 100 cols, single quotes, tailwind class sorting.

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

Tailwind v4 — config lives in `src/app/globals.css` (`@theme inline`), no tailwind.config.

- **Tokens:** colors `background` / `foreground` (switch for dark mode via `prefers-color-scheme`); fonts `sans` (Geist) and `mono` (Geist Mono) from `next/font` in `layout.tsx`. Check tokens before using arbitrary values; add a token when a value is semantic or repeated 3+ times.
- Arbitrary pixel values are the norm (`mb-[24px]`, `p-[24px_32px]`, `size-[18px]`). No negative spacing values.
- Conditional classes via `clsx` (install it the first time it's needed).
- Lists of facts → semantic `<ul className="mb-[24px] pl-[24px]">` / `<li className="mb-[12px]">` (no margin on last `li`). Simple stacked text → per-element margins, not a flex+gap wrapper.
- Layout with flex/grid; absolute positioning only for overlays/floating decorations, with a comment saying why.

## Implementing designs

- Match the design exactly (size, spacing, colors, type, radius, shadows); never guess values.
- Icons: use the real exported SVG (kebab-case file name) rendered with `next/image` or `<img alt="…" />`. Never placeholders, emoji, or icon libraries (lucide, react-icons).
- Keep new pieces visually consistent with sibling components (same widths, spacing, scrollbars).
