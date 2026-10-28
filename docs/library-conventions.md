# Library conventions (not in use yet)

Conventions carried over from another project for libraries this project does not use yet. When one of these libraries is added, move its section into docs/conventions.md (neutral examples, no project names) and adapt paths.

## MUI (v7)

- Wrap the app in `StyledEngineProvider enableCssLayer` so Tailwind and MUI share CSS layers. MUI theme overrides live in `src/styles/theme.ts` (`/* eslint-disable sort-keys */` there, since order matters).
- Override MUI styles with `!` important Tailwind classes (`!font-medium`).
- Theme defaults — don't duplicate them in components: `Button` is `fullWidth` + `variant="contained"` by default (no `flex-1`/`w-full`); Dialog paper already has 12px radius (no `rounded-[12px]`). `RadioGroup`/`FormGroup`/`Stack` already lay out with flex.
- **Modals:** content wrapper `className="w-[theme(--modal-width)] bg-white p-[24px_32px]"` (add a `--modal-width` token, 672px); header row = `headline` title + close `IconButton` with `CloseRoundedIcon`; vertical rhythm `mb-[24px]` between sections (Divider, Tabs, tab content, and `<Loader className="mb-[24px]" />` so loading/loaded states don't jump). Scrollable tab content: `custom-scrollbar-2 mb-[24px] max-h-[400px] overflow-y-auto pr-[4px]`.
- Modal props extend MUI's: `interface Props extends Omit<DialogProps, 'onClose'> { onClose: () => void; }`, spreading `...props` onto `Dialog`.
- Radio = single choice (`RadioGroup`, no wrapper); checkboxes = multi-choice (wrap `FormControlLabel`s in `div.flex.flex-col`).
- Icons: an `@mui/icons-material` icon (Rounded/Outlined variants) is allowed when it matches the design — common: `ChatBubbleOutlineRounded`, `VisibilityOutlined`, `CachedRounded`, `CloseRounded`, `KeyboardArrowDownRounded`, `KeyboardArrowRightRounded`.
- **Typography:** a shared `<Typography variant="h1|h2|h3|h4|headline|body|subtitle|caption|footnote">` in `src/components/Typography` maps the variant to a `text-<variant>` utility (49/39/31/25/20/16/14/12/10px, line-height 100%) defined in the Tailwind `@theme`.

## Formik + Yup (forms)

Formik + Yup only. Schema in `src/utils/formSchemas.ts` (messages from an `ERROR_MESSAGES` constant), type in `src/types/formValues.ts` as `Yup.InferType<typeof schema>`. Use `useFormik<XFormValues>({ initialValues, onSubmit, validateOnMount: true, validationSchema })` and wire fields with `error={Boolean(formik.touched.f) && Boolean(formik.errors.f)}` / `helperText={formik.touched.f ? formik.errors.f : null}`.

## Redux Toolkit + RTK Query (state and API)

- Store in `src/store/`: `configureStore`, rootReducer with redux-persist (persist only what must survive reloads), `hooks.ts` exporting `useAppDispatch` / `useAppSelector`; slices in `src/store/slices/`.
- API in `src/services/rtkQuery/`: `index.ts` = `createApi`, `tags.ts` = `TAGS`; one folder per domain with `index.ts` (`injectEndpoints`) + `types.ts` (`<Name>Variables` / `<Name>Response` interfaces).
- Endpoints are **alphabetical** inside `endpoints`; generated hooks are **appended to the end** of the export destructuring — never re-sort the existing export list.
- Request objects use `{ body, method, params, url }`; URLs/params match the backend's casing. Arrays are serialized `qs` repeat-style.
- Cache: declare `providesTags` / `invalidatesTags` (add new tag names to `tags.ts`). Never invalidate manually via `dispatch(api.util.invalidateTags(...))` in components.
- Only create endpoints that exist in the API docs; reuse existing endpoints when they cover the data.
- Show `<Loader />` for `query.isLoading`; read data as `query.data?.data…` when responses wrap the payload in `data`.
- Mutations in components, with a `useNotification` hook:

```ts
const { handleApiError, showNotification } = useNotification();
try {
  await someMutation(args).unwrap();
  showNotification({ message: 'Saved', type: 'success' });
} catch (error) {
  handleApiError(error);
}
```
