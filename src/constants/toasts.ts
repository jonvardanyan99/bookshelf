export const TOAST_SUCCESS_MESSAGES = [
  { message: 'You are logged in.', name: 'loggedIn' },
  { message: 'You are logged out.', name: 'loggedOut' },
  { message: 'Your account was created.', name: 'signedUp' },
] as const;

export type ToastName = (typeof TOAST_SUCCESS_MESSAGES)[number]['name'];

export const TOAST_ERROR_MESSAGES = {
  connectionLost: "We couldn't reach the server. Check your connection and try again.",
  openLibraryUnavailable: "Books couldn't load right now. Please try again later.",
  unexpected: 'Something went wrong. Please try again.',
};
