export const ROUTES = {
  book: (bookId: string) => `/books/${bookId}`,
  home: '/',
  logIn: '/account/login',
  signUp: '/account/create',
} as const;
